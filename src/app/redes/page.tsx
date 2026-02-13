"use client";

import { useState } from "react";

interface Person {
  name: string;
  relation: string;
  closeness: number;
}

const relationOptions = [
  "Familia",
  "Amistad",
  "Pareja",
  "Compañero/a de estudio",
  "Docente / Mentor",
  "Profesional de salud",
  "Institución",
  "Comunidad",
];

export default function RedesPage() {
  const [step, setStep] = useState<"intro" | "form" | "result">("intro");
  const [people, setPeople] = useState<Person[]>([]);
  const [name, setName] = useState("");
  const [relation, setRelation] = useState(relationOptions[0]);
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

  const getColor = (rel: string) => {
    const colors: Record<string, string> = {
      Familia: "#C96A4A",
      Amistad: "#00555A",
      Pareja: "#DCA15D",
      "Compañero/a de estudio": "#1D3E2A",
      "Docente / Mentor": "#2a5a3d",
      "Profesional de salud": "#007a80",
      Institución: "#a8553a",
      Comunidad: "#c08a42",
    };
    return colors[rel] || "#5a7d66";
  };

  return (
    <div>
      {/* Hero */}
      <section style={{ background: "linear-gradient(180deg, #f5f0e1 0%, var(--bg) 100%)", padding: "48px 0 56px" }}>
        <div className="container">
          <span className="hero-badge">Herramienta educativa</span>
          <h1 style={{ fontSize: "clamp(2rem, 4vw, 2.6rem)", fontWeight: 800, color: "#1D3E2A", margin: "16px 0 12px", fontFamily: "Georgia, serif", lineHeight: 1.15 }}>
            Visualizador de redes
          </h1>
          <p style={{ fontSize: "1.05rem", lineHeight: 1.75, color: "#5a7d66", maxWidth: 600, margin: 0 }}>
            Explora y visualiza tus redes personales de apoyo de forma gráfica.
            Tus datos son completamente anonimizados y no se almacenan.
          </p>
        </div>
      </section>

      {step === "intro" && (
        <section style={{ background: "var(--bg)" }}>
        <div className="container" style={{ paddingTop: 48, paddingBottom: 48 }}>
          {/* Disclaimer */}
          <div className="notice notice-info" style={{ marginBottom: 32, maxWidth: 760 }}>
            <span style={{ fontSize: 20 }}>ℹ️</span>
            <div>
              <strong style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>Propósito educativo</strong>
              <p style={{ margin: "4px 0 0" }}>
                Esta herramienta tiene un propósito exclusivamente <strong>educativo y reflexivo</strong>. 
                No constituye un diagnóstico ni una evaluación clínica. Los datos ingresados 
                no se almacenan ni se comparten con terceros.
              </p>
            </div>
          </div>

          <div style={{ maxWidth: 760 }}>
            <div className="accent-bar" />
            <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#1D3E2A", marginBottom: 12, fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
              ¿Cómo funciona?
            </h2>
            <div style={{ display: "grid", gap: 16, marginBottom: 32 }}>
              {[
                { num: "1", title: "Identifica", desc: "Piensa en las personas e instituciones que forman parte de tu red de apoyo." },
                { num: "2", title: "Registra", desc: "Agrega cada persona o institución indicando el tipo de relación y nivel de cercanía." },
                { num: "3", title: "Visualiza", desc: "Genera una representación gráfica con nodos y relaciones para reflexionar sobre tu red." },
              ].map((s) => (
                <div
                  key={s.num}
                  style={{
                    display: "flex",
                    gap: 16,
                    alignItems: "flex-start",
                    padding: "16px 20px",
                    background: "white",
                    borderRadius: 12,
                    border: "1px solid var(--border)",
                  }}
                >
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 10,
                      background: "linear-gradient(135deg, #00555A, #1D3E2A)",
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 800,
                      fontSize: 16,
                      fontFamily: "ui-sans-serif, system-ui, sans-serif",
                      flexShrink: 0,
                    }}
                  >
                    {s.num}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: "#1D3E2A", fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
                      {s.title}
                    </div>
                    <div style={{ fontSize: 14, color: "#5a7d66", marginTop: 2 }}>{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <button className="btn btn-teal" onClick={() => setStep("form")}>
              Comenzar →
            </button>
          </div>
        </div>
        </section>
      )}

      {step === "form" && (
        <section style={{ background: "#f5f0e1" }}>
        <div className="container" style={{ paddingTop: 48, paddingBottom: 48 }}>
          <div style={{ maxWidth: 760 }}>
            <div className="accent-bar" />
            <h2 style={{ fontSize: "1.3rem", fontWeight: 800, color: "#1D3E2A", marginBottom: 24, fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
              Agrega personas a tu red
            </h2>

            {/* Formulario */}
            <div
              style={{
                background: "white",
                borderRadius: 16,
                padding: 24,
                border: "1px solid var(--border)",
                marginBottom: 24,
              }}
            >
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16 }}>
                <div>
                  <label>Nombre o alias</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ej: María, Tutor, etc."
                    onKeyDown={(e) => e.key === "Enter" && addPerson()}
                  />
                </div>
                <div>
                  <label>Tipo de relación</label>
                  <select value={relation} onChange={(e) => setRelation(e.target.value)}>
                    {relationOptions.map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label>Cercanía (1–5)</label>
                  <input
                    type="range"
                    min={1}
                    max={5}
                    value={closeness}
                    onChange={(e) => setCloseness(Number(e.target.value))}
                    style={{ padding: 0, border: "none", boxShadow: "none", accentColor: "#00555A" }}
                  />
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#5a7d66", fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
                    <span>Lejano</span>
                    <span style={{ fontWeight: 700, color: "#00555A" }}>{closeness}</span>
                    <span>Cercano</span>
                  </div>
                </div>
              </div>
              <button
                className="btn btn-secondary"
                onClick={addPerson}
                style={{ marginTop: 16, fontSize: 14 }}
              >
                + Agregar persona
              </button>
            </div>

            {/* Lista de personas */}
            {people.length > 0 && (
              <div style={{ marginBottom: 24 }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: "#1D3E2A", marginBottom: 12, fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
                  Tu red ({people.length} {people.length === 1 ? "persona" : "personas"})
                </h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {people.map((p, i) => (
                    <div
                      key={i}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 8,
                        padding: "8px 14px",
                        borderRadius: 10,
                        background: `${getColor(p.relation)}12`,
                        border: `1px solid ${getColor(p.relation)}30`,
                        fontSize: 14,
                        fontFamily: "ui-sans-serif, system-ui, sans-serif",
                      }}
                    >
                      <span style={{ color: getColor(p.relation), fontWeight: 700 }}>{p.name}</span>
                      <span style={{ fontSize: 12, color: "#5a7d66" }}>{p.relation}</span>
                      <button
                        onClick={() => removePerson(i)}
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          color: "#5a7d66",
                          fontSize: 14,
                          padding: 0,
                          marginLeft: 4,
                        }}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div style={{ display: "flex", gap: 12 }}>
              <button
                className="btn btn-outline"
                onClick={() => setStep("intro")}
                style={{ fontSize: 14 }}
              >
                ← Volver
              </button>
              {people.length >= 2 && (
                <button
                  className="btn btn-teal"
                  onClick={() => setStep("result")}
                  style={{ fontSize: 14 }}
                >
                  Visualizar mi red →
                </button>
              )}
            </div>

            {people.length < 2 && (
              <p style={{ fontSize: 13, color: "#5a7d66", marginTop: 12 }}>
                Agrega al menos 2 personas para generar la visualización.
              </p>
            )}
          </div>
        </div>
        </section>
      )}

      {step === "result" && (
        <section style={{ background: "var(--bg)" }}>
        <div className="container" style={{ paddingTop: 48, paddingBottom: 56 }}>
          <div style={{ maxWidth: 860 }}>
            <div className="accent-bar" />
            <h2 style={{ fontSize: "1.3rem", fontWeight: 800, color: "#1D3E2A", marginBottom: 24, fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
              Tu red de apoyo
            </h2>

            {/* Visualización gráfica con SVG */}
            <div
              style={{
                background: "white",
                borderRadius: 20,
                border: "1px solid var(--border)",
                padding: 24,
                marginBottom: 24,
                overflow: "hidden",
              }}
            >
              <svg
                viewBox="0 0 600 400"
                style={{ width: "100%", height: "auto", maxHeight: 420 }}
              >
                {/* Círculos concéntricos */}
                <circle cx="300" cy="200" r="180" fill="none" stroke="#E2DCC2" strokeWidth="1" strokeDasharray="4 4" />
                <circle cx="300" cy="200" r="120" fill="none" stroke="#E2DCC2" strokeWidth="1" strokeDasharray="4 4" />
                <circle cx="300" cy="200" r="60" fill="none" stroke="#E2DCC2" strokeWidth="1" strokeDasharray="4 4" />

                {/* Líneas de conexión */}
                {people.map((p, i) => {
                  const angle = (2 * Math.PI * i) / people.length - Math.PI / 2;
                  const dist = 60 + (5 - p.closeness) * 30;
                  const x = 300 + Math.cos(angle) * dist;
                  const y = 200 + Math.sin(angle) * dist;
                  return (
                    <line
                      key={`line-${i}`}
                      x1="300"
                      y1="200"
                      x2={x}
                      y2={y}
                      stroke={getColor(p.relation)}
                      strokeWidth={p.closeness * 0.6 + 0.5}
                      opacity={0.35}
                    />
                  );
                })}

                {/* Nodo central */}
                <circle cx="300" cy="200" r="24" fill="#1D3E2A" />
                <text x="300" y="204" textAnchor="middle" fill="white" fontSize="11" fontWeight="700" fontFamily="system-ui">
                  Tú
                </text>

                {/* Nodos de personas */}
                {people.map((p, i) => {
                  const angle = (2 * Math.PI * i) / people.length - Math.PI / 2;
                  const dist = 60 + (5 - p.closeness) * 30;
                  const x = 300 + Math.cos(angle) * dist;
                  const y = 200 + Math.sin(angle) * dist;
                  const r = 14 + p.closeness * 2;
                  return (
                    <g key={`node-${i}`}>
                      <circle
                        cx={x}
                        cy={y}
                        r={r}
                        fill={getColor(p.relation)}
                        opacity={0.85}
                      />
                      <text
                        x={x}
                        y={y + 1}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fill="white"
                        fontSize="9"
                        fontWeight="700"
                        fontFamily="system-ui"
                      >
                        {p.name.length > 6 ? p.name.slice(0, 5) + "…" : p.name}
                      </text>
                      <text
                        x={x}
                        y={y + r + 14}
                        textAnchor="middle"
                        fill="#5a7d66"
                        fontSize="9"
                        fontFamily="system-ui"
                      >
                        {p.relation}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Leyenda */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 12,
                marginBottom: 24,
              }}
            >
              {Array.from(new Set(people.map((p) => p.relation))).map((rel) => (
                <div
                  key={rel}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    fontSize: 13,
                    fontFamily: "ui-sans-serif, system-ui, sans-serif",
                  }}
                >
                  <div
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: 3,
                      background: getColor(rel),
                    }}
                  />
                  {rel}
                </div>
              ))}
            </div>

            {/* Resumen */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                gap: 16,
                marginBottom: 32,
              }}
            >
              <div style={{ padding: 16, background: "rgba(29,62,42,0.04)", borderRadius: 12, textAlign: "center" }}>
                <div style={{ fontSize: 24, fontWeight: 800, color: "#1D3E2A", fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
                  {people.length}
                </div>
                <div style={{ fontSize: 13, color: "#5a7d66" }}>Personas en tu red</div>
              </div>
              <div style={{ padding: 16, background: "rgba(201,106,74,0.06)", borderRadius: 12, textAlign: "center" }}>
                <div style={{ fontSize: 24, fontWeight: 800, color: "#C96A4A", fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
                  {new Set(people.map((p) => p.relation)).size}
                </div>
                <div style={{ fontSize: 13, color: "#5a7d66" }}>Tipos de relación</div>
              </div>
              <div style={{ padding: 16, background: "rgba(0,85,90,0.06)", borderRadius: 12, textAlign: "center" }}>
                <div style={{ fontSize: 24, fontWeight: 800, color: "#00555A", fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
                  {(people.reduce((a, b) => a + b.closeness, 0) / people.length).toFixed(1)}
                </div>
                <div style={{ fontSize: 13, color: "#5a7d66" }}>Cercanía promedio</div>
              </div>
            </div>

            <div className="notice notice-info" style={{ marginBottom: 24 }}>
              <span style={{ fontSize: 20 }}>ℹ️</span>
              <div>
                <strong style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>Recuerda</strong>
                <p style={{ margin: "4px 0 0" }}>
                  Esta visualización es una herramienta educativa para la reflexión personal.
                  No constituye un diagnóstico ni evaluación clínica. Tus datos no se almacenan
                  ni se comparten.
                </p>
              </div>
            </div>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button
                className="btn btn-outline"
                onClick={() => setStep("form")}
                style={{ fontSize: 14 }}
              >
                ← Editar red
              </button>
              <button
                className="btn btn-teal"
                onClick={() => {
                  setPeople([]);
                  setStep("intro");
                }}
                style={{ fontSize: 14 }}
              >
                Reiniciar
              </button>
            </div>
          </div>
        </div>
        </section>
      )}
    </div>
  );
}
