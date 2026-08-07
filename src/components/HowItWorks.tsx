"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";

const IMAGE_SHADOW =
  "shadow-[0px_19px_22.2px_-14px_rgba(74,40,20,0.15),0px_0px_0px_1px_rgba(100,57,31,0.32)]";

const GLASS_SHADOW =
  "shadow-[0px_0px_0px_1px_rgba(88,64,50,0.16),0px_16px_20.4px_-9px_rgba(88,64,50,0.19),0px_37px_37.3px_3px_rgba(88,64,50,0.12)]";

const GLASS_INSET =
  "pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0px_0px_0px_1px_white,inset_0px_-3px_0px_0px_rgba(88,64,50,0.1)]";

const STEP_DURATION_MS = 5600;
const ADDRESS = "3245 Jarvis St, Gotham, Ohio 129387";
const ADDRESS_PLACEHOLDER = "Enter your home address";
const HOMES_SOLD = "374";
const AVG_PRICE = "$634,684.56";
const TYPE_MS = 36;
const STATS_HEIGHT = 131;

type Step = {
  id: string;
  icon: string;
  title: string;
  description: string;
};

const steps: Step[] = [
  {
    id: "tell-us",
    icon: "/icons/step-menu.svg",
    title: "Tell us about your house",
    description:
      "Get a cash offer and explore the many ways we can help you sell your home with confidence.",
  },
  {
    id: "assessment",
    icon: "/icons/step-mobile.svg",
    title: "Complete an assessment for us to review",
    description:
      "Answer a few quick questions about your home’s condition so we can tailor an accurate offer.",
  },
  {
    id: "offer",
    icon: "/icons/step-mail.svg",
    title: "Get the final offer sent to you",
    description:
      "Review a clear cash offer with no hidden fees — sent straight to your inbox when you’re ready.",
  },
  {
    id: "accept",
    icon: "/icons/step-signature.svg",
    title: "Review and accept",
    description:
      "Pick your closing date, sign digitally, and move on your schedule — we’ll handle the rest.",
  },
];

function GlassIcon({ src }: { src: string }) {
  return (
    <div className="relative size-11 shrink-0 overflow-hidden rounded-xl shadow-[0px_0px_0px_1px_rgba(88,64,50,0.16)]">
      <span
        aria-hidden
        className="absolute inset-0 rounded-xl bg-white/70 backdrop-blur-[11.4px]"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        width={24}
        height={24}
        className="absolute left-1/2 top-1/2 size-6 -translate-x-1/2 -translate-y-1/2"
      />
      <span aria-hidden className={GLASS_INSET} />
    </div>
  );
}

function SceneOverlay({ replayKey }: { replayKey: number }) {
  const [typed, setTyped] = useState("");
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  const [statsIn, setStatsIn] = useState(false);
  const timersRef = useRef<number[]>([]);

  const clearTimers = useCallback(() => {
    for (const id of timersRef.current) window.clearTimeout(id);
    timersRef.current = [];
  }, []);

  const later = useCallback(
    (ms: number, fn: () => void) => {
      const id = window.setTimeout(fn, ms);
      timersRef.current.push(id);
      return id;
    },
    [],
  );

  useEffect(() => {
    clearTimers();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Defer all state writes out of the effect body (lint + avoid cascading renders)
    later(0, () => {
      if (reduced) {
        setShowPlaceholder(false);
        setTyped(ADDRESS);
        setStatsIn(true);
        return;
      }

      setTyped("");
      setShowPlaceholder(true);
      setStatsIn(false);

      // Brief beat with placeholder, then type the address
      later(700, () => {
        setShowPlaceholder(false);

        let i = 0;
        const typeNext = () => {
          i += 1;
          setTyped(ADDRESS.slice(0, i));
          if (i < ADDRESS.length) {
            later(TYPE_MS, typeNext);
          } else {
            // Short pause, then bring in the stats card
            later(280, () => setStatsIn(true));
          }
        };
        later(180, typeNext);
      });
    });

    return clearTimers;
  }, [replayKey, clearTimers, later]);

  const bottomRadius = statsIn ? 10 : 20;

  return (
    <div className="absolute inset-x-6 bottom-[10%] mx-auto flex w-auto max-w-[461px] flex-col gap-2">
      {/* Address bar */}
      <div
        className={`relative flex h-16 items-center gap-2 overflow-hidden px-4 py-2 pr-2 ${GLASS_SHADOW}`}
        style={{
          borderRadius: `20px 20px ${bottomRadius}px ${bottomRadius}px`,
          transition: "border-radius 520ms cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        <span
          aria-hidden
          className="absolute inset-0 rounded-[inherit] bg-white/85 backdrop-blur-[11.4px]"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/icons/map-pin-step.svg"
          alt=""
          width={24}
          height={24}
          className="relative size-6 shrink-0"
        />
        <p
          className={`relative flex min-w-0 flex-1 items-center truncate text-[16px] font-normal tracking-[-0.8px] ${
            showPlaceholder
              ? "text-[rgba(37,32,29,0.6)]"
              : "text-[#25201d]"
          }`}
        >
          <span className="truncate">
            {showPlaceholder ? ADDRESS_PLACEHOLDER : typed}
          </span>
          {!showPlaceholder && typed.length < ADDRESS.length ? (
            <span
              aria-hidden
              className="ml-px h-[14px] w-[1.5px] shrink-0 self-center bg-[#25201d]"
            />
          ) : null}
        </p>
        <span aria-hidden className={GLASS_INSET} />
      </div>

      {/* Reserved slot keeps the address bar in place while stats enter */}
      <div className="relative" style={{ height: STATS_HEIGHT }}>
        <div
          className={`absolute inset-0 overflow-hidden rounded-tl-[10px] rounded-tr-[10px] rounded-bl-[20px] rounded-br-[20px] px-[25px] py-[26px] ${GLASS_SHADOW}`}
          style={
            {
              opacity: statsIn ? 1 : 0,
              translate: statsIn ? "0 0" : "0 -28px",
              filter: statsIn ? "blur(0px)" : "blur(10px)",
              transition:
                "opacity 520ms cubic-bezier(0.22, 1, 0.36, 1), translate 520ms cubic-bezier(0.22, 1, 0.36, 1), filter 520ms cubic-bezier(0.22, 1, 0.36, 1)",
              pointerEvents: statsIn ? "auto" : "none",
            } as CSSProperties
          }
        >
          <span
            aria-hidden
            className="absolute inset-0 rounded-[inherit] bg-white/85 backdrop-blur-[11.4px]"
          />
          <div className="relative grid grid-cols-2 items-stretch">
            <div className="flex flex-col gap-3 pr-5">
              <p className="text-[14px] font-normal leading-[18px] tracking-[-0.7px] text-[rgba(37,32,29,0.6)]">
                Homes sold to Opendoor in Gotham
              </p>
              <p className="text-[28px] font-medium tracking-[-1.4px] text-[#25201d]">
                {HOMES_SOLD}
              </p>
            </div>

            <div className="relative flex flex-col gap-3 pl-5">
              <div
                aria-hidden
                className="absolute top-0 bottom-0 left-0 w-px bg-[rgba(88,64,50,0.16)]"
              />
              <p className="text-[14px] font-normal leading-[18px] tracking-[-0.7px] text-[rgba(37,32,29,0.6)]">
                Avg. price of home sold last month
              </p>
              <p className="text-[28px] font-medium tracking-[-1.4px] text-[#25201d]">
                {AVG_PRICE}
              </p>
            </div>
          </div>
          <span aria-hidden className={GLASS_INSET} />
        </div>
      </div>
    </div>
  );
}

export function HowItWorks() {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  const activeRef = useRef(0);
  const progressRef = useRef(0);
  const pausedRef = useRef(false);
  const reduceMotionRef = useRef(false);
  const elapsedRef = useRef(0);
  const lastTsRef = useRef<number | null>(null);

  const goTo = useCallback((index: number) => {
    const next = ((index % steps.length) + steps.length) % steps.length;
    activeRef.current = next;
    elapsedRef.current = 0;
    lastTsRef.current = null;
    progressRef.current = 0;
    setActive(next);
    setProgress(0);
  }, []);

  useEffect(() => {
    reduceMotionRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotionRef.current) {
      progressRef.current = 1;
      setProgress(1);
      return;
    }

    let raf = 0;
    const tick = (now: number) => {
      if (lastTsRef.current == null) lastTsRef.current = now;
      const dt = now - lastTsRef.current;
      lastTsRef.current = now;

      if (!pausedRef.current) {
        elapsedRef.current = Math.min(
          STEP_DURATION_MS,
          elapsedRef.current + dt,
        );
        const p = elapsedRef.current / STEP_DURATION_MS;
        progressRef.current = p;
        setProgress(p);

        if (p >= 1) {
          goTo(activeRef.current + 1);
        }
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [goTo]);

  return (
    <section
      className="relative w-full overflow-x-clip bg-[#fbf9f9] py-[72px]"
      onMouseEnter={() => {
        pausedRef.current = true;
      }}
      onMouseLeave={() => {
        pausedRef.current = false;
        lastTsRef.current = null;
      }}
    >
      <div className="relative mx-auto flex w-full max-w-[1440px] flex-col items-stretch gap-10 px-5 sm:px-10 lg:flex-row lg:items-start lg:justify-between lg:gap-12 lg:px-[120px]">
        {/* Left visual */}
        <div
          className={`relative mx-auto aspect-[571/620] w-full max-w-[571px] shrink-0 overflow-hidden rounded-[40px] bg-[#ede8e8] lg:mx-0 ${IMAGE_SHADOW}`}
        >
          <div className="absolute left-0 top-1/2 h-[108%] w-[155%] -translate-y-1/2">
            <Image
              src="/images/how-it-works/neighborhood.png"
              alt=""
              fill
              sizes="571px"
              className="pointer-events-none object-cover"
            />
          </div>

          <SceneOverlay replayKey={0} />
        </div>

        {/* Right steps */}
        <div className="flex w-full max-w-[581px] flex-col lg:pt-8">
          <h2 className="relative max-w-[581px] text-[36px] font-medium leading-[1.15] tracking-[-0.05em] text-[#25201d] sm:text-[44px] sm:leading-[50px] lg:text-[48px] lg:tracking-[-2.4px]">
            How we make it easy and{" "}
            <span className="relative inline-block">
              stress-free
              <span
                aria-hidden
                className="pointer-events-none absolute left-[-4px] top-[calc(100%-6px)] h-[14px] w-[calc(100%+18px)]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/how-it-works/easy-underline.svg"
                  alt=""
                  className="block size-full max-w-none"
                />
              </span>
            </span>{" "}
            for homeowners
          </h2>

          <div className="mt-10 flex flex-col gap-6" role="list">
            {steps.map((item, i) => {
              const isActive = i === active;
              const showDivider = i < steps.length - 1;

              return (
                <div key={item.id} className="flex flex-col gap-6" role="listitem">
                  <button
                    type="button"
                    onClick={() => goTo(i)}
                    className="flex w-full flex-col text-left"
                    aria-current={isActive ? "step" : undefined}
                  >
                    <div className="flex items-center gap-3">
                      <GlassIcon src={item.icon} />
                      <p className="min-w-0 flex-1 text-[20px] font-medium tracking-[-1px] text-[#25201d]">
                        {item.title}
                      </p>
                    </div>

                    <div
                      className="ml-14 grid transition-[grid-template-rows,opacity] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]"
                      style={{
                        gridTemplateRows: isActive ? "1fr" : "0fr",
                        opacity: isActive ? 1 : 0,
                      }}
                    >
                      <div className="overflow-hidden">
                        <p className="pt-3 text-[20px] font-normal leading-[26px] tracking-[-1px] text-[rgba(37,32,29,0.6)]">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </button>

                  {isActive ? (
                    <div className="ml-14 h-0.5 w-[calc(100%-56px)] max-w-[525px] overflow-hidden rounded-full bg-[rgba(88,64,50,0.12)]">
                      <div
                        className="h-full origin-left bg-[#0042e6] will-change-transform"
                        style={{ transform: `scaleX(${progress})` }}
                      />
                    </div>
                  ) : showDivider ? (
                    <div
                      aria-hidden
                      className="ml-14 h-px w-[calc(100%-56px)] max-w-[525px] bg-[rgba(88,64,50,0.12)]"
                    />
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
