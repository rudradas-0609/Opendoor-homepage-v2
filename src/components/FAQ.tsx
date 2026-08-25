const QUESTIONS = [
  "How does Opendoor simplify the selling process for homeowners?",
  "What steps should I expect when selling my home with Opendoor?",
  "Are there any hidden fees when selling my house through Opendoor?",
  "How quickly can I receive an offer for my home?",
];

export function FAQ() {
  return (
    <section className="bg-[#fbf9f9] pt-[120px]">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-10 px-5 sm:px-10 lg:flex-row lg:items-start lg:justify-between lg:gap-8 lg:px-[120px]">
        <h2 className="max-w-[377px] shrink-0 text-[32px] font-medium leading-[1.15] tracking-[-0.05em] text-[#25201d] sm:text-[40px] sm:leading-[48px] lg:pt-5 lg:text-[48px] lg:leading-[50px] lg:tracking-[-2.4px]">
          Frequently Asked Questions
        </h2>

        <div className="flex w-full max-w-[672px] flex-col gap-4">
          {QUESTIONS.map((question) => (
            <button
              key={question}
              type="button"
              className="flex w-full items-start gap-5 overflow-clip rounded-[20px] bg-[#f7f3f2] p-7 text-left shadow-[0px_0px_0px_1px_rgba(88,64,50,0.16)]"
            >
              <span className="min-w-0 flex-1 text-[20px] font-medium tracking-[-1px] text-[#25201d]">
                {question}
              </span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/icons/plus.svg"
                alt=""
                width={28}
                height={28}
                className="size-7 shrink-0"
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
