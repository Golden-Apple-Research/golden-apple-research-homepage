// ~/lib/db/index.ts
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

// Typ für Cloudflare Environment
export interface Env {
  POSTGRES_URL: string;
}

/**
 * Erstellt eine neue DB-Verbindung pro Request.
 * WICHTIG: 'max: 1' und 'idle_timeout: 0' sind essenziell für CF Workers.
 */
export function getDb(env: Env) {
  if (!env.POSTGRES_URL) {
    throw new Error("POSTGRES_URL ist nicht definiert.");
  }

  const client = postgres(env.POSTGRES_URL, {
    // SSL: Supabase benötigt SSL. Lokal (Docker) meist nicht.
    // Prüft, ob 'localhost' in der URL ist.
    ssl:
      env.POSTGRES_URL.includes("localhost") ||
      env.POSTGRES_URL.includes("home.arpa")
        ? false
        : { rejectUnauthorized: false },
    max: 1, // Nur 1 Verbindung pro Request-Isolat
    idle_timeout: 0, // Verhindert, dass postgres-js die Verbindung schließt, während der Worker wartet
    onnotice: () => {},
  });

  return drizzle(client, { schema });
}

// Für Migrationen/Drizzle Kit (läuft in Node, nicht im Worker)
// Wir nutzen process.env, da 'env' hier nicht verfügbar ist.
export const db =
  typeof process !== "undefined" && process.env.POSTGRES_URL
    ? drizzle(postgres(process.env.POSTGRES_URL!, { max: 1 }), { schema })
    : (null as any);
