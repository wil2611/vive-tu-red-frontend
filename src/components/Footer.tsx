import Link from "next/link";
import Image from "next/image";

const exploreLinks = [
  { label: "Inicio", href: "/" },
  { label: "Sobre el proyecto", href: "/sobre" },
  { label: "Libro digital", href: "/libro" },
  { label: "Rutas de atención", href: "/rutas" },
];

const resourceLinks = [
  { label: "Recursos educativos", href: "/recursos" },
  { label: "Visualizador de redes", href: "/redes" },
  { label: "Contacto", href: "/contacto" },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-grid">
          {/* Branding */}
          <section className="footer-brand" aria-label="Información del proyecto">
            <div className="footer-logo-wrap">
              <Image
                src="/logo_footer.png"
                alt="Vive Tu Red"
                width={160}
                height={50}
                className="footer-logo"
              />
            </div>
            <p className="footer-brand-desc">
              Proyecto de investigación-creación para la sensibilización y prevención de Violencia Basada en Género (VBG). Creando redes que protegen en entornos universitarios.
            </p>
            {/* <div className="footer-partner">
              <span className="footer-partner-label">Aliado académico</span>
              <div className="footer-partner-logo-wrap">
                <Image
                  src="/logo_uninorte.png"
                  alt="Universidad del Norte de Barranquilla"
                  width={180}
                  height={59}
                  className="footer-partner-logo"
                />
              </div>
            </div> */}
          </section>

          {/* Explorar */}
          <nav className="footer-col" aria-label="Navegación principal">
            <h4 className="footer-title">Explorar</h4>
            <ul className="footer-list">
              {exploreLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Recursos */}
          <nav className="footer-col" aria-label="Recursos del sitio">
            <h4 className="footer-title">Recursos</h4>
            <ul className="footer-list">
              {resourceLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contacto */}
          <section className="footer-col" aria-label="Canales de contacto">
            <h4 className="footer-title">Contacto</h4>
            <div className="footer-contact">
              <a href="mailto:contacto@vivetured.edu.co">contacto@vivetured.edu.co</a>
              <Link href="/contacto" className="footer-cta-link">
                Formulario de contacto →
              </Link>
            </div>
          </section>
        </div>

        {/* Línea de copyright */}
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} #ViveTuRed. Todos los derechos reservados.</span>
          <span>Creado con empatía para el bienestar social</span>
        </div>
      </div>
    </footer>
  );
}
