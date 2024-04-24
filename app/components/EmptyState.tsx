"use client";

import Image from "next/image";
import ReceiptIcon from "../assets/icons/receipt_long.svg";

interface Props {
  header?: string;
  sub?: string;
  clearFilters: () => void;
}

export default function EmptyState({
  header = "No matching transaction found for the selected filter",
  sub = "Change your filters to see more results, or add a new product.",
  clearFilters,
}: Props) {
  return (
    <div className="max-w-[370px] mx-auto my-4 w-full">
      <div className="reciept__icon">
        <Image src={ReceiptIcon} alt="reciept icon" width={24} height={50} />
      </div>
      <div className="text-left">
        <h3 className="text-primary font-bold text-3xl leading-10 mb-3 mt-8">
          {header}
        </h3>
        <p className="text-gray-400 mb-6 leading-7">{sub}</p>
      </div>
      <button className="btn-secondary" onClick={() => clearFilters()}>
        Clear Filter
      </button>
    </div>
  );
}
