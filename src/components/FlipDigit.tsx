"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

type FlipDigitProps = {
  digit: string;
  /** Flip duration in ms — shorter for the intro count-up */
  duration?: number;
};

const DEFAULT_DURATION = 450;

/** Split-flap digit tile — Figma 538:4627 */
export function FlipDigit({ digit, duration = DEFAULT_DURATION }: FlipDigitProps) {
  const [current, setCurrent] = useState(digit);
  const [previous, setPrevious] = useState(digit);
  const [flipKey, setFlipKey] = useState(0);
  const currentRef = useRef(digit);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (digit === currentRef.current) return;

    if (timerRef.current) clearTimeout(timerRef.current);

    setPrevious(currentRef.current);
    setCurrent(digit);
    currentRef.current = digit;
    setFlipKey((k) => k + 1);

    timerRef.current = setTimeout(() => {
      setFlipKey(0);
      setPrevious(digit);
    }, duration);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [digit, duration]);

  const halfMs = duration / 2;
  const flipping = flipKey > 0;

  return (
    <div
      className="flip-digit relative h-[57px] w-[46px] shrink-0 rounded-[9px] drop-shadow-[0px_4px_2px_rgba(88,64,50,0.13)]"
      style={
        {
          "--flip-duration": `${duration}ms`,
          "--flip-half": `${halfMs}ms`,
        } as CSSProperties
      }
    >
      {/* Static top — reveals next digit as top flap rotates away */}
      <div className="flip-digit__panel flip-digit__panel--top">
        <PanelChrome position="top" />
        <DigitFace digit={current} />
      </div>

      {/* Static bottom — holds previous until bottom flap lands */}
      <div className="flip-digit__panel flip-digit__panel--bottom">
        <PanelChrome position="bottom" />
        <DigitFace digit={flipping ? previous : current} />
      </div>

      {/* Animating top flap (previous digit folding down) */}
      {flipping && (
        <div key={`top-${flipKey}`} className="flip-digit__flap flip-digit__flap--top">
          <PanelChrome position="top" />
          <DigitFace digit={previous} />
        </div>
      )}

      {/* Animating bottom flap (new digit folding up) */}
      {flipping && (
        <div
          key={`bottom-${flipKey}`}
          className="flip-digit__flap flip-digit__flap--bottom"
        >
          <PanelChrome position="bottom" />
          <DigitFace digit={current} />
        </div>
      )}

      {/* Center seam */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-[28px] left-0 z-20 h-[1px] w-full bg-[rgba(88,64,50,0.18)]"
      />
    </div>
  );
}

function DigitFace({ digit }: { digit: string }) {
  return (
    <span className="flip-digit__face pointer-events-none absolute inset-0 flex h-[57px] w-[46px] translate-x-[-1.5px] items-center justify-center text-[48px] font-medium leading-[50px] tracking-[-2.4px] text-[#25201d]">
      {digit}
    </span>
  );
}

function PanelChrome({ position }: { position: "top" | "bottom" }) {
  const isTop = position === "top";
  return (
    <>
      <div
        aria-hidden
        className={
          isTop
            ? "absolute inset-0 rounded-tl-[9px] rounded-tr-[9px] rounded-br-[3px] rounded-bl-[3px] bg-white/70 backdrop-blur-[11.4px]"
            : "absolute inset-0 rounded-tl-[3px] rounded-tr-[3px] rounded-br-[9px] rounded-bl-[9px] bg-white/70 backdrop-blur-[11.4px]"
        }
      />
      {/* Inset only — outer 1px ring lives on the panel/flap shell so overflow:hidden can't clip it */}
      <div
        aria-hidden
        className="absolute inset-0 rounded-[inherit] shadow-[inset_0px_0px_0px_1px_white,inset_0px_-3px_0px_0px_rgba(88,64,50,0.1)]"
      />
    </>
  );
}

const INITIAL_TARGET = 358_004;
/** Time between each step on a single digit column (0→1→2→…) */
const INTRO_TICK_MS = 90;
const INTRO_FLIP_MS = 80;
/** Slight cascade so columns don’t all tick in lockstep */
const INTRO_STAGGER_MS = 40;
const LIVE_INTERVAL_MS = 2000;
const LIVE_FLIP_MS = 450;
/** Total time for a bump sequence — same whether +1 or +8 */
const LIVE_BUMP_DURATION_MS = 450;

function formatDigits(digits: number[]): string {
  return digits.join("").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function FamilyCounter({
  value = INITIAL_TARGET,
}: {
  value?: number | string;
}) {
  const target =
    typeof value === "string" ? parseInt(value.replace(/,/g, ""), 10) : value;
  const minDigits = String(target).length;

  const [digits, setDigits] = useState<number[]>(() =>
    Array.from({ length: minDigits }, () => 0),
  );
  const [phase, setPhase] = useState<"intro" | "live">("intro");
  const [flipDuration, setFlipDuration] = useState(INTRO_FLIP_MS);
  const countRef = useRef(target);

  // Intro: each column flips 0 → 1 → … → its own target digit
  useEffect(() => {
    const targets = String(target)
      .padStart(minDigits, "0")
      .split("")
      .map((d) => Number(d));

    const timers: ReturnType<typeof setTimeout>[] = [];
    let finishedColumns = 0;

    setFlipDuration(INTRO_FLIP_MS);

    const markDone = () => {
      finishedColumns += 1;
      if (finishedColumns >= targets.length) {
        countRef.current = target;
        setFlipDuration(LIVE_FLIP_MS);
        setPhase("live");
      }
    };

    targets.forEach((targetDigit, index) => {
      if (targetDigit === 0) {
        markDone();
        return;
      }

      for (let step = 1; step <= targetDigit; step++) {
        const delay = index * INTRO_STAGGER_MS + step * INTRO_TICK_MS;
        timers.push(
          setTimeout(() => {
            setDigits((prev) => {
              const next = prev.slice();
              next[index] = step;
              return next;
            });
            if (step === targetDigit) markDone();
          }, delay),
        );
      }
    });

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [target, minDigits]);

  // Live: every 2s, bump by 1–8 — flipping +1 that many times
  useEffect(() => {
    if (phase !== "live") return;

    let cancelled = false;
    const timers = new Set<ReturnType<typeof setTimeout>>();

    const later = (ms: number, fn: () => void) => {
      const id = setTimeout(() => {
        timers.delete(id);
        if (!cancelled) fn();
      }, ms);
      timers.add(id);
    };

    const runBump = () => {
      const bump = Math.floor(Math.random() * 8) + 1;
      const stepMs = LIVE_BUMP_DURATION_MS / bump;
      // Match flip speed to step spacing so +8 still reads as flips, not jumps
      setFlipDuration(Math.max(40, stepMs));

      for (let step = 1; step <= bump; step++) {
        later(step * stepMs, () => {
          countRef.current += 1;
          setDigits(
            String(countRef.current)
              .split("")
              .map((d) => Number(d)),
          );
          if (step === bump) {
            setFlipDuration(LIVE_FLIP_MS);
            later(LIVE_INTERVAL_MS, runBump);
          }
        });
      }
    };

    later(LIVE_INTERVAL_MS, runBump);

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [phase]);

  const display = formatDigits(digits);
  const labelValue = Number(digits.join("")) || countRef.current;

  return (
    <span
      className="inline-flex -translate-y-[6px] items-center gap-1"
      aria-label={`${labelValue.toLocaleString("en-US")} families`}
      aria-live="polite"
    >
      {display.split("").map((char, i) =>
        char === "," ? (
          <span
            key={`comma-${i}`}
            className="text-[48px] font-medium leading-[50px] tracking-[-2.4px] text-[#25201d]"
          >
            ,
          </span>
        ) : (
          <FlipDigit key={`digit-${i}`} digit={char} duration={flipDuration} />
        ),
      )}
    </span>
  );
}
