import Link from "next/link";

const lines = [
  // {
  //   icon: "📖",
  //   title: "Libro Digital",
  //   desc: "Lee el cuento de ficción #ViveTuRed, una herramienta de investigación y narrativa. Disponible en 3 episodios.",
  //   href: "/libro",
  //   cta: "Leer ahora",
  //   color: "#C96A4A",
  //   gradient: "linear-gradient(135deg, #C96A4A 0%, #d4836a 100%)",
  // },
  {
    icon: "🛤️",
    title: "Rutas de Atención",
    desc: "Directorio de instituciones y contactos de emergencia para situaciones de Violencia Basada en Género.",
    href: "/rutas",
    cta: "Ver directorio",
    color: "#00555A",
    gradient: "linear-gradient(135deg, #00555A 0%, #007a80 100%)",
  },
  {
    icon: "📚",
    title: "Recursos Educativos",
    desc: "Cartillas, guías, infografías y materiales metodológicos creados para educadores y familias.",
    href: "/recursos",
    cta: "Acceder",
    color: "#DCA15D",
    gradient: "linear-gradient(135deg, #DCA15D 0%, #e4b87e 100%)",
  },
];

const bulletPoints = [
  { text: "Fomento de la cultura digital responsable" },
  { text: "Prevención de violencia en cada espacio digital" },
  { text: "Recursos creativos para la sensibilización" },
];

export default function HomePage() {
  return (
    <div>
      {/* ── Hero ── */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-content">
              <span className="hero-badge">Investigación–creación y prevención</span>
              <h1 className="hero-title">
                Transformando realidades a través de la red.
              </h1>
              <p className="hero-desc">
                Sensibilización social, concienciación y creación de redes de apoyo
                para navegar el entorno universitario con propósito y seguridad.
              </p>
              <div className="hero-actions">
                <Link className="btn btn-primary" href="/sobre">
                  Conoce el Proyecto →
                </Link>
                <Link className="btn btn-outline" href="/rutas">
                  Rutas de Atención
                </Link>
              </div>
              <div className="hero-trust">
                <div className="hero-trust-avatars">
                  <div className="hero-trust-avatar" style={{ background: "#C96A4A" }}>V</div>
                  <div className="hero-trust-avatar" style={{ background: "#00555A" }}>T</div>
                  <div className="hero-trust-avatar" style={{ background: "#DCA15D" }}>R</div>
                </div>
                <span className="hero-trust-text">Redes de Apoyo<br /><small>Comunidad universitaria</small></span>
              </div>
            </div>

            <div className="hero-visual">
              <div className="hero-card-main">
                <div className="hero-card-inner">
                  <span style={{ fontSize: 14, opacity: 0.85, letterSpacing: 1 }}>#ViveTuRed</span>
                  <div style={{ fontSize: 28, fontWeight: 300, lineHeight: 1.3, marginTop: 12 }}>
                    Comunidad
                  </div>
                  <div style={{ fontSize: 13, opacity: 0.6, marginTop: 8 }}>redes que protegen</div>
                </div>
              </div>
              <div className="hero-card-float">
                <div style={{ fontSize: 20, marginBottom: 4 }}>🤝</div>
                <div style={{ fontSize: 12, fontWeight: 600, color: "#1D3E2A" }}>Red activa</div>
                <div style={{ fontSize: 11, color: "#5a7d66" }}>Apoyo mutuo</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Misión / About ── */}
      <section style={{ background: "#f5f0e1" }}>
      <div className="container" style={{ paddingTop: 72, paddingBottom: 48 }}>
        <div className="mission-grid">
          <div className="mission-visual">
            <div className="mission-image-block">
              <div className="mission-image-main">
                <span style={{ fontSize: 48 }}>📖</span>
              </div>
              <div className="mission-script">
                <em style={{ fontFamily: "Georgia, serif", fontSize: 20, color: "#1D3E2A", lineHeight: 1.4 }}>
                  Colectivo de<br />Investigación
                </em>
              </div>
            </div>
          </div>
          <div className="mission-content">
            <span className="badge badge-teal" style={{ marginBottom: 12 }}>Sobre #ViveTuRed</span>
            <h2 className="section-title" style={{ fontSize: "1.75rem", marginBottom: 16 }}>
              Un puente entre la investigación y la acción creativa.
            </h2>
            <p style={{ lineHeight: 1.8, color: "#5a7d66", marginBottom: 24 }}>
              Somos un colectivo dedicado a la investigación social que busca
              entender y mejorar nuestras interacciones en el entorno universitario.
              A través de todas las herramientas, talleres y materiales de apoyo,
              construimos un espacio seguro para todos.
            </p>
            <div className="mission-bullets">
              {bulletPoints.map((bp) => (
                <div key={bp.text} className="mission-bullet">
                  <div className="mission-bullet-icon">✓</div>
                  <span>{bp.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      </section>

      {/* ── Líneas de acción ── */}
      <section style={{ background: "var(--bg)" }}>
      <div className="container" style={{ paddingTop: 64, paddingBottom: 48 }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <h2 className="section-title" style={{ marginBottom: 8 }}>
            Nuestras líneas de acción
          </h2>
          <p className="section-subtitle" style={{ margin: "0 auto" }}>
            Accede a herramientas diseñadas para informar, proteger y empoderar a
            nuestra comunidad en el ecosistema universitario.
          </p>
        </div>

        <div className="lines-grid">
          {lines.map((item) => (
            <Link key={item.href} href={item.href} className="line-card">
              <div className="line-card-image" style={{ background: item.gradient }}>
                <span style={{ fontSize: 36 }}>{item.icon}</span>
              </div>
              <div className="line-card-body">
                <h3 className="line-card-title" style={{ color: item.color }}>
                  {item.title}
                </h3>
                <p className="line-card-desc">{item.desc}</p>
                <span className="line-card-link" style={{ color: item.color }}>
                  {item.cta} →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
      </section>

      {/* ── Redes (extra card) ── */}
      <section style={{ background: "#f5f0e1" }}>
      <div className="container" style={{ paddingTop: 56, paddingBottom: 56 }}>
        <div style={{ maxWidth: 920, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <span style={{ fontSize: 40, marginBottom: 12, display: "block" }}>🔗</span>
            <h2 className="section-title" style={{ marginBottom: 12, fontSize: "1.85rem" }}>
              Visualizador de redes personales
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.8, color: "#5a7d66", maxWidth: 640, margin: "0 auto" }}>
              Herramienta interactiva y educativa para mapear, analizar y visualizar tus redes 
              de apoyo de forma totalmente anónima y privada.
            </p>
          </div>

          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", 
            gap: 16, 
            marginBottom: 32 
          }}>
            <div style={{
              background: "white",
              padding: "20px",
              borderRadius: 12,
              border: "1px solid #e0d9bd",
            }}>
              <div style={{ fontSize: 26, marginBottom: 8 }}>📋</div>
              <h4 style={{ 
                fontSize: 14, 
                fontWeight: 700, 
                color: "#1D3E2A", 
                marginBottom: 6,
                fontFamily: "ui-sans-serif, system-ui, sans-serif"
              }}>
                Información general
              </h4>
              <p style={{ fontSize: 13, lineHeight: 1.6, color: "#5a7d66", margin: 0 }}>
                Configura tu perfil anónimo
              </p>
            </div>

            <div style={{
              background: "white",
              padding: "20px",
              borderRadius: 12,
              border: "1px solid #e0d9bd",
            }}>
              <div style={{ fontSize: 26, marginBottom: 8 }}>👥</div>
              <h4 style={{ 
                fontSize: 14, 
                fontWeight: 700, 
                color: "#1D3E2A", 
                marginBottom: 6,
                fontFamily: "ui-sans-serif, system-ui, sans-serif"
              }}>
                Mapea conexiones
              </h4>
              <p style={{ fontSize: 13, lineHeight: 1.6, color: "#5a7d66", margin: 0 }}>
                Agrega personas y sus relaciones
              </p>
            </div>

            <div style={{
              background: "white",
              padding: "20px",
              borderRadius: 12,
              border: "1px solid #e0d9bd",
            }}>
              <div style={{ fontSize: 26, marginBottom: 8 }}>🤲</div>
              <h4 style={{ 
                fontSize: 14, 
                fontWeight: 700, 
                color: "#1D3E2A", 
                marginBottom: 6,
                fontFamily: "ui-sans-serif, system-ui, sans-serif"
              }}>
                Funciones de apoyo
              </h4>
              <p style={{ fontSize: 13, lineHeight: 1.6, color: "#5a7d66", margin: 0 }}>
                7 tipos de soporte identificables
              </p>
            </div>

            <div style={{
              background: "white",
              padding: "20px",
              borderRadius: 12,
              border: "1px solid #e0d9bd",
            }}>
              <div style={{ fontSize: 26, marginBottom: 8 }}>📊</div>
              <h4 style={{ 
                fontSize: 14, 
                fontWeight: 700, 
                color: "#1D3E2A", 
                marginBottom: 6,
                fontFamily: "ui-sans-serif, system-ui, sans-serif"
              }}>
                Visualización gráfica
              </h4>
              <p style={{ fontSize: 13, lineHeight: 1.6, color: "#5a7d66", margin: 0 }}>
                Grafo interactivo de tu red
              </p>
            </div>
          </div>

          <div className="notice notice-info" style={{ marginBottom: 24 }}>
            <span style={{ fontSize: 20 }}>🔒</span>
            <div>
              <strong style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>100% anónimo y privado</strong>
              <p style={{ margin: "4px 0 0", fontSize: 14 }}>
                Toda la información se procesa localmente en tu navegador. No se almacena ni envía ningún dato personal.
              </p>
            </div>
          </div>

          <div style={{ textAlign: "center" }}>
            <Link className="btn btn-primary" href="/redes" style={{ fontSize: 15, padding: "12px 32px" }}>
              Comenzar a Mapear tu Red →
            </Link>
          </div>
        </div>
      </div>
      </section>

      {/* ── CTA final ── */}
      <section style={{ background: "var(--bg)" }}>
      <div className="container" style={{ paddingTop: 64, paddingBottom: 40 }}>
        <div className="cta-block">
          <h2 className="cta-title">
            Tu bienestar es nuestra prioridad.
          </h2>
          <p className="cta-desc">
            Únete a nuestra red de investigación y sé parte del cambio. Juntos
            podemos construir un ecosistema universitario más humano, consciente y
            seguro.
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
              Ver Investigación
            </Link>
          </div>
        </div>
      </div>
      </section>
    </div>
  );
}
