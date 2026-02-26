const categories = [
  { id: "prevencion", label: "Prevención", icon: "🛡️", color: "#C96A4A" },
  { id: "orientacion", label: "Orientación", icon: "🧭", color: "#00555A" },
  { id: "formacion", label: "Formación", icon: "📚", color: "#1D3E2A" },
];

const resources = [
  // ── Prevención ──
  {
    category: "prevencion",
    title: "Cartilla de sensibilización #ViveTuRed",
    type: "PDF",
    size: "2.4 MB",
    icon: "📄",
    color: "#C96A4A",
    forWho: "Estudiantes universitarios y comunidad en general",
    forWhat: "Reflexionar sobre redes de apoyo y reconocer situaciones de VBG en el entorno cotidiano.",
  },
  {
    category: "prevencion",
    title: "Infografía: Señales de alerta",
    type: "PNG",
    size: "0.8 MB",
    icon: "🖼️",
    color: "#C96A4A",
    forWho: "Toda la comunidad universitaria",
    forWhat: "Identificar indicadores de violencia en el entorno académico de forma rápida y visual.",
  },
  {
    category: "prevencion",
    title: "Infografía: ¿Qué es la VBG?",
    type: "PNG",
    size: "0.6 MB",
    icon: "🖼️",
    color: "#C96A4A",
    forWho: "Personas que quieren informarse sobre violencia basada en género",
    forWhat: "Comprender las definiciones, tipos y manifestaciones de la VBG de manera accesible.",
  },
  // ── Orientación ──
  {
    category: "orientacion",
    title: "Guía de rutas de atención institucional",
    type: "PDF",
    size: "1.8 MB",
    icon: "📋",
    color: "#00555A",
    forWho: "Víctimas, familiares y personas que acompañan a alguien en situación de violencia",
    forWhat: "Conocer los procedimientos, contactos y pasos para acceder a atención institucional especializada.",
  },
  {
    category: "orientacion",
    title: "Infografía: Rutas de atención",
    type: "PNG",
    size: "0.7 MB",
    icon: "🖼️",
    color: "#00555A",
    forWho: "Personas en situación de vulnerabilidad o quienes las acompañan",
    forWhat: "Obtener un resumen visual de las principales instituciones y pasos de la ruta de atención.",
  },
  {
    category: "orientacion",
    title: "Infografía: Redes de apoyo",
    type: "PNG",
    size: "0.5 MB",
    icon: "🖼️",
    color: "#00555A",
    forWho: "Estudiantes y personas en proceso de recuperación",
    forWhat: "Identificar y fortalecer las redes personales e institucionales disponibles.",
  },
  // ── Formación ──
  {
    category: "formacion",
    title: "Manual para facilitadores/as",
    type: "PDF",
    size: "2.0 MB",
    icon: "📕",
    color: "#1D3E2A",
    forWho: "Docentes, orientadores/as y líderes estudiantiles",
    forWhat: "Replicar talleres de sensibilización sobre VBG en entornos universitarios con herramientas metodológicas.",
  },
  {
    category: "formacion",
    title: "Guía metodológica del proyecto",
    type: "PDF",
    size: "3.1 MB",
    icon: "📘",
    color: "#1D3E2A",
    forWho: "Investigadores/as, docentes y equipos de bienestar universitario",
    forWhat: "Comprender la metodología de investigación–creación de #ViveTuRed y replicarla en otros contextos.",
  },
  {
    category: "formacion",
    title: "Marco teórico y conceptual",
    type: "PDF",
    size: "1.5 MB",
    icon: "📚",
    color: "#1D3E2A",
    forWho: "Estudiantes de posgrado, investigadores/as y equipos académicos",
    forWhat: "Profundizar en los referentes teóricos sobre VBG, redes sociales y prevención universitaria.",
  },
  {
    category: "formacion",
    title: "Instrumentos de recolección",
    type: "PDF",
    size: "1.2 MB",
    icon: "📝",
    color: "#DCA15D",
    forWho: "Investigadores/as y equipos de campo",
    forWhat: "Aplicar cuestionarios, guías de entrevista y fichas de observación usados en el proyecto.",
  },
];

export default function RecursosPage() {
  return (
    <div>
      {/* ── Hero ── */}
      <section style={{ background: "linear-gradient(180deg, #f5f0e1 0%, var(--bg) 100%)", padding: "48px 0 56px" }}>
        <div className="container">
          <span className="hero-badge">Materiales educativos</span>
          <h1 style={{ fontSize: "clamp(2rem, 4vw, 2.6rem)", fontWeight: 800, color: "#1D3E2A", margin: "16px 0 12px", fontFamily: "Georgia, serif", lineHeight: 1.15 }}>
            Recursos y materiales de apoyo
          </h1>
          <p style={{ fontSize: "1rem", lineHeight: 1.75, color: "#5a7d66", maxWidth: 600, margin: "0 0 32px" }}>
            Herramientas para la prevención, orientación y formación en Violencia Basada en Género (VBG).
            Todos los materiales son de acceso libre y descarga gratuita.
          </p>

          {/* Accesos rápidos por categoría */}
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {categories.map((cat) => (
              <a key={cat.id} href={`#${cat.id}`} className="step-nav-btn">
                <span style={{ fontSize: 18, lineHeight: 1 }}>{cat.icon}</span>
                <span style={{ fontWeight: 600, fontSize: 14, color: cat.color, fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
                  {cat.label}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Prevención ── */}
      <section id="prevencion" style={{ background: "#f5f0e1" }}>
        <div className="container" style={{ paddingTop: 52, paddingBottom: 52 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(201,106,74,0.12)", color: "#a8553a", borderRadius: 20, padding: "5px 14px", fontSize: 13, fontWeight: 700, fontFamily: "ui-sans-serif, system-ui, sans-serif", marginBottom: 16 }}>
            🛡️ Prevención
          </div>
          <div className="accent-bar" />
          <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#1D3E2A", marginBottom: 8, fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
            Herramientas para la prevención
          </h2>
          <p style={{ color: "#5a7d66", marginBottom: 28, lineHeight: 1.7, maxWidth: 640 }}>
            Materiales para reconocer la VBG, identificar señales de alerta y fortalecer la cultura de prevención.
          </p>
          <div style={{ display: "grid", gap: 16 }}>
            {resources.filter((r) => r.category === "prevencion").map((doc) => (
              <ResourceCard key={doc.title} doc={doc} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Orientación ── */}
      <section id="orientacion" style={{ background: "var(--bg)" }}>
        <div className="container" style={{ paddingTop: 52, paddingBottom: 52 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(0,85,90,0.10)", color: "#00555A", borderRadius: 20, padding: "5px 14px", fontSize: 13, fontWeight: 700, fontFamily: "ui-sans-serif, system-ui, sans-serif", marginBottom: 16 }}>
            🧭 Orientación
          </div>
          <div className="accent-bar" />
          <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#1D3E2A", marginBottom: 8, fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
            Materiales de apoyo y orientación
          </h2>
          <p style={{ color: "#5a7d66", marginBottom: 28, lineHeight: 1.7, maxWidth: 640 }}>
            Guías e infografías para saber a dónde acudir y cómo navegar las rutas de atención disponibles.
          </p>
          <div style={{ display: "grid", gap: 16 }}>
            {resources.filter((r) => r.category === "orientacion").map((doc) => (
              <ResourceCard key={doc.title} doc={doc} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Formación ── */}
      <section id="formacion" style={{ background: "#f5f0e1" }}>
        <div className="container" style={{ paddingTop: 52, paddingBottom: 56 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(29,62,42,0.10)", color: "#1D3E2A", borderRadius: 20, padding: "5px 14px", fontSize: 13, fontWeight: 700, fontFamily: "ui-sans-serif, system-ui, sans-serif", marginBottom: 16 }}>
            📚 Formación
          </div>
          <div className="accent-bar" />
          <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#1D3E2A", marginBottom: 8, fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
            Recursos para la formación
          </h2>
          <p style={{ color: "#5a7d66", marginBottom: 28, lineHeight: 1.7, maxWidth: 640 }}>
            Manuales, guías metodológicas e instrumentos para docentes, facilitadores/as e investigadores/as.
          </p>
          <div style={{ display: "grid", gap: 16 }}>
            {resources.filter((r) => r.category === "formacion").map((doc) => (
              <ResourceCard key={doc.title} doc={doc} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function ResourceCard({ doc }: { doc: (typeof resources)[number] }) {
  return (
    <div className="card" style={{ display: "flex", gap: 20, alignItems: "flex-start", flexWrap: "wrap" }}>
      <div
        style={{
          width: 52,
          height: 52,
          borderRadius: 14,
          background: `${doc.color}12`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 24,
          flexShrink: 0,
        }}
      >
        {doc.icon}
      </div>

      <div style={{ flex: 1, minWidth: 220 }}>
        <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap", marginBottom: 10 }}>
          <h3 style={{ fontWeight: 700, fontSize: 15, color: "#1D3E2A", margin: 0, fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
            {doc.title}
          </h3>
          <span className="badge" style={{ background: `${doc.color}14`, color: doc.color, fontSize: 11 }}>{doc.type}</span>
          <span className="badge badge-forest" style={{ fontSize: 11 }}>{doc.size}</span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "max-content 1fr", gap: "5px 12px", fontSize: 13.5, lineHeight: 1.6 }}>
          <span style={{ fontWeight: 700, color: "#1D3E2A", fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>¿Para quién?</span>
          <span style={{ color: "#5a7d66" }}>{doc.forWho}</span>
          <span style={{ fontWeight: 700, color: "#1D3E2A", fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>¿Para qué sirve?</span>
          <span style={{ color: "#5a7d66" }}>{doc.forWhat}</span>
        </div>
      </div>

      <button
        className="btn btn-outline"
        style={{ fontSize: 13, padding: "8px 16px", flexShrink: 0, alignSelf: "center" }}
      >
        ⬇ Descargar
      </button>
    </div>
  );
}
