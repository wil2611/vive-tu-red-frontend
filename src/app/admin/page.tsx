"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import styles from "./page.module.css";
import {
  ApiClientError,
  clearAuthSession,
  createUser,
  deleteContactMessage,
  deleteUserById,
  getCurrentAuthSession,
  getCurrentUser,
  getStatsDashboard,
  listUnreadContactMessages,
  listUsers,
  loginWithPassword,
  logoutAuthSession,
  markContactMessageAsRead,
  updateUserById,
  type AuthSession,
  type ContactMessage,
  type CreateUserPayload,
  type KpiMetric,
  type StatsDashboard,
  type UserRecord,
  type UserRole,
} from "@/lib/api";

type UserDraft = {
  role: UserRole;
  isActive: boolean;
};

type StatsRangePreset = "7d" | "30d" | "90d" | "custom";
type SeriesPoint = { date: string; value: number };

function formatDate(value: string | null): string {
  if (!value) return "N/A";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "N/A";
  return new Intl.DateTimeFormat("es-CO", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function formatDateShort(value: string | null): string {
  if (!value) return "N/A";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "N/A";
  return new Intl.DateTimeFormat("es-CO", {
    dateStyle: "medium",
  }).format(date);
}

function roleLabel(role: UserRole): string {
  if (role === "admin") return "Admin";
  if (role === "editor") return "Editor";
  return "Investigador";
}

function getErrorText(error: unknown, fallback: string): string {
  if (error instanceof Error) return error.message;
  return fallback;
}

function formatNumber(value: number): string {
  return new Intl.NumberFormat("es-CO").format(value);
}

function formatPercent(value: number): string {
  return `${value.toFixed(2)}%`;
}

function getDeltaTone(changePct: number): "up" | "down" | "neutral" {
  if (changePct > 0) return "up";
  if (changePct < 0) return "down";
  return "neutral";
}

function formatShortDateLabel(value: string): string {
  const [year, month, day] = value.split("-").map((part) => Number.parseInt(part, 10));
  if (!year || !month || !day) return value;
  const date = new Date(year, month - 1, day, 12);
  return new Intl.DateTimeFormat("es-CO", {
    month: "short",
    day: "numeric",
  })
    .format(date)
    .replace(".", "");
}

function getSeriesChartGeometry(points: SeriesPoint[]) {
  const width = 640;
  const height = 210;
  const padTop = 18;
  const padRight = 20;
  const padBottom = 30;
  const padLeft = 36;
  const innerWidth = width - padLeft - padRight;
  const innerHeight = height - padTop - padBottom;
  const baselineY = padTop + innerHeight;

  const safePoints = points.length ? points : [{ date: "", value: 0 }];
  const maxValue = Math.max(1, ...safePoints.map((point) => point.value));
  const stepX = safePoints.length > 1 ? innerWidth / (safePoints.length - 1) : 0;

  const coords = safePoints.map((point, index) => {
    const x = padLeft + index * stepX;
    const y = baselineY - (point.value / maxValue) * innerHeight;
    return { ...point, x, y };
  });

  const linePath = coords
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
    .join(" ");

  const areaPath = `${linePath} L ${coords[coords.length - 1].x} ${baselineY} L ${coords[0].x} ${baselineY} Z`;

  const gridLines = [0, 0.25, 0.5, 0.75, 1].map((step) => {
    const y = padTop + innerHeight * step;
    const value = Math.round(maxValue * (1 - step));
    return { y, value };
  });

  const xLabelIndexes = Array.from(
    new Set(
      coords.length <= 2
        ? coords.map((_, index) => index)
        : [0, Math.floor((coords.length - 1) / 2), coords.length - 1],
    ),
  );

  return {
    width,
    height,
    baselineY,
    maxValue,
    coords,
    linePath,
    areaPath,
    gridLines,
    xLabelIndexes,
  };
}

function StatsLineChart({
  title,
  points,
  colorClassName,
}: {
  title: string;
  points: SeriesPoint[];
  colorClassName: string;
}) {
  const geometry = getSeriesChartGeometry(points);

  return (
    <div className={styles.chartCard}>
      <h3 className={styles.chartTitle}>{title}</h3>
      <div className={styles.chartCanvas}>
        <svg
          viewBox={`0 0 ${geometry.width} ${geometry.height}`}
          className={`${styles.chartSvg} ${colorClassName}`}
          role="img"
          aria-label={title}
        >
          {geometry.gridLines.map((line) => (
            <g key={`grid-${line.y}`}>
              <line
                x1={36}
                y1={line.y}
                x2={geometry.width - 20}
                y2={line.y}
                className={styles.gridLine}
              />
              <text x={6} y={line.y + 4} className={styles.axisLabel}>
                {formatNumber(line.value)}
              </text>
            </g>
          ))}

          <path d={geometry.areaPath} className={styles.areaPath} />
          <path d={geometry.linePath} className={styles.linePath} />

          {geometry.coords.map((point) => (
            <g key={`point-${point.date}`}>
              <circle cx={point.x} cy={point.y} r={3.5} className={styles.pointDot} />
              <title>{`${point.date}: ${formatNumber(point.value)}`}</title>
            </g>
          ))}

          {geometry.xLabelIndexes.map((index) => {
            const point = geometry.coords[index];
            return (
              <text
                key={`x-${point.date}-${index}`}
                x={point.x}
                y={geometry.height - 8}
                className={styles.axisLabel}
                textAnchor="middle"
              >
                {formatShortDateLabel(point.date)}
              </text>
            );
          })}
        </svg>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const [session, setSession] = useState<AuthSession | null>(null);

  const [isBootstrapping, setIsBootstrapping] = useState(true);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [busyAction, setBusyAction] = useState<string | null>(null);

  const [currentUser, setCurrentUser] = useState<UserRecord | null>(null);
  const [isForbidden, setIsForbidden] = useState(false);
  const [users, setUsers] = useState<UserRecord[]>([]);
  const [userDrafts, setUserDrafts] = useState<Record<string, UserDraft>>({});
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [stats, setStats] = useState<StatsDashboard | null>(null);
  const [statsRangePreset, setStatsRangePreset] = useState<StatsRangePreset>("30d");
  const [statsCustomFrom, setStatsCustomFrom] = useState("");
  const [statsCustomTo, setStatsCustomTo] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loginError, setLoginError] = useState<string | null>(null);

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const [createForm, setCreateForm] = useState<CreateUserPayload>({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    role: "editor",
  });

  const clearDashboardState = useCallback(() => {
    setCurrentUser(null);
    setIsForbidden(false);
    setUsers([]);
    setUserDrafts({});
    setMessages([]);
    setStats(null);
  }, []);

  const clearSessionState = useCallback(() => {
    clearAuthSession();
    setSession(null);
    clearDashboardState();
  }, [clearDashboardState]);

  const syncUserDrafts = useCallback((nextUsers: UserRecord[]) => {
    const drafts: Record<string, UserDraft> = {};
    for (const user of nextUsers) {
      drafts[user.id] = { role: user.role, isActive: user.isActive };
    }
    setUserDrafts(drafts);
  }, []);

  const buildStatsQuery = useCallback(() => {
    if (statsRangePreset === "7d") return { rangeDays: 7 };
    if (statsRangePreset === "30d") return { rangeDays: 30 };
    if (statsRangePreset === "90d") return { rangeDays: 90 };

    if (statsCustomFrom && statsCustomTo) {
      return { from: statsCustomFrom, to: statsCustomTo };
    }

    return { rangeDays: 30 };
  }, [statsCustomFrom, statsCustomTo, statsRangePreset]);

  const loadStatsData = useCallback(async () => {
    const statsData = await getStatsDashboard(buildStatsQuery());
    setStats(statsData);
  }, [buildStatsQuery]);

  const loadDashboardData = useCallback(
    async (showLoader = true) => {
      if (showLoader) setIsLoadingData(true);
      setError(null);

      try {
        const me = await getCurrentUser();
        setCurrentUser(me);

        if (me.role !== "admin") {
          setIsForbidden(true);
          setUsers([]);
          setUserDrafts({});
          setMessages([]);
          setStats(null);
          return;
        }

        setIsForbidden(false);
        const [usersData, unreadMessages, statsData] = await Promise.all([
          listUsers(),
          listUnreadContactMessages(),
          getStatsDashboard(buildStatsQuery()),
        ]);

        setUsers(usersData);
        syncUserDrafts(usersData);
        setMessages(unreadMessages);
        setStats(statsData);
      } catch (errorValue) {
        setError(getErrorText(errorValue, "No se pudieron cargar los datos del panel"));

        if (
          errorValue instanceof ApiClientError &&
          (errorValue.status === 401 || errorValue.status === 403)
        ) {
          clearSessionState();
        }
      } finally {
        if (showLoader) setIsLoadingData(false);
      }
    },
    [buildStatsQuery, clearSessionState, syncUserDrafts],
  );

  useEffect(() => {
    const storedSession = getCurrentAuthSession();
    if (!storedSession) {
      setIsBootstrapping(false);
      return;
    }

    setSession(storedSession);
    void loadDashboardData(false).finally(() => setIsBootstrapping(false));
  }, [loadDashboardData]);

  const handleApplyStatsFilters = async () => {
    setBusyAction("stats-filters");
    setError(null);
    setSuccess(null);

    try {
      await loadStatsData();
    } catch (errorValue) {
      setError(getErrorText(errorValue, "No se pudieron actualizar las metricas"));
    } finally {
      setBusyAction(null);
    }
  };

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoginError(null);
    setError(null);
    setSuccess(null);
    setBusyAction("login");

    try {
      const nextSession = await loginWithPassword(loginForm);
      setSession(nextSession);
      setLoginForm((prev) => ({ ...prev, password: "" }));
      await loadDashboardData();
      setSuccess("Sesion iniciada");
    } catch (errorValue) {
      setLoginError(getErrorText(errorValue, "Error al iniciar sesion"));
    } finally {
      setBusyAction(null);
    }
  };

  const handleLogout = async () => {
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
  };

  const handleCreateUser = async (event: FormEvent<HTMLFormElement>) => {
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
      await loadDashboardData(false);
      setSuccess("Usuario creado correctamente");
    } catch (errorValue) {
      setError(getErrorText(errorValue, "No se pudo crear el usuario"));
    } finally {
      setBusyAction(null);
    }
  };

  const handleUpdateUser = async (user: UserRecord) => {
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
  };

  const handleDeleteUser = async (user: UserRecord) => {
    if (user.id === currentUser?.id) {
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
      await loadDashboardData(false);
      setSuccess(`Usuario ${user.email} eliminado`);
    } catch (errorValue) {
      setError(getErrorText(errorValue, "No se pudo eliminar el usuario"));
    } finally {
      setBusyAction(null);
    }
  };

  const handleMarkMessageRead = async (id: string) => {
    setBusyAction(`read-${id}`);
    setError(null);
    setSuccess(null);

    try {
      await markContactMessageAsRead(id);
      await loadDashboardData(false);
      setSuccess("Mensaje marcado como leido");
    } catch (errorValue) {
      setError(getErrorText(errorValue, "No se pudo actualizar el mensaje"));
    } finally {
      setBusyAction(null);
    }
  };

  const handleDeleteMessage = async (id: string) => {
    const confirmed = window.confirm(
      "Vas a eliminar este mensaje de contacto. Esta accion no se puede deshacer.",
    );
    if (!confirmed) return;

    setBusyAction(`delete-msg-${id}`);
    setError(null);
    setSuccess(null);

    try {
      await deleteContactMessage(id);
      await loadDashboardData(false);
      setSuccess("Mensaje eliminado");
    } catch (errorValue) {
      setError(getErrorText(errorValue, "No se pudo eliminar el mensaje"));
    } finally {
      setBusyAction(null);
    }
  };

  const pageViewsSeries = stats?.series.pageViewsByDay ?? [];
  const interactionsSeries = stats?.series.interactionsByDay ?? [];
  const isCustomRangeIncomplete =
    statsRangePreset === "custom" && (!statsCustomFrom || !statsCustomTo);
  const hasNoStatsData =
    !!stats &&
    stats.kpis.pageViews.value === 0 &&
    stats.kpis.interactions.value === 0 &&
    stats.kpis.uniqueSessions.value === 0;

  const kpiCards: Array<{
    id: string;
    title: string;
    description: string;
    metric: KpiMetric | null;
    formatter: (value: number) => string;
  }> = [
    {
      id: "pageViews",
      title: "Visitas",
      description:
        "Total de paginas vistas en el periodo seleccionado (incluye repeticiones).",
      metric: stats?.kpis.pageViews ?? null,
      formatter: formatNumber,
    },
    {
      id: "interactions",
      title: "Interacciones",
      description:
        "Acciones registradas por usuarios: descargas, lectura de libro, red creada, contacto, etc.",
      metric: stats?.kpis.interactions ?? null,
      formatter: formatNumber,
    },
    {
      id: "uniqueSessions",
      title: "Sesiones unicas",
      description:
        "Cantidad de sesiones distintas detectadas en el periodo para estimar usuarios activos.",
      metric: stats?.kpis.uniqueSessions ?? null,
      formatter: formatNumber,
    },
    {
      id: "resourceDownloads",
      title: "Descargas",
      description:
        "Numero de eventos de descarga de recursos registrados en el periodo.",
      metric: stats?.kpis.resourceDownloads ?? null,
      formatter: formatNumber,
    },
    {
      id: "networksCreated",
      title: "Redes creadas",
      description:
        "Cantidad de veces que una persona completa la construccion de su red en el visualizador.",
      metric: stats?.kpis.networksCreated ?? null,
      formatter: formatNumber,
    },
    {
      id: "engagementRate",
      title: "Engagement",
      description:
        "Porcentaje de interacciones sobre visitas (interacciones / visitas * 100).",
      metric: stats?.kpis.engagementRate ?? null,
      formatter: formatPercent,
    },
  ];

  return (
    <section className={styles.page}>
      <div className={`container ${styles.shell}`}>
        <header className={styles.topBar}>
          <div>
            <h1 className={styles.title}>Panel de Administracion</h1>
            <p className={styles.subtitle}>
              Gestiona usuarios, revisa mensajes y consulta metricas del backend.
            </p>
          </div>
          {session && (
            <button
              type="button"
              className="btn btn-outline"
              onClick={handleLogout}
              disabled={busyAction === "logout"}
            >
              {busyAction === "logout" ? "Cerrando..." : "Cerrar sesion"}
            </button>
          )}
        </header>

        {error && <div className={styles.statusError}>{error}</div>}
        {success && <div className={styles.statusSuccess}>{success}</div>}

        {isBootstrapping ? (
          <article className={styles.panel}>
            <h2 className={styles.panelTitle}>Verificando sesion...</h2>
          </article>
        ) : !session ? (
          <article className={`${styles.panel} ${styles.loginCard}`}>
            <div className={styles.panelHeader}>
              <h2 className={styles.panelTitle}>Acceso administrador</h2>
              <p className={styles.panelHint}>
                Inicia sesion con un usuario que tenga rol `admin`.
              </p>
            </div>

            <form onSubmit={handleLogin} className={styles.loginGrid}>
              <div>
                <label htmlFor="login-email">Email</label>
                <input
                  id="login-email"
                  type="email"
                  value={loginForm.email}
                  onChange={(event) =>
                    setLoginForm((prev) => ({ ...prev, email: event.target.value }))
                  }
                  required
                />
              </div>

              <div>
                <label htmlFor="login-password">Contrasena</label>
                <input
                  id="login-password"
                  type="password"
                  value={loginForm.password}
                  onChange={(event) =>
                    setLoginForm((prev) => ({ ...prev, password: event.target.value }))
                  }
                  minLength={6}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary" disabled={busyAction === "login"}>
                {busyAction === "login" ? "Ingresando..." : "Iniciar sesion"}
              </button>
            </form>

            {loginError && <p className={styles.statusError}>{loginError}</p>}
          </article>
        ) : isForbidden ? (
          <article className={styles.panel}>
            <h2 className={styles.panelTitle}>Acceso restringido</h2>
            <p className={styles.panelHint}>
              El usuario autenticado no tiene rol `admin`. Rol actual:{" "}
              <strong>{currentUser ? roleLabel(currentUser.role) : "desconocido"}</strong>.
            </p>
          </article>
        ) : (
          <div className={styles.dashboardGrid}>
            <article className={styles.panel}>
              <div className={styles.panelHeader}>
                <h2 className={styles.panelTitle}>Resumen</h2>
                <p className={styles.panelHint}>
                  {currentUser
                    ? `${currentUser.firstName} ${currentUser.lastName} (${currentUser.email})`
                    : "Sin informacion de usuario"}
                </p>
              </div>

              {isLoadingData ? (
                <p className={styles.statusMuted}>Cargando datos...</p>
              ) : (
                <>
                  <div className={styles.kpiToolbar}>
                    <div className={styles.kpiTopRow}>
                      <div className={styles.kpiPresets}>
                        <button
                          type="button"
                          className={styles.presetButton}
                          data-active={statsRangePreset === "7d"}
                          onClick={() => setStatsRangePreset("7d")}
                        >
                          7 dias
                        </button>
                        <button
                          type="button"
                          className={styles.presetButton}
                          data-active={statsRangePreset === "30d"}
                          onClick={() => setStatsRangePreset("30d")}
                        >
                          30 dias
                        </button>
                        <button
                          type="button"
                          className={styles.presetButton}
                          data-active={statsRangePreset === "90d"}
                          onClick={() => setStatsRangePreset("90d")}
                        >
                          90 dias
                        </button>
                        <button
                          type="button"
                          className={styles.presetButton}
                          data-active={statsRangePreset === "custom"}
                          onClick={() => setStatsRangePreset("custom")}
                        >
                          Personalizado
                        </button>
                      </div>

                      <button
                        type="button"
                        className={`btn btn-secondary ${styles.applyButton}`}
                        onClick={() => void handleApplyStatsFilters()}
                        disabled={busyAction === "stats-filters" || isCustomRangeIncomplete}
                      >
                        {busyAction === "stats-filters" ? "Actualizando..." : "Aplicar"}
                      </button>
                    </div>

                    {statsRangePreset === "custom" ? (
                      <div className={styles.customRangeRow}>
                        <input
                          type="date"
                          value={statsCustomFrom}
                          onChange={(event) => setStatsCustomFrom(event.target.value)}
                        />
                        <input
                          type="date"
                          value={statsCustomTo}
                          onChange={(event) => setStatsCustomTo(event.target.value)}
                        />
                      </div>
                    ) : null}
                  </div>

                  {stats ? (
                    <div className={styles.rangeSummary}>
                      <span className={`${styles.rangeBadge} ${styles.rangeBadgeCurrent}`}>
                        Periodo actual: {formatDateShort(stats.range.startDate)} -{" "}
                        {formatDateShort(stats.range.endDate)}
                      </span>
                      <span className={styles.rangeBadge}>
                        Periodo anterior: {formatDateShort(stats.range.previousStartDate)} -{" "}
                        {formatDateShort(stats.range.previousEndDate)}
                      </span>
                      <span className={styles.rangeHelpWrap}>
                        <button
                          type="button"
                          className={styles.rangeHelpButton}
                          aria-label="Explicacion de comparacion de periodos"
                        >
                          ?
                        </button>
                        <span className={styles.rangeHelpTooltip}>
                          El valor &quot;Anterior&quot; compara contra el bloque
                          inmediatamente previo del mismo tamano.
                        </span>
                      </span>
                    </div>
                  ) : null}

                  {hasNoStatsData ? (
                    <p className={styles.emptyStatsHint}>
                      No hay datos en este periodo. Navega por el sitio publico y vuelve a
                      pulsar <strong>Aplicar</strong> para refrescar las metricas.
                    </p>
                  ) : null}

                  <div className={styles.metricGrid}>
                    {kpiCards.map((card) => {
                      const metric = card.metric;
                      const deltaTone = metric
                        ? getDeltaTone(metric.changePct)
                        : "neutral";
                      return (
                        <div key={card.id} className={styles.metricCard}>
                          <div className={styles.metricLabelRow}>
                            <p className={styles.metricLabel}>{card.title}</p>
                            <span className={styles.metricInfoWrap}>
                              <button
                                type="button"
                                className={styles.metricInfo}
                                aria-label={`Explicacion de ${card.title}`}
                              >
                                ?
                              </button>
                              <span className={styles.metricTooltip}>
                                {card.description}
                              </span>
                            </span>
                          </div>
                          <p className={styles.metricValue}>
                            {metric ? card.formatter(metric.value) : "0"}
                          </p>
                          <div className={styles.metricFooter}>
                            <p className={styles.metricSub}>
                              Anterior:{" "}
                              {metric ? card.formatter(metric.previousValue) : "0"}
                            </p>
                            <p className={styles.metricDelta} data-tone={deltaTone}>
                              {metric
                                ? `${deltaTone === "up" ? "↑ " : deltaTone === "down" ? "↓ " : "→ "}${metric.changePct > 0 ? "+" : ""}${metric.changePct.toFixed(2)}%`
                                : "→ 0.00%"}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className={styles.chartGrid}>
                    <StatsLineChart
                      title="Visitas por dia"
                      points={pageViewsSeries}
                      colorClassName={styles.chartPrimary}
                    />
                    <StatsLineChart
                      title="Interacciones por dia"
                      points={interactionsSeries}
                      colorClassName={styles.chartSecondary}
                    />
                  </div>

                  <div className={styles.tableWrap}>
                    <table className={styles.table}>
                      <thead>
                        <tr>
                          <th>Top paginas</th>
                          <th>Vistas</th>
                        </tr>
                      </thead>
                      <tbody>
                        {stats?.topPages?.length ? (
                          stats.topPages.map((item) => (
                            <tr key={item.path}>
                              <td>{item.path || "N/A"}</td>
                              <td>{formatNumber(item.views)}</td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={2}>Sin datos de paginas en este periodo.</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  <div className={styles.tableWrap}>
                    <table className={styles.table}>
                      <thead>
                        <tr>
                          <th>Interaccion</th>
                          <th>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {stats?.interactionsByType?.length ? (
                          stats.interactionsByType.map((item) => (
                            <tr key={item.type}>
                              <td>{item.type || "N/A"}</td>
                              <td>{formatNumber(item.count)}</td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={2}>Sin interacciones registradas.</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </article>

            <article className={styles.panel}>
              <div className={styles.panelHeader}>
                <h2 className={styles.panelTitle}>Crear usuario</h2>
                <p className={styles.panelHint}>Endpoint: `POST /users`</p>
              </div>

              <form className={styles.createForm} onSubmit={handleCreateUser}>
                <div className={styles.formGrid}>
                  <div>
                    <label htmlFor="create-firstName">Nombre</label>
                    <input
                      id="create-firstName"
                      value={createForm.firstName}
                      onChange={(event) =>
                        setCreateForm((prev) => ({ ...prev, firstName: event.target.value }))
                      }
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="create-lastName">Apellido</label>
                    <input
                      id="create-lastName"
                      value={createForm.lastName}
                      onChange={(event) =>
                        setCreateForm((prev) => ({ ...prev, lastName: event.target.value }))
                      }
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="create-email">Email</label>
                    <input
                      id="create-email"
                      type="email"
                      value={createForm.email}
                      onChange={(event) =>
                        setCreateForm((prev) => ({ ...prev, email: event.target.value }))
                      }
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="create-password">Contrasena</label>
                    <input
                      id="create-password"
                      type="password"
                      minLength={6}
                      value={createForm.password}
                      onChange={(event) =>
                        setCreateForm((prev) => ({ ...prev, password: event.target.value }))
                      }
                      required
                    />
                  </div>
                </div>

                <div className={styles.fullWidth}>
                  <label htmlFor="create-role">Rol</label>
                  <select
                    id="create-role"
                    value={createForm.role}
                    onChange={(event) =>
                      setCreateForm((prev) => ({ ...prev, role: event.target.value as UserRole }))
                    }
                  >
                    <option value="admin">Admin</option>
                    <option value="editor">Editor</option>
                    <option value="investigador">Investigador</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={busyAction === "create-user"}
                >
                  {busyAction === "create-user" ? "Creando..." : "Crear usuario"}
                </button>
              </form>
            </article>

            <article className={styles.panel}>
              <div className={styles.panelHeader}>
                <h2 className={styles.panelTitle}>Usuarios</h2>
                <p className={styles.panelHint}>
                  Gestion de estado y rol para cuentas registradas.
                </p>
              </div>

              <div className={styles.tableWrap}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Usuario</th>
                      <th>Rol</th>
                      <th>Estado</th>
                      <th>Creado</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.length ? (
                      users.map((user) => {
                        const draft = userDrafts[user.id] ?? {
                          role: user.role,
                          isActive: user.isActive,
                        };
                        const isUpdating = busyAction === `update-${user.id}`;
                        const isDeleting = busyAction === `delete-${user.id}`;
                        return (
                          <tr key={user.id}>
                            <td>
                              <strong>{user.firstName} {user.lastName}</strong>
                              <br />
                              <span className={styles.emailBadge}>{user.email}</span>
                            </td>
                            <td>
                              <select
                                value={draft.role}
                                onChange={(event) =>
                                  setUserDrafts((prev) => ({
                                    ...prev,
                                    [user.id]: {
                                      ...draft,
                                      role: event.target.value as UserRole,
                                    },
                                  }))
                                }
                              >
                                <option value="admin">Admin</option>
                                <option value="editor">Editor</option>
                                <option value="investigador">Investigador</option>
                              </select>
                            </td>
                            <td>
                              <select
                                value={draft.isActive ? "active" : "inactive"}
                                onChange={(event) =>
                                  setUserDrafts((prev) => ({
                                    ...prev,
                                    [user.id]: {
                                      ...draft,
                                      isActive: event.target.value === "active",
                                    },
                                  }))
                                }
                              >
                                <option value="active">Activo</option>
                                <option value="inactive">Inactivo</option>
                              </select>
                            </td>
                            <td>{formatDate(user.createdAt)}</td>
                            <td>
                              <div className={styles.rowActions}>
                                <button
                                  type="button"
                                  className={styles.secondaryButton}
                                  onClick={() => void handleUpdateUser(user)}
                                  disabled={isUpdating || isDeleting}
                                >
                                  {isUpdating ? "Guardando..." : "Guardar"}
                                </button>
                                <button
                                  type="button"
                                  className={styles.dangerButton}
                                  onClick={() => void handleDeleteUser(user)}
                                  disabled={isUpdating || isDeleting || user.id === currentUser?.id}
                                >
                                  {isDeleting ? "Eliminando..." : "Eliminar"}
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={5}>No hay usuarios para mostrar.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </article>

            <article className={styles.panel}>
              <div className={styles.panelHeader}>
                <h2 className={styles.panelTitle}>Mensajes sin leer</h2>
                <p className={styles.panelHint}>
                  Endpoint: `GET /contact/admin/unread`
                </p>
              </div>

              <div className={styles.messagesList}>
                {messages.length ? (
                  messages.map((msg) => {
                    const reading = busyAction === `read-${msg.id}`;
                    const deleting = busyAction === `delete-msg-${msg.id}`;
                    return (
                      <article key={msg.id} className={styles.messageItem}>
                        <p className={styles.messageMeta}>
                          <strong>{msg.subject}</strong> - {msg.name} ({msg.email})
                        </p>
                        <p className={styles.messageDate}>{formatDate(msg.createdAt)}</p>
                        <p className={styles.messageBody}>{msg.message}</p>
                        <div className={styles.rowActions}>
                          <button
                            type="button"
                            className={styles.secondaryButton}
                            onClick={() => void handleMarkMessageRead(msg.id)}
                            disabled={reading || deleting}
                          >
                            {reading ? "Actualizando..." : "Marcar leido"}
                          </button>
                          <button
                            type="button"
                            className={styles.dangerButton}
                            onClick={() => void handleDeleteMessage(msg.id)}
                            disabled={reading || deleting}
                          >
                            {deleting ? "Eliminando..." : "Eliminar"}
                          </button>
                        </div>
                      </article>
                    );
                  })
                ) : (
                  <p className={styles.statusMuted}>No hay mensajes sin leer.</p>
                )}
              </div>
            </article>
          </div>
        )}
      </div>
    </section>
  );
}

