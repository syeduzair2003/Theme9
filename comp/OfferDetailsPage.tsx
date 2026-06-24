import {
  apiGetCategoryProductsOffer,
  apiGetProductDetails,
  apiGetCategoryProducts,
} from "@/apis/user";
import OfferOutUrl from "@/components/shared/OfferOutUrl";
import {
  calculateDiscountPercent,
  discardHTMLTags,
  getBaseImageUrl,
  getCurrencySymbol,
  getFinalDiscountTag,
  getMerchantHref,
  getProductDetailHref,
  getProductMerchantHref,
  getRandomRating,
  splitHeadingFromDetails,
} from "@/constants/hooks";
import {
  faGreaterThan,
  FontAwesomeIcon,
  faArrowRight,
} from "@/constants/icons";
import cookieService from "@/services/CookiesService";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import RenderRating from "./RenderRating";
import RateUs from "./RateUs";
import SpecificProductSchema from "@/components/shared/SchemaScripts/SpecificProductSchema";
import EventOfferCard from "./EventOfferCard";
import { apiGetMerchantUniqueId } from "@/apis/merchant";

interface Props {
  company_id: string;
  store_slug: string;
  slug_type: string;
  product_id: string;
  current_merchant_slug: string;
  categorySlug: string;
}

const OfferDetailsPage = async ({
  company_id,
  store_slug,
  slug_type,
  product_id,
  current_merchant_slug,
  categorySlug,
}: Props) => {
  const domainData = await cookieService.get("domain");
  const companyDomain = domainData?.domain;

  const [response, catRes, merRes, cat] = await Promise.all([
    apiGetProductDetails(company_id, product_id, current_merchant_slug).then(
      (res) => res.data,
    ),
    apiGetCategoryProductsOffer(
      company_id,
      current_merchant_slug,
      categorySlug,
    ).then((res) => res.data),
    apiGetMerchantUniqueId(current_merchant_slug, company_id).then(
      (res) => res.data,
    ),
    apiGetCategoryProducts(company_id, current_merchant_slug).then(
      (res) => res.data,
    ),
  ]);

  const similarCategory = catRes?.filter(
    (item) => item.unique_id !== response?.unique_id,
  );

  if (response == null) return notFound();

  const cleanProductTitle = discardHTMLTags(response?.offer_title || "");

  return (
    <>
      <section className="bg-white border-b border-[#800000]/5 pt-[104px] md:pt-[128px] pb-8 px-4 lg:px-20">
        <div className="container mx-auto">
          <nav aria-label="Breadcrumb" className="flex flex-col gap-3">
            {/* Upper Track Route List */}
            <ol className="flex flex-wrap items-center gap-4 text-[10px] font-black uppercase tracking-[0.3em]">
              <li className="flex items-center gap-3">
                <Link
                  href="/"
                  className="text-slate-400 hover:text-[#800000] transition-all"
                >
                  Home
                </Link>
                <div className="w-1.5 h-1.5 rounded-full bg-[#800000]"></div>
              </li>

              <li className="flex items-center gap-3">
                <Link
                  href="/products"
                  className="text-slate-400 hover:text-[#800000] transition-all"
                >
                  Products
                </Link>
                <div className="w-1.5 h-1.5 rounded-full bg-[#800000]"></div>
              </li>

              <li className="flex items-center gap-3">
                <Link
                  href={getProductMerchantHref(response?.merchant, slug_type)}
                  className="text-slate-400 hover:text-[#800000] transition-all"
                >
                  {response?.merchant?.merchant_name}
                </Link>
                <div className="w-1.5 h-1.5 rounded-full bg-[#800000]"></div>
              </li>

              {categorySlug && (
                <li className="flex items-center gap-3">
                  <Link
                    href={`/products/${response?.merchant?.slug}/${categorySlug}`}
                    className="text-slate-400 hover:text-[#800000] transition-all"
                  >
                    {categorySlug.replace(/-/g, " ")}
                  </Link>
                  <span className="text-[#800000] font-black text-xl select-none">
                    •
                  </span>
                </li>
              )}
            </ol>
            <h2 className="text-[10px] font-black text-[#800000] uppercase tracking-[0.2em] mt-1 max-w-4xl line-clamp-1">
              {cleanProductTitle}
            </h2>
          </nav>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-10 px-4 lg:px-20 bg-[#fffde0]">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Left Side: Sleek & Compact Product Details Card */}
            <div className="w-full lg:w-2/3 bg-white rounded-2xl border border-[#EADDCA]/40 p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex flex-col md:flex-row gap-6 items-start border-b border-slate-100 pb-6">
                {/* Compact High-Fidelity Image Box (Fixed Width to Avoid Stretching) */}
                <div className="w-full md:w-44 relative aspect-square bg-gradient-to-br from-slate-50 to-white rounded-xl overflow-hidden border border-slate-100 p-3 flex flex-shrink-0 items-center justify-center group shadow-sm">
                  <Image
                    src={getBaseImageUrl(
                      companyDomain,
                      response?.product_image,
                      "",
                    )}
                    alt={response?.offer_title}
                    fill
                    className="object-contain p-2 transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 176px"
                    priority
                  />
                </div>

                {/* Tightly Aligned Content Area */}
                <div className="w-full flex flex-col justify-between min-h-[176px]">
                  <div>
                    {/* Compact Responsive Heading with Line Clamp protection */}
                    <h1
                      className="text-lg md:text-xl font-black text-[#1A1A1A] leading-snug tracking-tight mb-3 line-clamp-2 hover:line-clamp-none transition-all duration-300"
                      title={cleanProductTitle}
                    >
                      {cleanProductTitle}
                    </h1>

                    {/* Micro-Pricing Panel */}
                    <div className="inline-flex items-center p-2.5 px-4 bg-[#800000]/5 rounded-xl border border-[#800000]/5">
                      <div className="flex flex-col">
                        <span className="text-[9px] uppercase tracking-widest text-slate-400 font-bold mb-0.5">
                          Deal Price
                        </span>
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-black text-[#800000] tracking-tight">
                            {getCurrencySymbol(response?.currency)}
                            {response?.sale_price}
                          </span>
                          {response?.original_price && (
                            <span className="text-xs text-slate-400 line-through decoration-[#800000]/30 font-semibold tracking-wide">
                              {getCurrencySymbol(response?.currency)}
                              {response?.original_price}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Button Strip */}
                  <div className="mt-4 md:mt-0">
                    <OfferOutUrl
                      domain={companyDomain}
                      merchantHref={getMerchantHref(
                        response?.merchant,
                        store_slug,
                        slug_type,
                      )}
                      outUrl={response?.url}
                      unique_id={response?.unique_id}
                      customClass="w-full sm:w-max bg-[#800000] text-white hover:bg-[#1A1A1A] transition-all duration-300 font-bold text-xs uppercase tracking-wider py-3 px-8 rounded-xl flex justify-center items-center shadow-md shadow-[#800000]/10 hover:shadow-lg hover:-translate-y-0.5"
                    >
                      <span>Buy Now</span>
                    </OfferOutUrl>
                  </div>
                </div>
              </div>

              {/* Description Details Block */}
              {response?.offer_detail && (
                <div className="mt-6 prose prose-slate max-w-none">
                  <h3 className="text-md font-bold text-[#1A1A1A] mb-2.5 flex items-center gap-2">
                    <span className="w-1 h-4 rounded-full bg-[#800000]"></span>
                    Product Specifications
                  </h3>
                  <div
                    className="text-slate-600 leading-relaxed text-[12px] text-justify p-4 bg-slate-50 rounded-xl border border-slate-100"
                    dangerouslySetInnerHTML={{ __html: response?.offer_detail }}
                  />
                </div>
              )}
            </div>

            {/* Right Side: Sticky Sidebar Component Stack */}
            <div className="w-full lg:w-1/3 space-y-6">
              {/* Premium Merchant Card Layout */}
              <div className="bg-white border border-[#EADDCA]/40 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex flex-col items-center text-center">
                  <div className="relative w-full h-24 bg-gradient-to-br from-slate-50 to-white rounded-2xl overflow-hidden p-4 border border-slate-100 flex items-center justify-center">
                    <Image
                      className="object-contain p-2"
                      alt={response?.merchant?.merchant_name}
                      src={getBaseImageUrl(
                        companyDomain,
                        response?.merchant?.merchant_logo,
                        "",
                      )}
                      fill
                    />
                  </div>

                  <div className="mt-4 flex items-center gap-2.5 bg-[#fffde0] px-3.5 py-1.5 rounded-full border border-[#800000]/10 shadow-sm">
                    <div className="bg-[#800000] text-white text-xs font-black w-7 h-7 flex items-center justify-center rounded-full shadow-inner">
                      {getRandomRating(response?.merchant?.rating)}
                    </div>
                    <RenderRating
                      rating={getRandomRating(response?.merchant?.rating)}
                    />
                  </div>
                </div>
              </div>

              {/* Feedback Widget Container */}
              <div className="bg-gradient-to-br from-slate-50 to-white border border-slate-200/60 rounded-3xl p-6 shadow-inner">
                <RateUs
                  offer_id={response?.unique_id || ""}
                  company_id={company_id}
                />
              </div>

              {/* Contextual Navigation Sidebar Linkset - Redesigned Exact to Screenshot Match */}
              {cat?.length > 0 && (
                <div className="bg-white border border-[#EADDCA]/40 rounded-3xl p-6 shadow-sm">
                  <h4 className="text-md font-black text-[#1A1A1A] mb-4 border-b border-slate-100 pb-3 flex items-center justify-between">
                    <span>More from {response?.merchant?.merchant_name}</span>
                  </h4>

                  {/* Clean list with exact image layout mechanics */}
                  <div className="space-y-1">
                    {cat.slice(0, 6).map((category, i) => (
                      <Link
                        key={i}
                        href={`${getProductMerchantHref(response?.merchant, slug_type)}/${category.slug}`}
                        className="flex items-center justify-between group transition-all duration-200 py-2.5 px-3.5 rounded-xl hover:bg-[#800000]/[0.04] text-slate-700"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          {/* Dynamic Accent Bullet Dot */}
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-[#800000] transition-colors duration-200 flex-shrink-0" />
                          <span className="text-xs font-semibold tracking-wide text-slate-600 group-hover:text-slate-900 transition-colors duration-200 truncate">
                            {category?.name}
                          </span>
                        </div>

                        {/* High-Fidelity Horizontal Micro Pill Capsule Accent */}
                        <span className="w-5 h-2 rounded-full bg-[#800000]/5 group-hover:bg-[#800000] transition-colors duration-200 flex-shrink-0" />
                      </Link>
                    ))}
                  </div>

                  <div className="flex justify-center mt-5">
                    <Link
                      href={getProductMerchantHref(
                        response?.merchant,
                        slug_type,
                      )}
                      className="flex items-center justify-center gap-2 w-max py-2.5 px-6 bg-[#800000]/5 text-[#800000] font-black text-[11px] uppercase tracking-wider rounded-xl hover:bg-[#800000] hover:text-white transition-all duration-300 shadow-sm group border border-[#800000]/10"
                    >
                      <span>Explore All</span>
                      <FontAwesomeIcon
                        icon={faArrowRight}
                        className="w-2.5 h-2.5 transform group-hover:translate-x-0.5 transition-transform duration-300"
                      />
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Related Cross-Sell Products Grid */}
          {similarCategory?.length > 0 && (
            <div className="mt-20">
              <h2 className="text-xl md:text-2xl font-black text-[#1A1A1A] mb-8 capitalize flex items-center gap-3">
                <span className="w-1.5 h-6 rounded-full bg-[#800000]"></span>
                <span>
                  {categorySlug ? categorySlug.replace(/-/g, " ") : ""}
                  <span className="text-[#800000]"> Related Products</span>
                </span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {similarCategory.slice(0, 8).map((item, i) => (
                  <EventOfferCard
                    key={i}
                    product={item}
                    merchantHref={getMerchantHref(
                      merRes,
                      store_slug,
                      slug_type,
                    )}
                    domain={companyDomain}
                    merchant_name={merRes?.merchant_name}
                    merchant_logo={merRes?.merchant_logo}
                    productDetailUrl={getProductDetailHref(
                      merRes,
                      slug_type,
                      item?.slug,
                      item?.category?.slug,
                    )}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <SpecificProductSchema
        company_id={company_id}
        product_id={response?.unique_id}
        current_merchant_slug={current_merchant_slug}
        slug_type={slug_type}
      />
    </>
  );
};

export default OfferDetailsPage;
