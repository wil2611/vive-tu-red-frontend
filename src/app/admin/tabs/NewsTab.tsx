import type { Dispatch, FormEvent, SetStateAction } from "react";
import type { CreateNewsPayload, NewsItem } from "@/lib/api";
import {
  NEWS_AUTHOR_NAME_MAX_LENGTH,
  NEWS_BODY_MAX_LENGTH,
  NEWS_COVER_IMAGE_ALT_MAX_LENGTH,
  NEWS_COVER_IMAGE_URL_MAX_LENGTH,
  NEWS_EXCERPT_MAX_LENGTH,
  NEWS_TITLE_MAX_LENGTH,
  buildNewsDraft,
  type NewsCreateFormErrors,
  type NewsDraft,
} from "../admin.shared";
import styles from "../page.module.css";

type NewsTabProps = {
  newsItems: NewsItem[];
  publishedNewsCount: number;
  draftNewsCount: number;
  createNewsForm: CreateNewsPayload;
  setCreateNewsForm: Dispatch<SetStateAction<CreateNewsPayload>>;
  createNewsFormErrors: NewsCreateFormErrors;
  setCreateNewsFormErrors: Dispatch<SetStateAction<NewsCreateFormErrors>>;
  isCreateNewsFormOpen: boolean;
  setIsCreateNewsFormOpen: Dispatch<SetStateAction<boolean>>;
  newsDrafts: Record<string, NewsDraft>;
  setNewsDrafts: Dispatch<SetStateAction<Record<string, NewsDraft>>>;
  openNewsEditorId: string | null;
  setOpenNewsEditorId: Dispatch<SetStateAction<string | null>>;
  busyAction: string | null;
  onToggleCreateNewsForm: () => void;
  onToggleNewsEditor: (newsId: string) => void;
  onCreateNews: (event: FormEvent<HTMLFormElement>) => void | Promise<void>;
  onUpdateNews: (newsItem: NewsItem) => void | Promise<void>;
  onDeleteNews: (newsItem: NewsItem) => void | Promise<void>;
};

function safeText(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function formatPublishedDate(value: string | null): string {
  if (!value) return "Sin fecha";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return "Sin fecha";

  return new Intl.DateTimeFormat("es-CO", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(parsed);
}

function CharacterCounter({
  value,
  limit,
}: {
  value: string;
  limit: number;
}) {
  const currentLength = value.length;
  const isAtLimit = currentLength >= limit;

  return (
    <p
      className={`${styles.characterCounter} ${isAtLimit ? styles.characterCounterLimit : ""}`}
      role="status"
      aria-live="polite"
    >
      {currentLength}/{limit} caracteres
      {isAtLimit ? " | Limite alcanzado" : ""}
    </p>
  );
}

export function NewsTab({
  newsItems,
  publishedNewsCount,
  draftNewsCount,
  createNewsForm,
  setCreateNewsForm,
  createNewsFormErrors,
  setCreateNewsFormErrors,
  isCreateNewsFormOpen,
  setIsCreateNewsFormOpen,
  newsDrafts,
  setNewsDrafts,
  openNewsEditorId,
  setOpenNewsEditorId,
  busyAction,
  onToggleCreateNewsForm,
  onToggleNewsEditor,
  onCreateNews,
  onUpdateNews,
  onDeleteNews,
}: NewsTabProps) {
  return (
    <article className={styles.panel}>
      <div className={styles.panelHeader}>
        <h2 className={`${styles.panelTitle} ${styles.profileTitle}`}>Noticias</h2>
        <p className={styles.panelHint}>
          Publica novedades para la pagina de inicio: titulares, portada, resumen y cuerpo.
        </p>
        <div className={styles.supportMetaRow}>
          <span className={`${styles.supportMetaBadge} ${styles.supportMetaBadgeTotal}`}>
            Total: {newsItems.length}
          </span>
          <span className={`${styles.supportMetaBadge} ${styles.supportMetaBadgeActive}`}>
            Publicadas: {publishedNewsCount}
          </span>
          <span className={`${styles.supportMetaBadge} ${styles.supportMetaBadgeInactive}`}>
            Borradores: {draftNewsCount}
          </span>
        </div>
      </div>

      <div className={styles.supportCreateToolbar}>
        <button
          type="button"
          className={`btn btn-primary ${styles.supportCreateToggle}`}
          onClick={onToggleCreateNewsForm}
          aria-expanded={isCreateNewsFormOpen}
          aria-controls="news-create-panel"
          disabled={busyAction === "create-news"}
        >
          <span>{isCreateNewsFormOpen ? "Ocultar formulario" : "Agregar noticia"}</span>
          <span
            className={styles.supportCreateToggleIcon}
            data-open={isCreateNewsFormOpen}
            aria-hidden="true"
          >
            &#9662;
          </span>
        </button>
      </div>

      <div id="news-create-panel" className={styles.supportCreateCollapse} data-open={isCreateNewsFormOpen}>
        <div className={styles.supportCreateCollapseInner}>
          <form className={styles.createForm} onSubmit={onCreateNews}>
            <div className={styles.formGrid}>
              <div>
                <label htmlFor="news-title">Titulo</label>
                <input
                  id="news-title"
                  className={createNewsFormErrors.title ? styles.fieldError : ""}
                  value={createNewsForm.title ?? ""}
                  maxLength={NEWS_TITLE_MAX_LENGTH}
                  onChange={(event) => {
                    setCreateNewsForm((prev) => ({
                      ...prev,
                      title: event.target.value,
                    }));
                    setCreateNewsFormErrors((prev) => ({ ...prev, title: undefined }));
                  }}
                  required
                />
                <CharacterCounter
                  value={safeText(createNewsForm.title)}
                  limit={NEWS_TITLE_MAX_LENGTH}
                />
                {createNewsFormErrors.title ? (
                  <p className={styles.fieldErrorText}>{createNewsFormErrors.title}</p>
                ) : null}
              </div>

              <div>
                <label htmlFor="news-author">Autora/autor</label>
                <input
                  id="news-author"
                  className={createNewsFormErrors.authorName ? styles.fieldError : ""}
                  value={createNewsForm.authorName ?? ""}
                  maxLength={NEWS_AUTHOR_NAME_MAX_LENGTH}
                  onChange={(event) => {
                    setCreateNewsForm((prev) => ({
                      ...prev,
                      authorName: event.target.value,
                    }));
                    setCreateNewsFormErrors((prev) => ({ ...prev, authorName: undefined }));
                  }}
                />
                {createNewsFormErrors.authorName ? (
                  <p className={styles.fieldErrorText}>{createNewsFormErrors.authorName}</p>
                ) : null}
              </div>

              <div>
                <label htmlFor="news-cover-url">URL portada</label>
                <input
                  id="news-cover-url"
                  className={createNewsFormErrors.coverImageUrl ? styles.fieldError : ""}
                  value={createNewsForm.coverImageUrl ?? ""}
                  maxLength={NEWS_COVER_IMAGE_URL_MAX_LENGTH}
                  onChange={(event) => {
                    setCreateNewsForm((prev) => ({
                      ...prev,
                      coverImageUrl: event.target.value,
                    }));
                    setCreateNewsFormErrors((prev) => ({ ...prev, coverImageUrl: undefined }));
                  }}
                />
                {createNewsFormErrors.coverImageUrl ? (
                  <p className={styles.fieldErrorText}>{createNewsFormErrors.coverImageUrl}</p>
                ) : null}
              </div>

              <div>
                <label htmlFor="news-cover-alt">Texto alternativo portada</label>
                <input
                  id="news-cover-alt"
                  className={createNewsFormErrors.coverImageAlt ? styles.fieldError : ""}
                  value={createNewsForm.coverImageAlt ?? ""}
                  maxLength={NEWS_COVER_IMAGE_ALT_MAX_LENGTH}
                  onChange={(event) => {
                    setCreateNewsForm((prev) => ({
                      ...prev,
                      coverImageAlt: event.target.value,
                    }));
                    setCreateNewsFormErrors((prev) => ({ ...prev, coverImageAlt: undefined }));
                  }}
                />
                {createNewsFormErrors.coverImageAlt ? (
                  <p className={styles.fieldErrorText}>{createNewsFormErrors.coverImageAlt}</p>
                ) : null}
              </div>

              <div>
                <label htmlFor="news-published-at">Fecha de publicacion (opcional)</label>
                <input
                  id="news-published-at"
                  type="datetime-local"
                  className={createNewsFormErrors.publishedAt ? styles.fieldError : ""}
                  value={(createNewsForm.publishedAt as string) ?? ""}
                  onChange={(event) => {
                    setCreateNewsForm((prev) => ({
                      ...prev,
                      publishedAt: event.target.value,
                    }));
                    setCreateNewsFormErrors((prev) => ({ ...prev, publishedAt: undefined }));
                  }}
                />
                {createNewsFormErrors.publishedAt ? (
                  <p className={styles.fieldErrorText}>{createNewsFormErrors.publishedAt}</p>
                ) : null}
              </div>

              <div>
                <label htmlFor="news-status">Estado</label>
                <select
                  id="news-status"
                  value={createNewsForm.isPublished ? "published" : "draft"}
                  onChange={(event) =>
                    setCreateNewsForm((prev) => ({
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
              <label htmlFor="news-excerpt">Resumen</label>
              <textarea
                id="news-excerpt"
                className={createNewsFormErrors.excerpt ? styles.fieldError : ""}
                value={createNewsForm.excerpt ?? ""}
                maxLength={NEWS_EXCERPT_MAX_LENGTH}
                rows={3}
                onChange={(event) => {
                  setCreateNewsForm((prev) => ({
                    ...prev,
                    excerpt: event.target.value,
                  }));
                  setCreateNewsFormErrors((prev) => ({ ...prev, excerpt: undefined }));
                }}
              />
              <CharacterCounter
                value={safeText(createNewsForm.excerpt)}
                limit={NEWS_EXCERPT_MAX_LENGTH}
              />
              {createNewsFormErrors.excerpt ? (
                <p className={styles.fieldErrorText}>{createNewsFormErrors.excerpt}</p>
              ) : null}
            </div>

            <div>
              <label htmlFor="news-body">Cuerpo</label>
              <textarea
                id="news-body"
                className={createNewsFormErrors.body ? styles.fieldError : ""}
                value={createNewsForm.body ?? ""}
                maxLength={NEWS_BODY_MAX_LENGTH}
                rows={8}
                onChange={(event) => {
                  setCreateNewsForm((prev) => ({
                    ...prev,
                    body: event.target.value,
                  }));
                  setCreateNewsFormErrors((prev) => ({ ...prev, body: undefined }));
                }}
                required
              />
              <CharacterCounter value={safeText(createNewsForm.body)} limit={NEWS_BODY_MAX_LENGTH} />
              {createNewsFormErrors.body ? (
                <p className={styles.fieldErrorText}>{createNewsFormErrors.body}</p>
              ) : null}
            </div>

            <div className={styles.supportCreateActions}>
              <button
                type="button"
                className={styles.secondaryButton}
                onClick={() => {
                  setIsCreateNewsFormOpen(false);
                  setCreateNewsFormErrors({});
                }}
                disabled={busyAction === "create-news"}
              >
                Cancelar
              </button>
              <button type="submit" className="btn btn-primary" disabled={busyAction === "create-news"}>
                {busyAction === "create-news" ? "Creando..." : "Guardar noticia"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className={styles.supportRegistryWrap}>
        <div className={styles.supportTableHeader}>
          <h3 className={styles.supportTableTitle}>Noticias registradas</h3>
        </div>

        {newsItems.length ? (
          <div className={styles.supportRegistryList}>
            {newsItems.map((newsItem) => {
              const draft = newsDrafts[newsItem.id] ?? buildNewsDraft(newsItem);
              const draftTitle = safeText(draft.title);
              const draftExcerpt = safeText(draft.excerpt);
              const draftBody = safeText(draft.body);
              const draftCoverImageUrl = safeText(draft.coverImageUrl);
              const draftCoverImageAlt = safeText(draft.coverImageAlt);
              const draftAuthorName = safeText(draft.authorName);
              const draftPublishedAt = safeText(draft.publishedAt);
              const isUpdating = busyAction === `update-news-${newsItem.id}`;
              const isDeleting = busyAction === `delete-news-${newsItem.id}`;
              const isEditorOpen = openNewsEditorId === newsItem.id;

              return (
                <article key={newsItem.id} className={styles.supportListItem}>
                  <div className={styles.supportListSummary}>
                    <div className={styles.supportListIdentity}>
                      <div className={styles.supportListNameRow}>
                        <h4 className={styles.supportListName}>{draftTitle.trim() || "Noticia sin titulo"}</h4>
                        <span
                          className={styles.supportListStatus}
                          data-active={draft.isPublished ? "true" : "false"}
                        >
                          {draft.isPublished ? "Publicado" : "Borrador"}
                        </span>
                      </div>
                      <p className={styles.panelHint}>
                        {draftAuthorName.trim() || "Autor/a sin definir"} -{" "}
                        {formatPublishedDate(newsItem.publishedAt)}
                      </p>
                    </div>

                    <div className={styles.supportListActions}>
                      <button
                        type="button"
                        className={`${styles.supportActionBtn} ${styles.supportActionEdit}`}
                        onClick={() => onToggleNewsEditor(newsItem.id)}
                        disabled={isUpdating || isDeleting}
                      >
                        {isEditorOpen ? "Cerrar" : "Editar"}
                      </button>
                      <button
                        type="button"
                        className={`${styles.supportActionBtn} ${styles.supportActionDelete}`}
                        onClick={() => void onDeleteNews(newsItem)}
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
                            maxLength={NEWS_TITLE_MAX_LENGTH}
                            onChange={(event) =>
                              setNewsDrafts((prev) => ({
                                ...prev,
                                [newsItem.id]: {
                                  ...draft,
                                  title: event.target.value,
                                },
                              }))
                            }
                          />
                          <CharacterCounter value={draftTitle} limit={NEWS_TITLE_MAX_LENGTH} />
                        </div>

                        <div className={styles.supportField}>
                          <label>Autora/autor</label>
                          <input
                            value={draftAuthorName}
                            maxLength={NEWS_AUTHOR_NAME_MAX_LENGTH}
                            onChange={(event) =>
                              setNewsDrafts((prev) => ({
                                ...prev,
                                [newsItem.id]: {
                                  ...draft,
                                  authorName: event.target.value,
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
                              setNewsDrafts((prev) => ({
                                ...prev,
                                [newsItem.id]: {
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

                        <div className={styles.supportField}>
                          <label>Fecha de publicacion</label>
                          <input
                            type="datetime-local"
                            value={draftPublishedAt}
                            onChange={(event) =>
                              setNewsDrafts((prev) => ({
                                ...prev,
                                [newsItem.id]: {
                                  ...draft,
                                  publishedAt: event.target.value,
                                },
                              }))
                            }
                          />
                        </div>

                        <div className={styles.supportField}>
                          <label>URL portada</label>
                          <input
                            value={draftCoverImageUrl}
                            maxLength={NEWS_COVER_IMAGE_URL_MAX_LENGTH}
                            onChange={(event) =>
                              setNewsDrafts((prev) => ({
                                ...prev,
                                [newsItem.id]: {
                                  ...draft,
                                  coverImageUrl: event.target.value,
                                },
                              }))
                            }
                          />
                        </div>

                        <div className={styles.supportField}>
                          <label>Texto alternativo portada</label>
                          <input
                            value={draftCoverImageAlt}
                            maxLength={NEWS_COVER_IMAGE_ALT_MAX_LENGTH}
                            onChange={(event) =>
                              setNewsDrafts((prev) => ({
                                ...prev,
                                [newsItem.id]: {
                                  ...draft,
                                  coverImageAlt: event.target.value,
                                },
                              }))
                            }
                          />
                        </div>

                        <div className={`${styles.supportField} ${styles.supportFieldWide}`}>
                          <label>Resumen</label>
                          <textarea
                            value={draftExcerpt}
                            maxLength={NEWS_EXCERPT_MAX_LENGTH}
                            rows={3}
                            onChange={(event) =>
                              setNewsDrafts((prev) => ({
                                ...prev,
                                [newsItem.id]: {
                                  ...draft,
                                  excerpt: event.target.value,
                                },
                              }))
                            }
                          />
                          <CharacterCounter value={draftExcerpt} limit={NEWS_EXCERPT_MAX_LENGTH} />
                        </div>

                        <div className={`${styles.supportField} ${styles.supportFieldWide}`}>
                          <label>Cuerpo</label>
                          <textarea
                            value={draftBody}
                            maxLength={NEWS_BODY_MAX_LENGTH}
                            rows={8}
                            onChange={(event) =>
                              setNewsDrafts((prev) => ({
                                ...prev,
                                [newsItem.id]: {
                                  ...draft,
                                  body: event.target.value,
                                },
                              }))
                            }
                          />
                          <CharacterCounter value={draftBody} limit={NEWS_BODY_MAX_LENGTH} />
                        </div>
                      </div>

                      <div className={styles.supportRegistryActions}>
                        <button
                          type="button"
                          className={`${styles.supportActionBtn} ${styles.supportEditorSave}`}
                          onClick={() => void onUpdateNews(newsItem)}
                          disabled={isUpdating || isDeleting}
                        >
                          {isUpdating ? "Guardando..." : "Guardar"}
                        </button>
                        <button
                          type="button"
                          className={`${styles.supportActionBtn} ${styles.supportEditorCancel}`}
                          onClick={() => setOpenNewsEditorId(null)}
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
          <p className={styles.statusMuted}>No hay noticias registradas.</p>
        )}
      </div>
    </article>
  );
}
