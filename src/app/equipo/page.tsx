import Link from "next/link";

const teamMembers = [
  {
    name: "Investigador/a principal",
    role: "Dirección y coordinación del proyecto",
    initials: "IP",
    gradient: "linear-gradient(135deg, #C96A4A, #DCA15D)",
    bio: "Lidera la visión estratégica del proyecto #ViveTuRed, articulando los procesos de investigación formativa con las estrategias de creación. Su experiencia en investigación social y estudios de género orienta las decisiones metodológicas del equipo.",
    areas: ["Investigación social", "Estudios de género", "Gestión de proyectos"],
    color: "#C96A4A",
  },
  {
    name: "Co-investigador/a",
    role: "Diseño metodológico y análisis",
    initials: "CI",
    gradient: "linear-gradient(135deg, #00555A, #007a80)",
    bio: "Responsable del diseño metodológico del proyecto, incluyendo la construcción de instrumentos de recolección de datos y el análisis de resultados. Contribuye al rigor académico de la investigación.",
    areas: ["Metodología de investigación", "Análisis cualitativo", "Diseño de instrumentos"],
    color: "#00555A",
  },
  {
    name: "Asistente de investigación",
    role: "Recolección de datos y desarrollo web",
    initials: "AI",
    gradient: "linear-gradient(135deg, #DCA15D, #e4b87e)",
    bio: "Encargado/a de la recolección y sistematización de datos, así como del desarrollo de las herramientas digitales del proyecto, incluyendo el visualizador de redes y la plataforma web.",
    areas: ["Desarrollo web", "Recolección de datos", "Herramientas digitales"],
    color: "#DCA15D",
  },
  {
    name: "Diseñador/a creativo/a",
    role: "Creación visual y editorial",
    initials: "DC",
    gradient: "linear-gradient(135deg, #1D3E2A, #3a6b5a)",
    bio: "Lidera la dimensión estética y creativa del proyecto, desde la identidad visual hasta la ilustración del cuento de ficción. Transforma los hallazgos de investigación en piezas comunicativas accesibles.",
    areas: ["Diseño gráfico", "Ilustración", "Comunicación visual"],
    color: "#1D3E2A",
  },
];

const values = [
  {
    icon: "🤝",
    title: "Colaboración",
    desc: "Trabajamos de manera interdisciplinaria, integrando saberes de distintas áreas para generar un impacto más amplio.",
  },
  {
    icon: "🔬",
    title: "Rigor académico",
    desc: "Fundamentamos nuestro trabajo en metodologías rigurosas y datos confiables para construir conocimiento sólido.",
  },
  {
    icon: "💡",
    title: "Creatividad",
    desc: "Utilizamos la creación artística y narrativa como puente entre la investigación y la acción social transformadora.",
  },
  {
    icon: "🛡️",
    title: "Compromiso social",
    desc: "Nos motiva la prevención de la VBG y la construcción de entornos universitarios más seguros para todos.",
  },
];

export default function EquipoPage() {
  return (
    <div>
      {/* Hero */}
      <section style={{ background: "linear-gradient(180deg, #f5f0e1 0%, var(--bg) 100%)", padding: "48px 0 56px" }}>
        <div className="container">
          <span className="hero-badge">Quiénes somos</span>
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
            Equipo Investigador
          </h1>
          <p
            style={{
              fontSize: "1.05rem",
              lineHeight: 1.75,
              color: "#5a7d66",
              maxWidth: 620,
              margin: 0,
            }}
          >
            Conoce a las personas detrás de #ViveTuRed. Un equipo interdisciplinario
            comprometido con la investigación–creación y la prevención de la Violencia
            Basada en Género en entornos universitarios.
          </p>
        </div>
      </section>

      {/* Miembros del equipo */}
      <section style={{ background: "var(--bg)" }}>
        <div className="container" style={{ paddingTop: 56, paddingBottom: 48 }}>
          <div className="accent-bar" />
          <h2
            style={{
              fontSize: "1.4rem",
              fontWeight: 800,
              color: "#1D3E2A",
              marginBottom: 8,
              fontFamily: "ui-sans-serif, system-ui, sans-serif",
            }}
          >
            Nuestro equipo
          </h2>
          <p style={{ color: "#5a7d66", lineHeight: 1.7, marginBottom: 32, maxWidth: 600 }}>
            Cada integrante aporta una perspectiva única que enriquece el proyecto
            y amplifica su alcance dentro de la comunidad universitaria.
          </p>

          <div className="team-grid">
            {teamMembers.map((member) => (
              <div key={member.initials} className="team-card">
                <div className="team-card-header" style={{ background: member.gradient }}>
                  <div className="team-card-avatar">
                    {member.initials}
                  </div>
                  <div className="team-card-header-info">
                    <h3 className="team-card-name">{member.name}</h3>
                    <span className="team-card-role">{member.role}</span>
                  </div>
                </div>
                <div className="team-card-body">
                  <p style={{ fontSize: 14, lineHeight: 1.8, color: "#5a7d66", margin: "0 0 16px" }}>
                    {member.bio}
                  </p>
                  <div className="team-card-areas">
                    {member.areas.map((area) => (
                      <span
                        key={area}
                        className="team-card-tag"
                        style={{
                          background: `${member.color}14`,
                          color: member.color,
                          borderColor: `${member.color}30`,
                        }}
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Valores del equipo */}
      <section style={{ background: "#f5f0e1" }}>
        <div className="container" style={{ paddingTop: 56, paddingBottom: 48 }}>
          <div className="accent-bar" />
          <h2
            style={{
              fontSize: "1.4rem",
              fontWeight: 800,
              color: "#1D3E2A",
              marginBottom: 8,
              fontFamily: "ui-sans-serif, system-ui, sans-serif",
            }}
          >
            Nuestros valores
          </h2>
          <p style={{ color: "#5a7d66", lineHeight: 1.7, marginBottom: 32, maxWidth: 600 }}>
            Principios que guían nuestro trabajo y fortalecen nuestro compromiso con la comunidad.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
            {values.map((val) => (
              <div key={val.title} className="card">
                <span style={{ fontSize: 32, display: "block", marginBottom: 12 }}>{val.icon}</span>
                <h3
                  style={{
                    fontWeight: 700,
                    fontSize: 16,
                    color: "#1D3E2A",
                    margin: "0 0 8px",
                    fontFamily: "ui-sans-serif, system-ui, sans-serif",
                  }}
                >
                  {val.title}
                </h3>
                <p style={{ fontSize: 14, lineHeight: 1.7, color: "#5a7d66", margin: 0 }}>
                  {val.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enfoque metodológico */}
      <section style={{ background: "var(--bg)" }}>
        <div className="container" style={{ paddingTop: 56, paddingBottom: 48 }}>
          <div className="accent-bar" />
          <h2
            style={{
              fontSize: "1.4rem",
              fontWeight: 800,
              color: "#1D3E2A",
              marginBottom: 24,
              fontFamily: "ui-sans-serif, system-ui, sans-serif",
            }}
          >
            Enfoque de trabajo
          </h2>

          <div className="team-approach-grid">
            <div className="team-approach-card">
              <div className="team-approach-number" style={{ color: "#C96A4A" }}>01</div>
              <h3 className="team-approach-title">Investigación formativa</h3>
              <p className="team-approach-desc">
                Partimos de procesos de investigación que involucran a la comunidad universitaria
                como participantes activos, generando conocimiento situado y pertinente.
              </p>
            </div>
            <div className="team-approach-card">
              <div className="team-approach-number" style={{ color: "#00555A" }}>02</div>
              <h3 className="team-approach-title">Creación artística</h3>
              <p className="team-approach-desc">
                Transformamos los hallazgos de investigación en narrativas, recursos visuales
                y herramientas creativas que facilitan la sensibilización y la acción.
              </p>
            </div>
            <div className="team-approach-card">
              <div className="team-approach-number" style={{ color: "#DCA15D" }}>03</div>
              <h3 className="team-approach-title">Acción comunitaria</h3>
              <p className="team-approach-desc">
                Devolvemos los resultados a la comunidad a través de talleres, materiales
                educativos y herramientas digitales de acceso libre y gratuito.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "#f5f0e1" }}>
        <div className="container" style={{ paddingTop: 56, paddingBottom: 56 }}>
          <div className="cta-block">
            <h2 className="cta-title">¿Quieres colaborar con nosotros?</h2>
            <p className="cta-desc">
              Si te interesa participar, colaborar o conocer más sobre nuestro trabajo
              de investigación–creación, no dudes en contactarnos.
            </p>
            <div className="cta-actions">
              <Link className="btn btn-primary" href="/contacto">
                Contáctanos
              </Link>
              <Link
                className="btn"
                href="/sobre"
                style={{
                  background: "rgba(255,255,255,0.15)",
                  color: "white",
                  border: "1px solid rgba(255,255,255,0.3)",
                }}
              >
                Sobre el Proyecto
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
