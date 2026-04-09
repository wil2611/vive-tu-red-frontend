import { FormEvent, useCallback, type Dispatch, type SetStateAction } from "react";
import {
  changeMyPassword,
  syncCurrentAuthUser,
  updateMyProfile,
  type UserRecord,
} from "@/lib/api";
import { getErrorText } from "./shared";

type ProfileForm = {
  email: string;
  firstName: string;
  lastName: string;
};

type PasswordForm = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

type UseAdminProfileHandlersParams = {
  currentUser: UserRecord | null;
  profileForm: ProfileForm;
  passwordForm: PasswordForm;
  setPasswordForm: Dispatch<SetStateAction<PasswordForm>>;
  setBusyAction: Dispatch<SetStateAction<string | null>>;
  setError: Dispatch<SetStateAction<string | null>>;
  setSuccess: Dispatch<SetStateAction<string | null>>;
  loadDashboardData: (showLoader?: boolean) => Promise<void>;
  clearSessionState: () => void;
};

export function useAdminProfileHandlers({
  currentUser,
  profileForm,
  passwordForm,
  setPasswordForm,
  setBusyAction,
  setError,
  setSuccess,
  loadDashboardData,
  clearSessionState,
}: UseAdminProfileHandlersParams) {
  const handleUpdateProfile = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setError(null);
      setSuccess(null);

      const payload = {
        email: profileForm.email.trim(),
        firstName: profileForm.firstName.trim(),
        lastName: profileForm.lastName.trim(),
      };

      if (!payload.email || !payload.firstName || !payload.lastName) {
        setError("Completa email, nombre y apellido para actualizar tu perfil.");
        return;
      }

      const hasNoChanges =
        currentUser &&
        payload.email === currentUser.email &&
        payload.firstName === currentUser.firstName &&
        payload.lastName === currentUser.lastName;

      if (hasNoChanges) {
        setSuccess("No hay cambios por guardar en tu perfil.");
        return;
      }

      setBusyAction("update-profile");

      try {
        const updatedUser = await updateMyProfile(payload);
        syncCurrentAuthUser(updatedUser);
        setSuccess("Perfil actualizado correctamente.");

        try {
          await loadDashboardData(false);
        } catch {
          setSuccess(
            "Perfil actualizado correctamente. No se pudo refrescar el panel automaticamente.",
          );
        }
      } catch (errorValue) {
        setError(getErrorText(errorValue, "No se pudo actualizar tu perfil"));
      } finally {
        setBusyAction(null);
      }
    },
    [currentUser, loadDashboardData, profileForm.email, profileForm.firstName, profileForm.lastName, setBusyAction, setError, setSuccess],
  );

  const handleChangePassword = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setError(null);
      setSuccess(null);

      if (passwordForm.newPassword.length < 6) {
        setError("La nueva contrasena debe tener al menos 6 caracteres.");
        return;
      }

      if (passwordForm.newPassword !== passwordForm.confirmPassword) {
        setError("La confirmacion no coincide con la nueva contrasena.");
        return;
      }

      if (passwordForm.currentPassword === passwordForm.newPassword) {
        setError("La nueva contrasena debe ser diferente a la actual.");
        return;
      }

      setBusyAction("change-my-password");

      try {
        await changeMyPassword({
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword,
        });
        setPasswordForm({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        clearSessionState();
        setSuccess("Contrasena actualizada. Inicia sesion nuevamente.");
      } catch (errorValue) {
        setError(getErrorText(errorValue, "No se pudo cambiar la contrasena"));
      } finally {
        setBusyAction(null);
      }
    },
    [clearSessionState, passwordForm.confirmPassword, passwordForm.currentPassword, passwordForm.newPassword, setBusyAction, setError, setPasswordForm, setSuccess],
  );

  return {
    handleUpdateProfile,
    handleChangePassword,
  };
}
