import Image from "next/image";
import { Navbar } from "./Navbar";

export function Hero() {
  return (
    <>
      <div className="pointer-events-none sticky top-0 z-50">
        <div className="pointer-events-auto relative mx-auto w-full max-w-[1440px] px-5 pt-2.5 sm:px-10 lg:px-[120px]">
          <Navbar />
        </div>
      </div>

      <section className="relative -mt-[82px] w-full overflow-x-clip bg-[#fbf9f9]">
      {/* Upper region — bg crops at the bottom edge (= top of input) */}
      <div className="relative pb-8">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {/* Background frame — Figma 538:4569 (1826 × 703) */}
          <div className="absolute left-1/2 top-0 h-[703px] w-[1826px] -translate-x-1/2">
            <div aria-hidden className="absolute inset-0 bg-[#fbf9f9]" />

            {/* Hero photo — natural aspect ratio */}
            <div className="absolute left-[calc(50%+0.5px)] top-[calc(50%-86px)] -translate-x-1/2 -translate-y-1/2">
              <Image
                src="/images/hero-bg.png"
                alt=""
                width={1614}
                height={832}
                priority
                className="pointer-events-none h-auto w-[1899px] max-w-none"
              />
            </div>

            {/* Soft white ellipse fade — bottom */}
            <div className="absolute left-1/2 top-[340px] h-[615px] w-[2372px] -translate-x-1/2">
              <div className="absolute inset-[-33.59%_-8.71%]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/hero-fade.svg"
                  alt=""
                  className="block size-full max-w-none"
                />
              </div>
            </div>

            {/* Right side blur shape */}
            <div className="absolute left-[1566px] top-[-270px] h-[1147px] w-[525px]">
              <div className="absolute inset-[-14.01%_-30.61%]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/hero-side-blur-right.svg"
                  alt=""
                  className="block size-full max-w-none"
                />
              </div>
            </div>

            {/* Left side blur shape (mirrored) */}
            <div className="absolute left-[-265px] top-[-270px] flex h-[1147px] w-[525px] items-center justify-center">
              <div className="h-[1147px] w-[525px] -scale-y-100 rotate-180">
                <div className="relative size-full">
                  <div className="absolute inset-[-14.01%_-30.61%]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/hero-side-blur-left.svg"
                      alt=""
                      className="block size-full max-w-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content above the input — 82px matches sticky nav (72px bar + 10px pad) */}
        <div className="relative mx-auto w-full max-w-[1440px] px-5 pt-[82px] sm:px-10 lg:px-[120px]">
          <div className="mx-auto mt-[364px] flex w-full max-w-[806px] flex-col items-center gap-6 text-center">
            <h1 className="w-full text-[48px] font-medium leading-[1.05] tracking-[-0.05em] text-[#25201d] sm:text-[56px] sm:leading-[60px] lg:text-[72px] lg:leading-[74px] lg:tracking-[-3.6px]">
              Move on your schedule.
              <br />
              We&apos;ll handle the sale.
            </h1>
            <p className="w-full text-[18px] font-normal tracking-[-0.05em] text-[rgba(37,32,29,0.6)] sm:text-[20px] sm:tracking-[-1px]">
              Get a cash offer and explore the ways we can help you sell your
              home.
            </p>
          </div>
        </div>
      </div>

      {/* Input + privacy — sits on solid page bg, below cropped image */}
      <div className="relative mx-auto w-full max-w-[1440px] px-5 sm:px-10 lg:px-[120px]">
        <div className="group/bar relative mx-auto flex w-full max-w-[562px] items-center gap-2 rounded-[20px] py-2 pl-4 pr-2 shadow-[0px_0px_0px_1px_rgba(88,64,50,0.16),0px_16px_20.4px_-9px_rgba(88,64,50,0.19),0px_37px_37.3px_3px_rgba(88,64,50,0.12)] transition-shadow has-[input:focus]:shadow-[0px_0px_0px_3px_rgba(88,64,50,0.3),0px_0px_0px_1px_rgba(88,64,50,0.3),0px_16px_20.4px_-9px_rgba(88,64,50,0.19),0px_37px_37.3px_3px_rgba(88,64,50,0.12)]">
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

        <p className="mx-auto mt-6 w-full max-w-[562px] pb-16 text-center text-[16px] font-normal tracking-[-0.8px] text-[rgba(37,32,29,0.6)]">
          Takes 5 minutes. Your information stays private.
        </p>
      </div>
    </section>
    </>
  );
}
