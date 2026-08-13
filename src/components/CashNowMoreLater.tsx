"use client";

/**
 * Timeline geometry from Figma node 549:4969 (1440×637 frame).
 * Track runs x=120→1320 (1200px). We keep that 1200px canvas so every
 * left/width is the Figma x delta — no guessed percentages.
 */

const TRACK = 1200;
const FRAME_INSET = 120;

/** Figma absolute x → offset inside the 1200 track */
function tx(x: number) {
  return x - FRAME_INSET;
}

/** Hover lift — room for gap + up to two wrapped explainer lines under the label */
const HOVER_LIFT = 48;
const LABEL_TO_EXPLAINER = 28;
const STEM_HEIGHT = 87;

/**
 * labelWidth from Figma text nodes (549:4979 / 4984 / 4990 / 4994 / 4996).
 * icon bounds from Figma groups. Hit zone = content AABB + RIGHT_PAD, clamped
 * before the next stem so zones don’t steal neighbors.
 */
const OPENDOOR_STEPS = [
  {
    id: "get-offer",
    label: "Get offer",
    labelWidth: 61,
    stemX: 120,
    explainer: "See your cash offer in minutes",
    icon: {
      src: "/images/cash-now-more-later/envelope.png",
      left: 116,
      top: 351,
      width: 61,
      height: 49,
    },
  },
  {
    id: "sign",
    label: "Sign contract",
    labelWidth: 92,
    stemX: 223,
    explainer: "Lock in your price and closing date",
    icon: {
      src: "/images/cash-now-more-later/signature.svg",
      left: 227,
      top: 360,
      width: 49,
      height: 37,
    },
  },
  {
    id: "first-payment",
    label: "First payment",
    labelWidth: 93,
    stemX: 369,
    explainer: "Get most of your cash at closing",
    icon: {
      src: "/images/cash-now-more-later/check.png",
      left: 369,
      top: 360,
      width: 83,
      height: 45,
    },
  },
  {
    id: "move-out",
    label: "Move out",
    labelWidth: 65,
    stemX: 491,
    explainer: "Leave on a date that works for you",
    icon: {
      src: "/images/cash-now-more-later/keys.png",
      left: 501,
      top: 348,
      width: 61,
      height: 55,
    },
  },
  {
    id: "second-payment",
    label: "Second payment",
    labelWidth: 118,
    stemX: 769,
    explainer: "Collect the rest after we resell",
    icon: {
      src: "/images/cash-now-more-later/check-2.png",
      left: 779,
      top: 353,
      width: 81,
      height: 41,
    },
  },
] as const;

/** Label sits 7px right of stem (Figma: stem 120 → label 127, etc.) */
const LABEL_INSET = 7;
/** Extra hover padding past the furthest of icon/label */
const HIT_RIGHT_PAD = 12;
/** Keep a hairline gap so adjacent stems don’t share a pixel */
const HIT_NEXT_GAP = 4;

const TRADITIONAL_STEPS = [
  { id: "search", label: "Search for an agent", left: 120, width: 89 },
  { id: "prep", label: "Prep for showings", left: 224, width: 82 },
  { id: "price", label: "Price and list", left: 321, width: 97 },
  { id: "accept", label: "Accept an offer", left: 961, width: 75 },
  { id: "close", label: "Close", left: 1068, width: 74 },
  {
    id: "move-out-trad",
    label: "Move out on an date you didn’t choose",
    left: 1169,
    width: 151,
    endCap: true,
  },
] as const;

/** Timeline block maps Figma y 348 → 590, plus hover headroom above */
const TIMELINE_TOP = 348;
const TIMELINE_HEIGHT = 590 - TIMELINE_TOP;
const HOVER_PAD = HOVER_LIFT + 8;

/**
 * Hit zone from Figma content bounds (tight — doesn’t steal neighbors).
 * Explainer may use the full gap to the next stem so copy doesn’t wrap
 * early when the following step is farther away.
 */
function stepLayout() {
  return OPENDOOR_STEPS.map((step, i) => {
    const nextStem =
      i < OPENDOOR_STEPS.length - 1
        ? OPENDOOR_STEPS[i + 1]!.stemX
        : FRAME_INSET + TRACK;

    const labelLeft = step.stemX + LABEL_INSET;
    const contentLeft = Math.min(step.stemX, step.icon.left);
    const contentRight = Math.max(
      step.icon.left + step.icon.width,
      labelLeft + step.labelWidth,
    );
    const hitRight = Math.min(
      contentRight + HIT_RIGHT_PAD,
      nextStem - HIT_NEXT_GAP,
    );
    // Explainer can run from label left up to just before the next stem
    const explainerWidth = Math.max(
      step.labelWidth,
      nextStem - HIT_NEXT_GAP - labelLeft,
    );

    return {
      left: tx(contentLeft),
      width: tx(hitRight) - tx(contentLeft),
      explainerWidth,
    };
  });
}

const STEP_LAYOUT = stepLayout();

function OpendoorStep({
  step,
  layout,
}: {
  step: (typeof OPENDOOR_STEPS)[number];
  layout: { left: number; width: number; explainerWidth: number };
}) {
  const labelTop = 402 - TIMELINE_TOP + HOVER_PAD;
  const stemBottomY = 409 - TIMELINE_TOP + HOVER_PAD + STEM_HEIGHT;
  const iconTop = step.icon.top - TIMELINE_TOP + HOVER_PAD;
  const stemLeftInHit = tx(step.stemX) - layout.left;

  return (
    <div
      className="group/step absolute top-0 z-10 overflow-visible"
      style={{
        left: layout.left,
        width: layout.width,
        height: stemBottomY,
      }}
    >
      {/* Invisible focusable hit target */}
      <button
        type="button"
        aria-label={`${step.label}. ${step.explainer}`}
        className="absolute inset-0 z-20 cursor-default rounded-sm focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-[#81a2f2]"
      />

      {/* Stem — anchored to track, grows upward on hover */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 h-[87px] w-px bg-[#0042e6] transition-[height] duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none group-hover/step:h-[135px] group-focus-within/step:h-[135px]"
        style={{ left: stemLeftInHit }}
      />

      {/* Icon + label lift together; explainer fades in under the label */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 transition-transform duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none group-hover/step:-translate-y-12 group-focus-within/step:-translate-y-12 motion-reduce:group-hover/step:translate-y-0 motion-reduce:group-focus-within/step:translate-y-0"
      >
        <div
          className="absolute"
          style={{
            left: tx(step.icon.left) - layout.left,
            top: iconTop,
            width: step.icon.width,
            height: step.icon.height,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={step.icon.src}
            alt=""
            width={step.icon.width}
            height={step.icon.height}
            className="block size-full max-w-none object-contain"
          />
        </div>

        <p
          className="absolute whitespace-nowrap text-[16px] font-normal tracking-[-0.8px] text-[#25201d]"
          style={{
            left: stemLeftInHit + LABEL_INSET,
            top: labelTop,
            width: step.labelWidth,
          }}
        >
          {step.label}
        </p>

        <p
          className="absolute text-[13px] font-normal leading-[16px] tracking-[-0.6px] text-[rgba(37,32,29,0.55)] opacity-0 transition-opacity duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] delay-[60ms] motion-reduce:transition-none group-hover/step:opacity-100 group-focus-within/step:opacity-100"
          style={{
            left: stemLeftInHit + LABEL_INSET,
            top: labelTop + LABEL_TO_EXPLAINER,
            // Use the gap to the next stem — not the tighter hit zone
            width: layout.explainerWidth,
          }}
        >
          {step.explainer}
        </p>
      </div>
    </div>
  );
}

export function CashNowMoreLater() {
  return (
    <section className="relative w-full overflow-x-clip bg-[#fbf9f9] pt-[47px] pb-[47px]">
      <div className="relative mx-auto flex w-full max-w-[1440px] flex-col items-center px-5 sm:px-10 lg:px-[120px]">
        {/* Header — Figma y:47 → 307, centered */}
        <div className="flex w-full max-w-[803px] flex-col items-center text-center">
          <h2 className="w-full max-w-[696px] text-[36px] font-medium leading-[1.1] tracking-[-0.05em] text-[#25201d] sm:text-[44px] sm:leading-[50px] lg:text-[48px] lg:tracking-[-2.4px]">
            <span className="block">Opendoor lets you move on with</span>
            <span className="relative inline-block">
              Cash Now, More Later
              <span
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-[calc(100%-4px)] h-[12px] w-[min(100%,470px)] -translate-x-1/2"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/cash-now-more-later/underline.svg"
                  alt=""
                  className="block size-full max-w-none"
                />
              </span>
            </span>
          </h2>

          <p className="mt-6 w-full text-[18px] font-normal leading-[26px] tracking-[-1px] text-[rgba(37,32,29,0.6)] sm:text-[20px]">
            We resell and then get you the remainder of the money after the
            sale. You also get to choose when you want to move out and plan
            every step according to your timelines.
          </p>

          <button
            type="button"
            className="group/cta relative mt-9 flex h-12 items-center justify-center overflow-clip rounded-xl px-6 shadow-[0px_0px_0px_1px_#0042e6] transition-shadow hover:shadow-[0px_0px_0px_1px_#002b96] active:shadow-[0px_0px_0px_1px_#0042e6] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[#81a2f2]"
          >
            <span
              aria-hidden
              className="absolute inset-0 rounded-xl bg-[#0042e6] transition-colors group-active/cta:bg-[#002ede]"
            />
            <span
              aria-hidden
              className="absolute inset-0 rounded-xl bg-white/12 opacity-0 transition-opacity group-hover/cta:opacity-100 group-active/cta:opacity-0"
            />
            <span className="relative whitespace-nowrap text-[16px] font-medium tracking-[-0.8px] text-white">
              Get started with an offer today
            </span>
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0px_0px_0px_1px_rgba(255,255,255,0.25),inset_0px_-4px_0px_0px_rgba(0,0,0,0.5)] transition-shadow group-hover/cta:shadow-[inset_0px_0px_0px_1px_rgba(255,255,255,0.25),inset_0px_-4px_0px_0px_rgba(0,0,0,0.14)] group-active/cta:shadow-[inset_0px_0px_0px_1px_rgba(255,255,255,0.25)]"
            />
          </button>
        </div>

        {/*
          Gap button→timeline: Figma 307→348 ≈ 41px.
          Timeline canvas is locked to 1200px (Figma track width).
        */}
        <div className="mt-[41px] w-full overflow-x-auto overflow-y-visible [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div
            className="relative mx-auto"
            style={{
              width: TRACK,
              height: TIMELINE_HEIGHT + HOVER_PAD,
            }}
          >
            {/* Interactive Opendoor steps */}
            {OPENDOOR_STEPS.map((step, i) => (
              <OpendoorStep
                key={step.id}
                step={step}
                layout={STEP_LAYOUT[i]!}
              />
            ))}

            {/* Blue “approx. 3 weeks” band — y=471, h=25, w=372 */}
            <div
              className="pointer-events-none absolute flex items-center justify-center bg-[rgba(0,65,231,0.2)]"
              style={{
                left: tx(120),
                top: 471 - TIMELINE_TOP + HOVER_PAD,
                width: 372,
                height: 25,
              }}
            >
              <p className="text-center text-[12px] font-normal tracking-[-0.6px] text-[#0041e7]">
                approx. 3 weeks
              </p>
            </div>

            {/* Blue tick at Second payment — y=471, x=763, w=13 */}
            <div
              aria-hidden
              className="pointer-events-none absolute"
              style={{
                left: tx(763),
                top: 471 - TIMELINE_TOP + HOVER_PAD,
                width: 13,
                height: 25,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/cash-now-more-later/blue-tick.svg"
                alt=""
                className="block size-full max-w-none"
              />
            </div>

            {/* Gray traditional track — y=496, h=25, full width */}
            <div
              className="pointer-events-none absolute bg-[rgba(208,195,188,0.5)]"
              style={{
                left: 0,
                top: 496 - TIMELINE_TOP + HOVER_PAD,
                width: TRACK,
                height: 25,
              }}
            >
              <p
                className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-center text-[12px] font-normal tracking-[-0.6px] text-[rgba(37,32,29,0.6)]"
                style={{ left: tx(726.5) }}
              >
                approx. 2-3 months
              </p>
            </div>

            {/* Traditional steps — frames at y=496, h=94 */}
            {TRADITIONAL_STEPS.map((step) => (
              <div
                key={step.id}
                className="pointer-events-none absolute flex"
                style={{
                  left: tx(step.left),
                  top: 496 - TIMELINE_TOP + HOVER_PAD,
                  width: step.width,
                  height: 94,
                }}
              >
                {"endCap" in step && step.endCap ? (
                  <>
                    <p className="min-w-0 flex-1 self-end text-[16px] font-normal leading-[18px] tracking-[-0.8px] text-[#25201d]">
                      {step.label}
                    </p>
                    <div
                      aria-hidden
                      className="ml-2.5 w-px shrink-0 self-stretch bg-[#d0c3bc]"
                    />
                  </>
                ) : (
                  <>
                    <div
                      aria-hidden
                      className="mr-2.5 w-px shrink-0 self-stretch bg-[#d0c3bc]"
                    />
                    <p className="min-w-0 flex-1 self-end text-[16px] font-normal leading-[18px] tracking-[-0.8px] text-[#25201d]">
                      {step.label}
                    </p>
                  </>
                )}
              </div>
            ))}

            {/* Showings hatch — Figma x=437 w=524, y=521 h=69 */}
            <div
              className="pointer-events-none absolute flex items-center justify-center"
              style={{
                left: tx(437),
                top: 521 - TIMELINE_TOP + HOVER_PAD,
                width: 524,
                height: 69,
              }}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  backgroundImage: "url(/images/cash-now-more-later/hatch.svg)",
                  backgroundSize: "20px 20px",
                  backgroundRepeat: "repeat",
                }}
              />
              <p className="relative text-center text-[16px] font-normal tracking-[-0.8px] text-[rgba(37,32,29,0.6)]">
                Showings and waiting for offers
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ==========================================================================
// VARIANT SWITCHER + 4 ALTERNATE VARIANTS (currently disabled)
//
// Below is the orchestrator that rendered a variant switcher on top of this
// section plus four extra variants (Checklist, Time saved, Process, Effort)
// from ./cash-now/. Those files are fully commented out too (every line
// prefixed with "// "), as are the variant keyframes in app/globals.css.
//
// To re-enable: uncomment the block below, then run:
//   sed -i "" "s|^// ||" src/components/cash-now/*.tsx
// and restore the variant keyframes in app/globals.css.
// ==========================================================================
// "use client";
// 
// import { useEffect, useState, type ComponentType } from "react";
// import { ChecklistVariant } from "./cash-now/ChecklistVariant";
// import { EffortVariant } from "./cash-now/EffortVariant";
// import { ProcessVariant } from "./cash-now/ProcessVariant";
// import { TimelineVariant } from "./cash-now/TimelineVariant";
// import { TimeVariant } from "./cash-now/TimeVariant";
// import { VariantSwitcher, type VariantId } from "./cash-now/VariantSwitcher";
// 
// const VARIANT_COMPONENTS: Record<VariantId, ComponentType> = {
//   timeline: TimelineVariant,
//   checklist: ChecklistVariant,
//   time: TimeVariant,
//   process: ProcessVariant,
//   effort: EffortVariant,
// };
// 
// export function CashNowMoreLater() {
//   const [variant, setVariant] = useState<VariantId>("timeline");
//   const ActiveVariant = VARIANT_COMPONENTS[variant];
// 
//   // Deep-linking for review: ?variant=checklist|time|process|effort
//   useEffect(() => {
//     const id = window.setTimeout(() => {
//       const param = new URLSearchParams(window.location.search).get("variant");
//       if (param && param in VARIANT_COMPONENTS) setVariant(param as VariantId);
//     }, 0);
//     return () => window.clearTimeout(id);
//   }, []);
// 
//   return (
//     <section className="relative w-full overflow-x-clip bg-[#fbf9f9] pt-[47px] pb-[47px]">
//       <div className="relative mx-auto flex w-full max-w-[1440px] flex-col items-center px-5 sm:px-10 lg:px-[120px]">
//         {/* Variant switcher — sits on top of the section */}
//         <VariantSwitcher active={variant} onChange={setVariant} />
// 
//         {/* Header — Figma y:47 → 307, centered */}
//         <div className="mt-10 flex w-full max-w-[803px] flex-col items-center text-center">
//           <h2 className="w-full max-w-[696px] text-[36px] font-medium leading-[1.1] tracking-[-0.05em] text-[#25201d] sm:text-[44px] sm:leading-[50px] lg:text-[48px] lg:tracking-[-2.4px]">
//             <span className="block">Opendoor lets you move on with</span>
//             <span className="relative inline-block">
//               Cash Now, More Later
//               <span
//                 aria-hidden
//                 className="pointer-events-none absolute left-1/2 top-[calc(100%-4px)] h-[12px] w-[min(100%,470px)] -translate-x-1/2"
//               >
//                 {/* eslint-disable-next-line @next/next/no-img-element */}
//                 <img
//                   src="/images/cash-now-more-later/underline.svg"
//                   alt=""
//                   className="block size-full max-w-none"
//                 />
//               </span>
//             </span>
//           </h2>
// 
//           <p className="mt-6 w-full text-[18px] font-normal leading-[26px] tracking-[-1px] text-[rgba(37,32,29,0.6)] sm:text-[20px]">
//             We resell and then get you the remainder of the money after the
//             sale. You also get to choose when you want to move out and plan
//             every step according to your timelines.
//           </p>
// 
//           <button
//             type="button"
//             className="group/cta relative mt-9 flex h-12 items-center justify-center overflow-clip rounded-xl px-6 shadow-[0px_0px_0px_1px_#0042e6] transition-shadow hover:shadow-[0px_0px_0px_1px_#002b96] active:shadow-[0px_0px_0px_1px_#0042e6] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[#81a2f2]"
//           >
//             <span
//               aria-hidden
//               className="absolute inset-0 rounded-xl bg-[#0042e6] transition-colors group-active/cta:bg-[#002ede]"
//             />
//             <span
//               aria-hidden
//               className="absolute inset-0 rounded-xl bg-white/12 opacity-0 transition-opacity group-hover/cta:opacity-100 group-active/cta:opacity-0"
//             />
//             <span className="relative whitespace-nowrap text-[16px] font-medium tracking-[-0.8px] text-white">
//               Get started with an offer today
//             </span>
//             <span
//               aria-hidden
//               className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0px_0px_0px_1px_rgba(255,255,255,0.25),inset_0px_-4px_0px_0px_rgba(0,0,0,0.5)] transition-shadow group-hover/cta:shadow-[inset_0px_0px_0px_1px_rgba(255,255,255,0.25),inset_0px_-4px_0px_0px_rgba(0,0,0,0.14)] group-active/cta:shadow-[inset_0px_0px_0px_1px_rgba(255,255,255,0.25)]"
//             />
//           </button>
//         </div>
// 
//         {/*
//           Gap button→variant: Figma 307→348 ≈ 41px.
//           key remounts on switch so the panel entrance replays.
//         */}
//         <div
//           key={variant}
//           role="tabpanel"
//           id={`cnml-panel-${variant}`}
//           aria-labelledby={`cnml-tab-${variant}`}
//           className="variant-panel-enter mt-[41px] w-full"
//         >
//           <ActiveVariant />
//         </div>
//       </div>
//     </section>
//   );
// }
