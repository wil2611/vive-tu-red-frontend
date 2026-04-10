"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { roleLabel } from "./admin.shared";
import { useAdminDashboard } from "./hooks/useAdminDashboard";
import { MessagesTab } from "./tabs/MessagesTab";
import { ProfileTab } from "./tabs/ProfileTab";
import { ResourcesTab } from "./tabs/ResourcesTab";
import { SummaryTab } from "./tabs/SummaryTab";
import { SupportPathsTab } from "./tabs/SupportPathsTab";
import { TeamTab } from "./tabs/TeamTab";
import { AlliesTab } from "./tabs/AlliesTab";
import { UsersTab } from "./tabs/UsersTab";

export default function AdminPage() {
  const {
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
    projectAllies,
    projectAllyDrafts,
    setProjectAllyDrafts,
    resources,
    resourceDrafts,
    setResourceDrafts,
    teamMembers,
    teamMemberDrafts,
    setTeamMemberDrafts,
    messagesFilter,
    setMessagesFilter,
    messagesSearch,
    setMessagesSearch,
    messagesPage,
    setMessagesPage,
    messagesTotalPages,
    allMessagesCount,
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
    createAllyForm,
    setCreateAllyForm,
    isCreateAllyFormOpen,
    setIsCreateAllyFormOpen,
    createAllyFormErrors,
    setCreateAllyFormErrors,
    openAllyEditorId,
    setOpenAllyEditorId,
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
    canAccessAllies,
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
    activeAlliesCount,
    inactiveAlliesCount,
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
    handleToggleCreateAllyForm,
    handleToggleAllyEditor,
    handleCreateProjectAlly,
    handleUpdateProjectAlly,
    handleDeleteProjectAlly,
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
  } = useAdminDashboard();
  const [dismissedToastKey, setDismissedToastKey] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const toastTone = error ? "error" : success ? "success" : null;
  const toastMessage = error ?? success ?? null;
  const toastKey = toastTone && toastMessage ? `${toastTone}:${toastMessage}` : null;
  const isToastVisible = !!toastKey && dismissedToastKey !== toastKey;

  useEffect(() => {
    if (!toastKey) {
      const resetId = window.setTimeout(() => {
        setDismissedToastKey(null);
      }, 0);
      return () => window.clearTimeout(resetId);
    }

    const timeoutMs = toastTone === "error" ? 5200 : 3600;
    const timeoutId = window.setTimeout(() => {
      setDismissedToastKey(toastKey);
    }, timeoutMs);

    return () => window.clearTimeout(timeoutId);
  }, [toastKey, toastTone]);

  return (
    <section className={`${styles.page} ${!session ? styles.pageLoggedOut : ""}`}>
      <div className={`container ${styles.shell} ${!session ? styles.shellLoggedOut : ""}`}>
        {isBootstrapping ? (
          <article className={styles.panel}>
            <h2 className={styles.panelTitle}>Verificando sesion...</h2>
          </article>
        ) : !session ? (
          <article className={`${styles.panel} ${styles.loginCard}`}>
            <div className={styles.panelHeader}>
              <div className={styles.loginBrand}>
                <Image
                  src="/logo_principal.png"
                  alt="Vive Tu Red"
                  width={170}
                  height={52}
                  className={styles.loginLogo}
                  priority
                />
              </div>
            </div>

            <form onSubmit={handleLogin} className={styles.loginGrid}>
              <div className={styles.loginField}>
                <label htmlFor="login-email">Email</label>
                <input
                  id="login-email"
                  type="email"
                  autoComplete="email"
                  value={loginForm.email}
                  onChange={(event) =>
                    setLoginForm((prev) => ({ ...prev, email: event.target.value }))
                  }
                  required
                />
              </div>

              <div className={styles.loginField}>
                <label htmlFor="login-password">Contrasena</label>
                <div className={styles.passwordControl}>
                  <input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    className={styles.passwordInput}
                    value={loginForm.password}
                    onChange={(event) =>
                      setLoginForm((prev) => ({ ...prev, password: event.target.value }))
                    }
                    minLength={6}
                    required
                  />
                  <button
                    type="button"
                    className={styles.passwordToggle}
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={showPassword ? "Ocultar contrasena" : "Mostrar contrasena"}
                    title={showPassword ? "Ocultar contrasena" : "Mostrar contrasena"}
                  >
                    {showPassword ? (
                      <svg
                        className={styles.passwordIcon}
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path
                          d="M3 3L21 21"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                        />
                        <path
                          d="M9.86 5.13C10.55 5.04 11.26 5 12 5C16.48 5 20.27 7.94 21.54 12C21 13.72 20.06 15.24 18.84 16.45"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M6.24 6.24C4.58 7.54 3.29 9.55 2.46 12C3.73 16.06 7.52 19 12 19C13.64 19 15.18 18.6 16.54 17.9"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : (
                      <svg
                        className={styles.passwordIcon}
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path
                          d="M2.46 12C3.73 7.94 7.52 5 12 5C16.48 5 20.27 7.94 21.54 12C20.27 16.06 16.48 19 12 19C7.52 19 3.73 16.06 2.46 12Z"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <p className={styles.loginMeta}>Solo personal autorizado puede acceder al panel.</p>

              <button
                type="submit"
                className={`btn btn-primary ${styles.loginSubmit}`}
                data-loading={busyAction === "login"}
                disabled={busyAction === "login"}
              >
                {busyAction === "login" ? (
                  <>
                    <span className={styles.loginSpinner} aria-hidden="true" />
                    Ingresando...
                  </>
                ) : (
                  "Iniciar sesion"
                )}
              </button>
            </form>

            {loginError && <p className={styles.statusError}>{loginError}</p>}
          </article>
        ) : isForbidden ? (
          <article className={styles.panel}>
            <div className={styles.panelActions}>
              <button
                type="button"
                className="btn btn-outline"
                onClick={handleLogout}
                disabled={busyAction === "logout"}
              >
                {busyAction === "logout" ? "Cerrando..." : "Cerrar sesion"}
              </button>
            </div>
            <h2 className={styles.panelTitle}>Acceso restringido</h2>
            <p className={styles.panelHint}>
              El usuario autenticado no tiene permisos para este panel. Rol actual:{" "}
              <strong>{currentUser ? roleLabel(currentUser.role) : "desconocido"}</strong>.
            </p>
          </article>
        ) : (
          <div className={styles.dashboardGrid}>
            <div className={styles.tabsSection}>
              <div className={styles.tabsHeaderRow}>
                <nav className={styles.tabsBar} aria-label="Secciones del panel de administracion">
                  {visibleTabs.map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      className={styles.tabButton}
                      data-active={activeTab === tab.id}
                      aria-current={activeTab === tab.id ? "page" : undefined}
                      onClick={() => setActiveTab(tab.id)}
                    >
                      {tab.label}
                    </button>
                  ))}
                </nav>
                <button
                  type="button"
                  className={`btn btn-outline ${styles.tabsLogoutButton}`}
                  onClick={handleLogout}
                  disabled={busyAction === "logout"}
                >
                  {busyAction === "logout" ? "Cerrando..." : "Cerrar sesion"}
                </button>
              </div>
            </div>

            {canAccessSummary && activeTab === "summary" ? (
              <SummaryTab
                isLoadingData={isLoadingData}
                stats={stats}
                busyAction={busyAction}
                statsRangePreset={statsRangePreset}
                setStatsRangePreset={setStatsRangePreset}
                statsCustomFrom={statsCustomFrom}
                setStatsCustomFrom={setStatsCustomFrom}
                statsCustomTo={statsCustomTo}
                setStatsCustomTo={setStatsCustomTo}
                hasPendingStatsFilters={hasPendingStatsFilters}
                isCustomRangeIncomplete={isCustomRangeIncomplete}
                onApplyStatsFilters={handleApplyStatsFilters}
              />
            ) : null}

            {canAccessProfile && activeTab === "profile" && currentUser ? (
              <ProfileTab
                currentUser={currentUser}
                profileForm={profileForm}
                setProfileForm={setProfileForm}
                passwordForm={passwordForm}
                setPasswordForm={setPasswordForm}
                busyAction={busyAction}
                onUpdateProfile={handleUpdateProfile}
                onChangePassword={handleChangePassword}
              />
            ) : null}

            {canAccessUsers && activeTab === "users" ? (
              <UsersTab
                users={users}
                activeUsersCount={activeUsersCount}
                inactiveUsersCount={inactiveUsersCount}
                createForm={createForm}
                setCreateForm={setCreateForm}
                isCreateUserFormOpen={isCreateUserFormOpen}
                setIsCreateUserFormOpen={setIsCreateUserFormOpen}
                openUserEditorId={openUserEditorId}
                setOpenUserEditorId={setOpenUserEditorId}
                userDrafts={userDrafts}
                setUserDrafts={setUserDrafts}
                busyAction={busyAction}
                currentUserId={currentUser?.id ?? null}
                onToggleCreateUserForm={handleToggleCreateUserForm}
                onToggleUserEditor={handleToggleUserEditor}
                onCreateUser={handleCreateUser}
                onUpdateUser={handleUpdateUser}
                onDeleteUser={handleDeleteUser}
              />
            ) : null}

            {canAccessSupportPaths && activeTab === "support-paths" ? (
              <SupportPathsTab
                supportPaths={supportPaths}
                createSupportForm={createSupportForm}
                setCreateSupportForm={setCreateSupportForm}
                createSupportFormErrors={createSupportFormErrors}
                setCreateSupportFormErrors={setCreateSupportFormErrors}
                isCreateSupportFormOpen={isCreateSupportFormOpen}
                setIsCreateSupportFormOpen={setIsCreateSupportFormOpen}
                supportPathDrafts={supportPathDrafts}
                setSupportPathDrafts={setSupportPathDrafts}
                openSupportEditorId={openSupportEditorId}
                setOpenSupportEditorId={setOpenSupportEditorId}
                busyAction={busyAction}
                onToggleCreateSupportForm={handleToggleCreateSupportForm}
                onToggleSupportEditor={handleToggleSupportEditor}
                onCreateSupportPath={handleCreateSupportPath}
                onUpdateSupportPath={handleUpdateSupportPath}
                onDeleteSupportPath={handleDeleteSupportPath}
              />
            ) : null}

            {canAccessAllies && activeTab === "allies" ? (
              <AlliesTab
                projectAllies={projectAllies}
                activeAlliesCount={activeAlliesCount}
                inactiveAlliesCount={inactiveAlliesCount}
                createAllyForm={createAllyForm}
                setCreateAllyForm={setCreateAllyForm}
                createAllyFormErrors={createAllyFormErrors}
                setCreateAllyFormErrors={setCreateAllyFormErrors}
                isCreateAllyFormOpen={isCreateAllyFormOpen}
                setIsCreateAllyFormOpen={setIsCreateAllyFormOpen}
                projectAllyDrafts={projectAllyDrafts}
                setProjectAllyDrafts={setProjectAllyDrafts}
                openAllyEditorId={openAllyEditorId}
                setOpenAllyEditorId={setOpenAllyEditorId}
                busyAction={busyAction}
                onToggleCreateAllyForm={handleToggleCreateAllyForm}
                onToggleAllyEditor={handleToggleAllyEditor}
                onCreateProjectAlly={handleCreateProjectAlly}
                onUpdateProjectAlly={handleUpdateProjectAlly}
                onDeleteProjectAlly={handleDeleteProjectAlly}
              />
            ) : null}

            {canAccessResources && activeTab === "resources" ? (
              <ResourcesTab
                resources={resources}
                publishedResourcesCount={publishedResourcesCount}
                draftResourcesCount={draftResourcesCount}
                createResourceForm={createResourceForm}
                setCreateResourceForm={setCreateResourceForm}
                createResourceFormErrors={createResourceFormErrors}
                setCreateResourceFormErrors={setCreateResourceFormErrors}
                isCreateResourceFormOpen={isCreateResourceFormOpen}
                setIsCreateResourceFormOpen={setIsCreateResourceFormOpen}
                resourceDrafts={resourceDrafts}
                setResourceDrafts={setResourceDrafts}
                openResourceEditorId={openResourceEditorId}
                setOpenResourceEditorId={setOpenResourceEditorId}
                busyAction={busyAction}
                onToggleCreateResourceForm={handleToggleCreateResourceForm}
                onToggleResourceEditor={handleToggleResourceEditor}
                onCreateResource={handleCreateResource}
                onUpdateResource={handleUpdateResource}
                onDeleteResource={handleDeleteResource}
              />
            ) : null}

            {canAccessTeam && activeTab === "team" ? (
              <TeamTab
                teamMembers={teamMembers}
                activeTeamCount={activeTeamCount}
                inactiveTeamCount={inactiveTeamCount}
                createTeamForm={createTeamForm}
                setCreateTeamForm={setCreateTeamForm}
                createTeamFormErrors={createTeamFormErrors}
                setCreateTeamFormErrors={setCreateTeamFormErrors}
                isCreateTeamFormOpen={isCreateTeamFormOpen}
                setIsCreateTeamFormOpen={setIsCreateTeamFormOpen}
                teamMemberDrafts={teamMemberDrafts}
                setTeamMemberDrafts={setTeamMemberDrafts}
                openTeamEditorId={openTeamEditorId}
                setOpenTeamEditorId={setOpenTeamEditorId}
                busyAction={busyAction}
                onToggleCreateTeamForm={handleToggleCreateTeamForm}
                onToggleTeamEditor={handleToggleTeamEditor}
                onCreateTeamMember={handleCreateTeamMember}
                onUpdateTeamMember={handleUpdateTeamMember}
                onDeleteTeamMember={handleDeleteTeamMember}
              />
            ) : null}

            {canAccessMessages && activeTab === "messages" ? (
              <MessagesTab
                filteredMessages={filteredMessages}
                unreadMessagesCount={unreadMessagesCount}
                readMessagesCount={readMessagesCount}
                inProgressMessagesCount={inProgressMessagesCount}
                respondedMessagesCount={respondedMessagesCount}
                messagesFilter={messagesFilter}
                setMessagesFilter={setMessagesFilter}
                messagesSearch={messagesSearch}
                setMessagesSearch={setMessagesSearch}
                messagesPage={messagesPage}
                setMessagesPage={setMessagesPage}
                allMessagesCount={allMessagesCount}
                messagesTotalPages={messagesTotalPages}
                isLoadingMessages={isLoadingMessages}
                busyAction={busyAction}
                canMarkMessages={canMarkMessages}
                canDeleteMessages={canDeleteMessages}
                onMarkMessageRead={handleMarkMessageRead}
                onUpdateMessageStatus={handleUpdateMessageStatus}
                onDeleteMessage={handleDeleteMessage}
              />
            ) : null}
          </div>
        )}
      </div>

      {isToastVisible && toastKey && toastTone && toastMessage ? (
        <div className={styles.toastViewport} role="status" aria-live="polite">
          <div className={styles.toastCard} data-tone={toastTone}>
            <p className={styles.toastText}>{toastMessage}</p>
            <button
              type="button"
              className={styles.toastClose}
              onClick={() => setDismissedToastKey(toastKey)}
              aria-label="Cerrar notificacion"
            >
              ×
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}
