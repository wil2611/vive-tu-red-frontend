import { FormEvent, useCallback, type Dispatch, type SetStateAction } from "react";
import {
  createSupportPath,
  deleteSupportPathById,
  updateSupportPathById,
  type CreateSupportPathPayload,
  type SupportPath,
} from "@/lib/api";
import {
  INITIAL_SUPPORT_FORM,
  normalizeSupportCreateForm,
  validateSupportCreateForm,
  type SupportCreateFormErrors,
  type SupportPathDraft,
} from "../../admin.shared";
import { getErrorText } from "./shared";

type UseAdminSupportPathHandlersParams = {
  createSupportForm: CreateSupportPathPayload;
  supportPathDrafts: Record<string, SupportPathDraft>;
  openSupportEditorId: string | null;
  setCreateSupportForm: Dispatch<SetStateAction<CreateSupportPathPayload>>;
  setCreateSupportFormErrors: Dispatch<SetStateAction<SupportCreateFormErrors>>;
  setIsCreateSupportFormOpen: Dispatch<SetStateAction<boolean>>;
  setOpenSupportEditorId: Dispatch<SetStateAction<string | null>>;
  setBusyAction: Dispatch<SetStateAction<string | null>>;
  setError: Dispatch<SetStateAction<string | null>>;
  setSuccess: Dispatch<SetStateAction<string | null>>;
  loadDashboardData: (showLoader?: boolean) => Promise<void>;
};

export function useAdminSupportPathHandlers({
  createSupportForm,
  supportPathDrafts,
  openSupportEditorId,
  setCreateSupportForm,
  setCreateSupportFormErrors,
  setIsCreateSupportFormOpen,
  setOpenSupportEditorId,
  setBusyAction,
  setError,
  setSuccess,
  loadDashboardData,
}: UseAdminSupportPathHandlersParams) {
  const handleToggleCreateSupportForm = useCallback(() => {
    setIsCreateSupportFormOpen((prev) => !prev);
    setCreateSupportFormErrors({});
  }, [setCreateSupportFormErrors, setIsCreateSupportFormOpen]);

  const handleToggleSupportEditor = useCallback(
    (supportPathId: string) => {
      setOpenSupportEditorId((prev) => (prev === supportPathId ? null : supportPathId));
    },
    [setOpenSupportEditorId],
  );

  const handleCreateSupportPath = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setError(null);
      setSuccess(null);

      const normalizedPayload = normalizeSupportCreateForm(createSupportForm);
      const formErrors = validateSupportCreateForm(normalizedPayload);
      if (Object.keys(formErrors).length > 0) {
        setCreateSupportFormErrors(formErrors);
        setError("Revisa los campos de la nueva institucion antes de guardar.");
        return;
      }

      setCreateSupportFormErrors({});
      setBusyAction("create-support-path");

      try {
        await createSupportPath(normalizedPayload);
        setCreateSupportForm({ ...INITIAL_SUPPORT_FORM });
        setCreateSupportFormErrors({});
        setIsCreateSupportFormOpen(false);
        setOpenSupportEditorId(null);
        await loadDashboardData(false);
        setSuccess("Institucion creada correctamente");
      } catch (errorValue) {
        setError(getErrorText(errorValue, "No se pudo crear la institucion"));
      } finally {
        setBusyAction(null);
      }
    },
    [createSupportForm, loadDashboardData, setBusyAction, setCreateSupportForm, setCreateSupportFormErrors, setError, setIsCreateSupportFormOpen, setOpenSupportEditorId, setSuccess],
  );

  const handleUpdateSupportPath = useCallback(
    async (supportPath: SupportPath) => {
      const draft = supportPathDrafts[supportPath.id];
      if (!draft) return;

      setBusyAction(`update-support-${supportPath.id}`);
      setError(null);
      setSuccess(null);

      try {
        await updateSupportPathById(supportPath.id, {
          institutionName: draft.institutionName.trim(),
          ubicacion: draft.ubicacion.trim(),
          phone: draft.phone.trim(),
          email: draft.email.trim(),
          schedule: draft.schedule.trim(),
          description: draft.description.trim(),
          isActive: draft.isActive,
        });
        await loadDashboardData(false);
        setOpenSupportEditorId(null);
        setSuccess(`Institucion ${draft.institutionName} actualizada`);
      } catch (errorValue) {
        setError(getErrorText(errorValue, "No se pudo actualizar la institucion"));
      } finally {
        setBusyAction(null);
      }
    },
    [loadDashboardData, setBusyAction, setError, setOpenSupportEditorId, setSuccess, supportPathDrafts],
  );

  const handleDeleteSupportPath = useCallback(
    async (supportPath: SupportPath) => {
      const confirmed = window.confirm(
        `Vas a eliminar la institucion ${supportPath.institutionName}. Esta accion no se puede deshacer.`,
      );
      if (!confirmed) return;

      setBusyAction(`delete-support-${supportPath.id}`);
      setError(null);
      setSuccess(null);

      try {
        await deleteSupportPathById(supportPath.id);
        if (openSupportEditorId === supportPath.id) {
          setOpenSupportEditorId(null);
        }
        await loadDashboardData(false);
        setSuccess(`Institucion ${supportPath.institutionName} eliminada`);
      } catch (errorValue) {
        setError(getErrorText(errorValue, "No se pudo eliminar la institucion"));
      } finally {
        setBusyAction(null);
      }
    },
    [loadDashboardData, openSupportEditorId, setBusyAction, setError, setOpenSupportEditorId, setSuccess],
  );

  return {
    handleToggleCreateSupportForm,
    handleToggleSupportEditor,
    handleCreateSupportPath,
    handleUpdateSupportPath,
    handleDeleteSupportPath,
  };
}
