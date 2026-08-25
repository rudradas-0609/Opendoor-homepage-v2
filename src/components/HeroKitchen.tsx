"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Navbar } from "./Navbar";

export function HeroKitchen() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-[background-color] duration-300 ${
          scrolled ? "bg-[#fbf9f9]/95" : "bg-transparent"
        }`}
      >
        <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-10 lg:px-[120px]">
          <Navbar variant="solid" />
        </div>
      </header>

      <section className="relative -mt-[72px] w-full overflow-x-clip bg-[#fbf9f9]">
        <div className="relative h-[800px] w-full overflow-hidden rounded-bl-[40px] rounded-br-[40px]">
          <div className="absolute inset-x-0 top-0 h-[856px]">
            <Image
              src="/images/hero/kitchen-hero.png"
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover object-[center_58%]"
            />
          </div>

          {/* Soft white ellipse fade — top, from Figma 668:245 */}
          <div className="pointer-events-none absolute left-[calc(50%+58px)] top-[-362px] flex h-[960px] w-[2418px] -translate-x-1/2 items-center justify-center">
            <div className="h-[960px] w-[2418px] -scale-y-100">
              <div className="relative size-full">
                <div className="absolute inset-[-25.6%_-10.17%]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/hero/fade-ellipse.svg"
                    alt=""
                    className="block size-full max-w-none"
                  />
                </div>
              </div>
            </div>
          </div>

          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-[48%] bg-gradient-to-b from-[#fbf9f9] from-[32%] via-[#fbf9f9]/70 via-[68%] to-transparent"
          />

          <div className="relative mx-auto flex h-full w-full max-w-[1440px] flex-col items-center px-5 pt-[132px] sm:px-10 lg:px-[120px]">
            <div className="mx-auto flex w-full max-w-[806px] flex-col items-center gap-6 text-center">
              <h1 className="w-full text-[48px] font-medium leading-[1.05] tracking-[-0.05em] text-[#25201d] sm:text-[56px] sm:leading-[60px] lg:text-[64px] lg:leading-[66px] lg:tracking-[-3.2px]">
                Move on your schedule.
                <br />
                We&apos;ll handle the sale.
              </h1>
              <p className="w-full text-[18px] font-normal tracking-[-0.05em] text-[rgba(37,32,29,0.6)] sm:text-[20px] sm:tracking-[-1px]">
                Get a cash offer and explore the ways we can help you sell your
                home.
              </p>
            </div>

            <div className="group/bar relative mx-auto mt-[30px] flex w-full max-w-[744px] items-center gap-2 rounded-[20px] py-2 pl-4 pr-2 shadow-[0px_0px_0px_1px_rgba(88,64,50,0.29),0px_16px_20.4px_-9px_rgba(88,64,50,0.19),0px_37px_37.3px_3px_rgba(88,64,50,0.12)] transition-shadow has-[input:focus]:shadow-[0px_0px_0px_3px_rgba(88,64,50,0.3),0px_0px_0px_1px_rgba(88,64,50,0.3),0px_16px_20.4px_-9px_rgba(88,64,50,0.19),0px_37px_37.3px_3px_rgba(88,64,50,0.12)]">
              <span
                aria-hidden
                className="absolute inset-0 rounded-[20px] bg-white/70 backdrop-blur-[11.4px]"
              />

              <span className="relative size-6 shrink-0 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/icons/map-pin.svg"
                  alt=""
                  width={24}
                  height={24}
                  className="size-6"
                />
              </span>

              <label className="relative min-w-0 flex-1">
                <span className="sr-only">Home address</span>
                <input
                  type="text"
                  name="address"
                  placeholder="Enter your home address"
                  className="w-full bg-transparent text-[16px] font-normal tracking-[-0.8px] text-[#25201d] outline-none placeholder:text-[rgba(37,32,29,0.6)]"
                />
              </label>

              <button
                type="button"
                className="group/cta relative h-12 shrink-0 overflow-clip rounded-xl px-6 shadow-[0px_0px_0px_1px_#0042e6] transition-shadow hover:shadow-[0px_0px_0px_1px_#002b96] active:shadow-[0px_0px_0px_1px_#0042e6] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[#81a2f2]"
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
                  Get an offer
                </span>
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0px_0px_0px_1px_rgba(255,255,255,0.25),inset_0px_-4px_0px_0px_rgba(0,0,0,0.5)] transition-shadow group-hover/cta:shadow-[inset_0px_0px_0px_1px_rgba(255,255,255,0.25),inset_0px_-4px_0px_0px_rgba(0,0,0,0.14)] group-active/cta:shadow-[inset_0px_0px_0px_1px_rgba(255,255,255,0.25)]"
                />
              </button>

              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0px_0px_0px_1px_white,inset_0px_-3px_0px_0px_rgba(88,64,50,0.1)] transition-shadow group-has-[input:focus]/bar:shadow-[inset_0px_0px_0px_1px_white,inset_0px_-3px_0px_0px_rgba(88,64,50,0.05)]"
              />
            </div>

            <p className="mx-auto mt-6 w-full max-w-[562px] text-center text-[16px] font-normal tracking-[-0.8px] text-[rgba(37,32,29,0.6)]">
              Takes 5 minutes. Your information stays private.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
