import { createFileRoute, redirect } from "@tanstack/solid-router";
import { Show } from "solid-js";

export const Route = createFileRoute("/profile/user")({

   component: Protected,
});

function Protected() {
   const routeContext = Route.useRouteContext();

   return (
      <div class="max-w-2xl mx-auto">
         <h1 class="text-3xl font-bold mb-4">
            {" "}
            Welcome, {routeContext().session?.user?.name ?? "User"}!
         </h1>

         <h2 class="text-xl font-semibold mb-4 text-green-800"></h2>

         <div class="py-4 md:py-8">
            <div class="mb-4 grid gap-4 sm:grid-cols-2 sm:gap-8 lg:gap-16">
               <Show when={routeContext().session?.user}>
                  {(user) => (
                     <div class="space-y-4">
                        <dl class="">
                           <dt class="font-semibold text-gray-900 dark:text-white">
                              Username
                           </dt>
                           <dd class="text-gray-500 dark:text-gray-400">
                              {user().name ?? "N/A"}{" "}
                           </dd>
                        </dl>

                        <dl class="">
                           <dt class="font-semibold text-gray-900 dark:text-white">
                              Email Address
                           </dt>
                           <dd class="text-gray-500 dark:text-gray-400">
                              {user().email ?? "N/A"}{" "}
                           </dd>
                        </dl>

                        <div>
                           <a href="/api/auth/signout">Sign out</a>
                        </div>
                     </div>
                  )}
               </Show>
            </div>
         </div>
      </div>
   );
}
