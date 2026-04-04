"use client";

import type { CSSProperties } from "react";
import styles from "./page.module.css";
import {
  categories,
  getResourcesByCategory,
  type ResourceCategoryId,
  type ResourceItem,
} from "./recursos.data";
import { recordInteraction } from "@/lib/analytics/tracker";

export default function RecursosPage() {
  const prevencionDocs = getResourcesByCategory("prevencion");
  const orientacionDocs = getResourcesByCategory("orientacion");
  const formacionDocs = getResourcesByCategory("formacion");

  return (
    <div>
      <section className={styles.heroSection}>
        <div className="container">
          <div className={styles.heroShell}>
            <h1 className={styles.heroTitle}>Recursos y materiales de apoyo</h1>
            <p className={styles.heroDesc}>
              Herramientas para la prevencion, orientacion y formacion en
              Violencia Basada en Genero (VBG). Todos los materiales son de
              acceso libre y descarga gratuita.
            </p>

            <div className={styles.quickNav} aria-label="Accesos rapidos por categoria">
              {categories.map((cat) => (
                <a key={cat.id} href={`#${cat.id}`} className={styles.quickLink}>
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
          </div>
        </div>
      </section>

      <ResourceSection
        id="prevencion"
        sectionClassName={styles.sectionWarm}
        containerClassName={styles.sectionContainer}
        pillClassName={`${styles.pill} ${styles.pillPrevencion}`}
        pillLabel="Prevencion"
        title="Herramientas para la prevencion"
        description="Materiales para reconocer la VBG, identificar senales de alerta y fortalecer la cultura de prevencion."
        docs={prevencionDocs}
      />

      <ResourceSection
        id="orientacion"
        sectionClassName={styles.sectionNeutral}
        containerClassName={styles.sectionContainer}
        pillClassName={`${styles.pill} ${styles.pillOrientacion}`}
        pillLabel="Orientacion"
        title="Materiales de apoyo y orientacion"
        description="Guias e infografias para saber a donde acudir y como navegar las rutas de atencion disponibles."
        docs={orientacionDocs}
      />

      <ResourceSection
        id="formacion"
        sectionClassName={styles.sectionWarm}
        containerClassName={`${styles.sectionContainer} ${styles.sectionContainerLast}`}
        pillClassName={`${styles.pill} ${styles.pillFormacion}`}
        pillLabel="Formacion"
        title="Recursos para la formacion"
        description="Manuales, guias metodologicas e instrumentos para docentes, facilitadores/as e investigadores/as."
        docs={formacionDocs}
      />
    </div>
  );
}

interface ResourceSectionProps {
  id: ResourceCategoryId;
  sectionClassName: string;
  containerClassName: string;
  pillClassName: string;
  pillLabel: string;
  title: string;
  description: string;
  docs: ResourceItem[];
}

function ResourceSection({
  id,
  sectionClassName,
  containerClassName,
  pillClassName,
  pillLabel,
  title,
  description,
  docs,
}: ResourceSectionProps) {
  return (
    <section id={id} className={sectionClassName}>
      <div className={`container ${containerClassName}`}>
        <div className={pillClassName}>{pillLabel}</div>
        <div className="accent-bar" />
        <h2 className={styles.sectionTitle}>{title}</h2>
        <p className={styles.sectionDesc}>{description}</p>
        <div className={styles.resourceList}>
          {docs.map((doc) => (
            <ResourceCard key={doc.title} doc={doc} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ResourceCard({ doc }: { doc: ResourceItem }) {
  const typeBadgeStyle = {
    background: `${doc.color}14`,
    color: doc.color,
  } as CSSProperties;

  return (
    <article className={`card ${styles.resourceCard}`}>
      <div className={styles.resourceCardMain}>
        <div className={styles.resourceCardHead}>
          <h3 className={styles.resourceCardTitle}>{doc.title}</h3>
          <div className={styles.resourceCardChips}>
            <span className={`badge ${styles.typeBadge}`} style={typeBadgeStyle}>
              {doc.type}
            </span>
            <span className={`badge badge-forest ${styles.sizeBadge}`}>{doc.size}</span>
          </div>
        </div>

        <dl className={styles.resourceCardMeta}>
          <dt>Para quien?</dt>
          <dd>{doc.forWho}</dd>
          <dt>Para que sirve?</dt>
          <dd>{doc.forWhat}</dd>
        </dl>
      </div>

      <button
        className={`btn btn-outline ${styles.resourceCardBtn}`}
        onClick={() =>
          void recordInteraction({
            type: "resource_download",
            targetType: "resource",
            targetId: doc.title,
            metadata: {
              category: doc.category,
              resourceType: doc.type,
              size: doc.size,
            },
          })
        }
      >
        <span className={styles.downloadIcon}>⬇</span>
        Descargar
      </button>
    </article>
  );
}
