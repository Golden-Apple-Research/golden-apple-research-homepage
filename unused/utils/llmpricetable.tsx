import { notFound } from "@tanstack/solid-router";
import { createServerFn } from "@tanstack/solid-start";
import { env } from "cloudflare:workers";

export type LLMPriceType = {
   model_key: string;
   input_price_per_million: number;
   output_price_per_million: number;
   created_at: string;
   updated_at: string;
};

export const fetchLLMPrice = createServerFn({ method: "GET" })
   .inputValidator((d: string) => d)
   .handler(async ({ data }) => {
      console.info(`Fetching post with id ${data}...`);
      const res = await fetch(env.ANYLLM_API_URL);
      if (!res.ok) {
         if (res.status === 404) {
            throw notFound();
         }

         throw new Error("Failed to fetch LLM Pricing");
      }

      const post = await res.json();

      return post as LLMPriceType;
   });

export const fetchLLMPrices = createServerFn().handler(async () => {
   console.info("Fetching posts...");
   const res = await fetch(env.ANYLLM_API_URL);
   if (!res.ok) {
      throw new Error("Failed to fetch LLM prices");
   }

   const posts = await res.json();

   return (posts as Array<LLMPriceType>).slice(0, 10);
});
