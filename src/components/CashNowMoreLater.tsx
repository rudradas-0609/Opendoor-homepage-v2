import { Polaroids } from "./cash-now/Polaroids";
import { Timeline } from "./cash-now/Timeline";

export function CashNowMoreLater() {
  return (
    <section className="relative w-full overflow-x-clip bg-[#fbf9f9] py-24">
      <div className="relative mx-auto w-full max-w-[1440px]">
        <Polaroids />

        <div className="relative mx-auto flex w-full max-w-[803px] flex-col items-center px-5 pt-[47px] text-center sm:px-10">
          <h2 className="w-full max-w-[696px] text-[36px] font-medium leading-[1.1] tracking-[-0.05em] text-[#25201d] sm:text-[44px] sm:leading-[50px] lg:text-[48px] lg:tracking-[-2.4px]">
            <span className="block">Opendoor lets you move on with</span>
            <span className="relative inline-block">
              Cash Now, More Later
              <span
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-[calc(100%-4px)] h-[12px] w-[min(100%,470px)] -translate-x-1/2"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/cash-now-more-later/underline.svg"
                  alt=""
                  className="block size-full max-w-none"
                />
              </span>
            </span>
          </h2>

          <p className="mt-6 w-full text-[18px] font-normal leading-[26px] tracking-[-1px] text-[rgba(37,32,29,0.6)] sm:text-[20px]">
            We resell and then get you the remainder of the money after the
            sale. You also get to choose when you want to move out and plan
            every step according to your timelines.
          </p>

          <button
            type="button"
            className="group/cta relative mt-9 flex h-12 items-center justify-center overflow-clip rounded-xl px-6 shadow-[0px_0px_0px_1px_#0042e6] transition-shadow hover:shadow-[0px_0px_0px_1px_#002b96] active:shadow-[0px_0px_0px_1px_#0042e6] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[#81a2f2]"
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
              Get started with an offer today
            </span>
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0px_0px_0px_1px_rgba(255,255,255,0.25),inset_0px_-4px_0px_0px_rgba(0,0,0,0.5)] transition-shadow group-hover/cta:shadow-[inset_0px_0px_0px_1px_rgba(255,255,255,0.25),inset_0px_-4px_0px_0px_rgba(0,0,0,0.14)] group-active/cta:shadow-[inset_0px_0px_0px_1px_rgba(255,255,255,0.25)]"
            />
          </button>
        </div>

        {/* Figma: button bottom 307 → labels 338 */}
        <div className="relative mt-[31px]">
          <Timeline />
        </div>
      </div>
    </section>
  );
}
