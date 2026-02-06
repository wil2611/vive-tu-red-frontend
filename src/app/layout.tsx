import "./globals.css";
import Header from "@/components/Header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <Header />
        <main className="container">{children}</main>
        <footer className="footer">
          <div className="container footerInner">
            <span>© {new Date().getFullYear()} #ViveTuRed</span>
            <span className="muted">Repositorio digital del proyecto</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
