import Link from "next/link";

const emergencyContacts = [
  { name: "Línea 155", desc: "Orientación a mujeres víctimas de violencia", phone: "155", color: "#C96A4A" },
  { name: "Línea 141", desc: "Protección de niños, niñas y adolescentes (ICBF)", phone: "141", color: "#C96A4A" },
  { name: "Línea 123", desc: "Emergencias generales", phone: "123", color: "#C96A4A" },
  { name: "Línea 122", desc: "Fiscalía General de la Nación", phone: "122", color: "#C96A4A" },
];

const institutions = [
  {
    name: "Comisaría de Familia",
    type: "Atención y protección",
    desc: "Recepción de denuncias, medidas de protección y orientación jurídica para víctimas de violencia intrafamiliar y VBG.",
    badge: "Presencial",
    badgeColor: "#00555A",
  },
  {
    name: "Fiscalía General de la Nación",
    type: "Justicia y denuncia",
    desc: "Recepción de denuncias penales por delitos de violencia basada en género y acompañamiento en el proceso judicial.",
    badge: "Denuncia",
    badgeColor: "#C96A4A",
  },
  {
    name: "Secretaría de la Mujer",
    type: "Orientación y acompañamiento",
    desc: "Asesoría jurídica, psicológica y social para mujeres en situación de violencia.",
    badge: "Orientación",
    badgeColor: "#DCA15D",
  },
  {
    name: "Bienestar Universitario",
    type: "Apoyo institucional",
    desc: "Acompañamiento psicológico y orientación para estudiantes que enfrentan situaciones de violencia en el entorno universitario.",
    badge: "Universidad",
    badgeColor: "#1D3E2A",
  },
  {
    name: "Defensoría del Pueblo",
    type: "Derechos humanos",
    desc: "Protección y promoción de derechos humanos, orientación gratuita y acompañamiento a víctimas.",
    badge: "Derechos",
    badgeColor: "#00555A",
  },
  {
    name: "Centros de atención a víctimas",
    type: "Atención integral",
    desc: "Servicios de salud, asesoría legal y apoyo psicosocial para víctimas de violencia basada en género.",
    badge: "Integral",
    badgeColor: "#DCA15D",
  },
];

export default function RutasPage() {
  return (
    <div>
      {/* Hero */}
      <section style={{ background: "linear-gradient(180deg, #f5f0e1 0%, var(--bg) 100%)", padding: "48px 0 56px" }}>
        <div className="container">
          <span className="hero-badge">Apoyo institucional</span>
          <h1 style={{ fontSize: "clamp(2rem, 4vw, 2.6rem)", fontWeight: 800, color: "#1D3E2A", margin: "16px 0 12px", fontFamily: "Georgia, serif", lineHeight: 1.15 }}>
            Rutas de atención
          </h1>
          <p style={{ fontSize: "1.05rem", lineHeight: 1.75, color: "#5a7d66", maxWidth: 600, margin: 0 }}>
            Directorio de instituciones, contactos de emergencia e información sobre
            procesos de atención y acompañamiento para víctimas de VBG.
          </p>
        </div>
      </section>

      {/* Contactos de emergencia */}
      <section style={{ background: "var(--bg)" }}>
      <div className="container" style={{ paddingTop: 48, paddingBottom: 48 }}>
        <div className="accent-bar" />
        <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#1D3E2A", marginBottom: 8, fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
          Contactos de emergencia
        </h2>
        <p style={{ color: "#5a7d66", marginBottom: 24, lineHeight: 1.7 }}>
          Si estás en una situación de emergencia, comunícate inmediatamente con alguna de estas líneas.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
          {emergencyContacts.map((c) => (
            <div
              key={c.phone}
              style={{
                background: "rgba(201, 106, 74, 0.06)",
                border: "2px solid rgba(201, 106, 74, 0.15)",
                borderRadius: 16,
                padding: "20px 24px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 800,
                  color: "#C96A4A",
                  fontFamily: "ui-sans-serif, system-ui, sans-serif",
                  marginBottom: 4,
                }}
              >
                📞 {c.phone}
              </div>
              <div style={{ fontWeight: 700, fontSize: 15, color: "#1D3E2A", fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
                {c.name}
              </div>
              <div style={{ fontSize: 13, color: "#5a7d66", marginTop: 4 }}>{c.desc}</div>
            </div>
          ))}
        </div>
      </div>
      </section>

      {/* Directorio de instituciones */}
      <section style={{ background: "#f5f0e1" }}>
      <div className="container" style={{ paddingTop: 48, paddingBottom: 48 }}>
        <div className="accent-bar" />
        <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#1D3E2A", marginBottom: 8, fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
          Directorio de instituciones de atención
        </h2>
        <p style={{ color: "#5a7d66", marginBottom: 24, lineHeight: 1.7 }}>
          Estas instituciones ofrecen servicios de atención, orientación y acompañamiento a víctimas de VBG.
        </p>

        <div style={{ display: "grid", gap: 16 }}>
          {institutions.map((inst) => (
            <div
              key={inst.name}
              className="card"
              style={{ display: "flex", gap: 20, alignItems: "flex-start", flexWrap: "wrap" }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  background: `${inst.badgeColor}14`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 20,
                  flexShrink: 0,
                }}
              >
                🏛️
              </div>
              <div style={{ flex: 1, minWidth: 200 }}>
                <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap", marginBottom: 4 }}>
                  <h3 style={{ fontWeight: 700, fontSize: 16, color: "#1D3E2A", margin: 0, fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
                    {inst.name}
                  </h3>
                  <span
                    className="badge"
                    style={{
                      background: `${inst.badgeColor}14`,
                      color: inst.badgeColor,
                      fontSize: 11,
                    }}
                  >
                    {inst.badge}
                  </span>
                </div>
                <div style={{ fontSize: 13, color: "#5a7d66", marginBottom: 6, fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
                  {inst.type}
                </div>
                <p style={{ fontSize: 14, lineHeight: 1.7, color: "#5a7d66", margin: 0 }}>
                  {inst.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      </section>

      {/* Información sobre procesos */}
      <section style={{ background: "var(--bg)" }}>
      <div className="container" style={{ paddingTop: 48, paddingBottom: 56 }}>
        <div className="accent-bar" />
        <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#1D3E2A", marginBottom: 24, fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
          ¿Cómo funcionan los procesos de atención?
        </h2>

        <div style={{ display: "grid", gap: 12, maxWidth: 760 }}>
          <details>
            <summary>¿Qué hacer si soy víctima de violencia basada en género?</summary>
            <div>
              <p style={{ margin: 0 }}>
                Lo primero es buscar un lugar seguro. Puedes comunicarte con las líneas de emergencia
                (155, 123) o acudir directamente a una Comisaría de Familia o al servicio de Bienestar
                Universitario de tu institución. No es necesario tener pruebas para solicitar ayuda.
                Tienes derecho a recibir atención integral, orientación jurídica y acompañamiento psicológico.
              </p>
            </div>
          </details>
          <details>
            <summary>¿Cómo puedo acompañar a alguien que está en situación de violencia?</summary>
            <div>
              <p style={{ margin: 0 }}>
                Escucha sin juzgar, valida sus emociones y ofrece información sobre las rutas de atención
                disponibles. No presiones para que tome decisiones inmediatas. Puedes orientarla/o hacia
                las líneas de atención (155) o al servicio de Bienestar Universitario. Tu papel como red
                de apoyo es fundamental.
              </p>
            </div>
          </details>
          <details>
            <summary>¿Qué servicios ofrece Bienestar Universitario?</summary>
            <div>
              <p style={{ margin: 0 }}>
                Bienestar Universitario generalmente ofrece servicios de orientación psicológica,
                asesoría jurídica, acompañamiento en procesos disciplinarios y articulación con
                entidades externas para la atención integral de casos de VBG.
              </p>
            </div>
          </details>
          <details>
            <summary>¿Es confidencial el proceso de atención?</summary>
            <div>
              <p style={{ margin: 0 }}>
                Sí. Las instituciones de atención están obligadas a respetar la confidencialidad
                del caso. Tu información personal y los detalles del proceso son protegidos
                por la ley. Solo se compartirá información con tu consentimiento o cuando
                exista riesgo inminente.
              </p>
            </div>
          </details>
        </div>

        {/* CTA */}
        <div
          className="notice notice-warning"
          style={{ maxWidth: 760, marginTop: 32 }}
        >
          <span style={{ fontSize: 20 }}>⚠️</span>
          <div>
            <strong style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>Si estás en peligro</strong>
            <p style={{ margin: "4px 0 0" }}>
              Llama inmediatamente al <strong>155</strong> (Línea de orientación a mujeres víctimas de violencia)
              o al <strong>123</strong> (Línea de emergencias). No estás sola/solo.
            </p>
          </div>
        </div>
      </div>
      </section>
    </div>
  );
}
