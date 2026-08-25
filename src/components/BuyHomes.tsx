import Image from "next/image";
import { BlueButton } from "./BlueButton";

const HOMES = [
  {
    price: "$380,000",
    details: "5 bds | 3 ba | 3,006 sqft",
    address: "37 Possum Creek Way, Dallas, SF 30132",
    image: "/images/buy-homes/house-1.png",
  },
  {
    price: "$525,000",
    details: "4 bds | 2 ba | 2,450 sqft",
    address: "12 Maple Ridge Dr, Austin, TX 78701",
    image: "/images/buy-homes/house-2.png",
  },
  {
    price: "$275,000",
    details: "3 bds | 2 ba | 1,800 sqft",
    address: "89 Birchwood Ln, Denver, CO 80202",
    image: "/images/buy-homes/house-3.png",
  },
];

const PINS = [
  { left: "65.8%", top: "23.7%" },
  { left: "63.0%", top: "75.0%" },
  { left: "80.5%", top: "33.0%" },
  { left: "88.3%", top: "47.3%" },
];

function MapCard() {
  return (
    <div className="relative h-[452px] min-w-0 flex-1 overflow-clip rounded-[20px] bg-[#ede8e8] shadow-[0px_0px_0px_1px_rgba(88,64,50,0.16)]">
      <div className="absolute left-[170px] top-[6px] h-[505px] w-[1022px]">
        <Image
          src="/images/buy-homes/map.png"
          alt=""
          fill
          sizes="1022px"
          className="object-cover"
        />
      </div>

      {PINS.map((pin) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={`${pin.left}-${pin.top}`}
          src="/images/buy-homes/price-pin.png"
          alt=""
          width={45}
          height={32}
          className="absolute h-8 w-[45px] max-w-none"
          style={{ left: pin.left, top: pin.top }}
        />
      ))}

      <div
        aria-hidden
        className="absolute left-[-9px] top-[-46px] h-[102px] w-[528px] bg-[rgba(251,249,249,0.7)] blur-[22.45px]"
      />

      <p className="absolute left-6 top-7 text-[20px] font-medium tracking-[-1px] text-[#25201d]">
        Nearby homes you might be interested in
      </p>

      <div className="absolute left-6 top-[66px] flex w-[442px] flex-col gap-3.5">
        {HOMES.map((home) => (
          <article
            key={home.address}
            className="relative h-[110px] overflow-clip rounded-xl shadow-[0px_0px_0px_1px_rgba(100,57,31,0.12)]"
          >
            <div
              aria-hidden
              className="absolute inset-0 rounded-xl bg-white/70 backdrop-blur-[21.65px]"
            />
            <div className="absolute left-0 top-0 h-[110px] w-[165px] overflow-clip rounded-xl">
              <Image
                src={home.image}
                alt=""
                fill
                sizes="165px"
                className="object-cover"
              />
            </div>
            <div className="absolute left-[181px] top-1/2 flex h-[72px] w-[236px] -translate-y-1/2 flex-col gap-2">
              <p className="text-[20px] font-medium tracking-[-1px] text-[#25201d]">
                {home.price}
              </p>
              <p className="overflow-hidden text-[16px] leading-[21px] tracking-[-0.8px] text-[rgba(37,32,29,0.6)]">
                {home.details}
                <br />
                {home.address}
              </p>
            </div>
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-xl shadow-[inset_0px_0px_0px_2px_rgba(255,255,255,0.6)]"
            />
          </article>
        ))}
      </div>
    </div>
  );
}

function AppDownloadCard() {
  return (
    <div className="relative h-[452px] w-full shrink-0 overflow-clip rounded-[20px] bg-[#f7f3f2] shadow-[0px_0px_0px_1px_rgba(88,64,50,0.16)] lg:w-[340px]">
      <div className="absolute left-1/2 top-0 w-[315px] -translate-x-1/2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/buy-homes/app-phone.png"
          alt="Opendoor app showing homes on a map"
          width={315}
          height={452}
          className="h-auto w-[315px] max-w-none"
        />
      </div>

      <div className="absolute left-1/2 top-[236px] h-[243px] w-[548px] -translate-x-1/2 overflow-clip rounded-xl bg-gradient-to-b from-transparent via-[rgba(247,243,242,0.89)] via-[30%] to-[#f7f3f2] to-[47%]">
        <p className="absolute left-[124px] top-[131px] w-[106px] text-[16px] font-medium tracking-[-0.8px] text-[#25201d]">
          Download the Opendoor app on your mobile
        </p>
        <div className="absolute left-[236px] top-[106px] size-[90px] overflow-clip rounded-md border border-[rgba(37,32,29,0.2)] bg-white">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/buy-homes/qr-app.png"
            alt=""
            width={90}
            height={90}
            className="size-full max-w-none"
          />
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/buy-homes/badge-play-sm.png"
          alt="Get it on Google Play"
          width={90}
          height={30}
          className="absolute left-[334px] top-[125.5px] h-[30px] w-[90px] max-w-none"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/buy-homes/badge-app-store-sm.png"
          alt="Download on the App Store"
          width={90}
          height={30}
          className="absolute bottom-[49px] left-[calc(50%+105px)] h-[30px] w-[90px] max-w-none -translate-x-1/2"
        />
      </div>
    </div>
  );
}

function KeyAppCard() {
  return (
    <div className="relative h-[454px] min-w-0 flex-1 overflow-clip rounded-[20px] bg-[#f7f3f2] shadow-[0px_0px_0px_1px_rgba(88,64,50,0.16)]">
      <p className="absolute left-6 top-10 w-[228px] text-[20px] font-medium tracking-[-1px] text-[#25201d]">
        Get an offer on your home in days on the Key app
      </p>

      <div className="absolute left-6 top-[234px] flex w-[109px] flex-col gap-2">
        <div className="h-[109px] w-full overflow-clip rounded-[7.267px] border-[1.211px] border-[rgba(37,32,29,0.2)] bg-white">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/buy-homes/qr-key.png"
            alt=""
            width={109}
            height={109}
            className="size-full max-w-none"
          />
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/buy-homes/badge-app-store-md.png"
          alt="Download on the App Store"
          width={109}
          height={36}
          className="h-[36.335px] w-full max-w-none"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/buy-homes/badge-play-md.png"
          alt="Get it on Google Play"
          width={109}
          height={36}
          className="h-[36.335px] w-full max-w-none"
        />
      </div>

      <div className="absolute bottom-0 right-6 w-[250px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/buy-homes/key-phone.png"
          alt="Key app photo tour on a phone"
          width={250}
          height={385}
          className="h-auto w-[250px] max-w-none"
        />
      </div>
    </div>
  );
}

function MortgageCard() {
  return (
    <div className="relative h-[454px] min-w-0 flex-1 overflow-clip rounded-[20px] bg-[#f7f3f2] shadow-[0px_0px_0px_1px_rgba(88,64,50,0.16)]">
      <p className="absolute left-6 top-6 w-[270px] text-[20px] font-medium tracking-[-1px] text-[#25201d]">
        Get the best mortgage possible with Opendoor
      </p>
      <div className="absolute left-1/2 top-[98px] h-[51px] w-[340px] -translate-x-1/2 rounded-xl bg-white/80 shadow-[0px_0px_0px_1px_rgba(88,64,50,0.16),inset_0px_0px_0px_1px_white,inset_0px_-4px_0px_0px_rgba(88,64,50,0.1)]" />
      <div className="absolute left-1/2 top-[164px] h-[323px] w-[264px] -translate-x-1/2 rounded-xl bg-white/80 shadow-[0px_0px_0px_1px_rgba(88,64,50,0.16),inset_0px_0px_0px_1px_white,inset_0px_-4px_0px_0px_rgba(88,64,50,0.1)]" />
      <div className="absolute left-[calc(50%-276px)] top-[190px] h-[323px] w-[264px] -translate-x-1/2 rounded-xl bg-white/80 shadow-[0px_0px_0px_1px_rgba(88,64,50,0.16),inset_0px_0px_0px_1px_white,inset_0px_-4px_0px_0px_rgba(88,64,50,0.1)]" />
      <div className="absolute left-[calc(50%+276px)] top-[190px] h-[323px] w-[264px] -translate-x-1/2 rounded-xl bg-white/80 shadow-[0px_0px_0px_1px_rgba(88,64,50,0.16),inset_0px_0px_0px_1px_white,inset_0px_-4px_0px_0px_rgba(88,64,50,0.1)]" />
    </div>
  );
}

export function BuyHomes() {
  return (
    <section className="bg-[#fbf9f9] pt-[76px]">
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-10 lg:px-[120px]">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="max-w-[599px] text-[32px] font-medium leading-[1.15] tracking-[-0.05em] text-[#25201d] sm:text-[40px] sm:leading-[48px] lg:text-[48px] lg:leading-[50px] lg:tracking-[-2.4px]">
            We can also help you look for your next dream home
          </h2>
          <BlueButton>Explore homes</BlueButton>
        </div>

        <div className="mt-10 flex flex-col gap-4 lg:flex-row">
          <MapCard />
          <AppDownloadCard />
        </div>

        <div className="mt-[85px] flex flex-col gap-[18px] lg:flex-row">
          <KeyAppCard />
          <MortgageCard />
        </div>
      </div>
    </section>
  );
}
