"use client";
import Image from "next/image";
import expand from "../assets/icons/expand_more.svg";
import check from "../assets/icons/check.svg";

interface Props {
  label: string;
  value: Array<string>;
  options: Array<any>;
  onChange: (option: string) => void;
}

export default function SelectOptions({
  label,
  value,
  options,
  onChange,
}: Props) {
  return (
    <div
      className="custom_select__ctn"
      onSubmit={(e) => e.preventDefault()}
    >
      <button
        className="select__bar"
        onClick={(event) => event.currentTarget.focus()}
      >
        <span>{value?.toString()?.replaceAll(",", ", ") || label}</span>
        <Image
          className="icon"
          src={expand}
          alt="expand icon"
          width={20}
          height={20}
        />
      </button>
      <div className="options">
        {options?.map((option) => (
          <button
            key={option}
            className={value.includes(option) ? "option__active" : ""}
            onClick={() => onChange(option)}
          >
            <div className="empty__check">
            <Image
          className="icon"
          src={check}
          alt="expand icon"
          width={20}
          height={20}
        />
            </div>
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
