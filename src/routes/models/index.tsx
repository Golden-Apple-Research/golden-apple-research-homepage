import { Link, Outlet, createFileRoute } from "@tanstack/solid-router";
import { fetchOpenrouterModels } from "~/utils/models";
import type { OpenrouterModelType } from "~/utils/models";
import { useQuery } from "@tanstack/solid-query";
import { Show, For, createSignal, onMount } from "solid-js";
import { initFlowbite } from "flowbite";

export const Route = createFileRoute("/models/")({
  loader: async () => fetchOpenrouterModels(),

  component: RouteComponent,
});

function RouteComponent() {
  const data = Route.useLoaderData();
  onMount(() => {
    initFlowbite();
  });
  return (
    <>
      <ul class="min-w-6x1 w-7x1 bg-dark-600 list-disc pl-4">
        <For each={data()}>
          {(model) => {
            const [activeTab, setActiveTab] = createSignal("details"); // Lokaler Tab-State pro Model

            return (
              <div class="flex justify-center p-4">
                <div class="flex h-60 w-6xl flex-col rounded-base border bg-neutral-primary shadow-xs">
                  <ul
                    class="w-4x1 flex items-center rounded-t-base border-b border-default bg-neutral-secondary-soft text-sm font-medium text-body"
                    id="defaultTab"
                    data-tabs-toggle="#defaultTabContent"
                    role="tablist"
                  >
                    <li class="flex items-center">
                      <h4 class="p-2">
                        {model.name
                          .match(/:\s*([^(]+)/)?.[1]
                          .trim()
                          .replace("-", " ") ??
                          model.canonical_slug
                            .match(/\/\s*([^(]+)/)?.[1]
                            .trim()
                            .replace("-", " ")
                            .split(" ")
                            .map(
                              (word) =>
                                word.charAt(0).toUpperCase() + word.slice(1),
                            )
                            .join(" ")}
                        <Show
                          when={model.name
                            .match(/\(\s*([^(]+)\)/)?.[1]
                            .trim()
                            .replace("-", " ")}
                        >
                          <span class="ml-3 inline-flex items-center rounded bg-success-soft px-2 py-1 text-sm font-medium text-fg-brand-strong ring-1 ring-success-subtle">
                            Free
                          </span>
                        </Show>{" "}
                      </h4>
                    </li>
                    <li class="absolute left-1/2 -translate-x-1/2">
                      <div class="flex gap-2">
                        <button
                          class={`mr-2 pt-2 pb-2 pl-2 hover:mr-0 hover:bg-neutral-tertiary hover:pr-2 ${activeTab() === "details" ? "text-fg-brand-strong" : ""}`}
                          onClick={() => setActiveTab("details")}
                        >
                          Details
                        </button>

                        <button
                          class={`ml-2 pt-2 pr-2 pb-2 hover:ml-0 hover:bg-neutral-tertiary hover:pl-2 ${activeTab() === "description" ? "text-fg-brand-strong" : ""}`}
                          onClick={() => setActiveTab("description")}
                        >
                          Description
                        </button>
                      </div>
                    </li>
                    <Show when={model.hugging_face_id}>
                      <li class="ml-auto">
                        <a
                          href={
                            "https://huggingface.co/" + model.hugging_face_id
                          }
                          class="flex items-center p-4"
                        >
                          <img
                            src="/huggingface_logo.svg"
                            class="h-5 focus:outline-none"
                            alt="Huggingface Logo"
                          />
                        </a>
                      </li>
                    </Show>
                  </ul>
                  <div class="flex-1 overflow-y-auto p-4">
                    <Show when={activeTab() === "details"}>
                      <div
                        id="defaultTabContent"
                        class="flex max-w-5xl min-w-5xl flex-nowrap p-3"
                      >
                        <div class="block w-3/6 bg-neutral-primary shadow-xs">
                          <div>
                            <div>
                              Provider:{" "}
                              {model.name.match(/^\s*([^:]+?)\s*:/)?.[1] ??
                                model.canonical_slug
                                  .match(/^\s*([^:]+?)\s*\//)?.[1]
                                  .split(" ")
                                  .map(
                                    (word) =>
                                      word.charAt(0).toUpperCase() +
                                      word.slice(1),
                                  )
                                  .join(" ")}
                            </div>
                            <div>Slug: {model.canonical_slug}</div>
                            <div>
                              Release Date:{" "}
                              {new Date(
                                model.created * 1000,
                              ).toLocaleDateString("de-DE")}
                            </div>
                            <div>Context Length: {model.context_length}</div>
                          </div>
                        </div>
                        <div class="block w-3/6 bg-neutral-primary shadow-xs">
                          <div>
                            Input Token:{" "}
                            {Number(
                              (
                                Number(model.pricing.prompt) * 1500000
                              ).toPrecision(12),
                            )}{" "}
                            CHF/Mio Token
                          </div>
                          <div>
                            Output Token:{" "}
                            {Number(
                              (
                                Number(model.pricing.completion) * 1500000
                              ).toPrecision(12),
                            )}{" "}
                            CHF/Mio Token
                          </div>
                          <div>
                            Input Modalities:{" "}
                            {model.architecture.input_modalities.join(" ")}
                          </div>
                          <div>
                            Output Modalities:{" "}
                            {model.architecture.output_modalities.join(" ")}
                          </div>
                          <div>Tokenizer: {model.architecture.tokenizer}</div>
                          <Show when={!!model.architecture?.instruct_type}>
                            <div>
                              Instruct Type: {model.architecture.instruct_type}
                            </div>
                          </Show>
                        </div>
                      </div>
                    </Show>
                    <Show when={activeTab() === "description"}>
                      <div class="block w-5xl bg-neutral-primary p-4 shadow-xs">
                        {model.description || "Keine Beschreibung verfügbar"}
                      </div>
                    </Show>
                  </div>
                </div>
              </div>
            );
          }}
        </For>
      </ul>
    </>
  );
}
