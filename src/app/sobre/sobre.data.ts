export interface SpecificObjective {
  num: string;
  title: string;
  desc: string;
  color: string;
}

export interface Ally {
  institution: string;
  role: string;
  roleClass: "badge-teal" | "badge-gold";
  summary: string;
  note: string;
}

export interface TeamRole {
  name: string;
  role: string;
  initials: string;
}

export const specificObjectives: SpecificObjective[] = [
  {
    num: "01",
    title: "Identificar percepciones y experiencias de VBG",
    desc: "Reconocer cómo se vive, se percibe y se nombra la Violencia Basada en Género (VBG) en contextos de Educación Superior.",
    color: "#C96A4A",
  },
  {
    num: "02",
    title: "Analizar redes personales",
    desc: "Examinar las características de las redes personales para identificar factores de riesgo y de protección asociados a la VBG.",
    color: "#00555A",
  },
];

export const allies: Ally[] = [
  {
    institution: "Universidad del Atlántico",
    role: "Aliado clave",
    roleClass: "badge-teal",
    summary:
      "Aliada en la coordinación del plan de trabajo y en la articulación institucional para ampliar el alcance del proyecto en Educación Superior.",
    note:
      "Los talleres serán diseñados, coordinados y desarrollados por el equipo investigador de la Universidad del Norte.",
  },
  {
    institution: "Red Colombiana de Mujeres Científicas (RCMC)",
    role: "Participante invitada",
    roleClass: "badge-gold",
    summary:
      "Participará en espacios de socialización y reflexión colectiva sobre resultados, fortaleciendo el diálogo interdisciplinario y la apropiación social del conocimiento.",
    note:
      "Su participación no contempla responsabilidades de ejecución, coordinación ni producción de entregables del proyecto.",
  },
];

export const teamRoles: TeamRole[] = [
  { name: "Eliana Sanandres Campis", role: "Historia y Ciencias Sociales", initials: "ES" },
  { name: "Ivonne Molinares Guerrero", role: "Educación y proyectos sociales", initials: "IM" },
  { name: "Andrea Monroy Litch", role: "Departamento de Química y Biología", initials: "AM" },
  { name: "Viridiana Molinares Hassan", role: "Departamento de Derecho", initials: "VM" },
  { name: "Marisabella de Castro Abello", role: "Departamento de Diseño", initials: "MC" },
  { name: "Martha Rodríguez Peña", role: "Diseño gráfico y comunicación visual", initials: "MR" },
  { name: "Daladier Jabba Molinares", role: "Ingeniería de Sistemas", initials: "DJ" },
];
