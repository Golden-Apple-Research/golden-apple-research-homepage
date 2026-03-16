import { createSignal } from "solid-js";
import { generateAndUploadAudioQuote } from "~/utils/quotes";

export default function YoloButton() {
  const [loading, setLoading] = createSignal(false);
  const [error, setError] = createSignal<string | null>(null);
  const [result, setResult] = createSignal<Awaited<
    ReturnType<typeof generateAndUploadAudioQuote>
  > | null>(null);

  const handleClick = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await generateAndUploadAudioQuote();
      setResult(data);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div class="pt-8 pl-12">
      <button onClick={handleClick} disabled={loading()}>
        {loading() ? "⏳ Generiere Audio..." : "🎙️ Audio-Zitat generieren"}
      </button>

      {error() && <p>❌ Fehler: {error()}</p>}

      {result() && (
        <div>
          <p>✅ Hochgeladen: {result()!.key}</p>
          <p>
            📖 {result()!.quote.author}: "{result()!.quote.quote}"
          </p>
        </div>
      )}
    </div>
  );
}
