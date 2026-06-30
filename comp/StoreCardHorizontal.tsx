import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  discardHTMLTags,
  getBaseImageUrl,
  getMerchantHref,
  splitHeadingFromDetails,
} from "@/constants/hooks";
import cookieService from "@/services/CookiesService";
import { ArrowUpRight } from "lucide-react";

const StoreCardHorizontal = async ({
  merchant,
  mer_slug,
  mer_slug_type,
}: any) => {
  const companyDomain = await cookieService.get("domain");
  const [heading] = splitHeadingFromDetails(merchant?.details);
  const logoSrc = getBaseImageUrl(
    companyDomain.domain,
    merchant?.merchant_logo,
    "",
  );

  return (
    <Link
      href={getMerchantHref(merchant, mer_slug, mer_slug_type)}
      className="no-underline block group w-full"
    >
      {/* Premium Outer Card Base */}
      <div className="flex flex-col gap-3 p-3.5 rounded-[2.25rem] bg-[#1E1E1E] border border-[#D1C7A7]/5 hover:border-[#800000]/50 transition-all duration-300 w-full h-full relative overflow-hidden group shadow-md hover:shadow-2xl hover:shadow-black/50">
        
        {/* Crisp Solid White Logo Box - Protects logo branding on dark backgrounds */}
        <div className="relative w-full aspect-square bg-white rounded-[1.75rem] flex-shrink-0 p-4 transition-transform duration-500 overflow-hidden flex items-center justify-center shadow-inner group-hover:scale-[1.02]">
          <Image
            src={logoSrc}
            alt={merchant?.merchant_name}
            fill
            className="object-contain p-5 transition-transform duration-500 group-hover:scale-105"
            priority={false}
          />
        </div>

        {/* Info Content Area */}
        <div className="flex-1 text-center pt-1.5 pb-0.5">
          {/* High-Contrast Cream Heading */}
          <h4 className="font-bold text-[#D1C7A7] text-sm md:text-base group-hover:text-white transition-colors duration-300 line-clamp-1 mb-2">
            {discardHTMLTags(heading ? heading : merchant?.merchant_name)}
          </h4>

          {/* Micro Information Stack - 100% Blurry DropShadow Free */}
          <div className="flex flex-col items-center gap-0.5">
            <span className="text-[9px] font-bold text-[#800000] uppercase tracking-[0.22em] transition-colors duration-300">
              Verified Deal
            </span>
            <span className="text-[8px] md:text-[9px] font-bold text-slate-500 uppercase tracking-wider">
              Just updated
            </span>
          </div>
        </div>

        {/* Sleek Accent Arrow Icon */}
        <div className="absolute top-3 right-3 opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-out hidden sm:block">
          <div className="bg-[#800000] p-1.5 rounded-full border border-[#D1C7A7]/10 shadow-lg">
            <ArrowUpRight
              size={13}
              className="text-[#D1C7A7]"
            />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default StoreCardHorizontal;