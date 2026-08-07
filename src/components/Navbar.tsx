"use client";

import {
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";

const focusRing =
  "focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[#81a2f2]";

const navLinkClassName = `flex h-11 items-center gap-1 rounded-xl px-3 text-[16px] font-medium tracking-[-0.8px] text-[#25201d] transition-colors hover:bg-[rgba(88,64,50,0.08)] active:bg-[rgba(88,64,50,0.16)] ${focusRing}`;

type MenuKey = "sell" | "buy";

const MENU_CONTENT: Record<
  MenuKey,
  { title: string; description: string; boxes: string[] }
> = {
  sell: {
    title: "Sell your home",
    description:
      "Get a cash offer, list with an agent, or explore your options — sample content for now.",
    boxes: ["Cash offer", "List & sell", "Sell timeline", "Pricing", "Repairs", "Closing"],
  },
  buy: {
    title: "Buy a home",
    description:
      "Browse homes, get pre-qualified, and find the right fit — sample content for now.",
    boxes: ["Browse homes", "Pre-qualify", "Neighborhoods", "Tours", "Offers", "Move-in"],
  },
};

function MenuPanel({ menu }: { menu: MenuKey }) {
  const content = MENU_CONTENT[menu];

  return (
    <div className="w-full shrink-0 px-6 py-5">
      <p className="text-[18px] font-medium tracking-[-0.9px] text-[#25201d]">
        {content.title}
      </p>
      <p className="mt-1 max-w-[36ch] text-[14px] leading-snug tracking-[-0.4px] text-[rgba(37,32,29,0.6)]">
        {content.description}
      </p>
      <div className="mt-4 grid grid-cols-3 gap-2.5">
        {content.boxes.map((label) => (
          <div
            key={label}
            className="flex h-[72px] items-end rounded-2xl bg-[rgba(88,64,50,0.06)] px-3.5 py-3 shadow-[inset_0_0_0_1px_rgba(88,64,50,0.08)]"
          >
            <span className="text-[13px] font-medium tracking-[-0.4px] text-[#25201d]">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <span
      className={`nav-chevron relative size-4 shrink-0 ${open ? "nav-chevron--open" : ""}`}
      aria-hidden
    >
      <svg
        width={16}
        height={16}
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="size-4"
      >
        <path
          className="nav-chevron__path"
          d="M4 6L8 10L12 6"
          stroke="currentColor"
          strokeWidth="1.33333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export function Navbar() {
  const sellMenuId = useId();
  const buyMenuId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const triggersRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const enterFrameRef = useRef<number | null>(null);

  const [activeMenu, setActiveMenu] = useState<MenuKey | null>(null);
  const [renderedMenu, setRenderedMenu] = useState<MenuKey>("sell");
  /** Controls mount + exit delay */
  const [present, setPresent] = useState(false);
  /** Controls enter/exit visual state (blur, fade, rise) */
  const [visible, setVisible] = useState(false);
  /** Enables directional slide/nudge only after first paint of a session */
  const [motionReady, setMotionReady] = useState(false);
  /** Center of Sell/Buy triggers relative to root (px) */
  const [menuCenter, setMenuCenter] = useState<number | null>(null);

  const clearCloseTimer = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const clearEnterFrame = () => {
    if (enterFrameRef.current !== null) {
      cancelAnimationFrame(enterFrameRef.current);
      enterFrameRef.current = null;
    }
  };

  const updateMenuCenter = () => {
    const root = rootRef.current;
    const triggers = triggersRef.current;
    if (!root || !triggers) return;
    const rootRect = root.getBoundingClientRect();
    const triggersRect = triggers.getBoundingClientRect();
    setMenuCenter(triggersRect.left + triggersRect.width / 2 - rootRect.left);
  };

  const openMenu = (menu: MenuKey) => {
    clearCloseTimer();
    updateMenuCenter();

    if (!present) {
      setMotionReady(false);
      setRenderedMenu(menu);
      setActiveMenu(menu);
      setPresent(true);
      setVisible(false);
      clearEnterFrame();
      // Paint closed styles first, enable transitions, then open.
      enterFrameRef.current = requestAnimationFrame(() => {
        setMotionReady(true);
        enterFrameRef.current = requestAnimationFrame(() => {
          setVisible(true);
          enterFrameRef.current = null;
        });
      });
      return;
    }

    setMotionReady(true);
    setActiveMenu(menu);
    setRenderedMenu(menu);
    setVisible(true);
  };

  const scheduleClose = () => {
    clearCloseTimer();
    closeTimerRef.current = setTimeout(() => {
      setVisible(false);
      setActiveMenu(null);
      closeTimerRef.current = setTimeout(() => {
        setPresent(false);
        setMotionReady(false);
        closeTimerRef.current = null;
      }, 300);
    }, 120);
  };

  useLayoutEffect(() => {
    if (!present) return;
    updateMenuCenter();
    window.addEventListener("resize", updateMenuCenter);
    return () => window.removeEventListener("resize", updateMenuCenter);
  }, [present]);

  useEffect(
    () => () => {
      clearCloseTimer();
      clearEnterFrame();
    },
    [],
  );

  useEffect(() => {
    if (!present) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        clearCloseTimer();
        setVisible(false);
        setActiveMenu(null);
        closeTimerRef.current = setTimeout(() => {
          setPresent(false);
          setMotionReady(false);
          closeTimerRef.current = null;
        }, 300);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [present]);

  const panelOffset = renderedMenu === "sell" ? -16 : 16;
  const contentOffset = renderedMenu === "sell" ? "0%" : "-50%";

  const shellClassName = [
    "nav-menu-shell w-[min(520px,calc(100vw-2rem))]",
    motionReady ? "nav-menu-shell--ready" : "",
    visible ? "nav-menu-shell--open" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const trackClassName = [
    "nav-menu-track",
    motionReady ? "nav-menu-track--ready" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    // Outer wrapper has no backdrop-filter so the menu can blur the page behind it.
    <div ref={rootRef} className="relative w-full">
      <nav
        className="relative z-10 flex h-[72px] w-full items-center justify-between rounded-[26px] bg-white/80 pl-[30px] pr-[14px] shadow-[0px_22px_19.4px_-11px_rgba(0,0,0,0.32),0px_0px_0px_1px_rgba(0,0,0,0.2)] backdrop-blur-[11.45px]"
        aria-label="Primary"
      >
        <a
          href="/"
          className={`relative h-[21px] w-[96px] shrink-0 rounded-sm ${focusRing}`}
          onMouseEnter={scheduleClose}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/icons/opendoor-logo.svg"
            alt="Opendoor"
            width={96}
            height={21}
            className="h-[21px] w-[96px]"
          />
        </a>

        <div className="flex items-center">
          <div
            ref={triggersRef}
            className="flex items-center"
            onMouseLeave={scheduleClose}
          >
            <button
              type="button"
              className={`${navLinkClassName} ${
                activeMenu === "sell" ? "bg-[rgba(88,64,50,0.08)]" : ""
              }`}
              aria-expanded={activeMenu === "sell"}
              aria-controls={sellMenuId}
              aria-haspopup="menu"
              onMouseEnter={() => openMenu("sell")}
              onFocus={() => openMenu("sell")}
              onClick={() => openMenu("sell")}
            >
              Sell
              <Chevron open={activeMenu === "sell"} />
            </button>

            <button
              type="button"
              className={`${navLinkClassName} ${
                activeMenu === "buy" ? "bg-[rgba(88,64,50,0.08)]" : ""
              }`}
              aria-expanded={activeMenu === "buy"}
              aria-controls={buyMenuId}
              aria-haspopup="menu"
              onMouseEnter={() => openMenu("buy")}
              onFocus={() => openMenu("buy")}
              onClick={() => openMenu("buy")}
            >
              Buy
              <Chevron open={activeMenu === "buy"} />
            </button>
          </div>

          <a
            href="#"
            className={navLinkClassName}
            onMouseEnter={scheduleClose}
          >
            Agents
          </a>

          {/* Sign in — outer ring + inset highlight / bottom shade from Figma */}
          <a
            href="#"
            onMouseEnter={scheduleClose}
            className={`group relative ml-3 flex h-11 items-center justify-center overflow-hidden rounded-xl px-6 shadow-[0px_0px_0px_1px_rgba(88,64,50,0.16)] transition-shadow hover:shadow-[0px_0px_0px_1px_rgba(88,64,50,0.3)] active:shadow-[0px_0px_0px_1px_rgba(88,64,50,0.3)] ${focusRing}`}
          >
            <span
              aria-hidden
              className="absolute inset-0 rounded-xl bg-white/90"
            />
            <span
              aria-hidden
              className="absolute inset-0 rounded-xl bg-[rgba(88,64,50,0.1)] opacity-0 transition-opacity group-active:opacity-100"
            />
            <span className="relative text-[16px] font-medium tracking-[-0.8px] text-[#25201d]">
              Sign in
            </span>
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0px_0px_0px_1px_white,inset_0px_-4px_0px_0px_rgba(88,64,50,0.1)] transition-shadow group-hover:shadow-[inset_0px_0px_0px_1px_white,inset_0px_-4px_0px_0px_rgba(88,64,50,0.05)] group-active:shadow-[inset_0px_0px_0px_1px_white]"
            />
          </a>
        </div>
      </nav>

      {present && menuCenter !== null ? (
        <div
          className="absolute top-full z-50 pt-3.5"
          style={{ left: menuCenter }}
          onMouseEnter={clearCloseTimer}
          onMouseLeave={scheduleClose}
        >
          <div
            className={shellClassName}
            style={
              {
                "--nav-menu-x": `${panelOffset}px`,
              } as CSSProperties
            }
          >
            <div
              id={renderedMenu === "buy" ? buyMenuId : sellMenuId}
              role="menu"
              aria-label={renderedMenu === "sell" ? "Sell menu" : "Buy menu"}
              className="nav-menu-content"
            >
              <div
                className={trackClassName}
                style={
                  {
                    "--nav-menu-track-x": contentOffset,
                  } as CSSProperties
                }
              >
                <div
                  className={`nav-menu-panel ${
                    renderedMenu === "sell" ? "" : "nav-menu-panel--inactive"
                  }`}
                >
                  <MenuPanel menu="sell" />
                </div>
                <div
                  className={`nav-menu-panel ${
                    renderedMenu === "buy" ? "" : "nav-menu-panel--inactive"
                  }`}
                >
                  <MenuPanel menu="buy" />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
