"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ApiClientError,
  clearAuthSession,
  type CreateTeamMemberPayload,
  type CreateResourcePayload,
  type ResourceRecord,
  getCurrentAuthSession,
  getCurrentUser,
  getStatsDashboard,
  listTeamMembersAdmin,
  listAdminContactMessages,
  listResourcesAdmin,
  listSupportPathsAdmin,
  listUsers,
  type AuthSession,
  type ContactMessage,
  type ContactMessagesPage,
  type CreateSupportPathPayload,
  type CreateUserPayload,
  type SupportPath,
  type StatsDashboard,
  type TeamMember,
  type UserRecord,
} from "@/lib/api";
import {
  ADMIN_SECTION_TABS,
  INITIAL_RESOURCE_FORM,
  INITIAL_SUPPORT_FORM,
  INITIAL_TEAM_FORM,
  buildResourceDraft,
  buildSupportDraft,
  buildTeamMemberDraft,
  getAllowedTabsByRole,
  type AdminSectionTab,
  type MessageFilter,
  type ResourceCreateFormErrors,
  type ResourceDraft,
  type StatsRangePreset,
  type SupportCreateFormErrors,
  type SupportPathDraft,
  type TeamCreateFormErrors,
  type TeamMemberDraft,
  type UserDraft,
} from "../admin.shared";
import { useAdminAuthHandlers } from "./handlers/useAdminAuthHandlers";
import { useAdminMessageHandlers } from "./handlers/useAdminMessageHandlers";
import { useAdminProfileHandlers } from "./handlers/useAdminProfileHandlers";
import { getErrorText } from "./handlers/shared";
import { useAdminResourceHandlers } from "./handlers/useAdminResourceHandlers";
import { useAdminStatsHandlers } from "./handlers/useAdminStatsHandlers";
import { useAdminSupportPathHandlers } from "./handlers/useAdminSupportPathHandlers";
import { useAdminTeamHandlers } from "./handlers/useAdminTeamHandlers";
import { useAdminUserHandlers } from "./handlers/useAdminUserHandlers";

type LoadDashboardOptions = {
  suppressGlobalError?: boolean;
};

type LoadMessagesOptions = {
  suppressGlobalError?: boolean;
};

const EMPTY_MESSAGE_SUMMARY: ContactMessagesPage["summary"] = {
  totalAll: 0,
  statusTotals: {
    new: 0,
    read: 0,
    in_progress: 0,
    responded: 0,
  },
};

export function useAdminDashboard() {
  const [session, setSession] = useState<AuthSession | null>(null);

  const [isBootstrapping, setIsBootstrapping] = useState(true);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [busyAction, setBusyAction] = useState<string | null>(null);

  const [currentUser, setCurrentUser] = useState<UserRecord | null>(null);
  const [isForbidden, setIsForbidden] = useState(false);
  const [users, setUsers] = useState<UserRecord[]>([]);
  const [userDrafts, setUserDrafts] = useState<Record<string, UserDraft>>({});
  const [supportPaths, setSupportPaths] = useState<SupportPath[]>([]);
  const [supportPathDrafts, setSupportPathDrafts] = useState<Record<string, SupportPathDraft>>(
    {},
  );
  const [resources, setResources] = useState<ResourceRecord[]>([]);
  const [resourceDrafts, setResourceDrafts] = useState<Record<string, ResourceDraft>>({});
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [teamMemberDrafts, setTeamMemberDrafts] = useState<Record<string, TeamMemberDraft>>({});
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [messagesFilter, setMessagesFilter] = useState<MessageFilter>("all");
  const [messagesSearch, setMessagesSearch] = useState("");
  const [debouncedMessagesSearch, setDebouncedMessagesSearch] = useState("");
  const [messagesPage, setMessagesPage] = useState(1);
  const [messagesLimit] = useState(12);
  const [messagesTotal, setMessagesTotal] = useState(0);
  const [messagesTotalPages, setMessagesTotalPages] = useState(1);
  const [messagesSummary, setMessagesSummary] =
    useState<ContactMessagesPage["summary"]>(EMPTY_MESSAGE_SUMMARY);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [stats, setStats] = useState<StatsDashboard | null>(null);
  const [statsRangePreset, setStatsRangePreset] = useState<StatsRangePreset>("30d");
  const [statsCustomFrom, setStatsCustomFrom] = useState("");
  const [statsCustomTo, setStatsCustomTo] = useState("");
  const [appliedStatsQueryKey, setAppliedStatsQueryKey] = useState(
    JSON.stringify({ rangeDays: 30 }),
  );
  const [activeTab, setActiveTab] = useState<AdminSectionTab>("summary");

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loginError, setLoginError] = useState<string | null>(null);

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const [profileForm, setProfileForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
  });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [createForm, setCreateForm] = useState<CreateUserPayload>({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    role: "editor",
  });
  const [isCreateUserFormOpen, setIsCreateUserFormOpen] = useState(false);
  const [openUserEditorId, setOpenUserEditorId] = useState<string | null>(null);
  const [createSupportForm, setCreateSupportForm] = useState<CreateSupportPathPayload>(
    INITIAL_SUPPORT_FORM,
  );
  const [isCreateSupportFormOpen, setIsCreateSupportFormOpen] = useState(false);
  const [createSupportFormErrors, setCreateSupportFormErrors] =
    useState<SupportCreateFormErrors>({});
  const [openSupportEditorId, setOpenSupportEditorId] = useState<string | null>(null);
  const [createTeamForm, setCreateTeamForm] = useState<CreateTeamMemberPayload>(
    INITIAL_TEAM_FORM,
  );
  const [isCreateTeamFormOpen, setIsCreateTeamFormOpen] = useState(false);
  const [createTeamFormErrors, setCreateTeamFormErrors] = useState<TeamCreateFormErrors>({});
  const [openTeamEditorId, setOpenTeamEditorId] = useState<string | null>(null);
  const [createResourceForm, setCreateResourceForm] = useState<CreateResourcePayload>(
    INITIAL_RESOURCE_FORM,
  );
  const [isCreateResourceFormOpen, setIsCreateResourceFormOpen] = useState(false);
  const [createResourceFormErrors, setCreateResourceFormErrors] =
    useState<ResourceCreateFormErrors>({});
  const [openResourceEditorId, setOpenResourceEditorId] = useState<string | null>(null);

  const clearDashboardState = useCallback(() => {
    setCurrentUser(null);
    setIsForbidden(false);
    setUsers([]);
    setUserDrafts({});
    setSupportPaths([]);
    setSupportPathDrafts({});
    setResources([]);
    setResourceDrafts({});
    setTeamMembers([]);
    setTeamMemberDrafts({});
    setMessages([]);
    setMessagesTotal(0);
    setMessagesTotalPages(1);
    setMessagesSummary(EMPTY_MESSAGE_SUMMARY);
    setMessagesPage(1);
    setStats(null);
    setAppliedStatsQueryKey(JSON.stringify({ rangeDays: 30 }));
  }, []);

  const clearSessionState = useCallback(() => {
    clearAuthSession();
    setSession(null);
    clearDashboardState();
  }, [clearDashboardState]);

  const syncUserDrafts = useCallback((nextUsers: UserRecord[]) => {
    const drafts: Record<string, UserDraft> = {};
    for (const user of nextUsers) {
      drafts[user.id] = { role: user.role, isActive: user.isActive };
    }
    setUserDrafts(drafts);
  }, []);

  const syncSupportPathDrafts = useCallback((nextSupportPaths: SupportPath[]) => {
    const drafts: Record<string, SupportPathDraft> = {};
    for (const supportPath of nextSupportPaths) {
      drafts[supportPath.id] = buildSupportDraft(supportPath);
    }
    setSupportPathDrafts(drafts);
  }, []);

  const syncResourceDrafts = useCallback((nextResources: ResourceRecord[]) => {
    const drafts: Record<string, ResourceDraft> = {};
    for (const resource of nextResources) {
      drafts[resource.id] = buildResourceDraft(resource);
    }
    setResourceDrafts(drafts);
  }, []);

  const syncTeamMemberDrafts = useCallback((nextTeamMembers: TeamMember[]) => {
    const drafts: Record<string, TeamMemberDraft> = {};
    for (const teamMember of nextTeamMembers) {
      drafts[teamMember.id] = buildTeamMemberDraft(teamMember);
    }
    setTeamMemberDrafts(drafts);
  }, []);

  const buildStatsQuery = useCallback(() => {
    if (statsRangePreset === "7d") return { rangeDays: 7 };
    if (statsRangePreset === "30d") return { rangeDays: 30 };
    if (statsRangePreset === "90d") return { rangeDays: 90 };

    if (statsCustomFrom && statsCustomTo) {
      if (statsCustomFrom <= statsCustomTo) {
        return { from: statsCustomFrom, to: statsCustomTo };
      }
      return { from: statsCustomTo, to: statsCustomFrom };
    }

    return { rangeDays: 30 };
  }, [statsCustomFrom, statsCustomTo, statsRangePreset]);

  const serializeStatsQuery = useCallback(
    (query: { rangeDays?: number; from?: string; to?: string }) => JSON.stringify(query),
    [],
  );

  const buildMessagesQuery = useCallback(() => {
    return {
      page: messagesPage,
      limit: messagesLimit,
      status: messagesFilter === "all" ? undefined : messagesFilter,
      q: debouncedMessagesSearch || undefined,
    };
  }, [debouncedMessagesSearch, messagesFilter, messagesLimit, messagesPage]);

  const loadMessagesData = useCallback(
    async (options?: LoadMessagesOptions): Promise<boolean> => {
      const allowedTabs = getAllowedTabsByRole(currentUser?.role ?? null);
      if (!allowedTabs.includes("messages")) {
        setMessages([]);
        setMessagesTotal(0);
        setMessagesTotalPages(1);
        setMessagesSummary(EMPTY_MESSAGE_SUMMARY);
        return true;
      }

      setIsLoadingMessages(true);
      setError(null);

      try {
        const messagePage = await listAdminContactMessages(buildMessagesQuery());
        setMessages(messagePage.items);
        setMessagesTotal(messagePage.total);
        setMessagesTotalPages(messagePage.totalPages);
        setMessagesSummary(messagePage.summary ?? EMPTY_MESSAGE_SUMMARY);

        if (messagePage.page !== messagesPage) {
          setMessagesPage(messagePage.page);
        }
        return true;
      } catch (errorValue) {
        if (!options?.suppressGlobalError) {
          setError(getErrorText(errorValue, "No se pudieron cargar los mensajes"));
        }

        if (errorValue instanceof ApiClientError && errorValue.status === 401) {
          clearSessionState();
        }
        return false;
      } finally {
        setIsLoadingMessages(false);
      }
    },
    [buildMessagesQuery, clearSessionState, currentUser?.role, messagesPage],
  );

  const loadDashboardData = useCallback(
    async (showLoader = true, options?: LoadDashboardOptions): Promise<boolean> => {
      if (showLoader) setIsLoadingData(true);
      setError(null);

      try {
        const me = await getCurrentUser();
        setCurrentUser(me);

        const allowedTabs = getAllowedTabsByRole(me.role);
        const canReadSummary = allowedTabs.includes("summary");
        const canReadMessages = allowedTabs.includes("messages");
        const canManageUsers = allowedTabs.includes("users");
        const canManageSupportPaths = allowedTabs.includes("support-paths");
        const canManageTeam = allowedTabs.includes("team");
        const canManageResources = allowedTabs.includes("resources");
        const statsQuery = buildStatsQuery();

        if (!allowedTabs.length) {
          setIsForbidden(true);
          setUsers([]);
          setUserDrafts({});
          setSupportPaths([]);
          setSupportPathDrafts({});
          setTeamMembers([]);
          setTeamMemberDrafts({});
          setResources([]);
          setResourceDrafts({});
          setMessages([]);
          setStats(null);
          return true;
        }

        setIsForbidden(false);
        const usersPromise: Promise<UserRecord[] | null> = canManageUsers
          ? listUsers()
          : Promise.resolve(null);
        const allMessagesPromise: Promise<ContactMessagesPage | null> = canReadMessages
          ? listAdminContactMessages(buildMessagesQuery())
          : Promise.resolve(null);
        const supportPathsPromise: Promise<SupportPath[] | null> = canManageSupportPaths
          ? listSupportPathsAdmin()
          : Promise.resolve(null);
        const teamMembersPromise: Promise<TeamMember[] | null> = canManageTeam
          ? listTeamMembersAdmin()
          : Promise.resolve(null);
        const resourcesPromise: Promise<ResourceRecord[] | null> = canManageResources
          ? listResourcesAdmin()
          : Promise.resolve(null);
        const statsPromise: Promise<StatsDashboard | null> = canReadSummary
          ? getStatsDashboard(statsQuery)
          : Promise.resolve(null);

        const [usersData, allMessagesPage, supportPathsData, teamMembersData, resourcesData, statsData] =
          await Promise.all([
            usersPromise,
            allMessagesPromise,
            supportPathsPromise,
            teamMembersPromise,
            resourcesPromise,
            statsPromise,
          ]);

        if (usersData) {
          setUsers(usersData);
          syncUserDrafts(usersData);
        } else {
          setUsers([]);
          setUserDrafts({});
        }

        if (supportPathsData) {
          setSupportPaths(supportPathsData);
          syncSupportPathDrafts(supportPathsData);
        } else {
          setSupportPaths([]);
          setSupportPathDrafts({});
        }

        if (teamMembersData) {
          setTeamMembers(teamMembersData);
          syncTeamMemberDrafts(teamMembersData);
        } else {
          setTeamMembers([]);
          setTeamMemberDrafts({});
        }

        if (resourcesData) {
          setResources(resourcesData);
          syncResourceDrafts(resourcesData);
        } else {
          setResources([]);
          setResourceDrafts({});
        }

        if (allMessagesPage) {
          setMessages(allMessagesPage.items);
          setMessagesTotal(allMessagesPage.total);
          setMessagesTotalPages(allMessagesPage.totalPages);
          setMessagesSummary(allMessagesPage.summary ?? EMPTY_MESSAGE_SUMMARY);
        } else {
          setMessages([]);
          setMessagesTotal(0);
          setMessagesTotalPages(1);
          setMessagesSummary(EMPTY_MESSAGE_SUMMARY);
        }
        setStats(statsData);
        setAppliedStatsQueryKey(serializeStatsQuery(statsQuery));
        return true;
      } catch (errorValue) {
        if (!options?.suppressGlobalError) {
          setError(getErrorText(errorValue, "No se pudieron cargar los datos del panel"));
        }

        if (errorValue instanceof ApiClientError && errorValue.status === 401) {
          clearSessionState();
        }
        return false;
      } finally {
        if (showLoader) setIsLoadingData(false);
      }
    },
    [
      buildMessagesQuery,
      buildStatsQuery,
      clearSessionState,
      serializeStatsQuery,
      syncResourceDrafts,
      syncSupportPathDrafts,
      syncTeamMemberDrafts,
      syncUserDrafts,
    ],
  );

  useEffect(() => {
    const storedSession = getCurrentAuthSession();
    if (!storedSession) {
      setIsBootstrapping(false);
      return;
    }

    setSession(storedSession);
    void loadDashboardData(false).finally(() => setIsBootstrapping(false));
  }, [loadDashboardData]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedMessagesSearch(messagesSearch.trim());
    }, 320);

    return () => window.clearTimeout(timeoutId);
  }, [messagesSearch]);

  useEffect(() => {
    setMessagesPage(1);
  }, [debouncedMessagesSearch, messagesFilter]);

  useEffect(() => {
    if (!currentUser) {
      setProfileForm({
        email: "",
        firstName: "",
        lastName: "",
      });
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      return;
    }

    setProfileForm({
      email: currentUser.email,
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
    });
  }, [currentUser]);

  const { handleApplyStatsFilters } = useAdminStatsHandlers({
    buildStatsQuery,
    setStats,
    setBusyAction,
    setError,
    setSuccess,
    onStatsApplied: (query) => {
      setAppliedStatsQueryKey(serializeStatsQuery(query));
    },
  });

  const { handleLogin, handleLogout } = useAdminAuthHandlers({
    loginForm,
    setLoginForm,
    setLoginError,
    setSession,
    setBusyAction,
    setError,
    setSuccess,
    loadDashboardData,
    clearDashboardState,
  });

  const { handleUpdateProfile, handleChangePassword } = useAdminProfileHandlers({
    currentUser,
    profileForm,
    passwordForm,
    setPasswordForm,
    setBusyAction,
    setError,
    setSuccess,
    loadDashboardData,
    clearSessionState,
  });

  const {
    handleCreateUser,
    handleUpdateUser,
    handleDeleteUser,
    handleToggleCreateUserForm,
    handleToggleUserEditor,
  } = useAdminUserHandlers({
    createForm,
    setCreateForm,
    userDrafts,
    currentUserId: currentUser?.id ?? null,
    openUserEditorId,
    setIsCreateUserFormOpen,
    setOpenUserEditorId,
    setBusyAction,
    setError,
    setSuccess,
    loadDashboardData,
  });

  const {
    handleToggleCreateSupportForm,
    handleToggleSupportEditor,
    handleCreateSupportPath,
    handleUpdateSupportPath,
    handleDeleteSupportPath,
  } = useAdminSupportPathHandlers({
    createSupportForm,
    supportPathDrafts,
    openSupportEditorId,
    setCreateSupportForm,
    setCreateSupportFormErrors,
    setIsCreateSupportFormOpen,
    setOpenSupportEditorId,
    setBusyAction,
    setError,
    setSuccess,
    loadDashboardData,
  });

  const {
    handleToggleCreateResourceForm,
    handleToggleResourceEditor,
    handleCreateResource,
    handleUpdateResource,
    handleDeleteResource,
  } = useAdminResourceHandlers({
    createResourceForm,
    resourceDrafts,
    openResourceEditorId,
    setCreateResourceForm,
    setCreateResourceFormErrors,
    setIsCreateResourceFormOpen,
    setOpenResourceEditorId,
    setBusyAction,
    setError,
    setSuccess,
    loadDashboardData,
  });

  const {
    handleToggleCreateTeamForm,
    handleToggleTeamEditor,
    handleCreateTeamMember,
    handleUpdateTeamMember,
    handleDeleteTeamMember,
  } = useAdminTeamHandlers({
    createTeamForm,
    teamMemberDrafts,
    openTeamEditorId,
    setCreateTeamForm,
    setCreateTeamFormErrors,
    setIsCreateTeamFormOpen,
    setOpenTeamEditorId,
    setBusyAction,
    setError,
    setSuccess,
    loadDashboardData,
  });

  const { handleMarkMessageRead, handleUpdateMessageStatus, handleDeleteMessage } =
    useAdminMessageHandlers({
      setMessages,
      setBusyAction,
      setError,
      setSuccess,
      loadMessagesData,
    });

  const isCustomRangeIncomplete =
    statsRangePreset === "custom" && (!statsCustomFrom || !statsCustomTo);
  const currentStatsQueryKey = serializeStatsQuery(buildStatsQuery());
  const hasPendingStatsFilters =
    !!stats && !isCustomRangeIncomplete && currentStatsQueryKey !== appliedStatsQueryKey;

  const currentRole = currentUser?.role ?? null;
  const allowedTabs = useMemo(() => getAllowedTabsByRole(currentRole), [currentRole]);
  const visibleTabs = useMemo(
    () => ADMIN_SECTION_TABS.filter((tab) => allowedTabs.includes(tab.id)),
    [allowedTabs],
  );
  const canAccessSummary = allowedTabs.includes("summary");
  const canAccessProfile = allowedTabs.includes("profile");
  const canAccessUsers = allowedTabs.includes("users");
  const canAccessSupportPaths = allowedTabs.includes("support-paths");
  const canAccessTeam = allowedTabs.includes("team");
  const canAccessResources = allowedTabs.includes("resources");
  const canAccessMessages = allowedTabs.includes("messages");
  const canMarkMessages = canAccessMessages;
  const canDeleteMessages = currentRole === "admin";
  const activeUsersCount = users.filter((item) => item.isActive).length;
  const inactiveUsersCount = users.length - activeUsersCount;
  const publishedResourcesCount = resources.filter((item) => item.isPublished).length;
  const draftResourcesCount = resources.length - publishedResourcesCount;
  const activeTeamCount = teamMembers.filter((item) => item.isActive).length;
  const inactiveTeamCount = teamMembers.length - activeTeamCount;
  const allMessagesCount = messagesSummary.totalAll;
  const unreadMessagesCount = messagesSummary.statusTotals.new;
  const readMessagesCount = messagesSummary.statusTotals.read;
  const inProgressMessagesCount = messagesSummary.statusTotals.in_progress;
  const respondedMessagesCount = messagesSummary.statusTotals.responded;
  const filteredMessages = messages;

  useEffect(() => {
    if (!session || !canAccessMessages) return;
    if (activeTab !== "messages") return;

    void loadMessagesData();
  }, [activeTab, canAccessMessages, loadMessagesData, session]);

  useEffect(() => {
    if (!visibleTabs.length) return;

    const currentTabIsVisible = visibleTabs.some((tab) => tab.id === activeTab);
    if (!currentTabIsVisible) {
      setActiveTab(visibleTabs[0].id);
    }
  }, [activeTab, visibleTabs]);

  useEffect(() => {
    if (activeTab === "users") return;
    setIsCreateUserFormOpen(false);
    setOpenUserEditorId(null);
  }, [activeTab]);

  useEffect(() => {
    if (activeTab === "support-paths") return;
    setIsCreateSupportFormOpen(false);
    setCreateSupportFormErrors({});
    setOpenSupportEditorId(null);
  }, [activeTab]);

  useEffect(() => {
    if (activeTab === "team") return;
    setIsCreateTeamFormOpen(false);
    setCreateTeamFormErrors({});
    setOpenTeamEditorId(null);
  }, [activeTab]);

  useEffect(() => {
    if (activeTab === "resources") return;
    setIsCreateResourceFormOpen(false);
    setCreateResourceFormErrors({});
    setOpenResourceEditorId(null);
  }, [activeTab]);

  return {
    session,
    isBootstrapping,
    isLoadingData,
    busyAction,
    currentUser,
    isForbidden,
    users,
    userDrafts,
    setUserDrafts,
    supportPaths,
    supportPathDrafts,
    setSupportPathDrafts,
    resources,
    resourceDrafts,
    setResourceDrafts,
    teamMembers,
    teamMemberDrafts,
    setTeamMemberDrafts,
    messages,
    messagesFilter,
    setMessagesFilter,
    messagesSearch,
    setMessagesSearch,
    messagesPage,
    setMessagesPage,
    messagesTotal,
    messagesTotalPages,
    isLoadingMessages,
    stats,
    statsRangePreset,
    setStatsRangePreset,
    statsCustomFrom,
    setStatsCustomFrom,
    statsCustomTo,
    setStatsCustomTo,
    hasPendingStatsFilters,
    activeTab,
    setActiveTab,
    error,
    success,
    loginError,
    loginForm,
    setLoginForm,
    profileForm,
    setProfileForm,
    passwordForm,
    setPasswordForm,
    createForm,
    setCreateForm,
    isCreateUserFormOpen,
    setIsCreateUserFormOpen,
    openUserEditorId,
    setOpenUserEditorId,
    createSupportForm,
    setCreateSupportForm,
    isCreateSupportFormOpen,
    setIsCreateSupportFormOpen,
    createSupportFormErrors,
    setCreateSupportFormErrors,
    openSupportEditorId,
    setOpenSupportEditorId,
    createTeamForm,
    setCreateTeamForm,
    isCreateTeamFormOpen,
    setIsCreateTeamFormOpen,
    createTeamFormErrors,
    setCreateTeamFormErrors,
    openTeamEditorId,
    setOpenTeamEditorId,
    createResourceForm,
    setCreateResourceForm,
    isCreateResourceFormOpen,
    setIsCreateResourceFormOpen,
    createResourceFormErrors,
    setCreateResourceFormErrors,
    openResourceEditorId,
    setOpenResourceEditorId,
    isCustomRangeIncomplete,
    visibleTabs,
    canAccessSummary,
    canAccessProfile,
    canAccessUsers,
    canAccessSupportPaths,
    canAccessTeam,
    canAccessResources,
    canAccessMessages,
    canMarkMessages,
    canDeleteMessages,
    activeUsersCount,
    inactiveUsersCount,
    publishedResourcesCount,
    draftResourcesCount,
    activeTeamCount,
    inactiveTeamCount,
    unreadMessagesCount,
    readMessagesCount,
    inProgressMessagesCount,
    respondedMessagesCount,
    allMessagesCount,
    filteredMessages,
    handleApplyStatsFilters,
    handleLogin,
    handleUpdateProfile,
    handleChangePassword,
    handleLogout,
    handleCreateUser,
    handleUpdateUser,
    handleDeleteUser,
    handleToggleCreateUserForm,
    handleToggleUserEditor,
    handleToggleCreateSupportForm,
    handleToggleSupportEditor,
    handleCreateSupportPath,
    handleUpdateSupportPath,
    handleDeleteSupportPath,
    handleToggleCreateTeamForm,
    handleToggleTeamEditor,
    handleCreateTeamMember,
    handleUpdateTeamMember,
    handleDeleteTeamMember,
    handleToggleCreateResourceForm,
    handleToggleResourceEditor,
    handleCreateResource,
    handleUpdateResource,
    handleDeleteResource,
    handleMarkMessageRead,
    handleUpdateMessageStatus,
    handleDeleteMessage,
  };
}
