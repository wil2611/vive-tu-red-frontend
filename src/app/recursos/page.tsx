"use client";

import Image from "next/image";
import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { listPublishedResources, trackResourceOpen, type ResourceRecord } from "@/lib/api";
import styles from "./page.module.css";
import { categories, getResourcesByCategory } from "./recursos.data";
import { normalizeResourceCategory, type ResourceCategoryId } from "@/lib/resources/resource-categories";

function getSafeExternalUrl(value: string | null | undefined): string | null {
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

const SECTION_CONFIG: Record<
  ResourceCategoryId,
  {
    sectionClassName: string;
    containerClassName: string;
    title: string;
    description: string;
  }
> = {
  prevencion: {
    sectionClassName: "section-cream",
    containerClassName: styles.sectionContainer,
    title: "Herramientas para la prevención",
    description:
      "Materiales para reconocer la VBG, identificar señales de alerta y fortalecer la cultura de prevención.",
  },
  orientacion: {
    sectionClassName: "section-soft",
    containerClassName: styles.sectionContainer,
    title: "Materiales de apoyo y orientación",
    description:
      "Guías e infografías para reconocer opciones de apoyo y orientación institucional.",
  },
  formacion: {
    sectionClassName: "section-cream",
    containerClassName: `${styles.sectionContainer} ${styles.sectionContainerLast}`,
    title: "Recursos para la formación",
    description:
      "Manuales, guías metodológicas e instrumentos para docentes, facilitadores/as e investigadores/as.",
  },
};

const CATEGORY_ICONS: Record<ResourceCategoryId, string> = {
  prevencion: "/prevencion.png",
  orientacion: "/orientacion.png",
  formacion: "/formacion.png",
};

export default function RecursosPage() {
  const [resources, setResources] = useState<ResourceRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadResources() {
      setIsLoading(true);
      setLoadError(null);
      try {
        const response = await listPublishedResources();
        if (!cancelled) {
          setResources(response);
        }
      } catch {
        if (!cancelled) {
          setLoadError("No se pudieron cargar los recursos en este momento.");
          setResources([]);
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    void loadResources();

    return () => {
      cancelled = true;
    };
  }, []);

  const resourcesByCategory = useMemo(
    () => ({
      prevencion: getResourcesByCategory(resources, "prevencion"),
      orientacion: getResourcesByCategory(resources, "orientacion"),
      formacion: getResourcesByCategory(resources, "formacion"),
    }),
    [resources],
  );

  return (
    <div>
      <section className={styles.heroSection}>
        <div className="container">
          <div className={styles.heroShell}>
            <h1 className={styles.heroTitle}>
              Recursos y materiales <span>de apoyo</span>
            </h1>
            <p className={styles.heroDesc}>
              Herramientas para la prevención, orientación y formación en Violencia Basada en
              Género (VBG). Todos los materiales son de acceso libre mediante enlace externo.
            </p>

            <div className={styles.quickNav} aria-label="Accesos rápidos por categoría">
              {categories.map((cat) => (
                <a key={cat.id} href={`#${cat.id}`} className={styles.quickLink}>
                  <span
                    className={styles.quickIconWrap}
                    data-category={cat.id}
                    aria-hidden="true"
                  >
                    <Image
                      src={CATEGORY_ICONS[cat.id]}
                      alt=""
                      width={34}
                      height={34}
                      className={styles.quickIcon}
                    />
                  </span>
                  <span className={styles.quickCopy}>
                    <strong>{cat.label}</strong>
                    <small>{cat.hint}</small>
                  </span>
                  <span className={styles.quickArrow} aria-hidden="true">
                    &gt;
                  </span>
                </a>
              ))}
            </div>

            {isLoading ? <p className={styles.heroDesc}>Cargando recursos...</p> : null}
            {loadError ? <p className={styles.heroDesc}>{loadError}</p> : null}
          </div>
        </div>
      </section>

      {(["prevencion", "orientacion", "formacion"] as const).map((categoryId) => {
        const config = SECTION_CONFIG[categoryId];
        const docs = resourcesByCategory[categoryId];
        return (
          <ResourceSection
            key={categoryId}
            id={categoryId}
            sectionClassName={config.sectionClassName}
            containerClassName={config.containerClassName}
            title={config.title}
            description={config.description}
            docs={docs}
          />
        );
      })}
    </div>
  );
}

interface ResourceSectionProps {
  id: ResourceCategoryId;
  sectionClassName: string;
  containerClassName: string;
  title: string;
  description: string;
  docs: ResourceRecord[];
}

function ResourceSection({
  id,
  sectionClassName,
  containerClassName,
  title,
  description,
  docs,
}: ResourceSectionProps) {
  return (
    <section id={id} className={`${sectionClassName} ${styles[`section-${id}`]}`}>
      <div className={`container ${containerClassName}`}>
        <div className={`accent-bar ${styles.sectionAccentBar}`} />
        <h2 className={styles.sectionTitle}>{title}</h2>
        <p className={styles.sectionDesc}>{description}</p>

        {docs.length ? (
          <div className={styles.resourceList}>
            {docs.map((doc) => (
              <ResourceCard key={doc.id} doc={doc} />
            ))}
          </div>
        ) : (
          <div className={`card ${styles.emptyResourceCard}`}>
            <p>Aún no hay recursos publicados en esta categoría.</p>
          </div>
        )}
      </div>
    </section>
  );
}

function ResourceCard({ doc }: { doc: ResourceRecord }) {
  const category = normalizeResourceCategory(doc.category);
  const cardColor =
    category === "prevencion"
      ? "#C96A4A"
      : category === "orientacion"
        ? "#00555A"
        : category === "formacion"
          ? "#1D3E2A"
          : "#1D3E2A";

  const typeBadgeStyle = {
    background: `${cardColor}14`,
    color: cardColor,
  } as CSSProperties;

  const tags = (doc.tags ?? []).filter(Boolean);
  const safeFileUrl = getSafeExternalUrl(doc.fileUrl);
  const canOpen = !!safeFileUrl;

  const handleOpen = () => {
    if (!safeFileUrl) return;

    void trackResourceOpen(doc.id);

    window.open(safeFileUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <article className={`card ${styles.resourceCard} ${styles[`resourceCard-${category}`]}`}>
      <div className={styles.resourceCardMain}>
        <div className={styles.resourceCardHead}>
          <h3 className={styles.resourceCardTitle}>{doc.title}</h3>
          <div className={styles.resourceCardChips}>
            <span className={`badge ${styles.typeBadge}`} style={typeBadgeStyle}>
              {doc.type}
            </span>
          </div>
        </div>

        <dl className={styles.resourceCardMeta}>
          <dt>Descripción</dt>
          <dd>{doc.description?.trim() || "Sin descripción disponible."}</dd>
          <dt>Tags</dt>
          <dd>{tags.length ? tags.join(", ") : "Sin tags"}</dd>
        </dl>
      </div>

      <button
        className={`btn btn-outline ${styles.resourceCardBtn}`}
        onClick={handleOpen}
        disabled={!canOpen}
      >
        <span className={styles.downloadIcon} aria-hidden="true">
          <svg viewBox="0 0 24 24" role="presentation" focusable="false">
            <path
              d="M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M14 2v5h5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10 14h7m0 0-2.4-2.4M17 14l-2.4 2.4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        {canOpen ? "Abrir archivo" : "Archivo no disponible"}
      </button>
    </article>
  );
}
