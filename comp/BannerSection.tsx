import React from "react";
import BannerClient from "./BannerClient";
import { apiGetCompanySliders } from "@/apis/page_optimization";

interface BannerSectionProps {
  merchants: any[];
  companyId: string;
}

export default async function BannerSection({
  merchants,
  companyId,
}: BannerSectionProps) {
  const staticSlides = [
    { image: "/themes/theme_9/images/1.png", link: null },
    { image: "/themes/theme_9/images/2.png", link: null },
    { image: "/themes/theme_9/images/3.png", link: null },
  ];

  let slides = staticSlides;

  try {
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
  } catch (error) {
    console.error("Error fetching company sliders:", error);
  }

  return (
    <section className="relative min-h-screen lg:min-h-[90vh] flex flex-col items-center justify-center bg-[#fffde0]/80 text-white overflow-hidden pt-28 pb-10">
      {/* Background Spotlights */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#D1C7A7]/40 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#800000]/10 rounded-full blur-[120px]" />
      </div>

      <BannerClient merchants={merchants} slides={slides} />
    </section>
  );
}
