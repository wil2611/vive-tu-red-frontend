"use client";

import { useState } from "react";
import Link from "next/link";

const episodes = [
  {
    id: 1,
    title: "Episodio 1 — El comienzo",
    subtitle: "Descubriendo las redes invisibles",
    color: "#C96A4A",
    sections: [
      {
        heading: "Capítulo 1: La llegada",
        content:
          "El contenido del primer capítulo se cargará aquí. Este espacio está reservado para el texto narrativo del cuento de ficción #ViveTuRed, diseñado para sensibilizar a la comunidad universitaria sobre la importancia de las redes de apoyo.",
      },
      {
        heading: "Capítulo 2: Primeros lazos",
        content:
          "El contenido del segundo capítulo se cargará aquí. A través de la narrativa, se exploran las primeras conexiones y vínculos que se forman en el entorno universitario.",
      },
    ],
  },
  {
    id: 2,
    title: "Episodio 2 — La red",
    subtitle: "Tejiendo vínculos de protección",
    color: "#00555A",
    sections: [
      {
        heading: "Capítulo 3: Hilos que conectan",
        content:
          "Contenido del tercer capítulo. Se profundiza en la importancia de reconocer las redes de apoyo y cómo estas pueden activarse en momentos de necesidad.",
      },
      {
        heading: "Capítulo 4: Nudos y fortalezas",
        content:
          "Contenido del cuarto capítulo. Se exploran los desafíos y la resiliencia que surge al fortalecer los vínculos personales e institucionales.",
      },
    ],
  },
  {
    id: 3,
    title: "Episodio 3 — La acción",
    subtitle: "Activando las redes de apoyo",
    color: "#DCA15D",
    sections: [
      {
        heading: "Capítulo 5: Voces que acompañan",
        content:
          "Contenido del quinto capítulo. La narrativa se enfoca en las voces de apoyo y las instituciones que acompañan los procesos de prevención y atención.",
      },
      {
        heading: "Capítulo 6: Vivir la red",
        content:
          "Contenido del sexto y último capítulo. Se cierra el cuento con un mensaje de esperanza y acción colectiva para vivir y sostener las redes de apoyo.",
      },
    ],
  },
];

export default function LibroPage() {
  const [activeEpisode, setActiveEpisode] = useState(0);
  const episode = episodes[activeEpisode];

  return (
    <div>
      {/* Hero */}
      <section style={{ background: "linear-gradient(180deg, #f5f0e1 0%, var(--bg) 100%)", padding: "48px 0 56px" }}>
        <div className="container">
          <h1 style={{ fontSize: "clamp(2rem, 4vw, 2.6rem)", fontWeight: 800, color: "#1D3E2A", margin: "16px 0 12px", fontFamily: "Georgia, serif", lineHeight: 1.15 }}>
            Libro digital #ViveTuRed
          </h1>
          <p style={{ fontSize: "1.05rem", lineHeight: 1.75, color: "#5a7d66", maxWidth: 600, margin: 0 }}>
            Lee el cuento de ficción dividido en 3 episodios. Navega por capítulos,
            descarga en PDF o disfruta la lectura directa en web.
          </p>
        </div>
      </section>

      {/* Opciones de descarga */}
      <section style={{ background: "var(--bg)" }}>
      <div className="container" style={{ paddingTop: 24, paddingBottom: 0 }}>
        <div
          style={{
            display: "flex",
            gap: 8,
            flexWrap: "wrap",
            padding: "16px 0",
          }}
        >
          <span className="badge badge-terracotta">📖 3 episodios</span>
          <span className="badge badge-teal">6 capítulos</span>
          <span className="badge badge-gold">Lectura en línea</span>
        </div>
      </div>

      <hr className="divider" style={{ maxWidth: 1120, margin: "0 auto" }} />
      </section>

      {/* Navegación por episodios */}
      <section style={{ background: "#f5f0e1" }}>
      <div className="container" style={{ paddingTop: 40, paddingBottom: 48 }}>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 32 }}>
          {episodes.map((ep, i) => (
            <button
              key={ep.id}
              onClick={() => setActiveEpisode(i)}
              className="btn"
              style={{
                background: activeEpisode === i ? ep.color : "white",
                color: activeEpisode === i ? "white" : ep.color,
                border: `2px solid ${ep.color}`,
                fontFamily: "ui-sans-serif, system-ui, sans-serif",
              }}
            >
              {ep.title}
            </button>
          ))}
        </div>

        {/* Contenido del episodio activo */}
        <div
          style={{
            maxWidth: 760,
            margin: "0 auto",
          }}
        >
          <div
            style={{
              background: `linear-gradient(135deg, ${episode.color}12, ${episode.color}05)`,
              borderLeft: `4px solid ${episode.color}`,
              borderRadius: "0 12px 12px 0",
              padding: "20px 24px",
              marginBottom: 32,
            }}
          >
            <h2
              style={{
                fontWeight: 800,
                fontSize: "1.3rem",
                color: episode.color,
                margin: 0,
                fontFamily: "ui-sans-serif, system-ui, sans-serif",
              }}
            >
              {episode.title}
            </h2>
            <p style={{ color: "#5a7d66", margin: "4px 0 0", fontSize: 15 }}>
              {episode.subtitle}
            </p>
          </div>

          {/* Capítulos */}
          <div style={{ display: "grid", gap: 16 }}>
            {episode.sections.map((section, idx) => (
              <details key={idx} open={idx === 0}>
                <summary>{section.heading}</summary>
                <div>
                  <p style={{ margin: 0 }}>{section.content}</p>
                </div>
              </details>
            ))}
          </div>

          {/* Navegación entre episodios */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 40,
              gap: 12,
              flexWrap: "wrap",
            }}
          >
            {activeEpisode > 0 && (
              <button
                onClick={() => setActiveEpisode(activeEpisode - 1)}
                className="btn btn-outline"
                style={{ fontSize: 14 }}
              >
                ← Episodio anterior
              </button>
            )}
            <div style={{ flex: 1 }} />
            {activeEpisode < episodes.length - 1 && (
              <button
                onClick={() => setActiveEpisode(activeEpisode + 1)}
                className="btn btn-primary"
                style={{ fontSize: 14 }}
              >
                Siguiente episodio →
              </button>
            )}
          </div>
        </div>
      </div>
      </section>

      {/* Elementos visuales de apoyo */}
      <section style={{ background: "var(--bg)" }}>
      <div className="container" style={{ paddingTop: 48, paddingBottom: 48 }}>
        <div
          className="notice notice-info"
          style={{ maxWidth: 760, margin: "0 auto" }}
        >
          <span style={{ fontSize: 20 }}>ℹ️</span>
          <div>
            <strong style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>Sobre este libro</strong>
            <p style={{ margin: "4px 0 0" }}>
              Este cuento de ficción fue creado como parte del proyecto de investigación–creación #ViveTuRed.
              Los personajes y situaciones son ficticios, pero están inspirados en la realidad de las
              dinámicas de violencia basada en género en entornos universitarios. Si necesitas orientación
              o apoyo, visita la sección de{" "}
              <Link href="/rutas" style={{ color: "#00555A", fontWeight: 700, textDecoration: "underline" }}>
                Rutas de atención
              </Link>.
            </p>
          </div>
        </div>
      </div>
      </section>
    </div>
  );
}
