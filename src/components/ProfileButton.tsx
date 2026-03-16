import { Link } from "@tanstack/solid-router";
import type { AuthSession } from "start-authjs";
import { Show, createSignal } from "solid-js";
import { Session } from "~/utils/betterAuth";
interface Props {
  session: Session;
}

export function ProfileButton(props: Props) {
  const [imageBroken, setImageBroken] = createSignal(false);

  return (
    <div>
      <Show
        when={props.session?.user?.image && !imageBroken()}
        fallback={
          <span class="inline-block h-10 w-10 items-center justify-center overflow-visible rounded-full bg-gray-300">
            {props.session?.user?.name?.slice(0, 2)}
          </span>
        }
      >
        <img
          src={props.session?.user?.image || "nope"}
          alt={props.session?.user?.name || "yelp"}
          onError={() => setImageBroken(true)}
          id="avatarButton"
          data-dropdown-toggle="userDropdown"
          data-dropdown-placement="bottom-start"
          class="h-15 w-15 cursor-pointer rounded-full"
        />
        <div
          id="userDropdown"
          class="z-10 hidden w-44 rounded-base border border-default-medium bg-neutral-primary-medium shadow-lg"
        >
          <div class="border-b border-default-medium px-4 py-3 text-sm text-heading">
            <div class="font-medium">{props.session?.user?.name || "User"}</div>
          </div>
          <ul
            class="p-2 text-sm font-medium text-body"
            aria-labelledby="avatarButton"
          >
            <li>
              <Link
                to="/profile"
                class="block w-full rounded-md p-2 hover:bg-neutral-tertiary-medium hover:text-heading"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/profile/user"
                class="block w-full rounded-md p-2 hover:bg-neutral-tertiary-medium hover:text-heading"
              >
                User
              </Link>
            </li>
            <li>
              <Link
                to="/profile/linkding"
                class="block w-full rounded-md p-2 hover:bg-neutral-tertiary-medium hover:text-heading"
              >
                Linkding
              </Link>
            </li>
            <li>
              <Link
                to="/"
                class="block w-full rounded-md p-2 text-fg-danger hover:bg-neutral-tertiary-medium"
              >
                Sign out
              </Link>
            </li>
          </ul>
        </div>
      </Show>
    </div>
  );
}
