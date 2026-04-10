import { FormEvent, useCallback, type Dispatch, type SetStateAction } from "react";
import {
  createProjectAlly,
  deleteProjectAllyById,
  updateProjectAllyById,
  type CreateProjectAllyPayload,
  type ProjectAlly,
} from "@/lib/api";
import {
  ALLY_INSTITUTION_NAME_MAX_LENGTH,
  ALLY_PARTICIPATION_SCOPE_MAX_LENGTH,
  ALLY_ROLE_LABEL_MAX_LENGTH,
  ALLY_SUMMARY_MAX_LENGTH,
  INITIAL_ALLY_FORM,
  normalizeProjectAllyCreateForm,
  validateProjectAllyCreateForm,
  type AllyCreateFormErrors,
  type ProjectAllyDraft,
} from "../../admin.shared";
import { getErrorText } from "./shared";

type UseAdminAlliesHandlersParams = {
  createAllyForm: CreateProjectAllyPayload;
  projectAllyDrafts: Record<string, ProjectAllyDraft>;
  openAllyEditorId: string | null;
  setCreateAllyForm: Dispatch<SetStateAction<CreateProjectAllyPayload>>;
  setCreateAllyFormErrors: Dispatch<SetStateAction<AllyCreateFormErrors>>;
  setIsCreateAllyFormOpen: Dispatch<SetStateAction<boolean>>;
  setOpenAllyEditorId: Dispatch<SetStateAction<string | null>>;
  setBusyAction: Dispatch<SetStateAction<string | null>>;
  setError: Dispatch<SetStateAction<string | null>>;
  setSuccess: Dispatch<SetStateAction<string | null>>;
  loadDashboardData: (
    showLoader?: boolean,
    options?: { suppressGlobalError?: boolean },
  ) => Promise<boolean>;
};

export function useAdminAlliesHandlers({
  createAllyForm,
  projectAllyDrafts,
  openAllyEditorId,
  setCreateAllyForm,
  setCreateAllyFormErrors,
  setIsCreateAllyFormOpen,
  setOpenAllyEditorId,
  setBusyAction,
  setError,
  setSuccess,
  loadDashboardData,
}: UseAdminAlliesHandlersParams) {
  const handleToggleCreateAllyForm = useCallback(() => {
    setIsCreateAllyFormOpen((prev) => !prev);
    setCreateAllyFormErrors({});
  }, [setCreateAllyFormErrors, setIsCreateAllyFormOpen]);

  const handleToggleAllyEditor = useCallback(
    (projectAllyId: string) => {
      setOpenAllyEditorId((prev) => (prev === projectAllyId ? null : projectAllyId));
    },
    [setOpenAllyEditorId],
  );

  const handleCreateProjectAlly = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setError(null);
      setSuccess(null);

      const normalizedPayload = normalizeProjectAllyCreateForm(createAllyForm);
      const formErrors = validateProjectAllyCreateForm(normalizedPayload);
      if (Object.keys(formErrors).length > 0) {
        setCreateAllyFormErrors(formErrors);
        setError("Revisa los campos del aliado antes de guardar.");
        return;
      }

      setCreateAllyFormErrors({});
      setBusyAction("create-project-ally");

      try {
        await createProjectAlly(normalizedPayload);
        setCreateAllyForm({ ...INITIAL_ALLY_FORM });
        setCreateAllyFormErrors({});
        setIsCreateAllyFormOpen(false);
        setOpenAllyEditorId(null);
        setSuccess("Aliado/participante creado correctamente");

        const refreshed = await loadDashboardData(false, {
          suppressGlobalError: true,
        });
        if (!refreshed) {
          setSuccess(
            "Aliado/participante creado correctamente. No se pudo refrescar la lista automaticamente.",
          );
        }
      } catch (errorValue) {
        setError(getErrorText(errorValue, "No se pudo crear el aliado/participante"));
      } finally {
        setBusyAction(null);
      }
    },
    [
      createAllyForm,
      loadDashboardData,
      setBusyAction,
      setCreateAllyForm,
      setCreateAllyFormErrors,
      setError,
      setIsCreateAllyFormOpen,
      setOpenAllyEditorId,
      setSuccess,
    ],
  );

  const handleUpdateProjectAlly = useCallback(
    async (projectAlly: ProjectAlly) => {
      const draft = projectAllyDrafts[projectAlly.id];
      if (!draft) return;

      const institutionName = draft.institutionName.trim();
      const roleLabel = draft.roleLabel.trim();
      const summary = draft.summary.trim();
      const participationScope = draft.participationScope.trim();

      if (institutionName.length < 3) {
        setError("La institucion debe tener al menos 3 caracteres.");
        setSuccess(null);
        return;
      }
      if (institutionName.length > ALLY_INSTITUTION_NAME_MAX_LENGTH) {
        setError(
          `La institucion no puede superar ${ALLY_INSTITUTION_NAME_MAX_LENGTH} caracteres.`,
        );
        setSuccess(null);
        return;
      }
      if (roleLabel.length < 3) {
        setError("El rol visible debe tener al menos 3 caracteres.");
        setSuccess(null);
        return;
      }
      if (roleLabel.length > ALLY_ROLE_LABEL_MAX_LENGTH) {
        setError(`El rol visible no puede superar ${ALLY_ROLE_LABEL_MAX_LENGTH} caracteres.`);
        setSuccess(null);
        return;
      }
      if (summary.length < 10) {
        setError("El resumen debe tener al menos 10 caracteres.");
        setSuccess(null);
        return;
      }
      if (summary.length > ALLY_SUMMARY_MAX_LENGTH) {
        setError(`El resumen no puede superar ${ALLY_SUMMARY_MAX_LENGTH} caracteres.`);
        setSuccess(null);
        return;
      }
      if (participationScope.length < 10) {
        setError("El alcance de participacion debe tener al menos 10 caracteres.");
        setSuccess(null);
        return;
      }
      if (participationScope.length > ALLY_PARTICIPATION_SCOPE_MAX_LENGTH) {
        setError(
          `El alcance de participacion no puede superar ${ALLY_PARTICIPATION_SCOPE_MAX_LENGTH} caracteres.`,
        );
        setSuccess(null);
        return;
      }
      setBusyAction(`update-project-ally-${projectAlly.id}`);
      setError(null);
      setSuccess(null);

      try {
        await updateProjectAllyById(projectAlly.id, {
          institutionName,
          roleLabel,
          type: draft.type,
          summary,
          participationScope,
          isActive: draft.isActive,
        });
        setOpenAllyEditorId(null);
        setSuccess(`Aliado/participante ${institutionName} actualizado`);

        const refreshed = await loadDashboardData(false, {
          suppressGlobalError: true,
        });
        if (!refreshed) {
          setSuccess(
            `Aliado/participante ${institutionName} actualizado. No se pudo refrescar la lista automaticamente.`,
          );
        }
      } catch (errorValue) {
        setError(getErrorText(errorValue, "No se pudo actualizar el aliado/participante"));
      } finally {
        setBusyAction(null);
      }
    },
    [loadDashboardData, projectAllyDrafts, setBusyAction, setError, setOpenAllyEditorId, setSuccess],
  );

  const handleDeleteProjectAlly = useCallback(
    async (projectAlly: ProjectAlly) => {
      const confirmed = window.confirm(
        `Vas a eliminar ${projectAlly.institutionName}. Esta accion no se puede deshacer.`,
      );
      if (!confirmed) return;

      setBusyAction(`delete-project-ally-${projectAlly.id}`);
      setError(null);
      setSuccess(null);

      try {
        await deleteProjectAllyById(projectAlly.id);
        if (openAllyEditorId === projectAlly.id) {
          setOpenAllyEditorId(null);
        }
        setSuccess(`Aliado/participante ${projectAlly.institutionName} eliminado`);

        const refreshed = await loadDashboardData(false, {
          suppressGlobalError: true,
        });
        if (!refreshed) {
          setSuccess(
            `Aliado/participante ${projectAlly.institutionName} eliminado. No se pudo refrescar la lista automaticamente.`,
          );
        }
      } catch (errorValue) {
        setError(getErrorText(errorValue, "No se pudo eliminar el aliado/participante"));
      } finally {
        setBusyAction(null);
      }
    },
    [loadDashboardData, openAllyEditorId, setBusyAction, setError, setOpenAllyEditorId, setSuccess],
  );

  return {
    handleToggleCreateAllyForm,
    handleToggleAllyEditor,
    handleCreateProjectAlly,
    handleUpdateProjectAlly,
    handleDeleteProjectAlly,
  };
}
