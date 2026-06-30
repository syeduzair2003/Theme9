import { calculateOfferDuration } from "@/constants/hooks";
import React from "react";
import { CalendarDays, Clock } from "lucide-react";

interface Props {
  endDate: string | null;
  className?: string;
}

const OfferDuration = ({ endDate, className }: Props) => {
  const durationText = calculateOfferDuration(endDate);
  const isPermanent = endDate === null || endDate === undefined;

  return (
    <div className={`flex items-center ${className ?? ""}`}>
      <span
        className={`
          inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider
          transition-all duration-300 border select-none
          ${
            isPermanent
              ? "bg-[#800000] border-[#800000]/10 text-[#FFFDF5]"
              : "bg-[#1A1A1A] border-black/10 text-[#FFFDF5]/90"
          }
        `}
      >
        {isPermanent ? (
          <CalendarDays size={11} className="text-[#FFFDF5] shrink-0 opacity-90" />
        ) : (
          <Clock size={11} className="text-[#FFFDF5]/70 shrink-0" />
        )}

        <span className="whitespace-nowrap">
          {durationText}
        </span>
      </span>
    </div>
  );
};

export default OfferDuration;