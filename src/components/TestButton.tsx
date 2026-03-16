import { createSignal, lazy } from "solid-js";
import { useQuery } from "@tanstack/solid-query";
import ky from "ky";
import { createServerFn } from "@tanstack/solid-start";
import { Client } from "@gradio/client";
import { getRequestEvent, isServer, NoHydration } from "solid-js/web";

import type { H3Event } from "h3";
// Eigene Interface-Erweiterung
interface CloudflareContext {
  cloudflare: {
    env: {
      AUDIO_QUOTES: R2Bucket;
    };
    ctx: ExecutionContext;
  };
}
export interface Quote {
  id: number;
  quote: string;
  author: string;
}

export interface QuotesResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Quote[];
}
function getCloudflareEnv() {
  const event = getRequestEvent();

  if (!event) {
    throw new Error("Kein Request Event verfügbar");
  }

  // In Vinxi/H3 ist der native Event unter event.request oder direkt im event
  const h3Event = event as unknown as H3Event;
  const cf = h3Event.context?.cloudflare as
    | CloudflareContext["cloudflare"]
    | undefined;

  if (!cf?.env) {
    // Fallback: direkt auf context zugreifen
    const directEnv = (event as unknown as { context: CloudflareContext })
      .context?.cloudflare?.env;
    if (!directEnv) {
      throw new Error("Cloudflare env nicht verfügbar");
    }
    return directEnv;
  }

  return cf.env as {
    AUDIO_QUOTES: R2Bucket;
  };
}

const fetchRandomQuote = createServerFn().handler(async () => {
  console.info("Fetching Random Quote");
  const page = Math.floor(Math.random() * 17);
  console.log(page);
  const data = await ky
    .get(`https://philosophyapi.pythonanywhere.com/api/ideas/?page=${page}`)
    .json<QuotesResponse>();
  const randomIndex = Math.floor(Math.random() * data.results.length);
  return data.results[randomIndex];
});

const generateAndUploadAudioQuote = createServerFn().handler(async () => {
  console.log("Starting....");

  const env = getCloudflareEnv();
  const bucket: R2Bucket = env.AUDIO_QUOTES;

  // 1. Zitat holen
  const quote = await fetchRandomQuote();

  console.log("Fetching trump.m4a");
  // 2. Beispiel-Audio holen (muss erreichbar sein, ggf. aus R2 oder public/)
  const response_0 = await fetch(
    `${process.env.HOST_URL}/trump.m4a`, // absoluter URL notwendig in server context!
  );
  const exampleAudio = await response_0.blob();

  // 3. Gradio API aufrufen
  console.log("Upload voice and text to hf....");
  const client = await Client.connect("mrfakename/MegaTTS3-Voice-Cloning");
  const result = (await client.predict("/generate_speech", {
    inp_audio: exampleAudio,
    inp_text: quote.quote,
    infer_timestep: 3,
    p_w: 3,
    t_w: 3,
  })) as { data: Array<{ url: string }> };

  // 4. Ergebnis-Audio von Gradio holen
  console.log("lookking for gradio response");
  const audioUrl = result.data[0]?.url;
  if (!audioUrl) {
    throw new Error("Keine Audio-URL in Gradio-Antwort");
  }

  const audioResponse = await fetch(audioUrl);
  const audioBuffer = await audioResponse.arrayBuffer();

  // 5. In R2 hochladen
  //
  console.log("upload audioquote to cf");
  const key = `quotes/${Date.now()}-${quote.id}.wav`;

  await bucket.put(key, audioBuffer, {
    httpMetadata: {
      contentType: "audio/wav",
    },
    customMetadata: {
      quoteId: String(quote.id),
      author: quote.author,
      quote: quote.quote.substring(0, 100), // R2 metadata hat Limits
    },
  });

  console.log(`✅ Audio hochgeladen: ${key}`);

  return {
    success: true,
    key,
    quote,
  };
});

// GET - Objekt aus R2 holen
const getFromR2 = createServerFn({ method: "GET" }).handler(async (ctx) => {
  const env = getCloudflareEnv();
  const bucket: R2Bucket = env.AUDIO_QUOTES;

  const key = ctx.data as unknown as string;
  const object = await bucket.get(key);

  if (object === null) {
    throw new Error(`Objekt nicht gefunden: ${key}`);
  }

  return {
    body: await object.text(),
    contentType: object.httpMetadata?.contentType,
  };
});

// PUT - Objekt direkt in R2 speichern
const putToR2 = createServerFn({ method: "POST" }).handler(async (ctx) => {
  const env = getCloudflareEnv();
  const bucket: R2Bucket = env.AUDIO_QUOTES;

  const { key, content, contentType } = ctx.data as unknown as {
    key: string;
    content: string;
    contentType?: string;
  };

  await bucket.put(key, content, {
    httpMetadata: {
      contentType: contentType ?? "application/octet-stream",
    },
  });

  return { success: true, message: `Put ${key} erfolgreich!` };
});

export default function TestButton() {
  const [enabled, setEnabled] = createSignal(false);

  const query = useQuery(() => ({
    queryKey: ["quote"],
    queryFn: async () => {
      return await generateAndUploadAudioQuote();
    },
    enabled: enabled() && !isServer, // ✅ Niemals serverseitig ausführen
    retry: false,
  }));

  const handleClick = () => {
    setEnabled(true);
    query.refetch();
  };

  return (
    <div class="pt-8 pl-12">
      <button onClick={handleClick} disabled={query.isLoading}>
        {query.isLoading
          ? "⏳ Generiere Audio..."
          : "🎙️ Audio-Zitat generieren"}
      </button>

      {query.isError && <p>❌ Fehler: {(query.error as Error)?.message}</p>}

      {query.data?.success && (
        <div>
          <p>✅ Hochgeladen: {query.data.key}</p>
          <p>
            📖 {query.data.quote.author}: "{query.data.quote.quote}"
          </p>
        </div>
      )}
    </div>
  );
}
