import { Link } from "@tanstack/solid-router";
import { Route } from "~/routes/api/auth/$";
import { ProfileButton } from "./ProfileButton";
import { LoginModal } from "./LoginModal";
import { ThemeToggle } from "./ThemeToggle";

export function NavBar({ children }: { children?: any }) {
   const routeContext = Route.useRouteContext();

   return (
      <nav class="bg-neutral-primary fixed w-full z-20 top-0 start-0 border-b border-default">
         <div class="max-w-9xl flex flex-wrap items-center justify-between mx-auto p-4">
            <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
               <img
                  src="/goldenapplereaserch512.png"
                  class="h-10"
                  alt="Golden Apple Research Logo"
               ></img>
               <span class="self-center text-xl text-heading font-semibold whitespace-nowrap">
                  Golden Apple Research
               </span>
            </a>

            <div class="flex md:order-2 space-x-3 items-center rtl:space-x-reverse">
               <ThemeToggle />
               <LoginModal />
               <ProfileButton />
            </div>
            <div
               class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
               id="navbar-sticky"
            >
               <ul class="flex flex-col p-4 md:p-0 mt-4 font-medium border border-default rounded-base bg-neutral-secondary-soft md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-neutral-primary">
                  <li>
                     <a
                        href="/"
                        class="block py-2 px-3 text-white bg-brand rounded-sm md:bg-transparent md:text-fg-brand md:p-0"
                        aria-current="page"
                     >
                        Home
                     </a>
                  </li>
                  <li>
                     <a
                        href="#"
                        class="block py-2 px-3 text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0 md:dark:hover:bg-transparent"
                     >
                        Newsfeed
                     </a>
                  </li>
                  <li>
                     <a
                        href="/apps"
                        class="block py-2 px-3 text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0 md:dark:hover:bg-transparent"
                     >
                        Apps
                     </a>
                  </li>
               </ul>
            </div>
         </div>
      </nav>
   );
}
