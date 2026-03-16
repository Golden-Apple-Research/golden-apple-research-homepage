import { createFileRoute } from "@tanstack/solid-router";

function RouteComponent() {
  return (
    <div class="prose pt-12 pl-12">
      <h1>YOlo</h1>
      {/*<p>{JSON.stringify(drizzle.fetch)}</p>*/}
    </div>
  );
}

export const Route = createFileRoute("/")({
  component: RouteComponent,
});
