"use client";

import { useState } from "react";

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
          <span className="hero-badge">Comunicación</span>
          <h1 style={{ fontSize: "clamp(2rem, 4vw, 2.6rem)", fontWeight: 800, color: "#1D3E2A", margin: "16px 0 12px", fontFamily: "Georgia, serif", lineHeight: 1.15 }}>
            Contacto
          </h1>
          <p style={{ fontSize: "1.05rem", lineHeight: 1.75, color: "#5a7d66", maxWidth: 600, margin: 0 }}>
            Canal de comunicación institucional del proyecto #ViveTuRed.
            Escríbenos para consultas generales, sugerencias o colaboraciones.
          </p>
        </div>
      </section>

      <section style={{ background: "#f5f0e1" }}>
      <div className="container" style={{ paddingTop: 48, paddingBottom: 56 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 32,
            alignItems: "start",
          }}
        >
          {/* Formulario */}
          <div>
            <div className="accent-bar" />
            <h2 style={{ fontSize: "1.3rem", fontWeight: 800, color: "#1D3E2A", marginBottom: 8, fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
              Formulario de contacto
            </h2>
            <p style={{ color: "#5a7d66", marginBottom: 24, lineHeight: 1.7, fontSize: 14 }}>
              Este formulario es para consultas generales. No envíes información sensible o personal
              a través de este medio.
            </p>

            {sent ? (
              <div
                style={{
                  background: "rgba(29, 62, 42, 0.06)",
                  border: "1px solid rgba(29, 62, 42, 0.15)",
                  borderRadius: 16,
                  padding: 32,
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
                <h3 style={{ fontWeight: 700, color: "#1D3E2A", marginBottom: 8, fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
                  Mensaje enviado
                </h3>
                <p style={{ color: "#5a7d66", lineHeight: 1.7, fontSize: 14 }}>
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
              <form onSubmit={handleSubmit} style={{ display: "grid", gap: 20 }}>
                <div>
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
                <div>
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
                <div>
                  <label htmlFor="asunto">Asunto</label>
                  <select
                    id="asunto"
                    name="asunto"
                    value={form.asunto}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Selecciona un asunto</option>
                    <option value="consulta">Consulta general</option>
                    <option value="sugerencia">Sugerencia</option>
                    <option value="colaboracion">Propuesta de colaboración</option>
                    <option value="recursos">Solicitud de recursos</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>
                <div>
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

                <div className="notice notice-warning" style={{ margin: 0 }}>
                  <span style={{ fontSize: 16 }}>⚠️</span>
                  <p style={{ margin: 0, fontSize: 13 }}>
                    No envíes datos sensibles ni información personal a través de este formulario.
                    Si necesitas apoyo o atención, visita las{" "}
                    <a href="/rutas" style={{ color: "#a8553a", fontWeight: 700, textDecoration: "underline" }}>
                      Rutas de atención
                    </a>.
                  </p>
                </div>

                <button className="btn btn-primary" type="submit" style={{ justifySelf: "start" }}>
                  Enviar mensaje
                </button>
              </form>
            )}
          </div>

          {/* Info lateral */}
          <div>
            <div className="accent-bar" />
            <h2 style={{ fontSize: "1.3rem", fontWeight: 800, color: "#1D3E2A", marginBottom: 24, fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
              Información de contacto
            </h2>

            <div style={{ display: "grid", gap: 16 }}>
              {/* Correo */}
              <div
                style={{
                  padding: 20,
                  background: "white",
                  borderRadius: 16,
                  border: "1px solid var(--border)",
                  display: "flex",
                  gap: 16,
                  alignItems: "flex-start",
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: "rgba(201, 106, 74, 0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 20,
                    flexShrink: 0,
                  }}
                >
                  📧
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15, color: "#1D3E2A", fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
                    Correo institucional
                  </div>
                  <div style={{ fontSize: 14, color: "#5a7d66", marginTop: 4 }}>
                    contacto@vivetured.edu.co
                  </div>
                </div>
              </div>

              {/* Ubicación */}
              <div
                style={{
                  padding: 20,
                  background: "white",
                  borderRadius: 16,
                  border: "1px solid var(--border)",
                  display: "flex",
                  gap: 16,
                  alignItems: "flex-start",
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: "rgba(0, 85, 90, 0.06)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 20,
                    flexShrink: 0,
                  }}
                >
                  📍
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15, color: "#1D3E2A", fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
                    Ubicación
                  </div>
                  <div style={{ fontSize: 14, color: "#5a7d66", marginTop: 4, lineHeight: 1.6 }}>
                    Universidad — Facultad de Ciencias Sociales y Humanas
                  </div>
                </div>
              </div>

              {/* Horario */}
              <div
                style={{
                  padding: 20,
                  background: "white",
                  borderRadius: 16,
                  border: "1px solid var(--border)",
                  display: "flex",
                  gap: 16,
                  alignItems: "flex-start",
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: "rgba(220, 161, 93, 0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 20,
                    flexShrink: 0,
                  }}
                >
                  🕐
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15, color: "#1D3E2A", fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
                    Horario de atención
                  </div>
                  <div style={{ fontSize: 14, color: "#5a7d66", marginTop: 4, lineHeight: 1.6 }}>
                    Lunes a viernes: 8:00 a.m. – 5:00 p.m.
                  </div>
                </div>
              </div>
            </div>

            {/* Nota */}
            <div
              className="notice notice-info"
              style={{ marginTop: 20 }}
            >
              <span style={{ fontSize: 16 }}>ℹ️</span>
              <p style={{ margin: 0, fontSize: 13 }}>
                Las respuestas se realizarán en un plazo de 3 a 5 días hábiles.
                Para situaciones de emergencia, contacta directamente las{" "}
                <a href="/rutas" style={{ color: "#00555A", fontWeight: 700, textDecoration: "underline" }}>
                  líneas de atención
                </a>.
              </p>
            </div>
          </div>
        </div>
      </div>
      </section>
    </div>
  );
}
