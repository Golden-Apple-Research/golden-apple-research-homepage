import { createFileRoute, redirect } from "@tanstack/solid-router";
import { Show } from "solid-js";

export const Route = createFileRoute("/linkding")({
   beforeLoad: ({ context }) => {
      if (!context.session) {
         throw redirect({ to: "/login" });
      }
   },
   component: Protected,
});

function Protected() {
   const routeContext = Route.useRouteContext();

   return (
      <div class="max-w-2xl mx-auto">
         <h1 class="text-3xl font-bold mb-4">Linkding Page</h1>
         <iframe
            src="https://ld.golden-apple-research.org"
            height="1200px"
            width="100%"
         ></iframe>
      </div>
   );
}
