import { Link } from "@tanstack/solid-router";
import { Route } from "~/routes/api/auth/$";

export function BottomNavBar({ children }: { children?: any }) {
   const routeContext = Route.useRouteContext();

   return (
      <div class="fixed z-20 w-full h-16 max-w-lg -translate-x-1/2 bg-neutral-primary-soft border border-default rounded-full bottom-4 left-1/2">
         <div class="grid h-full max-w-lg grid-cols-5 mx-auto">
            <a
               href="/apps/comfyui"
               class="flex items-center space-x-3 rtl:space-x-reverse"
            >
               <img
                  src="/comfyui.png"
                  class="h-10"
                  alt="Golden Apple Research Logo"
               ></img>
            </a>
            <a
               href="/apps/langflow"
               class="flex items-center space-x-3 rtl:space-x-reverse"
            >
               <img
                  src="/langflow.png"
                  class="h-10"
                  alt="Golden Apple Research Logo"
               ></img>
            </a>
            <a
               href="/apps/owui"
               class="flex items-center space-x-3 rtl:space-x-reverse"
            >
               <img
                  src="/owui-favicon.png"
                  class="h-10"
                  alt="Golden Apple Research Logo"
               ></img>
            </a>
            <a
               href="/apps/forgejo"
               class="flex items-center space-x-3 rtl:space-x-reverse"
            >
               <img
                  src="/forgejo.png"
                  class="h-10"
                  alt="Golden Apple Research Logo"
               ></img>
            </a>
            <a
               href="/apps/rocketchat"
               class="flex items-center space-x-3 rtl:space-x-reverse"
            >
               <img
                  src="/rocketchat.png"
                  class="h-10"
                  alt="Golden Apple Research Logo"
               ></img>
            </a>
         </div>
      </div>
   );
}
