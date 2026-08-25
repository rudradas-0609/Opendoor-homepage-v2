import Image from "next/image";
import { Navbar } from "./Navbar";

export function HeroFramed() {
  return (
    <>
      <header className="sticky top-0 z-50 bg-[#fbf9f9]">
        <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-10 lg:px-[120px]">
          <Navbar variant="solid" />
        </div>
      </header>

      <section className="relative w-full overflow-x-clip bg-[#fbf9f9]">
        <div className="mx-auto w-full max-w-[1440px] px-5 pt-5 sm:px-10 lg:px-[120px] lg:pt-6">
          <div className="mx-auto flex w-full max-w-[728px] flex-col items-center gap-3 text-center">
            <h1 className="w-full text-[40px] font-medium leading-[44px] tracking-[-0.05em] text-[#25201d] sm:text-[48px] sm:leading-[52px] lg:text-[64px] lg:leading-[66px] lg:tracking-[-3.2px]">
              Move on your schedule.
              <br />
              We&apos;ll handle the sale.
            </h1>
            <p className="w-full text-[16px] font-normal tracking-[-0.05em] text-[rgba(37,32,29,0.6)] sm:text-[18px] sm:tracking-[-0.9px] lg:text-[20px] lg:tracking-[-1px]">
              Get a cash offer and explore the ways we can help you sell your
              home.
            </p>
          </div>
        </div>

        {/* Wider than the 1200px content column, inset from the viewport */}
        <div className="mx-auto mt-3 w-full max-w-[1440px] px-5 pb-4 sm:px-10 lg:mt-3 lg:px-[57px] lg:pb-5">
          <div className="relative h-[320px] overflow-hidden rounded-[24px] sm:h-[400px] sm:rounded-[32px] lg:h-[486px] lg:rounded-[40px]">
            <Image
              src="/images/hero/kitchen-hero.png"
              alt=""
              fill
              priority
              sizes="(max-width: 1440px) calc(100vw - 40px), 1326px"
              className="object-cover object-[center_75%]"
            />

            <div className="relative mx-auto flex h-full w-full max-w-[744px] flex-col items-center px-3 pt-4 sm:px-4 sm:pt-5 lg:px-0 lg:pt-7">
              <div className="group/bar relative flex w-full flex-col gap-2 rounded-[20px] p-2 shadow-[0px_0px_0px_1px_rgba(88,64,50,0.29),0px_16px_20.4px_-9px_rgba(88,64,50,0.19),0px_37px_37.3px_3px_rgba(88,64,50,0.12)] transition-shadow has-[input:focus]:shadow-[0px_0px_0px_3px_rgba(88,64,50,0.3),0px_0px_0px_1px_rgba(88,64,50,0.3),0px_16px_20.4px_-9px_rgba(88,64,50,0.19),0px_37px_37.3px_3px_rgba(88,64,50,0.12)] sm:flex-row sm:items-center sm:gap-2 sm:p-0 sm:py-2 sm:pl-4 sm:pr-2">
                <span
                  aria-hidden
                  className="absolute inset-0 rounded-[20px] bg-[rgba(255,255,255,0.98)] backdrop-blur-[11.4px]"
                />

                <div className="relative flex min-w-0 flex-1 items-center gap-2 px-2 sm:px-0">
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
                </div>

                <button
                  type="button"
                  className="group/cta relative h-12 w-full shrink-0 overflow-clip rounded-xl px-6 shadow-[0px_0px_0px_1px_#0042e6] transition-shadow hover:shadow-[0px_0px_0px_1px_#002b96] active:shadow-[0px_0px_0px_1px_#0042e6] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[#81a2f2] sm:w-auto"
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

              <p className="mt-6 w-full text-center text-[16px] font-normal tracking-[-0.8px] text-white">
                Takes 5 minutes. Your information stays private.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
