import { createFileRoute, Outlet } from "@tanstack/solid-router";
import { ProfileSideBar } from "~/components/ProfileSideBar";

export const Route = createFileRoute("/profile")({
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
