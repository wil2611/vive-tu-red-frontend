# #ViveTuRed Frontend

Aplicacion web del proyecto **#ViveTuRed**, orientada a sensibilizacion, prevencion y acompanamiento frente a Violencia Basada en Genero (VBG) en entornos universitarios.

## Tecnologias

- Next.js 16 (App Router)
- React 19
- TypeScript
- CSS global (`src/app/globals.css`)

## Scripts

```bash
npm run dev      # Desarrollo local
npm run build    # Build de produccion
npm run start    # Servir build de produccion
npm run lint     # Lint con ESLint
```

## Rutas principales

- `/` Inicio
- `/sobre` Sobre el proyecto
- `/equipo` Equipo investigador
- `/rutas` Rutas de atencion
- `/recursos` Recursos y materiales
- `/redes` Visualizador de redes personales
- `/contacto` Formulario e informacion de contacto
- `/libro` Libro digital

## Estructura base

```text
src/
  app/
    page.tsx
    globals.css
    layout.tsx
    sobre/page.tsx
    equipo/page.tsx
    rutas/page.tsx
    recursos/page.tsx
    redes/page.tsx
    contacto/page.tsx
    libro/page.tsx
  components/
    Header.tsx
    Footer.tsx
```

## Ejecutar localmente

1. Instala dependencias:

```bash
npm install
```

2. Inicia el servidor de desarrollo:

```bash
npm run dev
```

3. Abre `http://localhost:3000`.
