import Link from "next/link";

const features = [
  {
    icon: "📖",
    title: "Libro digital",
    desc: "Lee el cuento de ficción #ViveTuRed dividido en 3 episodios. Disponible en web y descargable en PDF.",
    href: "/libro",
    color: "#C96A4A",
    bg: "rgba(201, 106, 74, 0.08)",
  },
  {
    icon: "🛤️",
    title: "Rutas de atención",
    desc: "Directorio de instituciones, contactos de emergencia e información sobre procesos de atención.",
    href: "/rutas",
    color: "#00555A",
    bg: "rgba(0, 85, 90, 0.06)",
  },
  {
    icon: "📚",
    title: "Recursos educativos",
    desc: "Cartillas, guías, infografías y materiales metodológicos derivados del proyecto.",
    href: "/recursos",
    color: "#DCA15D",
    bg: "rgba(220, 161, 93, 0.1)",
  },
  {
    icon: "🔗",
    title: "Visualizador de redes",
    desc: "Herramienta educativa para visualizar tus redes personales de forma gráfica y anonimizada.",
    href: "/redes",
    color: "#1D3E2A",
    bg: "rgba(29, 62, 42, 0.06)",
  },
];

export default function HomePage() {
  return (
    <div>
      {/* ── Hero Banner ── */}
      <section className="container">
        <div className="hero" style={{ marginTop: 8 }}>
          <div style={{ position: "relative", zIndex: 1, maxWidth: 640 }}>
            <span
              className="badge"
              style={{
                background: "rgba(220, 161, 93, 0.2)",
                color: "#DCA15D",
                marginBottom: 16,
              }}
            >
              Proyecto de investigación–creación
            </span>
            <h1
              style={{
                fontSize: "clamp(2rem, 5vw, 3rem)",
                fontWeight: 800,
                margin: "16px 0",
                lineHeight: 1.15,
                fontFamily: "ui-sans-serif, system-ui, sans-serif",
              }}
            >
              #ViveTuRed
            </h1>
            <p
              style={{
                fontSize: "clamp(1rem, 2vw, 1.15rem)",
                lineHeight: 1.8,
                color: "rgba(255,255,255,0.85)",
                marginBottom: 28,
                maxWidth: 560,
              }}
            >
              Sensibilización y prevención de Violencia Basada en Género (VBG) en
              entornos universitarios. Conoce las redes de apoyo, accede a recursos
              educativos y navega el libro digital.
            </p>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link className="btn btn-primary" href="/libro">
                📖 Leer el libro
              </Link>
              <Link className="btn btn-gold" href="/rutas">
                🛤️ Rutas de atención
              </Link>
              <Link className="btn" href="/recursos" style={{ background: "rgba(255,255,255,0.15)", color: "white", border: "1px solid rgba(255,255,255,0.25)" }}>
                📚 Recursos
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Mensaje de sensibilización ── */}
      <section className="container" style={{ paddingTop: 48 }}>
        <div
          style={{
            textAlign: "center",
            maxWidth: 700,
            margin: "0 auto",
          }}
        >
          <div className="accent-bar" style={{ margin: "0 auto 16px" }} />
          <h2
            style={{
              fontSize: "1.6rem",
              fontWeight: 800,
              color: "#1D3E2A",
              marginBottom: 12,
              fontFamily: "ui-sans-serif, system-ui, sans-serif",
            }}
          >
            Las redes de apoyo salvan vidas
          </h2>
          <p
            style={{
              fontSize: "1.05rem",
              lineHeight: 1.8,
              color: "#5a7d66",
            }}
          >
            Reconocer y fortalecer nuestras redes personales es un paso fundamental
            para prevenir la violencia basada en género. Este proyecto busca que cada
            persona pueda identificar, comprender y activar sus redes de apoyo.
          </p>
        </div>
      </section>

      {/* ── Secciones principales ── */}
      <section className="container" style={{ paddingTop: 48 }}>
        <h2
          className="section-title"
          style={{
            textAlign: "center",
            marginBottom: 8,
            fontFamily: "ui-sans-serif, system-ui, sans-serif",
          }}
        >
          Explora el proyecto
        </h2>
        <p
          className="section-subtitle"
          style={{ textAlign: "center", margin: "0 auto 32px" }}
        >
          Accede a los diferentes espacios del repositorio digital #ViveTuRed.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 20,
          }}
        >
          {features.map((f) => (
            <Link key={f.href} href={f.href} className="card" style={{ display: "block" }}>
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  background: f.bg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 22,
                  marginBottom: 16,
                }}
              >
                {f.icon}
              </div>
              <h3
                style={{
                  fontWeight: 700,
                  fontSize: 17,
                  color: f.color,
                  marginBottom: 8,
                  fontFamily: "ui-sans-serif, system-ui, sans-serif",
                }}
              >
                {f.title}
              </h3>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: "#5a7d66", margin: 0 }}>
                {f.desc}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Sobre el proyecto (resumen) ── */}
      <section className="container" style={{ paddingTop: 56 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 32,
            alignItems: "center",
          }}
        >
          <div>
            <div className="accent-bar" />
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: 800,
                color: "#1D3E2A",
                marginBottom: 12,
                fontFamily: "ui-sans-serif, system-ui, sans-serif",
              }}
            >
              Sobre el proyecto
            </h2>
            <p style={{ lineHeight: 1.8, color: "#5a7d66", marginBottom: 20 }}>
              #ViveTuRed es un proyecto de investigación–creación que busca
              sensibilizar a la comunidad universitaria sobre la Violencia Basada en
              Género, promoviendo el reconocimiento y fortalecimiento de las redes de
              apoyo personales e institucionales.
            </p>
            <Link className="btn btn-outline" href="/sobre">
              Conocer más →
            </Link>
          </div>

          <div
            style={{
              background: "linear-gradient(135deg, rgba(29,62,42,0.05), rgba(0,85,90,0.05))",
              borderRadius: 20,
              padding: 32,
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 20,
            }}
          >
            {[
              { label: "Episodios", value: "3", sub: "del cuento digital" },
              { label: "Instituciones", value: "5+", sub: "aliadas al proyecto" },
              { label: "Recursos", value: "10+", sub: "materiales educativos" },
              { label: "Enfoque", value: "VBG", sub: "prevención y acción" },
            ].map((stat) => (
              <div key={stat.label} style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontSize: 28,
                    fontWeight: 800,
                    color: "#C96A4A",
                    fontFamily: "ui-sans-serif, system-ui, sans-serif",
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: "#5a7d66",
                    fontFamily: "ui-sans-serif, system-ui, sans-serif",
                  }}
                >
                  {stat.sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA final ── */}
      <section className="container" style={{ paddingTop: 56, paddingBottom: 24 }}>
        <div
          style={{
            background: "linear-gradient(135deg, #00555A, #1D3E2A)",
            borderRadius: 20,
            padding: "40px 32px",
            textAlign: "center",
            color: "white",
          }}
        >
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: 800,
              marginBottom: 12,
              fontFamily: "ui-sans-serif, system-ui, sans-serif",
            }}
          >
            ¿Necesitas orientación o apoyo?
          </h2>
          <p
            style={{
              color: "rgba(255,255,255,0.8)",
              maxWidth: 480,
              margin: "0 auto 24px",
              lineHeight: 1.7,
            }}
          >
            Consulta las rutas de atención institucional o comunícate con nosotros
            a través del formulario de contacto.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link className="btn btn-primary" href="/rutas">
              Ver rutas de atención
            </Link>
            <Link
              className="btn"
              href="/contacto"
              style={{ background: "rgba(255,255,255,0.15)", color: "white", border: "1px solid rgba(255,255,255,0.25)" }}
            >
              Contacto
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
