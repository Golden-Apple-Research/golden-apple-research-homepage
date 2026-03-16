/// <reference types="vite/client" />
import {
  HeadContent,
  Scripts,
  Outlet,
  createRootRouteWithContext,
} from "@tanstack/solid-router";
import { TanStackRouterDevtools } from "@tanstack/solid-router-devtools";
import { HydrationScript } from "solid-js/web";
import { createEffect, onCleanup } from "solid-js";
import { initFlowbite } from "flowbite";
import type * as Solid from "solid-js";
import { DefaultCatchBoundary } from "~/components/DefaultCatchBoundary";
import { NotFound } from "~/components/NotFound";
import appCss from "~/styles/app.css?url";
import { seo } from "~/utils/seo";
import { getAuth, type Auth } from "~/utils/betterAuth";
import { NavBar } from "~/components/NavBar";
import { QueryClient, QueryClientProvider } from "@tanstack/solid-query";
const queryClient = new QueryClient();
import { createServerFn } from "@tanstack/solid-start";
import { getRequest } from "@tanstack/solid-start/server";

interface RouterContext {
  session: Awaited<ReturnType<Auth["api"]["getSession"]>> | null;
}

const fetchSession = createServerFn({ method: "GET" }).handler(async () => {
  const request = getRequest();
  // Better-Auth Session via API holen
  const env = {
    POSTGRES_URL: process.env.POSTGRES_URL!,
  };

  const auth = getAuth(env);

  // Better-Auth Session via API holen
  const session = await auth.api.getSession({
    headers: request.headers,
  });
  return session;
});

export const Route = createRootRouteWithContext<RouterContext>()({
  // 2. beforeLoad ruft die Server-Funktion auf
  beforeLoad: async () => {
    const session = await fetchSession();
    return {
      session,
    };
  },
  head: () => ({
    meta: [
      {
        charset: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      ...seo({
        title: "Golden Apple Research",
        description: `Crazy Awesome Discordian Studies`,
      }),
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/apple-touch-icon.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/golden-favicon-32x32.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/golden-favicon-16x16.png",
      },
      { rel: "manifest", href: "/site.webmanifest", color: "#fffff" },
      { rel: "icon", href: "/golden-favicon.ico" },
    ],
    scripts: [
      {
        children: `
               (function() {
                  try {
                     var theme = localStorage.getItem('theme');
                     var supportDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches === true;
                     if (!theme && supportDarkMode) theme = 'dark';
                     if (theme === 'dark') {
                        document.documentElement.classList.add('dark');
                     } else {
                        document.documentElement.classList.remove('dark');
                     }
                  } catch (e) {}
               })();
            `,
      },
      {
        src: "/customScript.js",
        type: "text/javascript",
      },
    ],
  }),
  component: RootComponent,
  errorComponent: DefaultCatchBoundary,
  notFoundComponent: () => <NotFound />,
  // shellComponent: RootDocument,
});
function RootComponent() {
  return (
    <QueryClientProvider client={queryClient}>
      <RootDocument>
        <Outlet />
      </RootDocument>
    </QueryClientProvider>
  );
}
function RootDocument({ children }: { children: Solid.JSX.Element }) {
  createEffect(() => {
    const timeout = setTimeout(() => {
      initFlowbite();
    }, 50);
    onCleanup(() => clearTimeout(timeout));
  });

  return (
    <html>
      <head>
        <HydrationScript />
      </head>
      <body>
        <HeadContent />
        <NavBar />
        {children}
        <TanStackRouterDevtools position="bottom-right" />
        <Scripts />
      </body>
    </html>
  );
}
