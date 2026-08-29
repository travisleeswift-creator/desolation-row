import { EDITION } from "@/content/edition";
import { Button } from "@/components/ui/button";

export function ShareOnX({ extra }: { extra?: string }) {
  function share() {
    const url = window.location.href;
    const text = extra ? `${EDITION.shareLine} ${extra}` : EDITION.shareLine;
    const href = `https://x.com/intent/post?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    window.open(href, "_blank", "noopener,noreferrer");
  }

  return (
    <Button variant="ink" onClick={share}>
      Share on X
    </Button>
  );
}
