import { createFileRoute, redirect } from "@tanstack/solid-router";
import { createSignal, createEffect, onCleanup } from "solid-js";

const ComfyUiRoute = () => {
   const [height, setHeight] = createSignal(0);

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
         <iframe
            src={process.env.COMFYUI_URL}
            height={height() - 80 + "px"}
            width="100%"
         ></iframe>
      </div>
   );
};
export const Route = createFileRoute("/apps/comfyui")({

   component: ComfyUiRoute,
});
