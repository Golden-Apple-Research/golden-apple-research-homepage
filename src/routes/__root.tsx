/// <reference types="vite/client" />
import type { AuthSession } from "start-authjs";
import {
   HeadContent,
   Link,
   Scripts,
   Outlet,
   createRootRoute,
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
import { authConfig } from "~/utils/auth";
import { createServerFn } from "@tanstack/solid-start";
import { getRequest } from "@tanstack/solid-start/server";
import { NavBar } from "~/components/NavBar";
import { getSession } from "start-authjs";

interface RouterContext {
   session: AuthSession | null;
}

const fetchSession = createServerFn({ method: "GET" }).handler(async () => {
   const request = getRequest();
   const session = await getSession(request, authConfig);
   return session;
});
export const Route = createRootRouteWithContext<RouterContext>()({
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
      <RootDocument>
         <Outlet />
      </RootDocument>
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
            <div class="h-19"></div>
            <hr />
            {children}
            <TanStackRouterDevtools position="bottom-right" />
            <Scripts />
         </body>
      </html>
   );
}
