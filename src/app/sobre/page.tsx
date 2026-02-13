export default function SobrePage() {
  return (
    <div>
      {/* Hero */}
      <section style={{ background: "linear-gradient(180deg, #f5f0e1 0%, var(--bg) 100%)", padding: "48px 0 56px" }}>
        <div className="container">
          <span className="hero-badge">Investigación–creación</span>
          <h1 style={{ fontSize: "clamp(2rem, 4vw, 2.6rem)", fontWeight: 800, color: "#1D3E2A", margin: "16px 0 12px", fontFamily: "Georgia, serif", lineHeight: 1.15 }}>
            Sobre el proyecto
          </h1>
          <p style={{ fontSize: "1.05rem", lineHeight: 1.75, color: "#5a7d66", maxWidth: 600, margin: 0 }}>
            Conoce la naturaleza, los objetivos y el equipo detrás de #ViveTuRed, un proyecto
            de investigación–creación orientado a la prevención de la VBG en entornos universitarios.
          </p>
        </div>
      </section>

      {/* Naturaleza del proyecto */}
      <section style={{ background: "var(--bg)" }}>
        <div className="container" style={{ paddingTop: 56, paddingBottom: 48 }}>
          <div className="accent-bar" />
          <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#1D3E2A", marginBottom: 12, fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
            Naturaleza del proyecto
          </h2>
          <div style={{ maxWidth: 760, lineHeight: 1.9, color: "#5a7d66" }}>
            <p>
              #ViveTuRed es un proyecto de <strong style={{ color: "#1D3E2A" }}>investigación–creación</strong> que
              articula procesos de investigación formativa con estrategias de creación artística y comunicativa 
              para abordar la <strong style={{ color: "#1D3E2A" }}>Violencia Basada en Género (VBG)</strong> en 
              contextos universitarios.
            </p>
            <p>
              A través de la creación de un cuento de ficción, herramientas educativas y un repositorio
              de recursos, el proyecto busca sensibilizar a la comunidad universitaria sobre la importancia
              de reconocer, fortalecer y activar las redes de apoyo personales e institucionales como
              mecanismo de prevención y protección.
            </p>
          </div>
        </div>
      </section>

      {/* Objetivos */}
      <section style={{ background: "#f5f0e1" }}>
        <div className="container" style={{ paddingTop: 56, paddingBottom: 48 }}>
          <div className="accent-bar" />
          <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#1D3E2A", marginBottom: 24, fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
            Objetivos del proyecto
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
            {[
              { num: "01", title: "Sensibilizar", desc: "Generar conciencia sobre la Violencia Basada en Género en la comunidad universitaria mediante recursos narrativos y educativos.", color: "#C96A4A" },
              { num: "02", title: "Visibilizar redes", desc: "Promover el reconocimiento y fortalecimiento de las redes de apoyo personales e institucionales como factor protector ante la VBG.", color: "#00555A" },
              { num: "03", title: "Crear recursos", desc: "Desarrollar materiales educativos, herramientas interactivas y un cuento de ficción que aborde la temática de forma accesible.", color: "#DCA15D" },
              { num: "04", title: "Articular saberes", desc: "Integrar la investigación formativa con la creación artística para generar conocimiento situado y estrategias de prevención.", color: "#1D3E2A" },
            ].map((obj) => (
              <div key={obj.num} className="card" style={{ borderTop: `3px solid ${obj.color}` }}>
                <span style={{ fontSize: 32, fontWeight: 800, color: obj.color, opacity: 0.3, fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
                  {obj.num}
                </span>
                <h3 style={{ fontWeight: 700, fontSize: 17, color: obj.color, margin: "8px 0", fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
                  {obj.title}
                </h3>
                <p style={{ fontSize: 14, lineHeight: 1.7, color: "#5a7d66", margin: 0 }}>{obj.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipo investigador */}
      <section style={{ background: "var(--bg)" }}>
        <div className="container" style={{ paddingTop: 56, paddingBottom: 48 }}>
          <div className="accent-bar" />
          <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#1D3E2A", marginBottom: 24, fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
            Equipo investigador
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
            {[
              { name: "Investigador/a principal", role: "Dirección y coordinación del proyecto", initials: "IP" },
              { name: "Co-investigador/a", role: "Diseño metodológico y análisis", initials: "CI" },
              { name: "Asistente de investigación", role: "Recolección de datos y desarrollo web", initials: "AI" },
              { name: "Diseñador/a creativo/a", role: "Creación visual y editorial", initials: "DC" },
            ].map((member) => (
              <div key={member.initials} style={{ display: "flex", gap: 16, alignItems: "center", padding: 20, background: "white", borderRadius: 16, border: "1px solid var(--border)" }}>
                <div style={{ width: 52, height: 52, borderRadius: 14, background: "linear-gradient(135deg, #C96A4A, #DCA15D)", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 16, fontFamily: "ui-sans-serif, system-ui, sans-serif", flexShrink: 0 }}>
                  {member.initials}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15, color: "#1D3E2A", fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>{member.name}</div>
                  <div style={{ fontSize: 13, color: "#5a7d66", marginTop: 2 }}>{member.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instituciones aliadas */}
      <section style={{ background: "#f5f0e1" }}>
        <div className="container" style={{ paddingTop: 56, paddingBottom: 56 }}>
          <div className="accent-bar" />
          <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#1D3E2A", marginBottom: 24, fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
            Instituciones aliadas
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
            {[
              { name: "Universidad aliada 1", type: "Institución educativa" },
              { name: "Universidad aliada 2", type: "Institución educativa" },
              { name: "Organización de apoyo", type: "Sociedad civil" },
              { name: "Entidad gubernamental", type: "Sector público" },
              { name: "Red de investigación", type: "Academia" },
            ].map((inst) => (
              <div key={inst.name} style={{ padding: "16px 20px", borderRadius: 12, background: "white", border: "1px solid var(--border)" }}>
                <div style={{ fontWeight: 700, fontSize: 15, color: "#1D3E2A", fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>{inst.name}</div>
                <div style={{ fontSize: 13, color: "#5a7d66", marginTop: 4 }}>{inst.type}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
