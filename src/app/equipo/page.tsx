import Image from "next/image";
import Link from "next/link";

type Researcher = {
  name: string;
  profile: string;
  department?: string;
  division?: string;
  photo?: string;
};

const researchers: Researcher[] = [
  {
    name: "Eliana Sanandres Campis",
    profile:
      "Doctora en Ciencias Sociales, con experiencia en Análisis de Redes Sociales. Ha liderado investigaciones sobre redes sociales en entornos presenciales (offline) y digitales (online), donde ha estudiado las redes personales de apoyo en contextos de crisis y el uso de redes digitales (como X, antes Twitter) para la difusión de significados sociales y la movilización colectiva. Su trabajo combina técnicas de análisis estructural y minería de datos con una perspectiva interdisciplinaria. Es miembro de la red Women in Network Science (WiNS).",
    department: "Historia y Ciencias Sociales",
    division: "División de Humanidades, Artes y Ciencias Sociales",
  },
  {
    name: "Ivonne Molinares Guerrero",
    profile:
      "Magíster en Educación, con experiencia en sistematización de proyectos, evaluación de impacto y diseño e implementación de proyectos sociales y educativos. Ha trabajado en proyectos sobre inclusión, racismo, migración y género, en contextos latinoamericanos y caribeños.",
  },
  {
    name: "Andrea Monroy Litch",
    profile:
      "Doctora en Toxicología Ambiental. Miembro de la Red Colombiana de Mujeres Científicas, de la Academia Joven Colombiana (estamento vinculado a ACCEFYN) y de The Organization for Women in Science for the Developing World (OWSD). Ha participado activamente en iniciativas que promueven la participación de mujeres en la ciencia y la visibilización de desigualdades de género. Lidera el programa institucional La Ciencia sí es cosa de Chicas, de la División de Ciencias Básicas de la Universidad del Norte.",
    department: "Departamento de Química y Biología",
    division: "División de Ciencias Básicas",
  },
  {
    name: "Viridiana Molinares Hassan",
    profile:
      "Doctora en Derecho, con una trayectoria consolidada en el análisis de conflicto, derechos humanos y género. Ha dirigido investigaciones sobre violencia de género, derechos de poblaciones LGBTI y mecanismos jurídicos de protección. Es referente en el estudio de los marcos normativos necesarios para abordar la prevención de violencias desde una narrativa crítica y situada.",
    department: "Departamento de Derecho",
    division: "División de Derecho, Ciencia Política y Relaciones Internacionales",
  },
  {
    name: "Marisabella de Castro Abello",
    profile:
      "Doctora en Diseño, con experiencia en investigación-creación, diseño de servicios y procesos de co-creación en contextos comunitarios y educativos. Ha liderado proyectos donde el diseño se convierte en una herramienta para transformar experiencias institucionales y promover procesos colaborativos centrados en las personas.",
    department: "Departamento de Diseño",
    division: "Escuela de Arquitectura, Urbanismo y Diseño",
  },
  {
    name: "Martha Rodríguez Peña",
    profile:
      "Magíster en Mercadeo, con trayectoria en diseño gráfico, investigación-creación y producción narrativa visual con enfoque social. Cuenta con amplia experiencia en el desarrollo de proyectos de comunicación visual, con énfasis en diseño editorial y diseño para la información.",
  },
  {
    name: "Daladier Jabba Molinares",
    profile:
      "Doctor en Ciencias de la Computación, con experiencia en el diseño e implementación de plataformas tecnológicas aplicadas a procesos sociales. Tiene amplia trayectoria en desarrollo de software, sistemas de visualización de datos y entornos interactivos.",
    department: "Departamento de Ingeniería de Sistemas",
    division: "División de Ingenierías",
  },
];

const expertiseLines = [
  {
    title: "Análisis de redes y datos",
    desc: "Lectura estructural de redes personales, análisis de dinámicas sociales y minería de datos para comprender riesgos y factores de protección.",
  },
  {
    title: "Educación, género y derechos",
    desc: "Experiencia en inclusión, migración, racismo, derechos humanos y marcos jurídicos para prevención de violencias en Educación Superior.",
  },
  {
    title: "Investigación-creación y narrativa",
    desc: "Desarrollo de contenidos, diseño de servicios y producción visual para traducir evidencia en herramientas pedagógicas y de sensibilización.",
  },
  {
    title: "Tecnología y visualización",
    desc: "Diseño de plataformas, software y visualizadores interactivos para fortalecer el acceso, análisis y apropiación social del conocimiento.",
  },
];

const researcherCardGradients = [
  "linear-gradient(135deg, #C96A4A 0%, #DCA15D 100%)",
  "linear-gradient(135deg, #00555A 0%, #0b7b81 100%)",
  "linear-gradient(135deg, #1D3E2A 0%, #2f6a4a 100%)",
  "linear-gradient(135deg, #8a5b46 0%, #C96A4A 100%)",
];

const departmentCount = new Set(researchers.map((r) => r.department).filter(Boolean)).size;
const divisionCount = new Set(researchers.map((r) => r.division).filter(Boolean)).size;

function getInitials(fullName: string) {
  return fullName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export default function EquipoPage() {
  return (
    <div>
      {/* Hero */}
      <section style={{ background: "linear-gradient(180deg, #f5f0e1 0%, var(--bg) 100%)", padding: "48px 0 56px" }}>
        <div className="container">
          <h1
            style={{
              fontSize: "clamp(2rem, 4vw, 2.6rem)",
              fontWeight: 800,
              color: "#1D3E2A",
              margin: "16px 0 12px",
              fontFamily: "Georgia, serif",
              lineHeight: 1.15,
            }}
          >
            Equipo investigador
          </h1>
          <p
            style={{
              fontSize: "1.05rem",
              lineHeight: 1.75,
              color: "#5a7d66",
              maxWidth: 800,
              margin: "0 0 18px",
            }}
          >
            Conoce a las investigadoras e investigadores que integran #ViveTuRed.
            El equipo reúne perfiles de ciencias sociales, educación, derecho, diseño,
            ciencias básicas e ingeniería para abordar la prevención de la VBG desde
            una perspectiva interdisciplinaria.
          </p>

          <div className="equipo-stats">
            <div className="equipo-stat-item">
              <strong>{researchers.length}</strong>
              <span>Investigadores/as</span>
            </div>
            <div className="equipo-stat-item">
              <strong>{departmentCount}</strong>
              <span>Departamentos</span>
            </div>
            <div className="equipo-stat-item">
              <strong>{divisionCount}</strong>
              <span>Divisiones académicas</span>
            </div>
          </div>
        </div>
      </section>

      {/* Perfiles */}
      <section style={{ background: "#f5f0e1" }}>
        <div className="container" style={{ paddingTop: 56, paddingBottom: 48 }}>
          <div className="accent-bar" />
          <h2
            style={{
              fontSize: "1.4rem",
              fontWeight: 800,
              color: "#1D3E2A",
              marginBottom: 10,
              fontFamily: "ui-sans-serif, system-ui, sans-serif",
            }}
          >
            Investigadoras e investigadores
          </h2>
          <p style={{ color: "#5a7d66", lineHeight: 1.75, marginBottom: 24, maxWidth: 860 }}>
            A continuación, se presenta el perfil académico y profesional del equipo, con
            su vinculación departamental y división académica cuando corresponde.
          </p>

          <div className="researchers-grid">
            {researchers.map((person, index) => (
              <article key={person.name} className="researcher-card">
                <header className="researcher-card-head" style={{ background: researcherCardGradients[index % researcherCardGradients.length] }}>
                  <div className="researcher-photo-frame">
                    {person.photo ? (
                      <Image
                        src={person.photo}
                        alt={`Foto de ${person.name}`}
                        width={88}
                        height={88}
                        className="researcher-photo"
                      />
                    ) : (
                      <span className="researcher-photo-icon" aria-hidden="true">
                        {getInitials(person.name)}
                      </span>
                    )}
                  </div>

                  <div className="researcher-head-text">
                    <h3 className="researcher-name">{person.name}</h3>
                    <span className="researcher-head-role">Equipo investigador</span>
                  </div>
                </header>

                <div className="researcher-card-content">
                  <p className="researcher-profile">{person.profile}</p>

                  <div className="researcher-meta">
                    <div className="researcher-meta-item">
                      <span className="researcher-meta-label">Departamento</span>
                      <span className="researcher-meta-value">{person.department || "Información en actualización"}</span>
                    </div>
                    <div className="researcher-meta-item">
                      <span className="researcher-meta-label">División académica</span>
                      <span className="researcher-meta-value">{person.division || "Información en actualización"}</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Capacidades del equipo */}
      <section style={{ background: "var(--bg)" }}>
        <div className="container" style={{ paddingTop: 56, paddingBottom: 48 }}>
          <div className="accent-bar" />
          <h2
            style={{
              fontSize: "1.4rem",
              fontWeight: 800,
              color: "#1D3E2A",
              marginBottom: 10,
              fontFamily: "ui-sans-serif, system-ui, sans-serif",
            }}
          >
            Capacidades del equipo
          </h2>
          <p style={{ color: "#5a7d66", lineHeight: 1.75, marginBottom: 24, maxWidth: 840 }}>
            El trabajo conjunto integra enfoques metodológicos, jurídicos, pedagógicos,
            tecnológicos y de investigación-creación para producir resultados aplicables
            en contextos universitarios.
          </p>

          <div className="equipo-lines-grid">
            {expertiseLines.map((line) => (
              <div key={line.title} className="equipo-line-card">
                <h3>{line.title}</h3>
                <p>{line.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "#f5f0e1" }}>
        <div className="container" style={{ paddingTop: 56, paddingBottom: 56 }}>
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
              <Link
                className="btn"
                href="/contacto"
                style={{
                  background: "rgba(255,255,255,0.15)",
                  color: "white",
                  border: "1px solid rgba(255,255,255,0.3)",
                }}
              >
                Contáctanos
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
