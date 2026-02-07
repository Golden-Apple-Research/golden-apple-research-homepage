import Keycloak from "@auth/core/providers/keycloak";
import { setCookie } from "@tanstack/solid-start/server";
import type { Profile } from "@auth/core/types";
import type { StartAuthJSConfig } from "start-authjs";

declare module "@auth/core/types" {
   export interface Session {
      user: {
         name: string;
         email: string;
         sub: string;
         email_verified: boolean;
      } & Profile;
      account: {
         access_token: string;
      };
      expires: Date;
   }
}

/**
 * Auth.js configuration for TanStack Start with KEYCLOAK
 */
export const authConfig: StartAuthJSConfig = {
   // basePath is derived from AUTH_URL env var
   // const basePath = config.basePath;
   secret: process.env.AUTH_SECRET,
   providers: [
      Keycloak({
         // Auth.js auto-reads AUTH_KEYCLOAK_ID, AUTH_KEYCLOAK_SECRET, AUTH_KEYCLOAK_ISSUER from env
         authorization: {
            params: {
               scope: "email email_verified openid profile",
               prompt: "login",
            },
         },
         async profile(profile, tokens) {
            setCookie(
               "keycloakToken",
               encodeURIComponent(tokens.access_token ?? ""),
            );
            setCookie(
               "keycloakUser",
               encodeURIComponent(JSON.stringify(profile)),
            );

            return profile;
         },
      }),
   ],
};
