"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

const GLASS_SHADOW =
  "shadow-[0px_0px_0px_1px_rgba(88,64,50,0.16),0px_16px_20.4px_-9px_rgba(88,64,50,0.19),0px_37px_37.3px_3px_rgba(88,64,50,0.12)]";

const GLASS_INSET =
  "pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0px_0px_0px_1px_white,inset_0px_-3px_0px_0px_rgba(88,64,50,0.1)]";

const ADDRESS = "3245 Jarvis St, Gotham, Ohio 129387";
const ADDRESS_PLACEHOLDER = "Enter your home address";
const HOMES_SOLD = "374";
const AVG_PRICE = "$634,684.56";
const TYPE_MS = 36;
const STATS_HEIGHT = 131;

function SceneFrame({
  active,
  children,
}: {
  active: boolean;
  children: ReactNode;
}) {
  return (
    <div
      className={`absolute inset-0 overflow-hidden ${active ? "z-10" : "pointer-events-none"}`}
      aria-hidden={!active}
      style={{ opacity: active ? 1 : 0 }}
    >
      {children}
    </div>
  );
}

function SceneOverlay({ replayKey }: { replayKey: number }) {
  const [typed, setTyped] = useState("");
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  const [statsIn, setStatsIn] = useState(false);
  const timersRef = useRef<number[]>([]);

  const clearTimers = useCallback(() => {
    for (const id of timersRef.current) window.clearTimeout(id);
    timersRef.current = [];
  }, []);

  const later = useCallback((ms: number, fn: () => void) => {
    const id = window.setTimeout(fn, ms);
    timersRef.current.push(id);
    return id;
  }, []);

  useEffect(() => {
    clearTimers();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    later(0, () => {
      if (reduced) {
        setShowPlaceholder(false);
        setTyped(ADDRESS);
        setStatsIn(true);
        return;
      }

      setTyped("");
      setShowPlaceholder(true);
      setStatsIn(false);

      later(700, () => {
        setShowPlaceholder(false);

        let i = 0;
        const typeNext = () => {
          i += 1;
          setTyped(ADDRESS.slice(0, i));
          if (i < ADDRESS.length) {
            later(TYPE_MS, typeNext);
          } else {
            later(280, () => setStatsIn(true));
          }
        };
        later(180, typeNext);
      });
    });

    return clearTimers;
  }, [replayKey, clearTimers, later]);

  const bottomRadius = statsIn ? 10 : 20;

  return (
    <div className="absolute inset-x-6 bottom-[10%] mx-auto flex w-auto max-w-[461px] flex-col gap-2">
      <div
        className={`relative flex h-16 items-center gap-2 overflow-hidden px-4 py-2 pr-2 ${GLASS_SHADOW}`}
        style={{
          borderRadius: `20px 20px ${bottomRadius}px ${bottomRadius}px`,
          transition: "border-radius 520ms cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        <span
          aria-hidden
          className="absolute inset-0 rounded-[inherit] bg-white/85 backdrop-blur-[11.4px]"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/icons/map-pin-step.svg"
          alt=""
          width={24}
          height={24}
          className="relative size-6 shrink-0"
        />
        <p
          className={`relative flex min-w-0 flex-1 items-center truncate text-[16px] font-normal tracking-[-0.8px] ${
            showPlaceholder ? "text-[rgba(37,32,29,0.6)]" : "text-[#25201d]"
          }`}
        >
          <span className="truncate">
            {showPlaceholder ? ADDRESS_PLACEHOLDER : typed}
          </span>
          {!showPlaceholder && typed.length < ADDRESS.length ? (
            <span
              aria-hidden
              className="ml-px h-[14px] w-[1.5px] shrink-0 self-center bg-[#25201d]"
            />
          ) : null}
        </p>
        <span aria-hidden className={GLASS_INSET} />
      </div>

      <div className="relative" style={{ height: STATS_HEIGHT }}>
        <div
          className={`absolute inset-0 overflow-hidden rounded-tl-[10px] rounded-tr-[10px] rounded-bl-[20px] rounded-br-[20px] px-[25px] py-[26px] ${GLASS_SHADOW}`}
          style={
            {
              opacity: statsIn ? 1 : 0,
              translate: statsIn ? "0 0" : "0 -28px",
              filter: statsIn ? "blur(0px)" : "blur(10px)",
              transition:
                "opacity 520ms cubic-bezier(0.22, 1, 0.36, 1), translate 520ms cubic-bezier(0.22, 1, 0.36, 1), filter 520ms cubic-bezier(0.22, 1, 0.36, 1)",
              pointerEvents: statsIn ? "auto" : "none",
            } as CSSProperties
          }
        >
          <span
            aria-hidden
            className="absolute inset-0 rounded-[inherit] bg-white/85 backdrop-blur-[11.4px]"
          />
          <div className="relative grid grid-cols-2 items-stretch">
            <div className="flex flex-col gap-3 pr-5">
              <p className="text-[14px] font-normal leading-[18px] tracking-[-0.7px] text-[rgba(37,32,29,0.6)]">
                Homes sold to Opendoor in Gotham
              </p>
              <p className="text-[28px] font-medium tracking-[-1.4px] text-[#25201d]">
                {HOMES_SOLD}
              </p>
            </div>

            <div className="relative flex flex-col gap-3 pl-5">
              <div
                aria-hidden
                className="absolute top-0 bottom-0 left-0 w-px bg-[rgba(88,64,50,0.16)]"
              />
              <p className="text-[14px] font-normal leading-[18px] tracking-[-0.7px] text-[rgba(37,32,29,0.6)]">
                Avg. price of home sold last month
              </p>
              <p className="text-[28px] font-medium tracking-[-1.4px] text-[#25201d]">
                {AVG_PRICE}
              </p>
            </div>
          </div>
          <span aria-hidden className={GLASS_INSET} />
        </div>
      </div>
    </div>
  );
}

export function SceneTellUs({ active }: { active: boolean }) {
  return (
    <SceneFrame active={active}>
      <div className="absolute left-[calc(50%+30.5px)] top-[calc(50%-57.5px)] h-[735px] w-[990px] -translate-x-1/2 -translate-y-1/2">
        <Image
          src="/images/how-it-works/neighborhood.png"
          alt=""
          fill
          sizes="990px"
          className="pointer-events-none object-cover"
        />
      </div>
      <SceneOverlay replayKey={active ? 1 : 0} />
    </SceneFrame>
  );
}

export function SceneAssessment({ active }: { active: boolean }) {
  return (
    <SceneFrame active={active}>
      <div className="absolute left-1/2 top-1/2 h-[660px] w-[620px] -translate-x-1/2 -translate-y-1/2 blur-[1.5px]">
        <Image
          src="/images/how-it-works/living-room.png"
          alt=""
          fill
          sizes="620px"
          className="pointer-events-none object-cover"
        />
      </div>

      <div className="absolute left-1/2 top-1/2 h-[526.139px] w-[242px] -translate-x-1/2 -translate-y-1/2 drop-shadow-[0px_4px_11.65px_rgba(0,0,0,0.49)]">
        <div className="absolute inset-0 overflow-clip rounded-[26.488px] bg-black">
          <div className="absolute top-[30.1px] h-[496.04px] w-[242px]">
            <Image
              src="/images/how-it-works/phone-screen.png"
              alt=""
              fill
              sizes="242px"
              className="pointer-events-none object-cover object-top"
            />
          </div>
          <div className="absolute left-1/2 top-[calc(50%-39px)] h-[324px] w-[304px] -translate-x-1/2 -translate-y-1/2 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/how-it-works/living-room.png"
              alt=""
              width={610}
              height={650}
              className="absolute left-[-50.26%] top-[-50.31%] h-[200.62%] w-[200.51%] max-w-none"
            />
          </div>
        </div>

        <div className="absolute inset-x-0 top-0 flex h-[37.323px] items-center justify-center px-[5.418px] pt-[1.404px]">
          <div className="relative flex h-[7.826px] flex-1 items-center justify-center pr-[3.612px]">
            <p className="text-center text-[10.234px] leading-[13.244px] font-semibold tracking-tight text-white">
              9:41
            </p>
          </div>
          <div className="h-[22.274px] w-[75.249px] shrink-0 rounded-[60.199px] bg-black" />
          <div className="relative flex h-[7.826px] flex-1 items-center justify-center">
            <div className="relative h-[7.826px] w-[51.367px] shrink-0 overflow-clip">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/how-it-works/status-levels.svg"
                alt=""
                width={51}
                height={8}
                className="absolute inset-0 size-full max-w-none"
              />
            </div>
          </div>
        </div>

        <div className="absolute left-[-14.45px] top-[-13.85px] h-[553.831px] w-[270.896px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/how-it-works/iphone-bezel.png"
            alt=""
            width={271}
            height={554}
            className="pointer-events-none absolute inset-0 size-full max-w-none object-cover"
          />
        </div>
      </div>
    </SceneFrame>
  );
}

function Bone({ className }: { className: string }) {
  return (
    <div className={`rounded-[3.585px] bg-[rgba(88,64,50,0.13)] ${className}`} />
  );
}

export function SceneOffer({ active }: { active: boolean }) {
  return (
    <SceneFrame active={active}>
      <div className="absolute left-1/2 top-[69px] h-[749px] w-[522px] -translate-x-1/2 overflow-clip rounded-[6px] bg-white shadow-[0px_19px_22.2px_-14px_rgba(74,40,20,0.15),0px_0px_0px_1px_rgba(100,57,31,0.32)]">
        <div className="absolute left-[11px] top-[11px] h-[129px] w-[500px] rounded-[3px] bg-[rgba(237,232,232,0.47)]">
          <p className="absolute left-[21px] top-[25px] text-[21.2px] font-medium tracking-[-0.636px] text-[#23201d]">
            Your estimated listing price
          </p>
          <p className="absolute left-[21px] top-[66px] text-[38.362px] font-medium tracking-[-1.1509px] text-[#23201d]">
            $ XXX, XXX
          </p>
        </div>

        <div className="absolute left-[32px] top-[164px] h-[101px] w-[191px] overflow-hidden rounded-[6.273px]">
          <Image
            src="/images/how-it-works/offer-house.png"
            alt=""
            fill
            sizes="191px"
            className="object-cover"
          />
        </div>
        <div className="absolute left-[243px] top-[179px] flex w-[187px] flex-col gap-[4px]">
          <p className="text-[17.951px] font-medium leading-[1.2] tracking-[-0.4308px] text-[#23201d]">
            1234 Main St,
            <br />
            Marietta, GA 30062
          </p>
          <p className="text-[15.957px] font-normal leading-[1.5] tracking-[-0.2234px] text-[#5d554d]">
            4 bed · 3 bath · 2,630 sqft
          </p>
        </div>

        <p className="absolute left-[32px] top-[313px] text-[21.2px] font-medium tracking-[-0.636px] text-[#23201d]">
          Your offers
        </p>

        <div className="absolute left-[32px] top-[348px] flex w-[458px] gap-[10px]">
          <div className="h-[103px] flex-1 rounded-[3.585px] bg-[rgba(88,64,50,0.06)]" />
          <div className="h-[103px] flex-1 rounded-[3.585px] bg-[rgba(88,64,50,0.06)]" />
        </div>

        <Bone className="absolute left-[32px] top-[461px] h-[12px] w-[224px]" />
        <Bone className="absolute left-[32px] top-[483px] h-[12px] w-[121px]" />
        <Bone className="absolute left-[266px] top-[461px] h-[12px] w-[224px]" />
        <Bone className="absolute left-[266px] top-[483px] h-[12px] w-[121px]" />

        <div className="absolute left-[32px] top-[515px] flex items-center gap-1">
          <Bone className="size-[12px]" />
          <Bone className="h-[12px] w-[192px]" />
        </div>
        <div className="absolute left-[32px] top-[535px] flex items-center gap-1">
          <Bone className="size-[12px]" />
          <Bone className="h-[12px] w-[192px]" />
        </div>
        <div className="absolute left-[266px] top-[515px] flex items-center gap-1">
          <Bone className="size-[12px]" />
          <Bone className="h-[12px] w-[192px]" />
        </div>
        <div className="absolute left-[266px] top-[535px] flex items-center gap-1">
          <Bone className="size-[12px]" />
          <Bone className="h-[12px] w-[192px]" />
        </div>
      </div>
    </SceneFrame>
  );
}

export function SceneAccept({ active }: { active: boolean }) {
  return (
    <SceneFrame active={active}>
      <div className="absolute left-1/2 top-[calc(50%-57.5px)] h-[735px] w-[990px] -translate-x-1/2 -translate-y-1/2">
        <Image
          src="/images/how-it-works/neighborhood.png"
          alt=""
          fill
          sizes="990px"
          className="pointer-events-none object-cover"
        />
      </div>

      <div className="absolute left-[106px] top-[240px] flex h-[410.741px] w-[358.696px] items-center justify-center">
        <div className="-rotate-[14.42deg]">
          <div className="relative h-[352.144px] w-[279.795px] overflow-clip rounded-[5.906px] shadow-[0px_0px_0px_0.738px_rgba(88,64,50,0.11)]">
            <div
              aria-hidden
              className="absolute inset-0 rounded-[5.906px] bg-gradient-to-b from-[#f7f3f3] to-[#fbf9f9]"
            />

            <div className="absolute left-[134.36px] top-1/2 h-[425.23px] w-[4.429px] -translate-y-1/2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/how-it-works/envelope-fold.png"
                alt=""
                width={4}
                height={425}
                className="absolute inset-0 size-full max-w-none object-cover"
              />
            </div>

            <div className="absolute left-[calc(50%-0.37px)] top-1/2 h-[382.412px] w-0 -translate-x-1/2 -translate-y-1/2">
              <div className="absolute inset-[0_-0.37px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/how-it-works/envelope-crease-a.svg"
                  alt=""
                  className="block size-full max-w-none"
                />
              </div>
            </div>
            <div className="absolute left-[calc(50%+0.37px)] top-1/2 h-[382.412px] w-0 -translate-x-1/2 -translate-y-1/2">
              <div className="absolute inset-[0_-0.37px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/how-it-works/envelope-crease-b.svg"
                  alt=""
                  className="block size-full max-w-none"
                />
              </div>
            </div>

            <div className="absolute left-0 top-0 h-[52.416px] w-[279.795px]">
              <div className="absolute inset-[0_-1.13%_-13.1%_-1.13%]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/how-it-works/envelope-flap-top.svg"
                  alt=""
                  className="block size-full max-w-none"
                />
              </div>
            </div>

            <div className="absolute left-0 top-[343.28px] flex h-[8.859px] w-[279.795px] items-center justify-center">
              <div className="-scale-y-100">
                <div className="relative h-[8.859px] w-[279.795px]">
                  <div className="absolute inset-[-25%_-0.26%_0_-0.26%]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/how-it-works/envelope-flap-bottom.svg"
                      alt=""
                      className="block size-full max-w-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            <p className="absolute left-[155.03px] top-[283.49px] whitespace-nowrap text-[5.679px] leading-[7.382px] tracking-[-0.2839px] text-[rgba(88,64,50,0.6)]">
              Final offer
            </p>
            <p className="absolute left-[155.03px] top-[292.98px] whitespace-nowrap text-[5.679px] leading-[7.382px] tracking-[-0.2839px] text-[rgba(88,64,50,0.6)]">
              from: Opendoor Operations Inc.
            </p>
            <p className="absolute left-[169.27px] top-[302.47px] whitespace-nowrap text-[5.679px] leading-[7.382px] tracking-[-0.2839px] text-[rgba(88,64,50,0.6)]">
              Miami, FL 968324
            </p>
            <p className="absolute left-[161.89px] top-[311.96px] whitespace-nowrap text-[5.679px] leading-[7.382px] tracking-[-0.2839px] text-[rgba(88,64,50,0.6)]">
              to: Jennifer Chen
            </p>
            <p className="absolute left-[169.27px] top-[321.45px] whitespace-nowrap text-[5.679px] leading-[7.382px] tracking-[-0.2839px] text-[rgba(88,64,50,0.6)]">
              Tampa, FL 897653
            </p>

            <div className="absolute left-[43.56px] top-[33.22px] flex h-[44.738px] w-[59.146px] items-center justify-center mix-blend-multiply">
              <div className="rotate-[13.91deg]">
                <div className="relative h-[33.025px] w-[52.755px]">
                  <div className="absolute inset-[-1.67%_-1.04%]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/how-it-works/envelope-stamp.svg"
                      alt=""
                      className="block size-full max-w-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0px_2.215px_0px_0px_white]" />
          </div>
        </div>
      </div>
    </SceneFrame>
  );
}
