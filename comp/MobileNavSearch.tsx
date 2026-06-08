"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { apiGetAllKeywords, apiSearchResult } from "@/apis/user";
import { getCategoryHref, getMerchantHref } from "@/constants/hooks";
import { SearchCategories, SearchMerchant } from "@/services/dataTypes";
import {
  FaStore,
  FaTags,
  FaListUl,
  FaSearch,
  FaTimes,
  FaChevronRight,
} from "react-icons/fa";

interface Props {
  companyId: string;
  mer_slug: string;
  slug_type: string;
  cat_slug: string;
  closeDrawer?: () => void;
}

let timeoutId: any = null;

const MobileNavSearch = ({
  companyId,
  mer_slug,
  slug_type,
  cat_slug,
  closeDrawer,
}: Props) => {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams?.toString());
  const [search, setSearch] = useState<string>(params.get("query") || "");
  const [tagsData, setTagsData] = useState<string[]>([]);
  const [categoriesData, setCategoriesData] = useState<SearchCategories[]>([]);
  const [merchantData, setMerchantData] = useState<SearchMerchant[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeywords = async () => {
      const response = await apiGetAllKeywords(companyId);
      if (response?.data) setTagsData(response.data);
    };
    handleKeywords();
  }, [companyId]);

  const handleSearch = async () => {
    try {
      if (search.trim().length >= 3) {
        const response = await apiSearchResult(search, companyId);
        setCategoriesData(response.data?.categories || []);
        setMerchantData(response.data?.merchants || []);
        if (pathName !== "/search") {
          setIsOpen(true);
        }
      }
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  useEffect(() => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      if (search.trim() === "") {
        setMerchantData([]);
        setCategoriesData([]);
      } else {
        handleSearch();
      }
    }, 500);
  }, [search]);

  const clearSearch = () => {
    setSearch("");
  };

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      setIsOpen(false);
      if (closeDrawer) closeDrawer();
      inputRef.current?.blur();
      router.push(`/search?query=${search}`);
    }
  };

  const handleItemClick = () => {
    setIsOpen(false);
    if (closeDrawer) closeDrawer();
  };

  return (
    <div
      className="relative w-full group/search"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div className="flex items-center gap-2">
        <form
          onSubmit={onFormSubmit}
          className="flex-1 flex items-center bg-white/80 backdrop-blur-sm rounded-2xl border border-[#800000]/10 focus-within:bg-white focus-within:border-[#800000]/40 focus-within:shadow-[0_10px_30px_rgba(128,0,0,0.08)] transition-all duration-500 px-3 md:px-4 py-1.5"
        >
          <input
            ref={inputRef}
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search stores or deals..."
            className="flex-1 bg-transparent outline-none text-[13px] md:text-[14px] text-black font-medium py-2 w-full placeholder-slate-400"
          />

          {search && (
            <button
              type="button"
              onClick={clearSearch}
              className="p-1 hover:bg-[#800000]/5 rounded-full transition-colors"
            >
              <FaTimes className="text-slate-400 text-[12px]" />
            </button>
          )}
        </form>

        <button
          onClick={onFormSubmit}
          type="button"
          className="w-12 h-12 flex items-center justify-center bg-[#800000] rounded-2xl text-white shadow-lg active:scale-95 hover:bg-black transition-all duration-300 shrink-0"
        >
          <FaSearch size={18} />
        </button>
      </div>

      {/* DROPDOWN MENU */}
      {isOpen &&
        (tagsData.length > 0 ||
          merchantData.length > 0 ||
          categoriesData.length > 0) && (
          <div className="absolute left-0 mt-2 w-full md:w-[550px] bg-[#FEF9E7] rounded-[1rem] shadow-[0_30px_70px_rgba(0,0,0,0.2)] z-[999] border border-[#800000]/10 p-3 md:p-4 animate-in fade-in zoom-in-95 duration-300">
            <div className="max-h-[350px] overflow-y-auto custom-scrollbar pr-2">
              <div className="space-y-5 py-2 pl-1">
                {/* 1. Merchants */}
                {merchantData.length > 0 && (
                  <div>
                    <h3 className="flex items-center gap-2 text-[10px] font-black text-black/40 uppercase tracking-[0.25em] mb-3 px-2">
                      <FaStore className="text-[#800000]" /> Top Merchants
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {merchantData.map((merchant, i) => (
                        <Link
                          key={i}
                          href={getMerchantHref(merchant, mer_slug, slug_type)}
                          onClick={handleItemClick}
                          className="no-underline flex items-center gap-3 p-2.5 rounded-2xl bg-white border border-black/5 hover:border-[#800000]/20 hover:shadow-md transition-all group"
                        >
                          <div className="w-9 h-9 relative bg-[#FEF9E7]/30 rounded-lg p-1.5 group-hover:scale-110 transition-transform">
                            <Image
                              src={merchant.merchant_logo}
                              alt={merchant.merchant_name}
                              fill
                              className="object-contain p-1"
                            />
                          </div>
                          <span className="font-bold text-black group-hover:text-[#800000] truncate text-[12px]">
                            {merchant.merchant_name}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* 2. Categories */}
                {categoriesData.length > 0 && (
                  <div>
                    <h3 className="flex items-center gap-2 text-[10px] font-black text-black/40 uppercase tracking-[0.25em] mb-3 px-2">
                      <FaListUl className="text-[#800000]" /> Categories
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {categoriesData.map((category, i) => (
                        <Link
                          key={i}
                          href={getCategoryHref(category, cat_slug, slug_type)}
                          onClick={handleItemClick}
                          className="no-underline flex items-center justify-between p-2.5 rounded-xl bg-white/50 hover:bg-white border border-transparent hover:border-[#800000]/10 transition-all group"
                        >
                          <span className="font-bold text-slate-700 group-hover:text-[#800000] text-[12px]">
                            {category?.name}
                          </span>
                          <div className="w-5 h-5 rounded-full bg-[#800000]/5 flex items-center justify-center group-hover:bg-[#800000] transition-colors">
                            <FaChevronRight className="text-[8px] text-[#800000] group-hover:text-white" />
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* 3. Trending List */}
                {tagsData.length > 0 && (
                  <div className="border-t border-[#800000]/5 pt-5">
                    <h3 className="flex items-center gap-2 text-[10px] font-black text-black/40 uppercase tracking-[0.25em] mb-3 px-2">
                      <FaTags className="text-[#800000]" /> Trending
                    </h3>
                    <div className="flex flex-col gap-2 px-1">
                      {tagsData.map((item, i) => (
                        <Link
                          key={i}
                          href={`/search?query=${item}`}
                          onClick={handleItemClick}
                          className="no-underline text-slate-800 px-4 py-2 bg-white rounded-xl text-[12px] font-bold border border-black/5 hover:border-[#800000]/20 hover:text-[#800000] hover:shadow-sm transition-all flex items-center justify-between group"
                        >
                          <span className="truncate group-hover:translate-x-1 transition-transform duration-300">
                            #{item}
                          </span>
                          <FaChevronRight className="text-[10px] text-slate-300 group-hover:text-[#800000] group-hover:translate-x-0.5 transition-all duration-300" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(128, 0, 0, 0.2);
          border-radius: 99px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(128, 0, 0, 0.45);
        }
      `}</style>
    </div>
  );
};

export default MobileNavSearch;
