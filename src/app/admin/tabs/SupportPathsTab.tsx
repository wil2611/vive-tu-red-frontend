import type { Dispatch, FormEvent, SetStateAction } from "react";
import type { CreateSupportPathPayload, SupportPath } from "@/lib/api";
import {
  buildSupportDraft,
  type SupportCreateFormErrors,
  type SupportPathDraft,
} from "../admin.shared";
import styles from "../page.module.css";

type SupportPathsTabProps = {
  supportPaths: SupportPath[];
  createSupportForm: CreateSupportPathPayload;
  setCreateSupportForm: Dispatch<SetStateAction<CreateSupportPathPayload>>;
  createSupportFormErrors: SupportCreateFormErrors;
  setCreateSupportFormErrors: Dispatch<SetStateAction<SupportCreateFormErrors>>;
  isCreateSupportFormOpen: boolean;
  setIsCreateSupportFormOpen: Dispatch<SetStateAction<boolean>>;
  supportPathDrafts: Record<string, SupportPathDraft>;
  setSupportPathDrafts: Dispatch<SetStateAction<Record<string, SupportPathDraft>>>;
  openSupportEditorId: string | null;
  setOpenSupportEditorId: Dispatch<SetStateAction<string | null>>;
  busyAction: string | null;
  onToggleCreateSupportForm: () => void;
  onToggleSupportEditor: (supportPathId: string) => void;
  onCreateSupportPath: (event: FormEvent<HTMLFormElement>) => void | Promise<void>;
  onUpdateSupportPath: (supportPath: SupportPath) => void | Promise<void>;
  onDeleteSupportPath: (supportPath: SupportPath) => void | Promise<void>;
};

export function SupportPathsTab({
  supportPaths,
  createSupportForm,
  setCreateSupportForm,
  createSupportFormErrors,
  setCreateSupportFormErrors,
  isCreateSupportFormOpen,
  setIsCreateSupportFormOpen,
  supportPathDrafts,
  setSupportPathDrafts,
  openSupportEditorId,
  setOpenSupportEditorId,
  busyAction,
  onToggleCreateSupportForm,
  onToggleSupportEditor,
  onCreateSupportPath,
  onUpdateSupportPath,
  onDeleteSupportPath,
}: SupportPathsTabProps) {
  const activeSupportCount = supportPaths.filter((item) => item.isActive).length;
  const inactiveSupportCount = supportPaths.length - activeSupportCount;

  return (
    <article className={styles.panel}>
      <div className={styles.panelHeader}>
        <h2 className={`${styles.panelTitle} ${styles.profileTitle}`}>Instituciones de atencion</h2>
        <p className={styles.panelHint}>
          Administra las instituciones que aparecen en la pagina de rutas.
        </p>
        <div className={styles.supportMetaRow}>
          <span className={`${styles.supportMetaBadge} ${styles.supportMetaBadgeTotal}`}>
            Total: {supportPaths.length}
          </span>
          <span className={`${styles.supportMetaBadge} ${styles.supportMetaBadgeActive}`}>
            Activas: {activeSupportCount}
          </span>
          <span className={`${styles.supportMetaBadge} ${styles.supportMetaBadgeInactive}`}>
            Inactivas: {inactiveSupportCount}
          </span>
        </div>
      </div>

      <div className={styles.supportCreateToolbar}>
        <button
          type="button"
          className={`btn btn-primary ${styles.supportCreateToggle}`}
          onClick={onToggleCreateSupportForm}
          aria-expanded={isCreateSupportFormOpen}
          aria-controls="support-create-panel"
          disabled={busyAction === "create-support-path"}
        >
          <span>{isCreateSupportFormOpen ? "Ocultar formulario" : "Agregar institucion"}</span>
          <span
            className={styles.supportCreateToggleIcon}
            data-open={isCreateSupportFormOpen}
            aria-hidden="true"
          >
            &#9662;
          </span>
        </button>
      </div>

      <div
        id="support-create-panel"
        className={styles.supportCreateCollapse}
        data-open={isCreateSupportFormOpen}
      >
        <div className={styles.supportCreateCollapseInner}>
          <form className={styles.createForm} onSubmit={onCreateSupportPath}>
            <div className={styles.formGrid}>
              <div>
                <label htmlFor="support-institutionName">Nombre de institucion</label>
                <input
                  id="support-institutionName"
                  className={createSupportFormErrors.institutionName ? styles.fieldError : ""}
                  value={createSupportForm.institutionName ?? ""}
                  onChange={(event) => {
                    setCreateSupportForm((prev) => ({
                      ...prev,
                      institutionName: event.target.value,
                    }));
                    setCreateSupportFormErrors((prev) => ({
                      ...prev,
                      institutionName: undefined,
                    }));
                  }}
                  required
                />
                {createSupportFormErrors.institutionName ? (
                  <p className={styles.fieldErrorText}>{createSupportFormErrors.institutionName}</p>
                ) : null}
              </div>
              <div>
                <label htmlFor="support-ubicacion">Ubicacion</label>
                <input
                  id="support-ubicacion"
                  className={createSupportFormErrors.ubicacion ? styles.fieldError : ""}
                  value={createSupportForm.ubicacion ?? ""}
                  onChange={(event) => {
                    setCreateSupportForm((prev) => ({
                      ...prev,
                      ubicacion: event.target.value,
                    }));
                    setCreateSupportFormErrors((prev) => ({
                      ...prev,
                      ubicacion: undefined,
                    }));
                  }}
                  required
                />
                {createSupportFormErrors.ubicacion ? (
                  <p className={styles.fieldErrorText}>{createSupportFormErrors.ubicacion}</p>
                ) : null}
              </div>
              <div>
                <label htmlFor="support-phone">Telefono</label>
                <input
                  id="support-phone"
                  className={createSupportFormErrors.phone ? styles.fieldError : ""}
                  value={createSupportForm.phone ?? ""}
                  onChange={(event) => {
                    setCreateSupportForm((prev) => ({ ...prev, phone: event.target.value }));
                    setCreateSupportFormErrors((prev) => ({ ...prev, phone: undefined }));
                  }}
                />
                {createSupportFormErrors.phone ? (
                  <p className={styles.fieldErrorText}>{createSupportFormErrors.phone}</p>
                ) : null}
              </div>
              <div>
                <label htmlFor="support-email">Email</label>
                <input
                  id="support-email"
                  type="email"
                  className={createSupportFormErrors.email ? styles.fieldError : ""}
                  value={createSupportForm.email ?? ""}
                  onChange={(event) => {
                    setCreateSupportForm((prev) => ({ ...prev, email: event.target.value }));
                    setCreateSupportFormErrors((prev) => ({ ...prev, email: undefined }));
                  }}
                />
                {createSupportFormErrors.email ? (
                  <p className={styles.fieldErrorText}>{createSupportFormErrors.email}</p>
                ) : null}
              </div>
              <div>
                <label htmlFor="support-schedule">Horario</label>
                <input
                  id="support-schedule"
                  className={createSupportFormErrors.schedule ? styles.fieldError : ""}
                  value={createSupportForm.schedule ?? ""}
                  onChange={(event) => {
                    setCreateSupportForm((prev) => ({
                      ...prev,
                      schedule: event.target.value,
                    }));
                    setCreateSupportFormErrors((prev) => ({
                      ...prev,
                      schedule: undefined,
                    }));
                  }}
                />
                {createSupportFormErrors.schedule ? (
                  <p className={styles.fieldErrorText}>{createSupportFormErrors.schedule}</p>
                ) : null}
              </div>
              <div>
                <label htmlFor="support-isActive">Estado</label>
                <select
                  id="support-isActive"
                  value={createSupportForm.isActive ? "active" : "inactive"}
                  onChange={(event) =>
                    setCreateSupportForm((prev) => ({
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
              <label htmlFor="support-description">Descripcion</label>
              <textarea
                id="support-description"
                value={createSupportForm.description ?? ""}
                onChange={(event) =>
                  setCreateSupportForm((prev) => ({
                    ...prev,
                    description: event.target.value,
                  }))
                }
                rows={3}
              />
            </div>

            <div className={styles.supportCreateActions}>
              <button
                type="button"
                className={styles.secondaryButton}
                onClick={() => {
                  setIsCreateSupportFormOpen(false);
                  setCreateSupportFormErrors({});
                }}
                disabled={busyAction === "create-support-path"}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={busyAction === "create-support-path"}
              >
                {busyAction === "create-support-path" ? "Creando..." : "Guardar institucion"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className={styles.supportRegistryWrap}>
        <div className={styles.supportTableHeader}>
          <h3 className={styles.supportTableTitle}>Instituciones registradas</h3>
        </div>
        {supportPaths.length ? (
          <div className={styles.supportRegistryList}>
            {supportPaths.map((supportPath) => {
              const draft = supportPathDrafts[supportPath.id] ?? buildSupportDraft(supportPath);
              const isUpdating = busyAction === `update-support-${supportPath.id}`;
              const isDeleting = busyAction === `delete-support-${supportPath.id}`;
              const isEditorOpen = openSupportEditorId === supportPath.id;

              return (
                <article key={supportPath.id} className={styles.supportListItem}>
                  <div className={styles.supportListSummary}>
                    <div className={styles.supportListIdentity}>
                      <div className={styles.supportListNameRow}>
                        <h4 className={styles.supportListName}>
                          {draft.institutionName.trim() || "Institucion sin nombre"}
                        </h4>
                        <span
                          className={styles.supportListStatus}
                          data-active={draft.isActive ? "true" : "false"}
                        >
                          {draft.isActive ? "Activa" : "Inactiva"}
                        </span>
                      </div>
                    </div>
                    <div className={styles.supportListActions}>
                      <button
                        type="button"
                        className={`${styles.supportActionBtn} ${styles.supportActionEdit}`}
                        onClick={() => onToggleSupportEditor(supportPath.id)}
                        disabled={isUpdating || isDeleting}
                      >
                        {isEditorOpen ? "Cerrar" : "Editar"}
                      </button>
                      <button
                        type="button"
                        className={`${styles.supportActionBtn} ${styles.supportActionDelete}`}
                        onClick={() => void onDeleteSupportPath(supportPath)}
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
                            onChange={(event) =>
                              setSupportPathDrafts((prev) => ({
                                ...prev,
                                [supportPath.id]: {
                                  ...draft,
                                  institutionName: event.target.value,
                                },
                              }))
                            }
                          />
                        </div>

                        <div className={`${styles.supportField} ${styles.supportFieldWide}`}>
                          <label>Descripcion</label>
                          <textarea
                            value={draft.description}
                            onChange={(event) =>
                              setSupportPathDrafts((prev) => ({
                                ...prev,
                                [supportPath.id]: {
                                  ...draft,
                                  description: event.target.value,
                                },
                              }))
                            }
                            rows={3}
                          />
                        </div>

                        <div className={styles.supportField}>
                          <label>Ubicacion</label>
                          <input
                            value={draft.ubicacion}
                            onChange={(event) =>
                              setSupportPathDrafts((prev) => ({
                                ...prev,
                                [supportPath.id]: {
                                  ...draft,
                                  ubicacion: event.target.value,
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
                              setSupportPathDrafts((prev) => ({
                                ...prev,
                                [supportPath.id]: {
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
                          <label>Telefono</label>
                          <input
                            value={draft.phone}
                            onChange={(event) =>
                              setSupportPathDrafts((prev) => ({
                                ...prev,
                                [supportPath.id]: {
                                  ...draft,
                                  phone: event.target.value,
                                },
                              }))
                            }
                          />
                        </div>

                        <div className={styles.supportField}>
                          <label>Email</label>
                          <input
                            type="email"
                            value={draft.email}
                            onChange={(event) =>
                              setSupportPathDrafts((prev) => ({
                                ...prev,
                                [supportPath.id]: {
                                  ...draft,
                                  email: event.target.value,
                                },
                              }))
                            }
                          />
                        </div>

                        <div className={styles.supportField}>
                          <label>Horario</label>
                          <input
                            value={draft.schedule}
                            onChange={(event) =>
                              setSupportPathDrafts((prev) => ({
                                ...prev,
                                [supportPath.id]: {
                                  ...draft,
                                  schedule: event.target.value,
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
                          onClick={() => void onUpdateSupportPath(supportPath)}
                          disabled={isUpdating || isDeleting}
                        >
                          {isUpdating ? "Guardando..." : "Guardar"}
                        </button>
                        <button
                          type="button"
                          className={`${styles.supportActionBtn} ${styles.supportEditorCancel}`}
                          onClick={() => setOpenSupportEditorId(null)}
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
          <p className={styles.statusMuted}>No hay instituciones registradas.</p>
        )}
      </div>
    </article>
  );
}
