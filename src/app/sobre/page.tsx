import Link from "next/link";

const specificObjectives = [
  {
    num: "01",
    title: "Identificar percepciones y experiencias de VBG",
    desc: "Reconocer cómo se vive, se percibe y se nombra la Violencia Basada en Género (VBG) en contextos de Educación Superior.",
    color: "#C96A4A",
  },
  {
    num: "02",
    title: "Analizar redes personales",
    desc: "Examinar las características de las redes personales para identificar factores de riesgo y de protección asociados a la VBG.",
    color: "#00555A",
  },
];

const allies = [
  {
    institution: "Universidad del Atlántico",
    role: "Aliado clave",
    roleClass: "badge-teal",
    summary:
      "Aliada en la coordinación del plan de trabajo y en la articulación institucional para ampliar el alcance del proyecto en Educación Superior.",
    note:
      "Los talleres serán diseñados, coordinados y desarrollados por el equipo investigador de la Universidad del Norte.",
  },
  {
    institution: "Red Colombiana de Mujeres Científicas (RCMC)",
    role: "Participante invitada",
    roleClass: "badge-gold",
    summary:
      "Participará en espacios de socialización y reflexión colectiva sobre resultados, fortaleciendo el diálogo interdisciplinario y la apropiación social del conocimiento.",
    note:
      "Su participación no contempla responsabilidades de ejecución, coordinación ni producción de entregables del proyecto.",
  },
];

const teamRoles = [
  { name: "Eliana Sanandres Campis", role: "Historia y Ciencias Sociales", initials: "ES" },
  { name: "Ivonne Molinares Guerrero", role: "Educacion y proyectos sociales", initials: "IM" },
  { name: "Andrea Monroy Litch", role: "Departamento de Quimica y Biologia", initials: "AM" },
  { name: "Viridiana Molinares Hassan", role: "Departamento de Derecho", initials: "VM" },
  { name: "Marisabella de Castro Abello", role: "Departamento de Diseno", initials: "MC" },
  { name: "Martha Rodriguez Pena", role: "Diseno grafico y comunicacion visual", initials: "MR" },
  { name: "Daladier Jabba Molinares", role: "Ingenieria de Sistemas", initials: "DJ" },
];

export default function SobrePage() {
  return (
    <div>
      {/* Hero */}
      <section style={{ background: "linear-gradient(180deg, #f5f0e1 0%, var(--bg) 100%)", padding: "48px 0 56px" }}>
        <div className="container">
          <div className="sobre-hero-shell">
            <h1 className="sobre-hero-title">Conoce el proyecto</h1>
            <p className="sobre-hero-desc">
              #ViveTuRed es una propuesta de investigación-creación que busca fortalecer redes de apoyo
              y prevenir la Violencia Basada en Género (VBG) en la Educación Superior en Barranquilla,
              mediante una serie narrativa multimedia y herramientas de apropiación social del conocimiento.
            </p>
          </div>
        </div>
      </section>

      {/* Naturaleza y objetivo general */}
      <section style={{ background: "#f5f0e1" }}>
        <div className="container" style={{ paddingTop: 56, paddingBottom: 48 }}>
          <div className="accent-bar" />
          <h2 style={{ fontSize: "1.45rem", fontWeight: 800, color: "#1D3E2A", marginBottom: 12, fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
            Naturaleza del proyecto
          </h2>
          <div style={{ maxWidth: 860, lineHeight: 1.85, color: "#5a7d66", marginBottom: 24 }}>
            <p>
              El proyecto articula investigación formativa, narrativa y diseño de herramientas
              pedagógicas para comprender las experiencias de VBG y activar rutas de cuidado en
              contextos universitarios.
            </p>
            <p>
              Su enfoque combina producción de contenidos, espacios de socialización y
              trabajo colaborativo con instituciones aliadas para fortalecer capacidades
              de prevención, orientación y protección.
            </p>
          </div>

          <div className="notice notice-info" style={{ maxWidth: 860 }}>
            <span style={{ fontSize: 20 }}>🎯</span>
            <div>
              <strong style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>Objetivo general</strong>
              <p style={{ margin: "4px 0 0" }}>
                Desarrollar una serie narrativa multimedia para fomentar las redes de apoyo
                y la prevención de la Violencia Basada en Género (VBG) en la Educación
                Superior en Barranquilla.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Objetivos específicos */}
      <section style={{ background: "var(--bg)" }}>
        <div className="container" style={{ paddingTop: 56, paddingBottom: 48 }}>
          <div className="accent-bar" />
          <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#1D3E2A", marginBottom: 22, fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
            Objetivos específicos
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
            {specificObjectives.map((obj) => (
              <div key={obj.num} className="card" style={{ borderTop: `3px solid ${obj.color}` }}>
                <span style={{ fontSize: 32, fontWeight: 800, color: obj.color, opacity: 0.3, fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
                  {obj.num}
                </span>
                <h3 style={{ fontWeight: 700, fontSize: 17, color: obj.color, margin: "8px 0", fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
                  {obj.title}
                </h3>
                <p style={{ fontSize: 14, lineHeight: 1.75, color: "#5a7d66", margin: 0 }}>
                  {obj.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Aliados y participantes */}
      <section style={{ background: "#f5f0e1" }}>
        <div className="container" style={{ paddingTop: 56, paddingBottom: 48 }}>
          <div className="accent-bar" />
          <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#1D3E2A", marginBottom: 10, fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
            Aliados y participantes
          </h2>
          <p style={{ color: "#5a7d66", lineHeight: 1.75, marginBottom: 24, maxWidth: 860 }}>
            La propuesta se desarrolla con aliados estratégicos que fortalecen la
            coordinación, la difusión y la reflexión colectiva alrededor de la prevención
            de la VBG en Educación Superior.
          </p>

          <div className="allies-grid">
            {allies.map((ally) => (
              <article key={ally.institution} className="ally-card">
                <header className="ally-card-head">
                  <span className={`badge ${ally.roleClass}`}>{ally.role}</span>
                  <h3 className="ally-card-title">{ally.institution}</h3>
                </header>

                <section className="ally-card-section">
                  <h4>Rol en el proyecto</h4>
                  <p>{ally.summary}</p>
                  <div className="ally-card-divider" aria-hidden="true" />
                  <h4>Alcance de participacion</h4>
                  <p>{ally.note}</p>
                </section>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Equipo investigador */}
      <section style={{ background: "var(--bg)" }}>
        <div className="container" style={{ paddingTop: 56, paddingBottom: 56 }}>
          <div className="accent-bar" />
          <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#1D3E2A", marginBottom: 12, fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
            Equipo investigador
          </h2>
          <p style={{ color: "#5a7d66", lineHeight: 1.75, marginBottom: 16, maxWidth: 860 }}>
            Esta seccion resume el equipo real del proyecto: {teamRoles.length} integrantes
            con trayectorias complementarias en ciencias sociales, educacion, derecho,
            diseño, ciencias basicas e ingenieria.
          </p>

          <div className="about-team-grid">
            {teamRoles.map((member, index) => (
              <article className="about-team-role-card" key={member.initials}>
                <div
                  className="about-team-role-badge"
                  style={{
                    background:
                      index % 2 === 0
                        ? "linear-gradient(135deg, #C96A4A 0%, #DCA15D 100%)"
                        : "linear-gradient(135deg, #00555A 0%, #0b7b81 100%)",
                  }}
                >
                  {member.initials}
                </div>
                <div className="about-team-role-body">
                  <h3 className="about-team-role-name">{member.name}</h3>
                  <p className="about-team-role-desc">{member.role}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="about-team-cta">
            <Link className="btn btn-primary" href="/equipo">
              Conoce más sobre el equipo →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

