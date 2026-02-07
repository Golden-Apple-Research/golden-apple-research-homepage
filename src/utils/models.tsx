import { notFound } from "@tanstack/solid-router";
import { createServerFn } from "@tanstack/solid-start";

type model_pricing = {
  prompt: string;
  completion: string;
  request: string | null;
  image: string | null;
  image_token: string | null;
  image_output: string | null;
  web_search: string | null;
  internal_reasoning: string | null;
  input_cache_read: string | null;
  input_cache_write: string | null;
};
type model_architecture = {
  modality: string;
  input_modalities: string[];
  output_modalities: string[];
  tokenizer: string;
  instruct_type: string | null;
};

type model_top_provider = {
  is_moderated: boolean;
  context_length: number | null;
  max_completion_tokens: number | null;
};

export type OpenrouterModelType = {
  id: string;
  canonical_slug: string;
  name: string;
  created: number;
  pricing: model_pricing;
  context_length: number;
  architecture: model_architecture;
  top_provider: model_top_provider;
  per_request_limits: any | null;
  supported_parameters: string[];
  default_parameters: any | null;
  description: string;
  expiration_date: string | null;
  hugging_face_id: string | null;
};

export const fetchOpenrouterModels = createServerFn().handler(async () => {
  console.info("Fetching models...");
  const res = await fetch(`${process.env.OPENROUTER_API_URL}/v1/models`, {
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch models");
  }

  const json = (await res.json()) as { data: OpenrouterModelType[] };

  return json.data;
});
