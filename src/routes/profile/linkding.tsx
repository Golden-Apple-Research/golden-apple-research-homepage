import { createFileRoute, redirect } from "@tanstack/solid-router";
import { Show } from "solid-js";

export const Route = createFileRoute("/profile/linkding")({

   component: LinkdDingRoute,
});

function LinkdDingRoute() {
   return (
      <div>
         <iframe
            src={process.env.LINKDING_URL}
            height="2400px"
            width="100%"
         ></iframe>
      </div>
   );
}
