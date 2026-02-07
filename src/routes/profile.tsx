import { createFileRoute, Outlet, redirect } from "@tanstack/solid-router";
import { ProfileSideBar } from "~/components/ProfileSideBar";

export const Route = createFileRoute("/profile")({
   beforeLoad: ({ context }) => {
      if (!context.session) {
         throw redirect({ to: "/" });
      }
   },
   component: RouteComponent,
});

function RouteComponent() {
   return (
      <>
         <Outlet />
         <ProfileSideBar />
      </>
   );
}
