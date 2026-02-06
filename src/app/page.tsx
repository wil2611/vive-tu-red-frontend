import Link from "next/link";

const cards = [
  {
    title: "Libro digital",
    desc: "Lectura del cuento #ViveTuRed en formato web, con capítulos y navegación.",
    href: "/libro",
  },
  {
    title: "Rutas de atención",
    desc: "Directorio de rutas institucionales, contactos y guía de atención.",
    href: "/rutas",
  },
  {
    title: "Recursos educativos",
    desc: "Cartillas, guías, infografías y materiales derivados del proyecto.",
    href: "/recursos",
  },
  {
    title: "Visualizador de redes",
    desc: "Herramienta educativa para visualizar redes personales (anonimizadas).",
    href: "/redes",
  },
];

export default function HomePage() {
  return (
    <div style={{ display: "grid", gap: 18 }}>
      <section
        style={{
          border: "1px solid var(--border)",
          borderRadius: 16,
          padding: 20,
          background: "var(--soft)",
        }}
      >
        <h1 style={{ margin: 0, fontSize: 32 }}>#ViveTuRed</h1>
        <p className="muted" style={{ marginTop: 8, lineHeight: 1.6 }}>
          Repositorio digital del proyecto de investigación–creación para sensibilización y
          prevención de Violencia Basada en Género (VBG) en entornos universitarios.
        </p>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 14 }}>
          <Link className="btn" href="/libro">Ir al libro</Link>
          <Link className="btn" href="/rutas">Ver rutas</Link>
          <Link className="btn" href="/recursos">Ver recursos</Link>
        </div>
      </section>

      <section style={{ display: "grid", gap: 12 }}>
        <h2 style={{ margin: 0 }}>Secciones</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 12,
          }}
        >
          {cards.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              style={{
                border: "1px solid var(--border)",
                borderRadius: 16,
                padding: 16,
                background: "white",
              }}
            >
              <div style={{ fontWeight: 800 }}>{c.title}</div>
              <p className="muted" style={{ marginTop: 8, lineHeight: 1.5 }}>
                {c.desc}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
