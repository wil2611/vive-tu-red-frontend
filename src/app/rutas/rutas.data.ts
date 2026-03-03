export interface EmergencyContact {
  name: string;
  desc: string;
  phone: string;
}

export interface Institution {
  name: string;
  type: string;
  desc: string;
  badge: string;
  badgeColor: string;
  icon: string;
}

export type SignalTone = "danger" | "caution" | "emotional" | "support" | "witness" | "report";

export interface HelpSignal {
  tone: SignalTone;
  cue: string;
  label: string;
  desc: string;
}

export interface ProcessStep {
  num: string;
  title: string;
  desc: string;
  color: string;
}

export interface QuickStep {
  num: string;
  title: string;
  hint: string;
  href: string;
}

export const emergencyContacts: EmergencyContact[] = [
  { name: "Línea 155", desc: "Orientación a mujeres víctimas de violencia", phone: "155" },
  { name: "Línea 141", desc: "Protección de niños, niñas y adolescentes (ICBF)", phone: "141" },
  { name: "Linea 123", desc: "Emergencias generales", phone: "123" },
  { name: "Línea 122", desc: "Fiscalía General de la Nación", phone: "122" },
];

export const institutions: Institution[] = [
  {
    name: "Comisaría de Familia",
    type: "Atención y protección",
    desc: "Recepción de denuncias, medidas de protección y orientación jurídica para víctimas de violencia intrafamiliar y VBG.",
    badge: "Presencial",
    badgeColor: "#00555A",
    icon: "CF",
  },
  {
    name: "Fiscalía General de la Nación",
    type: "Justicia y denuncia",
    desc: "Recepción de denuncias penales por delitos de violencia basada en género y acompañamiento en el proceso judicial.",
    badge: "Denuncia",
    badgeColor: "#C96A4A",
    icon: "FG",
  },
  {
    name: "Secretaría de la Mujer",
    type: "Orientación y acompañamiento",
    desc: "Asesoría jurídica, psicológica y social para mujeres en situación de violencia.",
    badge: "Orientación",
    badgeColor: "#DCA15D",
    icon: "SM",
  },
  {
    name: "Bienestar Universitario",
    type: "Apoyo institucional",
    desc: "Acompañamiento psicológico y orientación para estudiantes que enfrentan situaciones de violencia en el entorno universitario.",
    badge: "Universidad",
    badgeColor: "#1D3E2A",
    icon: "BU",
  },
  {
    name: "Defensoría del Pueblo",
    type: "Derechos humanos",
    desc: "Protección y promoción de derechos humanos, orientación gratuita y acompañamiento a víctimas.",
    badge: "Derechos",
    badgeColor: "#00555A",
    icon: "DP",
  },
  {
    name: "Centros de atención a víctimas",
    type: "Atención integral",
    desc: "Servicios de salud, asesoría legal y apoyo psicosocial para víctimas de violencia basada en género.",
    badge: "Integral",
    badgeColor: "#DCA15D",
    icon: "CA",
  },
];

export const whenToSeekHelp: HelpSignal[] = [
  { tone: "danger", cue: "Urgente", label: "Peligro inmediato", desc: "Sientes que tu integridad física o la de alguien cercano está en riesgo." },
  { tone: "caution", cue: "Alerta", label: "Miedo constante", desc: "Vives con temor a las reacciones de una persona o evitas situaciones por miedo." },
  { tone: "emotional", cue: "Cuidado", label: "Violencia emocional", desc: "Experimentas humillaciones, control excesivo, aislamiento o manipulación." },
  { tone: "support", cue: "Acompañamiento", label: "No sabes a quién acudir", desc: "No tienes con quién hablar o sientes que nadie te creerá." },
  { tone: "witness", cue: "Observación", label: "Eres testigo", desc: "Conoces a alguien que puede estar viviendo una situación de violencia." },
  { tone: "report", cue: "Acción legal", label: "Quieres denunciar", desc: "Deseas iniciar un proceso legal o simplemente necesitas orientación." },
];

export const processSteps: ProcessStep[] = [
  {
    num: "01",
    title: "Primera escucha y orientación",
    desc: "Al contactar una institución, te recibirán sin juzgarte. Te explicarán tus derechos y las opciones disponibles. No necesitas pruebas para pedir ayuda.",
    color: "#00555A",
  },
  {
    num: "02",
    title: "Valoración y plan de seguridad",
    desc: "Se evaluará tu situación para determinar el nivel de riesgo y se construirá un plan de seguridad personalizado junto contigo.",
    color: "#1D3E2A",
  },
  {
    num: "03",
    title: "Atención integral",
    desc: "Accederás a acompañamiento psicológico, asesoría jurídica y, si es necesario, atención médica o medidas de protección.",
    color: "#C96A4A",
  },
  {
    num: "04",
    title: "Seguimiento y redes de apoyo",
    desc: "El proceso no termina con el primer contacto. Las instituciones hacen seguimiento y te conectan con redes de apoyo comunitario.",
    color: "#DCA15D",
  },
];

export const quickSteps: QuickStep[] = [
  {
    num: "1",
    title: "Cuándo acudir",
    hint: "Señales de alerta y momentos clave para pedir apoyo.",
    href: "#paso-1",
  },
  {
    num: "2",
    title: "A quién contactar",
    hint: "Líneas e instituciones para orientación inmediata.",
    href: "#paso-2",
  },
  {
    num: "3",
    title: "Qué esperar",
    hint: "Cómo suele avanzar el proceso de atención.",
    href: "#paso-3",
  },
];
