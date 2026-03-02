const categories = [
  { id: "prevencion", label: "Prevención", color: "#C96A4A", hint: "Señales y prevención" },
  { id: "orientacion", label: "Orientación", color: "#00555A", hint: "Rutas y acompañamiento" },
  { id: "formacion", label: "Formación", color: "#1D3E2A", hint: "Guías y metodología" },
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
  const prevencionDocs = resources.filter((r) => r.category === "prevencion");

  return (
    <div>
      {/* ── Hero ── */}
      <section style={{ background: "linear-gradient(180deg, #f5f0e1 0%, var(--bg) 100%)", padding: "48px 0 56px" }}>
        <div className="container">
          <div className="recursos-hero-shell">
            <h1 className="recursos-hero-title">
              Recursos y materiales de apoyo
            </h1>
            <p className="recursos-hero-desc">
              Herramientas para la prevención, orientación y formación en Violencia Basada en Género (VBG).
              Todos los materiales son de acceso libre y descarga gratuita.
            </p>

            {/* Accesos rápidos por categoría */}
            <div className="recursos-quick-nav" aria-label="Accesos rápidos por categoría">
              {categories.map((cat) => (
                <a
                  key={cat.id}
                  href={`#${cat.id}`}
                  className="recursos-quick-link"
                >
                  <span className="recursos-quick-copy">
                    <strong>{cat.label}</strong>
                    <small>{cat.hint}</small>
                  </span>
                  <span className="recursos-quick-arrow" aria-hidden="true">&gt;</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Prevención ── */}
      <section id="prevencion" style={{ background: "#f5f0e1" }}>
        <div className="container" style={{ paddingTop: 52, paddingBottom: 52 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(201,106,74,0.12)", color: "#a8553a", borderRadius: 20, padding: "5px 14px", fontSize: 13, fontWeight: 700, fontFamily: "ui-sans-serif, system-ui, sans-serif", marginBottom: 16 }}>
             Prevención
          </div>
          <div className="accent-bar" />
          <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#1D3E2A", marginBottom: 8, fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
            Herramientas para la prevención
          </h2>
          <p style={{ color: "#5a7d66", marginBottom: 28, lineHeight: 1.7, maxWidth: 640 }}>
            Materiales para reconocer la VBG, identificar señales de alerta y fortalecer la cultura de prevención.
          </p>

          <div className="recursos-list">
            {prevencionDocs.map((doc) => (
              <ResourceCard key={doc.title} doc={doc} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Orientación ── */}
      <section id="orientacion" style={{ background: "var(--bg)" }}>
        <div className="container" style={{ paddingTop: 52, paddingBottom: 52 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(0,85,90,0.10)", color: "#00555A", borderRadius: 20, padding: "5px 14px", fontSize: 13, fontWeight: 700, fontFamily: "ui-sans-serif, system-ui, sans-serif", marginBottom: 16 }}>
             Orientación
          </div>
          <div className="accent-bar" />
          <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#1D3E2A", marginBottom: 8, fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
            Materiales de apoyo y orientación
          </h2>
          <p style={{ color: "#5a7d66", marginBottom: 28, lineHeight: 1.7, maxWidth: 640 }}>
            Guías e infografías para saber a dónde acudir y cómo navegar las rutas de atención disponibles.
          </p>
          <div className="recursos-list">
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
             Formación
          </div>
          <div className="accent-bar" />
          <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#1D3E2A", marginBottom: 8, fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
            Recursos para la formación
          </h2>
          <p style={{ color: "#5a7d66", marginBottom: 28, lineHeight: 1.7, maxWidth: 640 }}>
            Manuales, guías metodológicas e instrumentos para docentes, facilitadores/as e investigadores/as.
          </p>
          <div className="recursos-list">
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
    <article className="card recursos-card">
      <div className="recursos-card-main">
        <div className="recursos-card-head">
          <h3 className="recursos-card-title">
            {doc.title}
          </h3>
          <div className="recursos-card-chips">
            <span className="badge" style={{ background: `${doc.color}14`, color: doc.color, fontSize: 11 }}>{doc.type}</span>
            <span className="badge badge-forest" style={{ fontSize: 11 }}>{doc.size}</span>
          </div>
        </div>

        <dl className="recursos-card-meta">
          <dt>¿Para quién?</dt>
          <dd>{doc.forWho}</dd>
          <dt>¿Para qué sirve?</dt>
          <dd>{doc.forWhat}</dd>
        </dl>
      </div>

      <button
        className="btn btn-outline recursos-card-btn"
      >
        ⬇ Descargar
      </button>
    </article>
  );
}
