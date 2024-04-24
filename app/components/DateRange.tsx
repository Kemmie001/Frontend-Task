"use client";
import { useState } from "react";
import Datepicker from "tailwind-datepicker-react";
import expand from "../assets/icons/expand_more.svg";
import Image from "next/image";
interface Props {
  value: any;
  onSelect: (option: any) => void;
}
export default function DateRange({ value, onSelect }: Props) {
  const [show, setShow] = useState(false);

  const handleClose = (state: boolean) => {
    setShow(state);
  };
  const options: any = {
    todayBtn: false,
    clearBtn: false,
    theme: {
      input:
        "bg-[#EFF1F6] focus:bg-white cursor-pointer rounded-xl font-medium text-sm -tracking-[0.2px] border-0 focus:!outline !outline-primary !outline-[3px] !outline-offset-0 !ring-0 w-full px-4 py-[14px] pr-20",
      inputIcon: "hidden",
      selected: "bg-primary",
    },
    inputDateFormatProp: {
      day: "numeric",
      month: "short",
      year: "numeric",
    },
  };
  return (
    <div className="relative grow">
      <Datepicker
        value={value}
        onChange={(value) => onSelect(value)}
        options={options}
        show={show}
        setShow={handleClose}
      />
      <Image
        src={expand}
        alt="expand icon"
        className="absolute right-[16px] top-[50%] -translate-y-[50%]"
      />
    </div>
  );
}
