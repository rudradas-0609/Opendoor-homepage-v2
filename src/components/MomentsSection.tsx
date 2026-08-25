"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState, type AnimationEvent } from "react";

const TASKS = [
  { label: "mortgage", color: "#be746c" },
  { label: "inspection", color: "#cd6fa1" },
  { label: "renovations", color: "#5f8944" },
  { label: "title and escrow", color: "#d78339" },
] as const;

const LONGEST_LABEL = "title and escrow";

const EMPTY_MS = 220;
const DRAW_MS = 600;
const HOLD_MS = 1100;
const FADE_MS = 350;

const SCENES = [
  {
    src: "/images/moments/family.jpg",
    alt: "A mother and her children sharing a moment together in their kitchen",
    caption: "The move out day for the Smith family. 09/31/2026",
    objectPosition: "center 82%",
  },
  {
    src: "/images/moments/doe.jpg",
    alt: "A family cooking together in their kitchen",
    caption: "First day in the house for the Doe Family. 09/17/2026",
    objectPosition: "center 38%",
  },
  {
    src: "/images/moments/johnson.jpg",
    alt: "A family sharing dinner in their new home",
    caption: "Johnson family's first dinner in their new home. 08/15/2026",
    objectPosition: "center 72%",
  },
] as const;

const SCENE_HOLD_MS = 4800;
const SCENE_REVEAL_MS = 3200;

/** Preferred photo height; shrinks so navbar + heading + image fit in the viewport. */
const PHOTO_HEIGHT =
  "h-[min(26.25rem,calc(100svh-72px-12rem))] w-full sm:h-[min(33.75rem,calc(100svh-72px-12.5rem))] lg:h-[min(42.5rem,calc(100svh-72px-13rem))]";

/** Handwritten check from Figma 651:153 / public/images/moments/pointer.svg */
const CHECK_PATH =
  "M1.27913 19.8939C1.1901 19.9836 1.1054 20.068 1.04314 20.1296C0.980304 20.1928 0.941513 20.2372 0.920658 20.2904C0.899802 20.3436 0.898082 20.4025 0.901226 20.4915C0.904958 20.5791 0.909748 20.6985 0.914041 20.8249C0.914041 20.8249 0.914041 20.8249 0.914041 20.8249C0.961328 21.918 1.09969 22.5219 1.46836 22.694C1.85962 22.877 2.25386 23.0796 2.62327 23.2884C6.17616 25.1996 8.81142 28.911 9.21944 32.4867C9.33953 34.7315 12.1279 35.2474 13.0433 33.1943C15.0409 28.8505 17.3681 24.4855 19.8849 20.3335C23.5732 14.3815 27.2116 8.32998 32.2395 3.5298C32.9049 2.91766 33.6025 2.33952 34.3316 1.82123C34.4343 1.7489 34.514 1.64427 34.5485 1.52147C34.583 1.39873 34.57 1.26907 34.5114 1.15899C34.4528 1.04892 34.3524 0.965806 34.2313 0.92593C34.1102 0.885981 33.9789 0.893737 33.8616 0.938583C33.8616 0.938583 33.8616 0.938583 33.8616 0.938583C32.9751 1.2806 32.1042 1.71195 31.2664 2.19855C24.8547 6.07786 20.2651 12.1167 16.467 18.2556C13.8542 22.571 11.505 26.9675 9.3899 31.5655L13.2137 32.2731C12.5833 26.6828 9.04941 22.2992 4.58994 19.8053C4.12965 19.5452 3.64272 19.2951 3.16401 19.0712C2.71291 18.8602 2.07659 19.1326 1.27913 19.8939Z";

const CHECK_CENTERLINE = "M2.5 20.4 L10.8 32.2 L33.2 2.2";

function MomentsCheck({ drawn }: { drawn: boolean }) {
  const uid = useId().replace(/:/g, "");
  const clipId = `${uid}-clip`;
  const filterId = `${uid}-filter`;

  return (
    <svg
      className={`moments-check${drawn ? " moments-check--drawn" : ""}`}
      width={35.4674}
      height={35.3846}
      viewBox="0 0 35.4674 35.3846"
      fill="none"
      overflow="visible"
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <clipPath id={clipId}>
          <path d={CHECK_PATH} />
        </clipPath>
        <filter
          id={filterId}
          x="0"
          y="0"
          width="35.4674"
          height="35.3846"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.55555558204650879 0.55555558204650879"
            numOctaves="3"
            seed="1808"
          />
          <feDisplacementMap
            in="shape"
            scale="1.7999999523162842"
            xChannelSelector="R"
            yChannelSelector="G"
            result="displacedImage"
            width="100%"
            height="100%"
          />
          <feMerge result="effect1_texture">
            <feMergeNode in="displacedImage" />
          </feMerge>
        </filter>
      </defs>
      <g filter={`url(#${filterId})`} clipPath={`url(#${clipId})`}>
        <path className="moments-check__stroke" d={CHECK_CENTERLINE} pathLength={1} />
      </g>
    </svg>
  );
}

export function MomentsSection({ children }: { children: React.ReactNode }) {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const [visible, setVisible] = useState(false);
  const [index, setIndex] = useState(0);
  const [drawn, setDrawn] = useState(false);
  const [faded, setFaded] = useState(false);
  const [scene, setScene] = useState(0);
  const [incoming, setIncoming] = useState<number | null>(null);
  const incomingRef = useRef<number | null>(null);
  incomingRef.current = incoming;

  const task = TASKS[index] ?? TASKS[0];

  useEffect(() => {
    const el = headlineRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.4, rootMargin: "0px 0px -10% 0px" },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setDrawn(true);
      setFaded(false);
      return;
    }

    let cancelled = false;
    const timers: number[] = [];
    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        timers.push(window.setTimeout(resolve, ms));
      });

    const run = async () => {
      while (!cancelled) {
        await wait(EMPTY_MS);
        if (cancelled) return;

        setDrawn(true);
        await wait(DRAW_MS + HOLD_MS);
        if (cancelled) return;

        setFaded(true);
        await wait(FADE_MS);
        if (cancelled) return;

        setDrawn(false);
        setIndex((i) => (i + 1) % TASKS.length);
        await wait(50);
        if (cancelled) return;

        setFaded(false);
        await wait(FADE_MS);
        if (cancelled) return;
      }
    };

    void run();

    return () => {
      cancelled = true;
      for (const id of timers) window.clearTimeout(id);
    };
  }, [visible]);

  useEffect(() => {
    if (!visible || incoming !== null) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const id = window.setTimeout(() => {
      const next = (scene + 1) % SCENES.length;
      if (reduced) {
        setScene(next);
      } else {
        setIncoming(next);
      }
    }, SCENE_HOLD_MS);

    return () => window.clearTimeout(id);
  }, [visible, scene, incoming]);

  useEffect(() => {
    if (incoming === null) return;

    const id = window.setTimeout(() => {
      const next = incomingRef.current;
      if (next === null) return;
      incomingRef.current = null;
      setScene(next);
      setIncoming(null);
    }, SCENE_REVEAL_MS);

    return () => window.clearTimeout(id);
  }, [incoming]);

  const commitIncoming = (event: AnimationEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) return;
    if (event.animationName !== "moments-ellipse-t") return;
    const next = incomingRef.current;
    if (next === null) return;
    incomingRef.current = null;
    setScene(next);
    setIncoming(null);
  };

  const fadeClass = `moments-task-fade${faded ? " moments-task-fade--out" : ""}`;

  return (
    <div
      className={`isolate grid${incoming !== null ? " moments-transitioning" : ""}`}
      onAnimationEnd={commitIncoming}
    >
      <section className="sticky top-[72px] z-0 col-start-1 row-start-1 flex max-h-[calc(100svh-72px)] w-full flex-col bg-background motion-reduce:relative">
        <div className="relative mx-auto w-full max-w-[1440px] shrink-0 px-5 pt-8 sm:px-10 sm:pt-10 lg:px-[120px] lg:pt-12">
          <h2
            ref={headlineRef}
            className="max-w-[985px] text-[32px] font-medium leading-[1.15] tracking-[-0.05em] text-[#25201d] sm:text-[40px] sm:leading-[48px] lg:text-[48px] lg:leading-[50px] lg:tracking-[-2.4px]"
          >
            Opendoor takes care of the
            <span
              className="relative ml-3 inline-flex items-baseline sm:ml-4"
              style={{ color: task.color }}
            >
              <span className="relative mr-1.5 inline-block size-7 shrink-0 sm:size-8">
                <span
                  aria-hidden
                  className="absolute inset-0 overflow-clip rounded-[10px] border-2 border-[rgba(37,32,29,0.12)] bg-[rgba(255,255,255,0.3)] shadow-[inset_0px_-4px_4px_0px_rgba(255,255,255,0.2),inset_0px_4px_4px_0px_rgba(88,64,50,0.25)]"
                />
                <span
                  aria-hidden
                  className={`${fadeClass} pointer-events-none absolute left-[5px] top-[-6px] z-10 h-[31px] w-[33px]`}
                >
                  <MomentsCheck drawn={drawn} />
                </span>
              </span>
              <span className="relative inline-grid">
                <span
                  className="invisible col-start-1 row-start-1 whitespace-nowrap"
                  aria-hidden
                >
                  {LONGEST_LABEL}
                </span>
                <span
                  className={`${fadeClass} col-start-1 row-start-1 whitespace-nowrap`}
                >
                  {task.label}
                </span>
              </span>
            </span>
            <span className="mt-0 block">
              so that you don&apos;t miss moments like this
            </span>
          </h2>
        </div>

        {/* Full-bleed photo — breaks out of the 1440 content width */}
        <div className={`relative mt-8 min-h-0 shrink ${PHOTO_HEIGHT}`}>
          <div className="absolute inset-0 overflow-clip rounded-t-[36px] shadow-[0px_-22px_33.8px_0px_rgba(88,64,50,0.08),0px_-44px_57.7px_-5.217px_rgba(88,64,50,0.1)]">
            {(incoming === null ? [scene] : [scene, incoming]).map((i) => {
              const item = SCENES[i]!;
              const isIncoming = i === incoming;
              return (
                <div
                  key={item.src}
                  className={`absolute inset-0${isIncoming ? " z-[1] moments-reveal" : ""}`}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="100vw"
                    priority={i === 0}
                    className="object-cover"
                    style={{ objectPosition: item.objectPosition }}
                  />
                </div>
              );
            })}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-t-[36px] shadow-[inset_0_4px_0_0_rgba(255,255,255,0.27)]"
            />
          </div>
          {/* Cap → caption → brown blur → photo. Image and caption share the
              same --mt ellipse so the wipe stays aligned with this in between. */}
          <div className="pointer-events-none absolute inset-0 z-[2] overflow-clip rounded-t-[36px]">
            <div aria-hidden className="absolute inset-0 z-0 flex items-end">
              <div className="mx-auto w-full max-w-[1440px] px-5 pb-8 sm:px-10 sm:pb-10 lg:px-[120px] lg:pb-12">
                <div className="relative h-16 w-full sm:h-[5.5rem] lg:h-28">
                  <div className="absolute -inset-x-6 -inset-y-4 rounded-full bg-[rgba(88,64,50,0.22)] blur-[58px]" />
                  <div className="absolute inset-0 rounded-full bg-[rgba(88,64,50,0.4)] blur-[34px]" />
                </div>
              </div>
            </div>
            {(incoming === null ? [scene] : [scene, incoming]).map((i) => {
              const item = SCENES[i]!;
              const isIncoming = i === incoming;
              return (
                <div
                  key={item.caption}
                  className={`absolute inset-0 z-[1] flex items-end${
                    incoming === null
                      ? ""
                      : isIncoming
                        ? " moments-reveal"
                        : " moments-conceal"
                  }`}
                >
                  <div className="mx-auto w-full max-w-[1440px] px-5 pb-14 sm:px-10 sm:pb-16 lg:px-[120px] lg:pb-[70px]">
                    <p className="relative text-[22px] font-normal leading-[1.2] tracking-[-0.04em] text-white sm:text-[32px] sm:leading-[40px] lg:text-[48px] lg:leading-[50px] lg:tracking-[-2.4px]">
                      {item.caption}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Cap sits in front of the caption so the rounded sheet and its shadow
          cover the bottom of the text. Bottom half is clipped so the upward
          shadow can't leak onto the page below. */}
      <div
        className="pointer-events-none relative z-[25] col-start-1 row-start-2 h-0"
        aria-hidden
      >
        <div className="absolute inset-x-0 -top-[236px] h-[236px] overflow-hidden">
          <div className="absolute inset-x-0 top-[192px] h-20 rounded-[36px] bg-background shadow-[0px_-22px_33.8px_0px_rgba(88,64,50,0.08),0px_-44px_57.7px_-5.217px_rgba(88,64,50,0.1)]" />
        </div>
      </div>

      <div className="relative z-30 col-start-1 row-start-2 bg-background">
        {children}
      </div>
    </div>
  );
}
