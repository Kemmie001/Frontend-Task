"use client";

import { Dispatch, SetStateAction, useState } from "react";

import close from "../assets/icons/close.svg";
import Image from "next/image";
import SelectOptions from "./Select";
import DateRange from "./DateRange";

interface Props {
  openModal: boolean;
  setFilters: Dispatch<SetStateAction<any>>;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
}

export default function FilterModal({
  openModal,
  setOpenModal,
  setFilters,
}: Props) {
  const [closingModal, setClosingModal] = useState(false);
  const [transactionStatus, setTransactionStatus] = useState<Array<string>>([]);
  const [transactionType, setTransactionType] = useState<Array<string>>([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [dateRange, setDateRange] = useState(-1);

  const delayClose = (milli: number) => {
    setClosingModal(true);
    setTimeout(() => {
      setClosingModal(false);
      setOpenModal(false);
    }, milli);
  };

  const applyFilters = () => {
    setFilters({
      fromDate,
      toDate,
      transactionStatus,
      transactionType,
    });
    delayClose(600);
  };

  const selectDateRange = (daysDifference: number) => {
    const todayDate = new Date();
    const previousDate = new Date();
    previousDate.setDate(todayDate.getDate() - daysDifference);

    setToDate(todayDate.toDateString());
    setFromDate(previousDate.toDateString());
    setDateRange(daysDifference);
  };

  const clearFilters = () => {
    setToDate("");
    setFromDate("");
    setTransactionStatus([]);
    setTransactionType([]);
    setFilters({});
    delayClose(600);
  };

  const modifyArray = (arrayName: string, item: string) => {
    if (arrayName === "transactionStatus") {
      let temp = [...transactionStatus];
      if (temp.includes(item)) {
        temp = temp.filter((tempItem) => tempItem !== item);
      } else {
        temp.push(item);
      }
      setTransactionStatus(temp);
    } else {
      let temp = [...transactionType];
      if (temp.includes(item)) {
        temp = temp.filter((tempItem) => tempItem !== item);
      } else {
        temp.push(item);
      }
      setTransactionType(temp);
    }
  };

  return (
    <div
      className={`modal__bg ${openModal ? "visible" : ""}`}
      onClick={() => delayClose(600)}
    >
      <div onClick={(e) => e.stopPropagation()}>
        <div
          className={`modal__inner md:w-[460px] ${
            closingModal ? "invisible" : ""
          }`}
        >
          <div className="flex justify-between items-center text-primary font-xl font-bold mb-10">
            <h2>Filter</h2>
            <button
              className="hover:bg-[#eff1f680]"
              onClick={() => delayClose(600)}
            >
              <Image src={close} alt="sent icon" width={20} height={20} />
            </button>
          </div>
          <div className="flex justify-between">
            <button
              className={`btn-primary chip ${dateRange === 0 ? "active" : ""}`}
              onClick={() => selectDateRange(0)}
            >
              Today
            </button>
            <button
              className={`btn-primary chip ${dateRange === 7 ? "active" : ""}`}
              onClick={() => selectDateRange(7)}
            >
              Last 7 days
            </button>
            <button
              className={`btn-primary chip ${dateRange === 30 ? "active" : ""}`}
              onClick={() => selectDateRange(30)}
            >
              This month
            </button>
            <button
              className={`btn-primary chip ${dateRange === 90 ? "active" : ""}`}
              onClick={() => selectDateRange(90)}
            >
              Last 3 months
            </button>
          </div>
          <div className="my-6 grow">
            <p className="font-semibold  mb-3">Date Range</p>
            <div className="flex justify-between gap-[6px]">
              <DateRange
                value={fromDate}
                onSelect={(value: any) => {
                  // if (selectedPeriod) {
                  //   onSelectPeriod(null)
                  // }

                  // onStartDate(value)
                  setFromDate(value);
                }}
              />

              <DateRange
                value={toDate}
                onSelect={(value: any) => {
                  // if (selectedPeriod) {
                  //   onSelectPeriod(null)
                  // }

                  // onEndDate(value)
                  setToDate(value);
                }}
              />
            </div>
          </div>
          <div className="my-10">
            <label className="font-semibold text-base mb-2 block">
              Transaction Type
            </label>
            <SelectOptions
              label="Select Transaction Type"
              value={transactionType}
              options={["withdrawal", "deposit"]}
              onChange={(option: string) =>
                modifyArray("transactionType", option)
              }
            />
          </div>
          <div className="my-10">
            <label className="font-semibold text-base mb-2 block">
              Transaction Status
            </label>
            <SelectOptions
              label="Select Transaction Status"
              value={transactionStatus}
              options={["successful", "pending", "failed"]}
              onChange={(option: string) =>
                modifyArray("transactionStatus", option)
              }
            />
          </div>
          <div className="bottom__actions">
            <button
              data-testid="clear-filter-btn"
              className="btn-primary outline"
              onClick={() => clearFilters()}
            >
              Clear
            </button>
            <button
              data-testid="apply-filter-btn"
              className="btn-primary"
              disabled={
                !(
                  transactionType.toString() ||
                  transactionStatus.toString() ||
                  toDate ||
                  fromDate
                )
              }
              onClick={() => applyFilters()}
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
