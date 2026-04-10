import type { Dispatch, FormEvent, SetStateAction } from "react";
import type { CreateProjectAllyPayload, ProjectAlly } from "@/lib/api";
import {
  ALLY_INSTITUTION_NAME_MAX_LENGTH,
  ALLY_PARTICIPATION_SCOPE_MAX_LENGTH,
  ALLY_ROLE_LABEL_MAX_LENGTH,
  ALLY_SUMMARY_MAX_LENGTH,
  buildProjectAllyDraft,
  type AllyCreateFormErrors,
  type ProjectAllyDraft,
} from "../admin.shared";
import styles from "../page.module.css";

type AlliesTabProps = {
  projectAllies: ProjectAlly[];
  activeAlliesCount: number;
  inactiveAlliesCount: number;
  createAllyForm: CreateProjectAllyPayload;
  setCreateAllyForm: Dispatch<SetStateAction<CreateProjectAllyPayload>>;
  createAllyFormErrors: AllyCreateFormErrors;
  setCreateAllyFormErrors: Dispatch<SetStateAction<AllyCreateFormErrors>>;
  isCreateAllyFormOpen: boolean;
  setIsCreateAllyFormOpen: Dispatch<SetStateAction<boolean>>;
  projectAllyDrafts: Record<string, ProjectAllyDraft>;
  setProjectAllyDrafts: Dispatch<SetStateAction<Record<string, ProjectAllyDraft>>>;
  openAllyEditorId: string | null;
  setOpenAllyEditorId: Dispatch<SetStateAction<string | null>>;
  busyAction: string | null;
  onToggleCreateAllyForm: () => void;
  onToggleAllyEditor: (projectAllyId: string) => void;
  onCreateProjectAlly: (event: FormEvent<HTMLFormElement>) => void | Promise<void>;
  onUpdateProjectAlly: (projectAlly: ProjectAlly) => void | Promise<void>;
  onDeleteProjectAlly: (projectAlly: ProjectAlly) => void | Promise<void>;
};

export function AlliesTab({
  projectAllies,
  activeAlliesCount,
  inactiveAlliesCount,
  createAllyForm,
  setCreateAllyForm,
  createAllyFormErrors,
  setCreateAllyFormErrors,
  isCreateAllyFormOpen,
  setIsCreateAllyFormOpen,
  projectAllyDrafts,
  setProjectAllyDrafts,
  openAllyEditorId,
  setOpenAllyEditorId,
  busyAction,
  onToggleCreateAllyForm,
  onToggleAllyEditor,
  onCreateProjectAlly,
  onUpdateProjectAlly,
  onDeleteProjectAlly,
}: AlliesTabProps) {
  return (
    <article className={styles.panel}>
      <div className={styles.panelHeader}>
        <h2 className={`${styles.panelTitle} ${styles.profileTitle}`}>Aliados y participantes</h2>
        <p className={styles.panelHint}>
          Administra las organizaciones que aparecen en la seccion de conoce el proyecto.
        </p>
        <div className={styles.supportMetaRow}>
          <span className={`${styles.supportMetaBadge} ${styles.supportMetaBadgeTotal}`}>
            Total: {projectAllies.length}
          </span>
          <span className={`${styles.supportMetaBadge} ${styles.supportMetaBadgeActive}`}>
            Activos: {activeAlliesCount}
          </span>
          <span className={`${styles.supportMetaBadge} ${styles.supportMetaBadgeInactive}`}>
            Inactivos: {inactiveAlliesCount}
          </span>
        </div>
      </div>

      <div className={styles.supportCreateToolbar}>
        <button
          type="button"
          className={`btn btn-primary ${styles.supportCreateToggle}`}
          onClick={onToggleCreateAllyForm}
          aria-expanded={isCreateAllyFormOpen}
          aria-controls="allies-create-panel"
          disabled={busyAction === "create-project-ally"}
        >
          <span>{isCreateAllyFormOpen ? "Ocultar formulario" : "Agregar aliado/participante"}</span>
          <span className={styles.supportCreateToggleIcon} data-open={isCreateAllyFormOpen} aria-hidden="true">
            &#9662;
          </span>
        </button>
      </div>

      <div id="allies-create-panel" className={styles.supportCreateCollapse} data-open={isCreateAllyFormOpen}>
        <div className={styles.supportCreateCollapseInner}>
          <form className={styles.createForm} onSubmit={onCreateProjectAlly}>
            <div className={styles.formGrid}>
              <div>
                <label htmlFor="ally-institution-name">Institucion</label>
                <input
                  id="ally-institution-name"
                  className={createAllyFormErrors.institutionName ? styles.fieldError : ""}
                  value={createAllyForm.institutionName ?? ""}
                  maxLength={ALLY_INSTITUTION_NAME_MAX_LENGTH}
                  onChange={(event) => {
                    setCreateAllyForm((prev) => ({
                      ...prev,
                      institutionName: event.target.value,
                    }));
                    setCreateAllyFormErrors((prev) => ({ ...prev, institutionName: undefined }));
                  }}
                  required
                />
                {createAllyFormErrors.institutionName ? (
                  <p className={styles.fieldErrorText}>{createAllyFormErrors.institutionName}</p>
                ) : null}
              </div>

              <div>
                <label htmlFor="ally-role-label">Rol visible</label>
                <input
                  id="ally-role-label"
                  className={createAllyFormErrors.roleLabel ? styles.fieldError : ""}
                  value={createAllyForm.roleLabel ?? ""}
                  maxLength={ALLY_ROLE_LABEL_MAX_LENGTH}
                  onChange={(event) => {
                    setCreateAllyForm((prev) => ({
                      ...prev,
                      roleLabel: event.target.value,
                    }));
                    setCreateAllyFormErrors((prev) => ({ ...prev, roleLabel: undefined }));
                  }}
                  required
                />
                {createAllyFormErrors.roleLabel ? (
                  <p className={styles.fieldErrorText}>{createAllyFormErrors.roleLabel}</p>
                ) : null}
              </div>

              <div>
                <label htmlFor="ally-type">Tipo</label>
                <select
                  id="ally-type"
                  value={createAllyForm.type}
                  onChange={(event) =>
                    setCreateAllyForm((prev) => ({
                      ...prev,
                      type: event.target.value as CreateProjectAllyPayload["type"],
                    }))
                  }
                >
                  <option value="ally">Aliado</option>
                  <option value="participant">Participante</option>
                </select>
              </div>

              <div>
                <label htmlFor="ally-is-active">Estado</label>
                <select
                  id="ally-is-active"
                  value={createAllyForm.isActive ? "active" : "inactive"}
                  onChange={(event) =>
                    setCreateAllyForm((prev) => ({
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
              <label htmlFor="ally-summary">Rol en el proyecto</label>
              <textarea
                id="ally-summary"
                className={createAllyFormErrors.summary ? styles.fieldError : ""}
                value={createAllyForm.summary ?? ""}
                rows={4}
                maxLength={ALLY_SUMMARY_MAX_LENGTH}
                onChange={(event) => {
                  setCreateAllyForm((prev) => ({
                    ...prev,
                    summary: event.target.value,
                  }));
                  setCreateAllyFormErrors((prev) => ({ ...prev, summary: undefined }));
                }}
                required
              />
              {createAllyFormErrors.summary ? (
                <p className={styles.fieldErrorText}>{createAllyFormErrors.summary}</p>
              ) : null}
            </div>

            <div>
              <label htmlFor="ally-participation-scope">Alcance de participacion</label>
              <textarea
                id="ally-participation-scope"
                className={createAllyFormErrors.participationScope ? styles.fieldError : ""}
                value={createAllyForm.participationScope ?? ""}
                rows={4}
                maxLength={ALLY_PARTICIPATION_SCOPE_MAX_LENGTH}
                onChange={(event) => {
                  setCreateAllyForm((prev) => ({
                    ...prev,
                    participationScope: event.target.value,
                  }));
                  setCreateAllyFormErrors((prev) => ({ ...prev, participationScope: undefined }));
                }}
                required
              />
              {createAllyFormErrors.participationScope ? (
                <p className={styles.fieldErrorText}>{createAllyFormErrors.participationScope}</p>
              ) : null}
            </div>

            <div className={styles.supportCreateActions}>
              <button
                type="button"
                className={styles.secondaryButton}
                onClick={() => {
                  setIsCreateAllyFormOpen(false);
                  setCreateAllyFormErrors({});
                }}
                disabled={busyAction === "create-project-ally"}
              >
                Cancelar
              </button>
              <button type="submit" className="btn btn-primary" disabled={busyAction === "create-project-ally"}>
                {busyAction === "create-project-ally" ? "Creando..." : "Guardar"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className={styles.supportRegistryWrap}>
        <div className={styles.supportTableHeader}>
          <h3 className={styles.supportTableTitle}>Aliados y participantes registrados</h3>
        </div>

        {projectAllies.length ? (
          <div className={styles.supportRegistryList}>
            {projectAllies.map((projectAlly) => {
              const draft = projectAllyDrafts[projectAlly.id] ?? buildProjectAllyDraft(projectAlly);
              const isUpdating = busyAction === `update-project-ally-${projectAlly.id}`;
              const isDeleting = busyAction === `delete-project-ally-${projectAlly.id}`;
              const isEditorOpen = openAllyEditorId === projectAlly.id;
              const displayInstitutionName = projectAlly.institutionName.trim() || "Sin institucion";
              const displayRoleLabel = projectAlly.roleLabel.trim() || "Sin rol visible";

              const resetDraftFromSource = () => {
                setProjectAllyDrafts((prev) => ({
                  ...prev,
                  [projectAlly.id]: buildProjectAllyDraft(projectAlly),
                }));
              };

              return (
                <article key={projectAlly.id} className={styles.supportListItem}>
                  <div className={styles.supportListSummary}>
                    <div className={styles.supportListIdentity}>
                      <div className={styles.supportListNameRow}>
                        <h4 className={styles.supportListName}>{displayInstitutionName}</h4>
                        <span
                          className={styles.supportListStatus}
                          data-active={projectAlly.isActive ? "true" : "false"}
                        >
                          {projectAlly.isActive ? "Activo" : "Inactivo"}
                        </span>
                      </div>
                      <p className={styles.panelHint}>{displayRoleLabel}</p>
                    </div>

                    <div className={styles.supportListActions}>
                      <button
                        type="button"
                        className={`${styles.supportActionBtn} ${styles.supportActionEdit}`}
                        onClick={() => {
                          if (isEditorOpen) {
                            resetDraftFromSource();
                            setOpenAllyEditorId(null);
                            return;
                          }

                          resetDraftFromSource();
                          onToggleAllyEditor(projectAlly.id);
                        }}
                        disabled={isUpdating || isDeleting}
                      >
                        {isEditorOpen ? "Cerrar" : "Editar"}
                      </button>
                      <button
                        type="button"
                        className={`${styles.supportActionBtn} ${styles.supportActionDelete}`}
                        onClick={() => void onDeleteProjectAlly(projectAlly)}
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
                          <label>Institucion</label>
                          <input
                            value={draft.institutionName}
                            maxLength={ALLY_INSTITUTION_NAME_MAX_LENGTH}
                            onChange={(event) =>
                              setProjectAllyDrafts((prev) => ({
                                ...prev,
                                [projectAlly.id]: {
                                  ...draft,
                                  institutionName: event.target.value,
                                },
                              }))
                            }
                          />
                        </div>

                        <div className={styles.supportField}>
                          <label>Rol visible</label>
                          <input
                            value={draft.roleLabel}
                            maxLength={ALLY_ROLE_LABEL_MAX_LENGTH}
                            onChange={(event) =>
                              setProjectAllyDrafts((prev) => ({
                                ...prev,
                                [projectAlly.id]: {
                                  ...draft,
                                  roleLabel: event.target.value,
                                },
                              }))
                            }
                          />
                        </div>

                        <div className={styles.supportField}>
                          <label>Tipo</label>
                          <select
                            value={draft.type}
                            onChange={(event) =>
                              setProjectAllyDrafts((prev) => ({
                                ...prev,
                                [projectAlly.id]: {
                                  ...draft,
                                  type: event.target.value as CreateProjectAllyPayload["type"],
                                },
                              }))
                            }
                          >
                            <option value="ally">Aliado</option>
                            <option value="participant">Participante</option>
                          </select>
                        </div>

                        <div className={styles.supportField}>
                          <label>Estado</label>
                          <select
                            value={draft.isActive ? "active" : "inactive"}
                            onChange={(event) =>
                              setProjectAllyDrafts((prev) => ({
                                ...prev,
                                [projectAlly.id]: {
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

                        <div className={`${styles.supportField} ${styles.supportFieldWide}`}>
                          <label>Rol en el proyecto</label>
                          <textarea
                            value={draft.summary}
                            rows={4}
                            maxLength={ALLY_SUMMARY_MAX_LENGTH}
                            onChange={(event) =>
                              setProjectAllyDrafts((prev) => ({
                                ...prev,
                                [projectAlly.id]: {
                                  ...draft,
                                  summary: event.target.value,
                                },
                              }))
                            }
                          />
                        </div>

                        <div className={`${styles.supportField} ${styles.supportFieldWide}`}>
                          <label>Alcance de participacion</label>
                          <textarea
                            value={draft.participationScope}
                            rows={4}
                            maxLength={ALLY_PARTICIPATION_SCOPE_MAX_LENGTH}
                            onChange={(event) =>
                              setProjectAllyDrafts((prev) => ({
                                ...prev,
                                [projectAlly.id]: {
                                  ...draft,
                                  participationScope: event.target.value,
                                },
                              }))
                            }
                          />
                        </div>
                      </div>

                      <div className={styles.supportRegistryActions}>
                        <button
                          type="button"
                          className={`${styles.supportActionBtn} ${styles.supportEditorSave}`}
                          onClick={() => void onUpdateProjectAlly(projectAlly)}
                          disabled={isUpdating || isDeleting}
                        >
                          {isUpdating ? "Guardando..." : "Guardar"}
                        </button>
                        <button
                          type="button"
                          className={`${styles.supportActionBtn} ${styles.supportEditorCancel}`}
                          onClick={() => {
                            resetDraftFromSource();
                            setOpenAllyEditorId(null);
                          }}
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
          <p className={styles.statusMuted}>No hay aliados o participantes registrados.</p>
        )}
      </div>
    </article>
  );
}
