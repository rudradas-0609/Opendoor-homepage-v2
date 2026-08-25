import Image from "next/image";
import { BlueButton } from "./BlueButton";

export type ClosingVariant = "card" | "full";

function AddressBar({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative flex items-center gap-2 rounded-[20px] py-2 pl-4 pr-2 shadow-[0px_0px_0px_1px_rgba(88,64,50,0.16),0px_16px_20.4px_-9px_rgba(88,64,50,0.19),0px_37px_37.3px_3px_rgba(88,64,50,0.12)] ${className}`}
    >
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
      <BlueButton>Get an offer</BlueButton>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0px_0px_0px_1px_white,inset_0px_-3px_0px_0px_rgba(88,64,50,0.1)]"
      />
    </div>
  );
}

function FinalCTACard() {
  return (
    <section className="bg-[#fbf9f9] pt-[120px]">
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-10 lg:px-[120px]">
        <div className="relative h-auto overflow-clip rounded-[40px] bg-[#f7f3f2] shadow-[0px_0px_0px_1px_rgba(88,64,50,0.16)] lg:h-[424px]">
          <div className="pointer-events-none absolute top-1/2 right-[-241px] hidden h-[624px] w-[1215px] -translate-y-1/2 lg:block">
            <Image
              src="/images/buy-homes/cta-family.png"
              alt=""
              fill
              sizes="1215px"
              className="object-cover object-left"
            />
          </div>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 hidden lg:block"
          >
            <div className="absolute inset-y-0 left-0 w-[calc(4rem+562px)] bg-[#f7f3f2]" />
            <div className="absolute inset-y-0 left-[calc(4rem+562px)] w-[420px] bg-gradient-to-r from-[#f7f3f2] from-0% via-[#f7f3f2]/80 via-[32%] via-[#f7f3f2]/35 via-[62%] to-transparent to-100%" />
          </div>

          <div className="relative flex max-w-[439px] flex-col gap-5 px-6 py-10 sm:px-10 lg:left-16 lg:px-0 lg:py-16">
            <h2 className="text-[32px] font-medium leading-[1.15] tracking-[-0.05em] text-[#25201d] sm:text-[40px] sm:leading-[48px] lg:text-[48px] lg:leading-[50px] lg:tracking-[-2.4px]">
              Start your next move with Opendoor
            </h2>
            <p className="text-[20px] leading-[26px] tracking-[-1px] text-[rgba(37,32,29,0.6)]">
              Pellentesque in lorem ac et aliquam nec fringilla. Cursus platea
              elit mauris quam praesent non lacus.
            </p>
          </div>

          <AddressBar className="relative mx-6 mb-10 max-w-[562px] sm:mx-10 lg:absolute lg:top-[296px] lg:left-16 lg:mx-0 lg:mb-0 lg:w-[562px]" />
        </div>
      </div>
    </section>
  );
}

function FinalCTAFull() {
  return (
    <section className="relative z-10 pt-[110px]">
      <div className="relative h-[420px] overflow-clip rounded-bl-[50px] rounded-br-[50px] sm:h-[470px] lg:h-[510px]">
        <Image
          src="/images/buy-homes/cta-family.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-[center_18%]"
        />

        <div className="pointer-events-none absolute left-1/2 top-[-332px] h-[645px] w-[2546px] -translate-x-1/2">
          <div className="absolute inset-[-27.44%_-6.95%]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/final-cta/fade-ellipse.svg"
              alt=""
              className="block size-full max-w-none"
            />
          </div>
        </div>

        <div className="relative mx-auto flex h-full w-full max-w-[1100px] flex-col items-center px-5 pt-8 text-center sm:px-10 sm:pt-10 lg:pt-8">
          <div className="flex w-full flex-col items-center gap-5">
            <h2 className="w-full text-[32px] font-medium leading-[1.15] tracking-[-0.05em] text-[#25201d] sm:text-[40px] sm:leading-[48px] lg:whitespace-nowrap lg:text-[48px] lg:leading-[50px] lg:tracking-[-2.4px]">
              Start your next move with Opendoor
            </h2>
            <p className="max-w-[710px] text-[18px] leading-[24px] tracking-[-0.9px] text-[rgba(37,32,29,0.6)] sm:text-[20px] sm:leading-[26px] sm:tracking-[-1px]">
              Pellentesque in lorem ac et aliquam nec fringilla. Cursus platea
              elit mauris quam praesent non lacus.
            </p>
          </div>

          <AddressBar className="mt-9 w-full max-w-[584px]" />
        </div>
      </div>
    </section>
  );
}

export function FinalCTA({ variant = "full" }: { variant?: ClosingVariant }) {
  return variant === "card" ? <FinalCTACard /> : <FinalCTAFull />;
}
