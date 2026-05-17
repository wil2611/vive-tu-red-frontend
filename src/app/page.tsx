import Image from "next/image";
import Link from "next/link";
import HomeNewsSection from "@/components/HomeNewsSection";

const bulletPoints = [
  {
    icon: "/engranaje.png",
    title: "Aprende",
    text: "a identificar señales de riesgo.",
  },
  {
    icon: "/lupa.png",
    iconClass: "mission-bullet-image-search",
    title: "Explora",
    text: "recursos de apoyo confiables.",
  },
  {
    icon: "/escudo.png",
    title: "Fortalece",
    text: "tu red de cuidado en la universidad.",
  },
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
                <span className="hero-title-main">Transformando</span>
                <span className="hero-title-sub">realidades a través de tu red</span>
              </h1>
              <p className="hero-desc">
                Sensibilización social, concienciación y creación de redes de apoyo
                para navegar el entorno universitario con propósito y seguridad.
              </p>
              <div className="hero-actions">
                <Link className="btn btn-primary" href="/sobre">
                  Conoce el proyecto 
                </Link>
                <Link className="btn btn-outline" href="/recursos">
                  Recursos educativos
                </Link>
              </div>
            </div>

            <div className="hero-visual">
              <div className="hero-card-main">
                <div className="hero-card-watermark" aria-hidden="true" />
                <div className="hero-card-inner">
                  <div className="hero-card-title">
                    #ViveTuRed
                  </div>
                  <div className="hero-card-tagline">redes que protegen</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Misión / About ── */}
      <section className="section-cream">
      <div className="container mission-section-container">
        <div className="mission-shell">
          <div className="mission-grid">
            <div className="mission-visual">
              <div className="mission-visual-card">
                <span className="mission-visual-tag">#ViveTuRed</span>
                <Image
                  src="/logo_footer.png"
                  alt="#ViveTuRed"
                  width={360}
                  height={144}
                  className="mission-logo"
                />
              </div>
            </div>
            <div className="mission-content">
              <h2 className="mission-title">
                ¿Qué es <span>#ViveTuRed</span><br />
                y cómo te acompaña?
              </h2>
              <p className="mission-text">
                #ViveTuRed conecta investigación y herramientas prácticas para prevenir la
                violencia basada en género en el entorno universitario.
              </p>
              <p className="mission-text mission-text-last">
                Aquí encontrarás recursos educativos y espacios para
                fortalecer tu red de apoyo personal e institucional.
              </p>
            </div>
          </div>

          <div className="mission-bullets">
            {bulletPoints.map((bp) => (
              <div key={bp.title} className="mission-bullet">
                <div className="mission-bullet-icon" aria-hidden="true">
                  <Image
                    src={bp.icon}
                    alt=""
                    width={32}
                    height={32}
                    className={bp.iconClass}
                  />
                </div>
                <span>
                  <strong>{bp.title}</strong>
                  {bp.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      </section>

      {/* ── Noticias ── */}
      <HomeNewsSection />

      {/* ── Redes (introducción) ── */}
      <section className="section-cream">
      <div className="container redes-section-container">
        <div className="redes-intro-shell">
          <div className="redes-intro-heading">
            <h2 className="section-title redes-intro-title">
              Visualizador de <span className="title-accent-terracotta">redes personales</span>
            </h2>
          </div>

          <div className="redes-intro-layout">
            <div className="redes-intro-visual" aria-hidden="true">
              <div className="redes-intro-graph">
                <svg viewBox="0 0 360 250" className="redes-intro-svg">
                  <g className="redes-intro-rings">
                    <circle cx="180" cy="130" r="56" className="redes-intro-ring" />
                    <circle cx="180" cy="130" r="94" className="redes-intro-ring" />
                    <circle cx="180" cy="130" r="132" className="redes-intro-ring" />
                  </g>

                  <g className="redes-intro-edges">
                    <line x1="180" y1="130" x2="180" y2="42" className="redes-intro-edge redes-intro-edge-gold" />
                    <line x1="180" y1="130" x2="278" y2="196" className="redes-intro-edge redes-intro-edge-forest" />
                    <line x1="180" y1="130" x2="72" y2="200" className="redes-intro-edge redes-intro-edge-danger" />
                  </g>

                  <g className="redes-intro-nodes">
                    <circle cx="180" cy="130" r="33" className="redes-intro-node-halo" />

                    <g transform="translate(180 130)">
                      <circle r="27" className="redes-intro-node redes-intro-node-ego" />
                      <text y="6" textAnchor="middle" className="redes-intro-center-label">TÚ</text>
                    </g>

                    <g transform="translate(180 42)">
                      <circle r="26" className="redes-intro-node redes-intro-node-gold" />
                      <g transform="translate(-8 -8)" className="redes-intro-node-icon-shape">
                        <circle cx="6" cy="5" r="3.5" />
                        <circle cx="13" cy="5" r="3.5" />
                        <path d="M1 14c0-2.8 2.2-4.8 5-4.8s5 2 5 4.8H1z" />
                        <path d="M8 14c0-2.8 2.2-4.8 5-4.8s5 2 5 4.8H8z" />
                      </g>
                    </g>
                    <text x="180" y="80" textAnchor="middle" className="redes-intro-node-label-dark">Familia</text>

                    <g transform="translate(278 196)">
                      <circle r="28" className="redes-intro-node-halo-soft" />
                      <circle r="25" className="redes-intro-node redes-intro-node-forest" />
                      <g transform="translate(-8 -9)" className="redes-intro-node-icon-shape">
                        <path d="M1 6L8 2l7 4H1z" />
                        <path d="M2 7h2v7H2zM6 7h2v7H6zM10 7h2v7h-2z" />
                        <path d="M0 14h16v2H0z" />
                      </g>
                    </g>
                    <text x="278" y="230" textAnchor="middle" className="redes-intro-node-label-dark">Universidad</text>

                    <g transform="translate(72 200)">
                      <circle r="23" className="redes-intro-node-halo-soft" />
                      <circle r="20" className="redes-intro-node redes-intro-node-danger" />
                      <g transform="translate(-8 -8)">
                        <circle cx="8" cy="8" r="5.2" fill="none" stroke="white" strokeWidth="1.4" />
                        <path d="M2.8 8h10.4" fill="none" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
                        <path d="M8 2.8c-1.8 1.6-1.8 8.8 0 10.4" fill="none" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
                        <path d="M8 2.8c1.8 1.6 1.8 8.8 0 10.4" fill="none" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
                      </g>
                    </g>
                    <text x="72" y="228" textAnchor="middle" className="redes-intro-node-label-dark">Comunidad</text>
                  </g>
                </svg>
              </div>
              <div className="redes-intro-chips">
                <span className="redes-intro-chip">Nodos: 4</span>
                <span className="redes-intro-chip">Aristas: 3</span>
                <span className="redes-intro-chip">Anillos de cercanía</span>
              </div>
            </div>

            <div className="redes-intro-content">
              <p className="redes-intro-text">
                Esta herramienta te ayuda a reconocer las personas e instituciones con las que puedes contar
                en momentos importantes.
              </p>
              <p className="redes-intro-text redes-intro-text-last">
                No necesitas experiencia previa: encontrarás una guía simple para empezar paso a paso.
              </p>

              <div className="notice notice-info redes-intro-notice">
                <span className="redes-intro-notice-icon">🔒</span>
                <div>
                  <strong className="redes-intro-notice-title">Privado y anónimo</strong>
                  <p className="redes-intro-notice-text">
                    Tu información se procesa solo en tu navegador. No guardamos ni enviamos datos personales.
                  </p>
                </div>
              </div>

              <Link className="btn btn-primary redes-intro-button" href="/redes">
                Entrar al visualizador 
              </Link>
            </div>
          </div>
        </div>
      </div>
      </section>

      {/* ── CTA final ── */}
      <section className="section-soft">
      <div className="container cta-section-container">
        <div className="cta-block">
          <h2 className="cta-title">
            Tu bienestar es nuestra <span>prioridad.</span>
          </h2>
          <p className="cta-desc">
            Únete a nuestra red de investigación y sé parte del cambio. Juntos
            podemos construir un ecosistema universitario más humano, consciente y
            seguro.
          </p>
          <div className="cta-actions">
            <Link
              className="btn btn-primary"
              href="/sobre"
            >
              Ver investigación
            </Link>
          </div>
        </div>
      </div>
      </section>
    </div>
  );
}
