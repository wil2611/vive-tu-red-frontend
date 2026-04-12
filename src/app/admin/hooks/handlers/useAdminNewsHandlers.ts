import { FormEvent, useCallback, type Dispatch, type SetStateAction } from "react";
import {
  createNews,
  deleteNewsById,
  updateNewsById,
  type CreateNewsPayload,
  type NewsItem,
} from "@/lib/api";
import {
  INITIAL_NEWS_FORM,
  normalizeNewsCreateForm,
  validateNewsCreateForm,
  type NewsCreateFormErrors,
  type NewsDraft,
} from "../../admin.shared";
import { getErrorText } from "./shared";

type UseAdminNewsHandlersParams = {
  createNewsForm: CreateNewsPayload;
  newsDrafts: Record<string, NewsDraft>;
  openNewsEditorId: string | null;
  setCreateNewsForm: Dispatch<SetStateAction<CreateNewsPayload>>;
  setCreateNewsFormErrors: Dispatch<SetStateAction<NewsCreateFormErrors>>;
  setIsCreateNewsFormOpen: Dispatch<SetStateAction<boolean>>;
  setOpenNewsEditorId: Dispatch<SetStateAction<string | null>>;
  setBusyAction: Dispatch<SetStateAction<string | null>>;
  setError: Dispatch<SetStateAction<string | null>>;
  setSuccess: Dispatch<SetStateAction<string | null>>;
  loadDashboardData: (
    showLoader?: boolean,
    options?: { suppressGlobalError?: boolean },
  ) => Promise<boolean>;
};

function toIsoDateTime(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) return null;

  const parsed = new Date(trimmed);
  if (Number.isNaN(parsed.getTime())) return null;
  return parsed.toISOString();
}

export function useAdminNewsHandlers({
  createNewsForm,
  newsDrafts,
  openNewsEditorId,
  setCreateNewsForm,
  setCreateNewsFormErrors,
  setIsCreateNewsFormOpen,
  setOpenNewsEditorId,
  setBusyAction,
  setError,
  setSuccess,
  loadDashboardData,
}: UseAdminNewsHandlersParams) {
  const handleToggleCreateNewsForm = useCallback(() => {
    setIsCreateNewsFormOpen((prev) => !prev);
    setCreateNewsFormErrors({});
  }, [setCreateNewsFormErrors, setIsCreateNewsFormOpen]);

  const handleToggleNewsEditor = useCallback(
    (newsId: string) => {
      setOpenNewsEditorId((prev) => (prev === newsId ? null : newsId));
    },
    [setOpenNewsEditorId],
  );

  const handleCreateNews = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setError(null);
      setSuccess(null);

      const normalizedPayload = normalizeNewsCreateForm(createNewsForm);
      const formErrors = validateNewsCreateForm(normalizedPayload);
      if (Object.keys(formErrors).length > 0) {
        setCreateNewsFormErrors(formErrors);
        setError("Revisa los campos de la noticia antes de guardar.");
        return;
      }

      const publishedAtIso = toIsoDateTime((normalizedPayload.publishedAt as string) ?? "");
      setCreateNewsFormErrors({});
      setBusyAction("create-news");

      try {
        await createNews({
          title: normalizedPayload.title,
          excerpt: normalizedPayload.excerpt,
          body: normalizedPayload.body,
          coverImageUrl: normalizedPayload.coverImageUrl,
          coverImageAlt: normalizedPayload.coverImageAlt,
          authorName: normalizedPayload.authorName,
          isPublished: normalizedPayload.isPublished,
          publishedAt: publishedAtIso ?? undefined,
        });
        setCreateNewsForm({ ...INITIAL_NEWS_FORM });
        setCreateNewsFormErrors({});
        setIsCreateNewsFormOpen(false);
        setOpenNewsEditorId(null);
        setSuccess("Noticia creada correctamente");

        const refreshed = await loadDashboardData(false, {
          suppressGlobalError: true,
        });
        if (!refreshed) {
          setSuccess(
            "Noticia creada correctamente. No se pudo refrescar la lista automaticamente.",
          );
        }
      } catch (errorValue) {
        setError(getErrorText(errorValue, "No se pudo crear la noticia"));
      } finally {
        setBusyAction(null);
      }
    },
    [
      createNewsForm,
      loadDashboardData,
      setBusyAction,
      setCreateNewsForm,
      setCreateNewsFormErrors,
      setError,
      setIsCreateNewsFormOpen,
      setOpenNewsEditorId,
      setSuccess,
    ],
  );

  const handleUpdateNews = useCallback(
    async (newsItem: NewsItem) => {
      const draft = newsDrafts[newsItem.id];
      if (!draft) return;

      const normalizedPayload = normalizeNewsCreateForm({
        title: draft.title,
        excerpt: draft.excerpt,
        body: draft.body,
        coverImageUrl: draft.coverImageUrl,
        coverImageAlt: draft.coverImageAlt,
        authorName: draft.authorName,
        isPublished: draft.isPublished,
        publishedAt: draft.publishedAt,
      });
      const formErrors = validateNewsCreateForm(normalizedPayload);
      if (Object.keys(formErrors).length > 0) {
        const firstError =
          formErrors.title ??
          formErrors.excerpt ??
          formErrors.body ??
          formErrors.coverImageUrl ??
          formErrors.coverImageAlt ??
          formErrors.authorName ??
          formErrors.publishedAt ??
          "Revisa los campos de la noticia antes de guardar.";
        setError(firstError);
        setSuccess(null);
        return;
      }

      setBusyAction(`update-news-${newsItem.id}`);
      setError(null);
      setSuccess(null);

      try {
        const publishedAtIso = toIsoDateTime(
          (normalizedPayload.publishedAt as string) ?? "",
        );
        await updateNewsById(newsItem.id, {
          title: normalizedPayload.title,
          excerpt: normalizedPayload.excerpt,
          body: normalizedPayload.body,
          coverImageUrl: normalizedPayload.coverImageUrl,
          coverImageAlt: normalizedPayload.coverImageAlt,
          authorName: normalizedPayload.authorName,
          isPublished: normalizedPayload.isPublished,
          publishedAt: publishedAtIso ?? null,
        });
        setOpenNewsEditorId(null);
        setSuccess(`Noticia ${normalizedPayload.title || "sin titulo"} actualizada`);

        const refreshed = await loadDashboardData(false, {
          suppressGlobalError: true,
        });
        if (!refreshed) {
          setSuccess(
            `Noticia ${normalizedPayload.title || "sin titulo"} actualizada. No se pudo refrescar la lista automaticamente.`,
          );
        }
      } catch (errorValue) {
        setError(getErrorText(errorValue, "No se pudo actualizar la noticia"));
      } finally {
        setBusyAction(null);
      }
    },
    [loadDashboardData, newsDrafts, setBusyAction, setError, setOpenNewsEditorId, setSuccess],
  );

  const handleDeleteNews = useCallback(
    async (newsItem: NewsItem) => {
      const confirmed = window.confirm(
        `Vas a eliminar la noticia ${newsItem.title}. Esta accion no se puede deshacer.`,
      );
      if (!confirmed) return;

      setBusyAction(`delete-news-${newsItem.id}`);
      setError(null);
      setSuccess(null);

      try {
        await deleteNewsById(newsItem.id);
        if (openNewsEditorId === newsItem.id) {
          setOpenNewsEditorId(null);
        }
        setSuccess(`Noticia ${newsItem.title} eliminada`);

        const refreshed = await loadDashboardData(false, {
          suppressGlobalError: true,
        });
        if (!refreshed) {
          setSuccess(
            `Noticia ${newsItem.title} eliminada. No se pudo refrescar la lista automaticamente.`,
          );
        }
      } catch (errorValue) {
        setError(getErrorText(errorValue, "No se pudo eliminar la noticia"));
      } finally {
        setBusyAction(null);
      }
    },
    [loadDashboardData, openNewsEditorId, setBusyAction, setError, setOpenNewsEditorId, setSuccess],
  );

  return {
    handleToggleCreateNewsForm,
    handleToggleNewsEditor,
    handleCreateNews,
    handleUpdateNews,
    handleDeleteNews,
  };
}
