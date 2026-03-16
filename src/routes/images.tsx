import { createFileRoute } from "@tanstack/solid-router";

export const Route = createFileRoute("/images")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/images"!</div>;
}
