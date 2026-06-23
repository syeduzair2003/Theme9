"use client";
import React, { useState, useEffect, useRef } from "react";

interface DisclaimerClientProps {
  htmlContent: string;
}

export default function DisclaimerClient({
  htmlContent,
}: DisclaimerClientProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (textRef.current) {
      const hasOverflow =
        textRef.current.scrollHeight > textRef.current.clientHeight;
      setShowButton(hasOverflow);
    }
  }, [htmlContent]);

  return (
    <div className="relative flex-1 w-full pb-4 p-6 md:p-6 rounded-[2rem] bg-black border border-[#FFFDF5]/5 hover:border-[#FFFDF5]/10 transition-all duration-500 group/disc backdrop-blur-sm">
      {/* Disclaimer Header (Badge + Icon) */}
      <div className="absolute -top-4 left-6 lg:left-8 z-20 flex items-center group/badge cursor-default">
        <div className="relative z-30 shrink-0 transform -rotate-[5deg] -translate-x-1 hover:rotate-0 transition-transform duration-300">
          <svg
            viewBox="0 0 24 24"
            className="w-10 h-10 md:w-11 md:h-11 drop-shadow-lg"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.0122 3.19302C12.3392 2.62886 13.1608 2.62886 13.4878 3.19302L21.4334 16.9032C21.7588 17.4646 21.3533 18.1667 20.7013 18.1667H3.29868C2.64672 18.1667 2.2412 17.4646 2.56658 16.9032L10.5122 3.19302H12.0122Z"
              fill="#FBBF24"
              stroke="#FBBF24"
              strokeWidth="0.5"
            />
            <rect
              x="11.5"
              y="7.5"
              width="2.5"
              height="6.5"
              rx="1.25"
              fill="white"
            />
            <circle cx="12.75" cy="16.25" r="1.25" fill="white" />
          </svg>
        </div>

        <div className="relative -ml-4 pl-6 pr-6 py-2.5 bg-[#E62E2E] rounded-full shadow-2xl border-t border-[#FFFDF5]/10 group-hover/badge:bg-[#EF4444] transition-colors overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover/badge:translate-x-full transition-transform duration-1000" />
          <span
            className="relative z-10 text-[#FFFDF5] font-black text-xs md:text-sm uppercase tracking-tight flex items-center leading-none"
            style={{
              fontFamily:
                'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
              fontStretch: "condensed",
              fontWeight: 1000,
            }}
          >
            DISCLAIMER
          </span>
        </div>
      </div>

      {/* Content Area */}
      <div className="relative z-10 pt-3 flex flex-col items-start">
        <div
          ref={textRef}
          className={`text-[11px] md:text-[12px] leading-relaxed text-[#FFFDF5]/80 group-hover/disc:text-[#FFFDF5]/50 transition-colors italic text-left ${
            isExpanded ? "line-clamp-none" : "line-clamp-2"
          }`}
          dangerouslySetInnerHTML={{
            __html: htmlContent,
          }}
        />

        {showButton && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-3 text-[10px] md:text-[11px] font-black uppercase tracking-[0.15em] text-[#FBBF24] hover:text-white transition-colors duration-300 active:scale-95 transform"
          >
            {isExpanded ? "View Less ▲" : "See More ▼"}
          </button>
        )}
      </div>
    </div>
  );
}
