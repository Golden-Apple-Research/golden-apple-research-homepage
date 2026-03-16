// ~/utils/betterAuth.ts
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { getDb, type Env } from "~/lib/db"; // Importiere getDb und Env
import { genericOAuth, keycloak } from "better-auth/plugins";

// Wir exportieren keine Konstante mehr, sondern eine Factory-Funktion
export function getAuth(env: Env) {
  const db = getDb(env); // Neue DB-Instanz für diesen Request

  return betterAuth({
    baseURL: process.env.HOST_URL,
    database: drizzleAdapter(db, {
      provider: "pg",
    }),
    plugins: [
      genericOAuth({
        config: [
          keycloak({
            // Nutze env Variablen, falls sie dort liegen, oder process.env für lokale Dev
            clientId: process.env.AUTH_KEYCLOAK_ID!,
            clientSecret: process.env.AUTH_KEYCLOAK_SECRET!,
            issuer: process.env.AUTH_KEYCLOAK_ISSUER!,
            scopes: ["profile", "email", "openid"],
            pkce: true,
          }),
        ],
      }),
    ],
    mapProfile: async (profile) => {
      return {
        id: profile.sub,
        name: profile.name,
        email: profile.email,
        image: profile.picture,
        // 'preferred_username' kommt aus dem Keycloak Mapper (s.o.)
        username: profile.preferred_username,
        // Keycloak User ID (Subject)
        keycloak_id: profile.sub,
      };
    },
  });
}

export type Auth = ReturnType<typeof getAuth>;
