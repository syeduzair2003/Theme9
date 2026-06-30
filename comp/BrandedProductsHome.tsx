import { apiHomeBrandedProducts } from "@/apis/user";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  discardHTMLTags,
  getBaseImageUrl,
  getCurrencySymbol,
  getFinalDiscountTag,
  getRandomStoreSeoTitle,
} from "@/constants/hooks";
import OfferOutUrl from "@/components/shared/OfferOutUrl";
import cookieService from "@/services/CookiesService";
import OfferDetailsToggle from "./OfferDetailsToggle";
import {
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  Tag,
  ExternalLink,
} from "lucide-react";

interface Props {
  companyId: string;
  mer_slug: string;
  mer_slug_type: string;
}

const BrandedProductsHome = async ({
  companyId,
  mer_slug,
  mer_slug_type,
}: Props) => {
  const products = await apiHomeBrandedProducts(companyId).then(
    (res) => res.data,
  );
  const companyDomain = await cookieService.get("domain");
  const domain = companyDomain.domain;

  if (!products?.products?.length) return null;

  const displayProducts = products.products.slice(0, 8);

  const cleanStoreName = (slug: string) => {
    if (!slug || slug.toLowerCase() === "store") return null;
    let name = slug.replace(/\.(com|net|org|biz|co|uk|us)/gi, "");
    name = name.replace(/[-_]/g, " ");
    return name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const defaultMerchantName = cleanStoreName(mer_slug) || "Amazon";

  return (
    <section className="bg-[#fffde0] py-14 px-6 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-[#800000]/10 via-[#800000]/60 via-[#800000]/10 to-transparent opacity-100" />

      {/* Divider Line */}
      <div className="absolute -top-[60px] -right-[60px] w-[200px] h-[200px] rounded-full bg-[radial-gradient(circle,rgba(128,0,0,0.03)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute -bottom-[40px] -left-[40px] w-[160px] h-[160px] rounded-full bg-[radial-gradient(circle,rgba(0,0,0,0.02)_0%,transparent_70%)] pointer-events-none" />

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div className="flex flex-col gap-1.5">
            <span className="inline-flex items-center gap-1.5 bg-black text-[#EADDCA] text-[11px] font-black uppercase tracking-widest px-3.5 py-1.5 rounded-full w-fit shadow-sm border border-[#800000]/20">
              <span className="inline-flex items-center justify-center w-3 h-3 text-[#800000]">
                ⚡
              </span>
              Trending Now
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-[#1A1A1A] leading-tight m-0 tracking-tight">
              Brand{" "}
              <span className="font-black text-[#800000] leading-tight m-0 tracking-tight">
                Spotlight
              </span>
            </h2>
            <p className="text-[#1A1A1A]/60 text-sm md:text-base leading-relaxed max-w-3xl font-medium">
              Handpicked products from top brands at unbeatable prices
            </p>
          </div>
          <div className="hidden md:flex items-center">
            <Link
              href="/products"
              className="no-underline group relative overflow-hidden inline-flex items-center justify-center gap-3 rounded-full bg-[#FFFDF5] min-w-[160px] px-8 py-3.5 text-[11px] font-black text-[#1A1A1A] border border-[#EADDCA] shadow-[0_4px_12px_rgba(128,0,0,0.05)] transition-all duration-500 hover:border-[#800000] hover:text-[#FFFDF5] uppercase tracking-widest whitespace-nowrap lg:mb-2"
              target="_blank"
            >
              <span className="absolute inset-0 translate-y-full bg-gradient-to-r from-[#800000] to-[#520000] transition-transform duration-500 ease-out group-hover:translate-y-0" />
              <span className="relative z-10 flex items-center justify-center gap-2 w-full">
                View all
                <ArrowRight
                  size={14}
                  className="stroke-[3px] transition-all duration-500 group-hover:translate-x-1.5 group-hover:scale-110"
                />
              </span>
            </Link>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {displayProducts.map((item: any, index: number) => {
            const product = item as any;
            const parentProducts = products as any;

            const type = product?.offer_type?.name;
            const merchantLogo =
              product?.merchant_logo || product?.merchant?.logo || "";
            const merchantSlug =
              product?.merchant_slug ||
              product?.merchant?.slug ||
              product?.merchant_meta?.slug ||
              "";

            const merchantHref = merchantSlug
              ? `/stores/${merchantSlug}`
              : "/products";

            const rawName =
              (product as any)?.merchant_name ||
              (product as any)?.store_name ||
              (product as any)?.merchant?.name ||
              (parentProducts as any)?.merchant_name ||
              "";

            let merchantName = defaultMerchantName;
            if (rawName && rawName.toLowerCase() !== "store") {
              merchantName = rawName;
            } else if (merchantSlug) {
              merchantName =
                cleanStoreName(merchantSlug) || defaultMerchantName;
            }

            const imageSrc =
              type === "product"
                ? getBaseImageUrl(domain, product?.product_image, "")
                : getBaseImageUrl(domain, merchantLogo, "");

            const originalPrice = product?.original_price
              ? parseFloat(product?.original_price)
              : 0;
            const salePrice = product?.sale_price
              ? parseFloat(product?.sale_price)
              : 0;
            const discountPercent =
              originalPrice > 0 && salePrice > 0
                ? Math.round(
                    ((originalPrice - salePrice) / originalPrice) * 100,
                  )
                : null;
            const finalDiscountTag = getFinalDiscountTag(
              product?.offer_title || product?.offer_detail,
              discountPercent,
            );

            return (
              <div
                key={product.id || index}
                className="group relative bg-white rounded-xl border border-[#EADDCA] flex flex-col h-full transition-all duration-300 hover:shadow-lg hover:border-[#800000]/30 overflow-hidden text-center p-4"
              >
                <div className="absolute top-2 left-2 right-2 z-20 flex justify-between items-start pointer-events-none">
                  {finalDiscountTag && (
                    <div className="bg-[#800000] text-white text-[9px] font-black px-2 py-0.5 rounded shadow-sm uppercase tracking-wider flex items-center">
                      <Sparkles
                        size={10}
                        fill="white"
                        className="inline mr-1"
                      />
                      {finalDiscountTag}
                    </div>
                  )}

                  {product?.coupon_code && (
                    <div className="bg-[#1A1A1A] text-white p-1 rounded shadow-sm ml-auto">
                      <Tag size={10} />
                    </div>
                  )}
                </div>

                {/* Image Layout */}
                <div className="relative w-24 h-24 mx-auto mt-4 flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
                  <Image
                    src={imageSrc}
                    alt={getRandomStoreSeoTitle(merchantName)}
                    fill
                    className="object-contain p-1"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    unoptimized
                    priority={index < 4}
                  />
                </div>

                <div className="w-full h-[1px] bg-[#EADDCA]/80 my-3" />

                {/* Content Body */}
                <div className="flex flex-col flex-grow">
                  <div className="flex flex-col items-center mb-1">
                    <Link
                      href={merchantHref}
                      className="text-[9px] font-bold text-slate-600 hover:text-[#800000] uppercase tracking-widest transition-colors"
                    >
                      {merchantName}
                    </Link>
                  </div>

                  <h5 className="text-[13px] font-bold text-[#1A1A1A] leading-tight mb-2 line-clamp-2 min-h-[32px]">
                    {discardHTMLTags(product?.offer_title)}
                  </h5>

                  <div className="flex items-center justify-center gap-1 text-[11px] font-bold text-slate-400 mb-3">
                    <OfferDetailsToggle
                      domain={domain}
                      imageSrc={imageSrc}
                      merchantHref={merchantHref}
                      offer={product as any}
                      type="anchor"
                      buttonClass="text-slate-600 font-semibold hover:text-[#800000] transition underline text-[12px]"
                    />
                  </div>

                  <div className="mt-auto mb-3">
                    {type === "product" ? (
                      <div className="flex items-center justify-center gap-2">
                        {product?.sale_price && salePrice > 0 && (
                          <span className="text-xl font-black text-[#1A1A1A] tracking-tighter">
                            {getCurrencySymbol(product?.currency)}
                            {product?.sale_price}
                          </span>
                        )}

                        {product?.original_price &&
                          originalPrice > 0 &&
                          salePrice > 0 && (
                            <span className="text-[10px] text-slate-400 line-through decoration-[#800000]/20">
                              {getCurrencySymbol(product?.currency)}
                              {product?.original_price}
                            </span>
                          )}
                      </div>
                    ) : (
                      <div className="inline-flex items-center justify-center gap-1 text-[#800000] font-bold text-[9px] bg-[#FDFBE7] px-2 py-0.5 rounded border border-[#800000]/10 mx-auto">
                        <Sparkles size={9} fill="#800000" />
                        VERIFIED
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="relative group/btn w-full">
                    {product?.coupon_code ? (
                      <OfferOutUrl
                        unique_id={product?.unique_id}
                        outUrl={product?.url}
                        merchantHref={merchantHref}
                        domain={domain}
                        customClass="no-underline w-full bg-[#1A1A1A] !text-white py-2.5 rounded-lg font-bold text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#800000] transition-all duration-300"
                      >
                        <span className="!text-white">Copy Code</span>
                        <ArrowUpRight size={12} className="!text-white" />
                      </OfferOutUrl>
                    ) : (
                      <OfferOutUrl
                        unique_id={product?.unique_id}
                        outUrl={product?.url}
                        merchantHref={merchantHref}
                        domain={domain}
                        customClass="no-underline w-full bg-[#800000] !text-white py-2.5 rounded-lg font-bold text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#1A1A1A] transition-all duration-300 shadow-sm"
                      >
                        <span className="!text-white">
                          {type === "product" ? "Buy Now" : "Get Deal"}
                        </span>
                        <ExternalLink size={12} className="!text-white" />
                      </OfferOutUrl>
                    )}
                  </div>

                  <p className="mt-3 text-[9px] font-bold text-slate-600 uppercase tracking-tighter m-0">
                    Verified {merchantName} Deals
                  </p>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#800000] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              </div>
            );
          })}
        </div>

        {/* Mobile View-All */}
        <div className="text-center mt-7 md:hidden">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-white font-black text-[0.9rem] no-underline px-7 py-3 bg-black rounded-full shadow-md transition-all hover:-translate-y-0.5 hover:text-[#800000]"
          >
            <span>Browse All Products</span>
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BrandedProductsHome;
