"use client";

/* eslint-disable @next/next/no-img-element */

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
} from "react";
import { listPublishedNews, type NewsItem } from "@/lib/api";

const MAX_NEWS_ITEMS = 10;
const FEATURED_SUMMARY_MAX_CHARS = 300;
const CARD_SUMMARY_MAX_CHARS = 150;
type NewsImageKind = "landscape" | "square" | "portrait" | "ultraPortrait";

function safeExternalUrl(value: string | null | undefined): string | null {
  if (!value) return null;

  try {
    const parsed = new URL(value);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return null;
    }
    return parsed.toString();
  } catch {
    return null;
  }
}

function formatNewsDate(value: string | null): string {
  if (!value) return "Sin fecha";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return "Sin fecha";

  return new Intl.DateTimeFormat("es-CO", {
    dateStyle: "medium",
  }).format(parsed);
}

function getSummary(item: NewsItem, maxLength: number): string {
  const excerpt = item.excerpt?.trim() ?? "";
  if (excerpt) {
    if (excerpt.length <= maxLength) return excerpt;
    return `${excerpt.slice(0, Math.max(0, maxLength - 3)).trim()}...`;
  }

  const compactBody = item.body.replace(/\s+/g, " ").trim();
  if (compactBody.length <= maxLength) return compactBody;
  return `${compactBody.slice(0, Math.max(0, maxLength - 3)).trim()}...`;
}

function resolveImageKind(naturalWidth: number, naturalHeight: number): NewsImageKind {
  if (!naturalWidth || !naturalHeight) return "landscape";
  const ratio = naturalWidth / naturalHeight;

  if (ratio >= 1.16) return "landscape";
  if (ratio >= 0.92) return "square";
  if (ratio >= 0.62) return "portrait";
  return "ultraPortrait";
}

function readTargetImageKind(target: EventTarget | null): NewsImageKind {
  if (!(target instanceof HTMLImageElement)) {
    return "landscape";
  }

  return resolveImageKind(target.naturalWidth, target.naturalHeight);
}

function isActivationKey(key: string): boolean {
  return key === "Enter" || key === " ";
}

export default function HomeNewsSection() {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [imageKinds, setImageKinds] = useState<Record<string, NewsImageKind>>({});
  const [activeNews, setActiveNews] = useState<NewsItem | null>(null);
  const [headerOffset, setHeaderOffset] = useState(0);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadNews() {
      setIsLoading(true);
      setLoadError(null);

      try {
        const response = await listPublishedNews();
        if (!cancelled) {
          setItems(response.slice(0, MAX_NEWS_ITEMS));
        }
      } catch {
        if (!cancelled) {
          setItems([]);
          setLoadError("No pudimos cargar noticias por ahora.");
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    void loadNews();

    return () => {
      cancelled = true;
    };
  }, []);

  const [featuredItem, secondaryItems] = useMemo(() => {
    if (!items.length) return [null, []] as const;
    return [items[0], items.slice(1)] as const;
  }, [items]);

  const featuredImageKind = featuredItem ? (imageKinds[featuredItem.id] ?? "landscape") : "landscape";

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const updateScrollState = () => {
      const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;
      setCanScrollPrev(carousel.scrollLeft > 2);
      setCanScrollNext(carousel.scrollLeft < maxScrollLeft - 2);
    };

    updateScrollState();
    carousel.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      carousel.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [secondaryItems.length]);

  useEffect(() => {
    if (!activeNews) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const updateHeaderOffset = () => {
      const siteHeader = document.querySelector<HTMLElement>('[data-site-header="true"]');
      const height = siteHeader?.getBoundingClientRect().height ?? 0;
      setHeaderOffset(Math.max(0, Math.round(height)));
    };

    const handleEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveNews(null);
      }
    };

    updateHeaderOffset();
    window.addEventListener("keydown", handleEscape);
    window.addEventListener("resize", updateHeaderOffset);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
      window.removeEventListener("resize", updateHeaderOffset);
      setHeaderOffset(0);
    };
  }, [activeNews]);

  const openNews = (item: NewsItem) => {
    setActiveNews(item);
  };

  const closeNews = () => {
    setActiveNews(null);
  };

  const handleNewsKeyDown = (event: KeyboardEvent<HTMLElement>, item: NewsItem) => {
    if (!isActivationKey(event.key)) return;
    event.preventDefault();
    openNews(item);
  };

  const scrollSecondaryNews = (direction: "prev" | "next") => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    carousel.scrollBy({
      left: direction === "next" ? carousel.clientWidth : -carousel.clientWidth,
      behavior: "smooth",
    });
  };

  const dialogParagraphs = activeNews
    ? activeNews.body
        .split(/\n{2,}/)
        .map((paragraph) => paragraph.trim())
        .filter(Boolean)
    : [];

  const dialogBackdropStyle = {
    "--home-news-header-offset": `${headerOffset}px`,
  } as CSSProperties;

  return (
    <section className="section-soft home-news-section" aria-labelledby="home-news-title">
      <div className="container">
        <div className="home-news-head">
          <h2 id="home-news-title" className="section-title home-news-title">
            Noticias de <span>#ViveTuRed</span>
          </h2>
          <p className="home-news-lead">
            Actualizaciones del proyecto, actividades y publicaciones para mantener a la comunidad
            informada.
          </p>
        </div>

        {isLoading ? (
          <div className="home-news-loading">
            <div className="home-news-skeleton home-news-skeleton-featured" />
            <div className="home-news-skeleton-row">
              <div className="home-news-skeleton home-news-skeleton-card" />
              <div className="home-news-skeleton home-news-skeleton-card" />
              <div className="home-news-skeleton home-news-skeleton-card" />
            </div>
          </div>
        ) : null}

        {!isLoading && loadError ? <p className="home-news-empty">{loadError}</p> : null}

        {!isLoading && !loadError && featuredItem ? (
          <div className="home-news-layout">
            <article
              className={`home-news-featured home-news-featured-${featuredImageKind}`}
            >
              {safeExternalUrl(featuredItem.coverImageUrl) ? (
                <div className={`home-news-featured-media home-news-media-${featuredImageKind}`}>
                  <img
                    src={safeExternalUrl(featuredItem.coverImageUrl) ?? ""}
                    alt={featuredItem.coverImageAlt?.trim() || `Portada: ${featuredItem.title}`}
                    loading="lazy"
                    decoding="async"
                    onLoad={(event) => {
                      const kind = readTargetImageKind(event.currentTarget);
                      setImageKinds((prev) => {
                        if (prev[featuredItem.id] === kind) return prev;
                        return { ...prev, [featuredItem.id]: kind };
                      });
                    }}
                  />
                </div>
              ) : (
                <div className="home-news-featured-media home-news-featured-placeholder" aria-hidden="true">
                  <span>Noticia destacada</span>
                </div>
              )}

              <div className="home-news-featured-body">
                <h3>{featuredItem.title}</h3>
                <p className="home-news-featured-date">{formatNewsDate(featuredItem.publishedAt)}</p>
                <p className="home-news-featured-summary">
                  {getSummary(featuredItem, FEATURED_SUMMARY_MAX_CHARS)}
                </p>
                <button
                  type="button"
                  className="home-news-read-more"
                  onClick={() => openNews(featuredItem)}
                >
                  Ver más
                </button>
              </div>
            </article>

            {secondaryItems.length ? (
              <div className="home-news-carousel-wrap">
                <div className="home-news-carousel-header">
                  <h3>Más noticias</h3>
                  <div className="home-news-carousel-controls" aria-label="Explorar más noticias">
                    <button
                      type="button"
                      onClick={() => scrollSecondaryNews("prev")}
                      disabled={!canScrollPrev}
                      aria-label="Ver noticias anteriores"
                    >
                      &lt;
                    </button>
                    <button
                      type="button"
                      onClick={() => scrollSecondaryNews("next")}
                      disabled={!canScrollNext}
                      aria-label="Ver noticias siguientes"
                    >
                      &gt;
                    </button>
                  </div>
                </div>
                <div className="home-news-carousel" ref={carouselRef}>
                  {secondaryItems.map((item) => (
                    <article
                      key={item.id}
                      className="home-news-card home-news-item-clickable"
                      role="button"
                      tabIndex={0}
                      onClick={() => openNews(item)}
                      onKeyDown={(event) => handleNewsKeyDown(event, item)}
                      aria-label={`Abrir noticia: ${item.title}`}
                    >
                      {safeExternalUrl(item.coverImageUrl) ? (
                        <div className="home-news-card-media">
                          <img
                            src={safeExternalUrl(item.coverImageUrl) ?? ""}
                            alt={item.coverImageAlt?.trim() || `Portada: ${item.title}`}
                            loading="lazy"
                            decoding="async"
                          />
                        </div>
                      ) : (
                        <div
                          className="home-news-card-media home-news-card-media-placeholder"
                          aria-hidden="true"
                        />
                      )}
                      <div className="home-news-card-body">
                        <h4>{item.title}</h4>
                        <p className="home-news-card-date">{formatNewsDate(item.publishedAt)}</p>
                        <p className="home-news-card-summary">{getSummary(item, CARD_SUMMARY_MAX_CHARS)}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        ) : null}

        {!isLoading && !loadError && !featuredItem ? (
          <p className="home-news-empty">Aún no hay noticias publicadas. Vuelve pronto.</p>
        ) : null}
      </div>

      {activeNews ? (
        <div
          className="home-news-dialog-backdrop"
          style={dialogBackdropStyle}
          onClick={closeNews}
          role="presentation"
        >
          <article
            className="home-news-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="home-news-dialog-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="home-news-dialog-close"
              onClick={closeNews}
              aria-label="Cerrar noticia"
            >
              Cerrar
            </button>

            {safeExternalUrl(activeNews.coverImageUrl) ? (
              <div className="home-news-dialog-media">
                <img
                  src={safeExternalUrl(activeNews.coverImageUrl) ?? ""}
                  alt={activeNews.coverImageAlt?.trim() || `Portada: ${activeNews.title}`}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            ) : null}

            <div className="home-news-dialog-body">
              <p className="home-news-dialog-date">
                {formatNewsDate(activeNews.publishedAt)}
                {activeNews.authorName?.trim() ? ` | ${activeNews.authorName.trim()}` : ""}
              </p>
              <h3 id="home-news-dialog-title">{activeNews.title}</h3>

              {activeNews.excerpt?.trim() ? (
                <p className="home-news-dialog-excerpt">{activeNews.excerpt.trim()}</p>
              ) : null}

              <div className="home-news-dialog-content">
                {dialogParagraphs.length ? (
                  dialogParagraphs.map((paragraph, index) => <p key={`${index}-${paragraph.slice(0, 24)}`}>{paragraph}</p>)
                ) : (
                  <p>{activeNews.body}</p>
                )}
              </div>
            </div>
          </article>
        </div>
      ) : null}
    </section>
  );
}
