"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";

const nav = [
  { label: "Inicio", href: "/" },
  { label: "Conoce el Proyecto", href: "/sobre" },
  { label: "Equipo", href: "/equipo" },
  // { label: "Libro digital", href: "/libro" },
  { label: "Rutas de atención", href: "/rutas" },
  { label: "Recursos", href: "/recursos" },
  { label: "Visualiza tu red", href: "/redes" },
  { label: "Contáctanos", href: "/contacto" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: "rgba(250, 249, 245, 0.92)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid #d4cdaf",
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          paddingTop: 12,
          paddingBottom: 12,
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Image
            src="/logo_principal.png"
            alt="Vive Tu Red"
            width={160}
            height={50}
            style={{ height: 40, width: "auto" }}
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav
          style={{
            display: "flex",
            gap: 4,
            flexWrap: "wrap",
            alignItems: "center",
          }}
          className="desktop-nav"
        >
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
                  padding: "8px 16px",
                  borderRadius: 10,
                  fontSize: 14,
                  fontWeight: isActive ? 700 : 500,
                  fontFamily: "ui-sans-serif, system-ui, sans-serif",
                  color: isActive ? "#C96A4A" : "#1D3E2A",
                  background: isActive ? "rgba(201, 106, 74, 0.08)" : "transparent",
                  transition: "all 0.2s",
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="mobile-toggle"
          aria-label="Menú"
          aria-expanded={open}
          aria-controls="main-mobile-nav"
          style={{
            display: "none",
            background: "none",
            border: "none",
            fontSize: 24,
            cursor: "pointer",
            color: "#1D3E2A",
            padding: 4,
          }}
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile nav */}
      {open && (
        <nav
          id="main-mobile-nav"
          className="mobile-nav"
          style={{
            display: "none",
            flexDirection: "column",
            padding: "0 24px 16px",
            gap: 2,
          }}
        >
          {nav.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                style={{
                  padding: "12px 16px",
                  borderRadius: 10,
                  fontSize: 15,
                  fontWeight: isActive ? 700 : 500,
                  fontFamily: "ui-sans-serif, system-ui, sans-serif",
                  color: isActive ? "#C96A4A" : "#1D3E2A",
                  background: isActive ? "rgba(201, 106, 74, 0.08)" : "transparent",
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      )}

      <style jsx>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: block !important; }
          .mobile-nav { display: flex !important; }
        }
      `}</style>
    </header>
  );
}
