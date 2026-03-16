import { createFileRoute } from "@tanstack/solid-router";
import { marked } from "marked";
// import iranartikel from "../../assets/content/haiku_analyse.md";
const md = "# Marked in Node.js\n\nRendered [by](https://heise.de) **marked**.";

// const mdxcont = iranartikel;

const Markdown = (props: any) => {
  console.log(`yolo:  ${JSON.stringify(props)}`);
  const content = marked.parse(props.markdown);
  console.log(`yolo:  ${content.toString()}`);
  const html_content = String(content);
  return <div innerHTML={html_content}></div>;
};

function RouteComponent() {
  return (
    <div class="prose pt-12 pl-12">
      <h1>YOLO</h1>
      <Markdown markdown={md} />
      {/*{JSON.stringify(md)}*/}
    </div>
  );
}

export const Route = createFileRoute("/news/")({
  component: RouteComponent,
});
