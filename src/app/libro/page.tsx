"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";
import { episodes } from "./libro.data";

export default function LibroPage() {
  const [activeEpisode, setActiveEpisode] = useState(0);
  const episode = episodes[activeEpisode];

  return (
    <div>
      {/* Hero */}
      <section className={styles.heroSection}>
        <div className="container">
          <h1 className={styles.heroTitle}>
            Libro digital #ViveTuRed
          </h1>
          <p className={styles.heroDesc}>
            Lee el cuento de ficcion dividido en 3 episodios. Navega por capitulos,
            descarga en PDF o disfruta la lectura directa en web.
          </p>
        </div>
      </section>

      {/* Opciones de lectura */}
      <section className={styles.metaSection}>
        <div className={`container ${styles.metaContainer}`}>
          <div className={styles.metaBadges}>
            <span className="badge badge-terracotta">3 episodios</span>
            <span className="badge badge-teal">6 capitulos</span>
            <span className="badge badge-gold">Lectura en linea</span>
          </div>
        </div>

        <hr className={`divider ${styles.divider}`} />
      </section>

      {/* Navegacion por episodios */}
      <section className={styles.readerSection}>
        <div className={`container ${styles.readerContainer}`}>
          <div className={styles.episodeTabs}>
            {episodes.map((ep, i) => (
              <button
                key={ep.id}
                onClick={() => setActiveEpisode(i)}
                className={`btn ${styles.episodeTab}`}
                style={{
                  background: activeEpisode === i ? ep.color : "white",
                  color: activeEpisode === i ? "white" : ep.color,
                  border: `2px solid ${ep.color}`,
                }}
              >
                {ep.title}
              </button>
            ))}
          </div>

          {/* Contenido del episodio activo */}
          <div className={styles.episodePanel}>
            <div
              className={styles.episodeHeader}
              style={{
                background: `linear-gradient(135deg, ${episode.color}12, ${episode.color}05)`,
                borderLeft: `4px solid ${episode.color}`,
              }}
            >
              <h2 className={styles.episodeTitle} style={{ color: episode.color }}>
                {episode.title}
              </h2>
              <p className={styles.episodeSubtitle}>
                {episode.subtitle}
              </p>
            </div>

            {/* Capitulos */}
            <div className={styles.chapterList}>
              {episode.sections.map((section, idx) => (
                <details key={idx} open={idx === 0}>
                  <summary>{section.heading}</summary>
                  <div>
                    <p className={styles.chapterText}>{section.content}</p>
                  </div>
                </details>
              ))}
            </div>

            {/* Navegacion entre episodios */}
            <div className={styles.episodeNav}>
              {activeEpisode > 0 && (
                <button
                  onClick={() => setActiveEpisode(activeEpisode - 1)}
                  className={`btn btn-outline ${styles.navButton}`}
                >
                  &larr; Episodio anterior
                </button>
              )}
              <div className={styles.spacer} />
              {activeEpisode < episodes.length - 1 && (
                <button
                  onClick={() => setActiveEpisode(activeEpisode + 1)}
                  className={`btn btn-primary ${styles.navButton}`}
                >
                  Siguiente episodio &rarr;
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Nota sobre el libro */}
      <section className={styles.aboutSection}>
        <div className={`container ${styles.aboutContainer}`}>
          <div className={`notice notice-info ${styles.aboutNotice}`}>
            <span className={styles.aboutIcon}>i</span>
            <div>
              <strong className={styles.aboutTitle}>Sobre este libro</strong>
              <p className={styles.aboutText}>
                Este cuento de ficcion fue creado como parte del proyecto de investigacion-creacion #ViveTuRed.
                Los personajes y situaciones son ficticios, pero estan inspirados en la realidad de las
                dinamicas de violencia basada en genero en entornos universitarios. Si necesitas orientacion
                o apoyo, visita la seccion de{" "}
                <Link href="/rutas" className={styles.aboutLink}>
                  Rutas de atencion
                </Link>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
