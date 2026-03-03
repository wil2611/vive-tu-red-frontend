import Link from "next/link";
import styles from "./page.module.css";
import { allies, specificObjectives, teamRoles } from "./sobre.data";

export default function SobrePage() {
  return (
    <div>
      {/* Hero */}
      <section className={styles.heroSection}>
        <div className="container">
          <div className={styles.heroShell}>
            <h1 className={styles.heroTitle}>Conoce el proyecto</h1>
            <p className={styles.heroDesc}>
              #ViveTuRed es una propuesta de investigación-creación que busca fortalecer redes de apoyo
              y prevenir la Violencia Basada en Género (VBG) en la Educación Superior en Barranquilla,
              mediante una serie narrativa multimedia y herramientas de apropiación social del conocimiento.
            </p>
          </div>
        </div>
      </section>

      {/* Naturaleza y objetivo general */}
      <section className={styles.sectionWarm}>
        <div className={`container ${styles.sectionContainer}`}>
          <div className="accent-bar" />
          <h2 className={styles.sectionTitlePrimary}>
            Naturaleza del proyecto
          </h2>
          <div className={styles.projectText}>
            <p>
              El proyecto articula investigación formativa, narrativa y diseño de herramientas
              pedagógicas para comprender las experiencias de VBG y activar rutas de cuidado en
              contextos universitarios.
            </p>
            <p>
              Su enfoque combina producción de contenidos, espacios de socialización y
              trabajo colaborativo con instituciones aliadas para fortalecer capacidades
              de prevención, orientación y protección.
            </p>
          </div>

          <div className={`notice notice-info ${styles.objectiveNotice}`}>
            <span className={styles.objectiveIcon}>🎯</span>
            <div>
              <strong className={styles.objectiveStrong}>Objetivo general</strong>
              <p className={styles.objectiveNoticeText}>
                Desarrollar una serie narrativa multimedia para fomentar las redes de apoyo
                y la prevención de la Violencia Basada en Género (VBG) en la Educación
                Superior en Barranquilla.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Objetivos específicos */}
      <section className={styles.sectionNeutral}>
        <div className={`container ${styles.sectionContainer}`}>
          <div className="accent-bar" />
          <h2 className={`${styles.sectionTitle} ${styles.sectionTitleObjectives}`}>
            Objetivos específicos
          </h2>

          <div className={styles.objectiveGrid}>
            {specificObjectives.map((obj) => (
              <article key={obj.num} className={styles.objectiveCard} style={{ borderTop: `3px solid ${obj.color}` }}>
                <span className={styles.objectiveNum} style={{ color: obj.color }}>
                  {obj.num}
                </span>
                <h3 className={styles.objectiveTitle} style={{ color: obj.color }}>
                  {obj.title}
                </h3>
                <p className={styles.objectiveDesc}>
                  {obj.desc}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Aliados y participantes */}
      <section className={styles.sectionWarm}>
        <div className={`container ${styles.sectionContainer}`}>
          <div className="accent-bar" />
          <h2 className={styles.sectionTitle}>
            Aliados y participantes
          </h2>
          <p className={styles.alliesLead}>
            La propuesta se desarrolla con aliados estratégicos que fortalecen la
            coordinación, la difusión y la reflexión colectiva alrededor de la prevención
            de la VBG en Educación Superior.
          </p>

          <div className={styles.alliesGrid}>
            {allies.map((ally) => (
              <article key={ally.institution} className={styles.allyCard}>
                <header className={styles.allyCardHead}>
                  <span className={`badge ${ally.roleClass}`}>{ally.role}</span>
                  <h3 className={styles.allyCardTitle}>{ally.institution}</h3>
                </header>

                <section className={styles.allyCardSection}>
                  <h4>Rol en el proyecto</h4>
                  <p>{ally.summary}</p>
                  <div className={styles.allyCardDivider} aria-hidden="true" />
                  <h4>Alcance de participación</h4>
                  <p>{ally.note}</p>
                </section>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Equipo investigador */}
      <section className={styles.sectionNeutral}>
        <div className={`container ${styles.sectionContainer} ${styles.sectionContainerLast}`}>
          <div className="accent-bar" />
          <h2 className={styles.sectionTitle}>
            Equipo investigador
          </h2>
          <p className={styles.teamLead}>
            Esta sección resume el equipo real del proyecto: {teamRoles.length} integrantes
            con trayectorias complementarias en ciencias sociales, educación, derecho,
            diseño, ciencias básicas e ingeniería.
          </p>

          <div className={styles.teamGrid}>
            {teamRoles.map((member, index) => (
              <article className={styles.teamRoleCard} key={member.initials}>
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
