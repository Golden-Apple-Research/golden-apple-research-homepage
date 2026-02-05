import { Link } from "@tanstack/solid-router";
import { Route } from "~/routes/api/auth/$";

export function ProfileSideBar({ children }: { children?: any }) {
   const routeContext = Route.useRouteContext();

   return (
      <>
         <aside
            id="default-sidebar"
            class="fixed top-0 left-0 z-40 w-64 h-full transition-transform -translate-x-full sm:translate-x-0"
            aria-label="Sidebar"
         >
            <div class="h-19"></div>

            <div class="h-full px-3 py-4 overflow-y-auto bg-neutral-primary-soft border-e border-default">
               <ul class="space-y-2 font-medium">
                  <li>
                     <a
                        href="#"
                        class="flex items-center px-2 py-1.5 text-body rounded-base hover:bg-neutral-tertiary hover:text-fg-brand group"
                     >
                        <span class="ms-3">Dashboard</span>
                     </a>
                     <a
                        href="/profile/user"
                        class="flex items-center px-2 py-1.5 text-body rounded-base hover:bg-neutral-tertiary hover:text-fg-brand group"
                     >
                        <span class="ms-3">User</span>
                     </a>
                     <a
                        href="/profile/bytestash"
                        class="flex items-center px-2 py-1.5 text-body rounded-base hover:bg-neutral-tertiary hover:text-fg-brand group"
                     >
                        <span class="ms-3">Bytestash</span>
                     </a>{" "}
                     <a
                        href="/profile/linkding"
                        class="flex items-center px-2 py-1.5 text-body rounded-base hover:bg-neutral-tertiary hover:text-fg-brand group"
                     >
                        <span class="ms-3">Linkding</span>
                     </a>
                  </li>
               </ul>
            </div>
         </aside>
      </>
   );
}
