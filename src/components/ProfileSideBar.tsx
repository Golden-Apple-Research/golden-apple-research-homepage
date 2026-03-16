import { Link } from "@tanstack/solid-router";
import { Route } from "~/routes/api/auth/$";

export function ProfileSideBar({ children }: { children?: any }) {
  const routeContext = Route.useRouteContext();

  return (
    <>
      <aside
        id="default-sidebar"
        class="fixed top-0 left-0 z-40 h-full w-64 -translate-x-full transition-transform sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div class="h-19"></div>

        <div class="h-full overflow-y-auto border-e border-default bg-neutral-primary-soft px-3 py-4">
          <ul class="space-y-2 font-medium">
            <li>
              <Link
                to="/profile"
                class="group flex items-center rounded-base px-2 py-1.5 text-body hover:bg-neutral-tertiary hover:text-fg-brand"
              >
                <span class="ms-3">Dashboard</span>
              </Link>
              <Link
                to="/profile/user"
                class="group flex items-center rounded-base px-2 py-1.5 text-body hover:bg-neutral-tertiary hover:text-fg-brand"
              >
                <span class="ms-3">User</span>
              </Link>
              <Link
                to="/profile/linkding"
                class="group flex items-center rounded-base px-2 py-1.5 text-body hover:bg-neutral-tertiary hover:text-fg-brand"
              >
                <span class="ms-3">Linkding</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}
