// ~/api/auth/$.ts
import { createFileRoute } from "@tanstack/solid-router";
import { getAuth } from "~/utils/betterAuth"; // Factory importieren

// Definiere deine Env-Vars für TypeScript
interface Env {
  POSTGRES_URL: string;
  // andere vars...
}

export const Route = createFileRoute("/api/auth/$")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        // In Cloudflare Workers/Vite Plugin bekommst du env oft über globalThis oder event.
        // Mit @cloudflare/vite-plugin ist process.env oft gemapped.
        // Wenn du wrangler.toml nutzt, sind die Vars oft direkt via process.env verfügbar.

        const env: Env = {
          POSTGRES_URL: process.env.POSTGRES_URL!,
          // ... hole hier ggf. andere Variablen
        };

        const auth = getAuth(env); // Instanziiere Auth mit DB pro Request
        return auth.handler(request);
      },
      POST: async ({ request }) => {
        const env: Env = { POSTGRES_URL: process.env.POSTGRES_URL! };
        const auth = getAuth(env);
        return auth.handler(request);
      },
    },
  },
});
