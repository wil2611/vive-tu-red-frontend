import { FormEvent, useCallback, type Dispatch, type SetStateAction } from "react";
import {
  createResource,
  deleteResourceById,
  updateResourceById,
  type CreateResourcePayload,
  type ResourceRecord,
} from "@/lib/api";
import {
  INITIAL_RESOURCE_FORM,
  normalizeResourceCreateForm,
  validateResourceCreateForm,
  type ResourceCreateFormErrors,
  type ResourceDraft,
} from "../../admin.shared";
import { getErrorText } from "./shared";

type UseAdminResourceHandlersParams = {
  createResourceForm: CreateResourcePayload;
  resourceDrafts: Record<string, ResourceDraft>;
  openResourceEditorId: string | null;
  setCreateResourceForm: Dispatch<SetStateAction<CreateResourcePayload>>;
  setCreateResourceFormErrors: Dispatch<SetStateAction<ResourceCreateFormErrors>>;
  setIsCreateResourceFormOpen: Dispatch<SetStateAction<boolean>>;
  setOpenResourceEditorId: Dispatch<SetStateAction<string | null>>;
  setBusyAction: Dispatch<SetStateAction<string | null>>;
  setError: Dispatch<SetStateAction<string | null>>;
  setSuccess: Dispatch<SetStateAction<string | null>>;
  loadDashboardData: (
    showLoader?: boolean,
    options?: { suppressGlobalError?: boolean },
  ) => Promise<boolean>;
};

function parseTags(raw: string): string[] {
  const unique = new Set<string>();
  for (const part of raw.split(",")) {
    const tag = part.trim();
    if (!tag) continue;
    unique.add(tag);
  }
  return Array.from(unique);
}

export function useAdminResourceHandlers({
  createResourceForm,
  resourceDrafts,
  openResourceEditorId,
  setCreateResourceForm,
  setCreateResourceFormErrors,
  setIsCreateResourceFormOpen,
  setOpenResourceEditorId,
  setBusyAction,
  setError,
  setSuccess,
  loadDashboardData,
}: UseAdminResourceHandlersParams) {
  const handleToggleCreateResourceForm = useCallback(() => {
    setIsCreateResourceFormOpen((prev) => !prev);
    setCreateResourceFormErrors({});
  }, [setCreateResourceFormErrors, setIsCreateResourceFormOpen]);

  const handleToggleResourceEditor = useCallback(
    (resourceId: string) => {
      setOpenResourceEditorId((prev) => (prev === resourceId ? null : resourceId));
    },
    [setOpenResourceEditorId],
  );

  const handleCreateResource = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setError(null);
      setSuccess(null);

      const normalizedPayload = normalizeResourceCreateForm(createResourceForm);
      const formErrors = validateResourceCreateForm(normalizedPayload);
      if (Object.keys(formErrors).length > 0) {
        setCreateResourceFormErrors(formErrors);
        setError("Revisa los campos del recurso antes de guardar.");
        return;
      }

      setCreateResourceFormErrors({});
      setBusyAction("create-resource");

      try {
        await createResource(normalizedPayload);
        setCreateResourceForm({ ...INITIAL_RESOURCE_FORM });
        setCreateResourceFormErrors({});
        setIsCreateResourceFormOpen(false);
        setOpenResourceEditorId(null);
        setSuccess("Recurso creado correctamente");

        const refreshed = await loadDashboardData(false, {
          suppressGlobalError: true,
        });
        if (!refreshed) {
          setSuccess("Recurso creado correctamente. No se pudo refrescar la lista automáticamente.");
        }
      } catch (errorValue) {
        setError(getErrorText(errorValue, "No se pudo crear el recurso"));
      } finally {
        setBusyAction(null);
      }
    },
    [
      createResourceForm,
      loadDashboardData,
      setBusyAction,
      setCreateResourceForm,
      setCreateResourceFormErrors,
      setError,
      setIsCreateResourceFormOpen,
      setOpenResourceEditorId,
      setSuccess,
    ],
  );

  const handleUpdateResource = useCallback(
    async (resource: ResourceRecord) => {
      const draft = resourceDrafts[resource.id];
      if (!draft) return;

      const normalizedPayload = normalizeResourceCreateForm({
        title: draft.title,
        description: draft.description,
        type: draft.type,
        fileUrl: draft.fileUrl,
        category: draft.category,
        tags: parseTags(draft.tags),
        isPublished: draft.isPublished,
      });
      const formErrors = validateResourceCreateForm(normalizedPayload);
      if (Object.keys(formErrors).length > 0) {
        const firstError =
          formErrors.title ??
          formErrors.type ??
          formErrors.category ??
          formErrors.fileUrl ??
          formErrors.tags ??
          "Revisa los campos del recurso antes de guardar.";
        setError(firstError);
        setSuccess(null);
        return;
      }

      setBusyAction(`update-resource-${resource.id}`);
      setError(null);
      setSuccess(null);

      try {
        await updateResourceById(resource.id, {
          title: normalizedPayload.title,
          description: normalizedPayload.description,
          type: normalizedPayload.type,
          fileUrl: normalizedPayload.fileUrl,
          category: normalizedPayload.category,
          tags: normalizedPayload.tags,
          isPublished: normalizedPayload.isPublished,
        });
        setOpenResourceEditorId(null);
        setSuccess(`Recurso ${normalizedPayload.title || "sin título"} actualizado`);

        const refreshed = await loadDashboardData(false, {
          suppressGlobalError: true,
        });
        if (!refreshed) {
          setSuccess(
            `Recurso ${normalizedPayload.title || "sin título"} actualizado. No se pudo refrescar la lista automáticamente.`,
          );
        }
      } catch (errorValue) {
        setError(getErrorText(errorValue, "No se pudo actualizar el recurso"));
      } finally {
        setBusyAction(null);
      }
    },
    [loadDashboardData, resourceDrafts, setBusyAction, setError, setOpenResourceEditorId, setSuccess],
  );

  const handleDeleteResource = useCallback(
    async (resource: ResourceRecord) => {
      const confirmed = window.confirm(
        `Vas a eliminar el recurso ${resource.title}. Esta acción no se puede deshacer.`,
      );
      if (!confirmed) return;

      setBusyAction(`delete-resource-${resource.id}`);
      setError(null);
      setSuccess(null);

      try {
        await deleteResourceById(resource.id);
        if (openResourceEditorId === resource.id) {
          setOpenResourceEditorId(null);
        }
        setSuccess(`Recurso ${resource.title} eliminado`);

        const refreshed = await loadDashboardData(false, {
          suppressGlobalError: true,
        });
        if (!refreshed) {
          setSuccess(
            `Recurso ${resource.title} eliminado. No se pudo refrescar la lista automáticamente.`,
          );
        }
      } catch (errorValue) {
        setError(getErrorText(errorValue, "No se pudo eliminar el recurso"));
      } finally {
        setBusyAction(null);
      }
    },
    [loadDashboardData, openResourceEditorId, setBusyAction, setError, setOpenResourceEditorId, setSuccess],
  );

  return {
    handleToggleCreateResourceForm,
    handleToggleResourceEditor,
    handleCreateResource,
    handleUpdateResource,
    handleDeleteResource,
  };
}
