const documents = [
  {
    title: "Cartilla de sensibilización #ViveTuRed",
    type: "PDF",
    size: "2.4 MB",
    desc: "Material educativo con ejercicios de reflexión sobre redes de apoyo y prevención de VBG.",
    icon: "📄",
    color: "#C96A4A",
  },
  {
    title: "Guía de rutas de atención institucional",
    type: "PDF",
    size: "1.8 MB",
    desc: "Directorio ampliado de instituciones de atención con procedimientos y contactos detallados.",
    icon: "📋",
    color: "#00555A",
  },
  {
    title: "Guía metodológica del proyecto",
    type: "PDF",
    size: "3.1 MB",
    desc: "Documento técnico que describe la metodología de investigación–creación empleada en #ViveTuRed.",
    icon: "📘",
    color: "#1D3E2A",
  },
  {
    title: "Manual para facilitadores/as",
    type: "PDF",
    size: "2.0 MB",
    desc: "Herramientas y actividades para replicar talleres de sensibilización en entornos universitarios.",
    icon: "📕",
    color: "#DCA15D",
  },
];

const infographics = [
  {
    title: "¿Qué es la VBG?",
    desc: "Definiciones, tipos y manifestaciones de la violencia basada en género.",
    color: "#C96A4A",
  },
  {
    title: "Redes de apoyo",
    desc: "Cómo identificar y fortalecer tus redes personales e institucionales.",
    color: "#00555A",
  },
  {
    title: "Rutas de atención",
    desc: "Infografía resumen de las principales rutas institucionales.",
    color: "#DCA15D",
  },
  {
    title: "Señales de alerta",
    desc: "Indicadores para reconocer situaciones de violencia en el entorno universitario.",
    color: "#1D3E2A",
  },
];

export default function RecursosPage() {
  return (
    <div>
      {/* Header */}
      <section className="container">
        <div className="page-header">
          <span className="badge" style={{ background: "rgba(220,161,93,0.2)", color: "#DCA15D", marginBottom: 12 }}>
            Materiales educativos
          </span>
          <h1>Recursos</h1>
          <p>
            Repositorio de materiales educativos y metodológicos derivados del proyecto
            #ViveTuRed. Descarga cartillas, guías e infografías.
          </p>
        </div>
      </section>

      {/* Documentos descargables */}
      <section className="container" style={{ paddingTop: 16 }}>
        <div className="accent-bar" />
        <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#1D3E2A", marginBottom: 8, fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
          Documentos descargables
        </h2>
        <p style={{ color: "#5a7d66", marginBottom: 24, lineHeight: 1.7 }}>
          Material en formato PDF disponible para descarga gratuita.
        </p>

        <div style={{ display: "grid", gap: 16 }}>
          {documents.map((doc) => (
            <div
              key={doc.title}
              className="card"
              style={{
                display: "flex",
                gap: 20,
                alignItems: "center",
                flexWrap: "wrap",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 14,
                  background: `${doc.color}12`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 26,
                  flexShrink: 0,
                }}
              >
                {doc.icon}
              </div>
              <div style={{ flex: 1, minWidth: 200 }}>
                <h3 style={{ fontWeight: 700, fontSize: 16, color: "#1D3E2A", margin: 0, fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
                  {doc.title}
                </h3>
                <p style={{ fontSize: 14, lineHeight: 1.6, color: "#5a7d66", margin: "6px 0" }}>
                  {doc.desc}
                </p>
                <div style={{ display: "flex", gap: 8 }}>
                  <span className="badge" style={{ background: `${doc.color}14`, color: doc.color }}>{doc.type}</span>
                  <span className="badge badge-forest">{doc.size}</span>
                </div>
              </div>
              <button
                className="btn btn-outline"
                style={{ fontSize: 13, padding: "8px 16px", flexShrink: 0 }}
              >
                ⬇ Descargar
              </button>
            </div>
          ))}
        </div>
      </section>

      <hr className="divider" style={{ maxWidth: 1120, margin: "32px auto" }} />

      {/* Infografías y material visual */}
      <section className="container" style={{ paddingTop: 0 }}>
        <div className="accent-bar" />
        <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#1D3E2A", marginBottom: 8, fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
          Infografías y material visual
        </h2>
        <p style={{ color: "#5a7d66", marginBottom: 24, lineHeight: 1.7 }}>
          Material gráfico para sensibilización y educación.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
          {infographics.map((info) => (
            <div
              key={info.title}
              className="card"
              style={{ textAlign: "center", cursor: "pointer" }}
            >
              <div
                style={{
                  width: "100%",
                  height: 160,
                  borderRadius: 12,
                  background: `linear-gradient(135deg, ${info.color}18, ${info.color}08)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 40,
                  marginBottom: 16,
                }}
              >
                🖼️
              </div>
              <h3 style={{ fontWeight: 700, fontSize: 15, color: info.color, margin: 0, fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
                {info.title}
              </h3>
              <p style={{ fontSize: 13, lineHeight: 1.6, color: "#5a7d66", margin: "8px 0 0" }}>
                {info.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <hr className="divider" style={{ maxWidth: 1120, margin: "32px auto" }} />

      {/* Recursos metodológicos */}
      <section className="container" style={{ paddingTop: 0, paddingBottom: 24 }}>
        <div className="accent-bar" />
        <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#1D3E2A", marginBottom: 8, fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
          Recursos metodológicos
        </h2>
        <p style={{ color: "#5a7d66", marginBottom: 24, lineHeight: 1.7 }}>
          Materiales derivados del proceso de investigación–creación del proyecto.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
          {[
            { title: "Protocolo de investigación–creación", desc: "Descripción metodológica paso a paso del proceso creativo y de investigación.", icon: "🔬" },
            { title: "Instrumentos de recolección", desc: "Cuestionarios, guías de entrevista y fichas de observación utilizadas en el proyecto.", icon: "📝" },
            { title: "Marco teórico y conceptual", desc: "Referentes teóricos sobre VBG, redes sociales y prevención en entornos universitarios.", icon: "📚" },
          ].map((r) => (
            <div key={r.title} className="card">
              <span style={{ fontSize: 28, marginBottom: 12, display: "block" }}>{r.icon}</span>
              <h3 style={{ fontWeight: 700, fontSize: 15, color: "#1D3E2A", margin: "0 0 8px", fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
                {r.title}
              </h3>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: "#5a7d66", margin: 0 }}>
                {r.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
