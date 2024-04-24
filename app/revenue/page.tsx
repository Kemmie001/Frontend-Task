"use client";
import { useEffect, useState } from "react";
import { fetchTransaction, fetchWallet } from "../services/api";
import BalanceCard from "../components/BalanceCard";
import { Transaction, Wallet } from "../assets/interfaces";
import exportIcon from "../assets/icons/export.svg";
import expand from "../assets/icons/expand_more.svg";
import Image from "next/image";
import EmptyState from "../components/EmptyState";
import TransactionItem from "../components/Transaction";
import moment from "moment"
import TransactionChart from "../components/TransactionChart";
import FilterModal from "../components/FilterModal";
import Sidebar from "../components/SideBar";

export default function Revenue() {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingTransactions, setloadingTransactions] = useState(false);
  const [transactions, setTransactions] = useState<Array<any>>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<
    Transaction[]
  >([]);
  const [wallet, setWallet] = useState<Wallet>({
    total_payout: 0,
    total_revenue: 0,
    balance: 0,
    ledger_balance: 0,
    pending_payout: 0,
  });
  const [filters, setFilters] = useState<any>({});
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState(0);

  const getWallet = async () => {
    try {
      const wallet = await fetchWallet();
      setWallet(wallet.data);
    } catch (err) {
      console.log("error :", err);
    }
  };

  const formatAmount = (num: number, currency: string = "USD") => {
    const n = num ? num.toFixed(2) : "0.00";
    return `${currency === "USD" ? "USD " : "₦ "}${n
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}`;
  };

  const getTransactions = async () => {
    try {
      setloadingTransactions(true);
      const transactions = await fetchTransaction();
      // console.log
      setTransactions(transactions.data);
      setFilteredTransactions(transactions.data);
    } catch (err) {
      console.log("error :", err);
    } finally {
      setloadingTransactions(false);
    }
  };

  const clearFilters = () => {
    setFilters({});
  };

  useEffect(() => {
    setIsLoading(true);
    Promise.all([getWallet(), getTransactions()]).then((value) => {
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    const activeFilters = Object.values(filters)?.filter((val) =>
      val?.toString()
    ).length;
    setActiveFilters(activeFilters);
    if (transactions?.length > 0) {
      if (activeFilters > 0) {
        setloadingTransactions(true);
        let tempFilteredTransactions = [...transactions];
        if (
          filters?.transactionType?.length > 0 ||
          filters?.transactionStatus?.length > 0 ||
          filters?.fromDate ||
          filters?.toDate
        ) {
          tempFilteredTransactions = transactions?.filter((trx) => {
            const datetime = new Date(trx.date).getTime();

            return (
              (filters?.transactionType?.length > 0
                ? filters?.transactionType.includes(trx.type)
                : true) &&
              (filters?.transactionStatus?.length > 0
                ? filters?.transactionStatus.includes(trx.status)
                : true) &&
              (filters?.toDate
                ? new Date(filters?.toDate)?.getTime() >= datetime
                : true) &&
              (filters?.fromDate
                ? new Date(filters?.fromDate)?.getTime() <= datetime
                : true)
            );
          });
        }

        // Mock Network Call
        setTimeout(() => {
          setFilteredTransactions(tempFilteredTransactions);
          setloadingTransactions(false);
        }, 1000);
      } else {
        setloadingTransactions(true);
        setTimeout(() => {
          setFilteredTransactions(transactions);
          setloadingTransactions(false);
        }, 1000);
      }
    }
  }, [filters]);

  return (
    <section className="">
       <Sidebar/>
      <div className="ml-5 md:ml-10 mr-10 lg:ml-24 md:mr-20">
      <div>
        <div className="flex flex-col md:flex-row  gap-5 justify-between items-center w-full">
          <div className="w-full md:w-7/12">
            <div className="flex items-center mb-10 gap-10">
              <div className="min-w-[220px]">
                <p className="text-gray-400">Available Balance</p>
                {isLoading ? (
                  <div className="my-0 py-0  h-10 w-32 skeleton"></div>
                ) : (
                  <h2
                    className={
                      isLoading
                        ? "invisible"
                        : "text-primary text-3xl font-bold leading-10"
                    }
                  >
                    {formatAmount(wallet?.balance)}
                  </h2>
                )}
              </div>
              <div>
                <button className="btn-primary px-4 md:px-8">Withdraw</button>
              </div>
            </div>
            {/* Transaction chart */}
            <TransactionChart data={transactions}/>
          </div>
          <div className="w-full md:w-4/12">
            <BalanceCard
              label="Ledger Balance"
              value={formatAmount(wallet?.ledger_balance)}
              isLoading={isLoading}
            />
            <BalanceCard
              label="Total Payout"
              value={formatAmount(wallet?.total_payout)}
              isLoading={isLoading}
            />
            <BalanceCard
              label="Total Revenue"
              value={formatAmount(wallet?.total_revenue)}
              isLoading={isLoading}
            />
            <BalanceCard
              label="Pending Payout"
              value={formatAmount(wallet?.pending_payout)}
              isLoading={isLoading}
            />
          </div>
        </div>
        <div className="pt-16">
          <div className="gap-4 flex flex-col md:flex-row md:justify-between md:items-center border-b border-gray-50 pb-8 mb-14">
            <div>
              <h3 className="text-primary font-bold text-xl leading-8">
                {filteredTransactions?.length} Transactions
              </h3>
              <p className="text-gray-400">Your transactions for all time</p>
            </div>
            <div className="flex gap-10">
              <div>
                <button
                  className="btn-secondary"
                  onClick={() => setFilterModalOpen(true)}
                >
                  Filter{" "}
                  {activeFilters > 0 && (
                    <span className="bg-primary text-gray-50 flex items-center justify-center w-8 h-8 rounded-full text-md border border-gray-50">
                      {activeFilters}
                    </span>
                  )}{" "}
                  <Image
                    className="icon"
                    src={expand}
                    alt="expand icon"
                    width={20}
                    height={20}
                  />
                </button>
              </div>
              <div>
                <button className="btn-secondary">
                  Export list{" "}
                  <Image
                    className="icon"
                    src={exportIcon}
                    alt="export icon"
                    width={20}
                    height={20}
                  />
                </button>
              </div>
            </div>
          </div>
          {/* Transaction reciepts */}
          <div className="">
            {filteredTransactions?.length === 0 && !loadingTransactions && (
              <EmptyState clearFilters={clearFilters} />
            )}

            {loadingTransactions ? (
              <div>
                {[1, 2, 3, 4, 5, 6]?.map((index) => (
                  <div
                    key={index}
                    className="my-4 h-16 skeleton"
                  ></div>
                ))}
              </div>
            ) : (
              filteredTransactions?.map((transaction) => (
                <TransactionItem
                  key={transaction?.payment_reference || transaction?.amount}
                  description={
                    transaction.metadata?.product_name ||
                    transaction.metadata?.type ||
                    "Cash Withdrawal"
                  }
                  outgoing={transaction.type?.toLowerCase() !== "deposit"}
                  status={
                    transaction.metadata?.product_name
                      ? transaction.metadata?.name
                      : transaction.status
                  }
                  amount={formatAmount(transaction.amount)}
                  date={moment(transaction.date).format("MMM DD,YYYY")}
                />
              ))
            )}
          </div>
        </div>
      </div>
      <FilterModal openModal={filterModalOpen} setOpenModal={setFilterModalOpen} setFilters={setFilters} />
      </div>

    </section>
  );
}
