// "use client";
// 
// import { useEffect, useState } from "react";
// 
// /**
//  * Burden counters: how many things sit on the seller's plate with Opendoor
//  * vs the traditional sale. Numbers count up on view; chips spell out what
//  * those things actually are. Communicates how much simpler Opendoor is.
//  */
// 
// const OPENDOOR_CHIPS = ["Request offer", "Sign contract", "Get paid", "Move out"];
// 
// const TRADITIONAL_CHIPS = [
//   "Agent search",
//   "Commission talks",
//   "Repairs",
//   "Cleaning",
//   "Staging",
//   "Photos",
//   "Listing",
//   "Showings",
//   "Open houses",
//   "Waiting",
//   "Negotiations",
//   "Inspection",
//   "Appraisal",
//   "Contingencies",
//   "Buyer delays",
// ];
// 
// function useCountUp(target: number, duration = 1000) {
//   const [value, setValue] = useState(0);
// 
//   useEffect(() => {
//     if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
//       const id = window.setTimeout(() => setValue(target), 0);
//       return () => window.clearTimeout(id);
//     }
//     let raf = 0;
//     const start = performance.now();
//     const tick = (now: number) => {
//       const p = Math.min(1, (now - start) / duration);
//       const eased = 1 - Math.pow(1 - p, 3);
//       setValue(Math.round(target * eased));
//       if (p < 1) raf = requestAnimationFrame(tick);
//     };
//     raf = requestAnimationFrame(tick);
//     // Guarantee the final value even if frames stop being produced
//     const backup = window.setTimeout(() => setValue(target), duration + 400);
//     return () => {
//       cancelAnimationFrame(raf);
//       window.clearTimeout(backup);
//     };
//   }, [target, duration]);
// 
//   return value;
// }
// 
// export function EffortVariant() {
//   const opendoor = useCountUp(OPENDOOR_CHIPS.length, 800);
//   const traditional = useCountUp(TRADITIONAL_CHIPS.length, 1600);
// 
//   return (
//     <div className="mx-auto flex w-full max-w-[1000px] flex-col items-center">
//       <div className="relative grid w-full gap-4 lg:grid-cols-2 lg:gap-6">
//         {/* vs badge */}
//         <div
//           aria-hidden
//           className="variant-rise absolute left-1/2 top-1/2 z-10 hidden size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#25201d] text-[14px] font-medium tracking-[-0.7px] text-white shadow-[0px_8px_16px_-6px_rgba(37,32,29,0.4)] lg:flex"
//           style={{ animationDelay: "200ms" }}
//         >
//           vs
//         </div>
// 
//         {/* Opendoor panel */}
//         <div className="variant-rise relative flex flex-col overflow-hidden rounded-3xl bg-white p-8 text-center shadow-[0px_0px_0px_1px_rgba(0,66,230,0.22),0px_24px_40px_-24px_rgba(0,66,230,0.28)]">
//           <p className="text-[88px] font-medium leading-none tracking-[-4px] text-[#0042e6] tabular-nums">
//             {opendoor}
//           </p>
//           <p className="mt-3 text-[18px] font-medium tracking-[-0.9px] text-[#25201d]">
//             things on your plate
//           </p>
//           <div className="mt-6 flex flex-1 flex-wrap content-center justify-center gap-2">
//             {OPENDOOR_CHIPS.map((chip, i) => (
//               <span
//                 key={chip}
//                 className="variant-rise rounded-full bg-[rgba(0,66,230,0.08)] px-3.5 py-1.5 text-[13px] font-medium tracking-[-0.65px] text-[#0042e6]"
//                 style={{ animationDelay: `${300 + i * 60}ms` }}
//               >
//                 {chip}
//               </span>
//             ))}
//           </div>
//           <p className="mt-6 border-t border-[rgba(0,66,230,0.14)] pt-4 text-[14px] font-normal leading-[20px] tracking-[-0.7px] text-[rgba(37,32,29,0.6)]">
//             We handle pricing, prep, showings, and the resale.
//           </p>
//         </div>
// 
//         {/* Traditional panel */}
//         <div
//           className="variant-rise relative flex flex-col overflow-hidden rounded-3xl bg-[rgba(208,195,188,0.22)] p-8 text-center shadow-[0px_0px_0px_1px_rgba(88,64,50,0.14)]"
//           style={{ animationDelay: "90ms" }}
//         >
//           <p className="text-[88px] font-medium leading-none tracking-[-4px] text-[#25201d] tabular-nums">
//             {traditional}
//             <span className="text-[rgba(37,32,29,0.4)]">+</span>
//           </p>
//           <p className="mt-3 text-[18px] font-medium tracking-[-0.9px] text-[#25201d]">
//             things to juggle yourself
//           </p>
//           <div className="mt-6 flex flex-1 flex-wrap content-center justify-center gap-2">
//             {TRADITIONAL_CHIPS.map((chip, i) => (
//               <span
//                 key={chip}
//                 className="variant-rise rounded-full bg-white/70 px-3 py-1.5 text-[12px] font-normal tracking-[-0.6px] text-[rgba(37,32,29,0.65)] shadow-[0px_0px_0px_1px_rgba(88,64,50,0.12)]"
//                 style={{ animationDelay: `${350 + i * 40}ms` }}
//               >
//                 {chip}
//               </span>
//             ))}
//           </div>
//           <p className="mt-6 border-t border-[rgba(88,64,50,0.14)] pt-4 text-[14px] font-normal leading-[20px] tracking-[-0.7px] text-[rgba(37,32,29,0.6)]">
//             And any one of them can delay — or kill — the sale.
//           </p>
//         </div>
//       </div>
// 
//       <p
//         className="variant-rise mt-8 max-w-[560px] text-center text-[16px] font-normal leading-[24px] tracking-[-0.8px] text-[rgba(37,32,29,0.6)]"
//         style={{ animationDelay: "320ms" }}
//       >
//         Same house. Same sale. A very different to-do list.
//       </p>
//     </div>
//   );
// }
