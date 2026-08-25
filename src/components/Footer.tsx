import type { ReactNode } from "react";

const PRODUCT_LINKS = [
  "All Cash offer",
  "Cash Now More Later",
  "Sell to buy your next home",
  "Browse homes",
  "Stories",
  "Reviews",
];

const PARTNER_LINKS = [
  "Agents",
  "Brokers & Teams",
  "Builders",
  "Business partnerships",
  "Vendors",
];

const ABOUT_LINKS = [
  "Company",
  "News",
  "Contact",
  "Investors",
  "Careers",
  "Brokerages",
  "FAQs",
];

const LEGAL_LINKS = [
  { label: "Trust and safety", multiline: false },
  { label: "Terms of service", multiline: false },
  { label: "Privacy policy", multiline: false },
  { label: "Notice at collection", multiline: false },
  { label: "Do not sell or share my personal information", multiline: true },
  { label: "Avoiding rental scams", multiline: false },
];

const STATES = [
  "Alabama",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
];

const CITIES = [
  "Memphis",
  "Corpus Christi",
  "Houston",
  "Las Vegas",
  "San Antonio",
  "Dallas",
  "San Diego",
  "Oklahoma City",
  "Los Angeles",
  "Jacksonville",
  "Philadelphia",
  "Austin",
  "Raleigh",
  "Portland",
  "Sacramento",
  "Indianapolis",
  "Charlotte",
  "Detroit",
  "Seattle",
  "Pittsburgh",
  "Atlanta",
  "Phoenix",
  "Kansas City",
  "Washington, DC",
  "Miami",
  "Tucson",
  "Denver",
  "San Francisco Bay Area",
  "Orlando",
  "Minneapolis",
];

const AI_LINKS = [
  { name: "ChatGPT", src: "/images/footer/chatgpt.svg" },
  { name: "Claude", src: "/images/footer/claude.svg" },
  { name: "Gemini", src: "/images/footer/gemini.svg" },
  { name: "Grok", src: "/images/footer/grok.svg" },
  { name: "Perplexity", src: "/images/footer/perplexity.svg" },
];

function PipedList({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap items-center gap-x-[11px] gap-y-2">
      {items.map((item, index) => (
        <span key={item} className="flex items-center gap-x-[11px]">
          {index > 0 && (
            <span
              aria-hidden
              className="h-4 w-px bg-[rgba(37,32,29,0.2)]"
            />
          )}
          <a
            href="#"
            className="whitespace-nowrap text-[16px] leading-7 tracking-[-0.8px] text-[rgba(37,32,29,0.6)]"
          >
            {item}
          </a>
        </span>
      ))}
    </div>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="flex w-full flex-col items-start gap-4 lg:w-[190px]">
      <p className="w-full text-[20px] font-medium tracking-[-1px] text-[#25201d]">
        {title}
      </p>
      <div className="flex w-full flex-col items-start gap-3 text-[16px] tracking-[-0.8px] text-[rgba(37,32,29,0.6)]">
        {children}
      </div>
    </div>
  );
}

export function Footer({
  variant = "full",
}: {
  variant?: "card" | "full";
}) {
  const isFull = variant === "full";

  return (
    <footer
      className={`relative overflow-clip bg-[#f1eeee] ${
        isFull ? "z-0 -mt-[91px]" : "mt-10"
      }`}
    >
      {!isFull && (
        <div
          aria-hidden
          className="h-[92px] rounded-b-[50px] bg-[#fbf9f9] shadow-[0px_11px_30.1px_0px_rgba(88,64,50,0.04),0px_11px_66.1px_0px_rgba(88,64,50,0.09)]"
        />
      )}

      <div
        className={`relative mx-auto w-full max-w-[1440px] px-5 sm:px-10 lg:px-[120px] ${
          isFull ? "pt-[164px]" : "pt-[72px]"
        }`}
      >
        <div className="flex flex-col gap-12 lg:flex-row lg:gap-[104px]">
          <div className="flex w-full max-w-[264px] flex-col gap-5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/footer/logo.svg"
              alt="Opendoor"
              width={28}
              height={40}
              className="h-10 w-7"
            />
            <div className="flex flex-col gap-2">
              <p className="text-[20px] font-medium tracking-[-1px] text-[#25201d]">
                The better way to buy and sell
              </p>
              <p className="text-[16px] leading-[22px] tracking-[-0.8px] text-[rgba(37,32,29,0.6)]">
                Want to learn more? Ask AI for a summary of Opendoor and how we
                can help you sell your home.
              </p>
            </div>
            <div className="flex items-center gap-3">
              {AI_LINKS.map((link) => (
                <a
                  key={link.name}
                  href="#"
                  aria-label={`Ask ${link.name} about Opendoor`}
                  className="flex size-9 items-center justify-center rounded-full bg-[rgba(37,32,29,0.08)] shadow-[0px_1px_0px_0px_white,0px_-1px_0px_0px_rgba(0,0,0,0.17)]"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={link.src}
                    alt=""
                    width={18}
                    height={18}
                    className="size-[18px]"
                  />
                </a>
              ))}
            </div>
          </div>

          <div className="grid flex-1 grid-cols-2 gap-6 sm:grid-cols-4">
            <FooterColumn title="Products">
              {PRODUCT_LINKS.map((label) => (
                <a key={label} href="#" className="w-full">
                  {label}
                </a>
              ))}
            </FooterColumn>
            <FooterColumn title="Partners">
              {PARTNER_LINKS.map((label) => (
                <a key={label} href="#" className="w-full">
                  {label}
                </a>
              ))}
            </FooterColumn>
            <FooterColumn title="About">
              {ABOUT_LINKS.map((label) => (
                <a key={label} href="#" className="w-full">
                  {label}
                </a>
              ))}
            </FooterColumn>
            <FooterColumn title="Terms & Privacy">
              {LEGAL_LINKS.map((link) => (
                <a
                  key={link.label}
                  href="#"
                  className={`w-full ${link.multiline ? "leading-[22px]" : "leading-normal"}`}
                >
                  {link.label}
                </a>
              ))}
            </FooterColumn>
          </div>
        </div>

        <div className="mt-[92px] h-px w-full bg-[rgba(37,32,29,0.12)]" />

        <div className="flex flex-col gap-9 pt-12 pb-4">
          <div className="flex flex-col gap-3">
            <p className="text-[20px] font-medium tracking-[-1px] text-[#25201d]">
              Explore your state&apos;s housing market
            </p>
            <PipedList items={STATES} />
          </div>

          <div className="h-px w-full bg-[rgba(37,32,29,0.12)]" />

          <div className="flex flex-col gap-3">
            <p className="text-[20px] font-medium tracking-[-1px] text-[#25201d]">
              Top locations
            </p>
            <PipedList items={CITIES} />
          </div>

          <div className="flex flex-col gap-6 lg:flex-row lg:gap-6">
            <div className="flex h-auto flex-1 items-center justify-between gap-4 rounded-2xl bg-[rgba(92,67,51,0.06)] px-6 py-4 lg:h-[74px]">
              <p className="text-[20px] font-medium tracking-[-1px] text-[#25201d]">
                Get the app
              </p>
              <div className="flex shrink-0 items-start gap-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/footer/badge-play.png"
                  alt="Get it on Google Play"
                  width={120}
                  height={40}
                  className="h-10 w-[120px]"
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/footer/badge-app-store.png"
                  alt="Download on the App Store"
                  width={120}
                  height={40}
                  className="h-10 w-[120px]"
                />
              </div>
            </div>
            <div className="flex h-auto flex-1 items-center justify-between gap-4 rounded-2xl bg-[rgba(92,67,51,0.06)] px-6 py-4 lg:h-[74px]">
              <p className="text-[20px] font-medium tracking-[-1px] text-[#25201d]">
                Still have questions?
              </p>
              <button
                type="button"
                className="relative flex h-12 shrink-0 items-center justify-center overflow-clip rounded-xl px-6 shadow-[0px_0px_0px_1px_rgba(37,32,29,0.09)]"
              >
                <span
                  aria-hidden
                  className="absolute inset-0 rounded-xl bg-white"
                />
                <span className="relative text-[16px] font-medium tracking-[-0.8px] text-[#25201d]">
                  Visit the Help Center
                </span>
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0px_0px_0px_1px_rgba(255,255,255,0.35),inset_0px_-3px_0px_0px_#ddd9d8]"
                />
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-[5px] pt-8 text-[16px] tracking-[-0.8px] text-[rgba(37,32,29,0.6)]">
          <p className="leading-7">
            <span className="text-[#25201d]">CA:</span>
            {` Opendoor Brokerage Inc. DRE #02061130`}
          </p>
          <p className="leading-7">
            <span className="text-[#25201d]">NY:</span>
            {` Licensed as Opendoor Brokerage LLC, Fair Housing Notice`}
          </p>
          <p className="leading-7">
            <span className="text-[#25201d]">TX:</span>
            {` TREC Information About Brokerage Services, TREC Consumer Protection Notice`}
          </p>
          <p className="leading-[22px]">
            Opendoor Labs Inc. is dedicated to improving the accessibility of
            its Website and we view accessibility as a continually ongoing
            effort. Please contact us at support@opendoor.com with any support
            needs, feedback or suggestions.
          </p>
        </div>

        <div className="mt-12 h-px w-full bg-[rgba(37,32,29,0.12)]" />

        <p className="py-12 text-center text-[16px] leading-7 tracking-[-0.8px] text-[rgba(37,32,29,0.6)]">
          © 2026 Opendoor | All rights reserved.
        </p>
      </div>

      <div className="pointer-events-none relative mx-auto h-[203px] w-full max-w-[1440px] px-5 sm:px-10 lg:px-[120px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/footer/wordmark.svg"
          alt=""
          className="absolute bottom-[-59px] left-[120px] h-[261px] w-[1200px] max-w-none"
        />
      </div>
    </footer>
  );
}
