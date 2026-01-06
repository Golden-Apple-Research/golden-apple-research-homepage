import { createFileRoute } from "@tanstack/solid-router";
import { createServerFn } from "@tanstack/solid-start";
import { env } from "cloudflare:workers";

export const Route = createFileRoute("/")({
   loader: () => getData(),
   component: Home,
});

const getData = createServerFn().handler(() => {
   return {
      message: `Running in ${navigator.userAgent}`,
      myVar: env.AUTH_KEYCLOAK_ID,
   };
});

function Home() {
   const data = Route.useLoaderData();

   return (
      <div class="p-2">
         <h3>Welcome Home!!!</h3>
         <p>{data().message}</p>
         <p>{data().myVar}</p>
         <p>{navigator.userAgent}</p>
      </div>
   );
}
