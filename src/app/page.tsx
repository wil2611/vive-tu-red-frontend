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
    desc: "Encuentra instituciones y contactos de emergencia si necesitas orientación o apoyo inmediato.",
    href: "/rutas",
    cta: "Ir a rutas",
    color: "#00555A",
    gradient: "linear-gradient(135deg, #00555A 0%, #007a80 100%)",
    badge: "Atención inmediata",
    badgeClass: "badge-teal",
  },
  {
    icon: "📚",
    title: "Recursos Educativos",
    desc: "Explora cartillas, guías e infografías para prevenir violencias y fortalecer redes de cuidado.",
    href: "/recursos",
    cta: "Ver recursos",
    color: "#DCA15D",
    gradient: "linear-gradient(135deg, #DCA15D 0%, #e4b87e 100%)",
    badge: "Formación y prevención",
    badgeClass: "badge-gold",
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
          <span className="badge badge-forest" style={{ marginBottom: 12 }}>
            Herramientas disponibles
          </span>
          <h2 className="section-title" style={{ marginBottom: 10 }}>
            Elige por dónde empezar
          </h2>
          <p className="section-subtitle" style={{ margin: "0 auto" }}>
            Cada recurso responde a una necesidad distinta: apoyo inmediato o
            materiales para aprender y compartir.
          </p>
        </div>

        <div className="lines-grid">
          {lines.map((item) => (
            <Link key={item.href} href={item.href} className="line-card">
              <div className="line-card-image" style={{ background: item.gradient }}>
                <span style={{ fontSize: 36 }}>{item.icon}</span>
              </div>
              <div className="line-card-body">
                <span className={`badge ${item.badgeClass}`} style={{ marginBottom: 10 }}>
                  {item.badge}
                </span>
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

        <div className="notice notice-warning" style={{ maxWidth: 860, margin: "24px auto 0" }}>
          <span style={{ fontSize: 18 }}>⚠️</span>
          <div>
            <strong style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>Si necesitas ayuda urgente</strong>
            <p style={{ margin: "4px 0 0", fontSize: 14 }}>
              Empieza por Rutas de Atención para encontrar contactos e instituciones de apoyo.
            </p>
          </div>
        </div>
      </div>
      </section>

      {/* ── Redes (introduccion) ── */}
      <section style={{ background: "#f5f0e1" }}>
      <div className="container" style={{ paddingTop: 56, paddingBottom: 56 }}>
        <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
          <h2 className="section-title" style={{ marginBottom: 12, fontSize: "1.85rem" }}>
            Visualizador de redes personales
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.8, color: "#5a7d66", maxWidth: 660, margin: "0 auto 10px" }}>
            Esta herramienta te ayuda a reconocer las personas e instituciones con las que puedes contar
            en momentos importantes.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.8, color: "#5a7d66", maxWidth: 660, margin: "0 auto 28px" }}>
            No necesitas experiencia previa: encontraras una guia simple para empezar paso a paso.
          </p>

          <div className="notice notice-info" style={{ margin: "0 auto 24px", maxWidth: 660, textAlign: "left" }}>
            <span style={{ fontSize: 20 }}>🔒</span>
            <div>
              <strong style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>Privado y anonimo</strong>
              <p style={{ margin: "4px 0 0", fontSize: 14 }}>
                Tu informacion se procesa solo en tu navegador. No guardamos ni enviamos datos personales.
              </p>
            </div>
          </div>

          <Link className="btn btn-primary" href="/redes" style={{ fontSize: 15, padding: "12px 32px" }}>
            Entrar al visualizador →
          </Link>
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
