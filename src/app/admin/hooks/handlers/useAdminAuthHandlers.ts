import { FormEvent, useCallback, type Dispatch, type SetStateAction } from "react";
import {
  loginWithPassword,
  logoutAuthSession,
  type AuthSession,
} from "@/lib/api";
import { getErrorText } from "./shared";

type LoginForm = {
  email: string;
  password: string;
};

type UseAdminAuthHandlersParams = {
  loginForm: LoginForm;
  setLoginForm: Dispatch<SetStateAction<LoginForm>>;
  setLoginError: Dispatch<SetStateAction<string | null>>;
  setSession: Dispatch<SetStateAction<AuthSession | null>>;
  setBusyAction: Dispatch<SetStateAction<string | null>>;
  setError: Dispatch<SetStateAction<string | null>>;
  setSuccess: Dispatch<SetStateAction<string | null>>;
  loadDashboardData: (
    showLoader?: boolean,
    options?: { suppressGlobalError?: boolean },
  ) => Promise<boolean>;
  clearDashboardState: () => void;
};

export function useAdminAuthHandlers({
  loginForm,
  setLoginForm,
  setLoginError,
  setSession,
  setBusyAction,
  setError,
  setSuccess,
  loadDashboardData,
  clearDashboardState,
}: UseAdminAuthHandlersParams) {
  const handleLogin = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setLoginError(null);
      setError(null);
      setSuccess(null);
      setBusyAction("login");

      try {
        const nextSession = await loginWithPassword(loginForm);
        setSession(nextSession);
        setLoginForm((prev) => ({ ...prev, password: "" }));
        const loaded = await loadDashboardData();
        setSuccess(
          loaded
            ? "Sesion iniciada"
            : "Sesion iniciada. No se pudieron cargar todos los datos del panel.",
        );
      } catch (errorValue) {
        setLoginError(getErrorText(errorValue, "Error al iniciar sesion"));
      } finally {
        setBusyAction(null);
      }
    },
    [loginForm, loadDashboardData, setBusyAction, setError, setLoginError, setLoginForm, setSession, setSuccess],
  );

  const handleLogout = useCallback(async () => {
    setBusyAction("logout");
    setError(null);
    setSuccess(null);

    try {
      await logoutAuthSession();
    } finally {
      setSession(null);
      clearDashboardState();
      setBusyAction(null);
      setSuccess("Sesion cerrada");
    }
  }, [clearDashboardState, setBusyAction, setError, setSession, setSuccess]);

  return {
    handleLogin,
    handleLogout,
  };
}
