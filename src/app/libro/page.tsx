"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";
import { episodes } from "./libro.data";

interface BookPage {
  id: string;
  episodeId: number;
  episodeTitle: string;
  episodeColor: string;
  chapterTitle: string;
  chapterText: string;
  pageNumber: number;
}

type TurnDirection = "next" | "prev";

const bookPages: BookPage[] = episodes
  .flatMap((episode) =>
    episode.sections.map((section) => ({
      id: `${episode.id}-${section.heading}`,
      episodeId: episode.id,
      episodeTitle: episode.title,
      episodeColor: episode.color,
      chapterTitle: section.heading,
      chapterText: section.content,
      pageNumber: 0,
    })),
  )
  .map((page, index) => ({
    ...page,
    pageNumber: index + 1,
  }));

const totalSpreads = Math.ceil(bookPages.length / 2);

function PageSheet({ page, side }: { page?: BookPage; side: "left" | "right" }) {
  if (!page) {
    return (
      <article className={`${styles.pageSheet} ${side === "left" ? styles.leftSheet : styles.rightSheet} ${styles.pageBlank}`}>
        <span className={styles.blankMark}>#ViveTuRed</span>
      </article>
    );
  }

  return (
    <article className={`${styles.pageSheet} ${side === "left" ? styles.leftSheet : styles.rightSheet}`}>
      <div className={styles.pageHead}>
        <span className={styles.episodeTag} style={{ background: `${page.episodeColor}18`, color: page.episodeColor }}>
          {page.episodeTitle}
        </span>
        <span className={styles.pageNumber}>Pag. {page.pageNumber}</span>
      </div>

      <h3 className={styles.chapterTitle}>{page.chapterTitle}</h3>
      <p className={styles.chapterBody}>{page.chapterText}</p>
    </article>
  );
}

export default function LibroPage() {
  const [spreadIndex, setSpreadIndex] = useState(0);
  const [isTurning, setIsTurning] = useState(false);
  const [turnDirection, setTurnDirection] = useState<TurnDirection>("next");
  const turnTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (turnTimeoutRef.current !== null) {
        window.clearTimeout(turnTimeoutRef.current);
      }
    };
  }, []);

  const leftPage = bookPages[spreadIndex * 2];
  const rightPage = bookPages[spreadIndex * 2 + 1];
  const activeEpisodeIds = useMemo(
    () => new Set([leftPage?.episodeId, rightPage?.episodeId].filter(Boolean) as number[]),
    [leftPage, rightPage],
  );

  const canGoPrev = spreadIndex > 0;
  const canGoNext = spreadIndex < totalSpreads - 1;

  const turnToSpread = (nextSpread: number) => {
    if (nextSpread < 0 || nextSpread >= totalSpreads || nextSpread === spreadIndex || isTurning) return;

    setTurnDirection(nextSpread > spreadIndex ? "next" : "prev");
    setIsTurning(true);

    if (turnTimeoutRef.current !== null) {
      window.clearTimeout(turnTimeoutRef.current);
    }

    turnTimeoutRef.current = window.setTimeout(() => {
      setSpreadIndex(nextSpread);
      setIsTurning(false);
    }, 260);
  };

  const goToEpisode = (episodeId: number) => {
    const pageIndex = bookPages.findIndex((page) => page.episodeId === episodeId);
    if (pageIndex === -1) return;
    turnToSpread(Math.floor(pageIndex / 2));
  };

  return (
    <div>
      {/* Hero */}
      <section className={styles.heroSection}>
        <div className="container">
          <div className={styles.heroShell}>
            <h1 className={styles.heroTitle}>Libro digital #ViveTuRed</h1>
            <p className={styles.heroDesc}>
              Un cuento de ficcion en formato interactivo para leer como un libro:
              cambia paginas, explora episodios y recorre cada capitulo en orden.
            </p>

            <div className={styles.heroPills}>
              <span className="badge badge-terracotta">3 episodios</span>
              <span className="badge badge-teal">6 capitulos</span>
              <span className="badge badge-gold">Modo lectura</span>
            </div>
          </div>
        </div>
      </section>

      {/* Lector */}
      <section className={styles.readerSection}>
        <div className={`container ${styles.readerContainer}`}>
          <div className={styles.episodeTabs}>
            {episodes.map((episode) => (
              <button
                key={episode.id}
                type="button"
                onClick={() => goToEpisode(episode.id)}
                className={`btn ${styles.episodeTab} ${activeEpisodeIds.has(episode.id) ? styles.episodeTabActive : ""}`}
                style={
                  activeEpisodeIds.has(episode.id)
                    ? { background: episode.color, borderColor: episode.color, color: "white" }
                    : { borderColor: episode.color, color: episode.color }
                }
              >
                {episode.title}
              </button>
            ))}
          </div>

          <div className={styles.readingMeta}>
            <span>
              Pliego {spreadIndex + 1} de {totalSpreads}
            </span>
            <span>
              Paginas {leftPage?.pageNumber ?? "-"}{rightPage ? ` - ${rightPage.pageNumber}` : ""}
            </span>
          </div>

          <div className={styles.bookShell}>
            <div
              className={[
                styles.bookStage,
                isTurning && turnDirection === "next" ? styles.turnNext : "",
                isTurning && turnDirection === "prev" ? styles.turnPrev : "",
              ].join(" ")}
            >
              <div className={styles.bookSpine} />
              <PageSheet page={leftPage} side="left" />
              <PageSheet page={rightPage} side="right" />
            </div>
          </div>

          <div className={styles.navRow}>
            <button
              type="button"
              onClick={() => turnToSpread(spreadIndex - 1)}
              className={`btn btn-outline ${styles.navButton}`}
              disabled={!canGoPrev || isTurning}
            >
              &larr; Paginas anteriores
            </button>

            <div className={styles.navHint}>
              {isTurning ? "Pasando pagina..." : "Usa los botones para pasar paginas"}
            </div>

            <button
              type="button"
              onClick={() => turnToSpread(spreadIndex + 1)}
              className={`btn btn-primary ${styles.navButton}`}
              disabled={!canGoNext || isTurning}
            >
              Paginas siguientes &rarr;
            </button>
          </div>
        </div>
      </section>

      {/* Nota */}
      <section className={styles.noteSection}>
        <div className={`container ${styles.noteContainer}`}>
          <div className={`notice notice-info ${styles.noteBox}`}>
            <span className={styles.noteIcon}>i</span>
            <div>
              <strong className={styles.noteTitle}>Sobre este libro</strong>
              <p className={styles.noteText}>
                Este cuento de ficcion hace parte del proyecto de investigacion-creacion #ViveTuRed.
                Si necesitas orientacion o apoyo, visita la seccion de{" "}
                <Link href="/rutas" className={styles.noteLink}>
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
