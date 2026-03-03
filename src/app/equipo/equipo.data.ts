export interface Researcher {
  name: string;
  profile: string;
  department?: string;
  division?: string;
  photo?: string;
}

export interface ExpertiseLine {
  title: string;
  desc: string;
}

export const researchers: Researcher[] = [
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

export const expertiseLines: ExpertiseLine[] = [
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

export const researcherCardGradients = [
  "linear-gradient(135deg, #C96A4A 0%, #DCA15D 100%)",
  "linear-gradient(135deg, #00555A 0%, #0b7b81 100%)",
  "linear-gradient(135deg, #1D3E2A 0%, #2f6a4a 100%)",
  "linear-gradient(135deg, #8a5b46 0%, #C96A4A 100%)",
];

const isDefinedString = (value: string | undefined): value is string => Boolean(value);

export const departmentCount = new Set(
  researchers.map((researcher) => researcher.department).filter(isDefinedString),
).size;

export const divisionCount = new Set(
  researchers.map((researcher) => researcher.division).filter(isDefinedString),
).size;

export function getInitials(fullName: string) {
  return fullName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}
