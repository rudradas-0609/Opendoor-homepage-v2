// "use client";
// 
// import type { CSSProperties } from "react";
// 
// /**
//  * Duration bars on a shared 90-day scale: Opendoor's ~3 weeks vs the
//  * traditional ~2–3 months, with the traditional "waiting" stretch hatched.
//  * Communicates how much less time the Opendoor sale takes.
//  *
//  * Bars animate via the .variant-bar CSS animation (from width 0 to the
//  * element's own --bar-w) so no JS state is needed.
//  */
// 
// const SCALE_DAYS = 90;
// const OPENDOOR_DAYS = 21;
// const TRADITIONAL_DAYS = 75;
// 
// const pct = (days: number) => `${(days / SCALE_DAYS) * 100}%`;
// /** Position inside the traditional bar (which spans TRADITIONAL_DAYS itself) */
// const pctOfTradBar = (days: number) => `${(days / TRADITIONAL_DAYS) * 100}%`;
// 
// const RULER = [
//   { days: 0, label: "today" },
//   { days: 30, label: "30 days" },
//   { days: 60, label: "60 days" },
//   { days: 90, label: "90 days" },
// ];
// 
// export function TimeVariant() {
//   return (
//     <div className="mx-auto flex w-full max-w-[1000px] flex-col items-center">
//       <p className="variant-rise max-w-[640px] text-center text-[24px] font-medium leading-[1.2] tracking-[-1.2px] text-[#25201d] sm:text-[32px]">
//         Sold in about <span className="text-[#0042e6]">3 weeks</span> — not{" "}
//         <span className="text-[rgba(37,32,29,0.5)]">3 months</span>
//       </p>
// 
//       <div className="mt-12 grid w-full grid-cols-[76px_minmax(0,1fr)_92px] items-center gap-x-3 gap-y-7 sm:grid-cols-[110px_minmax(0,1fr)_120px] sm:gap-x-5">
//         {/* Opendoor row */}
//         <p className="text-right text-[14px] font-medium tracking-[-0.7px] text-[#25201d] sm:text-[16px]">
//           Opendoor
//         </p>
//         <div className="relative h-12 overflow-hidden rounded-full bg-[rgba(88,64,50,0.08)] sm:h-14">
//           <div
//             className="variant-bar absolute inset-y-0 left-0 rounded-full bg-[#0042e6]"
//             style={{ "--bar-w": pct(OPENDOOR_DAYS) } as CSSProperties}
//           />
//         </div>
//         <p className="text-[15px] font-medium tracking-[-0.75px] text-[#0042e6] sm:text-[17px]">
//           ~21 days
//         </p>
// 
//         {/* Traditional row */}
//         <p className="text-right text-[14px] font-medium tracking-[-0.7px] text-[rgba(37,32,29,0.6)] sm:text-[16px]">
//           Traditional
//         </p>
//         <div className="relative h-12 overflow-hidden rounded-full bg-[rgba(88,64,50,0.08)] sm:h-14">
//           <div
//             className="variant-bar absolute inset-y-0 left-0 overflow-hidden rounded-full bg-[rgba(208,195,188,0.85)]"
//             style={
//               {
//                 "--bar-w": pct(TRADITIONAL_DAYS),
//                 animationDelay: "180ms",
//               } as CSSProperties
//             }
//           >
//             {/* The long "showings, waiting, contingencies" stretch */}
//             <div
//               aria-hidden
//               className="absolute inset-y-0"
//               style={{
//                 left: pctOfTradBar(OPENDOOR_DAYS),
//                 right: 0,
//                 backgroundImage: "url(/images/cash-now-more-later/hatch.svg)",
//                 backgroundSize: "20px 20px",
//                 backgroundRepeat: "repeat",
//                 opacity: 0.55,
//               }}
//             />
//             <p
//               className="absolute inset-y-0 hidden items-center justify-center text-[12px] font-normal tracking-[-0.6px] text-[rgba(37,32,29,0.6)] md:flex"
//               style={{ left: pctOfTradBar(OPENDOOR_DAYS), right: 0 }}
//             >
//               showings · waiting · contingencies
//             </p>
//           </div>
//         </div>
//         <p className="text-[15px] font-medium tracking-[-0.75px] text-[rgba(37,32,29,0.6)] sm:text-[17px]">
//           60–90 days
//         </p>
// 
//         {/* Day ruler aligned to the bar column */}
//         <span aria-hidden />
//         <div className="relative h-6">
//           {RULER.map((tick) => (
//             <span
//               key={tick.days}
//               className={`absolute top-0 flex flex-col gap-1 ${
//                 tick.days === 0
//                   ? "items-start"
//                   : tick.days === SCALE_DAYS
//                     ? "items-end -translate-x-full"
//                     : "-translate-x-1/2 items-center"
//               }`}
//               style={{ left: pct(tick.days) }}
//             >
//               <span
//                 aria-hidden
//                 className="h-1.5 w-px bg-[rgba(37,32,29,0.3)]"
//               />
//               <span className="whitespace-nowrap text-[11px] font-normal tracking-[-0.5px] text-[rgba(37,32,29,0.5)]">
//                 {tick.label}
//               </span>
//             </span>
//           ))}
//         </div>
//         <span aria-hidden />
//       </div>
// 
//       <p
//         className="variant-rise mt-10 max-w-[560px] text-center text-[16px] font-normal leading-[24px] tracking-[-0.8px] text-[rgba(37,32,29,0.6)]"
//         style={{ animationDelay: "300ms" }}
//       >
//         Every extra week on the market is another week of showings, cleaning,
//         and uncertainty. Opendoor hands you that time back.
//       </p>
//     </div>
//   );
// }
