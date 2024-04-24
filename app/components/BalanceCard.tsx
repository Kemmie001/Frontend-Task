"use client";

import Image from "next/image";
import info from "../assets/icons/info.svg";

interface Props {
  label: string;
  value: string;
  isLoading: boolean;
}

export default function BalanceCard({ label, value, isLoading }: Props) {
  return (
    <div className="flex justify-between mb-10 w-full">
      <div>
        <p>{label}</p>
        {isLoading ? (
          <div className="my-0 py-0  h-10 w-32 skeleton"></div>
        ) : (
          <h3
            className={
              isLoading
                ? "invisible"
                : "text-primary text-3xl font-bold leading-10"
            }
          >
            {value}
          </h3>
        )}
      </div>
      <div>
        <button>
          <Image src={info} alt="info icon" width={20} height={20} />
        </button>
      </div>
    </div>
  );
}
