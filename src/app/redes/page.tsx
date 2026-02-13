"use client";

import { useState, useMemo } from "react";

interface Person {
  name: string;
  relation: string;
  closeness: number;
}

const relationCategories = [
  { label: "Familia", icon: "🏠" },
  { label: "Amistad", icon: "👫" },
  { label: "Pareja", icon: "💛" },
  { label: "Profesional", icon: "💼" },
  { label: "Académico", icon: "🎓" },
  { label: "Institución", icon: "🏛️" },
];

const colorMap: Record<string, string> = {
  Familia: "#1D3E2A",
  Amistad: "#00555A",
  Pareja: "#DCA15D",
  Profesional: "#C96A4A",
  Académico: "#2a5a3d",
  Institución: "#a8553a",
};

/* Simple SVG icon paths (14x14 viewBox, white fill) */
function NodeIcon({ relation, x, y }: { relation: string; x: number; y: number }) {
  const size = 14;
  const dx = x - size / 2;
  const dy = y - size / 2;
  switch (relation) {
    case "Familia":
      return (
        <g transform={`translate(${dx},${dy})`}>
          <path d="M7 1L1 6h2v6h3V9h2v3h3V6h2L7 1z" fill="white" />
        </g>
      );
    case "Amistad":
      return (
        <g transform={`translate(${dx},${dy})`}>
          <circle cx="4.5" cy="4" r="2.5" fill="white" />
          <circle cx="9.5" cy="4" r="2.5" fill="white" />
          <path d="M1 12c0-2.5 2-4 3.5-4s2.5.8 2.5.8S8.5 8 10.5 8 14 9.5 14 12H1z" fill="white" />
        </g>
      );
    case "Pareja":
      return (
        <g transform={`translate(${dx},${dy})`}>
          <path d="M7 13l-5.5-5.5a3.2 3.2 0 010-4.5 3.2 3.2 0 014.5 0L7 4.1l1-1.1a3.2 3.2 0 014.5 0 3.2 3.2 0 010 4.5L7 13z" fill="white" />
        </g>
      );
    case "Profesional":
      return (
        <g transform={`translate(${dx},${dy})`}>
          <rect x="1" y="5" width="12" height="8" rx="1.5" fill="white" />
          <path d="M4 5V3.5C4 2.1 5.1 1 6.5 1h1C8.9 1 10 2.1 10 3.5V5" stroke="white" fill="none" strokeWidth="1.5" />
        </g>
      );
    case "Académico":
      return (
        <g transform={`translate(${dx},${dy})`}>
          <path d="M7 1L0 5l7 4 7-4-7-4z" fill="white" />
          <path d="M2 6.8v3.5L7 13l5-2.7V6.8" fill="none" stroke="white" strokeWidth="1.2" />
        </g>
      );
    case "Institución":
      return (
        <g transform={`translate(${dx},${dy})`}>
          <path d="M7 0L1 4v1h12V4L7 0z" fill="white" />
          <rect x="2" y="6" width="2" height="5" rx="0.5" fill="white" />
          <rect x="6" y="6" width="2" height="5" rx="0.5" fill="white" />
          <rect x="10" y="6" width="2" height="5" rx="0.5" fill="white" />
          <rect x="1" y="12" width="12" height="1.5" rx="0.5" fill="white" />
        </g>
      );
    default:
      return (
        <circle cx={x} cy={y} r="4" fill="white" />
      );
  }
}

export default function RedesPage() {
  const [people, setPeople] = useState<Person[]>([]);
  const [name, setName] = useState("");
  const [relation, setRelation] = useState("Familia");
  const [closeness, setCloseness] = useState(3);

  const addPerson = () => {
    if (!name.trim()) return;
    setPeople([...people, { name: name.trim(), relation, closeness }]);
    setName("");
    setCloseness(3);
  };

  const removePerson = (idx: number) => {
    setPeople(people.filter((_, i) => i !== idx));
  };

  const getColor = (rel: string) => colorMap[rel] || "#5a7d66";

  const edgesCount = people.length;

  const nodePositions = useMemo(() => {
    return people.map((p, i) => {
      const angle = (2 * Math.PI * i) / people.length - Math.PI / 2;
      // Ensure enough distance: min 100 for closeness=5, up to 210 for closeness=1
      const dist = 100 + (5 - p.closeness) * 28;
      const r = 20 + p.closeness * 1.5;
      return {
        x: 300 + Math.cos(angle) * dist,
        y: 200 + Math.sin(angle) * dist,
        r,
      };
    });
  }, [people]);

  const activeRelations = useMemo(
    () => Array.from(new Set(people.map((p) => p.relation))),
    [people],
  );

  const closenessLabel =
    closeness <= 2 ? "Casual" : closeness <= 3 ? "Moderada" : "Fuerte";

  return (
    <div>
      {/* Hero */}
      <section
        style={{
          background: "linear-gradient(180deg, #f5f0e1 0%, var(--bg) 100%)",
          padding: "48px 0 16px",
        }}
      >
        <div className="container">
          <span className="hero-badge">Herramienta educativa</span>
          <h1
            style={{
              fontSize: "clamp(2rem, 4vw, 2.6rem)",
              fontWeight: 800,
              color: "#1D3E2A",
              margin: "16px 0 12px",
              fontFamily: "Georgia, serif",
              lineHeight: 1.15,
            }}
          >
            Visualizador de redes
          </h1>
          <p
            style={{
              fontSize: "1.05rem",
              lineHeight: 1.75,
              color: "#5a7d66",
              maxWidth: 600,
              margin: 0,
            }}
          >
            Explora y visualiza tus redes personales de apoyo de forma gráfica.
            Tus datos no se almacenan ni se comparten.
          </p>
        </div>
      </section>

      {/* Main two-panel layout */}
      <section style={{ background: "var(--bg)" }}>
        <div className="container" style={{ paddingTop: 32, paddingBottom: 56 }}>
          <div className="redes-layout">
            {/* ── LEFT PANEL: Form ── */}
            <div className="redes-panel-form">
              {/* Progress indicator */}
              <div className="redes-progress-bar">
                <div className="redes-progress-track">
                  <div
                    className="redes-progress-fill"
                    style={{
                      width: `${Math.min(people.length / 5, 1) * 100}%`,
                    }}
                  />
                </div>
                <span className="redes-progress-label">
                  {people.length === 0
                    ? "Sin conexiones"
                    : `${people.length} conexion${people.length === 1 ? "" : "es"}`}
                </span>
              </div>

              <h2 className="redes-form-title">Conexiones sociales</h2>
              <p className="redes-form-desc">
                Identifica las personas clave que forman tu red de apoyo. Piensa
                en a quién acudes para soporte emocional, académico o creativo.
              </p>

              {/* Connection Name */}
              <div className="redes-field">
                <label>Nombre de la conexión</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ej: María (Familia)"
                  onKeyDown={(e) => e.key === "Enter" && addPerson()}
                />
              </div>

              {/* Relationship Category */}
              <div className="redes-field">
                <label>Categoría de relación</label>
                <div className="redes-chips">
                  {relationCategories.map((cat) => (
                    <button
                      key={cat.label}
                      type="button"
                      className={`redes-chip ${relation === cat.label ? "redes-chip-active" : ""}`}
                      onClick={() => setRelation(cat.label)}
                    >
                      <span>{cat.icon}</span> {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Connection Strength */}
              <div className="redes-field">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <label style={{ marginBottom: 0 }}>Fuerza de conexión</label>
                  <span
                    className="redes-strength-label"
                    style={{ color: getColor(relation) }}
                  >
                    {closenessLabel}
                  </span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={5}
                  value={closeness}
                  onChange={(e) => setCloseness(Number(e.target.value))}
                  className="redes-slider"
                  style={{ accentColor: getColor(relation) }}
                />
                <div className="redes-slider-labels">
                  <span>CASUAL</span>
                  <span>CERCANA</span>
                </div>
              </div>

              {/* Add to Network button */}
              <button
                className="redes-add-btn"
                onClick={addPerson}
                disabled={!name.trim()}
              >
                + Agregar a la red
              </button>

              {/* Current Nodes */}
              {people.length > 0 && (
                <div className="redes-nodes-section">
                  <div className="redes-nodes-header">
                    NODOS ACTUALES ({people.length})
                  </div>
                  <div className="redes-nodes-list">
                    {people.map((p, i) => (
                      <div key={i} className="redes-node-item">
                        <div
                          className="redes-node-dot"
                          style={{ background: getColor(p.relation) }}
                        />
                        <div className="redes-node-info">
                          <span className="redes-node-name">{p.name}</span>
                          <span className="redes-node-rel">{p.relation}</span>
                        </div>
                        <span
                          className="redes-node-badge"
                          style={{
                            background: `${getColor(p.relation)}14`,
                            color: getColor(p.relation),
                            border: `1px solid ${getColor(p.relation)}30`,
                          }}
                        >
                          {p.closeness === 5
                            ? "Central"
                            : p.closeness >= 3
                              ? "Cercano"
                              : "Periférico"}
                        </span>
                        <button
                          className="redes-node-remove"
                          onClick={() => removePerson(i)}
                          title="Eliminar"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Disclaimer */}
              <div className="redes-disclaimer">
                <span>🔒</span>
                <p>
                  <strong>Aviso:</strong> Esta herramienta es educativa y no
                  constituye un diagnóstico clínico. Los datos se procesan
                  localmente y no se almacenan.
                </p>
              </div>
            </div>

            {/* ── RIGHT PANEL: Graph ── */}
            <div className="redes-panel-graph">
              {/* Network Legend */}
              {activeRelations.length > 0 && (
                <div className="redes-legend">
                  <div className="redes-legend-title">LEYENDA DE RED</div>
                  {activeRelations.map((rel) => (
                    <div key={rel} className="redes-legend-item">
                      <div
                        className="redes-legend-dot"
                        style={{ background: getColor(rel) }}
                      />
                      <span>{rel}</span>
                    </div>
                  ))}
                  <div className="redes-legend-item" style={{ marginTop: 4 }}>
                    <div
                      style={{
                        width: 16,
                        height: 2,
                        background: "#5a7d66",
                        borderRadius: 1,
                      }}
                    />
                    <span style={{ fontSize: 12 }}>Fuerza activa</span>
                  </div>
                </div>
              )}

              {/* Graph SVG */}
              <div className="redes-graph-container">
                {people.length === 0 ? (
                  <div className="redes-graph-empty">
                    <div style={{ fontSize: 48, marginBottom: 16 }}>🌐</div>
                    <p>
                      Agrega conexiones para
                      <br />
                      visualizar tu red de apoyo
                    </p>
                  </div>
                ) : (
                  <svg
                    viewBox="30 0 540 400"
                    style={{ width: "100%", height: "auto" }}
                  >
                    {/* Background grid circles */}
                    <circle cx="300" cy="200" r="180" fill="none" stroke="#d4cdaf" strokeWidth="0.7" strokeDasharray="5 4" opacity="0.5" />
                    <circle cx="300" cy="200" r="130" fill="none" stroke="#d4cdaf" strokeWidth="0.7" strokeDasharray="5 4" opacity="0.5" />
                    <circle cx="300" cy="200" r="75" fill="none" stroke="#d4cdaf" strokeWidth="0.7" strokeDasharray="5 4" opacity="0.5" />

                    {/* Connection lines */}
                    {people.map((p, i) => {
                      const pos = nodePositions[i];
                      return (
                        <line
                          key={`line-${i}`}
                          x1="300"
                          y1="200"
                          x2={pos.x}
                          y2={pos.y}
                          stroke={getColor(p.relation)}
                          strokeWidth={p.closeness >= 4 ? 2.5 : p.closeness >= 3 ? 1.8 : 1.2}
                          opacity={p.closeness >= 4 ? 0.45 : 0.25}
                          strokeDasharray={p.closeness <= 2 ? "5 4" : "none"}
                        />
                      );
                    })}

                    {/* Central node */}
                    <circle cx="300" cy="200" r="36" fill="none" stroke="#1D3E2A" strokeWidth="2" opacity="0.1" />
                    <circle cx="300" cy="200" r="28" fill="#1D3E2A" />
                    <text x="300" y="198" textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="10" fontWeight="800" fontFamily="system-ui" letterSpacing="0.5">
                      TÚ
                    </text>

                    {/* Person nodes */}
                    {people.map((p, i) => {
                      const pos = nodePositions[i];
                      const color = getColor(p.relation);
                      const displayName = p.name.length > 10 ? p.name.slice(0, 9) + "…" : p.name;
                      return (
                        <g key={`node-${i}`}>
                          {/* Glow ring */}
                          <circle cx={pos.x} cy={pos.y} r={pos.r + 4} fill={color} opacity={0.1} />
                          {/* Main circle */}
                          <circle cx={pos.x} cy={pos.y} r={pos.r} fill={color} />
                          {/* White SVG icon inside */}
                          <NodeIcon relation={p.relation} x={pos.x} y={pos.y} />
                          {/* Name label below */}
                          <text
                            x={pos.x}
                            y={pos.y + pos.r + 15}
                            textAnchor="middle"
                            fill="#1D3E2A"
                            fontSize="11"
                            fontWeight="700"
                            fontFamily="system-ui"
                          >
                            {displayName}
                          </text>
                        </g>
                      );
                    })}
                  </svg>
                )}
              </div>

              {/* Status bar */}
              <div className="redes-status-bar">
                <div className="redes-status-left">
                  <span className="redes-status-dot" />
                  CALCULANDO CENTRALIDAD
                </div>
                <div className="redes-status-right">
                  NODOS: {people.length + 1} &nbsp;&nbsp; ARISTAS: {edgesCount}
                </div>
              </div>

              {/* Bottom actions */}
              {people.length > 0 && (
                <div className="redes-graph-actions">
                  <button
                    className="btn btn-outline"
                    onClick={() => setPeople([])}
                    style={{ fontSize: 13, padding: "10px 20px" }}
                  >
                    🔄 Reiniciar
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
