import { createAuthClient } from "better-auth/solid";
import { genericOAuthClient } from "better-auth/client/plugins"; // Wichtig: Das Client Plugin importieren

export const authClient = createAuthClient({
  baseURL: "http://localhost:3000",
  plugins: [
    genericOAuthClient(), // Aktiviert die OAuth Methoden im Client
  ],
});

export const { useSession, signIn, signOut } = authClient;
