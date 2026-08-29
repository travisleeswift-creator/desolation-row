import { useEffect, useRef, useState } from "react";
import { Pause, Play, Square, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createPlayer, VOICES, type TtsStatus, type VoiceId } from "@/lib/tts/engine";
import { cn } from "@/lib/utils";

export function ListenBar({
  parts,
  disabled,
  disabledReason,
}: {
  parts: string[];
  disabled?: boolean;
  disabledReason?: string;
}) {
  const [status, setStatus] = useState<TtsStatus>({ kind: "idle" });
  const [voice, setVoice] = useState<VoiceId>("bm_george");
  const [index, setIndex] = useState(0);
  const player = useRef<ReturnType<typeof createPlayer> | null>(null);

  useEffect(() => {
    player.current = createPlayer({
      onStatus: setStatus,
      onIndex: setIndex,
    });
    return () => player.current?.stop();
  }, []);

  useEffect(() => {
    player.current?.setVoice(voice);
  }, [voice]);

  const speaking = status.kind === "speaking";
  const loading = status.kind === "loading";
  const label =
    status.kind === "loading"
      ? status.detail
      : speaking
        ? `Reading ${index + 1} / ${parts.length}`
        : status.kind === "ready" && status.engine === "speech"
          ? "Device voice (Kokoro unavailable)"
          : "Listen with Kokoro";

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-ink bg-paper/95 px-3 py-3 backdrop-blur-[2px]">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
        <div className="flex items-center gap-2">
          <Volume2 className="size-4 text-crimson" strokeWidth={1.75} />
          <p className="font-sans text-xs tracking-wide text-ink-soft">{label}</p>
        </div>
        <div className="flex flex-1 items-center gap-2">
          <Button
            size="sm"
            variant="ink"
            disabled={disabled || loading || !parts.length}
            onClick={() => {
              if (speaking) player.current?.pause();
              else void player.current?.play(parts, index);
            }}
            aria-label={speaking ? "Pause" : "Listen"}
          >
            {speaking ? <Pause className="size-4" /> : <Play className="size-4" />}
            {speaking ? "Pause" : "Listen"}
          </Button>
          <Button
            size="sm"
            variant="ghost"
            disabled={!speaking && status.kind !== "ready"}
            onClick={() => player.current?.stop()}
            aria-label="Stop"
          >
            <Square className="size-3.5" />
          </Button>
          <label className="sr-only" htmlFor="voice">
            Voice
          </label>
          <select
            id="voice"
            value={voice}
            onChange={(e) => setVoice(e.target.value as VoiceId)}
            className="h-9 min-w-0 flex-1 rounded-sm border border-rule bg-paper px-2 font-sans text-xs text-ink sm:max-w-48"
          >
            {VOICES.map((v) => (
              <option key={v.id} value={v.id}>
                {v.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      {disabledReason ? (
        <p className={cn("mx-auto mt-1 max-w-6xl font-sans text-[11px] text-muted")}>
          {disabledReason}
        </p>
      ) : null}
    </div>
  );
}
