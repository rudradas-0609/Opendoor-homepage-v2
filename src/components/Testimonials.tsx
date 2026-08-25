"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { FamilyCounter } from "./FlipDigit";

const CARD_SHADOW =
  "shadow-[0px_19px_22.2px_-14px_rgba(74,40,20,0.15),0px_0px_0px_1px_rgba(100,57,31,0.32)]";

const GAP = 44;
const FEATURED_WIDTH = 539;
const COMPACT_WIDTH = 310;
const WIDTH_DELTA = FEATURED_WIDTH - COMPACT_WIDTH;
const QUOTE_LINE_HEIGHT = 26;
const QUOTE_MAX_HEIGHT = QUOTE_LINE_HEIGHT * 3;
/** Drag distance (px) that advances progress by 1 card */
const DRAG_STEP = COMPACT_WIDTH + GAP;
/** Max progress past either end (rubber-band / bump) */
const OVERSCROLL_MAX = 0.34;
/** Outward impulse for end-arrow bump (spring overshoots, then returns) */
const BUMP_VELOCITY = 2.6;
const SPRING_STIFFNESS = 260;
const SPRING_DAMPING = 24;
const SPRING_MASS = 1;

type Testimonial = {
  id: string;
  image: string;
  quote: string;
  caption: string;
  name: string;
  location: string;
  avatar: string;
};

const testimonials: Testimonial[] = [
  {
    id: "neil",
    image: "/images/testimonials/card-1.png",
    quote:
      "“From start to finish, the entire experience was seamless — I felt supported every step of the way. I’d recommend them to anyone without hesitation.”",
    caption: "From start to finish, the entire experience",
    name: "Neil Mosciski",
    location: "Cupertino, CA",
    avatar: "/images/testimonials/avatar-neil.png",
  },
  {
    id: "eleanor",
    image: "/images/testimonials/card-2.png",
    quote:
      "“Selling our home felt effortless from start to finish. We received a fair cash offer within 24 hours, skipped the showings, and closed on our timeline.”",
    caption: "A fair cash offer within 24 hours",
    name: "Eleanor Johnston",
    location: "Dallas, TX",
    avatar: "/images/testimonials/avatar-2.png",
  },
  {
    id: "tomas",
    image: "/images/testimonials/card-3.png",
    quote:
      "“The offer was fair and the entire process was completely stress-free. No open houses, no last-minute surprises — just a clear path to closing.”",
    caption: "Completely stress-free from offer to close",
    name: "Tomas Crist",
    location: "Phoenix, AZ",
    avatar: "/images/testimonials/avatar-2.png",
  },
  {
    id: "tomas-2",
    image: "/images/testimonials/card-4.png",
    quote:
      "“We skipped the repairs, the staging, and the months of uncertainty and went straight to closing with a price we felt good about.”",
    caption: "Straight to closing, no uncertainty",
    name: "Tomas Crist",
    location: "Phoenix, AZ",
    avatar: "/images/testimonials/avatar-2.png",
  },
  {
    id: "priya",
    image: "/images/testimonials/card-1.png",
    quote:
      "“We needed to relocate for work on a tight timeline. Opendoor made it possible without the usual chaos of listing, showings, and waiting.”",
    caption: "Relocated on a tight timeline",
    name: "Priya Shah",
    location: "Austin, TX",
    avatar: "/images/testimonials/avatar-neil.png",
  },
  {
    id: "marcus",
    image: "/images/testimonials/card-2.png",
    quote:
      "“The cash offer came quickly and the team was transparent about every step. Closing day felt almost too easy after everything we’d heard about selling.”",
    caption: "Transparent every step of the way",
    name: "Marcus Bell",
    location: "Atlanta, GA",
    avatar: "/images/testimonials/avatar-2.png",
  },
  {
    id: "sofia",
    image: "/images/testimonials/card-3.png",
    quote:
      "“No showings, no open houses, no weekend stress. We sold on our schedule and moved when we were ready — that flexibility meant everything.”",
    caption: "Sold on our schedule",
    name: "Sofia Alvarez",
    location: "Denver, CO",
    avatar: "/images/testimonials/avatar-neil.png",
  },
  {
    id: "james",
    image: "/images/testimonials/card-4.png",
    quote:
      "“I was skeptical at first, but the offer was competitive and the process stayed simple from day one to closing. I’d use Opendoor again in a heartbeat.”",
    caption: "Simple from day one to closing",
    name: "James Okonkwo",
    location: "Charlotte, NC",
    avatar: "/images/testimonials/avatar-2.png",
  },
];

const LAST = testimonials.length - 1;

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

/** Soft resistance past the ends (iOS-style rubber band in progress units) */
function resistOverscroll(raw: number) {
  if (raw < 0) {
    return -OVERSCROLL_MAX * Math.tanh(-raw / (OVERSCROLL_MAX * 1.15));
  }
  if (raw > LAST) {
    return LAST + OVERSCROLL_MAX * Math.tanh((raw - LAST) / (OVERSCROLL_MAX * 1.15));
  }
  return raw;
}

/** 1 when progress is on this card, 0 when ≥1 card away — linear in between */
function expandAmount(index: number, progress: number) {
  return clamp(1 - Math.abs(progress - index), 0, 1);
}

function widthFor(index: number, progress: number) {
  return COMPACT_WIDTH + WIDTH_DELTA * expandAmount(index, progress);
}

function cardLeft(index: number, progress: number) {
  let x = 0;
  for (let i = 0; i < index; i++) {
    x += widthFor(i, progress) + GAP;
  }
  return x;
}

/** Keep the focal point pinned left; past the ends, add rubber-band travel */
function scrollFor(progress: number) {
  if (progress < 0) {
    return progress * DRAG_STEP * 0.72;
  }
  if (progress > LAST) {
    return cardLeft(LAST, progress) + (progress - LAST) * DRAG_STEP * 0.72;
  }
  const i = Math.floor(progress);
  const t = progress - i;
  if (i >= LAST) return cardLeft(LAST, progress);
  return cardLeft(i, progress) * (1 - t) + cardLeft(i + 1, progress) * t;
}

type CardRefs = {
  root: HTMLElement | null;
  overlay: HTMLElement | null;
  story: HTMLElement | null;
};

/**
 * Dual-layout crossfade: compact and featured quotes are each laid out once
 * at a fixed width. We fade between them instead of reflowing a single block
 * as the card width changes (which makes words jump between lines).
 */
function CrossfadeQuote({ text }: { text: string }) {
  const quoteClass =
    "absolute top-0 left-0 m-0 overflow-hidden text-[20px] font-normal tracking-[-1px] text-[#25201d] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3]";

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ height: QUOTE_MAX_HEIGHT }}
    >
      {/* Fixed compact layout — fades out; never reflows mid-animation */}
      <p
        aria-hidden
        className={quoteClass}
        style={{
          width: COMPACT_WIDTH,
          lineHeight: `${QUOTE_LINE_HEIGHT}px`,
          opacity: "calc(1 - var(--expand, 0))",
        }}
      >
        {text}
      </p>
      {/* Fixed featured layout — fades in */}
      <p
        className={quoteClass}
        style={{
          width: FEATURED_WIDTH,
          lineHeight: `${QUOTE_LINE_HEIGHT}px`,
          opacity: "var(--expand, 0)",
        }}
      >
        {text}
      </p>
    </div>
  );
}

export function Testimonials() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<CardRefs[]>(
    testimonials.map(() => ({
      root: null,
      overlay: null,
      story: null,
    })),
  );

  const progressRef = useRef(0);
  const indexRef = useRef(0);
  const velocityRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const settleRafRef = useRef<number | null>(null);
  const draggingRef = useRef(false);

  const [inset, setInset] = useState(120);
  const [index, setIndex] = useState(0);
  const [dragging, setDragging] = useState(false);

  const dragState = useRef({
    active: false,
    startX: 0,
    startProgress: 0,
    lastX: 0,
    lastT: 0,
    velocity: 0,
  });

  const applyFrame = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const progress = progressRef.current;
    const x = scrollFor(progress);
    track.style.transform = `translate3d(${-x}px, 0, 0)`;

    for (let i = 0; i < testimonials.length; i++) {
      const refs = cardRefs.current[i];
      const expand = expandAmount(i, progress);
      const width = COMPACT_WIDTH + WIDTH_DELTA * expand;

      if (refs.root) {
        refs.root.style.width = `${width}px`;
        refs.root.style.setProperty("--expand", String(expand));
      }

      if (refs.overlay) {
        refs.overlay.style.opacity = String(expand);
        refs.overlay.style.pointerEvents = expand > 0.55 ? "auto" : "none";
      }

      if (refs.story) {
        refs.story.style.opacity = String(expand);
        refs.story.style.maxWidth = expand > 0.05 ? `${200 * expand}px` : "0px";
        refs.story.style.pointerEvents = expand > 0.55 ? "auto" : "none";
      }
    }
  }, []);

  const cancelSettle = useCallback(() => {
    if (settleRafRef.current != null) {
      cancelAnimationFrame(settleRafRef.current);
      settleRafRef.current = null;
    }
    velocityRef.current = 0;
  }, []);

  const springTo = useCallback(
    (target: number, initialVelocity = 0) => {
      cancelSettle();
      const to = clamp(target, 0, LAST);
      indexRef.current = Math.round(to);
      setIndex(Math.round(to));

      const reduced =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduced) {
        progressRef.current = to;
        velocityRef.current = 0;
        applyFrame();
        return;
      }

      velocityRef.current = initialVelocity;
      let prev = performance.now();

      const tick = (now: number) => {
        const dt = Math.min(0.032, (now - prev) / 1000);
        prev = now;

        const x = progressRef.current;
        const v = velocityRef.current;
        const spring = ((to - x) * SPRING_STIFFNESS - v * SPRING_DAMPING) / SPRING_MASS;
        const nextV = v + spring * dt;
        const nextX = x + nextV * dt;

        progressRef.current = nextX;
        velocityRef.current = nextV;
        applyFrame();

        const settled =
          Math.abs(to - nextX) < 0.0015 && Math.abs(nextV) < 0.012;
        if (settled) {
          progressRef.current = to;
          velocityRef.current = 0;
          applyFrame();
          settleRafRef.current = null;
          return;
        }
        settleRafRef.current = requestAnimationFrame(tick);
      };

      settleRafRef.current = requestAnimationFrame(tick);
    },
    [applyFrame, cancelSettle],
  );

  const bumpEnd = useCallback(
    (direction: -1 | 1) => {
      const edge = direction < 0 ? 0 : LAST;
      // Stay on the edge and kick outward — the spring overshoots smoothly
      // then pulls back (no teleport to the peek state).
      progressRef.current = edge;
      springTo(edge, direction * BUMP_VELOCITY);
    },
    [springTo],
  );

  const settleTo = useCallback(
    (target: number) => {
      const to = clamp(Math.round(target), 0, LAST);
      springTo(to);
    },
    [springTo],
  );

  const goTo = useCallback(
    (next: number) => {
      if (draggingRef.current) return;
      if (next < 0) {
        bumpEnd(-1);
        return;
      }
      if (next > LAST) {
        bumpEnd(1);
        return;
      }
      settleTo(next);
    },
    [bumpEnd, settleTo],
  );

  // Heading inset
  useEffect(() => {
    const heading = headingRef.current;
    if (!heading) return;
    const measure = () => {
      setInset(Math.round(heading.getBoundingClientRect().left));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(heading);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  useLayoutEffect(() => {
    applyFrame();
  }, [applyFrame, inset]);

  useEffect(() => {
    return () => {
      cancelSettle();
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, [cancelSettle]);

  const scheduleApply = useCallback(() => {
    if (rafRef.current != null) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      applyFrame();
    });
  }, [applyFrame]);

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    cancelSettle();
    draggingRef.current = true;
    setDragging(true);
    const now = performance.now();
    dragState.current = {
      active: true,
      startX: e.clientX,
      startProgress: progressRef.current,
      lastX: e.clientX,
      lastT: now,
      velocity: 0,
    };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragState.current.active) return;
    const now = performance.now();
    const dx = e.clientX - dragState.current.startX;
    const dt = Math.max(1, now - dragState.current.lastT);
    const frameDx = e.clientX - dragState.current.lastX;
    dragState.current.velocity = frameDx / dt;
    dragState.current.lastX = e.clientX;
    dragState.current.lastT = now;

    const raw = dragState.current.startProgress - dx / DRAG_STEP;
    progressRef.current = resistOverscroll(raw);
    scheduleApply();
  };

  const endDrag = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragState.current.active) return;
    dragState.current.active = false;
    draggingRef.current = false;
    setDragging(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      /* already released */
    }

    // Fling: if moving quickly, bias snap in that direction
    const v = dragState.current.velocity;
    let target = progressRef.current;
    if (Math.abs(v) > 0.35) {
      target += v < 0 ? 0.55 : -0.55;
    }
    settleTo(target);
  };

  return (
    <section className="relative w-full overflow-x-clip bg-[#fbf9f9] pt-8 pb-[74px] lg:pt-8">
      <div className="relative mx-auto flex w-full max-w-[1440px] items-end justify-between gap-6 px-5 sm:px-10 lg:px-[120px]">
        <h2
          ref={headingRef}
          className="max-w-[760px] text-[36px] font-medium leading-[1.2] tracking-[-0.05em] text-[#25201d] sm:text-[44px] sm:leading-[52px] lg:text-[48px] lg:leading-[58px] lg:tracking-[-2.4px]"
        >
          <span className="inline">See what other </span>
          <span className="mx-1 inline-flex align-middle">
            <FamilyCounter />
          </span>
          <span className="block">families are saying about us</span>
        </h2>

        <div className="mb-1 flex shrink-0 items-center gap-3">
          <button
            type="button"
            aria-label="Previous testimonials"
            onClick={() => goTo(Math.round(clamp(progressRef.current, 0, LAST)) - 1)}
            className={`relative flex size-11 items-center justify-center overflow-hidden rounded-xl bg-[#ede8e8] transition-opacity ${
              index === 0 ? "opacity-50" : "opacity-100"
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/icons/arrow-left.svg"
              alt=""
              width={24}
              height={24}
              className="size-6"
            />
          </button>
          <button
            type="button"
            aria-label="Next testimonials"
            onClick={() => goTo(Math.round(clamp(progressRef.current, 0, LAST)) + 1)}
            className={`relative flex size-11 items-center justify-center overflow-hidden rounded-xl bg-[#ede8e8] transition-opacity ${
              index >= LAST ? "opacity-50" : "opacity-100"
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/icons/arrow-right.svg"
              alt=""
              width={24}
              height={24}
              className="size-6 scale-x-[-1]"
            />
          </button>
        </div>
      </div>

      <div
        className={`mt-[42px] touch-pan-y overflow-hidden pb-2 ${
          dragging ? "cursor-grabbing select-none" : "cursor-grab"
        }`}
        style={{ paddingLeft: inset, paddingRight: inset }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <div
          ref={trackRef}
          className="flex w-max items-start will-change-transform"
          style={{ gap: GAP }}
        >
          {testimonials.map((item, i) => {
            const refs = cardRefs.current[i];

            return (
              <article
                key={item.id}
                ref={(node) => {
                  refs.root = node;
                }}
                className="flex shrink-0 flex-col"
                style={
                  {
                    width: FEATURED_WIDTH,
                    "--expand": i === 0 ? 1 : 0,
                  } as CSSProperties
                }
              >
                <div
                  className={`relative h-[330px] overflow-hidden rounded-[20px] ${CARD_SHADOW}`}
                >
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    sizes="539px"
                    className="pointer-events-none object-cover"
                    draggable={false}
                  />

                  <div
                    ref={(node) => {
                      refs.overlay = node;
                    }}
                    className="absolute inset-0"
                    style={{ opacity: i === 0 ? 1 : 0 }}
                  >
                    <div className="absolute bottom-[26px] left-6 rounded-md bg-black/55 px-1.5 py-1">
                      <p className="whitespace-nowrap text-[16px] font-normal tracking-[-0.8px] text-white">
                        {item.caption}
                      </p>
                    </div>
                    <div className="absolute bottom-[17px] right-[19px] flex items-center gap-1.5">
                      <button
                        type="button"
                        aria-label="Captions"
                        className="relative flex size-10 items-center justify-center rounded-xl border border-white/11 bg-black/15 backdrop-blur-[9.45px]"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src="/icons/text-size.svg"
                          alt=""
                          width={20}
                          height={20}
                          className="size-5"
                        />
                      </button>
                      <button
                        type="button"
                        aria-label="Volume"
                        className="relative flex size-10 items-center justify-center rounded-xl border border-white/11 bg-black/15 backdrop-blur-[9.45px]"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src="/icons/volume.svg"
                          alt=""
                          width={20}
                          height={20}
                          className="size-5"
                        />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex min-h-[150px] flex-col justify-between gap-7">
                  <CrossfadeQuote text={item.quote} />

                  <div className="flex items-center gap-5">
                    <div className="flex min-w-0 flex-1 items-center gap-3">
                      <div className="relative size-11 shrink-0 overflow-hidden rounded-[10px] border border-white/34">
                        <Image
                          src={item.avatar}
                          alt=""
                          fill
                          sizes="44px"
                          className="object-cover"
                          draggable={false}
                        />
                      </div>
                      <div className="min-w-0 text-[16px] tracking-[-0.8px]">
                        <p className="font-medium text-[#25201d]">{item.name}</p>
                        <p className="font-normal text-[rgba(37,32,29,0.6)]">
                          {item.location}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      ref={(node) => {
                        refs.story = node;
                      }}
                      className="flex h-11 shrink-0 items-center overflow-hidden rounded-xl bg-[#ede8e8] px-3 py-1.5 text-[16px] font-medium tracking-[-0.8px] whitespace-nowrap text-[#25201d]"
                      style={{
                        opacity: i === 0 ? 1 : 0,
                        maxWidth: i === 0 ? 200 : 0,
                      }}
                    >
                      Read the full story
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
