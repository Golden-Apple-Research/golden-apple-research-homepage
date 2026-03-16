import { createRouter as createTanStackRouter } from "@tanstack/solid-router";
import { routeTree } from "./routeTree.gen";
// import { QueryClient } from "@tanstack/solid-query";
//
import { QueryClient } from "@tanstack/solid-query";
export const queryClient = new QueryClient();

export function getRouter() {
  const router = createTanStackRouter({
    routeTree,
    context: () => ({
      queryClient,
    }),
    scrollRestoration: true,
    defaultPreload: "intent",
    defaultPreloadStaleTime: 0,
  });

  return router;
}

declare module "@tanstack/solid-router" {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
