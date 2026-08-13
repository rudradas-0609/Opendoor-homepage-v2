// "use client";
// 
// /**
//  * Process contrast: Opendoor is one straight line of four clean cards;
//  * the traditional sale is a jumbled pile of chips that loops back on
//  * itself when deals fall through. Communicates process and convenience.
//  */
// 
// const OPENDOOR_FLOW = [
//   {
//     icon: "/images/cash-now-more-later/envelope.png",
//     title: "Request your offer",
//     note: "Online, in minutes",
//   },
//   {
//     icon: "/images/cash-now-more-later/signature.svg",
//     title: "Sign digitally",
//     note: "No notary, no office visits",
//   },
//   {
//     icon: "/images/cash-now-more-later/check.png",
//     title: "Get your cash",
//     note: "First payment at closing",
//   },
//   {
//     icon: "/images/cash-now-more-later/keys.png",
//     title: "Move on your date",
//     note: "You pick the day",
//   },
// ];
// 
// const TRADITIONAL_FLOW = [
//   "Find an agent",
//   "Repairs",
//   "Deep clean",
//   "Stage",
//   "Photos",
//   "List",
//   "Showings",
//   "Wait",
//   "Negotiate",
//   "Inspection",
//   "Appraisal",
//   "Contingency",
//   "Close",
// ];
// 
// /** Deterministic slight tilts so the traditional pile feels hand-scattered */
// const TILTS = [-1.4, 1.1, -0.8, 1.6, -1.1, 0.9, -1.6, 1.3, -0.7, 1.5, -1.2, 0.8, -0.9];
// 
// function Arrow() {
//   return (
//     <svg
//       aria-hidden
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       className="shrink-0 rotate-90 self-center text-[#0042e6] lg:rotate-0"
//     >
//       <path
//         d="M4 12h15m0 0-6-6m6 6-6 6"
//         stroke="currentColor"
//         strokeWidth="1.8"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       />
//     </svg>
//   );
// }
// 
// export function ProcessVariant() {
//   return (
//     <div className="mx-auto flex w-full max-w-[1000px] flex-col items-center">
//       {/* Opendoor — one straight line */}
//       <div className="variant-rise flex w-full flex-col items-stretch gap-3 lg:flex-row">
//         {OPENDOOR_FLOW.map((step, i) => (
//           <div key={step.title} className="contents">
//             <div
//               className="variant-rise flex flex-1 items-center gap-4 rounded-2xl bg-white p-5 shadow-[0px_0px_0px_1px_rgba(0,66,230,0.18),0px_16px_28px_-18px_rgba(0,66,230,0.25)] lg:flex-col lg:items-start lg:gap-0"
//               style={{ animationDelay: `${100 + i * 70}ms` }}
//             >
//               <div className="flex h-10 w-12 shrink-0 items-center justify-center">
//                 {/* eslint-disable-next-line @next/next/no-img-element */}
//                 <img
//                   src={step.icon}
//                   alt=""
//                   className="max-h-10 max-w-12 object-contain"
//                 />
//               </div>
//               <div className="min-w-0 lg:mt-4">
//                 <p className="text-[16px] font-medium leading-[20px] tracking-[-0.8px] text-[#25201d]">
//                   {step.title}
//                 </p>
//                 <p className="mt-1 text-[13px] font-normal leading-[17px] tracking-[-0.6px] text-[rgba(37,32,29,0.55)]">
//                   {step.note}
//                 </p>
//               </div>
//             </div>
//             {i < OPENDOOR_FLOW.length - 1 ? <Arrow /> : null}
//           </div>
//         ))}
//       </div>
// 
//       <p
//         className="variant-rise mt-5 text-[14px] font-medium tracking-[-0.7px] text-[#0042e6]"
//         style={{ animationDelay: "420ms" }}
//       >
//         Four steps. One straight line.
//       </p>
// 
//       {/* Divider */}
//       <div
//         className="variant-rise mt-10 flex w-full items-center gap-4"
//         style={{ animationDelay: "160ms" }}
//       >
//         <span aria-hidden className="h-px flex-1 bg-[rgba(88,64,50,0.16)]" />
//         <span className="rounded-full border border-[rgba(88,64,50,0.2)] px-4 py-1.5 text-[13px] font-medium tracking-[-0.65px] text-[rgba(37,32,29,0.6)]">
//           vs the traditional way
//         </span>
//         <span aria-hidden className="h-px flex-1 bg-[rgba(88,64,50,0.16)]" />
//       </div>
// 
//       {/* Traditional — a pile that loops back on itself */}
//       <div
//         className="variant-rise mt-6 w-full rounded-3xl border border-dashed border-[rgba(88,64,50,0.3)] bg-[rgba(208,195,188,0.16)] p-6 sm:p-8"
//         style={{ animationDelay: "240ms" }}
//       >
//         <div className="flex flex-wrap justify-center gap-2.5">
//           {TRADITIONAL_FLOW.map((task, i) => (
//             <span
//               key={task}
//               className="variant-rise rounded-full bg-white/80 px-3.5 py-1.5 text-[13px] font-normal tracking-[-0.65px] text-[rgba(37,32,29,0.7)] shadow-[0px_0px_0px_1px_rgba(88,64,50,0.12)]"
//               style={{
//                 animationDelay: `${300 + i * 40}ms`,
//                 rotate: `${TILTS[i % TILTS.length]}deg`,
//               }}
//             >
//               {task}
//             </span>
//           ))}
//         </div>
// 
//         <div className="mt-6 flex items-center justify-center gap-2 text-[13px] font-normal tracking-[-0.65px] text-[rgba(37,32,29,0.6)]">
//           <svg
//             aria-hidden
//             width="16"
//             height="16"
//             viewBox="0 0 24 24"
//             fill="none"
//             className="shrink-0"
//           >
//             <path
//               d="M20 12a8 8 0 1 1-2.34-5.66"
//               stroke="currentColor"
//               strokeWidth="1.7"
//               strokeLinecap="round"
//             />
//             <path
//               d="M20 3v5h-5"
//               stroke="currentColor"
//               strokeWidth="1.7"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             />
//           </svg>
//           <p>
//             Deal falls through? The loop starts over — 2–3 months if you’re
//             lucky.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }
