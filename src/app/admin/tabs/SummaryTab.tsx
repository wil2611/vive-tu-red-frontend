import { useState, type Dispatch, type SetStateAction } from "react";
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
    resource_open: "Apertura de recurso",
    resource_download: "Apertura de recurso",
    network_created: "Red creada",
    contact_submitted: "Formulario de contacto",
  };
  return labels[type] ?? type.replace(/_/g, " ");
}

function toTitleCase(value: string): string {
  return value
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

function formatPageDisplayName(path: string): string {
  const normalizedPath = path.split("?")[0]?.split("#")[0] ?? path;

  const knownLabels: Record<string, string> = {
    "/": "Inicio",
    "/redes": "Construye tu red",
    "/sobre": "Sobre el proyecto",
    "/equipo": "Equipo",
    "/contacto": "Contacto",
    "/recursos": "Recursos",
    "/libro": "Libro",
  };

  if (knownLabels[normalizedPath]) return knownLabels[normalizedPath];

  const segments = normalizedPath.split("/").filter(Boolean);
  if (!segments.length) return "Inicio";

  const firstSegment = segments[0].replace(/[-_]/g, " ");
  return toTitleCase(firstSegment);
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

function formatDateFromSeriesKey(value: string): string {
  const [year, month, day] = value.split("-").map((part) => Number.parseInt(part, 10));
  if (!year || !month || !day) return value;
  const date = new Date(year, month - 1, day, 12);
  return new Intl.DateTimeFormat("es-CO", {
    dateStyle: "medium",
  }).format(date);
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
  const [activePointIndex, setActivePointIndex] = useState<number | null>(null);
  const activePoint =
    activePointIndex !== null ? (geometry.coords[activePointIndex] ?? null) : null;
  const shouldRenderPoint = (value: number, index: number) => {
    if (value > 0) return true;
    if (index === 0 || index === geometry.coords.length - 1) return true;
    return false;
  };
  const safeTooltipY = activePoint ? Math.max(activePoint.y, 64) : 0;
  const tooltipPlacement =
    activePoint && activePoint.x <= geometry.width - 210 ? "right" : "left";
  const valueLabel =
    title === "Visitas por día"
      ? `${formatNumber(activePoint?.value ?? 0)} visitas`
      : `${formatNumber(activePoint?.value ?? 0)} interacciones`;

  return (
    <div className={`${styles.chartCard} ${styles.summarySoftCard}`}>
      <h3 className={styles.chartTitle}>{title}</h3>
      <div className={styles.chartCanvas} onMouseLeave={() => setActivePointIndex(null)}>
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
          {activePoint ? (
            <line
              x1={activePoint.x}
              y1={18}
              x2={activePoint.x}
              y2={geometry.height - 30}
              className={styles.activeGuideLine}
            />
          ) : null}

          {geometry.coords.map((point, index) => (
              <g
                key={`point-${point.date}-${index}`}
                onMouseEnter={() => setActivePointIndex(index)}
                onFocus={() => setActivePointIndex(index)}
                onBlur={() => setActivePointIndex((current) => (current === index ? null : current))}
              >
                {shouldRenderPoint(point.value, index) ? (
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r={activePointIndex === index ? 4.4 : 3.5}
                    className={styles.pointDot}
                    data-active={activePointIndex === index}
                  />
                ) : null}
                <circle
                  cx={point.x}
                  cy={point.y}
                  r={9}
                  className={styles.pointHitArea}
                  tabIndex={0}
                  aria-label={`${formatDateFromSeriesKey(point.date)}: ${formatNumber(point.value)}`}
                />
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

        {activePoint ? (
          <div
            className={styles.chartTooltip}
            data-placement={tooltipPlacement}
            style={{
              left: `${(activePoint.x / geometry.width) * 100}%`,
              top: `${(safeTooltipY / geometry.height) * 100}%`,
            }}
          >
            <strong className={styles.chartTooltipDate}>
              {formatDateFromSeriesKey(activePoint.date)}
            </strong>
            <span className={styles.chartTooltipValue}>{valueLabel}</span>
          </div>
        ) : null}
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
        "Total de páginas vistas en el periodo seleccionado (incluye repeticiones).",
      metric: stats?.kpis.pageViews ?? null,
      formatter: formatNumber,
    },
    {
      id: "interactions",
      title: "Interacciones",
      description:
        "Acciones registradas por usuarios: apertura de recursos, lectura de libro, red creada, contacto, etc.",
      metric: stats?.kpis.interactions ?? null,
      formatter: formatNumber,
    },
    {
      id: "uniqueSessions",
      title: "Sesiones únicas",
      description:
        "Cantidad de sesiones distintas detectadas en el periodo para estimar usuarios activos.",
      metric: stats?.kpis.uniqueSessions ?? null,
      formatter: formatNumber,
    },
    {
      id: "resourceOpens",
      title: "Aperturas de recursos",
      description: "Número de eventos de apertura de recursos registrados en el periodo.",
      metric: stats?.kpis.resourceOpens ?? null,
      formatter: formatNumber,
    },
    {
      id: "bookReads",
      title: "Lecturas del libro",
      description: "Cantidad de veces que se registró la interacción de lectura de libro.",
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
              <div className={styles.kpiFiltersInline}>
                <div className={styles.kpiPresets}>
                  <button
                    type="button"
                    className={styles.presetButton}
                    data-active={statsRangePreset === "7d"}
                    onClick={() => setStatsRangePreset("7d")}
                  >
                    7 días
                  </button>
                  <button
                    type="button"
                    className={styles.presetButton}
                    data-active={statsRangePreset === "30d"}
                    onClick={() => setStatsRangePreset("30d")}
                  >
                    30 días
                  </button>
                  <button
                    type="button"
                    className={styles.presetButton}
                    data-active={statsRangePreset === "90d"}
                    onClick={() => setStatsRangePreset("90d")}
                  >
                    90 días
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
                  del mismo tamaño.
                </span>
              </span>
            </div>
          ) : null}

          {hasNoStatsData ? (
            <p className={styles.emptyStatsHint}>
              No hay datos en este periodo. Navega por el sitio público y vuelve a pulsar
              <strong> Aplicar</strong> para refrescar las métricas.
            </p>
          ) : null}

          <div className={styles.metricGrid}>
            {kpiCards.map((card) => {
              const metric = card.metric;
              const deltaTone = metric ? getDeltaTone(metric.changePct) : "neutral";
              const deltaPrefix =
                deltaTone === "up" ? "\u2191 " : deltaTone === "down" ? "\u2193 " : "\u2192 ";

              return (
                <div key={card.id} className={`${styles.metricCard} ${styles.summarySoftCard}`}>
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
              title="Visitas por día"
              points={pageViewsSeries}
              colorClassName={styles.chartPrimary}
            />
            <StatsLineChart
              title="Interacciones por día"
              points={interactionsSeries}
              colorClassName={styles.chartSecondary}
            />
          </div>

          <div className={`${styles.tableWrap} ${styles.summaryTableWrap}`}>
            <table
              className={`${styles.table} ${styles.summaryMetricsTable} ${styles.topPagesTable}`}
            >
              <colgroup>
                <col />
                <col />
              </colgroup>
              <thead>
                <tr>
                  <th>Sección visitada</th>
                  <th>Visitas totales</th>
                </tr>
              </thead>
              <tbody>
                {stats?.topPages?.length ? (
                  stats.topPages.map((item, index) => (
                    <tr key={item.path}>
                      <td className={styles.pageCell}>
                        <span className={styles.pageName}>
                          {index + 1}. {formatPageDisplayName(item.path || "")}
                        </span>
                        <span className={styles.pagePath}>{item.path || "N/A"}</span>
                      </td>
                      <td className={styles.numericCell}>{formatNumber(item.views)}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={2}>Sin datos de páginas en este periodo.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div
            className={`${styles.tableWrap} ${styles.summaryTableWrap} ${styles.summarySecondaryTableWrap}`}
          >
            <table
              className={`${styles.table} ${styles.summaryMetricsTable} ${styles.interactionsTable}`}
            >
              <colgroup>
                <col />
                <col />
              </colgroup>
              <thead>
                <tr>
                  <th>Tipo de interacción</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {stats?.interactionsByType?.length ? (
                  stats.interactionsByType.map((item) => (
                    <tr key={item.type}>
                      <td className={styles.interactionTypeCell}>
                        {item.type ? formatInteractionTypeLabel(item.type) : "N/A"}
                      </td>
                      <td className={styles.numericCell}>{formatNumber(item.count)}</td>
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
