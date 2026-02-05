import { createFileRoute, redirect } from "@tanstack/solid-router";
import { createResource, Suspense } from "solid-js";

// export const Route = createFileRoute("/login")({
//    beforeLoad: ({ context }) => {
//       // Redirect if already authenticated
//       if (context.session) {
//          throw redirect({ to: "/" });
//       }
//    },
//    component: Login,
// });

async function getCsrfToken(): Promise<string> {
   const res = await fetch("/api/auth/csrf");
   const data = await res.json();
   return data.csrfToken;
}

export const KeycloakLogin = () => {
   const [csrfToken] = createResource(getCsrfToken);

   return (
      <div class="max-w-md mx-auto mt-10">
         <h1 class="text-2xl font-bold mb-6 text-center">Sign In</h1>

         <div class="space-y-4 ">
            <Suspense fallback={<div class="text-center">Loading...</div>}>
               <form action="/api/auth/signin/keycloak" method="post">
                  <input
                     type="hidden"
                     name="csrfToken"
                     value={csrfToken() ?? ""}
                  />
                  <input type="hidden" name="callbackUrl" value="/" />
                  <button
                     type="submit"
                     class="w-full flex items-center justify-center gap-3 px-4 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors cursor-pointer"
                  >
                     Sign In
                  </button>
               </form>
            </Suspense>

            <p class="text-center text-sm text-gray-300 mt-4">
               You'll be redirected to Keycloak to complete the sign-in process.
            </p>
         </div>
      </div>
   );
}
