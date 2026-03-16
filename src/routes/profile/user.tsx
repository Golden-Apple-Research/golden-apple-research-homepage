import { createFileRoute, redirect } from "@tanstack/solid-router";
import { Show } from "solid-js";

export const Route = createFileRoute("/profile/user")({
  component: Protected,
});

function Protected() {
  const routeContext = Route.useRouteContext();

  return (
    <div class="mx-auto max-w-2xl">
      <h2 class="mb-4 text-xl font-semibold text-green-800"></h2>
      <div class="py-4 md:py-8">
        <div class="mb-4 grid gap-4 sm:grid-cols-2 sm:gap-8 lg:gap-16">
          <Show when={routeContext().session?.user}>
            {(user) => (
              <>
                {/* Linke Spalte - Informationen */}
                <div class="space-y-4">
                  <dl class="">
                    <dt class="font-semibold text-gray-900 dark:text-white">
                      Username
                    </dt>
                    <dd class="text-gray-500 dark:text-gray-400">
                      {user().name ?? "N/A"}
                    </dd>
                  </dl>
                  <dl class="">
                    <dt class="font-semibold text-gray-900 dark:text-white">
                      Email Address
                    </dt>
                    <dd class="text-gray-500 dark:text-gray-400">
                      {user().email ?? "N/A"}
                    </dd>
                  </dl>
                </div>

                {/* Rechte Spalte - Avatar */}
                <div class="flex flex-col items-center justify-center">
                  <Show
                    when={user().image}
                    fallback={
                      <div class="flex h-24 w-24 items-center justify-center rounded-full bg-gray-300 text-2xl font-bold text-gray-700">
                        {user().name?.charAt(0)?.toUpperCase() ?? "?"}
                      </div>
                    }
                  >
                    <img
                      src={user().image ?? "golden-favicon.ico"}
                      alt={user().name ?? "User avatar"}
                      class="h-24 w-24 rounded-full object-cover"
                    />
                  </Show>
                </div>
              </>
            )}
          </Show>
        </div>
      </div>
    </div>
  );
}
