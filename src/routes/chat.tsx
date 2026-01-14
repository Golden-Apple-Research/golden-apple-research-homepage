import { createFileRoute, redirect } from "@tanstack/solid-router";
import { Show } from "solid-js";
import { For } from "solid-js";

export const Route = createFileRoute("/chat")({
   beforeLoad: ({ context }) => {
      if (!context.session) {
         throw redirect({ to: "/login" });
      }
   },
   loader: async ({ params: { postId } }) =>
     fet({
       data: postId,
     }),
   errorComponent: PostErrorComponent,
   component: PostDeepComponent,
 }),

   component: Protected,
});

function Protected() {
   const routeContext = Route.useRouteContext();
   // The virtualizer

   return (
      <>
         {/* The scrollable element for your list */}
         <div>yolo</div>
      </>
   );
}
