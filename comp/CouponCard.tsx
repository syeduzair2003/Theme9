import {
  getBaseImageUrl,
  getCurrencySymbol,
  getFinalDiscountTag,
  getRandomRating,
  splitOfferTitle,
} from "@/constants/hooks";
import { Offer } from "@/services/dataTypes";
import Image from "next/image";
import React from "react";
import RenderRating from "./RenderRating";
import OfferOutUrl from "@/components/shared/OfferOutUrl";
import OfferDuration from "./OfferDuration";
import Link from "next/link";
import OfferDetailsToggle from "./OfferDetailsToggle";
import { ShieldCheck, Zap, ArrowRight } from "lucide-react";

const CouponCard = async ({
  product,
  merchantHref,
  domain,
  merchant_name,
  merchant_logo,
  pageType,
}: any) => {
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
  const type = product?.offer_type?.name;
  const imageSrc =
    type === "product"
      ? getBaseImageUrl(domain, product?.product_image, "")
      : getBaseImageUrl(domain, merchant_logo, "");

  return (
    // 🎴 Card padding reduced from p-8 to p-5 (Sleek Compact Base)
    <div className="group relative bg-[#F5F5DC] border border-[#EADDCA] rounded-tr-[2.25rem] rounded-bl-[2.25rem] p-5 md:p-6 flex flex-col h-full transition-all duration-500 shadow-[0_6px_20px_rgba(0,0,0,0.01)] hover:border-[#800000]/30 hover:shadow-[0_20px_40px_rgba(128,0,0,0.08)] hover:-translate-y-1.5">
      
      {/* ⚡ Micro Discount Badge */}
      {finalDiscountTag && (
        <div className="absolute -top-2.5 -left-2.5 bg-gradient-to-br from-[#800000] to-[#520000] text-[#FFFDF5] text-[10px] font-black px-4 py-1.5 rounded-xl shadow-lg z-20 flex items-center gap-1.5 border border-[#FFFDF5]/10">
          <Zap size={11} className="fill-[#FFFDF5] stroke-none" />
          {finalDiscountTag}
        </div>
      )}

      <div className="flex-grow">
        {/* Top Header Row - Tightened Spacing */}
        <div className="flex justify-between items-start mb-4 pt-1">
          {/* Merchant Logo (Scaled down from w-16 h-16 to w-12 h-12) */}
          <div className="relative w-16 h-16 bg-[#F5F5DC] rounded-xl p-2 flex items-center justify-center transition-transform duration-300 group-hover:scale-105 border border-[#EADDCA]/40 shadow-sm">
            <Image
              src={imageSrc}
              alt={merchant_name}
              width={40}
              height={40}
              className="object-cover"
            />
          </div>

          {/* Meta Badges Stack */}
          <div className="flex flex-col items-end space-y-2">
            <div className="flex items-center gap-1 text-[#A52A2A] font-bold text-[8px] uppercase tracking-wider bg-[#800000]/5 px-2 py-1 rounded-full border border-[#800000]/10">
              <ShieldCheck size={11} className="stroke-[#A52A2A]" /> Verified
            </div>
            <OfferDuration endDate={product?.end_date} />
          </div>
        </div>

        {/* Title Content - Downscaled Typography */}
        <div className="space-y-2">
          {/* Font changed from text-xl to text-sm/text-base with controlled min-height */}
          <h4 className="text-sm md:text-base font-bold text-[#1A1A1A]/90 leading-snug group-hover:text-[#800000] transition-colors duration-300 line-clamp-2 min-h-[44px] tracking-tight">
            {splitOfferTitle(product?.offer_title).join(" / ")}
          </h4>

          {/* Meta Controls (Rating & Details Toggle) */}
          <div className="flex items-center justify-between w-full gap-1 pt-0.5">
            <div className="flex items-center min-w-0 shrink">
              <div className="scale-[0.75] origin-left shrink-0">
                <RenderRating rating={rating} />
              </div>
              <span className="ml-1 text-slate-500 text-[10px] font-bold whitespace-nowrap">
                ({rating})
              </span>
            </div>

            <div className="flex-none flex justify-end">
              <OfferDetailsToggle
                domain={domain}
                imageSrc={imageSrc}
                merchantHref={merchantHref}
                offer={product}
                type="anchor"
                buttonClass="text-slate-600 text-[11px] font-bold hover:text-[#800000] transition-colors tracking-wider"
              />
            </div>
          </div>
        </div>

        {/* Price Point Segment */}
        {(salePrice > 0 || originalPrice > 0) && (
          <div className="mt-3.5 flex items-baseline gap-2">
            {salePrice > 0 && (
              <span className="text-xl md:text-2xl font-black text-[#1A1A1A] tracking-tight">
                {getCurrencySymbol(product?.currency)}
                {salePrice}
              </span>
            )}
            {originalPrice > 0 && (
              <span className="text-xs text-slate-400 line-through font-medium italic">
                {getCurrencySymbol(product?.currency)}
                {originalPrice}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Action Trigger Block (Footer) */}
      <div className="mt-5 space-y-3">
        {/* Button height decreased from h-14 to h-11 & font size optimized */}
        <OfferOutUrl
          unique_id={product?.unique_id}
          outUrl={product?.url}
          merchantHref={merchantHref}
          domain={domain}
          customClass={`w-full relative h-11 flex items-center justify-center rounded-xl font-black text-[10px] uppercase tracking-[0.2em] transition-all duration-300 active:scale-[0.98] overflow-hidden group/btn ${
            product?.coupon_code
              ? "bg-transparent border-2 border-dashed border-[#800000]/30 text-[#800000] hover:bg-gradient-to-r hover:from-[#800000] hover:to-[#5D0E0E] hover:text-white hover:border-solid shadow-sm"
              : "bg-transparent border border-[#800000]/40 text-[#800000] hover:bg-gradient-to-br hover:from-[#800000] hover:to-[#4A0000] hover:text-white hover:border-transparent shadow-sm no-underline"
          }`}
        >
          {product?.coupon_code ? (
            <>
              <div className="flex items-center gap-1.5 transition-all duration-300 group-hover/btn:opacity-0 group-hover/btn:-translate-y-1.5">
                <span>Get Deal</span>
                <ArrowRight size={14} />
              </div>

              <div className="absolute inset-0 flex flex-col items-center justify-center translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300">
                <span className="text-[7px] font-black opacity-60 uppercase tracking-widest mb-0.5">
                  CODE
                </span>
                <span className="font-mono font-black text-xs tracking-[0.2em]">
                  ********
                </span>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-1.5">
              <span>
                {product?.offer_type?.name === "product"
                  ? "Buy Now"
                  : "Get Deal"}
              </span>
              <ArrowRight
                size={14}
                className="group-hover:translate-x-0.5 transition-transform"
              />
            </div>
          )}
        </OfferOutUrl>

        {/* Store Redirect Link */}
        {pageType !== "events" && (
          <Link
            href={merchantHref}
            className="no-underline block text-center group/link py-1"
          >
            <span className="text-[10px] font-black text-[#1A1A1A]/40 uppercase tracking-[0.2em] group-hover/link:text-[#1A1A1A] transition-colors relative inline-block">
              Visit{" "}
              <span className="text-[#800000]">
                {merchant_name}
              </span>{" "}
              Store
              <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-[#800000] group-hover/link:w-full transition-all duration-300 opacity-0 group-hover/link:opacity-100"></span>
            </span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default CouponCard;