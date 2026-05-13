import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "google-site-verification", content: "9pC9CBaSRMUiP6ke4bTIriyXVk1RVqoCfmCWF1oD6YI" },
      { title: "Real-time infra layer for AI companions." },
      { name: "description", content: "Dopamint is real-time infrastructure for AI companions powering live voice, persistent identity, multimodal generation, and physical Ai embodiment." },
      { name: "author", content: "Dopamint" },
      { property: "og:title", content: "Real-time infra layer for AI companions." },
      { property: "og:description", content: "Dopamint is real-time infrastructure for AI companions powering live voice, persistent identity, multimodal generation, and physical Ai embodiment." },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://cdn.dopamint.xyz/Landing/og-image.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@dopamint" },
      { name: "twitter:title", content: "Real-time infra layer for AI companions." },
      { name: "twitter:description", content: "Dopamint is real-time infrastructure for AI companions powering live voice, persistent identity, multimodal generation, and physical Ai embodiment." },
      { name: "twitter:image", content: "https://cdn.dopamint.xyz/Landing/og-image.png" },
    ],
    links: [
      {
        rel: "icon",
        type: "image/png",
        href: `${basePath}/favicon.png`,
      },
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&family=Poppins:wght@300;400;500;600;700&display=swap",
      },

      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
    scripts: [
      {
        src: "https://www.googletagmanager.com/gtag/js?id=G-43J55STCHT",
        async: true,
      },
      {
        children: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-43J55STCHT');`,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

import { LoadingScreen } from "../components/site/LoadingScreen";

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="overflow-x-clip">
      <head>
        <HeadContent />
      </head>
      <body className="overflow-x-clip relative w-full m-0 p-0">
        <LoadingScreen />
        <div className="overflow-x-clip w-full relative m-0 p-0">
          {children}
        </div>
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return <Outlet />;
}
