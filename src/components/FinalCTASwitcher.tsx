"use client";

import { useEffect, useState } from "react";
import { FinalCTA, type ClosingVariant } from "./FinalCTA";
import { Footer } from "./Footer";

const STORAGE_KEY = "od-cta-variant";

function isVariant(value: string | null): value is ClosingVariant {
  return value === "card" || value === "full";
}

export function FinalCTASwitcher() {
  const [variant, setVariant] = useState<ClosingVariant>("full");

  useEffect(() => {
    const param = new URLSearchParams(window.location.search).get("cta");
    if (isVariant(param)) {
      setVariant(param);
      window.localStorage.setItem(STORAGE_KEY, param);
      return;
    }
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (isVariant(stored)) setVariant(stored);
  }, []);

  const select = (next: ClosingVariant) => {
    setVariant(next);
    window.localStorage.setItem(STORAGE_KEY, next);
    const url = new URL(window.location.href);
    url.searchParams.set("cta", next);
    window.history.replaceState(null, "", url);
  };

  return (
    <>
      <div className="isolate">
        <FinalCTA variant={variant} />
        <Footer variant={variant} />
      </div>

      <div
        role="group"
        aria-label="Closing section style"
        className="fixed right-4 bottom-[3.75rem] z-[100] flex items-center gap-1 rounded-full bg-[rgba(88,64,50,0.06)] p-0.5 shadow-[0px_6px_18px_-8px_rgba(37,32,29,0.22),0px_0px_0px_1px_rgba(88,64,50,0.06)] backdrop-blur-md"
      >
        {(
          [
            ["full", "Full"],
            ["card", "Card"],
          ] as const
        ).map(([id, label]) => {
          const active = variant === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => select(id)}
              className={`rounded-full px-2.5 py-1 text-[11px] font-medium tracking-[-0.3px] transition-colors ${
                active
                  ? "bg-white text-[#25201d] shadow-[0px_1px_2px_rgba(37,32,29,0.12)]"
                  : "text-[rgba(37,32,29,0.5)] hover:text-[#25201d]"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>
    </>
  );
}
