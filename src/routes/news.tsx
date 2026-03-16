import { createFileRoute, Outlet } from "@tanstack/solid-router";

export const Route = createFileRoute("/news")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <Outlet />
    </div>
  );
}
