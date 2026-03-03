"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import Link from "next/link";
import styles from "./page.module.css";
import { contactCards, createInitialContactForm, subjectOptions, type ContactFormState } from "./contacto.data";

export default function ContactoPage() {
  const [form, setForm] = useState<ContactFormState>(createInitialContactForm);
  const [sent, setSent] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Aqui iria la logica de envio
    setSent(true);
  };

  return (
    <div>
      {/* Hero */}
      <section className={styles.heroSection}>
        <div className="container">
          <div className={styles.heroShell}>
            <h1 className={styles.heroTitle}>Contáctanos</h1>
            <p className={styles.heroDesc}>
              Este es el canal institucional del proyecto #ViveTuRed para consultas generales,
              sugerencias y propuestas de colaboración.
            </p>
            <div className={`notice notice-warning ${styles.heroAlert}`}>
              <span className={styles.alertIcon}>⚠️</span>
              <div>
                <strong className={styles.alertTitle}>Si necesitas ayuda inmediata</strong>
                <p className={styles.alertText}>
                  Usa primero las{" "}
                  <Link href="/rutas" className={styles.alertLink}>
                    Rutas de atención
                  </Link>{" "}
                  para recibir orientación prioritaria.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.mainSection}>
        <div className={`container ${styles.mainContainer}`}>
          <div className={styles.grid}>
            {/* Formulario */}
            <article id="formulario" className={styles.panel}>
              <div className="accent-bar" />
              <h2 className={styles.panelTitle}>
                Formulario de contacto
              </h2>
              <p className={styles.panelDesc}>
                Este formulario es para consultas generales. No envíes información sensible o personal
                a través de este medio.
              </p>

              {sent ? (
                <div className={styles.sentBox}>
                  <div className={styles.sentIcon}>✅</div>
                  <h3 className={styles.sentTitle}>
                    Mensaje enviado
                  </h3>
                  <p className={styles.sentDesc}>
                    Tu mensaje ha sido recibido. Te responderemos a la brevedad posible.
                  </p>
                  <button
                    className={`btn btn-outline ${styles.resetButton}`}
                    onClick={() => {
                      setSent(false);
                      setForm(createInitialContactForm());
                    }}
                  >
                    Enviar otro mensaje
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className={styles.form}>
                  <div className={styles.field}>
                    <label htmlFor="nombre">Nombre</label>
                    <input
                      id="nombre"
                      name="nombre"
                      type="text"
                      value={form.nombre}
                      onChange={handleChange}
                      placeholder="Tu nombre"
                      required
                    />
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="email">Correo electrónico</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="correo@ejemplo.com"
                      required
                    />
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="asunto">Asunto</label>
                    <select
                      id="asunto"
                      name="asunto"
                      value={form.asunto}
                      onChange={handleChange}
                      required
                    >
                      {subjectOptions.map((option) => (
                        <option key={option.value || "default"} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="mensaje">Mensaje</label>
                    <textarea
                      id="mensaje"
                      name="mensaje"
                      value={form.mensaje}
                      onChange={handleChange}
                      placeholder="Escribe tu mensaje aquí..."
                      rows={5}
                      required
                      className={styles.textarea}
                    />
                  </div>

                  <div className={`notice notice-warning ${styles.warning}`}>
                    <span className={styles.alertIcon}>⚠️</span>
                    <p className={styles.warningText}>
                      No envíes datos sensibles ni información personal a través de este formulario.
                      Si necesitas apoyo o atención, visita las{" "}
                      <Link href="/rutas" className={styles.alertLink}>
                        Rutas de atención
                      </Link>.
                    </p>
                  </div>

                  <button className={`btn btn-primary ${styles.formSubmit}`} type="submit">
                    Enviar mensaje
                  </button>
                </form>
              )}
            </article>

            {/* Info lateral */}
            <aside id="canales" className={styles.panel}>
              <div className="accent-bar" />
              <h2 className={styles.panelTitle}>
                Canales institucionales
              </h2>
              <p className={styles.panelDesc}>
                Escríbenos por correo o usa el formulario. Si se trata de una situación de riesgo,
                prioriza las rutas de atención inmediata.
              </p>

              <div className={styles.metaList}>
                {contactCards.map((item) => (
                  <article key={item.title} className={styles.metaCard}>
                    <div className={styles.metaCopy}>
                      <h3>{item.title}</h3>
                      {item.href ? (
                        <a href={item.href}>{item.value}</a>
                      ) : (
                        <p>{item.value}</p>
                      )}
                      <small>{item.hint}</small>
                    </div>
                  </article>
                ))}
              </div>

              <div className={`notice notice-info ${styles.note}`}>
                <span className={styles.alertIcon}>ℹ️</span>
                <div>
                  <strong className={styles.alertTitle}>Tiempo de respuesta</strong>
                  <p className={styles.noteText}>
                    Te responderemos en un plazo aproximado de 3 a 5 días hábiles.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
