import { createSignal, For } from "solid-js";
import { useChat, fetchServerSentEvents } from "@tanstack/ai-solid";

export const AiChat = () => {
  const [input, setInput] = createSignal("");

  const { messages, sendMessage, isLoading } = useChat({
    connection: fetchServerSentEvents("/api/chat"),
  });

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    if (input().trim() && !isLoading()) {
      sendMessage(input());
      setInput("");
    }
  };

  return (
    <div>
      <div>
        <For each={messages()}>
          {(message) => (
            <div>
              <strong>{message.role}:</strong>
              <For each={message.parts}>
                {(part) => {
                  if (part.type === "thinking") {
                    return (
                      <div class="text-sm text-gray-500 italic">
                        💭 Thinking: {part.content}
                      </div>
                    );
                  }
                  if (part.type === "text") {
                    return <span>{part.content}</span>;
                  }
                  return null;
                }}
              </For>
            </div>
          )}
        </For>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          value={input()}
          onInput={(e) => setInput(e.currentTarget.value)}
          disabled={isLoading()}
        />
        <button type="submit" disabled={isLoading()}>
          Send
        </button>
      </form>
    </div>
  );
}
