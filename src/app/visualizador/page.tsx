import type { Metadata } from "next";
import RedesVisualizer from "../redes/RedesVisualizer";

export const metadata: Metadata = {
  title: "Visualizador de redes de apoyo | Vive Tu Red",
  description:
    "Herramienta interactiva para construir y visualizar una red personal de apoyo.",
};

export default function VisualizadorPage() {
  return <RedesVisualizer showIntro={false} />;
}
