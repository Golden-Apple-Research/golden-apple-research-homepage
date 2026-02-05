import { createSignal, Show } from "solid-js";

const [iframes] = createSignal(new Map());

interface CachedIframeProps {
   id: string; // eindeutige Kennung des iframes
   src: string; // URL für das iframe
   active: boolean; // sichtbar oder nicht
   width?: string; // optional: Breite
   height?: string; // optional: Höhe
   title?: string; // optional: title-Attribut
}

export const CachedIframe = (props: CachedIframeProps) => {
   if (!iframes().has(props.id)) {
      iframes().set(
         props.id,
         <iframe
            src={props.src}
            width={props.width || "100%"}
            height={props.height || "600px"}
            title={props.title || "Cached Iframe"}
         />,
      );
   }

   return <Show when={props.active}>{iframes().get(props.id)}</Show>;
};
