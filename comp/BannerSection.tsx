import React from "react";
import BannerClient from "./BannerClient";
import { apiGetCompanySliders } from "@/apis/page_optimization";
import { apiGetAllKeywords } from "@/apis/user";

interface BannerSectionProps {
  keywords?: string[];
  merchants: any[];
  companyId: string;
}

export default async function BannerSection({
  keywords,
  merchants,
  companyId,
}: BannerSectionProps) {
  const staticSlides = [
    { image: "/themes/theme_9/images/1.png", link: null },
    { image: "/themes/theme_9/images/2.png", link: null },
    { image: "/themes/theme_9/images/3.png", link: null },
  ];

  let slides = staticSlides;
  let dynamicKeywords = keywords || [];

  try {
    // 1. Fetch Sliders
    const response = await apiGetCompanySliders(companyId);
    const companySliders = response?.data || [];

    if (Array.isArray(companySliders) && companySliders.length > 0) {
      slides = companySliders.map((item: any) => {
        const imgPath = item.slider_image || "";
        const formattedImg =
          imgPath.startsWith("http") || imgPath.startsWith("/")
            ? imgPath
            : `/${imgPath}`;

        return {
          image: formattedImg,
          link: item.button_link || null,
        };
      });
    }

    const keywordsResponse = await apiGetAllKeywords(companyId);
    if (keywordsResponse?.data && Array.isArray(keywordsResponse.data)) {
      dynamicKeywords = keywordsResponse.data;
    }
  } catch (error) {
    console.error("Error fetching company data in BannerSection:", error);
  }

  return (
    <section className="relative min-h-screen lg:min-h-[80vh] flex flex-col items-center justify-center bg-[#fffde0]/80 text-white pt-20 pb-8">
      <BannerClient
        companyId={companyId}
        keywords={dynamicKeywords}
        merchants={merchants}
        slides={slides}
      />
    </section>
  );
}
