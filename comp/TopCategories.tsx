import React from "react";
import Link from "next/link";
import Image from "next/image"; 
import { getBaseImageUrl } from "@/constants/hooks";
import cookieService from "@/services/CookiesService";
import { CategoryData } from "@/services/dataTypes";
import { ChevronRight } from "lucide-react";

interface Props {
  category: CategoryData;
}

const TopCategories = async ({ category }: Props) => {
  const companyDomain = await cookieService.get("domain");
  const domain = companyDomain?.domain;

  const imageSrc = category?.category_image
    ? getBaseImageUrl(domain, category.category_image, "")
    : "https://images.unsplash.com/photo-1445205170230-053b830c6050?w=300&q=80";

  return (
    <Link
      href={`/${category?.url}`}
      className="no-underline group relative flex flex-col items-center w-full max-w-[160px] mx-auto transition-all duration-300 transform hover:-translate-y-1"
    >
      {/* Decorative Backdrop Layer for 3D Effect on Hover */}
      <div className="absolute inset-x-4 top-2 bottom-12 bg-[#800000]/5 rounded-[2rem] opacity-0 group-hover:opacity-100 group-hover:scale-105 group-hover:rotate-3 transition-all duration-500 -z-10" />

      {/* Image Container */}
      <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-[2rem] overflow-hidden bg-white border border-[#EADDCA]/40 shadow-[0_4px_12px_rgba(0,0,0,0.03)] group-hover:shadow-[0_12px_24px_rgba(128,0,0,0.1)] group-hover:border-[#800000]/20 transition-all duration-500 mb-3 flex items-center justify-center p-5">
        <Image
          src={imageSrc}
          alt={category?.name || "Category"}
          width={112}
          height={112}
          className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
      </div>

      {/* Text & Badge Layout */}
      <div className="text-center w-full px-2 flex flex-col items-center">
        <h4 className="text-xs md:text-sm font-black text-[#1A1A1A] group-hover:text-[#800000] transition-colors duration-300 line-clamp-1 mb-1.5 tracking-tight">
          {category?.name}
        </h4>

        {/* 🔧 Premium Dynamic Deal Badge (No more fake hardcoded 12) */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#800000]/5 group-hover:bg-[#800000] rounded-full border border-[#800000]/10 group-hover:border-[#800000] transition-all duration-300 shadow-sm">
          <span className="text-[9px] font-black text-[#800000] group-hover:text-white uppercase tracking-wider transition-colors duration-300">
            {category?.total_offers && parseInt(category.total_offers.toString()) > 0 
              ? `${category.total_offers} Deals` 
              : "View Deals"}
          </span>
          <ChevronRight
            size={10}
            className="text-[#800000]/60 group-hover:text-white transition-transform duration-300 group-hover:translate-x-0.5"
          />
        </div>
      </div>
    </Link>
  );
};

export default TopCategories;