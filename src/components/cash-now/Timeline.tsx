/**
 * Static comparison timeline from Figma 601:1044.
 * Geometry is on the 1440 canvas; y is offset so labels sit at the top of this block.
 * Hover captions draw a longer tick past the always-on labels, then fade in the heading.
 */

import type { CSSProperties } from "react";

const FRAME_TOP = 338;
/** Extra canvas so hover headings sit above always-on labels / below the traditional row. */
const HOVER_ROW_PAD = 36;
const HOVER_TICK_CLASS = "h-[42px]";
const ALWAYS_TICK_CLASS = "h-[11px]";

type CaptionMode = "always" | "hover";

type Bar = {
  width: number;
  label?: string;
  caption?: string;
  captionMode?: CaptionMode;
  confetti?: boolean;
};

const OPENDOOR_BARS: Bar[] = [
  { width: 40, caption: "Get offer", captionMode: "always" },
  { width: 50, caption: "Sign a contract", captionMode: "hover" },
  { width: 24, caption: "First payment", captionMode: "always", confetti: true },
  { width: 98, caption: "Move out whenever you want", captionMode: "hover" },
  { width: 233, label: "Opendoor resells your home" },
  { width: 24, caption: "Second payment", captionMode: "always", confetti: true },
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

const TRADITIONAL_BARS: Bar[] = [
  { width: 94, caption: "Find an agent", captionMode: "hover" },
  { width: 146, label: "Staging & Prepping" },
  { width: 102, caption: "Pricing and listing", captionMode: "hover" },
  { width: 432, label: "Wait for offers and do showings" },
  { width: 24, caption: "Accept an offer", captionMode: "hover" },
  { width: 84, caption: "Close", captionMode: "hover" },
  { width: 123, caption: "Move out on some date", captionMode: "hover" },
];

const HOVER_TICK =
  "scale-y-0 transition-transform duration-[280ms] ease-[cubic-bezier(0.22,1,0.36,1)] delay-75 group-hover/seg:scale-y-100 group-hover/seg:delay-0 group-focus-visible/seg:scale-y-100 group-focus-visible/seg:delay-0 motion-reduce:transition-none motion-reduce:delay-0";

const HOVER_TEXT =
  "opacity-0 transition-opacity duration-200 group-hover/seg:opacity-100 group-hover/seg:delay-[260ms] group-focus-visible/seg:opacity-100 group-focus-visible/seg:delay-[260ms] motion-reduce:transition-none motion-reduce:delay-0";

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
  direction,
  mode,
  hittable = false,
}: {
  label: string;
  direction: "up" | "down";
  mode: CaptionMode;
  hittable?: boolean;
}) {
  const hover = mode === "hover";

  const tick = (
    <Tick
      className={`${hover ? HOVER_TICK_CLASS : ALWAYS_TICK_CLASS} ${
        hover
          ? `${HOVER_TICK} ${direction === "up" ? "origin-bottom" : "origin-top"}`
          : ""
      }`}
    />
  );

  const text = (
    <span
      className={`shrink-0 whitespace-nowrap text-center text-[14px] font-normal leading-normal tracking-[-0.7px] text-[#23201d] ${
        hover ? HOVER_TEXT : ""
      }`}
    >
      {label}
    </span>
  );

  return (
    <div
      aria-hidden={hover}
      className={`absolute left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 ${
        hittable ? "pointer-events-auto" : "pointer-events-none"
      } ${hover ? "z-20" : "z-10"} ${
        direction === "up" ? "bottom-[calc(100%+4px)]" : "top-[calc(100%+4px)]"
      }`}
    >
      {direction === "up" ? (
        <>
          {text}
          {tick}
        </>
      ) : (
        <>
          {tick}
          {text}
        </>
      )}
    </div>
  );
}

function TimelineBar({
  bar,
  direction,
  variant,
}: {
  bar: Bar;
  direction: "up" | "down";
  variant: "opendoor" | "traditional";
}) {
  const hoverable = bar.captionMode === "hover";
  const labeled = Boolean(bar.label);
  const Tag = hoverable ? "button" : "div";

  const className = [
    "relative m-0 shrink-0 rounded-[4px] border-0 p-0 font-[inherit] text-[inherit]",
    labeled
      ? "flex h-[41px] items-center justify-center overflow-clip px-3"
      : "h-11 overflow-visible",
    hoverable
      ? "group/seg cursor-pointer focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-[#81a2f2]"
      : "",
    bar.confetti ? "payment-seg" : "",
    variant === "opendoor"
      ? labeled
        ? "bg-[rgba(0,66,230,0.15)]"
        : "bg-[#0042e6]"
      : "bg-[rgba(88,64,50,0.15)]",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Tag
      {...(hoverable
        ? { type: "button" as const, "aria-label": bar.caption }
        : {})}
      className={className}
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
      {bar.caption && bar.captionMode ? (
        <BarCaption
          label={bar.caption}
          direction={direction}
          mode={bar.captionMode}
          hittable={bar.confetti}
        />
      ) : null}
    </Tag>
  );
}

function DayMark({
  label,
  left,
  top,
  height = 47,
  cap = "both",
}: {
  label: string;
  left: number;
  top: number;
  height?: number;
  cap?: "both" | "bottom";
}) {
  return (
    <div
      className="absolute flex w-[48px] flex-col items-center gap-[5px]"
      style={{ left, top: top - FRAME_TOP + HOVER_ROW_PAD, height }}
    >
      {cap === "both" ? <Tick className="min-h-0 flex-1" /> : null}
      <p className="shrink-0 whitespace-nowrap text-center text-[14px] font-normal leading-normal tracking-[-0.7px] text-[#786e64]">
        {label}
      </p>
      <Tick className="min-h-0 flex-1" />
    </div>
  );
}

export function Timeline() {
  return (
    <div className="w-full overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div className="relative mx-auto h-[312px] w-[1440px]">
        {/* With Opendoor row — bars 631:252, label 631:250 */}
        <div className="absolute left-[126px] top-[70px] flex h-11 items-center">
          <span className="flex items-baseline gap-[5px]">
            <span className="text-[20px] font-medium leading-none tracking-[-1px] text-[#25201d]">
              With
            </span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/cash-now-more-later/opendoor-wordmark.svg"
              alt="Opendoor"
              width={100}
              height={26}
              className="relative top-[5px] h-[26px] w-[100px]"
            />
          </span>
        </div>
        <div className="absolute left-[299px] top-[70px] flex items-center gap-1">
          {OPENDOOR_BARS.map((bar, i) => (
            <TimelineBar
              key={i}
              bar={bar}
              direction="up"
              variant="opendoor"
            />
          ))}
        </div>

        <DayMark label="0 Days" left={290} top={427} />
        <DayMark label="28 Days" left={467} top={427} />
        <DayMark label="90 days" left={1266} top={443} height={31} cap="bottom" />

        {/* Traditional row — bars 631:261, label 631:241 */}
        <div className="absolute left-[126px] top-[183px] flex h-11 items-center">
          <p className="whitespace-nowrap text-[20px] font-medium leading-none tracking-[-1px] text-[#25201d]">
            Traditional way
          </p>
        </div>
        <div className="absolute left-[299px] top-[183px] flex w-[1029px] items-center gap-1">
          {TRADITIONAL_BARS.map((bar, i) => (
            <TimelineBar
              key={i}
              bar={bar}
              direction="down"
              variant="traditional"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
