"use client";

import { useState } from "react";
import {
  SceneAccept,
  SceneAssessment,
  SceneOffer,
  SceneTellUs,
} from "./how-it-works/Scenes";

const IMAGE_SHADOW =
  "shadow-[0px_19px_22.2px_-14px_rgba(74,40,20,0.15),0px_0px_0px_1px_rgba(100,57,31,0.32)]";

type Step = {
  id: string;
  icon: string;
  title: string;
  description: string;
};

const steps: Step[] = [
  {
    id: "tell-us",
    icon: "/icons/step-menu.svg",
    title: "Get an estimated cash offer",
    description: "Enter your address and a few details about the home.",
  },
  {
    id: "assessment",
    icon: "/icons/step-mobile.svg",
    title: "Show us your home",
    description:
      "Take a photo tour in our app, or we can send an agent to do it for you.",
  },
  {
    id: "offer",
    icon: "/icons/step-mail.svg",
    title: "Get the final offer",
    description: "Review the cash offer, fees, and net proceeds.",
  },
  {
    id: "accept",
    icon: "/icons/step-signature.svg",
    title: "Review and accept",
    description: "Pick your close date, sign, and move when you are ready.",
  },
];

function StepIcon({ src }: { src: string }) {
  return (
    <div className="relative size-9 shrink-0 overflow-hidden rounded-lg bg-[#ede8e8]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        width={20}
        height={20}
        className="absolute left-1/2 top-1/2 size-5 -translate-x-1/2 -translate-y-1/2"
      />
    </div>
  );
}

export function HowItWorks() {
  const [active, setActive] = useState(0);

  return (
    <section className="relative w-full overflow-x-clip bg-[#fbf9f9] py-[72px]">
      <div className="relative mx-auto flex w-full max-w-[1440px] flex-col items-stretch gap-10 px-5 sm:px-10 lg:flex-row lg:items-center lg:gap-20 lg:px-[120px]">
        {/* Left visual */}
        <div
          className={`relative mx-auto aspect-[571/620] w-full max-w-[571px] shrink-0 overflow-hidden rounded-[40px] bg-[#ede8e8] lg:mx-0 ${IMAGE_SHADOW}`}
        >
          <SceneTellUs active={active === 0} />
          <SceneAssessment active={active === 1} />
          <SceneOffer active={active === 2} />
          <SceneAccept active={active === 3} />
        </div>

        {/* Right steps */}
        <div className="flex w-full min-w-0 max-w-[604px] flex-col gap-[42px]">
          <h2 className="w-full text-[36px] font-medium leading-[1.15] tracking-[-0.05em] text-[#25201d] sm:text-[44px] sm:leading-[50px] lg:text-[48px] lg:leading-[50px] lg:tracking-[-2.4px]">
            Sell your home the easy way
          </h2>

          <div className="flex w-full flex-col" role="list">
            {steps.map((item, i) => {
              const isActive = i === active;
              const showDivider = i < steps.length - 1;

              return (
                <button
                  key={item.id}
                  type="button"
                  role="listitem"
                  onClick={() => setActive(i)}
                  className={`relative flex w-full cursor-pointer flex-col text-left ${
                    i > 0 ? "pt-6" : ""
                  } ${showDivider ? "pb-6" : ""}`}
                  aria-current={isActive ? "step" : undefined}
                >
                  <div className="flex w-full items-center gap-3">
                    <StepIcon src={item.icon} />
                    <p className="min-w-0 flex-1 text-[20px] font-medium leading-normal tracking-[-0.4px] text-[#25201d]">
                      {item.title}
                    </p>
                  </div>
                  <div
                    className="ml-12 grid transition-[grid-template-rows,opacity] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]"
                    style={{
                      gridTemplateRows: isActive ? "1fr" : "0fr",
                      opacity: isActive ? 1 : 0,
                    }}
                  >
                    <div className="overflow-hidden">
                      <p className="pt-3 text-[16px] font-normal leading-[21px] tracking-[-0.32px] text-[#806d63]">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  {showDivider ? (
                    <span
                      aria-hidden
                      className="pointer-events-none absolute bottom-0 left-12 h-px w-[calc(100%-48px)] max-w-[556px] bg-[#e6e2e0]"
                    />
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
