import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
