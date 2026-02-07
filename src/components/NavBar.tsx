import { Link } from "@tanstack/solid-router";
import { Route } from "~/routes/api/auth/$";
import { ProfileButton } from "./ProfileButton";
import { LoginModal } from "./LoginModal";
import { ThemeToggle } from "./ThemeToggle";

export function NavBar({ children }: { children?: any }) {
  const routeContext = Route.useRouteContext();

  return (
    <nav class="fixed start-0 top-0 z-20 w-full border-b border-default bg-neutral-primary">
      <div class="max-w-9xl mx-auto flex flex-wrap items-center justify-between p-4">
        <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
          <img
            src="/goldenapplereaserch512.png"
            class="h-10"
            alt="Golden Apple Research Logo"
          ></img>
          <span class="self-center text-xl font-semibold whitespace-nowrap text-heading">
            Golden Apple Research
          </span>
        </a>

        <div class="flex items-center space-x-3 md:order-2 rtl:space-x-reverse">
          <LoginModal />
          <ProfileButton />
          <ThemeToggle />
        </div>
        <div
          class="hidden w-full items-center justify-between md:order-1 md:flex md:w-auto"
          id="navbar-sticky"
        >
          <ul class="mt-4 flex flex-col rounded-base border border-default bg-neutral-secondary-soft p-4 font-medium md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-neutral-primary md:p-0 rtl:space-x-reverse">
            <li>
              <a
                href="/"
                class="block rounded-sm bg-brand px-3 py-2 text-white md:bg-transparent md:p-0 md:text-fg-brand"
                aria-current="page"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                class="block rounded px-3 py-2 text-heading hover:bg-neutral-tertiary md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-fg-brand md:dark:hover:bg-transparent"
              >
                Newsfeed
              </a>
            </li>
            <li>
              <a
                href="/models"
                class="block rounded px-3 py-2 text-heading hover:bg-neutral-tertiary md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-fg-brand md:dark:hover:bg-transparent"
              >
                Models
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
