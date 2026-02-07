import { createFileRoute, redirect, Outlet } from "@tanstack/solid-router";
import { BottomNavBar } from "~/components/BottomNavBar";

export const Route = createFileRoute("/apps")({
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
         <BottomNavBar />
      </>
   );
}
