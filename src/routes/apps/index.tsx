import { createFileRoute } from "@tanstack/solid-router";

export const Route = createFileRoute("/apps/")({
   component: RouteComponent,
});

function RouteComponent() {
   return <div>Hello "/apps/index"!</div>;
}
