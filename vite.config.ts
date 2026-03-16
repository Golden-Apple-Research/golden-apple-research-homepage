import { defineConfig, type PluginOption } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { cloudflare } from "@cloudflare/vite-plugin";
import { tanstackStart } from "@tanstack/solid-start/plugin/vite";
import viteSolid from "vite-plugin-solid";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  server: {
    port: 3000,
  },
  // resolve: {
  //   alias: {
  //     // Leitet JSX-Dev-Runtime auf Solid's Runtime um
  //     "solid-js/jsx-dev-runtime": "solid-js/jsx-runtime",
  //   },
  // },
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

    cloudflare({ viteEnvironment: { name: "ssr" } }),
    tanstackStart(),
    viteSolid({ ssr: true }),
  ] as PluginOption[],
});
