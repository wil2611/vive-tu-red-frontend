import { useCallback, type Dispatch, type SetStateAction } from "react";
import {
  deleteContactMessage,
  markContactMessageAsRead,
  updateContactMessageStatus,
  type ContactMessage,
} from "@/lib/api";
import { getErrorText } from "./shared";

type UseAdminMessageHandlersParams = {
  setMessages: Dispatch<SetStateAction<ContactMessage[]>>;
  setBusyAction: Dispatch<SetStateAction<string | null>>;
  setError: Dispatch<SetStateAction<string | null>>;
  setSuccess: Dispatch<SetStateAction<string | null>>;
  loadMessagesData: () => Promise<void>;
};

export function useAdminMessageHandlers({
  setMessages,
  setBusyAction,
  setError,
  setSuccess,
  loadMessagesData,
}: UseAdminMessageHandlersParams) {
  const handleMarkMessageRead = useCallback(
    async (id: string) => {
      setBusyAction(`read-${id}`);
      setError(null);
      setSuccess(null);

      try {
        const response = await markContactMessageAsRead(id);
        setMessages((prev) =>
          prev.map((item) => (item.id === id ? response.item : item)),
        );
        setSuccess("Mensaje marcado como leido");
      } catch (errorValue) {
        setError(getErrorText(errorValue, "No se pudo actualizar el mensaje"));
      } finally {
        setBusyAction(null);
      }
    },
    [setBusyAction, setError, setMessages, setSuccess],
  );

  const handleUpdateMessageStatus = useCallback(
    async (id: string, status: ContactMessage["status"]) => {
      setBusyAction(`status-${id}`);
      setError(null);
      setSuccess(null);

      try {
        const response = await updateContactMessageStatus(id, { status });
        setMessages((prev) =>
          prev.map((item) => (item.id === id ? response.item : item)),
        );
        setSuccess("Estado del mensaje actualizado");
      } catch (errorValue) {
        setError(getErrorText(errorValue, "No se pudo actualizar el estado"));
      } finally {
        setBusyAction(null);
      }
    },
    [setBusyAction, setError, setMessages, setSuccess],
  );

  const handleDeleteMessage = useCallback(
    async (id: string) => {
      const confirmed = window.confirm(
        "Vas a eliminar este mensaje de contacto. Esta accion no se puede deshacer.",
      );
      if (!confirmed) return;

      setBusyAction(`delete-msg-${id}`);
      setError(null);
      setSuccess(null);

      try {
        await deleteContactMessage(id);
        await loadMessagesData();
        setSuccess("Mensaje eliminado");
      } catch (errorValue) {
        setError(getErrorText(errorValue, "No se pudo eliminar el mensaje"));
      } finally {
        setBusyAction(null);
      }
    },
    [loadMessagesData, setBusyAction, setError, setSuccess],
  );

  return {
    handleMarkMessageRead,
    handleUpdateMessageStatus,
    handleDeleteMessage,
  };
}
