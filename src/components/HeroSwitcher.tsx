"use client";

import { useEffect, useState } from "react";
import { Hero } from "./Hero";
import { HeroFramed } from "./HeroFramed";
import { HeroKitchen } from "./HeroKitchen";

export type HeroVariant = "classic" | "kitchen" | "framed";

const STORAGE_KEY = "od-hero-variant";

function isVariant(value: string | null): value is HeroVariant {
  return value === "classic" || value === "kitchen" || value === "framed";
}

export function HeroSwitcher() {
  const [variant, setVariant] = useState<HeroVariant>("kitchen");

  useEffect(() => {
    const param = new URLSearchParams(window.location.search).get("hero");
    if (isVariant(param)) {
      setVariant(param);
      window.localStorage.setItem(STORAGE_KEY, param);
      return;
    }
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (isVariant(stored)) setVariant(stored);
  }, []);

  const select = (next: HeroVariant) => {
    setVariant(next);
    window.localStorage.setItem(STORAGE_KEY, next);
    const url = new URL(window.location.href);
    url.searchParams.set("hero", next);
    window.history.replaceState(null, "", url);
  };

  return (
    <>
      {variant === "kitchen" ? (
        <HeroKitchen />
      ) : variant === "framed" ? (
        <HeroFramed />
      ) : (
        <Hero />
      )}

      <div
        role="group"
        aria-label="Hero variant"
        className="fixed bottom-4 right-4 z-[100] flex items-center gap-1 rounded-full bg-[rgba(88,64,50,0.08)] p-1 shadow-[0px_8px_24px_-8px_rgba(37,32,29,0.28),0px_0px_0px_1px_rgba(88,64,50,0.08)] backdrop-blur-md"
      >
        {(
          [
            ["kitchen", "Kitchen"],
            ["classic", "Classic"],
            ["framed", "Framed"],
          ] as const
        ).map(([id, label]) => {
          const active = variant === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => select(id)}
              className={`rounded-full px-3.5 py-1.5 text-[13px] font-medium tracking-[-0.4px] transition-colors ${
                active
                  ? "bg-white text-[#25201d] shadow-[0px_1px_3px_rgba(37,32,29,0.14)]"
                  : "text-[rgba(37,32,29,0.6)] hover:text-[#25201d]"
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
