import { onMount } from "solid-js";
// https://github.com/langflow-ai/langflow-embedded-chat
/* Lädt das Chat-Script genau einmal */
const ChatScriptLoader = () => {
  onMount(() => {
    if (!document.querySelector('script[src*="langflow-embedded-chat"]')) {
      const script = document.createElement("script");
      script.src =
        "https://cdn.jsdelivr.net/gh/langflow-ai/langflow-embedded-chat@main/dist/build/static/js/bundle.min.js";
      script.async = true;
      document.body.appendChild(script);
    }
  });

  return null;
};

/* JSX-Typ für Custom Element */
declare module "solid-js" {
  namespace JSX {
    interface IntrinsicElements {
      "langflow-chat": any;
    }
  }
}

export const ChatWidget = (props: { className?: string }) => {
  return (
    <div class={props.className}>
      <ChatScriptLoader />
      <langflow-chat
        host_url={process.env.LANGFLOW_URL}
        flow_id={process.env.LANGFLOW_FLOW_ID}
        api_key={process.env.LANGFLOW_API_KEY}
        chat_position="bottom-right"
      />
    </div>
  );
};
