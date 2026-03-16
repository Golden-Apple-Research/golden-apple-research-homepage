import { createServerFn } from "@tanstack/solid-start";
import { db } from "~/lib/db"; // Deine Drizzle Instanz
import { user } from "~/lib/db/schema";
import { eq } from "drizzle-orm";
import { getAuth } from "~/utils/betterAuth"; // Deine authConfig aus dem Beispiel

export const getMyAccountData = createServerFn({ method: "GET" }).handler(
  async () => {
    // 1. Authentifizierung prüfen
    // Hinweis: Die genaue Methode hängt von deiner start-authjs Version ab.
    // Oft wird ein Request-Objekt benötigt.
    const req = {}; // In TanStack Start musst du evtl. das Event-Objekt nutzen, um den Request zu bekommen.

    // Angenommen, du hast Zugriff auf den Request oder eine Helfer-Funktion:
    // const session = await getSession(authConfig);
    // (Dies ist schematisch, da `start-authjs` APIs variieren können)

    // Falls du Zugriff auf das Request-Objekt im Handler Kontext hast:
    // const session = await getSession(authConfig);

    // Für das Beispiel nehmen wir an, wir können die Session so holen:
    // In Solid-Start oft über server-side Helfer.
    // Wenn die Session null ist, wirf einen Fehler.

    // Hier simulieren wir den Zugriff auf die authConfig Internals für die Session:
    const session = null; // Platzhalter für: await getSession(authConfig)

    if (!session) {
      throw new Error("Nicht autorisiert");
    }

    // 2. Authorisierte DB Abfrage mit Drizzle
    // Wir nutzen die 'sub' (Keycloak ID) aus der Session, um NUR die Daten dieses Users zu holen.
    // Das ist "Row Level Security" auf Applikationsebene.
    //   const userSub = session.user.sub;

    //   try {
    //     const profile = await db
    //       .select()
    //       .from(user)
    //       .where(eq(user.keycloakId, userSub))
    //       .limit(1);

    //     return profile[0] || null;
    //   } catch (error) {
    //     console.error("DB Fehler", error);
    //     throw new Error("Fehler beim Abrufen der Daten");
    //   }
  },
);
