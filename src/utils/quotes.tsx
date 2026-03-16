import { createServerFn } from "@tanstack/solid-start";
import { Client } from "@gradio/client";
import { getRequestEvent } from "solid-js/web";
import type { H3Event } from "h3";

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
  if (!event) throw new Error("Kein Request Event verfügbar");

  const h3Event = event as unknown as H3Event;
  const cf = h3Event.context?.cloudflare as
    | CloudflareContext["cloudflare"]
    | undefined;

  if (!cf?.env) {
    const directEnv = (event as unknown as { context: CloudflareContext })
      .context?.cloudflare?.env;
    if (!directEnv) throw new Error("Cloudflare env nicht verfügbar");
    return directEnv;
  }

  return cf.env as { AUDIO_QUOTES: R2Bucket };
}

const fetchRandomQuote = createServerFn().handler(async () => {
  const page = Math.floor(Math.random() * 17);
  const data = await fetch(
    `https://philosophyapi.pythonanywhere.com/api/ideas/?page=${page}`,
  ).then((r) => r.json() as Promise<QuotesResponse>);
  const randomIndex = Math.floor(Math.random() * data.results.length);
  return data.results[randomIndex];
});

export const generateAndUploadAudioQuote = createServerFn({
  method: "POST",
}).handler(async () => {
  console.log("Starting....");

  // const env = getCloudflareEnv();
  // const bucket: R2Bucket = env.AUDIO_QUOTES;

  // 1. Zitat holen
  const quote = await fetchRandomQuote();
  console.log("Got quote:", quote.author);

  // 2. Beispiel-Audio holen
  console.log("Fetching trump.m4a");
  const audioResponse = await fetch(`${process.env.HOST_URL}/trump.m4a`);
  if (!audioResponse.ok) throw new Error("trump.m4a nicht erreichbar");
  const exampleAudio = await audioResponse.blob();

  // 3. Gradio API aufrufen
  console.log("Connecting to Gradio...");
  const client = await Client.connect("mrfakename/MegaTTS3-Voice-Cloning");
  const result = (await client.predict("/generate_speech", {
    inp_audio: exampleAudio,
    inp_text: quote.quote,
    infer_timestep: 3,
    p_w: 3,
    t_w: 3,
  })) as { data: Array<{ url: string }> };

  // 4. Ergebnis-Audio von Gradio holen
  console.log("Fetching generated audio...");
  const generatedAudioUrl = result.data[0]?.url;
  if (!generatedAudioUrl) throw new Error("Keine Audio-URL in Gradio-Antwort");

  const generatedAudioResponse = await fetch(generatedAudioUrl);
  if (!generatedAudioResponse.ok)
    throw new Error("Generiertes Audio nicht abrufbar");
  const audioBuffer = await generatedAudioResponse.arrayBuffer();

  // 5. In R2 hochladen
  console.log("Uploading to R2...");
  const key = `quotes/${Date.now()}-${quote.id}.wav`;

  await bucket.put(key, audioBuffer, {
    httpMetadata: {
      contentType: "audio/wav",
    },
    customMetadata: {
      quoteId: String(quote.id),
      author: quote.author,
      quote: quote.quote.substring(0, 100),
    },
  });

  console.log(`✅ Audio hochgeladen: ${key}`);

  return {
    success: true,
    key,
    quote,
  };
});
