import { createFileRoute } from "@tanstack/solid-router";
import { createSignal, createEffect, onCleanup } from "solid-js";

const RouteComponent = () => {
  const [height, setHeight] = createSignal(window?.innerHeight ?? 0);

  createEffect(() => {
    if (typeof window !== "undefined") {
      setHeight(window.innerHeight);

      const handleResize = () => setHeight(window.innerHeight);
      window.addEventListener("resize", handleResize);

      onCleanup(() => window.removeEventListener("resize", handleResize));
    }
  });

  return (
    <div style={{ height: `${height()}px`, width: "100%", overflow: "auto" }}>
      <iframe
        src="https://final-bench-all-bench-leaderboard.static.hf.space"
        style={{ height: "100%", width: "100%" }}
      ></iframe>
    </div>
  );
};

export const Route = createFileRoute("/models/embeddingleaderboard")({
  component: RouteComponent,
});
