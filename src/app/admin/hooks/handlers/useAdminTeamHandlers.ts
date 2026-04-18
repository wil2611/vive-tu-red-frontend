import { FormEvent, useCallback, type Dispatch, type SetStateAction } from "react";
import {
  createTeamMember,
  deleteTeamMemberById,
  updateTeamMemberById,
  type CreateTeamMemberPayload,
  type TeamMember,
} from "@/lib/api";
import {
  INITIAL_TEAM_FORM,
  TEAM_DEPARTMENT_MAX_LENGTH,
  TEAM_DIVISION_MAX_LENGTH,
  TEAM_NAME_MAX_LENGTH,
  TEAM_PHOTO_MAX_LENGTH,
  TEAM_PROFILE_MAX_LENGTH,
  isAllowedTeamPhotoUrl,
  normalizeTeamCreateForm,
  validateTeamCreateForm,
  type TeamCreateFormErrors,
  type TeamMemberDraft,
} from "../../admin.shared";
import { getErrorText } from "./shared";

type UseAdminTeamHandlersParams = {
  createTeamForm: CreateTeamMemberPayload;
  teamMemberDrafts: Record<string, TeamMemberDraft>;
  openTeamEditorId: string | null;
  setCreateTeamForm: Dispatch<SetStateAction<CreateTeamMemberPayload>>;
  setCreateTeamFormErrors: Dispatch<SetStateAction<TeamCreateFormErrors>>;
  setIsCreateTeamFormOpen: Dispatch<SetStateAction<boolean>>;
  setOpenTeamEditorId: Dispatch<SetStateAction<string | null>>;
  setBusyAction: Dispatch<SetStateAction<string | null>>;
  setError: Dispatch<SetStateAction<string | null>>;
  setSuccess: Dispatch<SetStateAction<string | null>>;
  loadDashboardData: (
    showLoader?: boolean,
    options?: { suppressGlobalError?: boolean },
  ) => Promise<boolean>;
};

function isSafeHttpUrl(value: string): boolean {
  try {
    const parsed = new URL(value);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

export function useAdminTeamHandlers({
  createTeamForm,
  teamMemberDrafts,
  openTeamEditorId,
  setCreateTeamForm,
  setCreateTeamFormErrors,
  setIsCreateTeamFormOpen,
  setOpenTeamEditorId,
  setBusyAction,
  setError,
  setSuccess,
  loadDashboardData,
}: UseAdminTeamHandlersParams) {
  const handleToggleCreateTeamForm = useCallback(() => {
    setIsCreateTeamFormOpen((prev) => !prev);
    setCreateTeamFormErrors({});
  }, [setCreateTeamFormErrors, setIsCreateTeamFormOpen]);

  const handleToggleTeamEditor = useCallback(
    (teamMemberId: string) => {
      setOpenTeamEditorId((prev) => (prev === teamMemberId ? null : teamMemberId));
    },
    [setOpenTeamEditorId],
  );

  const handleCreateTeamMember = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setError(null);
      setSuccess(null);

      const normalizedPayload = normalizeTeamCreateForm(createTeamForm);
      const formErrors = validateTeamCreateForm(normalizedPayload);
      if (Object.keys(formErrors).length > 0) {
        setCreateTeamFormErrors(formErrors);
        setError("Revisa los campos del integrante antes de guardar.");
        return;
      }

      setCreateTeamFormErrors({});
      setBusyAction("create-team-member");

      try {
        await createTeamMember(normalizedPayload);
        setCreateTeamForm({ ...INITIAL_TEAM_FORM });
        setCreateTeamFormErrors({});
        setIsCreateTeamFormOpen(false);
        setOpenTeamEditorId(null);
        setSuccess("Integrante creado correctamente");

        const refreshed = await loadDashboardData(false, {
          suppressGlobalError: true,
        });
        if (!refreshed) {
          setSuccess(
            "Integrante creado correctamente. No se pudo refrescar la lista automaticamente.",
          );
        }
      } catch (errorValue) {
        setError(getErrorText(errorValue, "No se pudo crear el integrante"));
      } finally {
        setBusyAction(null);
      }
    },
    [
      createTeamForm,
      loadDashboardData,
      setBusyAction,
      setCreateTeamForm,
      setCreateTeamFormErrors,
      setError,
      setIsCreateTeamFormOpen,
      setOpenTeamEditorId,
      setSuccess,
    ],
  );

  const handleUpdateTeamMember = useCallback(
    async (teamMember: TeamMember) => {
      const draft = teamMemberDrafts[teamMember.id];
      if (!draft) return;

      const name = draft.name.trim();
      const profile = draft.profile.trim();
      const photo = draft.photo.trim();
      const department = draft.department.trim();
      const division = draft.division.trim();

      if (name.length < 3) {
        setError("El nombre debe tener al menos 3 caracteres.");
        setSuccess(null);
        return;
      }

      if (name.length > TEAM_NAME_MAX_LENGTH) {
        setError(`El nombre no puede superar ${TEAM_NAME_MAX_LENGTH} caracteres.`);
        setSuccess(null);
        return;
      }

      if (profile.length < 20) {
        setError("El perfil debe tener al menos 20 caracteres.");
        setSuccess(null);
        return;
      }

      if (profile.length > TEAM_PROFILE_MAX_LENGTH) {
        setError(`El perfil no puede superar ${TEAM_PROFILE_MAX_LENGTH} caracteres.`);
        setSuccess(null);
        return;
      }

      if (department.length > TEAM_DEPARTMENT_MAX_LENGTH) {
        setError(`El departamento no puede superar ${TEAM_DEPARTMENT_MAX_LENGTH} caracteres.`);
        setSuccess(null);
        return;
      }

      if (division.length > TEAM_DIVISION_MAX_LENGTH) {
        setError(`La division no puede superar ${TEAM_DIVISION_MAX_LENGTH} caracteres.`);
        setSuccess(null);
        return;
      }

      if (photo && !isSafeHttpUrl(photo)) {
        setError("La foto debe ser una URL con http:// o https://.");
        setSuccess(null);
        return;
      }

      if (photo && !isAllowedTeamPhotoUrl(photo)) {
        setError(
          "Dominio de foto no permitido. Usa Drive, SharePoint o agrega el dominio a next.config.ts.",
        );
        setSuccess(null);
        return;
      }

      if (photo.length > TEAM_PHOTO_MAX_LENGTH) {
        setError(`La URL de la foto no puede superar ${TEAM_PHOTO_MAX_LENGTH} caracteres.`);
        setSuccess(null);
        return;
      }

      setBusyAction(`update-team-member-${teamMember.id}`);
      setError(null);
      setSuccess(null);

      try {
        await updateTeamMemberById(teamMember.id, {
          name,
          profile,
          department,
          division,
          photo,
          isActive: draft.isActive,
        });
        setOpenTeamEditorId(null);
        setSuccess(`Integrante ${name} actualizado`);

        const refreshed = await loadDashboardData(false, {
          suppressGlobalError: true,
        });
        if (!refreshed) {
          setSuccess(
            `Integrante ${name} actualizado. No se pudo refrescar la lista automaticamente.`,
          );
        }
      } catch (errorValue) {
        setError(getErrorText(errorValue, "No se pudo actualizar el integrante"));
      } finally {
        setBusyAction(null);
      }
    },
    [loadDashboardData, setBusyAction, setError, setOpenTeamEditorId, setSuccess, teamMemberDrafts],
  );

  const handleDeleteTeamMember = useCallback(
    async (teamMember: TeamMember) => {
      const confirmed = window.confirm(
        `Vas a eliminar a ${teamMember.name}. Esta accion no se puede deshacer.`,
      );
      if (!confirmed) return;

      setBusyAction(`delete-team-member-${teamMember.id}`);
      setError(null);
      setSuccess(null);

      try {
        await deleteTeamMemberById(teamMember.id);
        if (openTeamEditorId === teamMember.id) {
          setOpenTeamEditorId(null);
        }
        setSuccess(`Integrante ${teamMember.name} eliminado`);

        const refreshed = await loadDashboardData(false, {
          suppressGlobalError: true,
        });
        if (!refreshed) {
          setSuccess(
            `Integrante ${teamMember.name} eliminado. No se pudo refrescar la lista automaticamente.`,
          );
        }
      } catch (errorValue) {
        setError(getErrorText(errorValue, "No se pudo eliminar el integrante"));
      } finally {
        setBusyAction(null);
      }
    },
    [loadDashboardData, openTeamEditorId, setBusyAction, setError, setOpenTeamEditorId, setSuccess],
  );

  return {
    handleToggleCreateTeamForm,
    handleToggleTeamEditor,
    handleCreateTeamMember,
    handleUpdateTeamMember,
    handleDeleteTeamMember,
  };
}
