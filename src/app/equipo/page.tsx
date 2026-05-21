"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { listPublicTeamMembers, type TeamMember } from "@/lib/api";
import styles from "./page.module.css";
import { expertiseLines, getInitials, type Researcher } from "./equipo.data";

const TEAM_IMAGE_ALLOWED_HOSTS = new Set([
  "plus.unsplash.com",
  "images.unsplash.com",
  "drive.google.com",
  "lh3.googleusercontent.com",
]);

const expertiseIcons = [
  "/nodo.png",
  "/birrete.png",
  "/lupa-investigacion.png",
  "/portatil_blanco.png",
];

function extractGoogleDriveFileId(rawUrl: string): string | null {
  const fallbackPathMatch = rawUrl.match(/\/file\/d\/([^/?#]+)/);
  if (fallbackPathMatch?.[1]) {
    return fallbackPathMatch[1];
  }

  const fallbackIdMatch = rawUrl.match(/[?&]id=([^&#]+)/);
  if (fallbackIdMatch?.[1]) {
    return fallbackIdMatch[1];
  }

  try {
    const parsedUrl = new URL(rawUrl);
    const hostname = parsedUrl.hostname.toLowerCase();
    const isGoogleDriveHost =
      hostname === "drive.google.com" ||
      hostname.endsWith(".drive.google.com") ||
      hostname === "docs.google.com";

    if (!isGoogleDriveHost) {
      return null;
    }

    const pathMatch = parsedUrl.pathname.match(/\/file\/d\/([^/?#]+)/);
    if (pathMatch?.[1]) {
      return pathMatch[1];
    }

    const idFromQuery = parsedUrl.searchParams.get("id");
    if (idFromQuery) {
      return idFromQuery;
    }
  } catch {
    return null;
  }

  return null;
}

function normalizeTeamPhotoUrl(url?: string | null): string | undefined {
  if (!url) {
    return undefined;
  }

  if (url.includes("drive.google.com") || url.includes("docs.google.com")) {
    const fileId = extractGoogleDriveFileId(url);
    if (fileId) {
      return `https://drive.google.com/uc?export=view&id=${encodeURIComponent(fileId)}`;
    }
  }

  if (url.includes("sharepoint.com")) {
    try {
      const parsedUrl = new URL(url);
      parsedUrl.searchParams.set("download", "1");
      return parsedUrl.toString();
    } catch {
      return url;
    }
  }

  return url;
}

function isSharePointUrl(url?: string | null): boolean {
  if (!url) return false;

  try {
    return new URL(url).hostname.toLowerCase().endsWith("sharepoint.com");
  } catch {
    return false;
  }
}

function isAllowedTeamImageHost(url?: string | null): boolean {
  if (!url) return false;

  try {
    const hostname = new URL(url).hostname.toLowerCase();
    if (TEAM_IMAGE_ALLOWED_HOSTS.has(hostname)) {
      return true;
    }

    if (hostname === "docs.google.com") {
      return true;
    }

    return hostname.endsWith(".sharepoint.com") || hostname === "sharepoint.com";
  } catch {
    return false;
  }
}

function toResearcher(teamMember: TeamMember): Researcher {
  return {
    name: teamMember.name,
    profile: teamMember.profile,
    department: teamMember.department ?? undefined,
    division: teamMember.division ?? undefined,
    photo: normalizeTeamPhotoUrl(teamMember.photo),
  };
}

export default function EquipoPage() {
  const [researchers, setResearchers] = useState<Researcher[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadTeamMembers() {
      setIsLoading(true);
      setLoadError(null);

      try {
        const response = await listPublicTeamMembers();
        if (!cancelled) {
          setResearchers(response.map(toResearcher));
        }
      } catch {
        if (!cancelled) {
          setLoadError("No se pudo cargar el equipo en este momento.");
          setResearchers([]);
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    void loadTeamMembers();

    return () => {
      cancelled = true;
    };
  }, []);

  const departmentCount = useMemo(
    () => new Set(researchers.map((researcher) => researcher.department).filter(Boolean)).size,
    [researchers],
  );

  const divisionCount = useMemo(
    () => new Set(researchers.map((researcher) => researcher.division).filter(Boolean)).size,
    [researchers],
  );

  return (
    <div>
      <section className={styles.heroSection}>
        <div className="container">
          <div className={styles.heroShell}>
            <h1 className={styles.heroTitle}>
              Equipo <span>investigador</span>
            </h1>
            <p className={styles.heroDesc}>
              Conoce a las investigadoras e investigadores que integran #ViveTuRed. El equipo
              reúne perfiles de ciencias sociales, educación, derecho, diseño, ciencias básicas
              e ingeniería para abordar la prevención de la VBG desde una perspectiva
              interdisciplinaria.
            </p>

            <div className={styles.heroPanel}>
              <div className={styles.stats}>
                <div className={styles.statItem}>
                  <strong>{researchers.length}</strong>
                  <span>Investigadores/as</span>
                </div>
                <div className={styles.statItem}>
                  <strong>{departmentCount}</strong>
                  <span>Departamentos</span>
                </div>
                <div className={styles.statItem}>
                  <strong>{divisionCount}</strong>
                  <span>Divisiones academicas</span>
                </div>
              </div>

              {isLoading ? <p className={styles.heroDesc}>Cargando equipo...</p> : null}
              {loadError ? <p className={styles.heroDesc}>{loadError}</p> : null}
            </div>
          </div>
        </div>
      </section>

      <section className="section-cream">
        <div className={`container ${styles.containerTight}`}>
          <div className="accent-bar" />
          <h2 className={styles.sectionTitle}>Investigadores</h2>
          <p className={styles.sectionDesc}>
            A continuacion, se presenta el perfil academico y profesional del equipo, con su
            vinculacion departamental y division academica cuando corresponde.
          </p>

          {researchers.length ? (
            <div className={styles.researchersGrid}>
              {researchers.map((person, index) => (
                <article
                  key={`${person.name}-${index}`}
                  className={`${styles.researcherCard} ${
                    index % 2 === 0 ? styles.researcherCardWarm : styles.researcherCardForest
                  }`}
                >
                  <header className={styles.researcherCardHead}>
                    <div className={styles.researcherPhotoFrame}>
                      {person.photo && isAllowedTeamImageHost(person.photo) ? (
                        <Image
                          src={person.photo}
                          alt={`Foto de ${person.name}`}
                          width={640}
                          height={800}
                          quality={95}
                          sizes="(max-width: 768px) 100vw, 30vw"
                          className={styles.researcherPhoto}
                          unoptimized={isSharePointUrl(person.photo)}
                        />
                      ) : (
                        <span className={styles.researcherPhotoIcon} aria-hidden="true">
                          {getInitials(person.name)}
                        </span>
                      )}
                    </div>
                  </header>

                  <div className={styles.researcherCardContent}>
                    <div className={styles.researcherHeadText}>
                      <h3 className={styles.researcherName}>{person.name}</h3>
                      <span className={styles.researcherHeadRole}>Equipo investigador</span>
                    </div>

                    <p className={styles.researcherProfile}>{person.profile}</p>

                    <div className={styles.researcherMeta}>
                      <div className={styles.researcherMetaItem}>
                        <span className={styles.researcherMetaLabel}>Departamento</span>
                        <span className={styles.researcherMetaValue}>
                          {person.department || "Información en actualización"}
                        </span>
                      </div>
                      <div className={styles.researcherMetaItem}>
                        <span className={styles.researcherMetaLabel}>Division academica</span>
                        <span className={styles.researcherMetaValue}>
                          {person.division || "Información en actualización"}
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : !isLoading && !loadError ? (
            <p className={styles.sectionDesc}>Aún no hay integrantes activos en el equipo.</p>
          ) : null}
        </div>
      </section>

      <section className="section-soft">
        <div className={`container ${styles.containerTight}`}>
          <div className="accent-bar" />
          <h2 className={styles.sectionTitle}>
            Capacidades del <span>equipo</span>
          </h2>
          <p className={`${styles.sectionDesc} ${styles.sectionDescShort}`}>
            El trabajo conjunto integra enfoques metodológicos, jurídicos, pedagógicos,
            tecnológicos y de investigación-creación para producir resultados aplicables en
            contextos universitarios.
          </p>

          <div className={styles.linesGrid}>
            {expertiseLines.map((line, index) => {
              const iconSrc = expertiseIcons[index % expertiseIcons.length];

              return (
              <div key={line.title} className={styles.lineCard}>
                <span className={styles.lineCardIconWrap} data-tone={index} aria-hidden="true">
                  <Image
                    src={iconSrc}
                    alt=""
                    width={40}
                    height={40}
                    className={styles.lineCardIcon}
                  />
                </span>
                <h3>{line.title}</h3>
                <p>{line.desc}</p>
              </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-soft">
        <div className="container cta-section-container">
          <div className="cta-block">
            <h2 className="cta-title">¿Quieres conocer más del <span>trabajo del equipo?</span></h2>
            <p className="cta-desc">
              Te invitamos a explorar el proyecto completo y sus herramientas 
              para la prevención de la VBG en Educación Superior.
            </p>
            <div className="cta-actions">
              <Link className="btn btn-primary" href="/sobre">
                Ver Recursos
              </Link>
              <Link className="btn cta-secondary-btn" href="/contacto">
                Visualizador de redes
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
