
  # Fannisa Azzuri Rienhardt — Portfolio Website

  Interior design & visual merchandising portfolio for Fannisa Azzuri Rienhardt (Deui.space),
  built with React + Vite + TypeScript. Originally scaffolded from a Figma Make template
  ("Bold Portfolio Website Design"); content, imagery, and copy have since been replaced with
  real project data and renders from her portfolio PDF.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.

  Run `npm run build` to create a production build in `dist/`, or `npm run preview` to serve
  that build locally (closer to production than `npm run dev`, since it also exercises the
  routing fallback described below).

  ## Deploying

  Every page has its own URL (e.g. `/about`, `/projects/pavilliun`), handled entirely on the
  client (see `src/app/router.ts` — no react-router, just the native History API). Static hosts
  need to be told to serve `index.html` for any path so those links work on a direct visit or
  refresh, not just when clicked inside the app:
  - **Netlify**: already configured via `public/_redirects`.
  - **Vercel**: already configured via `vercel.json`.
  - **Other static hosts** (GitHub Pages, S3, etc.): look for that host's "SPA fallback" /
    "rewrite all routes to index.html" setting.

  Before going live, update the placeholder `og:url` in `index.html` to the real deployed
  domain, so link previews (WhatsApp/LinkedIn/Instagram) point somewhere real.

  ## Project data

  All project content (locations, materials, clients, images, copy) lives in one place:
  `src/app/data/projects.ts`. Edit a project there and it updates everywhere it appears
  (home carousel, projects archive, and its detail page). Images live in `public/images/`.

  Each project carries **both** English and Indonesian copy (`content.en` / `content.id`) —
  update both when you change a project's story. Everything else translatable (nav, buttons,
  the About page) lives in `src/app/strings.ts`.

  ## Language

  A visitor's language is auto-detected from their browser locale on first visit (Indonesian
  browser → Indonesian site), remembered after that via `localStorage`, and switchable anytime
  with the EN/ID toggle in the nav. See `src/app/i18n.tsx`.

  ## The CV / About page

  `/about` is built from the same CV content as `public/CV-Fannisa-Azzuri-Rienhardt.pdf` (the
  "Download CV" button on that page links straight to it). If the CV changes, update both:
  the page content in `src/app/strings.ts` (the `about` key) and the PDF file itself.
  