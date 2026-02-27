"use client";

import { useState, useMemo, useCallback, useRef } from "react";

/* ── Types ── */
interface GeneralInfo {
  sex: string;
  age: string;
  institution: string;
  occupation: string;
  academicProgram: string;
}

interface SupportFunctions {
  A: boolean;
  B: boolean;
  C: boolean;
  D: boolean;
  E: boolean;
  F: boolean;
  G: boolean;
}

interface Person {
  name: string;
  age: string;
  sex: string;
  relationType: string;
  relationOther: string;
  residence: string;
  universityContext: boolean;
  supportFunctions: SupportFunctions;
}

const MAX_PEOPLE = 30;

const supportLabels: { key: keyof SupportFunctions; short: string; label: string; icon: string }[] = [
  { key: "A", short: "Intimidad", label: "Asuntos privados, íntimos o cuestiones muy personales", icon: "💬" },
  { key: "B", short: "Ayuda material", label: "Pedir dinero o algún otro tipo de ayuda material", icon: "💰" },
  { key: "C", short: "Consejo", label: "Consejo, orientación o ayuda para tomar decisiones", icon: "🧭" },
  { key: "D", short: "Comprensión", label: "Comparten tu forma de pensar y te sientes comprendido/a", icon: "🤝" },
  { key: "E", short: "Colaboración", label: "Ayuda en el trabajo o en el estudio para realizar tareas", icon: "📚" },
  { key: "F", short: "Ocio", label: "Tiempo libre: cine, salir, compañía, etc.", icon: "🎉" },
  { key: "G", short: "Género", label: "Apoyo en situaciones de vulnerabilidad de género", icon: "🛡️" },
];

const relationTypes = [
  { value: "Pareja", icon: "💛" },
  { value: "Pariente", icon: "🏠" },
  { value: "Amigo", icon: "👫" },
  { value: "Conocido", icon: "👤" },
  { value: "Otra", icon: "✦" },
];

const colorMap: Record<string, string> = {
  Pareja: "#DCA15D",
  Pariente: "#1D3E2A",
  Amigo: "#00555A",
  Conocido: "#C96A4A",
  Otra: "#9C8D70",
};

const defaultSupport: SupportFunctions = { A: false, B: false, C: false, D: false, E: false, F: false, G: false };

/* ── SVG Node Icon ── */
function NodeIcon({ relation, x, y }: { relation: string; x: number; y: number }) {
  const size = 14;
  const dx = x - size / 2;
  const dy = y - size / 2;
  switch (relation) {
    case "Pariente":
      return (
        <g transform={`translate(${dx},${dy})`}>
          <path d="M7 1L1 6h2v6h3V9h2v3h3V6h2L7 1z" fill="white" />
        </g>
      );
    case "Amigo":
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
    case "Conocido":
      return (
        <g transform={`translate(${dx},${dy})`}>
          <circle cx="7" cy="4" r="3" fill="white" />
          <path d="M2 13c0-3 2.2-5 5-5s5 2 5 5H2z" fill="white" />
        </g>
      );
    default:
      return <circle cx={x} cy={y} r="5" fill="white" />;
  }
}

/* ── Step indicator ── */
const steps = [
  { id: 1, label: "Info general", icon: "📋" },
  { id: 2, label: "Conexiones", icon: "👥" },
  { id: 3, label: "Funciones de apoyo", icon: "🤲" },
  { id: 4, label: "Matriz", icon: "🔗" },
];

export default function RedesPage() {
  const [step, setStep] = useState(1);
  const svgRef = useRef<SVGSVGElement>(null);

  /* General Info */
  const [generalInfo, setGeneralInfo] = useState<GeneralInfo>({
    sex: "",
    age: "",
    institution: "",
    occupation: "",
    academicProgram: "",
  });

  /* People */
  const [people, setPeople] = useState<Person[]>([]);

  /* Form fields for adding a person */
  const [formName, setFormName] = useState("");
  const [formAge, setFormAge] = useState("");
  const [formSex, setFormSex] = useState("");
  const [formRelationType, setFormRelationType] = useState("Amigo");
  const [formRelationOther, setFormRelationOther] = useState("");
  const [formResidence, setFormResidence] = useState("Barranquilla");
  const [formUniversityContext, setFormUniversityContext] = useState(false);
  const [formSupport, setFormSupport] = useState<SupportFunctions>({ ...defaultSupport });

  /* Adjacency matrix */
  const [adjacency, setAdjacency] = useState<boolean[][]>([]);

  /* Editing index */
  const [editingIdx, setEditingIdx] = useState<number | null>(null);

  const resetForm = useCallback(() => {
    setFormName("");
    setFormAge("");
    setFormSex("");
    setFormRelationType("Amigo");
    setFormRelationOther("");
    setFormResidence("Barranquilla");
    setFormUniversityContext(false);
    setFormSupport({ ...defaultSupport });
    setEditingIdx(null);
  }, []);

  const addOrUpdatePerson = () => {
    if (!formName.trim()) return;
    const person: Person = {
      name: formName.trim(),
      age: formAge,
      sex: formSex,
      relationType: formRelationType,
      relationOther: formRelationOther,
      residence: formResidence,
      universityContext: formUniversityContext,
      supportFunctions: editingIdx !== null ? { ...formSupport } : { ...defaultSupport },
    };

    if (editingIdx !== null) {
      const updated = [...people];
      updated[editingIdx] = person;
      setPeople(updated);
    } else {
      if (people.length >= MAX_PEOPLE) return;
      setPeople((prev) => {
        const newPeople = [...prev, person];
        // Expand adjacency matrix
        setAdjacency((prevAdj) => {
          const n = newPeople.length;
          const newAdj = prevAdj.map((row) => [...row, false]);
          newAdj.push(new Array(n).fill(false));
          return newAdj;
        });
        return newPeople;
      });
    }
    resetForm();
  };

  const removePerson = (idx: number) => {
    setPeople((prev) => prev.filter((_, i) => i !== idx));
    setAdjacency((prev) => {
      const newAdj = prev.filter((_, i) => i !== idx).map((row) => row.filter((_, j) => j !== idx));
      return newAdj;
    });
    if (editingIdx === idx) resetForm();
  };

  const startEdit = (idx: number) => {
    const p = people[idx];
    setFormName(p.name);
    setFormAge(p.age);
    setFormSex(p.sex);
    setFormRelationType(p.relationType);
    setFormRelationOther(p.relationOther);
    setFormResidence(p.residence);
    setFormUniversityContext(p.universityContext);
    setFormSupport({ ...p.supportFunctions });
    setEditingIdx(idx);
  };

  const toggleAdjacency = (i: number, j: number) => {
    setAdjacency((prev) => {
      const newAdj = prev.map((row) => [...row]);
      newAdj[i][j] = !newAdj[i][j];
      newAdj[j][i] = !newAdj[j][i];
      return newAdj;
    });
  };

  const toggleSupportForPerson = (personIdx: number, key: keyof SupportFunctions) => {
    setPeople((prev) => {
      const updated = [...prev];
      updated[personIdx] = {
        ...updated[personIdx],
        supportFunctions: {
          ...updated[personIdx].supportFunctions,
          [key]: !updated[personIdx].supportFunctions[key],
        },
      };
      return updated;
    });
  };

  const getColor = (rel: string) => colorMap[rel] || "#5a7d66";

  /* Compute number of inter-person edges from adjacency */
  const interEdges = useMemo(() => {
    let count = 0;
    for (let i = 0; i < adjacency.length; i++)
      for (let j = i + 1; j < adjacency[i].length; j++)
        if (adjacency[i][j]) count++;
    return count;
  }, [adjacency]);

  /* Support count per person for weighting */
  const supportCount = useCallback(
    (p: Person) => Object.values(p.supportFunctions).filter(Boolean).length,
    [],
  );

  /* Only people with at least 1 support function appear in the graph */
  const graphPeople = useMemo(
    () => people.filter((p) => supportCount(p) > 0),
    [people, supportCount],
  );

  /* Map from graphPeople index to original people index (for adjacency lookups) */
  const graphOriginalIndices = useMemo(
    () => people.reduce<number[]>((acc, p, i) => { if (supportCount(p) > 0) acc.push(i); return acc; }, []),
    [people, supportCount],
  );

  const graphNodePositions = useMemo(() => {
    return graphPeople.map((p, i) => {
      const angle = (2 * Math.PI * i) / graphPeople.length - Math.PI / 2;
      const sc = supportCount(p);
      const dist = 100 + (7 - Math.min(sc, 7)) * 18;
      const r = 18 + Math.min(sc, 7) * 2;
      return {
        x: 300 + Math.cos(angle) * dist,
        y: 200 + Math.sin(angle) * dist,
        r,
      };
    });
  }, [graphPeople, supportCount]);

  const activeRelations = useMemo(
    () => Array.from(new Set(graphPeople.map((p) => p.relationType))),
    [graphPeople],
  );

  const downloadGraph = useCallback(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const serializer = new XMLSerializer();
    const svgClone = svg.cloneNode(true) as SVGSVGElement;
    // Embed a white/beige background
    const bg = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    bg.setAttribute("width", "100%");
    bg.setAttribute("height", "100%");
    bg.setAttribute("fill", "#f5f0e1");
    svgClone.insertBefore(bg, svgClone.firstChild);
    const svgStr = serializer.serializeToString(svgClone);
    const blob = new Blob([svgStr], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.onload = () => {
      const scale = 2;
      const canvas = document.createElement("canvas");
      canvas.width = 540 * scale;
      canvas.height = 400 * scale;
      const ctx = canvas.getContext("2d")!;
      ctx.scale(scale, scale);
      ctx.drawImage(img, 0, 0, 540, 400);
      URL.revokeObjectURL(url);
      const link = document.createElement("a");
      link.download = "mi-red-personal.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    };
    img.src = url;
  }, []);

  const completedSteps = useMemo(() => {
    const s = new Set<number>();
    if (generalInfo.sex && generalInfo.age) s.add(1);
    if (people.length > 0) s.add(2);
    if (people.some((p) => Object.values(p.supportFunctions).some(Boolean))) s.add(3);
    if (adjacency.some((row) => row.some(Boolean))) s.add(4);
    return s;
  }, [generalInfo, people, adjacency]);

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
            Visualiza tu red de apoyo
          </h1>
          <p
            style={{
              fontSize: "1.05rem",
              lineHeight: 1.75,
              color: "#5a7d66",
              maxWidth: 660,
              margin: "0 0 28px",
            }}
          >
            Identifica y mapea las personas con las que cuentas para tratar tus
            asuntos personales. Completa cada paso para construir una
            representación visual de tu red de apoyo.
          </p>

          {/* Info cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: 14,
              maxWidth: 760,
            }}
          >
            {[
              {
                icon: "🎓",
                title: "Propósito educativo",
                desc: "Esta herramienta tiene fines pedagógicos y de sensibilización dentro del proyecto #ViveTuRed. Su objetivo es ayudarte a reflexionar sobre tus redes de apoyo.",
              },
              {
                icon: "🩺",
                title: "No es un diagnóstico",
                desc: "Los resultados no constituyen una evaluación clínica ni psicológica. Si necesitas apoyo profesional, consulta las rutas de atención disponibles.",
              },
              {
                icon: "🔒",
                title: "Datos anonimizados",
                desc: "Toda la información se procesa localmente en tu dispositivo. No se almacena, no se transmite y no se comparte con terceros.",
              },
            ].map((card) => (
              <div
                key={card.title}
                style={{
                  background: "white",
                  border: `1px`,
                  borderLeft: `4px`,
                  borderRadius: 12,
                  padding: "16px 18px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 20, lineHeight: 1 }}>{card.icon}</span>
                  <span
                    style={{
                      fontWeight: 700,
                      fontSize: 14,
                      fontFamily: "ui-sans-serif, system-ui, sans-serif",
                    }}
                  >
                    {card.title}
                  </span>
                </div>
                <p
                  style={{
                    fontSize: 13,
                    color: "#5a7d66",
                    margin: 0,
                    lineHeight: 1.65,
                  }}
                >
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Step indicator */}
      <section style={{ background: "var(--bg)" }}>
        <div className="container" style={{ paddingTop: 24, paddingBottom: 0 }}>
          <div className="redes-steps">
            {steps.map((s) => (
              <button
                key={s.id}
                className={`redes-step ${step === s.id ? "redes-step-active" : ""} ${completedSteps.has(s.id) ? "redes-step-done" : ""}`}
                onClick={() => setStep(s.id)}
              >
                <span className="redes-step-icon">{completedSteps.has(s.id) && step !== s.id ? "✓" : s.icon}</span>
                <span className="redes-step-label">{s.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main layout */}
      <section style={{ background: "var(--bg)" }}>
        <div className="container" style={{ paddingTop: 24, paddingBottom: 56 }}>
          <div className="redes-layout">
            {/* ── LEFT PANEL ── */}
            <div className="redes-panel-form">
              {/* Progress */}
              <div className="redes-progress-bar">
                <div className="redes-progress-track">
                  <div
                    className="redes-progress-fill"
                    style={{
                      width: `${(completedSteps.size / 4) * 100}%`,
                    }}
                  />
                </div>
                <span className="redes-progress-label">
                  Paso {step} de 4
                </span>
              </div>

              {/* ── STEP 1: General Info ── */}
              {step === 1 && (
                <div className="redes-step-content">
                  <h2 className="redes-form-title">Información general</h2>
                  <p className="redes-form-desc">
                    Datos demográficos básicos para contextualizar tu red de
                    apoyo.
                  </p>

                  <div className="redes-field">
                    <label>Sexo</label>
                    <div className="redes-chips">
                      {["Masculino", "Femenino", "Otro"].map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          className={`redes-chip ${generalInfo.sex === opt ? "redes-chip-active" : ""}`}
                          onClick={() => setGeneralInfo({ ...generalInfo, sex: opt })}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="redes-field">
                    <label>Edad</label>
                    <input
                      type="number"
                      min={10}
                      max={99}
                      value={generalInfo.age}
                      onChange={(e) => setGeneralInfo({ ...generalInfo, age: e.target.value })}
                      placeholder="Ej: 22"
                    />
                  </div>

                  <div className="redes-field">
                    <label>Institución de Educación Superior</label>
                    <input
                      type="text"
                      value={generalInfo.institution}
                      onChange={(e) => setGeneralInfo({ ...generalInfo, institution: e.target.value })}
                      placeholder="Nombre de la institución"
                    />
                  </div>

                  <div className="redes-field">
                    <label>Ocupación principal</label>
                    <input
                      type="text"
                      value={generalInfo.occupation}
                      onChange={(e) => setGeneralInfo({ ...generalInfo, occupation: e.target.value })}
                      placeholder="Ej: Estudiante, Docente, etc."
                    />
                  </div>

                  <div className="redes-field">
                    <label>Programa académico (si es estudiante)</label>
                    <input
                      type="text"
                      value={generalInfo.academicProgram}
                      onChange={(e) => setGeneralInfo({ ...generalInfo, academicProgram: e.target.value })}
                      placeholder="Ej: Psicología, Ingeniería, etc."
                    />
                  </div>

                  <button
                    className="btn btn-secondary"
                    style={{ width: "100%", justifyContent: "center", marginTop: 8 }}
                    onClick={() => setStep(2)}
                  >
                    Continuar →
                  </button>
                </div>
              )}

              {/* ── STEP 2: Add Connections ── */}
              {step === 2 && (
                <div className="redes-step-content">
                  <h2 className="redes-form-title">Relaciones personales</h2>
                  <p className="redes-form-desc">
                    Menciona las personas con las que cuentas para tratar tus
                    asuntos personales. Puedes agregar hasta {MAX_PEOPLE} personas
                    (conocidos, compañeros, familiares, etc.).
                  </p>

                  {/* Person name */}
                  <div className="redes-field">
                    <label>Nombre</label>
                    <input
                      type="text"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="Nombre o seudónimo"
                      onKeyDown={(e) => e.key === "Enter" && addOrUpdatePerson()}
                    />
                  </div>

                  {/* Person age & sex row */}
                  <div className="redes-field-row">
                    <div className="redes-field" style={{ flex: 1 }}>
                      <label>Edad</label>
                      <input
                        type="number"
                        min={1}
                        max={120}
                        value={formAge}
                        onChange={(e) => setFormAge(e.target.value)}
                        placeholder="Edad"
                      />
                    </div>
                    <div className="redes-field" style={{ flex: 1 }}>
                      <label>Sexo</label>
                      <select value={formSex} onChange={(e) => setFormSex(e.target.value)}>
                        <option value="">Seleccionar…</option>
                        <option value="Hombre">Hombre</option>
                        <option value="Mujer">Mujer</option>
                        <option value="Otro">Otro</option>
                      </select>
                    </div>
                  </div>

                  {/* Relation type */}
                  <div className="redes-field">
                    <label>Tipo de relación</label>
                    <div className="redes-chips">
                      {relationTypes.map((rt) => {
                        const isActive = formRelationType === rt.value;
                        const color = getColor(rt.value);
                        return (
                          <button
                            key={rt.value}
                            type="button"
                            className={`redes-chip ${isActive ? "redes-chip-active" : ""}`}
                            style={isActive ? { background: color, borderColor: color, color: "#fff" } : undefined}
                            onClick={() => setFormRelationType(rt.value)}
                          >
                            <span>{rt.icon}</span> {rt.value}
                          </button>
                        );
                      })}
                    </div>
                    {formRelationType === "Otra" && (
                      <input
                        type="text"
                        value={formRelationOther}
                        onChange={(e) => setFormRelationOther(e.target.value)}
                        placeholder="Especificar relación"
                        style={{ marginTop: 8 }}
                      />
                    )}
                  </div>

                  {/* Residence */}
                  <div className="redes-field">
                    <label>Lugar de residencia</label>
                    <div className="redes-chips">
                      {["Barranquilla", "Otra ciudad", "Otro país"].map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          className={`redes-chip ${formResidence === opt ? "redes-chip-active" : ""}`}
                          onClick={() => setFormResidence(opt)}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* University context */}
                  <div className="redes-field">
                    <label>¿El contacto ocurre en contexto universitario?</label>
                    <div className="redes-chips">
                      <button
                        type="button"
                        className={`redes-chip ${formUniversityContext ? "redes-chip-active" : ""}`}
                        onClick={() => setFormUniversityContext(true)}
                      >
                        Sí
                      </button>
                      <button
                        type="button"
                        className={`redes-chip ${!formUniversityContext ? "redes-chip-active" : ""}`}
                        onClick={() => setFormUniversityContext(false)}
                      >
                        No
                      </button>
                    </div>
                  </div>

                  {/* Add / Update button */}
                  <button
                    className={editingIdx !== null ? "redes-add-btn" : "btn btn-primary"}
                    style={editingIdx === null ? { width: "100%", justifyContent: "center", fontSize: 15, padding: "14px 24px" } : undefined}
                    onClick={addOrUpdatePerson}
                    disabled={!formName.trim()}
                  >
                    {editingIdx !== null ? "✏️ Actualizar persona" : `+ Agregar persona (${people.length}/${MAX_PEOPLE})`}
                  </button>
                  {editingIdx !== null && (
                    <button
                      className="redes-add-btn"
                      style={{ borderColor: "#C96A4A", color: "#C96A4A", marginTop: 4 }}
                      onClick={resetForm}
                    >
                      ✕ Cancelar edición
                    </button>
                  )}

                  {/* Current nodes list */}
                  {people.length > 0 && (
                    <div className="redes-nodes-section">
                      <div className="redes-nodes-header">
                        PERSONAS REGISTRADAS ({people.length})
                      </div>
                      <div className="redes-nodes-list">
                        {people.map((p, i) => (
                          <div key={i} className="redes-node-item">
                            <div
                              className="redes-node-dot"
                              style={{ background: getColor(p.relationType) }}
                            />
                            <div className="redes-node-info">
                              <span className="redes-node-name">{p.name}</span>
                              <span className="redes-node-rel">
                                {p.relationType === "Otra" ? p.relationOther || "Otra" : p.relationType}
                                {p.age ? ` · ${p.age} años` : ""}
                                {p.sex ? ` · ${p.sex}` : ""}
                              </span>
                            </div>
                            <span
                              className="redes-node-badge"
                              style={{
                                background: `${getColor(p.relationType)}14`,
                                color: getColor(p.relationType),
                                border: `1px solid ${getColor(p.relationType)}30`,
                              }}
                            >
                              {supportCount(p)} apoyo{supportCount(p) !== 1 ? "s" : ""}
                            </span>
                            <button
                              className="redes-node-remove"
                              onClick={() => startEdit(i)}
                              title="Editar"
                              style={{ color: "#00555A" }}
                            >
                              ✎
                            </button>
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

                  <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                    <button className="btn btn-outline" style={{ flex: 1, justifyContent: "center", fontSize: 13 }} onClick={() => setStep(1)}>← Anterior</button>
                    <button className="btn btn-secondary" style={{ flex: 1, justifyContent: "center", fontSize: 13 }} onClick={() => setStep(3)}>Continuar →</button>
                  </div>
                </div>
              )}

              {/* ── STEP 3: Support Functions Matrix ── */}
              {step === 3 && (
                <div className="redes-step-content">
                  <h2 className="redes-form-title">Funciones de apoyo</h2>
                  <p className="redes-form-desc">
                    Revisa y ajusta los tipos de apoyo que cada persona de tu red
                    te brinda. Marca las casillas correspondientes.
                  </p>

                  {people.length === 0 ? (
                    <div className="redes-graph-empty" style={{ padding: "40px 0" }}>
                      <div style={{ fontSize: 40, marginBottom: 12 }}>👥</div>
                      <p style={{ margin: 0, fontSize: 14 }}>
                        Primero agrega personas en el paso 2
                      </p>
                      <button className="btn btn-secondary" style={{ marginTop: 16, fontSize: 13 }} onClick={() => setStep(2)}>Ir al paso 2</button>
                    </div>
                  ) : (
                    <>
                      {/* Support legend */}
                      <div className="redes-support-legend">
                        {supportLabels.map((sl) => (
                          <div key={sl.key} className="redes-support-legend-item" title={sl.label}>
                            <strong>{sl.key}</strong>
                            <span>{sl.short}</span>
                          </div>
                        ))}
                      </div>

                      <div className="redes-support-matrix">
                        <table className="redes-matrix-table">
                          <thead>
                            <tr>
                              <th>Persona</th>
                              {supportLabels.map((sl) => (
                                <th key={sl.key} title={sl.label}>{sl.key}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {people.map((p, i) => (
                              <tr key={i}>
                                <td className="redes-matrix-name">
                                  <span className="redes-node-dot" style={{ background: getColor(p.relationType), display: "inline-block", width: 8, height: 8, borderRadius: "50%", marginRight: 6, flexShrink: 0 }} />
                                  {p.name}
                                </td>
                                {supportLabels.map((sl) => (
                                  <td key={sl.key}>
                                    <button
                                      className={`redes-matrix-cell ${p.supportFunctions[sl.key] ? "redes-matrix-cell-on" : ""}`}
                                      onClick={() => toggleSupportForPerson(i, sl.key)}
                                      title={sl.label}
                                    >
                                      {p.supportFunctions[sl.key] ? "✓" : ""}
                                    </button>
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* Descriptions */}
                      <details style={{ marginTop: 16 }}>
                        <summary>Ver descripción de cada función</summary>
                        <div>
                          <ul style={{ paddingLeft: 20, margin: 0 }}>
                            {supportLabels.map((sl) => (
                              <li key={sl.key} style={{ marginBottom: 8, fontSize: 13, lineHeight: 1.6 }}>
                                <strong>{sl.key}. {sl.short}:</strong> {sl.label}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </details>
                    </>
                  )}

                  <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
                    <button className="btn btn-outline" style={{ flex: 1, justifyContent: "center", fontSize: 13 }} onClick={() => setStep(2)}>← Anterior</button>
                    <button className="btn btn-secondary" style={{ flex: 1, justifyContent: "center", fontSize: 13 }} onClick={() => setStep(4)} disabled={people.length === 0}>Continuar →</button>
                  </div>
                </div>
              )}

              {/* ── STEP 4: Adjacency Matrix ── */}
              {step === 4 && (
                <div className="redes-step-content">
                  <h2 className="redes-form-title">¿Se conocen entre sí?</h2>
                  <p className="redes-form-desc">
                    Indica si las personas de tu red se conocen entre sí. Haz
                    clic en las celdas para marcar una relación.
                  </p>

                  {people.length < 2 ? (
                    <div className="redes-graph-empty" style={{ padding: "40px 0" }}>
                      <div style={{ fontSize: 40, marginBottom: 12 }}>🔗</div>
                      <p style={{ margin: 0, fontSize: 14 }}>
                        Necesitas al menos 2 personas para la matriz
                      </p>
                      <button className="btn btn-secondary" style={{ marginTop: 16, fontSize: 13 }} onClick={() => setStep(2)}>Ir al paso 2</button>
                    </div>
                  ) : (
                    <div className="redes-adjacency-wrapper">
                      <table className="redes-adj-table">
                        <thead>
                          <tr>
                            <th></th>
                            {people.map((p, j) => (
                              <th key={j} title={p.name}>
                                {p.name.length > 4 ? p.name.slice(0, 3) + "…" : p.name}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {people.map((p, i) => (
                            <tr key={i}>
                              <td className="redes-adj-name" title={p.name}>
                                {p.name.length > 6 ? p.name.slice(0, 5) + "…" : p.name}
                              </td>
                              {people.map((_, j) => (
                                <td key={j}>
                                  {i === j ? (
                                    <span className="redes-adj-diag">—</span>
                                  ) : i < j ? (
                                    <button
                                      className={`redes-adj-cell ${adjacency[i]?.[j] ? "redes-adj-cell-on" : ""}`}
                                      onClick={() => toggleAdjacency(i, j)}
                                    >
                                      {adjacency[i]?.[j] ? "1" : "0"}
                                    </button>
                                  ) : (
                                    <span className={`redes-adj-mirror ${adjacency[j]?.[i] ? "redes-adj-mirror-on" : ""}`}>
                                      {adjacency[j]?.[i] ? "1" : "0"}
                                    </span>
                                  )}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
                    <button className="btn btn-outline" style={{ flex: 1, justifyContent: "center", fontSize: 13 }} onClick={() => setStep(3)}>← Anterior</button>
                  </div>
                </div>
              )}

              {/* Disclaimer */}
              <div className="redes-disclaimer" style={{ marginTop: 20 }}>
                <span>🔒</span>
                <p>
                  Los datos se procesan localmente y no se almacenan ni se comparten.
                </p>
              </div>
            </div>

            {/* ── RIGHT PANEL: Graph ── */}
            <div className="redes-panel-graph">
              {/* Network Legend — rendered below graph via CSS order */}
              {activeRelations.length > 0 && (
                <div className="redes-legend">
                  <div className="redes-legend-title" style={{ width: "100%" }}>LEYENDA DE RED</div>

                  {/* ── Section: Relation type ── */}
                  <div className="redes-legend-section">
                    <div className="redes-legend-section-title">TIPO DE RELACIÓN</div>
                    {activeRelations.map((rel) => (
                      <div key={rel} className="redes-legend-item">
                        <div className="redes-legend-dot" style={{ background: getColor(rel) }} />
                        <span>{rel}</span>
                      </div>
                    ))}
                  </div>

                  {/* ── Section: Line thickness ── */}
                  <div className="redes-legend-section">
                    <div className="redes-legend-section-title">INTENSIDAD DE APOYO</div>
                    <div className="redes-legend-item">
                      <svg width="24" height="10" style={{ flexShrink: 0, display: "block" }}>
                        <line x1="0" y1="5" x2="24" y2="5" stroke="#1D3E2A" strokeWidth="5" opacity="0.5" />
                      </svg>
                      <span>Fuerte (5+)</span>
                    </div>
                    <div className="redes-legend-item">
                      <svg width="24" height="10" style={{ flexShrink: 0, display: "block" }}>
                        <line x1="0" y1="5" x2="24" y2="5" stroke="#1D3E2A" strokeWidth="3" opacity="0.35" />
                      </svg>
                      <span>Moderado (3-4)</span>
                    </div>
                    <div className="redes-legend-item">
                      <svg width="24" height="10" style={{ flexShrink: 0, display: "block" }}>
                        <line x1="0" y1="5" x2="24" y2="5" stroke="#1D3E2A" strokeWidth="1.2" opacity="0.25" />
                      </svg>
                      <span>Débil (1-2)</span>
                    </div>
                  </div>

                  {/* ── Section: Inter-person ── */}
                  <div className="redes-legend-section">
                    <div className="redes-legend-section-title">ENTRE PERSONAS</div>
                    <div className="redes-legend-item">
                      <svg width="24" height="10" style={{ flexShrink: 0, display: "block" }}>
                        <line x1="0" y1="5" x2="24" y2="5" stroke="#5a7d66" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.5" />
                      </svg>
                      <span>Se conocen entre sí</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Graph SVG */}
              <div className="redes-graph-container">
                {graphPeople.length === 0 ? (
                  <div className="redes-graph-empty">
                    <div style={{ fontSize: 48, marginBottom: 16 }}>🌐</div>
                    <p>
                      {people.length === 0
                        ? <>Agrega conexiones en el paso 2<br />para visualizar tu red de apoyo</>
                        : <>Asigna funciones de apoyo en el paso 3<br />para visualizar los nodos</>}
                    </p>
                  </div>
                ) : (
                  <svg ref={svgRef} viewBox="30 0 540 400" style={{ width: "100%", height: "auto" }}>
                    {/* Background grid circles */}
                    <circle cx="300" cy="200" r="180" fill="none" stroke="#d4cdaf" strokeWidth="0.7" strokeDasharray="5 4" opacity="0.5" />
                    <circle cx="300" cy="200" r="130" fill="none" stroke="#d4cdaf" strokeWidth="0.7" strokeDasharray="5 4" opacity="0.5" />
                    <circle cx="300" cy="200" r="75" fill="none" stroke="#d4cdaf" strokeWidth="0.7" strokeDasharray="5 4" opacity="0.5" />

                    {/* Inter-person edges (adjacency) */}
                    {graphPeople.map((_, i) =>
                      graphPeople.map((_, j) => {
                        if (i >= j) return null;
                        const oi = graphOriginalIndices[i];
                        const oj = graphOriginalIndices[j];
                        if (!adjacency[oi]?.[oj]) return null;
                        const a = graphNodePositions[i];
                        const b = graphNodePositions[j];
                        return (
                          <line
                            key={`adj-${i}-${j}`}
                            x1={a.x}
                            y1={a.y}
                            x2={b.x}
                            y2={b.y}
                            stroke="#5a7d66"
                            strokeWidth={1}
                            opacity={0.25}
                            strokeDasharray="3 3"
                          />
                        );
                      }),
                    )}

                    {/* Connection lines to center */}
                    {graphPeople.map((p, i) => {
                      const pos = graphNodePositions[i];
                      const sc = supportCount(p);
                      return (
                        <line
                          key={`line-${i}`}
                          x1="300"
                          y1="200"
                          x2={pos.x}
                          y2={pos.y}
                          stroke={getColor(p.relationType)}
                          strokeWidth={sc >= 5 ? 4.5 : sc >= 3 ? 3 : 1.2}
                          opacity={sc >= 5 ? 0.5 : sc >= 3 ? 0.35 : 0.25}
                          strokeDasharray={sc <= 1 ? "5 4" : "none"}
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
                    {graphPeople.map((p, i) => {
                      const pos = graphNodePositions[i];
                      const color = getColor(p.relationType);
                      const displayName = p.name.length > 10 ? p.name.slice(0, 9) + "…" : p.name;
                      return (
                        <g key={`node-${i}`}>
                          <circle cx={pos.x} cy={pos.y} r={pos.r + 4} fill={color} opacity={0.1} />
                          <circle cx={pos.x} cy={pos.y} r={pos.r} fill={color} />
                          <NodeIcon relation={p.relationType} x={pos.x} y={pos.y} />
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
                  NODOS: {graphPeople.length + 1} &nbsp;&nbsp; ARISTAS: {graphPeople.length + interEdges}
                </div>
              </div>

              {/* Bottom actions */}
              {people.length > 0 && (
                <div className="redes-graph-actions">
                  <button
                    className="btn btn-outline"
                    onClick={downloadGraph}
                    style={{ fontSize: 13, padding: "10px 20px" }}
                    disabled={graphPeople.length === 0}
                  >
                    📥 Descargar imagen
                  </button>
                  <button
                    className="btn btn-outline"
                    onClick={() => {
                      setPeople([]);
                      setAdjacency([]);
                      setGeneralInfo({ sex: "", age: "", institution: "", occupation: "", academicProgram: "" });
                      setStep(1);
                    }}
                    style={{ fontSize: 13, padding: "10px 20px" }}
                  >
                    🔄 Reiniciar todo
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
