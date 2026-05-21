import type { Dispatch, FormEvent, SetStateAction } from "react";
import type { CreateUserPayload, UserRecord, UserRole } from "@/lib/api";
import { roleLabel, type UserDraft } from "../admin.shared";
import styles from "../page.module.css";

type UsersTabProps = {
  users: UserRecord[];
  activeUsersCount: number;
  inactiveUsersCount: number;
  createForm: CreateUserPayload;
  setCreateForm: Dispatch<SetStateAction<CreateUserPayload>>;
  isCreateUserFormOpen: boolean;
  setIsCreateUserFormOpen: Dispatch<SetStateAction<boolean>>;
  openUserEditorId: string | null;
  setOpenUserEditorId: Dispatch<SetStateAction<string | null>>;
  userDrafts: Record<string, UserDraft>;
  setUserDrafts: Dispatch<SetStateAction<Record<string, UserDraft>>>;
  busyAction: string | null;
  currentUserId: string | null;
  onToggleCreateUserForm: () => void;
  onToggleUserEditor: (userId: string) => void;
  onCreateUser: (event: FormEvent<HTMLFormElement>) => void | Promise<void>;
  onUpdateUser: (user: UserRecord) => void | Promise<void>;
  onDeleteUser: (user: UserRecord) => void | Promise<void>;
};

export function UsersTab({
  users,
  activeUsersCount,
  inactiveUsersCount,
  createForm,
  setCreateForm,
  isCreateUserFormOpen,
  setIsCreateUserFormOpen,
  openUserEditorId,
  setOpenUserEditorId,
  userDrafts,
  setUserDrafts,
  busyAction,
  currentUserId,
  onToggleCreateUserForm,
  onToggleUserEditor,
  onCreateUser,
  onUpdateUser,
  onDeleteUser,
}: UsersTabProps) {
  return (
    <article className={styles.panel}>
      <div className={styles.panelHeader}>
        <h2 className={`${styles.panelTitle} ${styles.profileTitle}`}>Usuarios</h2>
        <p className={styles.panelHint}>Gestion de estado y rol para cuentas registradas.</p>
        <div className={styles.supportMetaRow}>
          <span className={`${styles.supportMetaBadge} ${styles.supportMetaBadgeTotal}`}>
            Total: {users.length}
          </span>
          <span className={`${styles.supportMetaBadge} ${styles.supportMetaBadgeActive}`}>
            Activos: {activeUsersCount}
          </span>
          <span className={`${styles.supportMetaBadge} ${styles.supportMetaBadgeInactive}`}>
            Inactivos: {inactiveUsersCount}
          </span>
        </div>
      </div>

      <div className={styles.supportCreateToolbar}>
        <button
          type="button"
          className={`btn btn-primary ${styles.supportCreateToggle}`}
          onClick={onToggleCreateUserForm}
          aria-expanded={isCreateUserFormOpen}
          aria-controls="user-create-panel"
          disabled={busyAction === "create-user"}
        >
          <span>{isCreateUserFormOpen ? "Ocultar formulario" : "Agregar usuario"}</span>
          <span
            className={styles.supportCreateToggleIcon}
            data-open={isCreateUserFormOpen}
            aria-hidden="true"
          >
            &#9662;
          </span>
        </button>
      </div>

      <div
        id="user-create-panel"
        className={styles.supportCreateCollapse}
        data-open={isCreateUserFormOpen}
      >
        <div className={styles.supportCreateCollapseInner}>
          <form className={styles.createForm} onSubmit={onCreateUser}>
            <div className={styles.formGrid}>
              <div>
                <label htmlFor="create-firstName">Nombre</label>
                <input
                  id="create-firstName"
                  value={createForm.firstName}
                  onChange={(event) =>
                    setCreateForm((prev) => ({ ...prev, firstName: event.target.value }))
                  }
                  required
                />
              </div>
              <div>
                <label htmlFor="create-lastName">Apellido</label>
                <input
                  id="create-lastName"
                  value={createForm.lastName}
                  onChange={(event) =>
                    setCreateForm((prev) => ({ ...prev, lastName: event.target.value }))
                  }
                  required
                />
              </div>
              <div>
                <label htmlFor="create-email">Email</label>
                <input
                  id="create-email"
                  type="email"
                  value={createForm.email}
                  onChange={(event) =>
                    setCreateForm((prev) => ({ ...prev, email: event.target.value }))
                  }
                  required
                />
              </div>
              <div>
                <label htmlFor="create-password">Contraseña</label>
                <input
                  id="create-password"
                  type="password"
                  minLength={6}
                  value={createForm.password}
                  onChange={(event) =>
                    setCreateForm((prev) => ({ ...prev, password: event.target.value }))
                  }
                  required
                />
              </div>
            </div>

            <div className={styles.fullWidth}>
              <label htmlFor="create-role">Rol</label>
              <select
                id="create-role"
                value={createForm.role}
                onChange={(event) =>
                  setCreateForm((prev) => ({ ...prev, role: event.target.value as UserRole }))
                }
              >
                <option value="admin">Admin</option>
                <option value="editor">Editor</option>
                <option value="investigador">Investigador</option>
              </select>
            </div>

            <div className={styles.supportCreateActions}>
              <button
                type="button"
                className={styles.secondaryButton}
                onClick={() => setIsCreateUserFormOpen(false)}
                disabled={busyAction === "create-user"}
              >
                Cancelar
              </button>
              <button type="submit" className="btn btn-primary" disabled={busyAction === "create-user"}>
                {busyAction === "create-user" ? "Creando..." : "Guardar usuario"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className={styles.supportRegistryWrap}>
        <div className={styles.supportTableHeader}>
          <h3 className={styles.supportTableTitle}>Usuarios registrados</h3>
        </div>
        {users.length ? (
          <div className={styles.supportRegistryList}>
            {users.map((user) => {
              const draft = userDrafts[user.id] ?? {
                role: user.role,
                isActive: user.isActive,
              };
              const isUpdating = busyAction === `update-${user.id}`;
              const isDeleting = busyAction === `delete-${user.id}`;
              const isEditorOpen = openUserEditorId === user.id;
              const displayName = `${user.firstName} ${user.lastName}`.trim() || user.email;

              return (
                <article key={user.id} className={styles.supportListItem}>
                  <div className={styles.supportListSummary}>
                    <div className={styles.supportListIdentity}>
                      <div className={styles.supportListNameRow}>
                        <h4 className={styles.supportListName}>{displayName}</h4>
                        <span className={`${styles.supportMetaBadge} ${styles.userRoleBadge}`}>
                          {roleLabel(draft.role)}
                        </span>
                        <span
                          className={styles.supportListStatus}
                          data-active={draft.isActive ? "true" : "false"}
                        >
                          {draft.isActive ? "Activo" : "Inactivo"}
                        </span>
                      </div>
                    </div>
                    <div className={styles.supportListActions}>
                      <button
                        type="button"
                        className={`${styles.supportActionBtn} ${styles.supportActionEdit}`}
                        onClick={() => onToggleUserEditor(user.id)}
                        disabled={isUpdating || isDeleting || user.id === currentUserId}
                      >
                        {isEditorOpen ? "Cerrar" : "Editar"}
                      </button>
                      <button
                        type="button"
                        className={`${styles.supportActionBtn} ${styles.supportActionDelete}`}
                        onClick={() => void onDeleteUser(user)}
                        disabled={isUpdating || isDeleting || user.id === currentUserId}
                      >
                        {isDeleting ? "Eliminando..." : "Eliminar"}
                      </button>
                    </div>
                  </div>

                  <div className={styles.supportEditorCollapse} data-open={isEditorOpen}>
                    <div className={styles.supportEditorInner}>
                      <div className={styles.supportRegistryFields}>
                        <div className={styles.supportField}>
                          <label>Rol</label>
                          <select
                            value={draft.role}
                            onChange={(event) =>
                              setUserDrafts((prev) => ({
                                ...prev,
                                [user.id]: {
                                  ...draft,
                                  role: event.target.value as UserRole,
                                },
                              }))
                            }
                          >
                            <option value="admin">Admin</option>
                            <option value="editor">Editor</option>
                            <option value="investigador">Investigador</option>
                          </select>
                        </div>

                        <div className={styles.supportField}>
                          <label>Estado</label>
                          <select
                            value={draft.isActive ? "active" : "inactive"}
                            onChange={(event) =>
                              setUserDrafts((prev) => ({
                                ...prev,
                                [user.id]: {
                                  ...draft,
                                  isActive: event.target.value === "active",
                                },
                              }))
                            }
                          >
                            <option value="active">Activo</option>
                            <option value="inactive">Inactivo</option>
                          </select>
                        </div>

                        <div className={styles.supportField}>
                          <label>Email</label>
                          <input value={user.email} readOnly />
                        </div>
                      </div>

                      <div className={styles.supportRegistryActions}>
                        <button
                          type="button"
                          className={`${styles.supportActionBtn} ${styles.supportEditorSave}`}
                          onClick={() => void onUpdateUser(user)}
                          disabled={isUpdating || isDeleting || user.id === currentUserId}
                        >
                          {isUpdating ? "Guardando..." : "Guardar"}
                        </button>
                        <button
                          type="button"
                          className={`${styles.supportActionBtn} ${styles.supportEditorCancel}`}
                          onClick={() => setOpenUserEditorId(null)}
                          disabled={isUpdating || isDeleting}
                        >
                          Cancelar
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <p className={styles.statusMuted}>No hay usuarios para mostrar.</p>
        )}
      </div>
    </article>
  );
}
