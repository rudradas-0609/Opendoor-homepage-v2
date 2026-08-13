// "use client";
// 
// /**
//  * Side-by-side task lists: Opendoor's short, fully-checked list vs the
//  * traditional sale's long list of numbered to-dos. Communicates how many
//  * more things sellers deal with the traditional way.
//  */
// 
// const OPENDOOR_TASKS = [
//   { title: "Request your offer", note: "Online, in minutes" },
//   { title: "Sign your contract", note: "Digitally, from your couch" },
//   { title: "Get your first payment", note: "Most of your cash at closing" },
//   { title: "Move out", note: "On the date you pick" },
//   { title: "Collect your second payment", note: "The rest after we resell" },
// ];
// 
// const TRADITIONAL_TASKS = [
//   "Search for and interview agents",
//   "Negotiate commission (~5–6%)",
//   "Repairs and touch-ups",
//   "Deep clean and declutter",
//   "Stage the home",
//   "Photos and listing",
//   "Showings and open houses",
//   "Wait for offers",
//   "Negotiate with buyers",
//   "Inspection and appraisal",
//   "Buyer financing contingency",
//   "Close on the buyer’s timeline",
// ];
// 
// function BlueCheck() {
//   return (
//     <span className="mt-[2px] flex size-5 shrink-0 items-center justify-center rounded-full bg-[#0042e6]">
//       <svg width="10" height="8" viewBox="0 0 10 8" fill="none" aria-hidden>
//         <path
//           d="M1 4l2.5 2.5L9 1"
//           stroke="white"
//           strokeWidth="1.8"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         />
//       </svg>
//     </span>
//   );
// }
// 
// export function ChecklistVariant() {
//   return (
//     <div className="mx-auto flex w-full max-w-[1000px] flex-col items-center">
//       <div className="grid w-full gap-4 lg:grid-cols-2 lg:gap-6">
//         {/* Opendoor card */}
//         <div className="variant-rise relative flex flex-col overflow-hidden rounded-3xl bg-white p-6 shadow-[0px_0px_0px_1px_rgba(0,66,230,0.22),0px_24px_40px_-24px_rgba(0,66,230,0.28)] sm:p-8">
//           <div className="flex flex-wrap items-center justify-between gap-2">
//             <p className="text-[18px] font-medium tracking-[-0.9px] text-[#25201d]">
//               Selling with Opendoor
//             </p>
//             <span className="rounded-full bg-[rgba(0,66,230,0.1)] px-3 py-1 text-[13px] font-medium tracking-[-0.65px] text-[#0042e6]">
//               5 steps · ≈3 weeks
//             </span>
//           </div>
// 
//           <ul className="mt-6 flex flex-1 flex-col gap-4 lg:justify-center lg:gap-7">
//             {OPENDOOR_TASKS.map((task, i) => (
//               <li
//                 key={task.title}
//                 className="variant-rise flex items-start gap-3"
//                 style={{ animationDelay: `${120 + i * 60}ms` }}
//               >
//                 <BlueCheck />
//                 <div className="min-w-0">
//                   <p className="text-[16px] font-normal leading-[20px] tracking-[-0.8px] text-[#25201d]">
//                     {task.title}
//                   </p>
//                   <p className="text-[13px] font-normal leading-[18px] tracking-[-0.6px] text-[rgba(37,32,29,0.55)]">
//                     {task.note}
//                   </p>
//                 </div>
//               </li>
//             ))}
//           </ul>
// 
//           <p className="mt-6 border-t border-[rgba(0,66,230,0.14)] pt-4 text-[14px] font-medium tracking-[-0.7px] text-[#0042e6]">
//             That’s the whole list.
//           </p>
//         </div>
// 
//         {/* Traditional card */}
//         <div
//           className="variant-rise relative flex flex-col overflow-hidden rounded-3xl bg-[rgba(208,195,188,0.22)] p-6 shadow-[0px_0px_0px_1px_rgba(88,64,50,0.14)] sm:p-8"
//           style={{ animationDelay: "90ms" }}
//         >
//           <div className="flex flex-wrap items-center justify-between gap-2">
//             <p className="text-[18px] font-medium tracking-[-0.9px] text-[#25201d]">
//               Selling the traditional way
//             </p>
//             <span className="rounded-full bg-[rgba(37,32,29,0.08)] px-3 py-1 text-[13px] font-medium tracking-[-0.65px] text-[rgba(37,32,29,0.65)]">
//               12+ tasks · ≈2–3 months
//             </span>
//           </div>
// 
//           <ul className="mt-6 flex flex-1 flex-col gap-[13px]">
//             {TRADITIONAL_TASKS.map((task, i) => (
//               <li
//                 key={task}
//                 className="variant-rise flex items-center gap-3"
//                 style={{ animationDelay: `${180 + i * 45}ms` }}
//               >
//                 <span className="flex size-5 shrink-0 items-center justify-center rounded-full border border-[rgba(37,32,29,0.28)] text-[10px] font-medium text-[rgba(37,32,29,0.55)]">
//                   {i + 1}
//                 </span>
//                 <p className="text-[15px] font-normal leading-[18px] tracking-[-0.75px] text-[rgba(37,32,29,0.75)]">
//                   {task}
//                 </p>
//               </li>
//             ))}
//           </ul>
// 
//           <p className="mt-6 border-t border-[rgba(88,64,50,0.14)] pt-4 text-[14px] font-medium tracking-[-0.7px] text-[rgba(37,32,29,0.6)]">
//             …and any one of them can fall through.
//           </p>
//         </div>
//       </div>
// 
//       <p
//         className="variant-rise mt-8 max-w-[560px] text-center text-[16px] font-normal leading-[24px] tracking-[-0.8px] text-[rgba(37,32,29,0.6)]"
//         style={{ animationDelay: "300ms" }}
//       >
//         Same house, same sale — a fraction of the to-do list.
//       </p>
//     </div>
//   );
// }
