export interface SubjectOption {
  value: string;
  label: string;
}

export interface ContactCard {
  title: string;
  value: string;
  hint: string;
  href?: string;
}

export interface ContactFormState {
  nombre: string;
  email: string;
  asunto: string;
  mensaje: string;
}

export const createInitialContactForm = (): ContactFormState => ({
  nombre: "",
  email: "",
  asunto: "",
  mensaje: "",
});

export const subjectOptions: SubjectOption[] = [
  { value: "", label: "Selecciona un asunto" },
  { value: "consulta", label: "Consulta general" },
  { value: "sugerencia", label: "Sugerencia" },
  { value: "colaboracion", label: "Propuesta de colaboración" },
  { value: "recursos", label: "Solicitud de recursos" },
  { value: "otro", label: "Otro" },
];

export const contactCards: ContactCard[] = [
  {
    title: "Correo institucional",
    value: "contacto@vivetured.edu.co",
    href: "mailto:contacto@vivetured.edu.co",
    hint: "Canal para consultas, sugerencias y articulaciones.",
  },
  {
    title: "Ubicación",
    value: "Universidad del Norte, Barranquilla",
    hint: "Facultad de Ciencias Sociales y Humanas.",
  },
  {
    title: "Horario de atención",
    value: "Lunes a viernes, 8:00 a.m. - 5:00 p.m.",
    hint: "Respuesta estimada en 3 a 5 días hábiles.",
  },
];
