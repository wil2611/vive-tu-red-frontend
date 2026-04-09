import { FormEvent, useCallback, type Dispatch, type SetStateAction } from "react";
import {
  createUser,
  deleteUserById,
  updateUserById,
  type CreateUserPayload,
  type UserRecord,
} from "@/lib/api";
import type { UserDraft } from "../../admin.shared";
import { getErrorText } from "./shared";

type UseAdminUserHandlersParams = {
  createForm: CreateUserPayload;
  setCreateForm: Dispatch<SetStateAction<CreateUserPayload>>;
  userDrafts: Record<string, UserDraft>;
  currentUserId: string | null;
  openUserEditorId: string | null;
  setIsCreateUserFormOpen: Dispatch<SetStateAction<boolean>>;
  setOpenUserEditorId: Dispatch<SetStateAction<string | null>>;
  setBusyAction: Dispatch<SetStateAction<string | null>>;
  setError: Dispatch<SetStateAction<string | null>>;
  setSuccess: Dispatch<SetStateAction<string | null>>;
  loadDashboardData: (showLoader?: boolean) => Promise<void>;
};

export function useAdminUserHandlers({
  createForm,
  setCreateForm,
  userDrafts,
  currentUserId,
  openUserEditorId,
  setIsCreateUserFormOpen,
  setOpenUserEditorId,
  setBusyAction,
  setError,
  setSuccess,
  loadDashboardData,
}: UseAdminUserHandlersParams) {
  const handleCreateUser = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setBusyAction("create-user");
      setError(null);
      setSuccess(null);

      try {
        await createUser(createForm);
        setCreateForm({
          email: "",
          password: "",
          firstName: "",
          lastName: "",
          role: "editor",
        });
        setIsCreateUserFormOpen(false);
        setOpenUserEditorId(null);
        await loadDashboardData(false);
        setSuccess("Usuario creado correctamente");
      } catch (errorValue) {
        setError(getErrorText(errorValue, "No se pudo crear el usuario"));
      } finally {
        setBusyAction(null);
      }
    },
    [createForm, loadDashboardData, setBusyAction, setCreateForm, setError, setIsCreateUserFormOpen, setOpenUserEditorId, setSuccess],
  );

  const handleUpdateUser = useCallback(
    async (user: UserRecord) => {
      const draft = userDrafts[user.id];
      if (!draft) return;

      setBusyAction(`update-${user.id}`);
      setError(null);
      setSuccess(null);

      try {
        await updateUserById(user.id, {
          role: draft.role,
          isActive: draft.isActive,
        });
        await loadDashboardData(false);
        setSuccess(`Usuario ${user.email} actualizado`);
      } catch (errorValue) {
        setError(getErrorText(errorValue, "No se pudo actualizar el usuario"));
      } finally {
        setBusyAction(null);
      }
    },
    [loadDashboardData, setBusyAction, setError, setSuccess, userDrafts],
  );

  const handleDeleteUser = useCallback(
    async (user: UserRecord) => {
      if (user.id === currentUserId) {
        setError("No puedes eliminar tu propio usuario");
        return;
      }

      const confirmed = window.confirm(
        `Vas a eliminar al usuario ${user.email}. Esta accion no se puede deshacer.`,
      );
      if (!confirmed) return;

      setBusyAction(`delete-${user.id}`);
      setError(null);
      setSuccess(null);

      try {
        await deleteUserById(user.id);
        if (openUserEditorId === user.id) {
          setOpenUserEditorId(null);
        }
        await loadDashboardData(false);
        setSuccess(`Usuario ${user.email} eliminado`);
      } catch (errorValue) {
        setError(getErrorText(errorValue, "No se pudo eliminar el usuario"));
      } finally {
        setBusyAction(null);
      }
    },
    [currentUserId, loadDashboardData, openUserEditorId, setBusyAction, setError, setOpenUserEditorId, setSuccess],
  );

  const handleToggleCreateUserForm = useCallback(() => {
    setIsCreateUserFormOpen((prev) => !prev);
  }, [setIsCreateUserFormOpen]);

  const handleToggleUserEditor = useCallback(
    (userId: string) => {
      setOpenUserEditorId((prev) => (prev === userId ? null : userId));
    },
    [setOpenUserEditorId],
  );

  return {
    handleCreateUser,
    handleUpdateUser,
    handleDeleteUser,
    handleToggleCreateUserForm,
    handleToggleUserEditor,
  };
}
