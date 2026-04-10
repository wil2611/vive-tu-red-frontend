import type { Dispatch, SetStateAction } from "react";
import type { ContactMessage } from "@/lib/api";
import type { MessageFilter } from "../admin.shared";
import styles from "../page.module.css";

type MessagesTabProps = {
  filteredMessages: ContactMessage[];
  unreadMessagesCount: number;
  inProgressMessagesCount: number;
  respondedMessagesCount: number;
  readMessagesCount: number;
  messagesFilter: MessageFilter;
  setMessagesFilter: Dispatch<SetStateAction<MessageFilter>>;
  messagesSearch: string;
  setMessagesSearch: Dispatch<SetStateAction<string>>;
  messagesPage: number;
  setMessagesPage: Dispatch<SetStateAction<number>>;
  allMessagesCount: number;
  messagesTotalPages: number;
  isLoadingMessages: boolean;
  busyAction: string | null;
  canMarkMessages: boolean;
  canDeleteMessages: boolean;
  onMarkMessageRead: (id: string) => void | Promise<void>;
  onUpdateMessageStatus: (id: string, status: ContactMessage["status"]) => void | Promise<void>;
  onDeleteMessage: (id: string) => void | Promise<void>;
};

function formatDate(value: string | null): string {
  if (!value) return "N/A";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "N/A";
  return new Intl.DateTimeFormat("es-CO", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export function MessagesTab({
  filteredMessages,
  unreadMessagesCount,
  inProgressMessagesCount,
  respondedMessagesCount,
  readMessagesCount,
  messagesFilter,
  setMessagesFilter,
  messagesSearch,
  setMessagesSearch,
  messagesPage,
  setMessagesPage,
  allMessagesCount,
  messagesTotalPages,
  isLoadingMessages,
  busyAction,
  canMarkMessages,
  canDeleteMessages,
  onMarkMessageRead,
  onUpdateMessageStatus,
  onDeleteMessage,
}: MessagesTabProps) {
  const isOnFirstPage = messagesPage <= 1;
  const isOnLastPage = messagesPage >= messagesTotalPages;

  const statusLabelByValue: Record<ContactMessage["status"], string> = {
    new: "Nuevo",
    in_progress: "En proceso",
    responded: "Respondido",
    read: "Leido",
  };

  return (
    <article className={styles.panel}>
      <div className={styles.panelHeader}>
        <h2 className={`${styles.panelTitle} ${styles.profileTitle}`}>Historial de mensajes</h2>
      </div>

      <div className={styles.messageSearchBar}>
        <input
          type="search"
          value={messagesSearch}
          onChange={(event) => {
            setMessagesSearch(event.target.value);
            setMessagesPage(1);
          }}
          placeholder="Buscar por nombre, correo, asunto o mensaje"
          aria-label="Buscar mensajes"
        />
      </div>

      <div className={styles.messageFilters}>
        <button
          type="button"
          className={styles.messageFilterButton}
          data-active={messagesFilter === "all"}
          onClick={() => {
            setMessagesFilter("all");
            setMessagesPage(1);
          }}
        >
          Todos ({allMessagesCount})
        </button>
        <button
          type="button"
          className={styles.messageFilterButton}
          data-active={messagesFilter === "new"}
          onClick={() => {
            setMessagesFilter("new");
            setMessagesPage(1);
          }}
        >
          Nuevos ({unreadMessagesCount})
        </button>
        <button
          type="button"
          className={styles.messageFilterButton}
          data-active={messagesFilter === "in_progress"}
          onClick={() => {
            setMessagesFilter("in_progress");
            setMessagesPage(1);
          }}
        >
          En proceso ({inProgressMessagesCount})
        </button>
        <button
          type="button"
          className={styles.messageFilterButton}
          data-active={messagesFilter === "responded"}
          onClick={() => {
            setMessagesFilter("responded");
            setMessagesPage(1);
          }}
        >
          Respondidos ({respondedMessagesCount})
        </button>
        <button
          type="button"
          className={styles.messageFilterButton}
          data-active={messagesFilter === "read"}
          onClick={() => {
            setMessagesFilter("read");
            setMessagesPage(1);
          }}
        >
          Leidos ({readMessagesCount})
        </button>
      </div>

      <div className={styles.messagesList}>
        {isLoadingMessages ? (
          <p className={styles.statusMuted}>Cargando mensajes...</p>
        ) : filteredMessages.length ? (
          filteredMessages.map((msg) => {
            const reading = busyAction === `read-${msg.id}`;
            const deleting = busyAction === `delete-msg-${msg.id}`;
              const changingStatus = busyAction === `status-${msg.id}`;
              return (
                <article key={msg.id} className={styles.messageItem}>
                  <div className={styles.messageHeaderRow}>
                    <p className={styles.messageSubject}>
                      <strong>{msg.subject}</strong>
                    </p>
                    <div className={styles.messageHeaderMeta}>
                      <span className={styles.messageStatus} data-status={msg.status}>
                        {statusLabelByValue[msg.status]}
                      </span>
                      <span className={styles.messageDateText}>{formatDate(msg.createdAt)}</span>
                    </div>
                  </div>
                  <p className={styles.messageSender}>
                    {msg.name} ({msg.email})
                  </p>
                  {msg.readAt ? (
                    <p className={styles.messageReadAt}>Primera lectura: {formatDate(msg.readAt)}</p>
                  ) : null}
                <div className={styles.messageContentBox}>
                  <p className={styles.messageBody}>{msg.message}</p>
                </div>
                <div className={styles.messageActionsGrid}>
                  <div className={styles.messageStatusEditor}>
                    <label htmlFor={`msg-status-${msg.id}`}>Estado</label>
                    <select
                      id={`msg-status-${msg.id}`}
                      value={msg.status}
                      onChange={(event) =>
                        void onUpdateMessageStatus(
                          msg.id,
                          event.target.value as ContactMessage["status"],
                        )
                      }
                      disabled={changingStatus || deleting}
                    >
                      <option value="new">Nuevo</option>
                      <option value="in_progress">En proceso</option>
                      <option value="responded">Respondido</option>
                      <option value="read">Leido</option>
                    </select>
                  </div>
                  <div className={styles.rowActions}>
                    {canMarkMessages && msg.status === "new" ? (
                      <button
                        type="button"
                        className={styles.secondaryButton}
                        onClick={() => void onMarkMessageRead(msg.id)}
                        disabled={reading || deleting || changingStatus}
                      >
                        {reading ? "Actualizando..." : "Marcar leido"}
                      </button>
                    ) : null}
                    {canDeleteMessages ? (
                      <button
                        type="button"
                        className={styles.dangerButton}
                        onClick={() => void onDeleteMessage(msg.id)}
                        disabled={reading || deleting || changingStatus}
                      >
                        {deleting ? "Eliminando..." : "Eliminar"}
                      </button>
                    ) : null}
                  </div>
                </div>
              </article>
            );
          })
        ) : (
          <p className={styles.statusMuted}>No hay mensajes para el filtro seleccionado.</p>
        )}
      </div>

      <div className={styles.messagesPagination}>
        <button
          type="button"
          className={styles.messageFilterButton}
          onClick={() => setMessagesPage((prev) => Math.max(1, prev - 1))}
          disabled={isOnFirstPage || isLoadingMessages}
        >
          Anterior
        </button>
        <p className={styles.messagesPageInfo}>
          Pagina {messagesPage} de {messagesTotalPages}
        </p>
        <button
          type="button"
          className={styles.messageFilterButton}
          onClick={() => setMessagesPage((prev) => Math.min(messagesTotalPages, prev + 1))}
          disabled={isOnLastPage || isLoadingMessages}
        >
          Siguiente
        </button>
      </div>
    </article>
  );
}
