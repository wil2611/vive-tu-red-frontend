export interface GeneralInfo {
  sex: string;
  age: string;
  institution: string;
  occupation: string;
  academicProgram: string;
}

export interface SupportFunctions {
  A: boolean;
  B: boolean;
  C: boolean;
  D: boolean;
  E: boolean;
  F: boolean;
  G: boolean;
}

export interface Person {
  name: string;
  age: string;
  sex: string;
  relationType: string;
  relationOther: string;
  residence: string;
  universityContext: boolean;
  supportFunctions: SupportFunctions;
}

export const MAX_PEOPLE = 30;

export const supportLabels: { key: keyof SupportFunctions; short: string; label: string; icon: string }[] = [
  { key: "A", short: "Intimidad", label: "Asuntos privados, íntimos o cuestiones muy personales", icon: "💬" },
  { key: "B", short: "Ayuda material", label: "Pedir dinero o algún otro tipo de ayuda material", icon: "💰" },
  { key: "C", short: "Consejo", label: "Consejo, orientación o ayuda para tomar decisiones", icon: "🧭" },
  { key: "D", short: "Comprensión", label: "Comparten tu forma de pensar y te sientes comprendido/a", icon: "🤝" },
  { key: "E", short: "Colaboración", label: "Ayuda en el trabajo o en el estudio para realizar tareas", icon: "📚" },
  { key: "F", short: "Ocio", label: "Tiempo libre: cine, salir, compañía, etc.", icon: "🎉" },
  { key: "G", short: "Género", label: "Apoyo en situaciones de vulnerabilidad de género", icon: "🛡️" },
];

export const relationTypes = [
  { value: "Pareja", icon: "💛" },
  { value: "Pariente", icon: "🏠" },
  { value: "Amigo", icon: "👫" },
  { value: "Conocido", icon: "👤" },
  { value: "Otra", icon: "✦" },
];

const relationColorMap: Record<string, string> = {
  Pareja: "#DCA15D",
  Pariente: "#1D3E2A",
  Amigo: "#00555A",
  Conocido: "#C96A4A",
  Otra: "#9C8D70",
};

export const getRelationColor = (relation: string) => relationColorMap[relation] || "#5a7d66";

export const defaultSupportFunctions: SupportFunctions = {
  A: false,
  B: false,
  C: false,
  D: false,
  E: false,
  F: false,
  G: false,
};

export const createInitialSupportFunctions = (): SupportFunctions => ({ ...defaultSupportFunctions });

export const createInitialGeneralInfo = (): GeneralInfo => ({
  sex: "",
  age: "",
  institution: "",
  occupation: "",
  academicProgram: "",
});

export const steps = [
  { id: 1, label: "Paso 1: Info general", icon: "" },
  { id: 2, label: "Paso 2: Conexiones", icon: "" },
  { id: 3, label: "Paso 3: Funciones de apoyo", icon: "" },
  { id: 4, label: "Paso 4: Matriz", icon: "" },
];

export const heroNotes = [
  {
    tone: "edu",
    title: "Propósito educativo",
    desc: "Esta herramienta tiene fines pedagógicos y de sensibilización dentro del proyecto #ViveTuRed.",
  },
  {
    tone: "care",
    title: "No es un diagnóstico",
    desc: "Los resultados no constituyen una evaluación clínica ni psicológica. Si necesitas apoyo profesional, consulta las rutas de atención.",
  },
  {
    tone: "safe",
    title: "Privacidad de datos",
    desc: "Toda la información se procesa localmente en tu dispositivo. No se almacena ni se comparte con terceros.",
  },
];

interface NodeIconProps {
  relation: string;
  x: number;
  y: number;
}

export function NodeIcon({ relation, x, y }: NodeIconProps) {
  const size = 14;
  const dx = x - size / 2;
  const dy = y - size / 2;

  switch (relation) {
    case "Pariente":
      return (
        <g transform={`translate(${dx},${dy})`}>
          <path d="M7 1L1 6h2v6h3V9h2v3h3V6h2L7 1z" fill="white" />
        </g>
      );
    case "Amigo":
      return (
        <g transform={`translate(${dx},${dy})`}>
          <circle cx="4.5" cy="4" r="2.5" fill="white" />
          <circle cx="9.5" cy="4" r="2.5" fill="white" />
          <path d="M1 12c0-2.5 2-4 3.5-4s2.5.8 2.5.8S8.5 8 10.5 8 14 9.5 14 12H1z" fill="white" />
        </g>
      );
    case "Pareja":
      return (
        <g transform={`translate(${dx},${dy})`}>
          <path d="M7 13l-5.5-5.5a3.2 3.2 0 010-4.5 3.2 3.2 0 014.5 0L7 4.1l1-1.1a3.2 3.2 0 014.5 0 3.2 3.2 0 010 4.5L7 13z" fill="white" />
        </g>
      );
    case "Conocido":
      return (
        <g transform={`translate(${dx},${dy})`}>
          <circle cx="7" cy="4" r="3" fill="white" />
          <path d="M2 13c0-3 2.2-5 5-5s5 2 5 5H2z" fill="white" />
        </g>
      );
    default:
      return <circle cx={x} cy={y} r="5" fill="white" />;
  }
}
