"use client";

import { Dispatch, SetStateAction, useState } from "react";

import close from "../assets/icons/close.svg";
import Image from "next/image";
import SelectOptions from "./Select";
import DateRange from "./DateRange";
import moment from "moment";


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
  const [filterStartDate, setFilterStartDate] = useState<any>(new Date())
  const [filterEndDate, setFilterEndDate] = useState<any>(new Date())
  const [selectedPeriod, setSelectedPeriod] = useState<any>(null)
  const [startDate, setStartDate] = useState<any>(null)
  const [endDate, setEndDate] = useState<any>(null)
  


  const delayClose = (milli: number) => {
    setClosingModal(true);
    setTimeout(() => {
      setClosingModal(false);
      setOpenModal(false);
    }, milli);
  };

  const applyFilters = () => {
    setFilters({
      filterStartDate,
      filterEndDate,
      transactionStatus,
      transactionType,
    });
    delayClose(600);
  };
  function startOf(unit: moment.unitOfTime.DurationConstructor) {
    return () => moment().startOf(unit)
  }
  
  function timeAgo(amount: number, unit: moment.unitOfTime.DurationConstructor) {
    return () => moment().subtract(amount, unit)
  }

  const periods = [
    {
      label: "Today",
      startTime: startOf("day"),
    },
    {
      label: "Last 7 days",
      startTime: timeAgo(7, "days"),
    },
    {
      label: "This month",
      startTime: startOf("month"),
    },
    {
      label: "Last 3 months",
      startTime: timeAgo(3, "months"),
    },
  ]

  const togglePeriod = (period: (typeof periods)[number]) => {
    if (period.label === selectedPeriod) {
      setFilterStartDate(moment().toDate())
      setStartDate(null)

      setFilterEndDate(moment().toDate())
      setEndDate(null)
      
      setSelectedPeriod(null)
    } else {
      setFilterStartDate(period.startTime().toDate())
      setStartDate(period.startTime().toDate())
      
      setFilterEndDate(moment().toDate())
      setEndDate(moment().toDate())

      setSelectedPeriod(period.label)
    }
  }


  const clearFilters = () => {
    setFilterStartDate("");
    setFilterStartDate('');
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
          <div className="flex gap-2 justify-between mb-7">
          {periods.map((period) => (
            <button
              key={period.label}
              onClick={() => togglePeriod(period)}
              className={`font-medium text-sm  border rounded-full py-2 px-4 ${
                selectedPeriod === period.label
                  ? "bg-primary text-white"
                  : "border-gray-50"
              }`}
            >
              {period.label}
            </button>
          ))}
        </div>
          <div className="my-10 grow">
            <p className="font-semibold  mb-3">Date Range</p>
            <div className="flex justify-between gap-3">
              <div className="from">
                <DateRange
                  value={filterStartDate}
                  onSelect={(value: any) => {
                    if (selectedPeriod) {
                      setSelectedPeriod(null)
                    }
    
                    setStartDate(value)
                    setFilterStartDate(value)
                  }}
                />
              </div>

              <div className="to">
                <DateRange
                  value={filterEndDate}
                  onSelect={(value: any) => {
                    if (selectedPeriod) {
                        setSelectedPeriod(null)
                    }
    
                    setEndDate(value)
                    setFilterEndDate(value)
                  }}
                />
              </div>
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
                  filterEndDate ||
                  filterStartDate
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
