import { defineConfig, type PluginOption } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { cloudflare } from "@cloudflare/vite-plugin";
import { tanstackStart } from "@tanstack/solid-start/plugin/vite";
import viteSolid from "vite-plugin-solid";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
   server: {
      port: 3000,
   },
   plugins: [
      {
         // Workaround for https://github.com/solidjs/vite-plugin-solid/issues/232
         name: "remove-ssr-external",
         configResolved(config: any) {
            if (config.environments.ssr)
               config.environments.ssr.resolve.external = [];
         },
      },
      tailwindcss(),
      tsConfigPaths({
         projects: ["./tsconfig.json"],
      }),
      cloudflare({ viteEnvironment: { name: "ssr" } }),
      tanstackStart(),
      viteSolid({ ssr: true }),
   ] as PluginOption[],
});
