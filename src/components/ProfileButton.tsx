import { Link } from "@tanstack/solid-router";
import { Route } from "~/routes/api/auth/$";

export function ProfileButton({ children }: { children?: any }) {
   const routeContext = Route.useRouteContext();

   return (
      <div>
         <button
            id="dropdownDefaultButton"
            data-dropdown-toggle="dropdown"
            class="inline-flex items-center justify-center text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
            type="button"
         >
            Dropdown button
            <svg
               class="w-4 h-4 ms-1.5 -me-0.5"
               aria-hidden="true"
               xmlns="http://www.w3.org/2000/svg"
               width="24"
               height="24"
               fill="none"
               viewBox="0 0 24 24"
            >
               <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 9-7 7-7-7"
               />
            </svg>
         </button>

         <div
            id="dropdown"
            class="z-10 hidden bg-neutral-primary-medium border border-default-medium rounded-base shadow-lg w-44"
         >
            <ul
               class="p-2 text-sm text-body font-medium"
               aria-labelledby="dropdownDefaultButton"
            >
               <li>
                  <a
                     href="/profile"
                     class="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded"
                  >
                     Dashboard
                  </a>
               </li>
               <li>
                  <a
                     href="/profile/user"
                     class="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded"
                  >
                     User Settings
                  </a>
               </li>
               <li>
                  <a
                     href="/apps/"
                     class="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded"
                  >
                     Apps
                  </a>
               </li>
               <li>
                  <a
                     href="#"
                     class="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded"
                  >
                     Sign out
                  </a>
               </li>
            </ul>
         </div>
      </div>
   );
}
