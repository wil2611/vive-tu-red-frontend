import { useState, type Dispatch, type FormEvent, type SetStateAction } from "react";
import type { UserRecord } from "@/lib/api";
import { roleLabel } from "../admin.shared";
import styles from "../page.module.css";

type ProfileForm = {
  email: string;
  firstName: string;
  lastName: string;
};

type PasswordForm = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

type ProfileTabProps = {
  currentUser: UserRecord;
  profileForm: ProfileForm;
  setProfileForm: Dispatch<SetStateAction<ProfileForm>>;
  passwordForm: PasswordForm;
  setPasswordForm: Dispatch<SetStateAction<PasswordForm>>;
  busyAction: string | null;
  onUpdateProfile: (event: FormEvent<HTMLFormElement>) => void | Promise<void>;
  onChangePassword: (event: FormEvent<HTMLFormElement>) => void | Promise<void>;
};

export function ProfileTab({
  currentUser,
  profileForm,
  setProfileForm,
  passwordForm,
  setPasswordForm,
  busyAction,
  onUpdateProfile,
  onChangePassword,
}: ProfileTabProps) {
  const [isProfileFormOpen, setIsProfileFormOpen] = useState(false);
  const [isPasswordFormOpen, setIsPasswordFormOpen] = useState(false);

  const handleToggleProfileForm = () => {
    setIsProfileFormOpen((prev) => {
      const next = !prev;
      if (next) setIsPasswordFormOpen(false);
      return next;
    });
  };

  const handleTogglePasswordForm = () => {
    setIsPasswordFormOpen((prev) => {
      const next = !prev;
      if (next) setIsProfileFormOpen(false);
      return next;
    });
  };

  return (
    <article className={styles.panel}>
      <div className={styles.panelHeader}>
        <h2 className={`${styles.panelTitle} ${styles.profileTitle}`}>Mi perfil</h2>
        <p className={styles.panelHint}>
          Consulta tus datos de acceso y actualiza tu informacion personal o tu contrasena.
        </p>
      </div>

      <div className={styles.profileGrid}>
        <section className={styles.profileCard}>
          <h3 className={styles.profileCardTitle}>Mi informacion</h3>
          <dl className={styles.profileInfoGrid}>
            <div className={styles.profileInfoItem}>
              <dt className={styles.profileInfoLabel}>Nombre</dt>
              <dd className={styles.profileInfoValue}>{currentUser.firstName}</dd>
            </div>
            <div className={styles.profileInfoItem}>
              <dt className={styles.profileInfoLabel}>Apellido</dt>
              <dd className={styles.profileInfoValue}>{currentUser.lastName}</dd>
            </div>
            <div className={styles.profileInfoItem}>
              <dt className={styles.profileInfoLabel}>Email</dt>
              <dd className={styles.profileInfoValue}>{currentUser.email}</dd>
            </div>
            <div className={styles.profileInfoItem}>
              <dt className={styles.profileInfoLabel}>Rol</dt>
              <dd className={styles.profileInfoValue}>{roleLabel(currentUser.role)}</dd>
            </div>
          </dl>
        </section>

        <section className={styles.profileCard}>
          <h3 className={styles.profileCardTitle}>Acciones de cuenta</h3>
          <div className={styles.profileActionsGrid}>
            <div className={styles.profileActionsRow}>
              <button
                type="button"
                className={`btn btn-primary ${styles.supportCreateToggle}`}
                onClick={handleToggleProfileForm}
                aria-expanded={isProfileFormOpen}
                aria-controls="profile-edit-form"
                disabled={busyAction === "update-profile"}
              >
                <span>
                  {isProfileFormOpen ? "Ocultar edicion de perfil" : "Editar mi informacion"}
                </span>
                <span
                  className={styles.supportCreateToggleIcon}
                  data-open={isProfileFormOpen}
                  aria-hidden="true"
                >
                  &#9662;
                </span>
              </button>

              <button
                type="button"
                className={`btn btn-primary ${styles.supportCreateToggle}`}
                onClick={handleTogglePasswordForm}
                aria-expanded={isPasswordFormOpen}
                aria-controls="profile-password-form"
                disabled={busyAction === "change-my-password"}
              >
                <span>
                  {isPasswordFormOpen ? "Ocultar edicion de contrasena" : "Editar mi contrasena"}
                </span>
                <span
                  className={styles.supportCreateToggleIcon}
                  data-open={isPasswordFormOpen}
                  aria-hidden="true"
                >
                  &#9662;
                </span>
              </button>
            </div>

            <div
              id="profile-edit-form"
              className={styles.supportCreateCollapse}
              data-open={isProfileFormOpen}
            >
              <div className={styles.supportCreateCollapseInner}>
                <form className={styles.createForm} onSubmit={onUpdateProfile}>
                  <div className={styles.formGrid}>
                    <div>
                      <label htmlFor="profile-firstName">Nombre</label>
                      <input
                        id="profile-firstName"
                        value={profileForm.firstName}
                        onChange={(event) =>
                          setProfileForm((prev) => ({ ...prev, firstName: event.target.value }))
                        }
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="profile-lastName">Apellido</label>
                      <input
                        id="profile-lastName"
                        value={profileForm.lastName}
                        onChange={(event) =>
                          setProfileForm((prev) => ({ ...prev, lastName: event.target.value }))
                        }
                        required
                      />
                    </div>
                    <div className={styles.profileWideField}>
                      <label htmlFor="profile-email">Email</label>
                      <input
                        id="profile-email"
                        type="email"
                        value={profileForm.email}
                        onChange={(event) =>
                          setProfileForm((prev) => ({ ...prev, email: event.target.value }))
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className={styles.supportCreateActions}>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={busyAction === "update-profile"}
                    >
                      {busyAction === "update-profile" ? "Guardando..." : "Guardar cambios"}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div
              id="profile-password-form"
              className={styles.supportCreateCollapse}
              data-open={isPasswordFormOpen}
            >
              <div className={styles.supportCreateCollapseInner}>
                <form className={styles.createForm} onSubmit={onChangePassword}>
                  <div className={styles.createForm}>
                    <div>
                      <label htmlFor="profile-current-password">Contrasena actual</label>
                      <input
                        id="profile-current-password"
                        type="password"
                        minLength={6}
                        value={passwordForm.currentPassword}
                        onChange={(event) =>
                          setPasswordForm((prev) => ({
                            ...prev,
                            currentPassword: event.target.value,
                          }))
                        }
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="profile-new-password">Nueva contrasena</label>
                      <input
                        id="profile-new-password"
                        type="password"
                        minLength={6}
                        value={passwordForm.newPassword}
                        onChange={(event) =>
                          setPasswordForm((prev) => ({
                            ...prev,
                            newPassword: event.target.value,
                          }))
                        }
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="profile-confirm-password">Confirmar nueva contrasena</label>
                      <input
                        id="profile-confirm-password"
                        type="password"
                        minLength={6}
                        value={passwordForm.confirmPassword}
                        onChange={(event) =>
                          setPasswordForm((prev) => ({
                            ...prev,
                            confirmPassword: event.target.value,
                          }))
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className={styles.supportCreateActions}>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={busyAction === "change-my-password"}
                    >
                      {busyAction === "change-my-password"
                        ? "Actualizando..."
                        : "Actualizar contrasena"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </article>
  );
}
