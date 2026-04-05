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

  return (
    <>
      {!isAdminArea && <Header />}
      <main>{children}</main>
      {!isAdminArea && <Footer />}
    </>
  );
}
