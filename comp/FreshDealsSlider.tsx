"use client";
import React, { useRef, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function FreshDealsSlider({
  children,
}: {
  children: React.ReactNode;
}) {
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      scroll("right");
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const scroll = (dir: "left" | "right") => {
    if (sliderRef.current && sliderRef.current.children.length > 0) {
      const container = sliderRef.current;

      const firstChild = container.children[0] as HTMLElement;
      const cardWidth = firstChild.offsetWidth;
      const gap = window.innerWidth >= 768 ? 32 : 16;

      const cardsToScroll = window.innerWidth >= 768 ? 2 : 1;
      const scrollAmount = (cardWidth + gap) * cardsToScroll;

      if (
        dir === "right" &&
        container.scrollLeft + container.clientWidth >=
          container.scrollWidth - 10
      ) {
        container.scrollTo({ left: 0, behavior: "smooth" });
        return;
      }

      container.scrollBy({
        left: dir === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="w-full relative overflow-hidden bg-transparent p-1 md:p-2">
      <div className="relative z-10">
        {/* Header Section */}
        <div className="mb-4 text-center md:text-left">
          <h3 className="text-2xl md:text-3xl font-black text-[#D1C7A7] italic uppercase tracking-tighter leading-none md:pl-2">
            Fresh <span className="text-[#800000]">Deals</span>
          </h3>
          <div className="flex items-center justify-center md:justify-start gap-3 mt-2 md:pl-2">
            <span className="h-[1.5px] w-5 bg-[#800000]"></span>
            <p className="text-slate-500 font-bold text-[9px] uppercase tracking-[0.2em]">
              Swipe to explore premium stores
            </p>
          </div>
        </div>

        {/* MAIN SLIDER AREA */}
        <div className="relative flex items-center justify-center group/slider mt-2">
          <button
            onClick={() => scroll("left")}
            className="absolute left-[-12px] top-1/2 -translate-y-1/2 z-40 p-3 rounded-full bg-[#1A1A1A]/90 text-[#D1C7A7] border border-[#D1C7A7]/10 opacity-0 group-hover/slider:opacity-100 group-hover/slider:translate-x-4 hover:bg-[#800000] hover:text-white transition-all duration-300 hidden md:flex items-center justify-center shadow-xl cursor-pointer"
          >
            <ArrowLeft size={18} className="stroke-[2.5px]" />
          </button>

          <button
            onClick={() => scroll("right")}
            className="absolute right-[-12px] top-1/2 -translate-y-1/2 z-40 p-3 rounded-full bg-[#1A1A1A]/90 text-[#D1C7A7] border border-[#D1C7A7]/10 opacity-0 group-hover/slider:opacity-100 group-hover/slider:-translate-x-4 hover:bg-[#800000] hover:text-white transition-all duration-300 hidden md:flex items-center justify-center shadow-xl cursor-pointer"
          >
            <ArrowRight size={18} className="stroke-[2.5px]" />
          </button>

          {/* Slider Content Viewport */}
          <div className="w-full overflow-hidden">
            <div
              ref={sliderRef}
              className="flex gap-4 md:gap-8 overflow-x-auto scroll-smooth no-scrollbar py-3 snap-x snap-mandatory items-center justify-start"
            >
              {React.Children.map(children, (child) => (
                <div className="flex-shrink-0 snap-start w-[calc(100%-16px)] md:w-[calc(50%-16px)]">
                  {child}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Navigation Controls */}
        <div className="md:hidden flex justify-center gap-10 mt-2">
          <button
            onClick={() => scroll("left")}
            className="p-2 text-slate-500 active:text-[#800000] transition-colors"
          >
            <ArrowLeft size={20} className="stroke-[2.5px]" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="p-2 text-slate-500 active:text-[#800000] transition-colors"
          >
            <ArrowRight size={20} className="stroke-[2.5px]" />
          </button>
        </div>

        {/* View All Button */}
        <div className="flex justify-center mt-6">
          <Link
            href="/all-stores/A"
            className="group relative inline-flex items-center justify-center px-6 py-2.5 overflow-hidden rounded-xl bg-[#1A1A1A] border border-[#D1C7A7]/10 transition-all hover:border-[#800000]/60 shadow-md no-underline"
          >
            <span className="relative z-10 text-[10px] font-black uppercase tracking-[0.18em] text-[#D1C7A7]/70 group-hover:text-white transition-colors">
              View All Deals
            </span>
            <div className="absolute inset-0 bg-[#800000] translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300" />
          </Link>
        </div>
      </div>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
