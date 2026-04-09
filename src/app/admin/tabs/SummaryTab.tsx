import type { Dispatch, SetStateAction } from "react";
import type { KpiMetric, StatsDashboard } from "@/lib/api";
import type { StatsRangePreset } from "../admin.shared";
import styles from "../page.module.css";

type SeriesPoint = { date: string; value: number };

type KpiCard = {
  id: string;
  title: string;
  description: string;
  metric: KpiMetric | null;
  formatter: (value: number) => string;
};

type SummaryTabProps = {
  isLoadingData: boolean;
  stats: StatsDashboard | null;
  busyAction: string | null;
  statsRangePreset: StatsRangePreset;
  setStatsRangePreset: Dispatch<SetStateAction<StatsRangePreset>>;
  statsCustomFrom: string;
  setStatsCustomFrom: Dispatch<SetStateAction<string>>;
  statsCustomTo: string;
  setStatsCustomTo: Dispatch<SetStateAction<string>>;
  hasPendingStatsFilters: boolean;
  isCustomRangeIncomplete: boolean;
  onApplyStatsFilters: () => void | Promise<void>;
};

function formatDateShort(value: string | null): string {
  if (!value) return "N/A";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "N/A";
  return new Intl.DateTimeFormat("es-CO", {
    dateStyle: "medium",
  }).format(date);
}

function formatNumber(value: number): string {
  return new Intl.NumberFormat("es-CO").format(value);
}

function formatPercent(value: number): string {
  return `${value.toFixed(2)}%`;
}

function formatInteractionTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    book_read: "Lectura de libro",
    resource_download: "Descarga de recursos",
    network_created: "Red creada",
    contact_submitted: "Formulario de contacto",
  };
  return labels[type] ?? type.replace(/_/g, " ");
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

export function SummaryTab({
  isLoadingData,
  stats,
  busyAction,
  statsRangePreset,
  setStatsRangePreset,
  statsCustomFrom,
  setStatsCustomFrom,
  statsCustomTo,
  setStatsCustomTo,
  hasPendingStatsFilters,
  isCustomRangeIncomplete,
  onApplyStatsFilters,
}: SummaryTabProps) {
  const pageViewsSeries = stats?.series.pageViewsByDay ?? [];
  const interactionsSeries = stats?.series.interactionsByDay ?? [];
  const hasNoStatsData =
    !!stats &&
    stats.kpis.pageViews.value === 0 &&
    stats.kpis.interactions.value === 0 &&
    stats.kpis.uniqueSessions.value === 0;

  const kpiCards: KpiCard[] = [
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
      description: "Numero de eventos de descarga de recursos registrados en el periodo.",
      metric: stats?.kpis.resourceDownloads ?? null,
      formatter: formatNumber,
    },
    {
      id: "bookReads",
      title: "Lecturas del libro",
      description: "Cantidad de veces que se registro la interaccion de lectura de libro.",
      metric: stats?.kpis.bookReads ?? null,
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
      id: "contactSubmitted",
      title: "Contactos enviados",
      description: "Total de formularios de contacto enviados durante el periodo.",
      metric: stats?.kpis.contactSubmitted ?? null,
      formatter: formatNumber,
    },
    {
      id: "engagementRate",
      title: "Engagement",
      description: "Porcentaje de interacciones sobre visitas (interacciones / visitas * 100).",
      metric: stats?.kpis.engagementRate ?? null,
      formatter: formatPercent,
    },
  ];

  return (
    <article className={styles.panel}>
      <div className={styles.panelHeader}>
        <h2 className={`${styles.panelTitle} ${styles.profileTitle}`}>Resumen</h2>
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

              <div className={styles.filtersApplyWrap}>
                {hasPendingStatsFilters ? (
                  <span className={styles.pendingFiltersBadge}>Filtros sin aplicar</span>
                ) : null}
                <button
                  type="button"
                  className={`btn btn-secondary ${styles.applyButton}`}
                  onClick={() => void onApplyStatsFilters()}
                  disabled={busyAction === "stats-filters" || isCustomRangeIncomplete}
                >
                  {busyAction === "stats-filters" ? "Actualizando..." : "Aplicar"}
                </button>
              </div>
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
                  El valor &quot;Anterior&quot; compara contra el bloque inmediatamente previo
                  del mismo tamano.
                </span>
              </span>
            </div>
          ) : null}

          {hasNoStatsData ? (
            <p className={styles.emptyStatsHint}>
              No hay datos en este periodo. Navega por el sitio publico y vuelve a pulsar
              <strong> Aplicar</strong> para refrescar las metricas.
            </p>
          ) : null}

          <div className={styles.metricGrid}>
            {kpiCards.map((card) => {
              const metric = card.metric;
              const deltaTone = metric ? getDeltaTone(metric.changePct) : "neutral";
              const deltaPrefix =
                deltaTone === "up" ? "\u2191 " : deltaTone === "down" ? "\u2193 " : "\u2192 ";

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
                      <span className={styles.metricTooltip}>{card.description}</span>
                    </span>
                  </div>
                  <p className={styles.metricValue}>{metric ? card.formatter(metric.value) : "0"}</p>
                  <div className={styles.metricFooter}>
                    <p className={styles.metricSub}>
                      Anterior: {metric ? card.formatter(metric.previousValue) : "0"}
                    </p>
                    <p className={styles.metricDelta} data-tone={deltaTone}>
                      {metric
                        ? `${deltaPrefix}${metric.changePct > 0 ? "+" : ""}${metric.changePct.toFixed(2)}%`
                        : "\u2192 0.00%"}
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
                      <td>{item.type ? formatInteractionTypeLabel(item.type) : "N/A"}</td>
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
  );
}
