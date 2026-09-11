"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

const GLASS_SHADOW =
  "shadow-[0px_0px_0px_1px_rgba(88,64,50,0.16),0px_16px_20.4px_-9px_rgba(88,64,50,0.19),0px_37px_37.3px_3px_rgba(88,64,50,0.12)]";

const GLASS_INSET =
  "pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0px_0px_0px_1px_white,inset_0px_-3px_0px_0px_rgba(88,64,50,0.1)]";

const ADDRESS = "1234 Main St, Marietta, GA 30062";
const ADDRESS_PLACEHOLDER = "Enter your home address";
const TYPE_MS = 36;

const CHECKLIST_ITEMS = [
  "Retrieving info on the address",
  "Looking at similar houses in the neighbourhood",
  "Checking housing market data for comparisons",
  "Preparing a preliminary offer",
] as const;

type ChecklistStatus =
  | "hidden"
  | "loading"
  | "boxed"
  | "connected"
  | "done";

const INITIAL_CHECKLIST: ChecklistStatus[] = CHECKLIST_ITEMS.map(
  () => "hidden",
);

function SceneFrame({
  active,
  children,
}: {
  active: boolean;
  children: ReactNode;
}) {
  return (
    <div
      className={`absolute inset-0 overflow-hidden transition-[opacity,filter,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-[opacity,filter,transform] ${
        active
          ? "z-10 scale-100 opacity-100 blur-0"
          : "pointer-events-none scale-[1.015] opacity-0 blur-[12px]"
      }`}
      aria-hidden={!active}
    >
      {children}
    </div>
  );
}

function StatusIndicator({ status }: { status: ChecklistStatus }) {
  const isVisible = status !== "hidden";
  const isLoading = status === "loading";

  return (
    <span className="relative size-[13px] shrink-0">
      <span
        aria-hidden
        className={`absolute inset-0 border-solid transition-[border-radius,border-color,border-width,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isLoading
            ? "animate-spin rounded-full border-[1.5px] border-[rgba(0,65,231,0.25)] border-t-[#0041e7]"
            : "rounded-[3px] border border-[#0041e7]"
        } ${isVisible ? "opacity-100" : "opacity-0"}`}
      >
        <span
          className={`absolute left-0.5 top-0.5 size-[7px] rounded-[1px] bg-[#0041e7] transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            status === "done" ? "scale-100 opacity-100" : "scale-50 opacity-0"
          }`}
        />
      </span>
    </span>
  );
}

function SceneOverlay({ active }: { active: boolean }) {
  const [typed, setTyped] = useState("");
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  const [cardVisible, setCardVisible] = useState(false);
  const [rowStatuses, setRowStatuses] =
    useState<ChecklistStatus[]>(INITIAL_CHECKLIST);
  const timersRef = useRef<number[]>([]);

  const clearTimers = useCallback(() => {
    for (const id of timersRef.current) window.clearTimeout(id);
    timersRef.current = [];
  }, []);

  const later = useCallback((ms: number, fn: () => void) => {
    const id = window.setTimeout(fn, ms);
    timersRef.current.push(id);
    return id;
  }, []);

  useEffect(() => {
    clearTimers();

    later(0, () => {
      setTyped("");
      setShowPlaceholder(true);
      setCardVisible(false);
      setRowStatuses(INITIAL_CHECKLIST);

      if (!active) return;

      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reduced) {
        setShowPlaceholder(false);
        setTyped(ADDRESS);
        setCardVisible(true);
        setRowStatuses(["done", "done", "done", "done"]);
        return;
      }

      const setRowStatus = (index: number, status: ChecklistStatus) => {
        setRowStatuses((current) =>
          current.map((value, rowIndex) =>
            rowIndex === index ? status : value,
          ),
        );
      };

      const runChecklistRow = (index: number) => {
        setRowStatus(index, "loading");

        later(700, () => {
          setRowStatus(index, "boxed");

          if (index === 0) {
            later(220, () => {
              setRowStatus(index, "done");
              later(360, () => runChecklistRow(index + 1));
            });
            return;
          }

          later(180, () => {
            setRowStatus(index, "connected");

            later(420, () => {
              setRowStatus(index, "done");

              if (index < CHECKLIST_ITEMS.length - 1) {
                later(360, () => runChecklistRow(index + 1));
              }
            });
          });
        });
      };

      later(700, () => {
        setShowPlaceholder(false);

        let i = 0;
        const typeNext = () => {
          i += 1;
          setTyped(ADDRESS.slice(0, i));
          if (i < ADDRESS.length) {
            later(TYPE_MS, typeNext);
          } else {
            later(280, () => {
              setCardVisible(true);
              runChecklistRow(0);
            });
          }
        };
        later(180, typeNext);
      });
    });

    return clearTimers;
  }, [active, clearTimers, later]);

  const visibleRows = rowStatuses.filter(
    (status) => status !== "hidden",
  ).length;
  const checklistHeight =
    visibleRows > 0 ? 40 + visibleRows * 15 + (visibleRows - 1) * 17 : 0;

  return (
    <div className="absolute inset-x-6 top-[53%] mx-auto w-auto max-w-[461px]">
      <div
        className={`relative flex h-16 items-center gap-2 overflow-hidden rounded-[20px] px-4 py-2 pr-2 ${GLASS_SHADOW}`}
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
            showPlaceholder ? "text-[rgba(37,32,29,0.6)]" : "text-[#25201d]"
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

      <div
        className="relative mt-2 overflow-visible transition-[height] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{ height: checklistHeight }}
      >
        <div
          className={`absolute inset-x-0 top-0 overflow-hidden rounded-[20px] ${GLASS_SHADOW} transition-[height,opacity,transform,filter] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            cardVisible
              ? "translate-y-0 opacity-100 blur-0"
              : "-translate-y-3 opacity-0 blur-[8px]"
          }`}
          style={{ height: checklistHeight }}
        >
          <span
            aria-hidden
            className="absolute inset-0 rounded-[inherit] bg-white/85 backdrop-blur-[11.4px]"
          />

          {CHECKLIST_ITEMS.slice(1).map((_, connectorIndex) => {
            const rowStatus = rowStatuses[connectorIndex + 1];
            const isDrawn =
              rowStatus === "connected" || rowStatus === "done";

            return (
              <span
                key={`connector-${connectorIndex}`}
                aria-hidden
                className={`absolute left-[29px] w-px origin-top bg-[#0041e7] transition-transform duration-400 ease-out ${
                  isDrawn ? "scale-y-100" : "scale-y-0"
                }`}
                style={{
                  top: 34 + connectorIndex * 32,
                  height: connectorIndex === 2 ? 19 : 19.5,
                }}
              />
            );
          })}

          {CHECKLIST_ITEMS.map((item, index) => {
            const status = rowStatuses[index];
            const isVisible = status !== "hidden";

            return (
              <div
                key={item}
                className={`absolute left-[23px] right-[23px] flex h-[15px] items-center gap-3 transition-[opacity,transform] duration-350 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-3 opacity-0"
                }`}
                style={{ top: 20 + index * 32 }}
              >
                <StatusIndicator status={status} />
                <p className="min-w-0 whitespace-nowrap text-[clamp(10px,2.45vw,14px)] leading-normal font-normal tracking-[-0.05em] text-[#25201d]">
                  {item}
                </p>
              </div>
            );
          })}

          <span aria-hidden className={GLASS_INSET} />
        </div>
      </div>
    </div>
  );
}

export function SceneTellUs({ active }: { active: boolean }) {
  return (
    <SceneFrame active={active}>
      <div className="absolute inset-0">
        <Image
          src="/images/how-it-works/step-one-house.jpg"
          alt=""
          fill
          sizes="571px"
          className="pointer-events-none object-cover object-center"
        />
      </div>
      <SceneOverlay active={active} />
    </SceneFrame>
  );
}

export function SceneAssessment({ active }: { active: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (!active) {
      video.pause();
      return;
    }

    video.currentTime = 0;
    void video.play().catch(() => {});
  }, [active]);

  return (
    <SceneFrame active={active}>
      <video
        ref={videoRef}
        src="/images/how-it-works/step-two-home-capture.mp4"
        aria-hidden
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 z-20 size-full object-cover"
      />

      <div className="absolute left-1/2 top-1/2 h-[660px] w-[620px] -translate-x-1/2 -translate-y-1/2 blur-[1.5px]">
        <Image
          src="/images/how-it-works/living-room.png"
          alt=""
          fill
          sizes="620px"
          className="pointer-events-none object-cover"
        />
      </div>

      <div className="absolute left-1/2 top-1/2 h-[526.139px] w-[242px] -translate-x-1/2 -translate-y-1/2 drop-shadow-[0px_4px_11.65px_rgba(0,0,0,0.49)]">
        <div className="absolute inset-0 overflow-clip rounded-[26.488px] bg-black">
          <div className="absolute top-[30.1px] h-[496.04px] w-[242px]">
            <Image
              src="/images/how-it-works/phone-screen.png"
              alt=""
              fill
              sizes="242px"
              className="pointer-events-none object-cover object-top"
            />
          </div>
          <div className="absolute left-1/2 top-[calc(50%-39px)] h-[324px] w-[304px] -translate-x-1/2 -translate-y-1/2 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/how-it-works/living-room.png"
              alt=""
              width={610}
              height={650}
              className="absolute left-[-50.26%] top-[-50.31%] h-[200.62%] w-[200.51%] max-w-none"
            />
          </div>
        </div>

        <div className="absolute inset-x-0 top-0 flex h-[37.323px] items-center justify-center px-[5.418px] pt-[1.404px]">
          <div className="relative flex h-[7.826px] flex-1 items-center justify-center pr-[3.612px]">
            <p className="text-center text-[10.234px] leading-[13.244px] font-semibold tracking-tight text-white">
              9:41
            </p>
          </div>
          <div className="h-[22.274px] w-[75.249px] shrink-0 rounded-[60.199px] bg-black" />
          <div className="relative flex h-[7.826px] flex-1 items-center justify-center">
            <div className="relative h-[7.826px] w-[51.367px] shrink-0 overflow-clip">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/how-it-works/status-levels.svg"
                alt=""
                width={51}
                height={8}
                className="absolute inset-0 size-full max-w-none"
              />
            </div>
          </div>
        </div>

        <div className="absolute left-[-14.45px] top-[-13.85px] h-[553.831px] w-[270.896px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/how-it-works/iphone-bezel.png"
            alt=""
            width={271}
            height={554}
            className="pointer-events-none absolute inset-0 size-full max-w-none object-cover"
          />
        </div>
      </div>
    </SceneFrame>
  );
}

export function SceneOffer({ active }: { active: boolean }) {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const timers: number[] = [];
    const later = (delay: number, nextStage: number) => {
      timers.push(window.setTimeout(() => setStage(nextStage), delay));
    };

    if (!active) {
      later(0, 0);
      return () => timers.forEach(window.clearTimeout);
    }

    if (reduced) {
      later(0, 2);
      return () => timers.forEach(window.clearTimeout);
    }

    later(0, 0);
    later(100, 1);
    later(430, 2);

    return () => timers.forEach(window.clearTimeout);
  }, [active]);

  const closedFlapCollapsed = stage >= 1;
  const openFlapExpanded = stage >= 1;
  const pageRaised = stage >= 2;

  return (
    <SceneFrame active={active}>
      <div className="absolute inset-0 overflow-hidden bg-[#ede8e8] [perspective:1000px]">
        {/* Envelope back */}
        <div className="absolute left-[3.1%] top-[73.68%] h-[65.98%] w-[93.6%] bg-gradient-to-b from-[#f6f2f2] to-[#fbf9f9] shadow-[0_0_0_1.275px_rgba(88,64,50,0.11)]" />

        {/* Closed flap compresses upward while its top edge stays on the hinge. */}
        <div
          className="absolute left-[3.1%] top-[73.68%] z-40 h-[22.93%] w-[93.6%] origin-top transition-transform duration-[140ms] ease-[cubic-bezier(0.55,0,1,0.45)] will-change-transform"
          style={{
            transform: closedFlapCollapsed ? "scaleY(0)" : "scaleY(1)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/how-it-works/offer-envelope-flap-closed.svg"
            alt=""
            className="absolute left-0 top-[-1.64%] size-full max-w-none"
          />
        </div>

        {/* Open flap continues from that hinge and expands upward. */}
        <div
          className="absolute left-[3.1%] top-[50.75%] z-10 h-[22.93%] w-[93.6%] origin-bottom transition-transform delay-[110ms] duration-[190ms] ease-[cubic-bezier(0,0.7,0.2,1)] will-change-transform"
          style={{
            transform: openFlapExpanded ? "scaleY(1)" : "scaleY(0)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/how-it-works/offer-envelope-flap-open.svg"
            alt=""
            className="block size-full max-w-none"
          />
        </div>

        {/* Offer page starts inside the envelope, then rises after the flap opens. */}
        <div
          className="absolute left-[6.2%] top-[6.02%] z-20 aspect-[452/500] w-[87.6%] overflow-hidden rounded-[9.539px] shadow-[0_0_0_1.275px_rgba(88,64,50,0.17)] transition-[transform,filter] duration-[900ms] ease-[cubic-bezier(0.16,1.08,0.3,1)]"
          style={{
            transform: pageRaised ? "translateY(0)" : "translateY(78%)",
            filter: pageRaised ? "drop-shadow(0 10px 18px rgba(88,64,50,0.08))" : "none",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/how-it-works/offer-page.png"
            alt=""
            width={1819}
            height={2011}
            className="absolute left-[-0.304%] top-[-0.275%] h-[100.55%] w-[100.608%] max-w-none"
          />
        </div>

        {/* Front pocket, including its top highlight, inset shadow, and center seam. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/how-it-works/offer-envelope-front.svg"
          alt=""
          className="absolute left-[-4.34%] top-[64.59%] z-30 h-[145.38%] w-[108.49%] max-w-none"
        />
      </div>
    </SceneFrame>
  );
}

export function SceneAccept({ active }: { active: boolean }) {
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const timers: number[] = [];
    const later = (delay: number, value: boolean) => {
      timers.push(window.setTimeout(() => setEntered(value), delay));
    };

    if (!active) {
      later(0, false);
      return () => timers.forEach(window.clearTimeout);
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      later(0, true);
      return () => timers.forEach(window.clearTimeout);
    }

    later(0, false);
    later(160, true);
    return () => timers.forEach(window.clearTimeout);
  }, [active]);

  return (
    <SceneFrame active={active}>
      <div className="absolute inset-0">
        <Image
          src="/images/how-it-works/step-one-house.jpg"
          alt=""
          fill
          sizes="571px"
          className="pointer-events-none object-cover object-center"
        />
      </div>

      {/* Figma's 516 × 532 composition, centered without distorting the assets. */}
      <div className="absolute left-0 top-1/2 aspect-[516/532] w-full -translate-y-1/2">
        <div
          className="absolute left-[-19.62%] top-[54.43%] z-10 w-[83.96%] will-change-transform"
          style={{
            opacity: entered ? 1 : 0,
            transform: entered
              ? "translate3d(0, 0, 0) rotate(0deg) scale(1)"
              : "translate3d(-28%, 62%, 0) rotate(38deg) scale(0.86)",
            transformOrigin: "top left",
            transition:
              "transform 1100ms cubic-bezier(0.18, 1.28, 0.3, 1), opacity 180ms ease-out",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/how-it-works/step-four-calendar.svg"
            alt=""
            width={434}
            height={339}
            className="block h-auto w-full max-w-none"
          />
        </div>

        <div
          className="absolute left-[53.8%] top-[68.91%] z-20 w-[63.03%] will-change-transform"
          style={{
            opacity: entered ? 1 : 0,
            transform: entered
              ? "translate3d(0, 0, 0) rotate(0deg) scale(1)"
              : "translate3d(34%, 72%, 0) rotate(-38deg) scale(0.86)",
            transformOrigin: "top right",
            transition:
              "transform 1000ms cubic-bezier(0.18, 1.28, 0.3, 1) 80ms, opacity 180ms ease-out 80ms",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/how-it-works/step-four-envelope.svg"
            alt=""
            width={326}
            height={206}
            className="block h-auto w-full max-w-none"
          />
        </div>
      </div>
    </SceneFrame>
  );
}
