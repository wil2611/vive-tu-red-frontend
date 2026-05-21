"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  listPublicProjectAllies,
  listPublicTeamMembers,
  type ProjectAlly,
  type TeamMember,
} from "@/lib/api";
import styles from "./page.module.css";
import { specificObjectives } from "./sobre.data";

type TeamRole = {
  name: string;
  role: string;
  initials: string;
};

type AllyCardViewModel = {
  id: string;
  institutionName: string;
  roleLabel: string;
  roleClass: "badge-teal" | "badge-gold";
  summary: string;
  participationScope: string;
};

function getInitials(name: string): string {
  const parts = name
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (!parts.length) return "--";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
}

function toTeamRole(member: TeamMember): TeamRole {
  const role = [member.department, member.division]
    .filter((value): value is string => Boolean(value && value.trim()))
    .join(" - ");

  return {
    name: member.name,
    role: role || "Equipo investigador",
    initials: getInitials(member.name),
  };
}

function toAllyCard(ally: ProjectAlly): AllyCardViewModel {
  return {
    id: ally.id,
    institutionName: ally.institutionName,
    roleLabel: ally.roleLabel,
    roleClass: ally.type === "participant" ? "badge-gold" : "badge-teal",
    summary: ally.summary,
    participationScope: ally.participationScope,
  };
}

export default function SobrePage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [projectAllies, setProjectAllies] = useState<ProjectAlly[]>([]);
  const [isTeamLoading, setIsTeamLoading] = useState(true);
  const [isAlliesLoading, setIsAlliesLoading] = useState(true);
  const [teamLoadError, setTeamLoadError] = useState<string | null>(null);
  const [alliesLoadError, setAlliesLoadError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadTeamMembers() {
      setIsTeamLoading(true);
      setTeamLoadError(null);

      try {
        const response = await listPublicTeamMembers();
        if (!cancelled) {
          setTeamMembers(response);
        }
      } catch {
        if (!cancelled) {
          setTeamMembers([]);
          setTeamLoadError("No se pudo cargar el equipo en este momento.");
        }
      } finally {
        if (!cancelled) {
          setIsTeamLoading(false);
        }
      }
    }

    void loadTeamMembers();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadAllies() {
      setIsAlliesLoading(true);
      setAlliesLoadError(null);

      try {
        const response = await listPublicProjectAllies();
        if (!cancelled) {
          setProjectAllies(response);
        }
      } catch {
        if (!cancelled) {
          setProjectAllies([]);
          setAlliesLoadError("No se pudieron cargar los aliados en este momento.");
        }
      } finally {
        if (!cancelled) {
          setIsAlliesLoading(false);
        }
      }
    }

    void loadAllies();

    return () => {
      cancelled = true;
    };
  }, []);

  const teamRoles = useMemo(() => teamMembers.map(toTeamRole), [teamMembers]);
  const alliesCards = useMemo(() => projectAllies.map(toAllyCard), [projectAllies]);

  return (
    <div>
      <section className={styles.heroSection}>
        <div className="container">
          <div className={styles.heroShell}>
            <h1 className={styles.heroTitle}>
              Conoce el <span>proyecto</span>
            </h1>
            <p className={styles.heroDesc}>
              #ViveTuRed es una propuesta de investigación-creación que busca fortalecer redes de
              apoyo y prevenir la Violencia Basada en Género (VBG) en la Educación Superior en
              Barranquilla, mediante una serie narrativa multimedia y herramientas de apropiación
              social del conocimiento.
            </p>
          </div>
        </div>
      </section>

      <section className="section-cream">
        <div className={`container ${styles.sectionContainer}`}>
          <div className="accent-bar" />
          <h2 className={styles.sectionTitlePrimary}>
            Naturaleza del <span>proyecto</span>
          </h2>
          <div className={styles.projectText}>
            <p>
              El proyecto articula investigación formativa, narrativa y diseño de herramientas
              pedagógicas para comprender las experiencias de VBG y activar rutas de cuidado en
              contextos universitarios.
            </p>
            <p>
              Su enfoque combina producción de contenidos, espacios de socialización y trabajo
              colaborativo con instituciones aliadas para fortalecer capacidades de prevención,
              orientación y protección.
            </p>
          </div>

        </div>
      </section>

      <section className="section-soft">
        <div className={`container ${styles.sectionContainer}`}>
          <div className="accent-bar" />
          <h2 className={`${styles.sectionTitle} ${styles.sectionTitleObjectives}`}>
            Objetivos
          </h2>

          <div className={styles.objectiveGrid}>
            <article className={styles.objectiveGeneralCard}>
              <h3>Objetivo general</h3>
              <div className={styles.objectiveGeneralDivider} aria-hidden="true" />
              <p>
                Desarrollar una serie narrativa multimedia para fomentar las redes de apoyo y la
                prevención de la Violencia Basada en Género (VBG) en la Educación Superior en
                Barranquilla.
              </p>
            </article>

            {specificObjectives.map((obj) => (
              <article key={obj.num} className={styles.objectiveCard}>
                <span className={styles.objectiveNum}>{obj.num}</span>
                <h3 className={styles.objectiveTitle}>{obj.title}</h3>
                <div className={styles.objectiveCardDivider} aria-hidden="true" />
                <p className={styles.objectiveDesc}>{obj.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-cream">
        <div className={`container ${styles.sectionContainer}`}>
          <div className="accent-bar" />
          <h2 className={styles.sectionTitle}><span>Aliados</span> y participantes</h2>
          <p className={styles.alliesLead}>
            La propuesta se desarrolla con aliados estratégicos que fortalecen la coordinación, la
            difusión y la reflexión colectiva alrededor de la prevención de la VBG en Educación
            Superior.
          </p>
          {isAlliesLoading ? <p className={styles.alliesLead}>Cargando aliados...</p> : null}
          {alliesLoadError ? <p className={styles.alliesLead}>{alliesLoadError}</p> : null}

          <div className={styles.alliesGrid}>
            {alliesCards.map((ally) => (
              <article key={ally.id} className={styles.allyCard}>
                <header className={styles.allyCardHead}>
                  <span className={`badge ${ally.roleClass}`}>{ally.roleLabel}</span>
                  <h3 className={styles.allyCardTitle}>{ally.institutionName}</h3>
                  <div className={styles.allyCardTitleDivider} aria-hidden="true" />
                </header>

                <section className={`${styles.allyCardSection} ${styles.allyCardSectionRole}`}>
                  <h4>Rol en el proyecto</h4>
                  <p>{ally.summary}</p>
                </section>
                <section className={`${styles.allyCardSection} ${styles.allyCardSectionScope}`}>
                  <h4>Alcance de participación</h4>
                  <p>{ally.participationScope}</p>
                </section>
              </article>
            ))}
          </div>
          {!isAlliesLoading && !alliesLoadError && !alliesCards.length ? (
            <p className={styles.alliesLead}>Aún no hay aliados o participantes activos.</p>
          ) : null}
        </div>
      </section>

      <section className="section-soft">
        <div className={`container ${styles.sectionContainer} ${styles.sectionContainerLast}`}>
          <div className="accent-bar" />
          <h2 className={styles.sectionTitle}>Equipo investigador</h2>
          <p className={styles.teamLead}>
            Esta sección resume el equipo real del proyecto: {teamRoles.length} integrantes con
            trayectorias complementarias en ciencias sociales, educación, derecho, diseño,
            ciencias básicas e ingeniería.
          </p>

          {isTeamLoading ? <p className={styles.teamLead}>Cargando equipo...</p> : null}
          {teamLoadError ? <p className={styles.teamLead}>{teamLoadError}</p> : null}

          {teamRoles.length ? (
            <div className={styles.teamGrid}>
              {teamRoles.map((member, index) => (
                <article className={styles.teamRoleCard} key={`${member.name}-${index}`}>
                  <div
                    className={styles.teamRoleBadge}
                    style={{
                      background:
                        index % 2 === 0
                          ? "linear-gradient(135deg, #C96A4A 0%, #DCA15D 100%)"
                          : "linear-gradient(135deg, #00555A 0%, #0b7b81 100%)",
                    }}
                  >
                    {member.initials}
                  </div>
                  <div className={styles.teamRoleBody}>
                    <h3 className={styles.teamRoleName}>{member.name}</h3>
                    <p className={styles.teamRoleDesc}>{member.role}</p>
                  </div>
                </article>
              ))}
            </div>
          ) : !isTeamLoading && !teamLoadError ? (
            <p className={styles.teamLead}>Aún no hay integrantes activos en el equipo.</p>
          ) : null}

          <div className={styles.teamCta}>
            <Link className="btn btn-primary" href="/equipo">
              Conoce más sobre el equipo &rarr;
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
