"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface SlideItem {
  image: string;
  link: string | null;
}

interface BannerClientProps {
  merchants: any[];
  slides: SlideItem[];
}

export default function BannerClient({ merchants, slides }: BannerClientProps) {
  const [bubbles, setBubbles] = useState<any[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto Slider Timer
  useEffect(() => {
    if (!slides || slides.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(timer);
  }, [slides]);

  // Merchant Bubbles Logic
  useEffect(() => {
    if (merchants && merchants.length > 0) {
      const selected = merchants.slice(0, 8).map((m, i) => ({
        name: m.merchant_name,
        logo: m.merchant_logo,
        left: `${i * 12 + 5}%`,
        delay: i * 2,
        duration: 10 + Math.random() * 5,
      }));
      setBubbles(selected);
    }
  }, [merchants]);

  const activeSlide = slides[currentSlide];

  return (
    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[0.9fr,1.4fr] gap-10 items-center px-6 max-w-7xl mx-auto w-full text-center lg:text-left">
      {/* Left Side: Text Content & Buttons */}
      <div className="flex flex-col items-center lg:items-start lg:pr-4 order-2 lg:order-1">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 leading-tight tracking-tighter text-[#1A1A1A]"
        >
          The future of <br />
          <span className="text-[#800000]">smart savings.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-base text-[#0D0D0D]/60 mb-8 max-w-md leading-relaxed font-medium italic"
        >
          Discover elite coupon codes and deals from 15,000+ brands. Verified
          daily. Saved instantly.
        </motion.p>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-4 sm:px-0">
          <Link
            href="/#recent-deals-section"
            className="w-full sm:w-auto px-8 py-4 bg-[#800000] text-[#FFFDF5] rounded-full font-black text-[10px] uppercase tracking-[0.2em] hover:scale-105 transition-all shadow-lg active:scale-95 text-center no-underline"
          >
            Recent Deals
          </Link>
          <Link
            href={"/category"}
            className="w-full no-underline sm:w-auto px-8 py-4 bg-[#0D0D0D] text-[#FFFDF5] rounded-full font-black text-[10px] uppercase tracking-[0.2em] hover:bg-transparent hover:text-[#0D0D0D] border border-[#0D0D0D] transition-all active:scale-95 text-center"
          >
            Categories
          </Link>
        </div>
      </div>

      {/* Right Side: Dynamic Cross-fading Slider */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative w-full aspect-video lg:aspect-[16/9] z-10 order-1 lg:order-2"
      >
        <div className="absolute inset-0 bg-[#800000]/5 rounded-[2.5rem] -rotate-2 translate-x-3 translate-y-2"></div>

        <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden border border-[#D1C7A7] shadow-2xl bg-white">
          <AnimatePresence>
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="absolute inset-0 h-full w-full"
            >
              {activeSlide?.link ? (
                <Link
                  href={activeSlide.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full h-full relative cursor-pointer"
                >
                  <Image
                    src={activeSlide.image}
                    fill
                    className="object-fit"
                    alt={`Dynamic Slider Item ${currentSlide}`}
                    priority
                    unoptimized
                  />
                </Link>
              ) : (
                activeSlide?.image && (
                  <Image
                    src={activeSlide.image}
                    fill
                    className="object-fill"
                    alt={`Slider Item ${currentSlide}`}
                    priority
                    unoptimized
                  />
                )
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
            </motion.div>
          </AnimatePresence>

          {/* Pagination Dots */}
          {slides.length > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
              {slides.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1.5 transition-all duration-300 rounded-full ${
                    idx === currentSlide
                      ? "w-6 bg-[#800000]"
                      : "w-1.5 bg-white/50"
                  }`}
                />
              ))}
            </div>
          )}

          {/* Live Badge */}
          <div className="absolute top-6 left-6 z-20 inline-flex items-center gap-2 bg-black/30 backdrop-blur-md border border-white/20 rounded-full px-4 py-1.5">
            <span className="flex h-2 w-2 rounded-full bg-[#800000] animate-pulse"></span>
            <span className="text-[9px] font-black text-white uppercase tracking-[0.2em]">
              Live Premium Discounts
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
