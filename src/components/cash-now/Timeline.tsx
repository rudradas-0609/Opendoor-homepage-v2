/**
 * Static comparison timeline from Figma 753:3078.
 * Geometry is on the 1262 canvas; captions hang from the Opendoor bars.
 */

import type { CSSProperties } from "react";

type Bar = {
  width: number;
  label?: string;
  caption?: string;
  confetti?: boolean;
};

const OPENDOOR_BARS: Bar[] = [
  { width: 24, caption: "Get offer" },
  { width: 133, label: "Sell to Opendoor" },
  { width: 50 },
  { width: 24, caption: "First payment", confetti: true },
  { width: 213, label: "Opendoor resells your home" },
  { width: 24, caption: "Second payment", confetti: true },
];

const TRADITIONAL_BARS: Bar[] = [
  { width: 141, label: "Find an agent" },
  { width: 146, label: "Repairs for listing" },
  { width: 152, label: "Staging & Prepping" },
  { width: 427, label: "Host showings and wait for offers" },
  { width: 24 },
  { width: 47 },
  { width: 68 },
];

const CONFETTI_PIECES = [
  { dx: -16, dy: -36, rot: 110, delay: "0ms", w: 6, h: 4, color: "#0042e6" },
  { dx: 14, dy: -32, rot: -80, delay: "20ms", w: 4, h: 7, color: "#81a2f2" },
  { dx: -6, dy: -46, rot: 50, delay: "30ms", w: 5, h: 5, color: "#ffffff", round: true },
  { dx: 8, dy: -42, rot: -130, delay: "10ms", w: 7, h: 4, color: "#0042e6" },
  { dx: 0, dy: -52, rot: 190, delay: "40ms", w: 4, h: 6, color: "#f5c518" },
  { dx: -22, dy: -28, rot: -40, delay: "15ms", w: 6, h: 4, color: "#81a2f2" },
  { dx: 20, dy: -26, rot: 70, delay: "25ms", w: 5, h: 5, color: "#ffffff" },
  { dx: 4, dy: -38, rot: -160, delay: "35ms", w: 3, h: 7, color: "#0042e6" },
] as const;

function Tick({ className = "h-[11px]" }: { className?: string }) {
  return (
    <span aria-hidden className={`block w-px shrink-0 bg-[#786e64] ${className}`} />
  );
}

function PaymentConfetti() {
  return (
    <span aria-hidden className="payment-confetti">
      {CONFETTI_PIECES.map((piece, i) => (
        <span
          key={i}
          className="payment-confetti__piece"
          style={
            {
              "--dx": piece.dx,
              "--dy": piece.dy,
              "--rot": piece.rot,
              "--delay": piece.delay,
              width: piece.w,
              height: piece.h,
              backgroundColor: piece.color,
              borderRadius: "round" in piece && piece.round ? 999 : 1,
            } as CSSProperties
          }
        />
      ))}
    </span>
  );
}

function BarCaption({
  label,
  hittable = false,
}: {
  label: string;
  hittable?: boolean;
}) {
  return (
    <div
      className={`absolute left-1/2 top-[calc(100%+12px)] z-10 flex -translate-x-1/2 flex-col items-center gap-[10px] ${
        hittable ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      <Tick />
      <span className="shrink-0 whitespace-nowrap text-center text-[14px] font-normal leading-normal tracking-[-0.7px] text-[#23201d]">
        {label}
      </span>
    </div>
  );
}

function TimelineBar({
  bar,
  variant,
}: {
  bar: Bar;
  variant: "opendoor" | "traditional";
}) {
  const labeled = Boolean(bar.label);

  return (
    <div
      className={[
        "relative shrink-0 rounded-[4px]",
        labeled
          ? "flex h-[41px] items-center justify-center overflow-clip px-3"
          : "h-[41px] overflow-visible",
        bar.confetti ? "payment-seg" : "",
        variant === "opendoor"
          ? labeled
            ? "bg-[rgba(0,66,230,0.15)]"
            : "bg-[#0042e6]"
          : "bg-[rgba(88,64,50,0.15)]",
      ]
        .filter(Boolean)
        .join(" ")}
      style={{ width: bar.width }}
    >
      {bar.confetti ? <PaymentConfetti /> : null}
      {bar.label ? (
        <p
          className={`whitespace-nowrap text-center text-[14px] font-normal tracking-[-0.7px] ${
            variant === "opendoor" ? "text-[#0042e6]" : "text-[#5d554d]"
          }`}
        >
          {bar.label}
        </p>
      ) : null}
      {bar.caption ? (
        <BarCaption label={bar.caption} hittable={bar.confetti} />
      ) : null}
    </div>
  );
}

export function Timeline() {
  return (
    <div className="w-full overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div className="relative mx-auto h-[257px] w-[1262px]">
        <div className="absolute left-[1184px] top-[33px] flex h-[31px] w-[48px] flex-col items-center gap-[5px]">
          <p className="shrink-0 whitespace-nowrap text-center text-[14px] font-normal leading-normal tracking-[-0.7px] text-[#786e64]">
            90 days
          </p>
          <Tick className="min-h-0 flex-1" />
        </div>

        <p className="absolute left-[30px] top-[86px] w-[159px] whitespace-nowrap text-[20px] font-medium leading-normal tracking-[-0.4px] text-[#806d63]">
          Traditional way
        </p>
        <div className="absolute left-[203px] top-[75px] flex w-[1029px] items-center gap-1">
          {TRADITIONAL_BARS.map((bar, i) => (
            <TimelineBar key={i} bar={bar} variant="traditional" />
          ))}
        </div>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/cash-now-more-later/opendoor-wordmark.svg"
          alt="Opendoor"
          width={95}
          height={25}
          className="absolute left-[30px] top-[143px] h-[24.58px] w-[94.538px]"
        />
        <div className="absolute left-[203px] top-[135px] flex items-center gap-1">
          {OPENDOOR_BARS.map((bar, i) => (
            <TimelineBar key={i} bar={bar} variant="opendoor" />
          ))}
        </div>
      </div>
    </div>
  );
}
