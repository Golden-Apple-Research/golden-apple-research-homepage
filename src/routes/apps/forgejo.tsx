import {
   createFileRoute,
   redirect,
   useLocation,
   useRouteContext,
} from "@tanstack/solid-router";
import { CachedIframe } from "~/components/CachedIframes";
import { createSignal, createEffect, onCleanup } from "solid-js";

const ForgeJoRoute = () => {
   const [height, setHeight] = createSignal(0);
   const context = useRouteContext({ from: "/apps/forgejo" });

   createEffect(() => {
      if (typeof window !== "undefined") {
         setHeight(window.innerHeight);

         const handleResize = () => setHeight(window.innerHeight);
         window.addEventListener("resize", handleResize);

         onCleanup(() => window.removeEventListener("resize", handleResize));
      }
   });
   return (
      <div>
         <CachedIframe
            id="forgejo_iframe"
            active={context == context}
            src={process.env.FORGEJO_URL}
            height={height() - 80 + "px"}
            width="100%"
         ></CachedIframe>
      </div>
   );
};

export const Route = createFileRoute("/apps/forgejo")({
   beforeLoad: ({ context }) => {
      if (!context.session) {
         throw redirect({ to: "/" });
      }
   },
   component: ForgeJoRoute,
});
