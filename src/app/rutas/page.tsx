import type React from "react";
import Link from "next/link";

const emergencyContacts = [
  { name: "Línea 155", desc: "Orientación a mujeres víctimas de violencia", phone: "155" },
  { name: "Línea 141", desc: "Protección de niños, niñas y adolescentes (ICBF)", phone: "141" },
  { name: "Línea 123", desc: "Emergencias generales", phone: "123" },
  { name: "Línea 122", desc: "Fiscalía General de la Nación", phone: "122" },
];

const institutions = [
  {
    name: "Comisaría de Familia",
    type: "Atención y protección",
    desc: "Recepción de denuncias, medidas de protección y orientación jurídica para víctimas de violencia intrafamiliar y VBG.",
    badge: "Presencial",
    badgeColor: "#00555A",
    icon: "🏛️",
  },
  {
    name: "Fiscalía General de la Nación",
    type: "Justicia y denuncia",
    desc: "Recepción de denuncias penales por delitos de violencia basada en género y acompañamiento en el proceso judicial.",
    badge: "Denuncia",
    badgeColor: "#C96A4A",
    icon: "⚖️",
  },
  {
    name: "Secretaría de la Mujer",
    type: "Orientación y acompañamiento",
    desc: "Asesoría jurídica, psicológica y social para mujeres en situación de violencia.",
    badge: "Orientación",
    badgeColor: "#DCA15D",
    icon: "🤝",
  },
  {
    name: "Bienestar Universitario",
    type: "Apoyo institucional",
    desc: "Acompañamiento psicológico y orientación para estudiantes que enfrentan situaciones de violencia en el entorno universitario.",
    badge: "Universidad",
    badgeColor: "#1D3E2A",
    icon: "🎓",
  },
  {
    name: "Defensoría del Pueblo",
    type: "Derechos humanos",
    desc: "Protección y promoción de derechos humanos, orientación gratuita y acompañamiento a víctimas.",
    badge: "Derechos",
    badgeColor: "#00555A",
    icon: "🛡️",
  },
  {
    name: "Centros de atención a víctimas",
    type: "Atención integral",
    desc: "Servicios de salud, asesoría legal y apoyo psicosocial para víctimas de violencia basada en género.",
    badge: "Integral",
    badgeColor: "#DCA15D",
    icon: "💙",
  },
];

const whenToSeekHelp = [
  { icon: "🚨", label: "Peligro inmediato", desc: "Sientes que tu integridad física o la de alguien cercano está en riesgo." },
  { icon: "😰", label: "Miedo constante", desc: "Vives con temor a las reacciones de una persona o evitas situaciones por miedo." },
  { icon: "💔", label: "Violencia emocional", desc: "Experimentas humillaciones, control excesivo, aislamiento o manipulación." },
  { icon: "🤐", label: "No sabes a quién acudir", desc: "No tienes con quién hablar o sientes que nadie te creerá." },
  { icon: "👀", label: "Eres testigo", desc: "Conoces a alguien que puede estar viviendo una situación de violencia." },
  { icon: "📋", label: "Quieres denunciar", desc: "Deseas iniciar un proceso legal o simplemente necesitas orientación." },
];

const processSteps = [
  {
    num: "01",
    title: "Primera escucha y orientación",
    desc: "Al contactar una institución, te recibirán sin juzgarte. Te explicarán tus derechos y las opciones disponibles. No necesitas pruebas para pedir ayuda.",
    color: "#00555A",
  },
  {
    num: "02",
    title: "Valoración y plan de seguridad",
    desc: "Se evaluará tu situación para determinar el nivel de riesgo y se construirá un plan de seguridad personalizado junto contigo.",
    color: "#1D3E2A",
  },
  {
    num: "03",
    title: "Atención integral",
    desc: "Accederás a acompañamiento psicológico, asesoría jurídica y, si es necesario, atención médica o medidas de protección.",
    color: "#C96A4A",
  },
  {
    num: "04",
    title: "Seguimiento y redes de apoyo",
    desc: "El proceso no termina con el primer contacto. Las instituciones hacen seguimiento y te conectan con redes de apoyo comunitario.",
    color: "#DCA15D",
  },
];

const stepLabelStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  background: "rgba(220,161,93,0.15)",
  color: "#a8553a",
  borderRadius: 20,
  padding: "5px 14px",
  fontSize: 13,
  fontWeight: 700,
  fontFamily: "ui-sans-serif, system-ui, sans-serif",
  marginBottom: 16,
};

export default function RutasPage() {
  return (
    <div>
      {/* ── Hero ── */}
      <section style={{ background: "linear-gradient(180deg, #f5f0e1 0%, var(--bg) 100%)", padding: "48px 0 56px" }}>
        <div className="container">
          <span className="hero-badge">Apoyo institucional</span>
          <h1 style={{ fontSize: "clamp(2rem, 4vw, 2.6rem)", fontWeight: 800, color: "#1D3E2A", margin: "16px 0 12px", fontFamily: "Georgia, serif", lineHeight: 1.15 }}>
            Rutas de atención
          </h1>
          <p style={{ fontSize: "1.1rem", lineHeight: 1.8, color: "#5a7d66", maxWidth: 580, margin: "0 0 20px" }}>
            Si tú o alguien cercano necesita apoyo…
          </p>
          <p style={{ fontSize: "1rem", lineHeight: 1.75, color: "#5a7d66", maxWidth: 600, margin: 0 }}>
            Aquí encontrarás los pasos claros para saber cuándo pedir ayuda, a quién contactar
            y qué esperar durante el proceso de atención en situaciones de Violencia Basada en Género (VBG).
          </p>

          {/* Paso a paso visual */}
          <div style={{ display: "flex", gap: 0, marginTop: 40, flexWrap: "wrap" }}>
            {[
              { num: "1", label: "¿Cuándo acudir?", href: "#paso-1" },
              { num: "2", label: "¿A quién contactar?", href: "#paso-2" },
              { num: "3", label: "¿Qué esperar?", href: "#paso-3" },
            ].map((s, i) => (
              <div key={s.num} style={{ display: "flex", alignItems: "center", gap: 0 }}>
                <a
                  href={s.href}
                  className="step-nav-btn"
                >
                  <span style={{ width: 28, height: 28, borderRadius: "50%", background: "#1D3E2A", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 13, fontFamily: "ui-sans-serif, system-ui, sans-serif", flexShrink: 0 }}>
                    {s.num}
                  </span>
                  <span style={{ fontWeight: 600, fontSize: 14, color: "#1D3E2A", fontFamily: "ui-sans-serif, system-ui, sans-serif", whiteSpace: "nowrap" }}>
                    {s.label}
                  </span>
                </a>
                {i < 2 && (
                  <span style={{ padding: "0 4px", color: "#d4cdaf", fontSize: 18, userSelect: "none" }}>›</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PASO 1: ¿Cuándo acudir? ── */}
      <section id="paso-1" style={{ background: "#f5f0e1" }}>
        <div className="container" style={{ paddingTop: 52, paddingBottom: 52 }}>
          <div style={stepLabelStyle}>
            <span style={{ width: 22, height: 22, borderRadius: "50%", background: "#1D3E2A", color: "white", display: "inline-flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 12 }}>1</span>
            Paso 1
          </div>
          <div className="accent-bar" />
          <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#1D3E2A", marginBottom: 8, fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
            ¿Cuándo acudir?
          </h2>
          <p style={{ color: "#5a7d66", marginBottom: 32, lineHeight: 1.7, maxWidth: 640 }}>
            No esperes a estar en una crisis severa. Pedir ayuda es un acto de valentía.
            Estas son algunas situaciones en las que es importante buscar apoyo:
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
            {whenToSeekHelp.map((item) => (
              <div
                key={item.label}
                className="card"
                style={{ display: "flex", gap: 16, alignItems: "flex-start", padding: "20px 22px" }}
              >
                <span style={{ fontSize: 26, flexShrink: 0, lineHeight: 1 }}>{item.icon}</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15, color: "#1D3E2A", marginBottom: 4, fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
                    {item.label}
                  </div>
                  <p style={{ fontSize: 13.5, color: "#5a7d66", margin: 0, lineHeight: 1.65 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="notice notice-warning" style={{ maxWidth: 720, marginTop: 28 }}>
            <span style={{ fontSize: 20 }}>⚠️</span>
            <div>
              <strong style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>Si estás en peligro ahora mismo</strong>
              <p style={{ margin: "4px 0 0" }}>
                Llama al <strong>155</strong> o al <strong>123</strong>. No necesitas estar segura/o para pedir ayuda. No estás sola/solo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── PASO 2: ¿A quién contactar? ── */}
      <section id="paso-2" style={{ background: "var(--bg)" }}>
        <div className="container" style={{ paddingTop: 52, paddingBottom: 52 }}>
          <div style={stepLabelStyle}>
            <span style={{ width: 22, height: 22, borderRadius: "50%", background: "#1D3E2A", color: "white", display: "inline-flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 12 }}>2</span>
            Paso 2
          </div>
          <div className="accent-bar" />
          <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#1D3E2A", marginBottom: 8, fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
            ¿A quién contactar?
          </h2>
          <p style={{ color: "#5a7d66", marginBottom: 32, lineHeight: 1.7, maxWidth: 640 }}>
            Dependiendo de tu situación, puedes acudir a una línea de emergencia o a una institución especializada.
          </p>

          {/* Líneas de emergencia */}
          <h3 style={{ fontSize: "0.8rem", fontWeight: 700, color: "#1D3E2A", marginBottom: 14, fontFamily: "ui-sans-serif, system-ui, sans-serif", textTransform: "uppercase", letterSpacing: "0.05em" }}>
            📞 Líneas de emergencia — disponibles las 24 horas
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 14, marginBottom: 36 }}>
            {emergencyContacts.map((c) => (
              <div
                key={c.phone}
                style={{
                  background: "rgba(201, 106, 74, 0.07)",
                  border: "2px solid rgba(201, 106, 74, 0.18)",
                  borderRadius: 14,
                  padding: "18px 22px",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: 26, fontWeight: 800, color: "#C96A4A", fontFamily: "ui-sans-serif, system-ui, sans-serif", marginBottom: 4 }}>
                  {c.phone}
                </div>
                <div style={{ fontWeight: 700, fontSize: 14, color: "#1D3E2A", fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
                  {c.name}
                </div>
                <div style={{ fontSize: 12.5, color: "#5a7d66", marginTop: 4, lineHeight: 1.5 }}>{c.desc}</div>
              </div>
            ))}
          </div>

          {/* Instituciones */}
          <h3 style={{ fontSize: "0.8rem", fontWeight: 700, color: "#1D3E2A", marginBottom: 14, fontFamily: "ui-sans-serif, system-ui, sans-serif", textTransform: "uppercase", letterSpacing: "0.05em" }}>
            🏛️ Instituciones de atención
          </h3>
          <div style={{ display: "grid", gap: 14 }}>
            {institutions.map((inst) => (
              <div
                key={inst.name}
                className="card"
                style={{ display: "flex", gap: 18, alignItems: "flex-start", flexWrap: "wrap", padding: "20px 24px" }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: `${inst.badgeColor}14`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 20,
                    flexShrink: 0,
                  }}
                >
                  {inst.icon}
                </div>
                <div style={{ flex: 1, minWidth: 200 }}>
                  <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap", marginBottom: 2 }}>
                    <h4 style={{ fontWeight: 700, fontSize: 15, color: "#1D3E2A", margin: 0, fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
                      {inst.name}
                    </h4>
                    <span
                      className="badge"
                      style={{ background: `${inst.badgeColor}14`, color: inst.badgeColor, fontSize: 11 }}
                    >
                      {inst.badge}
                    </span>
                  </div>
                  <div style={{ fontSize: 12.5, color: "#5a7d66", marginBottom: 5, fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
                    {inst.type}
                  </div>
                  <p style={{ fontSize: 13.5, lineHeight: 1.65, color: "#5a7d66", margin: 0 }}>
                    {inst.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PASO 3: ¿Qué esperar del proceso? ── */}
      <section id="paso-3" style={{ background: "#f5f0e1" }}>
        <div className="container" style={{ paddingTop: 52, paddingBottom: 56 }}>
          <div style={stepLabelStyle}>
            <span style={{ width: 22, height: 22, borderRadius: "50%", background: "#1D3E2A", color: "white", display: "inline-flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 12 }}>3</span>
            Paso 3
          </div>
          <div className="accent-bar" />
          <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#1D3E2A", marginBottom: 8, fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
            ¿Qué esperar del proceso?
          </h2>
          <p style={{ color: "#5a7d66", marginBottom: 32, lineHeight: 1.7, maxWidth: 640 }}>
            Conocer el camino reduce la incertidumbre. Así funciona generalmente la atención:
          </p>

          {/* Línea de tiempo del proceso */}
          <div style={{ display: "grid", gap: 0, maxWidth: 760, marginBottom: 40 }}>
            {processSteps.map((step, i) => (
              <div key={step.num} style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
                {/* Línea vertical */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                  <div style={{ width: 44, height: 44, borderRadius: "50%", background: step.color, color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 13, fontFamily: "ui-sans-serif, system-ui, sans-serif", flexShrink: 0 }}>
                    {step.num}
                  </div>
                  {i < processSteps.length - 1 && (
                    <div style={{ width: 2, flex: 1, minHeight: 24, background: "#d4cdaf", margin: "4px 0" }} />
                  )}
                </div>
                {/* Contenido */}
                <div style={{ paddingBottom: i < processSteps.length - 1 ? 24 : 0, paddingTop: 8 }}>
                  <h3 style={{ fontWeight: 700, fontSize: 16, color: "#1D3E2A", margin: "0 0 6px", fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
                    {step.title}
                  </h3>
                  <p style={{ fontSize: 14, color: "#5a7d66", margin: 0, lineHeight: 1.7 }}>
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── Preguntas frecuentes ── */}
      <section style={{ background: "var(--bg)" }}>
        <div className="container" style={{ paddingTop: 52, paddingBottom: 56 }}>
          <div className="accent-bar" />
          <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#1D3E2A", marginBottom: 8, fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
            Preguntas frecuentes
          </h2>
          <p style={{ color: "#5a7d66", marginBottom: 28, lineHeight: 1.7, maxWidth: 640 }}>
            Resolvemos las dudas más comunes sobre cómo funciona el proceso de atención.
          </p>
          <div style={{ display: "grid", gap: 10, maxWidth: 760 }}>
            <details>
              <summary>¿Necesito pruebas para pedir ayuda?</summary>
              <div>
                <p style={{ margin: 0 }}>
                  No. No es necesario tener pruebas para solicitar orientación o iniciar un proceso.
                  Tienes derecho a recibir atención, escucha y acompañamiento desde el primer contacto.
                </p>
              </div>
            </details>
            <details>
              <summary>¿Es confidencial el proceso?</summary>
              <div>
                <p style={{ margin: 0 }}>
                  Sí. Las instituciones están obligadas a respetar la confidencialidad. Tu información
                  solo se compartirá con tu consentimiento o ante riesgo inminente para tu vida.
                </p>
              </div>
            </details>
            <details>
              <summary>¿Cómo acompañar a alguien que vive violencia?</summary>
              <div>
                <p style={{ margin: 0 }}>
                  Escucha sin juzgar, valida sus emociones y ofrece información sobre las rutas disponibles.
                  No presiones para que tome decisiones inmediatas. Tu rol como red de apoyo es fundamental.
                  Puedes orientarla/o al 155 o a Bienestar Universitario.
                </p>
              </div>
            </details>
            <details>
              <summary>¿Qué pasa si quiero detener el proceso?</summary>
              <div>
                <p style={{ margin: 0 }}>
                  Tienes autonomía sobre tu proceso. Puedes decidir pausar o detener la atención en
                  cualquier momento. Las instituciones deben respetar tus decisiones y seguir
                  brindándote información sin presionarte.
                </p>
              </div>
            </details>
          </div>
        </div>
      </section>
    </div>
  );
}
