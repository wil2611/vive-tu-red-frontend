import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import {
  departmentCount,
  divisionCount,
  expertiseLines,
  getInitials,
  researcherCardGradients,
  researchers,
} from "./equipo.data";

export default function EquipoPage() {
  return (
    <div>
      {/* Hero */}
      <section className={styles.heroSection}>
        <div className="container">
          <div className={styles.heroShell}>
            <h1 className={styles.heroTitle}>
              Equipo investigador
            </h1>
            <p className={styles.heroDesc}>
              Conoce a las investigadoras e investigadores que integran #ViveTuRed.
              El equipo reúne perfiles de ciencias sociales, educación, derecho, diseño,
              ciencias básicas e ingeniería para abordar la prevención de la VBG desde
              una perspectiva interdisciplinaria.
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
                  <span>Divisiones académicas</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Perfiles */}
      <section className={styles.researchersSection}>
        <div className={`container ${styles.containerTight}`}>
          <div className="accent-bar" />
          <h2 className={styles.sectionTitle}>
            Investigadoras e investigadores
          </h2>
          <p className={styles.sectionDesc}>
            A continuación, se presenta el perfil académico y profesional del equipo, con
            su vinculación departamental y división académica cuando corresponde.
          </p>

          <div className={styles.researchersGrid}>
            {researchers.map((person, index) => (
              <article key={person.name} className={styles.researcherCard}>
                <header
                  className={styles.researcherCardHead}
                  style={{ background: researcherCardGradients[index % researcherCardGradients.length] }}
                >
                  <div className={styles.researcherPhotoFrame}>
                    {person.photo ? (
                      <Image
                        src={person.photo}
                        alt={`Foto de ${person.name}`}
                        width={88}
                        height={88}
                        className={styles.researcherPhoto}
                      />
                    ) : (
                      <span className={styles.researcherPhotoIcon} aria-hidden="true">
                        {getInitials(person.name)}
                      </span>
                    )}
                  </div>

                  <div className={styles.researcherHeadText}>
                    <h3 className={styles.researcherName}>{person.name}</h3>
                    <span className={styles.researcherHeadRole}>Equipo investigador</span>
                  </div>
                </header>

                <div className={styles.researcherCardContent}>
                  <p className={styles.researcherProfile}>{person.profile}</p>

                  <div className={styles.researcherMeta}>
                    <div className={styles.researcherMetaItem}>
                      <span className={styles.researcherMetaLabel}>Departamento</span>
                      <span className={styles.researcherMetaValue}>
                        {person.department || "Información en actualización"}
                      </span>
                    </div>
                    <div className={styles.researcherMetaItem}>
                      <span className={styles.researcherMetaLabel}>División académica</span>
                      <span className={styles.researcherMetaValue}>
                        {person.division || "Información en actualización"}
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Capacidades del equipo */}
      <section className={styles.neutralSection}>
        <div className={`container ${styles.containerTight}`}>
          <div className="accent-bar" />
          <h2 className={styles.sectionTitle}>
            Capacidades del equipo
          </h2>
          <p className={`${styles.sectionDesc} ${styles.sectionDescShort}`}>
            El trabajo conjunto integra enfoques metodológicos, jurídicos, pedagógicos,
            tecnológicos y de investigación-creación para producir resultados aplicables
            en contextos universitarios.
          </p>

          <div className={styles.linesGrid}>
            {expertiseLines.map((line) => (
              <div key={line.title} className={styles.lineCard}>
                <h3>{line.title}</h3>
                <p>{line.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.ctaSection}>
        <div className={`container ${styles.containerCta}`}>
          <div className="cta-block">
            <h2 className="cta-title">¿Quieres conocer más del trabajo del equipo?</h2>
            <p className="cta-desc">
              Te invitamos a explorar el proyecto completo y sus herramientas para la
              prevención de la VBG en Educación Superior.
            </p>
            <div className="cta-actions">
              <Link className="btn btn-primary" href="/sobre">
                Conoce el proyecto
              </Link>
              <Link className={`btn ${styles.ctaSecondaryButton}`} href="/contacto">
                Contáctanos
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
