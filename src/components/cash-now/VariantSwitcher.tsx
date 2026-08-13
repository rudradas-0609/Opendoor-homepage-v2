// "use client";
// 
// import {
//   useEffect,
//   useRef,
//   useState,
//   type KeyboardEvent,
// } from "react";
// 
// export type VariantId = "timeline" | "checklist" | "time" | "process" | "effort";
// 
// export const VARIANT_OPTIONS: { id: VariantId; label: string }[] = [
//   { id: "timeline", label: "Timeline" },
//   { id: "checklist", label: "Checklist" },
//   { id: "time", label: "Time saved" },
//   { id: "process", label: "Process" },
//   { id: "effort", label: "Effort" },
// ];
// 
// export function VariantSwitcher({
//   active,
//   onChange,
// }: {
//   active: VariantId;
//   onChange: (id: VariantId) => void;
// }) {
//   const listRef = useRef<HTMLDivElement>(null);
//   const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
//   const [pill, setPill] = useState({ left: 0, width: 0, ready: false });
// 
//   const activeIndex = Math.max(
//     0,
//     VARIANT_OPTIONS.findIndex((v) => v.id === active),
//   );
// 
//   // Measure the active tab so the white pill can slide underneath it
//   useEffect(() => {
//     const measure = () => {
//       const tab = tabRefs.current[activeIndex];
//       if (!tab) return;
//       setPill({ left: tab.offsetLeft, width: tab.offsetWidth, ready: true });
//     };
//     measure();
//     const list = listRef.current;
//     if (!list) return;
//     const ro = new ResizeObserver(measure);
//     ro.observe(list);
//     return () => ro.disconnect();
//   }, [activeIndex]);
// 
//   function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
//     let next = activeIndex;
//     if (e.key === "ArrowRight") next = (activeIndex + 1) % VARIANT_OPTIONS.length;
//     else if (e.key === "ArrowLeft")
//       next = (activeIndex - 1 + VARIANT_OPTIONS.length) % VARIANT_OPTIONS.length;
//     else if (e.key === "Home") next = 0;
//     else if (e.key === "End") next = VARIANT_OPTIONS.length - 1;
//     else return;
//     e.preventDefault();
//     onChange(VARIANT_OPTIONS[next]!.id);
//     tabRefs.current[next]?.focus();
//   }
// 
//   return (
//     <div
//       ref={listRef}
//       role="tablist"
//       aria-label="Compare selling experiences"
//       aria-orientation="horizontal"
//       onKeyDown={onKeyDown}
//       className="relative flex max-w-full items-center gap-1 overflow-x-auto rounded-full bg-[rgba(88,64,50,0.08)] p-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
//     >
//       {/* Sliding active pill */}
//       <span
//         aria-hidden
//         className="absolute top-1 bottom-1 rounded-full bg-white shadow-[0px_1px_3px_rgba(37,32,29,0.14),0px_0px_0px_1px_rgba(88,64,50,0.08)] transition-[left,width,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
//         style={{
//           left: pill.left,
//           width: pill.width,
//           opacity: pill.ready ? 1 : 0,
//         }}
//       />
//       {VARIANT_OPTIONS.map((option, i) => {
//         const selected = option.id === active;
//         return (
//           <button
//             key={option.id}
//             ref={(el) => {
//               tabRefs.current[i] = el;
//             }}
//             type="button"
//             role="tab"
//             id={`cnml-tab-${option.id}`}
//             aria-selected={selected}
//             aria-controls={`cnml-panel-${option.id}`}
//             tabIndex={selected ? 0 : -1}
//             onClick={() => onChange(option.id)}
//             className={`relative z-10 shrink-0 cursor-pointer whitespace-nowrap rounded-full px-4 py-2 text-[14px] font-medium tracking-[-0.7px] transition-colors duration-200 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-[#81a2f2] ${
//               selected
//                 ? "text-[#25201d]"
//                 : "text-[rgba(37,32,29,0.55)] hover:text-[#25201d]"
//             }`}
//           >
//             {option.label}
//           </button>
//         );
//       })}
//     </div>
//   );
// }
