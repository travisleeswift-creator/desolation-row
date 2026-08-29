export type VoiceId = "bm_george" | "bm_lewis" | "bf_emma" | "bf_isabella";

export const VOICES: { id: VoiceId; label: string }[] = [
  { id: "bm_george", label: "George · British" },
  { id: "bm_lewis", label: "Lewis · British" },
  { id: "bf_emma", label: "Emma · British" },
  { id: "bf_isabella", label: "Isabella · British" },
];

export type TtsStatus =
  | { kind: "idle" }
  | { kind: "loading"; detail: string }
  | { kind: "ready"; engine: "kokoro" | "speech" }
  | { kind: "speaking"; index: number; engine: "kokoro" | "speech" }
  | { kind: "error"; message: string };

type Raw = { audio: Float32Array; sampling_rate: number; toBlob?: () => Blob };

type KokoroMod = {
  generate: (text: string, voice: VoiceId) => Promise<Raw>;
};

let kokoroPromise: Promise<KokoroMod> | null = null;

function encodeWav(samples: Float32Array, sampleRate: number): Blob {
  const n = samples.length;
  const buffer = new ArrayBuffer(44 + n * 2);
  const view = new DataView(buffer);
  const write = (offset: number, str: string) => {
    for (let i = 0; i < str.length; i++) view.setUint8(offset + i, str.charCodeAt(i));
  };
  write(0, "RIFF");
  view.setUint32(4, 36 + n * 2, true);
  write(8, "WAVE");
  write(12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  write(36, "data");
  view.setUint32(40, n * 2, true);
  let offset = 44;
  for (let i = 0; i < n; i++) {
    const s = Math.max(-1, Math.min(1, samples[i] ?? 0));
    view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
    offset += 2;
  }
  return new Blob([buffer], { type: "audio/wav" });
}

function chunkText(text: string, max = 280): string[] {
  const sentences = text.replace(/\s+/g, " ").trim().split(/(?<=[.!?])\s+/);
  const chunks: string[] = [];
  let buf = "";
  for (const s of sentences) {
    if ((buf + " " + s).trim().length > max && buf) {
      chunks.push(buf.trim());
      buf = s;
    } else {
      buf = (buf + " " + s).trim();
    }
  }
  if (buf) chunks.push(buf);
  return chunks.filter(Boolean);
}

async function loadKokoro(onProgress: (detail: string) => void): Promise<KokoroMod> {
  if (typeof window === "undefined") {
    throw new Error("Kokoro runs in the browser only");
  }
  if (kokoroPromise) return kokoroPromise;
  kokoroPromise = (async () => {
    onProgress("Loading Kokoro from the free on-device runtime…");
    // Bare specifier kept out of the SSR graph via vite-ignore so Nitro never
    // bundles onnxruntime-node. The browser loads the package from the app origin
    // via the pre-bundled client chunk when available, else the CDN fallback.
    const href = "https://cdn.jsdelivr.net/npm/kokoro-js@1.2.1/+esm";
    const mod = (await import(/* @vite-ignore */ href)) as {
      KokoroTTS: {
        from_pretrained: (
          id: string,
          opts: {
            dtype: string;
            device: string;
            progress_callback: (info: { status?: string; file?: string }) => void;
          },
        ) => Promise<{
          generate: (text: string, opts: { voice: VoiceId; speed: number }) => Promise<Raw>;
        }>;
      };
    };
    const tts = await mod.KokoroTTS.from_pretrained("onnx-community/Kokoro-82M-v1.0-ONNX", {
      dtype: "q8",
      device: "wasm",
      progress_callback: (info: { status?: string; file?: string }) => {
        if (info.file) onProgress(`Loading ${info.file.split("/").pop()}`);
        else onProgress("Preparing Kokoro…");
      },
    });
    return {
      generate: (text: string, voice: VoiceId) =>
        tts.generate(text, { voice, speed: 1 }) as Promise<Raw>,
    };
  })();
  return kokoroPromise;
}

function pickBritishSpeechVoice(): SpeechSynthesisVoice | null {
  const voices = window.speechSynthesis?.getVoices?.() ?? [];
  return (
    voices.find((v) => /en-GB/i.test(v.lang) && /male|daniel|george|uk/i.test(v.name)) ??
    voices.find((v) => /en-GB/i.test(v.lang)) ??
    voices.find((v) => /^en/i.test(v.lang)) ??
    null
  );
}

export type PlayerHandle = {
  play: (parts: string[], from: number) => Promise<void>;
  pause: () => void;
  stop: () => void;
  setVoice: (id: VoiceId) => void;
};

export function createPlayer(opts: {
  onStatus: (s: TtsStatus) => void;
  onIndex: (i: number) => void;
}): PlayerHandle {
  let voice: VoiceId = "bm_george";
  let aborted = false;
  let audio: HTMLAudioElement | null = null;
  let using: "kokoro" | "speech" = "kokoro";

  const pause = () => {
    aborted = true;
    audio?.pause();
    window.speechSynthesis?.cancel();
    opts.onStatus({ kind: "ready", engine: using });
  };

  return {
    setVoice(id) {
      voice = id;
    },
    pause,
    stop() {
      pause();
      opts.onStatus({ kind: "ready", engine: using });
    },
    async play(parts, from) {
      aborted = false;
      const queue = parts.slice(from);
      if (!queue.length) return;

      opts.onStatus({ kind: "loading", detail: "Preparing Kokoro (free, on-device)…" });
      try {
        const model = await loadKokoro((detail) => {
          if (!aborted) opts.onStatus({ kind: "loading", detail });
        });
        using = "kokoro";
        opts.onStatus({ kind: "ready", engine: "kokoro" });

        for (let i = 0; i < queue.length; i++) {
          if (aborted) return;
          const globalIndex = from + i;
          opts.onIndex(globalIndex);
          opts.onStatus({ kind: "speaking", index: globalIndex, engine: "kokoro" });
          const chunks = chunkText(queue[i] ?? "");
          for (const chunk of chunks) {
            if (aborted) return;
            const raw = await model.generate(chunk, voice);
            if (aborted) return;
            const blob = raw.toBlob?.() ?? encodeWav(raw.audio, raw.sampling_rate);
            const url = URL.createObjectURL(blob);
            await new Promise<void>((resolve, reject) => {
              const el = new Audio(url);
              audio = el;
              el.onended = () => {
                URL.revokeObjectURL(url);
                resolve();
              };
              el.onerror = () => {
                URL.revokeObjectURL(url);
                reject(new Error("Audio failed"));
              };
              void el.play();
            });
          }
        }
        if (!aborted) opts.onStatus({ kind: "ready", engine: "kokoro" });
      } catch (err) {
        if (aborted) return;
        console.warn("[tts] Kokoro unavailable, using speechSynthesis", err);
        using = "speech";
        opts.onStatus({ kind: "loading", detail: "Kokoro unavailable — using device voice" });
        const voiceObj = pickBritishSpeechVoice();
        for (let i = 0; i < queue.length; i++) {
          if (aborted) return;
          const globalIndex = from + i;
          opts.onIndex(globalIndex);
          opts.onStatus({ kind: "speaking", index: globalIndex, engine: "speech" });
          await new Promise<void>((resolve) => {
            const u = new SpeechSynthesisUtterance(queue[i]);
            u.rate = 0.96;
            u.lang = "en-GB";
            if (voiceObj) u.voice = voiceObj;
            u.onend = () => resolve();
            u.onerror = () => resolve();
            window.speechSynthesis.cancel();
            window.speechSynthesis.speak(u);
          });
        }
        if (!aborted) opts.onStatus({ kind: "ready", engine: "speech" });
      }
    },
  };
}
