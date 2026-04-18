import type { Dispatch, FormEvent, SetStateAction } from "react";
import type { CreateResourcePayload, ResourceRecord } from "@/lib/api";
import {
  RESOURCE_DESCRIPTION_MAX_LENGTH,
  RESOURCE_FILE_URL_MAX_LENGTH,
  RESOURCE_TAG_MAX_LENGTH,
  RESOURCE_TAGS_MAX_COUNT,
  RESOURCE_TITLE_MAX_LENGTH,
  RESOURCE_TYPE_MAX_LENGTH,
  RESOURCE_CATEGORY_OPTIONS,
  buildResourceDraft,
  type ResourceCreateFormErrors,
  type ResourceDraft,
} from "../admin.shared";
import styles from "../page.module.css";

type ResourcesTabProps = {
  resources: ResourceRecord[];
  publishedResourcesCount: number;
  draftResourcesCount: number;
  createResourceForm: CreateResourcePayload;
  setCreateResourceForm: Dispatch<SetStateAction<CreateResourcePayload>>;
  createResourceFormErrors: ResourceCreateFormErrors;
  setCreateResourceFormErrors: Dispatch<SetStateAction<ResourceCreateFormErrors>>;
  isCreateResourceFormOpen: boolean;
  setIsCreateResourceFormOpen: Dispatch<SetStateAction<boolean>>;
  resourceDrafts: Record<string, ResourceDraft>;
  setResourceDrafts: Dispatch<SetStateAction<Record<string, ResourceDraft>>>;
  openResourceEditorId: string | null;
  setOpenResourceEditorId: Dispatch<SetStateAction<string | null>>;
  busyAction: string | null;
  onToggleCreateResourceForm: () => void;
  onToggleResourceEditor: (resourceId: string) => void;
  onCreateResource: (event: FormEvent<HTMLFormElement>) => void | Promise<void>;
  onUpdateResource: (resource: ResourceRecord) => void | Promise<void>;
  onDeleteResource: (resource: ResourceRecord) => void | Promise<void>;
};

function tagsToArray(raw: string): string[] {
  const parts = raw.split(",").map((part) => part.trim());
  const hasTrailingComma = /,\s*$/.test(raw);

  const values = parts.filter(
    (part, index) => part.length > 0 || (hasTrailingComma && index === parts.length - 1),
  );

  if (hasTrailingComma && values.at(-1) !== "") {
    values.push("");
  }

  return values;
}

function safeText(value: unknown): string {
  return typeof value === "string" ? value : "";
}

export function ResourcesTab({
  resources,
  publishedResourcesCount,
  draftResourcesCount,
  createResourceForm,
  setCreateResourceForm,
  createResourceFormErrors,
  setCreateResourceFormErrors,
  isCreateResourceFormOpen,
  setIsCreateResourceFormOpen,
  resourceDrafts,
  setResourceDrafts,
  openResourceEditorId,
  setOpenResourceEditorId,
  busyAction,
  onToggleCreateResourceForm,
  onToggleResourceEditor,
  onCreateResource,
  onUpdateResource,
  onDeleteResource,
}: ResourcesTabProps) {
  return (
    <article className={styles.panel}>
      <div className={styles.panelHeader}>
        <h2 className={`${styles.panelTitle} ${styles.profileTitle}`}>Recursos</h2>
        <p className={styles.panelHint}>
          Administra los materiales que podras publicar en la pagina de recursos.
        </p>
        <div className={styles.supportMetaRow}>
          <span className={`${styles.supportMetaBadge} ${styles.supportMetaBadgeTotal}`}>
            Total: {resources.length}
          </span>
          <span className={`${styles.supportMetaBadge} ${styles.supportMetaBadgeActive}`}>
            Publicados: {publishedResourcesCount}
          </span>
          <span className={`${styles.supportMetaBadge} ${styles.supportMetaBadgeInactive}`}>
            Borradores: {draftResourcesCount}
          </span>
        </div>
      </div>

      <div className={styles.supportCreateToolbar}>
        <button
          type="button"
          className={`btn btn-primary ${styles.supportCreateToggle}`}
          onClick={onToggleCreateResourceForm}
          aria-expanded={isCreateResourceFormOpen}
          aria-controls="resource-create-panel"
          disabled={busyAction === "create-resource"}
        >
          <span>{isCreateResourceFormOpen ? "Ocultar formulario" : "Agregar recurso"}</span>
          <span
            className={styles.supportCreateToggleIcon}
            data-open={isCreateResourceFormOpen}
            aria-hidden="true"
          >
            &#9662;
          </span>
        </button>
      </div>

      <div
        id="resource-create-panel"
        className={styles.supportCreateCollapse}
        data-open={isCreateResourceFormOpen}
      >
        <div className={styles.supportCreateCollapseInner}>
          <form className={styles.createForm} onSubmit={onCreateResource}>
            <div className={styles.formGrid}>
              <div>
                <label htmlFor="resource-title">Titulo</label>
                <input
                  id="resource-title"
                  className={createResourceFormErrors.title ? styles.fieldError : ""}
                  value={createResourceForm.title ?? ""}
                  maxLength={RESOURCE_TITLE_MAX_LENGTH}
                  onChange={(event) => {
                    setCreateResourceForm((prev) => ({
                      ...prev,
                      title: event.target.value,
                    }));
                    setCreateResourceFormErrors((prev) => ({
                      ...prev,
                      title: undefined,
                    }));
                  }}
                  required
                />
                {createResourceFormErrors.title ? (
                  <p className={styles.fieldErrorText}>{createResourceFormErrors.title}</p>
                ) : null}
              </div>
              <div>
                <label htmlFor="resource-type">Tipo</label>
                <input
                  id="resource-type"
                  className={createResourceFormErrors.type ? styles.fieldError : ""}
                  value={createResourceForm.type ?? ""}
                  maxLength={RESOURCE_TYPE_MAX_LENGTH}
                  onChange={(event) => {
                    setCreateResourceForm((prev) => ({
                      ...prev,
                      type: event.target.value,
                    }));
                    setCreateResourceFormErrors((prev) => ({
                      ...prev,
                      type: undefined,
                    }));
                  }}
                  required
                />
                {createResourceFormErrors.type ? (
                  <p className={styles.fieldErrorText}>{createResourceFormErrors.type}</p>
                ) : null}
              </div>
              <div>
                <label htmlFor="resource-category">Categoria</label>
                <select
                  id="resource-category"
                  className={createResourceFormErrors.category ? styles.fieldError : ""}
                  value={createResourceForm.category ?? ""}
                  onChange={(event) =>
                    setCreateResourceForm((prev) => ({
                      ...prev,
                      category: event.target.value as CreateResourcePayload["category"],
                    }))
                  }
                >
                  {RESOURCE_CATEGORY_OPTIONS.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {createResourceFormErrors.category ? (
                  <p className={styles.fieldErrorText}>{createResourceFormErrors.category}</p>
                ) : null}
              </div>
              <div>
                <label htmlFor="resource-tags">Tags (separados por coma)</label>
                <input
                  id="resource-tags"
                  value={(createResourceForm.tags ?? []).join(", ")}
                  maxLength={(RESOURCE_TAG_MAX_LENGTH + 2) * RESOURCE_TAGS_MAX_COUNT}
                  onChange={(event) => {
                    setCreateResourceForm((prev) => ({
                      ...prev,
                      tags: tagsToArray(event.target.value),
                    }));
                    setCreateResourceFormErrors((prev) => ({
                      ...prev,
                      tags: undefined,
                    }));
                  }}
                />
                {createResourceFormErrors.tags ? (
                  <p className={styles.fieldErrorText}>{createResourceFormErrors.tags}</p>
                ) : null}
              </div>
              <div>
                <label htmlFor="resource-file-url">Enlace del archivo</label>
                <input
                  id="resource-file-url"
                  className={createResourceFormErrors.fileUrl ? styles.fieldError : ""}
                  value={createResourceForm.fileUrl ?? ""}
                  maxLength={RESOURCE_FILE_URL_MAX_LENGTH}
                  onChange={(event) => {
                    setCreateResourceForm((prev) => ({
                      ...prev,
                      fileUrl: event.target.value,
                    }));
                    setCreateResourceFormErrors((prev) => ({
                      ...prev,
                      fileUrl: undefined,
                    }));
                  }}
                />
                {createResourceFormErrors.fileUrl ? (
                  <p className={styles.fieldErrorText}>{createResourceFormErrors.fileUrl}</p>
                ) : null}
              </div>
              <div>
                <label htmlFor="resource-is-published">Estado</label>
                <select
                  id="resource-is-published"
                  value={createResourceForm.isPublished ? "published" : "draft"}
                  onChange={(event) =>
                    setCreateResourceForm((prev) => ({
                      ...prev,
                      isPublished: event.target.value === "published",
                    }))
                  }
                >
                  <option value="published">Publicado</option>
                  <option value="draft">Borrador</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="resource-description">Descripcion</label>
              <textarea
                id="resource-description"
                value={createResourceForm.description ?? ""}
                maxLength={RESOURCE_DESCRIPTION_MAX_LENGTH}
                onChange={(event) =>
                  setCreateResourceForm((prev) => ({
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
                  setIsCreateResourceFormOpen(false);
                  setCreateResourceFormErrors({});
                }}
                disabled={busyAction === "create-resource"}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={busyAction === "create-resource"}
              >
                {busyAction === "create-resource" ? "Creando..." : "Guardar recurso"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className={styles.supportRegistryWrap}>
        <div className={styles.supportTableHeader}>
          <h3 className={styles.supportTableTitle}>Recursos registrados</h3>
        </div>
        {resources.length ? (
          <div className={styles.supportRegistryList}>
            {resources.map((resource) => {
              const draft = resourceDrafts[resource.id] ?? buildResourceDraft(resource);
              const draftTitle = safeText(draft.title);
              const draftType = safeText(draft.type);
              const draftCategory = safeText(draft.category);
              const draftTags = safeText(draft.tags);
              const draftFileUrl = safeText(draft.fileUrl);
              const draftDescription = safeText(draft.description);
              const isUpdating = busyAction === `update-resource-${resource.id}`;
              const isDeleting = busyAction === `delete-resource-${resource.id}`;
              const isEditorOpen = openResourceEditorId === resource.id;

              return (
                <article key={resource.id} className={styles.supportListItem}>
                  <div className={styles.supportListSummary}>
                    <div className={styles.supportListIdentity}>
                      <div className={styles.supportListNameRow}>
                        <h4 className={styles.supportListName}>
                          {draftTitle.trim() || "Recurso sin titulo"}
                        </h4>
                        <span className={`${styles.supportMetaBadge} ${styles.userRoleBadge}`}>
                          {draftType.trim() || "Tipo"}
                        </span>
                        <span
                          className={styles.supportListStatus}
                          data-active={draft.isPublished ? "true" : "false"}
                        >
                          {draft.isPublished ? "Publicado" : "Borrador"}
                        </span>
                      </div>
                      <p className={styles.panelHint}>
                        {draftCategory.trim() || "Sin categoria"} - Aperturas:{" "}
                        {resource.openCount}
                      </p>
                    </div>
                    <div className={styles.supportListActions}>
                      <button
                        type="button"
                        className={`${styles.supportActionBtn} ${styles.supportActionEdit}`}
                        onClick={() => onToggleResourceEditor(resource.id)}
                        disabled={isUpdating || isDeleting}
                      >
                        {isEditorOpen ? "Cerrar" : "Editar"}
                      </button>
                      <button
                        type="button"
                        className={`${styles.supportActionBtn} ${styles.supportActionDelete}`}
                        onClick={() => void onDeleteResource(resource)}
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
                          <label>Titulo</label>
                          <input
                            value={draftTitle}
                            maxLength={RESOURCE_TITLE_MAX_LENGTH}
                            onChange={(event) =>
                              setResourceDrafts((prev) => ({
                                ...prev,
                                [resource.id]: {
                                  ...draft,
                                  title: event.target.value,
                                },
                              }))
                            }
                          />
                        </div>

                        <div className={styles.supportField}>
                          <label>Tipo</label>
                          <input
                            value={draftType}
                            maxLength={RESOURCE_TYPE_MAX_LENGTH}
                            onChange={(event) =>
                              setResourceDrafts((prev) => ({
                                ...prev,
                                [resource.id]: {
                                  ...draft,
                                  type: event.target.value,
                                },
                              }))
                            }
                          />
                        </div>

                        <div className={styles.supportField}>
                          <label>Categoria</label>
                          <select
                            value={draftCategory || RESOURCE_CATEGORY_OPTIONS[0].id}
                            onChange={(event) =>
                              setResourceDrafts((prev) => ({
                                ...prev,
                                [resource.id]: {
                                  ...draft,
                                  category: event.target.value as ResourceDraft["category"],
                                },
                              }))
                            }
                          >
                            {RESOURCE_CATEGORY_OPTIONS.map((option) => (
                              <option key={option.id} value={option.id}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className={`${styles.supportField} ${styles.supportFieldWide}`}>
                          <label>Tags (separados por coma)</label>
                          <input
                            value={draftTags}
                            maxLength={(RESOURCE_TAG_MAX_LENGTH + 2) * RESOURCE_TAGS_MAX_COUNT}
                            onChange={(event) =>
                              setResourceDrafts((prev) => ({
                                ...prev,
                                [resource.id]: {
                                  ...draft,
                                  tags: event.target.value,
                                },
                              }))
                            }
                          />
                        </div>

                        <div className={styles.supportField}>
                          <label>Enlace del archivo</label>
                          <input
                            value={draftFileUrl}
                            maxLength={RESOURCE_FILE_URL_MAX_LENGTH}
                            onChange={(event) =>
                              setResourceDrafts((prev) => ({
                                ...prev,
                                [resource.id]: {
                                  ...draft,
                                  fileUrl: event.target.value,
                                },
                              }))
                            }
                          />
                        </div>

                        <div className={styles.supportField}>
                          <label>Estado</label>
                          <select
                            value={draft.isPublished ? "published" : "draft"}
                            onChange={(event) =>
                              setResourceDrafts((prev) => ({
                                ...prev,
                                [resource.id]: {
                                  ...draft,
                                  isPublished: event.target.value === "published",
                                },
                              }))
                            }
                          >
                            <option value="published">Publicado</option>
                            <option value="draft">Borrador</option>
                          </select>
                        </div>

                        <div className={`${styles.supportField} ${styles.supportFieldWide}`}>
                          <label>Descripcion</label>
                          <textarea
                            value={draftDescription}
                            maxLength={RESOURCE_DESCRIPTION_MAX_LENGTH}
                            onChange={(event) =>
                              setResourceDrafts((prev) => ({
                                ...prev,
                                [resource.id]: {
                                  ...draft,
                                  description: event.target.value,
                                },
                              }))
                            }
                            rows={3}
                          />
                        </div>
                      </div>

                      <div className={styles.supportRegistryActions}>
                        <button
                          type="button"
                          className={`${styles.supportActionBtn} ${styles.supportEditorSave}`}
                          onClick={() => void onUpdateResource(resource)}
                          disabled={isUpdating || isDeleting}
                        >
                          {isUpdating ? "Guardando..." : "Guardar"}
                        </button>
                        <button
                          type="button"
                          className={`${styles.supportActionBtn} ${styles.supportEditorCancel}`}
                          onClick={() => setOpenResourceEditorId(null)}
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
          <p className={styles.statusMuted}>No hay recursos registrados.</p>
        )}
      </div>
    </article>
  );
}

