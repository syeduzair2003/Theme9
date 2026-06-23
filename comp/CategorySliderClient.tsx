"use client";
import React, { useState, useEffect, useRef } from "react";

interface SliderProps {
  children: React.ReactNode[];
}

export default function CategorySliderClient({ children }: SliderProps) {
  const [visibleCards, setVisibleCards] = useState(6);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const totalItems = children.length;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setVisibleCards(2);
      else if (window.innerWidth < 768) setVisibleCards(3);
      else if (window.innerWidth < 1024) setVisibleCards(4);
      else if (window.innerWidth < 1280) setVisibleCards(5);
      else setVisibleCards(6);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (totalItems <= visibleCards) return;

    const nextSlide = () => {
      setIsTransitioning(true);
      setCurrentIndex((prev) => prev + 1);
    };

    timeoutRef.current = setTimeout(nextSlide, 3500);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [currentIndex, totalItems, visibleCards]);

  const handleTransitionEnd = () => {
    if (currentIndex >= totalItems) {
      setIsTransitioning(false); 
      setCurrentIndex(0);        
    }
  };

  const extendedChildren = [
    ...children,
    ...children.slice(0, visibleCards)
  ];

  const totalPages = Math.ceil(totalItems / visibleCards);
  const currentActivePage = Math.floor((currentIndex % totalItems) / visibleCards) % totalPages;

  return (
    <div className="w-full relative px-2 py-4">
      
      {/* Slider Window */}
      <div className="overflow-hidden w-full">
        <div
          className="flex"
          style={{
            transform: `translateX(-${currentIndex * (100 / visibleCards)}%)`,
            transition: isTransitioning ? "transform 750ms cubic-bezier(0.4, 0, 0.2, 1)" : "none",
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {extendedChildren.map((child, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 px-2 md:px-3"
              style={{ width: `${100 / visibleCards}%` }}
            >
              {child}
            </div>
          ))}
        </div>
      </div>

      {/* 🔧 298c1e.png Style: Dynamic Scaling Fading Dots */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-10 h-4">
          {Array.from({ length: totalPages }).map((_, pageIdx) => {
            // Calculate distance from active page
            const distance = Math.abs(pageIdx - currentActivePage);
            
            let sizeAndColor = "w-1 h-1 bg-[#D1C7BD]"; // Default: Outer tiny dot
            
            if (distance === 0) {
              sizeAndColor = "w-3 h-3 bg-[#800000]"; // Center: Active large maroon dot
            } else if (distance === 1) {
              sizeAndColor = "w-2 h-2 bg-[#BDB3A6]"; // Flanking: Medium neutral dot
            }

            return (
              <button
                key={pageIdx}
                onClick={() => {
                  setIsTransitioning(true);
                  setCurrentIndex(pageIdx * visibleCards);
                }}
                className={`rounded-full transition-all duration-300 ease-in-out ${sizeAndColor}`}
                aria-label={`Go to page ${pageIdx + 1}`}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}