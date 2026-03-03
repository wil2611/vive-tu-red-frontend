import styles from "./page.module.css";
import {
  emergencyContacts,
  institutions,
  processSteps,
  quickSteps,
  whenToSeekHelp,
} from "./rutas.data";

export default function RutasPage() {
  return (
    <div>
      {/* Hero */}
      <section className={styles.heroSection}>
        <div className="container">
          <div className="rutas-hero-shell">
            <h1 className="rutas-hero-title">Rutas de atención</h1>
            <p className="rutas-hero-lead">
              Si tú o alguien cercano necesita apoyo, aquí tienes una ruta simple para actuar con más claridad.
              Encontrarás cuándo pedir ayuda, a quién contactar y qué esperar durante el proceso de atención
              en situaciones de Violencia Basada en Género (VBG).
            </p>

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
      </section>

      {/* PASO 1 */}
      <section id="paso-1" className={styles.sectionWarm}>
        <div className={`container ${styles.sectionContainer}`}>
          <div className={styles.stepLabel}>
            <span className={styles.stepNumber}>1</span>
            Paso 1
          </div>
          <div className="accent-bar" />
          <h2 className={styles.sectionTitle}>
            ¿Cuándo acudir?
          </h2>
          <p className={styles.sectionLead}>
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

          <div className={`notice notice-warning rutas-danger-box ${styles.dangerNotice}`}>
            <div>
              <strong className="rutas-danger-title">Si estás en peligro ahora mismo</strong>
              <p className={`rutas-danger-text ${styles.dangerText}`}>
                Llama al <strong>155</strong> o al <strong>123</strong>. No necesitas estar segura/o para pedir ayuda. No estás sola/solo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PASO 2 */}
      <section id="paso-2" className={styles.sectionNeutral}>
        <div className={`container ${styles.sectionContainer}`}>
          <div className={styles.stepLabel}>
            <span className={styles.stepNumber}>2</span>
            Paso 2
          </div>
          <div className="accent-bar" />
          <h2 className={styles.sectionTitle}>
            ¿A quién contactar?
          </h2>
          <p className={styles.sectionLead}>
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
      <section id="paso-3" className={styles.sectionWarm}>
        <div className={`container ${styles.sectionContainer} ${styles.sectionContainerLast}`}>
          <div className={styles.stepLabel}>
            <span className={styles.stepNumber}>3</span>
            Paso 3
          </div>
          <div className="accent-bar" />
          <h2 className={styles.sectionTitle}>
            ¿Qué esperar del proceso?
          </h2>
          <p className={styles.sectionLead}>
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
      <section className={styles.sectionNeutral}>
        <div className={`container ${styles.sectionContainer} ${styles.sectionContainerLast}`}>
          <div className="accent-bar" />
          <h2 className={styles.sectionTitle}>
            Preguntas frecuentes
          </h2>
          <p className={styles.sectionLead}>
            Resolvemos las dudas más comunes sobre cómo funciona el proceso de atención.
          </p>
          <div className={styles.faqGrid}>
            <details>
              <summary>¿Necesito pruebas para pedir ayuda?</summary>
              <div>
                <p className={styles.faqAnswer}>
                  No. No es necesario tener pruebas para solicitar orientación o iniciar un proceso.
                  Tienes derecho a recibir atención, escucha y acompañamiento desde el primer contacto.
                </p>
              </div>
            </details>
            <details>
              <summary>¿Es confidencial el proceso?</summary>
              <div>
                <p className={styles.faqAnswer}>
                  Sí. Las instituciones están obligadas a respetar la confidencialidad. Tu información
                  solo se compartirá con tu consentimiento o ante riesgo inminente para tu vida.
                </p>
              </div>
            </details>
            <details>
              <summary>¿Cómo acompañar a alguien que vive violencia?</summary>
              <div>
                <p className={styles.faqAnswer}>
                  Escucha sin juzgar, valida sus emociones y ofrece información sobre las rutas disponibles.
                  No presiones para que tome decisiones inmediatas. Tu rol como red de apoyo es fundamental.
                  Puedes orientarla/o al 155 o a Bienestar Universitario.
                </p>
              </div>
            </details>
            <details>
              <summary>¿Qué pasa si quiero detener el proceso?</summary>
              <div>
                <p className={styles.faqAnswer}>
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
