export type ResourceCategoryId = "prevencion" | "orientacion" | "formacion";

export interface ResourceCategory {
  id: ResourceCategoryId;
  label: string;
  color: string;
  hint: string;
}

export interface ResourceItem {
  category: ResourceCategoryId;
  title: string;
  type: string;
  size: string;
  icon: string;
  color: string;
  forWho: string;
  forWhat: string;
}

export const categories: ResourceCategory[] = [
  { id: "prevencion", label: "Prevención", color: "#C96A4A", hint: "Señales y prevención" },
  { id: "orientacion", label: "Orientación", color: "#00555A", hint: "Rutas y acompañamiento" },
  { id: "formacion", label: "Formación", color: "#1D3E2A", hint: "Guías y metodología" },
];

export const resources: ResourceItem[] = [
  {
    category: "prevencion",
    title: "Cartilla de sensibilización #ViveTuRed",
    type: "PDF",
    size: "2.4 MB",
    icon: "📄",
    color: "#C96A4A",
    forWho: "Estudiantes universitarios y comunidad en general",
    forWhat: "Reflexionar sobre redes de apoyo y reconocer situaciones de VBG en el entorno cotidiano.",
  },
  {
    category: "prevencion",
    title: "Infografía: Señales de alerta",
    type: "PNG",
    size: "0.8 MB",
    icon: "🖼️",
    color: "#C96A4A",
    forWho: "Toda la comunidad universitaria",
    forWhat: "Identificar indicadores de violencia en el entorno académico de forma rápida y visual.",
  },
  {
    category: "prevencion",
    title: "Infografía: ¿Qué es la VBG?",
    type: "PNG",
    size: "0.6 MB",
    icon: "🖼️",
    color: "#C96A4A",
    forWho: "Personas que quieren informarse sobre violencia basada en género",
    forWhat: "Comprender las definiciones, tipos y manifestaciones de la VBG de manera accesible.",
  },
  {
    category: "orientacion",
    title: "Guía de rutas de atención institucional",
    type: "PDF",
    size: "1.8 MB",
    icon: "📋",
    color: "#00555A",
    forWho: "Víctimas, familiares y personas que acompañan a alguien en situación de violencia",
    forWhat: "Conocer los procedimientos, contactos y pasos para acceder a atención institucional especializada.",
  },
  {
    category: "orientacion",
    title: "Infografía: Rutas de atención",
    type: "PNG",
    size: "0.7 MB",
    icon: "🖼️",
    color: "#00555A",
    forWho: "Personas en situación de vulnerabilidad o quienes las acompañan",
    forWhat: "Obtener un resumen visual de las principales instituciones y pasos de la ruta de atención.",
  },
  {
    category: "orientacion",
    title: "Infografía: Redes de apoyo",
    type: "PNG",
    size: "0.5 MB",
    icon: "🖼️",
    color: "#00555A",
    forWho: "Estudiantes y personas en proceso de recuperación",
    forWhat: "Identificar y fortalecer las redes personales e institucionales disponibles.",
  },
  {
    category: "formacion",
    title: "Manual para facilitadores/as",
    type: "PDF",
    size: "2.0 MB",
    icon: "📕",
    color: "#1D3E2A",
    forWho: "Docentes, orientadores/as y líderes estudiantiles",
    forWhat: "Replicar talleres de sensibilización sobre VBG en entornos universitarios con herramientas metodológicas.",
  },
  {
    category: "formacion",
    title: "Guía metodológica del proyecto",
    type: "PDF",
    size: "3.1 MB",
    icon: "📘",
    color: "#1D3E2A",
    forWho: "Investigadores/as, docentes y equipos de bienestar universitario",
    forWhat: "Comprender la metodología de investigación-creación de #ViveTuRed y replicarla en otros contextos.",
  },
  {
    category: "formacion",
    title: "Marco teórico y conceptual",
    type: "PDF",
    size: "1.5 MB",
    icon: "📚",
    color: "#1D3E2A",
    forWho: "Estudiantes de posgrado, investigadores/as y equipos académicos",
    forWhat: "Profundizar en los referentes teóricos sobre VBG, redes sociales y prevención universitaria.",
  },
  {
    category: "formacion",
    title: "Instrumentos de recolección",
    type: "PDF",
    size: "1.2 MB",
    icon: "📝",
    color: "#DCA15D",
    forWho: "Investigadores/as y equipos de campo",
    forWhat: "Aplicar cuestionarios, guías de entrevista y fichas de observación usados en el proyecto.",
  },
];

export const getResourcesByCategory = (category: ResourceCategoryId) =>
  resources.filter((resource) => resource.category === category);
