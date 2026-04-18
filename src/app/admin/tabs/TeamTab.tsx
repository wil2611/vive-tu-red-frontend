import type { Dispatch, FormEvent, SetStateAction } from "react";
import type { CreateTeamMemberPayload, TeamMember } from "@/lib/api";
import {
  buildTeamMemberDraft,
  TEAM_DEPARTMENT_MAX_LENGTH,
  TEAM_DIVISION_MAX_LENGTH,
  TEAM_NAME_MAX_LENGTH,
  TEAM_PHOTO_MAX_LENGTH,
  TEAM_PROFILE_MAX_LENGTH,
  type TeamCreateFormErrors,
  type TeamMemberDraft,
} from "../admin.shared";
import styles from "../page.module.css";

type TeamTabProps = {
  teamMembers: TeamMember[];
  activeTeamCount: number;
  inactiveTeamCount: number;
  createTeamForm: CreateTeamMemberPayload;
  setCreateTeamForm: Dispatch<SetStateAction<CreateTeamMemberPayload>>;
  createTeamFormErrors: TeamCreateFormErrors;
  setCreateTeamFormErrors: Dispatch<SetStateAction<TeamCreateFormErrors>>;
  isCreateTeamFormOpen: boolean;
  setIsCreateTeamFormOpen: Dispatch<SetStateAction<boolean>>;
  teamMemberDrafts: Record<string, TeamMemberDraft>;
  setTeamMemberDrafts: Dispatch<SetStateAction<Record<string, TeamMemberDraft>>>;
  openTeamEditorId: string | null;
  setOpenTeamEditorId: Dispatch<SetStateAction<string | null>>;
  busyAction: string | null;
  onToggleCreateTeamForm: () => void;
  onToggleTeamEditor: (teamMemberId: string) => void;
  onCreateTeamMember: (event: FormEvent<HTMLFormElement>) => void | Promise<void>;
  onUpdateTeamMember: (teamMember: TeamMember) => void | Promise<void>;
  onDeleteTeamMember: (teamMember: TeamMember) => void | Promise<void>;
};

export function TeamTab({
  teamMembers,
  activeTeamCount,
  inactiveTeamCount,
  createTeamForm,
  setCreateTeamForm,
  createTeamFormErrors,
  setCreateTeamFormErrors,
  isCreateTeamFormOpen,
  setIsCreateTeamFormOpen,
  teamMemberDrafts,
  setTeamMemberDrafts,
  openTeamEditorId,
  setOpenTeamEditorId,
  busyAction,
  onToggleCreateTeamForm,
  onToggleTeamEditor,
  onCreateTeamMember,
  onUpdateTeamMember,
  onDeleteTeamMember,
}: TeamTabProps) {
  return (
    <article className={styles.panel}>
      <div className={styles.panelHeader}>
        <h2 className={`${styles.panelTitle} ${styles.profileTitle}`}>Equipo investigador</h2>
        <p className={styles.panelHint}>
          Administra las personas que aparecen en la seccion de investigadoras e investigadores.
        </p>
        <div className={styles.supportMetaRow}>
          <span className={`${styles.supportMetaBadge} ${styles.supportMetaBadgeTotal}`}>
            Total: {teamMembers.length}
          </span>
          <span className={`${styles.supportMetaBadge} ${styles.supportMetaBadgeActive}`}>
            Activos: {activeTeamCount}
          </span>
          <span className={`${styles.supportMetaBadge} ${styles.supportMetaBadgeInactive}`}>
            Inactivos: {inactiveTeamCount}
          </span>
        </div>
      </div>

      <div className={styles.supportCreateToolbar}>
        <button
          type="button"
          className={`btn btn-primary ${styles.supportCreateToggle}`}
          onClick={onToggleCreateTeamForm}
          aria-expanded={isCreateTeamFormOpen}
          aria-controls="team-create-panel"
          disabled={busyAction === "create-team-member"}
        >
          <span>{isCreateTeamFormOpen ? "Ocultar formulario" : "Agregar integrante"}</span>
          <span
            className={styles.supportCreateToggleIcon}
            data-open={isCreateTeamFormOpen}
            aria-hidden="true"
          >
            &#9662;
          </span>
        </button>
      </div>

      <div id="team-create-panel" className={styles.supportCreateCollapse} data-open={isCreateTeamFormOpen}>
        <div className={styles.supportCreateCollapseInner}>
          <form className={styles.createForm} onSubmit={onCreateTeamMember}>
            <div className={styles.formGrid}>
              <div>
                <label htmlFor="team-name">Nombre</label>
                <input
                  id="team-name"
                  className={createTeamFormErrors.name ? styles.fieldError : ""}
                  value={createTeamForm.name ?? ""}
                  onChange={(event) => {
                    setCreateTeamForm((prev) => ({
                      ...prev,
                      name: event.target.value,
                    }));
                    setCreateTeamFormErrors((prev) => ({ ...prev, name: undefined }));
                  }}
                  maxLength={TEAM_NAME_MAX_LENGTH}
                  required
                />
                {createTeamFormErrors.name ? (
                  <p className={styles.fieldErrorText}>{createTeamFormErrors.name}</p>
                ) : null}
              </div>

              <div>
                <label htmlFor="team-department">Departamento</label>
                <input
                  id="team-department"
                  value={createTeamForm.department ?? ""}
                  maxLength={TEAM_DEPARTMENT_MAX_LENGTH}
                  onChange={(event) =>
                    setCreateTeamForm((prev) => ({
                      ...prev,
                      department: event.target.value,
                    }))
                  }
                />
              </div>

              <div>
                <label htmlFor="team-division">Division academica</label>
                <input
                  id="team-division"
                  value={createTeamForm.division ?? ""}
                  maxLength={TEAM_DIVISION_MAX_LENGTH}
                  onChange={(event) =>
                    setCreateTeamForm((prev) => ({
                      ...prev,
                      division: event.target.value,
                    }))
                  }
                />
              </div>

              <div>
                <label htmlFor="team-photo">URL foto</label>
                <input
                  id="team-photo"
                  className={createTeamFormErrors.photo ? styles.fieldError : ""}
                  value={createTeamForm.photo ?? ""}
                  onChange={(event) => {
                    setCreateTeamForm((prev) => ({
                      ...prev,
                      photo: event.target.value,
                    }));
                    setCreateTeamFormErrors((prev) => ({ ...prev, photo: undefined }));
                  }}
                  maxLength={TEAM_PHOTO_MAX_LENGTH}
                />
                {createTeamFormErrors.photo ? (
                  <p className={styles.fieldErrorText}>{createTeamFormErrors.photo}</p>
                ) : null}
              </div>

              <div>
                <label htmlFor="team-is-active">Estado</label>
                <select
                  id="team-is-active"
                  value={createTeamForm.isActive ? "active" : "inactive"}
                  onChange={(event) =>
                    setCreateTeamForm((prev) => ({
                      ...prev,
                      isActive: event.target.value === "active",
                    }))
                  }
                >
                  <option value="active">Activo</option>
                  <option value="inactive">Inactivo</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="team-profile">Perfil</label>
              <textarea
                id="team-profile"
                className={createTeamFormErrors.profile ? styles.fieldError : ""}
                value={createTeamForm.profile ?? ""}
                onChange={(event) => {
                  setCreateTeamForm((prev) => ({
                    ...prev,
                    profile: event.target.value,
                  }));
                  setCreateTeamFormErrors((prev) => ({ ...prev, profile: undefined }));
                }}
                rows={4}
                maxLength={TEAM_PROFILE_MAX_LENGTH}
                required
              />
              {createTeamFormErrors.profile ? (
                <p className={styles.fieldErrorText}>{createTeamFormErrors.profile}</p>
              ) : null}
            </div>

            <div className={styles.supportCreateActions}>
              <button
                type="button"
                className={styles.secondaryButton}
                onClick={() => {
                  setIsCreateTeamFormOpen(false);
                  setCreateTeamFormErrors({});
                }}
                disabled={busyAction === "create-team-member"}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={busyAction === "create-team-member"}
              >
                {busyAction === "create-team-member" ? "Creando..." : "Guardar integrante"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className={styles.supportRegistryWrap}>
        <div className={styles.supportTableHeader}>
          <h3 className={styles.supportTableTitle}>Integrantes registrados</h3>
        </div>

        {teamMembers.length ? (
          <div className={styles.supportRegistryList}>
            {teamMembers.map((teamMember) => {
              const draft = teamMemberDrafts[teamMember.id] ?? buildTeamMemberDraft(teamMember);
              const isUpdating = busyAction === `update-team-member-${teamMember.id}`;
              const isDeleting = busyAction === `delete-team-member-${teamMember.id}`;
              const isEditorOpen = openTeamEditorId === teamMember.id;

              return (
                <article key={teamMember.id} className={styles.supportListItem}>
                  <div className={styles.supportListSummary}>
                    <div className={styles.supportListIdentity}>
                      <div className={styles.supportListNameRow}>
                        <h4 className={styles.supportListName}>{draft.name.trim() || "Sin nombre"}</h4>
                        <span className={styles.supportListStatus} data-active={draft.isActive ? "true" : "false"}>
                          {draft.isActive ? "Activo" : "Inactivo"}
                        </span>
                      </div>
                      <p className={styles.panelHint}>
                        {draft.department.trim() || "Sin departamento"} -{" "}{draft.division.trim() || "Sin division"}
                      </p>
                    </div>

                    <div className={styles.supportListActions}>
                      <button
                        type="button"
                        className={`${styles.supportActionBtn} ${styles.supportActionEdit}`}
                        onClick={() => onToggleTeamEditor(teamMember.id)}
                        disabled={isUpdating || isDeleting}
                      >
                        {isEditorOpen ? "Cerrar" : "Editar"}
                      </button>
                      <button
                        type="button"
                        className={`${styles.supportActionBtn} ${styles.supportActionDelete}`}
                        onClick={() => void onDeleteTeamMember(teamMember)}
                        disabled={isUpdating || isDeleting}
                      >
                        {isDeleting ? "Eliminando..." : "Eliminar"}
                      </button>
                    </div>
                  </div>

                  <div className={styles.supportEditorCollapse} data-open={isEditorOpen}>
                    <div className={styles.supportEditorInner}>
                      <div className={styles.supportRegistryFields}>
                        <div className={`${styles.supportField} ${styles.supportFieldWide}`}>
                          <label>Nombre</label>
                          <input
                            value={draft.name}
                            maxLength={TEAM_NAME_MAX_LENGTH}
                            onChange={(event) =>
                              setTeamMemberDrafts((prev) => ({
                                ...prev,
                                [teamMember.id]: {
                                  ...draft,
                                  name: event.target.value,
                                },
                              }))
                            }
                          />
                        </div>

                        <div className={styles.supportField}>
                          <label>Estado</label>
                          <select
                            value={draft.isActive ? "active" : "inactive"}
                            onChange={(event) =>
                              setTeamMemberDrafts((prev) => ({
                                ...prev,
                                [teamMember.id]: {
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
                          <label>Departamento</label>
                          <input
                            value={draft.department}
                            maxLength={TEAM_DEPARTMENT_MAX_LENGTH}
                            onChange={(event) =>
                              setTeamMemberDrafts((prev) => ({
                                ...prev,
                                [teamMember.id]: {
                                  ...draft,
                                  department: event.target.value,
                                },
                              }))
                            }
                          />
                        </div>

                        <div className={styles.supportField}>
                          <label>Division</label>
                          <input
                            value={draft.division}
                            maxLength={TEAM_DIVISION_MAX_LENGTH}
                            onChange={(event) =>
                              setTeamMemberDrafts((prev) => ({
                                ...prev,
                                [teamMember.id]: {
                                  ...draft,
                                  division: event.target.value,
                                },
                              }))
                            }
                          />
                        </div>

                        <div className={`${styles.supportField} ${styles.supportFieldWide}`}>
                          <label>URL foto</label>
                          <input
                            value={draft.photo}
                            maxLength={TEAM_PHOTO_MAX_LENGTH}
                            onChange={(event) =>
                              setTeamMemberDrafts((prev) => ({
                                ...prev,
                                [teamMember.id]: {
                                  ...draft,
                                  photo: event.target.value,
                                },
                              }))
                            }
                          />
                        </div>

                        <div className={`${styles.supportField} ${styles.supportFieldWide}`}>
                          <label>Perfil</label>
                          <textarea
                            value={draft.profile}
                            onChange={(event) =>
                              setTeamMemberDrafts((prev) => ({
                                ...prev,
                                [teamMember.id]: {
                                  ...draft,
                                  profile: event.target.value,
                                },
                              }))
                            }
                            rows={4}
                            maxLength={TEAM_PROFILE_MAX_LENGTH}
                          />
                        </div>
                      </div>

                      <div className={styles.supportRegistryActions}>
                        <button
                          type="button"
                          className={`${styles.supportActionBtn} ${styles.supportEditorSave}`}
                          onClick={() => void onUpdateTeamMember(teamMember)}
                          disabled={isUpdating || isDeleting}
                        >
                          {isUpdating ? "Guardando..." : "Guardar"}
                        </button>
                        <button
                          type="button"
                          className={`${styles.supportActionBtn} ${styles.supportEditorCancel}`}
                          onClick={() => setOpenTeamEditorId(null)}
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
          <p className={styles.statusMuted}>No hay integrantes registrados.</p>
        )}
      </div>
    </article>
  );
}

