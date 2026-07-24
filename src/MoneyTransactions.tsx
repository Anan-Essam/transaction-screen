import { useState } from "react";
import imgFrame58 from "./assets/figma/imgFrame58.png";
import imgNextLogo from "./assets/figma/imgNextLogo011Vectorized.svg";
import SideBar from "./components/SideBar";
import PaymentSummary from "./components/PaymentSummary";
import FilterSection from "./components/FilterSection";
import BidItemInfo from "./components/BidItemInfo";
import { ArrowDownIcon, SupportIcon, ChatIcon, BellIcon, SearchIcon } from "./components/icons";
import type { LedgerRow } from "./data";
import type { SideBarPage } from "./components/SideBar";

/* "Frame 61" — user profile row above the sidebar */
export function UserProfile() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full lg:w-[200px]">
      <div className="content-stretch flex items-center justify-between relative shrink-0 w-full lg:w-[201px]">
        <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
          <div className="relative rounded-[24px] shrink-0 size-[32px]">
            <img alt="Ahmed Karam" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[24px] size-full" src={imgFrame58} />
          </div>
          <div className="[word-break:break-word] flex flex-col font-cairo font-normal justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-black whitespace-nowrap">
            <p className="leading-[18px]">Ahmed Karam</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            /* open profile menu */
          }}
          className="flex items-center justify-center relative shrink-0 cursor-pointer"
          aria-label="Open profile menu"
        >
          <div className="-scale-y-100 flex-none rotate-180">
            <div className="bg-[rgba(40,69,157,0.1)] content-stretch flex items-center justify-center p-[6px] relative rounded-[18px] size-[24px]">
              <div className="flex items-center justify-center relative shrink-0 size-[14.4px]">
                <div className="-rotate-90 -scale-y-100 flex-none">
                  <div className="content-stretch flex gap-[6px] items-center relative" data-name="Right Icons">
                    <ArrowDownIcon />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}

/* "Frame 137" — logo + quick actions + search */
export function TopBar() {
  const [search, setSearch] = useState("");

  return (
    <div className="content-stretch flex flex-wrap gap-[12px] items-center justify-between relative shrink-0 w-full">
      <div className="h-[32px] relative shrink-0 w-[73.375px]" data-name="next-logo-01 1 [Vectorized]">
        <img alt="Next by Bekia" className="absolute block inset-0 max-w-none size-full" src={imgNextLogo} />
      </div>
      <div className="content-stretch flex flex-wrap gap-[12px] items-center relative shrink-0">
        <button
          type="button"
          onClick={() => {
            /* open support */
          }}
          className="bg-white content-stretch flex items-center p-[10px] relative rounded-[30px] shrink-0 cursor-pointer"
          aria-label="Support"
        >
          <SupportIcon />
        </button>
        <button
          type="button"
          onClick={() => {
            /* open chat */
          }}
          className="bg-white content-stretch flex items-center p-[10.667px] relative rounded-[32px] shrink-0 cursor-pointer"
          aria-label="Chat"
        >
          <ChatIcon />
        </button>
        <button
          type="button"
          onClick={() => {
            /* open notifications */
          }}
          className="relative shrink-0 cursor-pointer"
          aria-label="Notifications"
        >
          <BellIcon />
        </button>
        <div className="bg-white content-stretch flex flex-col h-[40px] items-start justify-center px-[16px] py-[11px] relative rounded-[24px] shrink-0 w-full sm:w-[309px]">
          <div className="content-stretch flex gap-[8px] items-center relative w-full">
            <SearchIcon />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Here"
              className="[word-break:break-word] bg-transparent border-none outline-none font-cairo font-normal leading-[18px] relative flex-[1_0_0] min-w-px text-[#131313] text-[14px] placeholder:text-[rgba(19,19,19,0.7)]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export type LedgerFilters = { search: string; from: string; to: string };

type MoneyTransactionsProps = {
  rows: LedgerRow[];
  onViewRow: (row: LedgerRow) => void;
  onAddToRow: (row: LedgerRow) => void;
  onAddTransaction: () => void;
  onNavigate: (page: SideBarPage) => void;
};

/* "Money Transactions" screen */
export default function MoneyTransactions({ rows, onViewRow, onAddToRow, onAddTransaction, onNavigate }: MoneyTransactionsProps) {
  const [filters, setFilters] = useState<LedgerFilters>({ search: "", from: "", to: "" });
  return (
    <div className="bg-[#f5f5f5] content-stretch flex flex-col items-start min-h-screen p-[24px] relative w-full" data-name="Money Transactions">
      <div className="content-stretch flex flex-col lg:flex-row gap-[16px] lg:h-[1018px] items-start lg:justify-center relative shrink-0 w-full max-w-[1392px] mx-auto" data-name="Sidebar Container">
        <div className="content-stretch flex lg:h-[969px] items-start relative shrink-0 w-full lg:w-auto">
          <div className="content-stretch flex flex-col gap-[24px] lg:h-full items-start relative shrink-0 w-full lg:w-[201px]">
            <UserProfile />
            <SideBar className="lg:h-[940px] relative shrink-0 w-full lg:w-[200px]" active="transaction" onNavigate={onNavigate} />
          </div>
        </div>
        <div className="content-stretch flex flex-col gap-[19px] lg:h-[1033px] items-end lg:overflow-clip relative shrink-0 w-full lg:w-auto lg:flex-[1_0_0] lg:max-w-[1159px] min-w-0">
          <TopBar />
          <div className="content-stretch flex items-start justify-end relative shrink-0 w-full">
            <div className="content-stretch flex flex-[1_0_0] flex-col gap-[24px] items-start min-w-px relative">
              <PaymentSummary />
              <FilterSection onFiltersChange={setFilters} onAddTransaction={onAddTransaction} />
              <BidItemInfo rows={rows} filters={filters} onViewRow={onViewRow} onAddToRow={onAddToRow} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
