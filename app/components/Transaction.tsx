"use client";
import recieved from "../assets/icons/call_received.svg";
import sent from "../assets/icons/call_made.svg";
import Image from "next/image";

interface Props {
  description: string;
  status: string;
  outgoing: boolean;
  amount: string;
  date: string;
}

export default function TransactionItem({
  description,
  status,
  outgoing,
  amount,
  date,
}: Props) {
  return (
    <div className="flex justify-between mb-7">
      <div className="flex gap-2 md:gap-4">
        <div
          className={`${
            outgoing ? "bg-[#F9E3E0]" : "bg-[#E3FCF2]"
          } w-12 h-12 rounded-full flex items-center justify-center`}
        >
          <>
            {outgoing ? (
              <Image src={sent} alt="sent icon" width={20} height={20} />
            ) : (
              <Image
                src={recieved}
                alt="recieved icon"
                width={20}
                height={20}
              />
            )}
          </>
        </div>
        <div>
          <p className="capitalize">{description}</p>
          <p
            className={`
              ${
                status === "successful"
                  ? "text-[#0EA163]"
                  : status === "pending"
                  ? "text-[#A77A07]"
                  : "text-[#56616B]"
              } text-sm capitalize leading-6`}
          >
            {status}
          </p>
        </div>
      </div>
      <div className="text-right">
        <h5 className="font-semibold">{amount}</h5>
        <p className="text-gray-400 text-md">{date}</p>
      </div>
    </div>
  );
}
