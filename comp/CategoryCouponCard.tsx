import {
  getBaseImageUrl,
  getCurrencySymbol,
  getFinalDiscountTag,
  getRandomRating,
  getRandomStoreSeoTitle,
  splitOfferTitle,
} from "@/constants/hooks";
import { Offer } from "@/services/dataTypes";
import Image from "next/image";
import React from "react";
import RenderRating from "./RenderRating";
import OfferOutUrl from "@/components/shared/OfferOutUrl";
import OfferDuration from "./OfferDuration";
import OfferDetailsToggle from "./OfferDetailsToggle";
import Link from "next/link";
import SocialMediaShare from "./SocialMediaShare";
import { ShieldCheck, Zap, ArrowRight } from "lucide-react";

const CouponCard = async ({
  product,
  merchantHref,
  domain,
  merchant_name,
  merchant_logo,
  pageType,
}: any) => {
  const type = product?.offer_type?.name;
  const imageSrc =
    type === "product"
      ? getBaseImageUrl(domain, product?.product_image, "")
      : getBaseImageUrl(domain, merchant_logo, "");
  const rating = getRandomRating(product?.rating);
  const originalPrice = product?.original_price
    ? parseFloat(product?.original_price)
    : 0;
  const salePrice = product?.sale_price ? parseFloat(product?.sale_price) : 0;
  const discountPercent =
    originalPrice > 0 && salePrice > 0
      ? Math.round(((originalPrice - salePrice) / originalPrice) * 100)
      : null;
  const finalDiscountTag = getFinalDiscountTag(
    product?.offer_title || product?.offer_detail,
    discountPercent,
  );

  return (
    // 🎴 Slim Frame Wrapper - Padding downscaled from p-8 to premium p-4 md:p-5.5
    <div className="group relative bg-white/70 backdrop-blur-xl border border-[#800000]/10 rounded-2xl md:rounded-[1.75rem] p-4 md:p-5.5 flex flex-col h-full transition-all duration-500 hover:bg-white hover:border-[#800000]/20 hover:shadow-[0_16px_36px_rgba(128,0,0,0.04)] hover:-translate-y-1.5">
      
      {/* ⚡ Sleek Tight Discount Badge */}
      {finalDiscountTag && (
        <div className="absolute -top-2 -right-1.5 md:-top-2.5 md:-right-2 bg-gradient-to-br from-[#800000] to-[#520000] text-[#FFFDF5] text-[9px] md:text-[10px] font-black px-3 py-1 rounded-lg md:rounded-xl shadow-md z-20 flex items-center gap-1 border border-[#A52A2A]/10">
          <Zap size={10} className="fill-[#FFFDF5]" />
          {finalDiscountTag}
        </div>
      )}

      <div className="flex-grow">
        {/* Header Alignment Frame */}
        <div className="flex justify-between items-start mb-4 md:mb-5">
          {/* Merchant Logo Wrapper (Size dropped from w-16 to sleek w-11 md:w-13) */}
          <div className="relative w-16 h-16 md:w-20 md:h-20 bg-white rounded-xl p-2 shadow-sm flex items-center justify-center group-hover:scale-105 border border-slate-100 transition-all duration-300">
            <Image
              src={
                product?.offer_type?.name === "product" &&
                product?.product_image
                  ? getBaseImageUrl(domain, product?.product_image, "")
                  : getBaseImageUrl(domain, merchant_logo, "")
              }
              alt={merchant_name}
              width={44}
              height={44}
              className="object-cover"
            />
          </div>
          
          {/* Status Indicators Layer */}
          <div className="flex flex-col items-end space-y-2 mt-2">
            <div className="flex items-center gap-1 text-[#800000] font-black text-[8px] md:text-[9px] uppercase tracking-widest bg-[#800000]/5 px-2 py-0.5 md:py-1 rounded-full border border-[#800000]/10">
              <ShieldCheck size={10} strokeWidth={3} /> Verified
            </div>
            <div className="scale-85 md:scale-90 origin-right">
              <OfferDuration endDate={product?.end_date} />
            </div>
          </div>
        </div>

        {/* Title Segments (Typography downscaled from text-xl to modern text-sm/text-base) */}
        <div className="space-y-2">
          <h4 className="text-sm md:text-base font-bold text-[#1A1A1A] leading-snug group-hover:text-[#800000] transition-colors line-clamp-2 min-h-[40px] md:min-h-[44px] tracking-tight">
            {splitOfferTitle(product?.offer_title).join(" / ")}
          </h4>

          {/* Micro Meta Links Row */}
          <div className="flex flex-wrap items-center gap-2.5 pt-0.5">
            <div className="flex items-center scale-75 md:scale-80 origin-left shrink-0">
              <RenderRating rating={rating} />
              <span className="ml-1.5 text-[#1A1A1A]/40 text-xs font-black">
                ({rating})
              </span>
            </div>
            <OfferDetailsToggle
              domain={domain}
              imageSrc={imageSrc}
              merchantHref={merchantHref}
              offer={product}
              type="anchor"
              buttonClass="text-slate-600 font-bold text-[12px] hover:text-[#800000] transition-colors tracking-wider"
            />
          </div>
        </div>

        {/* Price Blocks Sizing Adjustment */}
        {(salePrice > 0 || originalPrice > 0) && (
          <div className="mt-4 md:mt-5 flex items-baseline gap-2">
            {salePrice > 0 && (
              <span className="text-lg md:text-xl font-black text-[#1A1A1A] tracking-tight">
                <span className="text-[#800000] text-sm md:text-base font-black mr-0.5">
                  {getCurrencySymbol(product?.currency)}
                </span>
                {salePrice}
              </span>
            )}
            {originalPrice > 0 && (
              <span className="text-[11px] md:text-xs text-[#1A1A1A]/30 line-through font-bold italic">
                {getCurrencySymbol(product?.currency)}
                {originalPrice}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Action CTA Segment (Height optimized from heavy h-14 to sleek h-11) */}
      <div className="mt-5 md:mt-6 space-y-3">
        <OfferOutUrl
          unique_id={product?.unique_id}
          outUrl={product?.url}
          merchantHref={merchantHref}
          domain={domain}
          customClass={`w-full relative h-10.5 md:h-11 flex items-center justify-center rounded-xl font-black text-[9px] md:text-[10px] uppercase tracking-[0.18em] md:tracking-[0.22em] transition-all duration-300 active:scale-95 overflow-hidden shadow-sm bg-[#1A1A1A] text-white hover:bg-[#800000] no-underline border border-transparent`}
        >
          {product?.coupon_code ? (
            <div className="flex items-center gap-2 group">
              <span className="font-black text-white transition-colors">
                Copy Code
              </span>
              <ArrowRight
                size={14}
                strokeWidth={3}
                className="text-white group-hover:translate-x-1 transition-transform"
              />
            </div>
          ) : (
            <div className="flex items-center gap-1.5 group">
              <span className="font-black text-white">
                {product?.offer_type?.name === "product"
                  ? "Buy Now"
                  : "Get Deal"}
              </span>
              <ArrowRight
                size={14}
                strokeWidth={3}
                className="text-white group-hover:translate-x-1 transition-transform"
              />
            </div>
          )}
        </OfferOutUrl>

        {/* Bottom Store Link Footprint */}
        {pageType !== "events" && (
          <Link
            href={merchantHref}
            className="no-underline block text-center group/link pt-0.5"
          >
            <span className="text-[8px] md:text-[9px] font-black text-[#1A1A1A]/40 uppercase tracking-[0.18em] group-hover/link:text-[#800000] transition-all duration-300">
              Visit Store
            </span>
            <div className="mx-auto mt-0.5 w-0 h-[1.2px] bg-[#800000]/30 group-hover/link:w-10 transition-all duration-300 rounded-full" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default CouponCard;