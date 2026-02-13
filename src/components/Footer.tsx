import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container" style={{ paddingTop: 48, paddingBottom: 40 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: 40,
            marginBottom: 40,
          }}
        >
          {/* Branding */}
          <div>
            <div
              style={{
                fontWeight: 800,
                fontSize: 22,
                fontFamily: "ui-sans-serif, system-ui, sans-serif",
                marginBottom: 12,
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <Image
                src="/logo_footer.png"
                alt="Vive Tu Red"
                width={160}
                height={50}
                style={{ height: 36, width: "auto" }}
              />
            </div>
            <p style={{ fontSize: 13, lineHeight: 1.7, color: "rgba(226,220,194,0.6)", maxWidth: 260 }}>
              Proyecto de investigación–creación para la sensibilización y
              prevención de VBG. Creando redes que protegen en entornos universitarios.
            </p>
          </div>

          {/* Explorar */}
          <div>
            <h4
              style={{
                fontFamily: "ui-sans-serif, system-ui, sans-serif",
                fontWeight: 700,
                fontSize: 14,
                marginBottom: 16,
                color: "#DCA15D",
                textTransform: "uppercase",
                letterSpacing: 1,
              }}
            >
              Explorar
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { label: "Inicio", href: "/" },
                { label: "Sobre el proyecto", href: "/sobre" },
                { label: "Libro digital", href: "/libro" },
                { label: "Rutas de atención", href: "/rutas" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{ fontSize: 13, color: "rgba(226,220,194,0.65)" }}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Recursos */}
          <div>
            <h4
              style={{
                fontFamily: "ui-sans-serif, system-ui, sans-serif",
                fontWeight: 700,
                fontSize: 14,
                marginBottom: 16,
                color: "#DCA15D",
                textTransform: "uppercase",
                letterSpacing: 1,
              }}
            >
              Recursos
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { label: "Recursos educativos", href: "/recursos" },
                { label: "Visualizador de redes", href: "/redes" },
                { label: "Contacto", href: "/contacto" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{ fontSize: 13, color: "rgba(226,220,194,0.65)" }}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contacto */}
          <div>
            <h4
              style={{
                fontFamily: "ui-sans-serif, system-ui, sans-serif",
                fontWeight: 700,
                fontSize: 14,
                marginBottom: 16,
                color: "#DCA15D",
                textTransform: "uppercase",
                letterSpacing: 1,
              }}
            >
              Contacto
            </h4>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 10,
                fontSize: 13,
                color: "rgba(226,220,194,0.65)",
              }}
            >
              <span>contacto@vivetured.edu.co</span>
              <Link href="/contacto" style={{ color: "#DCA15D" }}>
                Formulario de contacto →
              </Link>
            </div>
          </div>
        </div>

        {/* Línea de copyright */}
        <div
          style={{
            borderTop: "1px solid rgba(226,220,194,0.12)",
            paddingTop: 20,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
            fontSize: 12,
            color: "rgba(226,220,194,0.4)",
            fontFamily: "ui-sans-serif, system-ui, sans-serif",
          }}
        >
          <span>© {new Date().getFullYear()} #ViveTuRed. Todos los derechos reservados.</span>
          <span>Creado con empatía para el bienestar social</span>
        </div>
      </div>
    </footer>
  );
}
