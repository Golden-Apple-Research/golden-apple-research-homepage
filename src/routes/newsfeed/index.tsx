import { createFileRoute } from "@tanstack/solid-router";
import { compile, run } from "@mdx-js/mdx";
import * as runtime from "solid-js/h/jsx-runtime";
import { createResource, Suspense, Component } from "solid-js";
import { Dynamic } from "solid-js/web";

async function compileMdx(source: string) {
  const code = await compile(source, {
    outputFormat: "function-body",
    jsxImportSource: "solid-js",
  });

  const { default: Content } = await run(code, {
    ...runtime,
    baseUrl: import.meta.url,
  });

  return Content as unknown as Component;
}

// Eigene Komponente für den dynamischen Inhalt
function MdxContent(props: { source: string }) {
  const [Content] = createResource(() => compileMdx(props.source));

  return (
    <Suspense fallback={<p>Lädt...</p>}>
      <Dynamic component={Content() ?? "div"} />
    </Suspense>
  );
}

function RouteComponent() {
  return (
    <div class="prose pt-12 pl-12">
      <MdxContent source="# Hallo\n\nDas ist **dynamisches** MDX!" />
    </div>
  );
}

export const Route = createFileRoute("/newsfeed/")({
  component: RouteComponent,
});
