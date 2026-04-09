"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ApiClientError,
  clearAuthSession,
  getCurrentAuthSession,
  getCurrentUser,
  getStatsDashboard,
  listAdminContactMessages,
  listSupportPathsAdmin,
  listUsers,
  type AuthSession,
  type ContactMessage,
  type CreateSupportPathPayload,
  type CreateUserPayload,
  type SupportPath,
  type StatsDashboard,
  type UserRecord,
} from "@/lib/api";
import {
  ADMIN_SECTION_TABS,
  INITIAL_SUPPORT_FORM,
  buildSupportDraft,
  getAllowedTabsByRole,
  type AdminSectionTab,
  type MessageFilter,
  type StatsRangePreset,
  type SupportCreateFormErrors,
  type SupportPathDraft,
  type UserDraft,
} from "../admin.shared";
import { useAdminAuthHandlers } from "./handlers/useAdminAuthHandlers";
import { useAdminMessageHandlers } from "./handlers/useAdminMessageHandlers";
import { useAdminProfileHandlers } from "./handlers/useAdminProfileHandlers";
import { getErrorText } from "./handlers/shared";
import { useAdminStatsHandlers } from "./handlers/useAdminStatsHandlers";
import { useAdminSupportPathHandlers } from "./handlers/useAdminSupportPathHandlers";
import { useAdminUserHandlers } from "./handlers/useAdminUserHandlers";

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
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [messagesFilter, setMessagesFilter] = useState<MessageFilter>("all");
  const [messagesSearch, setMessagesSearch] = useState("");
  const [debouncedMessagesSearch, setDebouncedMessagesSearch] = useState("");
  const [messagesPage, setMessagesPage] = useState(1);
  const [messagesLimit] = useState(12);
  const [messagesTotal, setMessagesTotal] = useState(0);
  const [messagesTotalPages, setMessagesTotalPages] = useState(1);
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

  const clearDashboardState = useCallback(() => {
    setCurrentUser(null);
    setIsForbidden(false);
    setUsers([]);
    setUserDrafts({});
    setSupportPaths([]);
    setSupportPathDrafts({});
    setMessages([]);
    setMessagesTotal(0);
    setMessagesTotalPages(1);
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

  const loadMessagesData = useCallback(async () => {
    const allowedTabs = getAllowedTabsByRole(currentUser?.role ?? null);
    if (!allowedTabs.includes("messages")) {
      setMessages([]);
      setMessagesTotal(0);
      setMessagesTotalPages(1);
      return;
    }

    setIsLoadingMessages(true);
    setError(null);

    try {
      const messagePage = await listAdminContactMessages(buildMessagesQuery());
      setMessages(messagePage.items);
      setMessagesTotal(messagePage.total);
      setMessagesTotalPages(messagePage.totalPages);

      if (messagePage.page !== messagesPage) {
        setMessagesPage(messagePage.page);
      }
    } catch (errorValue) {
      setError(getErrorText(errorValue, "No se pudieron cargar los mensajes"));

      if (errorValue instanceof ApiClientError && errorValue.status === 401) {
        clearSessionState();
      }
    } finally {
      setIsLoadingMessages(false);
    }
  }, [buildMessagesQuery, clearSessionState, currentUser?.role, messagesPage]);

  const loadDashboardData = useCallback(
    async (showLoader = true) => {
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
        const statsQuery = buildStatsQuery();

        if (!allowedTabs.length) {
          setIsForbidden(true);
          setUsers([]);
          setUserDrafts({});
          setSupportPaths([]);
          setSupportPathDrafts({});
          setMessages([]);
          setStats(null);
          return;
        }

        setIsForbidden(false);
        const usersPromise: Promise<UserRecord[] | null> = canManageUsers
          ? listUsers()
          : Promise.resolve(null);
        const allMessagesPromise: Promise<
          | {
              items: ContactMessage[];
              total: number;
              totalPages: number;
            }
          | null
        > = canReadMessages
          ? listAdminContactMessages(buildMessagesQuery())
          : Promise.resolve(null);
        const supportPathsPromise: Promise<SupportPath[] | null> = canManageSupportPaths
          ? listSupportPathsAdmin()
          : Promise.resolve(null);
        const statsPromise: Promise<StatsDashboard | null> = canReadSummary
          ? getStatsDashboard(statsQuery)
          : Promise.resolve(null);

        const [usersData, allMessagesPage, supportPathsData, statsData] = await Promise.all([
          usersPromise,
          allMessagesPromise,
          supportPathsPromise,
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

        if (allMessagesPage) {
          setMessages(allMessagesPage.items);
          setMessagesTotal(allMessagesPage.total);
          setMessagesTotalPages(allMessagesPage.totalPages);
        } else {
          setMessages([]);
          setMessagesTotal(0);
          setMessagesTotalPages(1);
        }
        setStats(statsData);
        setAppliedStatsQueryKey(serializeStatsQuery(statsQuery));
      } catch (errorValue) {
        setError(getErrorText(errorValue, "No se pudieron cargar los datos del panel"));

        if (errorValue instanceof ApiClientError && errorValue.status === 401) {
          clearSessionState();
        }
      } finally {
        if (showLoader) setIsLoadingData(false);
      }
    },
    [
      buildMessagesQuery,
      buildStatsQuery,
      clearSessionState,
      serializeStatsQuery,
      syncSupportPathDrafts,
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
  const canAccessMessages = allowedTabs.includes("messages");
  const canMarkMessages = canAccessMessages;
  const canDeleteMessages = currentRole === "admin";
  const activeUsersCount = users.filter((item) => item.isActive).length;
  const inactiveUsersCount = users.length - activeUsersCount;
  const unreadMessagesCount = messages.filter((item) => item.status === "new").length;
  const readMessagesCount = messages.filter((item) => item.status === "read").length;
  const inProgressMessagesCount = messages.filter((item) => item.status === "in_progress").length;
  const respondedMessagesCount = messages.filter((item) => item.status === "responded").length;
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
    isCustomRangeIncomplete,
    visibleTabs,
    canAccessSummary,
    canAccessProfile,
    canAccessUsers,
    canAccessSupportPaths,
    canAccessMessages,
    canMarkMessages,
    canDeleteMessages,
    activeUsersCount,
    inactiveUsersCount,
    unreadMessagesCount,
    readMessagesCount,
    inProgressMessagesCount,
    respondedMessagesCount,
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
    handleMarkMessageRead,
    handleUpdateMessageStatus,
    handleDeleteMessage,
  };
}
