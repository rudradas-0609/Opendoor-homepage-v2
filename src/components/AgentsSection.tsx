import Image from "next/image";
import { BlueButton } from "./BlueButton";

export function AgentsSection() {
  return (
    <section className="bg-[#fbf9f9] pt-[120px]">
      <div className="relative mx-auto w-full max-w-[1440px] px-5 sm:px-10 lg:min-h-[382px] lg:px-[120px]">
        <div className="flex max-w-[462px] flex-col gap-9">
          <div className="flex flex-col gap-5">
            <h2 className="text-[32px] font-medium leading-[1.15] tracking-[-0.05em] text-[#25201d] sm:text-[40px] sm:leading-[48px] lg:text-[48px] lg:leading-[50px] lg:tracking-[-2.4px]">
              Are you an Agent representing a client?
            </h2>
            <p className="text-[20px] leading-[26px] tracking-[-1px] text-[rgba(37,32,29,0.6)]">
              Make your and your client’s lives easy by going through Opendoor
              to present the client with the easiest cash offer available.
            </p>
          </div>
          <BlueButton className="self-start">
            Create an account for your client
          </BlueButton>
        </div>

        <div className="relative mt-10 h-[382px] w-full overflow-clip rounded-[20px] bg-[#f7f3f2] shadow-[0px_0px_0px_1px_rgba(88,64,50,0.16)] lg:absolute lg:right-[120px] lg:top-0 lg:mt-0 lg:h-[382px] lg:w-[623px]">
          <div className="absolute left-1/2 top-[calc(50%+40.5px)] size-[651px] -translate-x-1/2 -translate-y-1/2">
            <Image
              src="/images/agents/consultation.png"
              alt="A real estate agent reviewing documents with clients in a kitchen"
              fill
              sizes="(min-width: 1024px) 623px, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
