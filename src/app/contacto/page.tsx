"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import styles from "./page.module.css";
import { contactCards, createInitialContactForm, subjectOptions, type ContactFormState } from "./contacto.data";
import { ApiClientError, createContactMessage } from "@/lib/api";
import { recordInteraction } from "@/lib/analytics/tracker";

export default function ContactoPage() {
  const [form, setForm] = useState<ContactFormState>(createInitialContactForm);
  const [sent, setSent] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSending(true);

    try {
      await createContactMessage({
        name: form.nombre.trim(),
        email: form.email.trim(),
        subject: form.asunto.trim() || "consulta",
        message: form.mensaje.trim(),
      });

      setSent(true);

      void recordInteraction({
        type: "contact_submitted",
        targetType: "contact",
        metadata: {
          subject: form.asunto.trim() || "consulta",
        },
      });
    } catch (err) {
      const message =
        err instanceof ApiClientError && err.status === 429
          ? "Ya recibimos un mensaje muy similar hace poco. Espera un momento antes de reenviar."
          : err instanceof Error
            ? err.message
            : "No se pudo enviar el mensaje";
      setError(message);
    } finally {
      setIsSending(false);
    }
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
          </div>
        </div>
      </section>

      <section className="section-cream">
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
                      Si necesitas apoyo o atención, contacta directamente a los canales institucionales
                      disponibles en tu entorno.
                    </p>
                  </div>

                  {error ? (
                    <div className={`notice notice-warning ${styles.warning}`}>
                      <span className={styles.alertIcon}>⚠️</span>
                      <p className={styles.warningText}>{error}</p>
                    </div>
                  ) : null}

                  <button
                    className={`btn btn-primary ${styles.formSubmit}`}
                    type="submit"
                    disabled={isSending}
                  >
                    {isSending ? "Enviando..." : "Enviar mensaje"}
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
                prioriza los canales institucionales de atención inmediata.
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
