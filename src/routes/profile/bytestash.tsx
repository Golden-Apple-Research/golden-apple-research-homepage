import { createFileRoute, redirect } from "@tanstack/solid-router";
import { Show } from "solid-js";

export const Route = createFileRoute("/profile/bytestash")({
   beforeLoad: ({ context }) => {
      if (!context.session) {
         throw redirect({ to: "/" });
      }
   },
   component: ByteStashRoute,
});

function ByteStashRoute() {
   return (
      <div>
         {" "}
         <iframe
            src={process.env.BYTESTASH_URL}
            height="2400px"
            width="100%"
         ></iframe>
      </div>
   );
}
