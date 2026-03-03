"use client";

import { useState } from "react";
import Link from "next/link";

const subjectOptions = [
  { value: "", label: "Selecciona un asunto" },
  { value: "consulta", label: "Consulta general" },
  { value: "sugerencia", label: "Sugerencia" },
  { value: "colaboracion", label: "Propuesta de colaboración" },
  { value: "recursos", label: "Solicitud de recursos" },
  { value: "otro", label: "Otro" },
];

const contactCards = [
  {
    title: "Correo institucional",
    value: "contacto@vivetured.edu.co",
    href: "mailto:contacto@vivetured.edu.co",
    hint: "Canal para consultas, sugerencias y articulaciones.",
  },
  {
    title: "Ubicación",
    value: "Universidad del Norte, Barranquilla",
    hint: "Facultad de Ciencias Sociales y Humanas.",
  },
  {
    title: "Horario de atención",
    value: "Lunes a viernes, 8:00 a.m. - 5:00 p.m.",
    hint: "Respuesta estimada en 3 a 5 días hábiles.",
  },
];

export default function ContactoPage() {
  const [form, setForm] = useState({ nombre: "", email: "", asunto: "", mensaje: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica de envío
    setSent(true);
  };

  return (
    <div>
      {/* Hero */}
      <section style={{ background: "linear-gradient(180deg, #f5f0e1 0%, var(--bg) 100%)", padding: "48px 0 56px" }}>
        <div className="container">
          <div className="contacto-hero-shell">
            <h1 className="contacto-hero-title">Contáctanos</h1>
            <p className="contacto-hero-desc">
              Este es el canal institucional del proyecto #ViveTuRed para consultas generales,
              sugerencias y propuestas de colaboración.
            </p>
            <div className="notice notice-warning contacto-hero-alert">
              <span style={{ fontSize: 16 }}>⚠️</span>
              <div>
                <strong style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>Si necesitas ayuda inmediata</strong>
                <p style={{ margin: "4px 0 0", fontSize: 13 }}>
                  Usa primero las{" "}
                  <Link href="/rutas" style={{ color: "#a8553a", fontWeight: 700, textDecoration: "underline" }}>
                    Rutas de atención
                  </Link>{" "}
                  para recibir orientación prioritaria.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: "#f5f0e1" }}>
      <div className="container contacto-main">
        <div className="contacto-grid">
          {/* Formulario */}
          <article id="formulario" className="contacto-panel">
            <div className="accent-bar" />
            <h2 className="contacto-panel-title">
              Formulario de contacto
            </h2>
            <p className="contacto-panel-desc">
              Este formulario es para consultas generales. No envíes información sensible o personal
              a través de este medio.
            </p>

            {sent ? (
              <div className="contacto-sent-box">
                <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
                <h3 className="contacto-sent-title">
                  Mensaje enviado
                </h3>
                <p className="contacto-sent-desc">
                  Tu mensaje ha sido recibido. Te responderemos a la brevedad posible.
                </p>
                <button
                  className="btn btn-outline"
                  onClick={() => {
                    setSent(false);
                    setForm({ nombre: "", email: "", asunto: "", mensaje: "" });
                  }}
                  style={{ marginTop: 16, fontSize: 14 }}
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contacto-form">
                <div className="contacto-field">
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
                <div className="contacto-field">
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
                <div className="contacto-field">
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
                <div className="contacto-field">
                  <label htmlFor="mensaje">Mensaje</label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    value={form.mensaje}
                    onChange={handleChange}
                    placeholder="Escribe tu mensaje aquí..."
                    rows={5}
                    required
                    style={{ resize: "vertical" }}
                  />
                </div>

                <div className="notice notice-warning contacto-warning">
                  <span style={{ fontSize: 16 }}>⚠️</span>
                  <p style={{ margin: 0, fontSize: 13 }}>
                    No envíes datos sensibles ni información personal a través de este formulario.
                    Si necesitas apoyo o atención, visita las{" "}
                    <Link href="/rutas" style={{ color: "#a8553a", fontWeight: 700, textDecoration: "underline" }}>
                      Rutas de atención
                    </Link>.
                  </p>
                </div>

                <button className="btn btn-primary contacto-form-submit" type="submit">
                  Enviar mensaje
                </button>
              </form>
            )}
          </article>

          {/* Info lateral */}
          <aside id="canales" className="contacto-panel">
            <div className="accent-bar" />
            <h2 className="contacto-panel-title">
              Canales institucionales
            </h2>
            <p className="contacto-panel-desc">
              Escríbenos por correo o usa el formulario. Si se trata de una situación de riesgo,
              prioriza las rutas de atención inmediata.
            </p>

            <div className="contacto-meta-list">
              {contactCards.map((item) => (
                <article key={item.title} className="contacto-meta-card">
                  <div className="contacto-meta-copy">
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

            <div className="notice notice-info contacto-note">
              <span style={{ fontSize: 16 }}>ℹ️</span>
              <div>
                <strong style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>Tiempo de respuesta</strong>
                <p style={{ margin: "4px 0 0", fontSize: 13 }}>
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
