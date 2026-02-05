import { createFileRoute } from "@tanstack/solid-router";
import { Outlet } from "@tanstack/solid-router";
import { children } from "solid-js";
import { BottomNavBar } from "~/components/BottomNavBar";

export const Route = createFileRoute("/apps")({
   component: RouteComponent,
});

function RouteComponent() {
   return (
      <>
         {" "}
         <Outlet />
         <BottomNavBar />
      </>
   );
}
