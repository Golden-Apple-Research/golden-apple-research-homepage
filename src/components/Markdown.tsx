import { marked } from "marked";

// use <Markdown markdown={markdown} />
export const Markdown = (props: any) => {
  const content = marked.parse(props.markdown);
  const html_content = String(content);
  return <div innerHTML={html_content}></div>;
};
