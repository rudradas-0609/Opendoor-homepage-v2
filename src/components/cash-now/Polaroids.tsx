/**
 * Taped polaroids from Figma 601:1044.
 * Positions are on the 1440-wide section canvas.
 */

export function Polaroids() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-10 hidden lg:block"
    >
      {/* Right shadow blob — 638:615 */}
      <div className="absolute left-[1136.5px] top-[71px] h-[326px] w-[255px]">
        <div className="absolute inset-[-3.19%_-4.08%]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/cash-now-more-later/polaroid-shadow-right.svg"
            alt=""
            className="block size-full max-w-none"
          />
        </div>
      </div>

      {/* Right polaroid — 631:285, rotate 2.4° */}
      <div className="absolute left-[1133px] top-[65.95px] flex h-[298.05px] w-[260.47px] items-center justify-center">
        <div className="rotate-[2.4deg]">
          <div className="relative h-[287.89px] w-[248.632px] overflow-clip rounded-[5.816px] bg-white shadow-[0px_0px_0px_1.454px_rgba(88,64,50,0.15)]">
            <div className="absolute left-[5.82px] top-[5.82px] size-[237.078px] overflow-hidden rounded-[2.908px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/cash-now-more-later/polaroid-new-house.png"
                alt=""
                width={237}
                height={237}
                className="size-full object-cover"
              />
            </div>
            <p className="absolute left-[27.51px] top-[251px] whitespace-nowrap font-hand text-[23.034px] leading-normal tracking-[-1.1517px] text-[#25201d]">
              First day in the new house!
            </p>
          </div>
        </div>
      </div>

      {/* Right tape — 631:356, rotate -4.54° */}
      <div className="absolute left-[1199.88px] top-[47px] flex h-[59.894px] w-[128.43px] items-center justify-center">
        <div className="-rotate-[4.54deg]">
          <div className="relative h-[50.162px] w-[124.849px]">
            <div className="absolute inset-[-1.11%_-0.74%]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/cash-now-more-later/polaroid-tape-right.svg"
                alt=""
                className="block size-full max-w-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Left polaroid — 631:359, rotate -8.64° */}
      <div className="absolute left-[35px] top-[3.87px] flex h-[304.125px] w-[273.037px] items-center justify-center">
        <div className="-rotate-[8.64deg]">
          <div className="relative h-[271.923px] w-[234.843px] overflow-clip rounded-[5.493px] bg-white shadow-[0px_15.107px_12.635px_-5.493px_rgba(88,64,50,0.11),0px_0px_0px_1.373px_rgba(88,64,50,0.15)]">
            <div className="absolute left-[5.49px] top-[5.49px] size-[223.856px] overflow-clip rounded-[2.747px]">
              <div className="absolute left-[calc(50%-2.38px)] top-[calc(50%+43.96px)] flex h-[340.462px] w-[264.328px] -translate-x-1/2 -translate-y-1/2 items-center justify-center">
                <div className="rotate-[3.61deg]">
                  <div className="relative h-[325.713px] w-[244.285px]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/cash-now-more-later/polaroid-moving-out.png"
                      alt=""
                      width={244}
                      height={326}
                      className="absolute inset-0 size-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
            <p className="absolute left-[41.35px] top-[232.21px] whitespace-nowrap font-hand text-[28.671px] leading-normal tracking-[-1.4336px] text-[#25201d]">
              Moving out day!
            </p>
          </div>
        </div>
      </div>

      {/* Left tape — 631:363, rotate -16.13° */}
      <div className="absolute left-[83.56px] top-[-10px] flex h-[77.55px] w-[125.274px] items-center justify-center">
        <div className="-rotate-[16.13deg]">
          <div className="relative h-[46.941px] w-[116.832px]">
            <div className="absolute inset-[-1.11%_-0.74%]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/cash-now-more-later/polaroid-tape-left.svg"
                alt=""
                className="block size-full max-w-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
