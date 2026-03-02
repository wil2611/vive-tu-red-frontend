import type React from "react";

const emergencyContacts = [
  { name: "Línea 155", desc: "Orientación a mujeres víctimas de violencia", phone: "155" },
  { name: "Línea 141", desc: "Protección de niños, niñas y adolescentes (ICBF)", phone: "141" },
  { name: "Linea 123", desc: "Emergencias generales", phone: "123" },
  { name: "Línea 122", desc: "Fiscalía General de la Nación", phone: "122" },
];

const institutions = [
  {
    name: "Comisaría de Familia",
    type: "Atención y protección",
    desc: "Recepción de denuncias, medidas de protección y orientación jurídica para víctimas de violencia intrafamiliar y VBG.",
    badge: "Presencial",
    badgeColor: "#00555A",
    icon: "CF",
  },
  {
    name: "Fiscalía General de la Nación",
    type: "Justicia y denuncia",
    desc: "Recepción de denuncias penales por delitos de violencia basada en género y acompañamiento en el proceso judicial.",
    badge: "Denuncia",
    badgeColor: "#C96A4A",
    icon: "FG",
  },
  {
    name: "Secretaría de la Mujer",
    type: "Orientación y acompañamiento",
    desc: "Asesoría jurídica, psicológica y social para mujeres en situación de violencia.",
    badge: "Orientación",
    badgeColor: "#DCA15D",
    icon: "SM",
  },
  {
    name: "Bienestar Universitario",
    type: "Apoyo institucional",
    desc: "Acompañamiento psicológico y orientación para estudiantes que enfrentan situaciones de violencia en el entorno universitario.",
    badge: "Universidad",
    badgeColor: "#1D3E2A",
    icon: "BU",
  },
  {
    name: "Defensoría del Pueblo",
    type: "Derechos humanos",
    desc: "Protección y promoción de derechos humanos, orientación gratuita y acompañamiento a víctimas.",
    badge: "Derechos",
    badgeColor: "#00555A",
    icon: "DP",
  },
  {
    name: "Centros de atención a víctimas",
    type: "Atención integral",
    desc: "Servicios de salud, asesoría legal y apoyo psicosocial para víctimas de violencia basada en género.",
    badge: "Integral",
    badgeColor: "#DCA15D",
    icon: "CA",
  },
];

type SignalTone = "danger" | "caution" | "emotional" | "support" | "witness" | "report";

const whenToSeekHelp: Array<{ tone: SignalTone; cue: string; label: string; desc: string }> = [
  { tone: "danger", cue: "Urgente", label: "Peligro inmediato", desc: "Sientes que tu integridad física o la de alguien cercano está en riesgo." },
  { tone: "caution", cue: "Alerta", label: "Miedo constante", desc: "Vives con temor a las reacciones de una persona o evitas situaciones por miedo." },
  { tone: "emotional", cue: "Cuidado", label: "Violencia emocional", desc: "Experimentas humillaciones, control excesivo, aislamiento o manipulación." },
  { tone: "support", cue: "Acompañamiento", label: "No sabes a quién acudir", desc: "No tienes con quién hablar o sientes que nadie te creerá." },
  { tone: "witness", cue: "Observación", label: "Eres testigo", desc: "Conoces a alguien que puede estar viviendo una situación de violencia." },
  { tone: "report", cue: "Acción legal", label: "Quieres denunciar", desc: "Deseas iniciar un proceso legal o simplemente necesitas orientación." },
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

const quickSteps = [
  {
    num: "1",
    title: "Cuándo acudir",
    hint: "Señales de alerta y momentos clave para pedir apoyo.",
    href: "#paso-1",
  },
  {
    num: "2",
    title: "A quién contactar",
    hint: "Líneas e instituciones para orientación inmediata.",
    href: "#paso-2",
  },
  {
    num: "3",
    title: "Qué esperar",
    hint: "Cómo suele avanzar el proceso de atención.",
    href: "#paso-3",
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
      {/* Hero */}
      <section style={{ background: "linear-gradient(180deg, #f5f0e1 0%, var(--bg) 100%)", padding: "48px 0 56px" }}>
        <div className="container">
          <div className="rutas-hero-shell">
            <div className="rutas-hero-grid">
              <div className="rutas-hero-copy">
                <h1 className="rutas-hero-title">Rutas de atención</h1>
                <p className="rutas-hero-lead">
                  Si tú o alguien cercano necesita apoyo, aquí tienes una ruta simple para actuar con más claridad.
                </p>
                <p className="rutas-hero-desc">
                  Encontrarás cuándo pedir ayuda, a quién contactar y qué esperar durante el proceso de atención
                  en situaciones de Violencia Basada en Género (VBG).
                </p>
              </div>

              <div className="rutas-hero-nav" aria-label="Pasos principales">
                {quickSteps.map((step) => (
                  <a key={step.num} href={step.href} className="rutas-step-link">
                    <span className="rutas-step-num">{step.num}</span>
                    <span className="rutas-step-copy">
                      <strong>{step.title}</strong>
                      <small>{step.hint}</small>
                    </span>
                    <span className="rutas-step-arrow" aria-hidden="true">&gt;</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PASO 1 */}
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

          <div className="rutas-signal-grid">
            {whenToSeekHelp.map((item) => (
              <article
                key={item.label}
                className={`rutas-signal-card rutas-signal-${item.tone}`}
              >
                <div className="rutas-signal-content">
                  <div className="rutas-signal-head">
                    <h3 className="rutas-signal-title">{item.label}</h3>
                    <span className="rutas-signal-cue">{item.cue}</span>
                  </div>
                  <p className="rutas-signal-desc">{item.desc}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="notice notice-warning rutas-danger-box" style={{ maxWidth: 900, marginTop: 28 }}>
            <div>
              <strong className="rutas-danger-title">Si estás en peligro ahora mismo</strong>
              <p className="rutas-danger-text" style={{ margin: "4px 0 0" }}>
                Llama al <strong>155</strong> o al <strong>123</strong>. No necesitas estar segura/o para pedir ayuda. No estás sola/solo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PASO 2 */}
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

          <h3 className="rutas-step2-subtitle">
            Líneas de emergencia - disponibles las 24 horas
          </h3>
          <div className="rutas-emergency-grid">
            {emergencyContacts.map((c) => (
              <div
                key={c.phone}
                className="rutas-emergency-card"
              >
                <div className="rutas-emergency-phone">
                  {c.phone}
                </div>
                <div className="rutas-emergency-name">
                  {c.name}
                </div>
                <div className="rutas-emergency-desc">{c.desc}</div>
                <a className="rutas-call-btn" href={`tel:${c.phone}`}>
                  Llamar
                </a>
              </div>
            ))}
          </div>

          <h3 className="rutas-step2-subtitle">
            Instituciones de atención
          </h3>
          <div className="rutas-institutions-grid">
            {institutions.map((inst) => (
              <div
                key={inst.name}
                className="rutas-inst-card"
              >
                <div
                  className="rutas-inst-icon"
                  style={{ background: `${inst.badgeColor}14`, color: inst.badgeColor }}
                >
                  {inst.icon}
                </div>
                <div className="rutas-inst-content">
                  <div className="rutas-inst-head">
                    <h4 className="rutas-inst-title">
                      {inst.name}
                    </h4>
                    <span className="badge rutas-inst-badge" style={{ background: `${inst.badgeColor}14`, color: inst.badgeColor }}>
                      {inst.badge}
                    </span>
                  </div>
                  <div className="rutas-inst-type">
                    {inst.type}
                  </div>
                  <p className="rutas-inst-desc">
                    {inst.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PASO 3 */}
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

          <div className="rutas-process-timeline">
            {processSteps.map((step, i) => (
              <article
                key={step.num}
                className={`rutas-process-item ${i === processSteps.length - 1 ? "is-last" : ""}`}
              >
                <div className="rutas-process-marker-col">
                  <div className="rutas-process-marker" style={{ background: step.color }}>
                    {step.num}
                  </div>
                  {i < processSteps.length - 1 && <div className="rutas-process-line" />}
                </div>
                <div className="rutas-process-content">
                  <h3 className="rutas-process-title">{step.title}</h3>
                  <p className="rutas-process-desc">{step.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
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
