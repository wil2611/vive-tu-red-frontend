"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  { label: "Inicio", href: "/" },
  { label: "Sobre", href: "/sobre" },
  { label: "Libro", href: "/libro" },
  { label: "Rutas", href: "/rutas" },
  { label: "Recursos", href: "/recursos" },
  { label: "Redes", href: "/redes" },
  { label: "Contacto", href: "/contacto" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header style={{ borderBottom: "1px solid var(--border)" }}>
      <div
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          paddingTop: 14,
          paddingBottom: 14,
        }}
      >
        <Link href="/" style={{ fontWeight: 800 }}>
          #ViveTuRed
        </Link>

        <nav style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>
          {nav.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  padding: "6px 10px",
                  borderRadius: 10,
                  border: isActive ? "1px solid var(--border)" : "1px solid transparent",
                  background: isActive ? "var(--soft)" : "transparent",
                  fontWeight: isActive ? 700 : 500,
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
