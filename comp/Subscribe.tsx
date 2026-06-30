import React from "react";
import { ArrowRight, Mail } from "lucide-react";
import StoreCardHorizontal from "./StoreCardHorizontal";
import { apiRecentlyUpdatedStores } from "@/apis/user";
import cookieService from "@/services/CookiesService";
import FreshDealsSlider from "./FreshDealsSlider";

interface Props {
  slug_type: string;
  store_slug: string;
}

const Subscribe = async ({ store_slug, slug_type }: Props) => {
  const companyDomain = (await cookieService.get("domain")).domain;
  const promoMerchants = (await apiRecentlyUpdatedStores(companyDomain)).data;

  return (
    <section className="relative w-full py-16 md:py-20 overflow-hidden bg-[#1A1A1A] min-h-fit lg:h-auto flex items-center border-b border-[#D1C7A7]/5">
      {/* Premium Background Glows */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#800000]/15 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-[#D1C7A7]/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
        
        {/* Left Side Subscribe Content */}
        <div className="w-full lg:w-5/12 text-left space-y-6">
          <div className="space-y-3">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#D1C7A7] tracking-tighter leading-[0.95] uppercase">
              Never miss <br />
              <span className="text-[#800000]">a deal.</span>
            </h2>
            <div className="h-1.5 w-16 bg-[#800000] rounded-full" />
          </div>

          <p className="text-slate-400 text-sm md:text-base max-w-sm leading-relaxed">
            Get the world&apos;s best coupon codes and elite deals delivered straight
            to your inbox daily.
          </p>

          <form className="relative flex flex-col gap-3.5 w-full max-w-sm group">
            <div className="relative">
              <Mail
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#800000] transition-colors"
                size={18}
              />
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full h-[52px] bg-[#222222] border border-[#333333] focus:border-[#800000]/60 text-white pl-11 pr-4 rounded-xl outline-none transition-all text-sm tracking-wide placeholder:text-slate-600"
              />
            </div>

            {/* Premium High-Conversion Orange Button with White Text */}
            <button className="w-full h-[52px] rounded-xl bg-[#800000] text-white font-black uppercase tracking-widest hover:bg-[#800000]/80 active:scale-[0.99] transition-all flex items-center justify-center gap-2.5 text-xs shadow-lg shadow-[#FF5A00]/10">
              Subscribe Now
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </button>

            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest text-center mt-1">
              No spam. Just pure savings.
            </p>
          </form>
        </div>

        {/* Right Side Slider Section */}
        <div className="w-full lg:w-7/12 relative transform lg:scale-95 origin-right">
          {promoMerchants?.length > 0 && (
            <div className="relative p-4 rounded-[2.5rem] bg-[#151515] border border-[#D1C7A7]/10 shadow-2xl shadow-black/40 overflow-hidden">
              {/* Inner Decorative Subtle Line Accent */}
              <div className="absolute top-0 left-0 w-full h-[1.5px] bg-gradient-to-r from-transparent via-[#800000]/30 to-transparent" />
              
              <FreshDealsSlider>
                {promoMerchants.map((merchant: any, i: number) => (
                  <div key={i} className="px-2">
                    <StoreCardHorizontal
                      merchant={merchant}
                      mer_slug={store_slug}
                      mer_slug_type={slug_type}
                    />
                  </div>
                ))}
              </FreshDealsSlider>
            </div>
          )}

          {/* Premium Theme Badge */}
          <div className="absolute -top-4 -right-2 z-30 scale-90 md:scale-100">
            <div className="relative group/badge overflow-hidden bg-[#800000] text-[#D1C7A7] text-[9px] font-black px-4 py-2 rounded-full rotate-6 shadow-xl border border-[#D1C7A7]/20 uppercase tracking-[0.12em] flex items-center gap-2 transition-all hover:rotate-0 hover:scale-105 duration-300 cursor-default">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover/badge:translate-x-full transition-transform duration-1000" />

              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D1C7A7] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#D1C7A7]"></span>
              </span>
              <span>Recently Updated</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Subscribe;