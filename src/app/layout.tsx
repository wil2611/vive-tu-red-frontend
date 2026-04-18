import type { Metadata } from "next";
import "./globals.css";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import LayoutChrome from "@/components/LayoutChrome";

export const metadata: Metadata = {
  title: "#ViveTuRed — Sensibilización y prevención de VBG",
  description:
    "Repositorio digital del proyecto de investigación–creación para sensibilización y prevención de Violencia Basada en Género (VBG) en entornos universitarios.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <AnalyticsTracker />
        <LayoutChrome>{children}</LayoutChrome>
      </body>
    </html>
  );
}
