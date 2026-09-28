"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function LayoutChrome({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminArea = pathname.startsWith("/admin");
  const isStandaloneVisualizer = pathname === "/visualizador";
  const hideSiteChrome = isAdminArea || isStandaloneVisualizer;

  return (
    <>
      {!hideSiteChrome && <Header />}
      <main>{children}</main>
      {!hideSiteChrome && <Footer />}
    </>
  );
}
