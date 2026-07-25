import { useMemo, useRef, useState } from "react";
import SideBar from "./components/SideBar";
import type { SideBarPage } from "./components/SideBar";
import { UserProfile, TopBar } from "./MoneyTransactions";
import imgLine10 from "./assets/figma/imgLine10.svg";
import kpiCash from "./assets/figma/kpiCash.png";
import kpiBriefcase from "./assets/figma/kpiBriefcase.png";
import kpiCard from "./assets/figma/kpiCard.png";
import kpiGavel from "./assets/figma/kpiGavel.png";
import aucBadgeCash from "./assets/figma/aucBadgeCash.png";
import {
  AucSearchIcon,
  AucClearIcon,
  AucCalendarIcon,
  AucCategoryFilterIcon,
  AucSortIcon,
  AucDropArrow,
  AucChevron,
  AucPlusIcon,
  AucClockIcon,
  AucBiddingIcon,
  AucBidderUpIcon,
  AucProductIcon,
  AucLocationIcon,
  AucMoneyIcon,
  AucJudgmentIcon,
  AucArrowCircle,
} from "./components/auctionIcons";
import { AUCTION_SITES, AUCTION_CATEGORIES, auctionTotals, formatAmount } from "./auctionsData";
import type { Auction } from "./auctionsData";

export type SortKey = "date" | "bidders" | "highestPrice";
const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: "date", label: "Date (newest first)" },
  { key: "bidders", label: "Number of Bidders" },
  { key: "highestPrice", label: "Highest Price" },
];

/* KPI cell — same "Metric Card" treatment as the Figma metrics row */
function MetricCard({ title, value, icon, last, wideLabel }: { title: string; value: string; icon: React.ReactNode; last?: boolean; wideLabel?: boolean }) {
  return (
    <div className={`${last ? "" : "xl:border-r border-[#f0f0f0] border-solid "}flex xl:flex-[1_0_0] gap-[16px] items-center min-w-px overflow-clip px-[24px] py-[8px] relative w-full xl:w-auto`} data-name="Metric Card">
      <div className={`flex flex-col gap-[4px] ${wideLabel ? "h-[84px] " : ""}items-start justify-center relative shrink-0`}>
        <div className={`[word-break:break-word] flex flex-col font-cairo font-medium ${wideLabel ? "h-[30px] " : ""}justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(19,19,19,0.7)] ${wideLabel ? "w-[165px]" : "whitespace-nowrap"}`}>
          <p className={wideLabel ? "leading-[24px]" : "leading-[normal]"}>{title}</p>
        </div>
        <div className="flex h-[16px] items-center justify-center relative shrink-0 w-0">
          <div className="flex-none rotate-90">
            <div className="h-0 relative w-[16px]">
              <div className="absolute inset-[-1px_0_0_0]">
                <img alt="" className="block max-w-none size-full" src={imgLine10} />
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-[8px] items-start relative shrink-0" data-name="Metric Value Container">
          {icon}
          <div className="[word-break:break-word] flex flex-col font-cairo font-bold h-[30px] justify-center leading-[0] not-italic relative shrink-0 text-[#131313] text-[24px] w-[119px]">
            <p className="leading-[normal]">{value}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Time-remaining mini bar on each auction card */
function Frame36({ label, progress }: { label: string; progress: number }) {
  return (
    <div className="flex flex-col gap-[6px] items-start relative shrink-0 w-[120px]">
      <div className="[word-break:break-word] flex flex-col font-cairo font-semibold h-[11px] justify-center leading-[0] not-italic relative shrink-0 text-[#131313] text-[10px] w-full">
        <p className="leading-[normal]">{label}</p>
      </div>
      <div className="h-[5px] relative rounded-[3px] bg-[#f5f5f5] shrink-0 w-[120px]">
        <div className="absolute h-full left-0 rounded-[3px] bg-[#28459d]" style={{ width: `${Math.round(progress * 100)}%` }} />
      </div>
    </div>
  );
}

/* "Frame 2085663774" — one auction row card */
function AuctionCard({ auction, onOpen }: { auction: Auction; onOpen: () => void }) {
  const totals = auctionTotals(auction);
  const running = auction.status === "active";
  return (
    <div className="bg-white relative rounded-[16px] shrink-0 w-full" data-name="Frame 2085663774">
      <div className="flex gap-[8px] items-center p-[12px] relative w-full flex-col md:flex-row">
        <div className="h-[106px] overflow-clip relative rounded-[16px] w-full md:w-[146px] shrink-0">
          <img alt="" className="absolute max-w-none object-cover rounded-[16px] size-full" src={auction.image} />
          <div className="absolute bg-gradient-to-b from-[rgba(19,32,67,0)] inset-0 rounded-[16px] to-[99.038%] to-[rgba(19,32,67,0.6)]" />
          <div
            className={`absolute ${running ? "bg-[rgba(27,158,116,0.7)]" : "bg-[rgba(102,100,100,0.7)]"} flex gap-[2px] h-[24px] items-center justify-center left-[8.27px] p-[8px] rounded-[24px] top-[8px]`}
          >
            <div className="h-[16px] relative shrink-0 w-[15px]">
              <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={aucBadgeCash} />
            </div>
            <div className="[word-break:break-word] flex flex-col font-cairo font-bold justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-white whitespace-nowrap">
              <p className="leading-[normal]">{running ? "active" : "Closed"}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-[20px] items-start px-[16px] relative flex-1 min-w-0 w-full">
          <div className="flex flex-wrap gap-[8px] items-start justify-between relative shrink-0 w-full">
            <div className="[word-break:break-word] flex flex-col font-cairo font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#131313] text-[14px] whitespace-nowrap">
              <p className="leading-[24px]">{auction.name}</p>
            </div>
            <div className="flex gap-[8px] items-center relative shrink-0">
              <div className="flex gap-[4px] items-center relative shrink-0">
                <AucClockIcon />
                <div className="[word-break:break-word] flex flex-col font-cairo font-normal justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(19,19,19,0.7)] whitespace-nowrap">
                  <p className="leading-[normal]">Time Remaining:</p>
                </div>
              </div>
              <Frame36 label={auction.timeRemaining} progress={auction.timeProgress} />
            </div>
          </div>
          <div className="content-start flex flex-wrap gap-y-[8px] gap-x-[24px] items-start relative shrink-0 w-full lg:pr-[70px]">
            <div className="flex gap-[8px] items-center relative shrink-0 w-[115px]">
              <div className="flex gap-[4px] items-center relative shrink-0">
                <AucBiddingIcon />
                <div className="[word-break:break-word] flex flex-col font-cairo font-normal h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(19,19,19,0.7)] w-[50px]">
                  <p className="leading-[normal]">Bidders:</p>
                </div>
              </div>
              <div className="flex gap-[4px] items-center relative shrink-0 w-[50px]">
                <div className="[word-break:break-word] flex flex-col font-cairo font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#131313] text-[14px] whitespace-nowrap">
                  <p className="leading-[normal]">{auction.bidders.length}</p>
                </div>
                <div className="flex items-center relative shrink-0">
                  <AucBidderUpIcon />
                  <div className="[word-break:break-word] flex flex-col font-cairo font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#0cc60c] text-[10px] whitespace-nowrap">
                    <p className="leading-[normal]">+{auction.biddersDelta}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-[8px] items-center relative shrink-0">
              <div className="flex gap-[4px] items-center relative shrink-0">
                <AucProductIcon />
                <div className="[word-break:break-word] flex flex-col font-cairo font-normal justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(19,19,19,0.7)] whitespace-nowrap">
                  <p className="leading-[normal]">Products:</p>
                </div>
              </div>
              <div className="[word-break:break-word] flex flex-col font-cairo font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#131313] text-[14px] whitespace-nowrap">
                <p className="leading-[normal]">{auction.products.length}</p>
              </div>
            </div>
            <div className="flex gap-[8.334px] items-center relative shrink-0">
              <div className="flex gap-[4px] items-center relative shrink-0">
                <AucLocationIcon />
                <div className="[word-break:break-word] flex flex-col font-cairo font-normal justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(19,19,19,0.7)] whitespace-nowrap">
                  <p className="leading-[normal]">Location:</p>
                </div>
              </div>
              <div className="[word-break:break-word] flex flex-col font-cairo font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#131313] text-[14px] whitespace-nowrap">
                <p className="leading-[normal]">{auction.location}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-x-[48px] gap-y-[8px] items-center relative shrink-0 w-full">
              <div className="flex gap-[8px] items-center relative shrink-0">
                <div className="flex gap-[4px] items-center relative shrink-0">
                  <AucMoneyIcon />
                  <div className="[word-break:break-word] flex flex-col font-cairo font-normal justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(19,19,19,0.7)] whitespace-nowrap">
                    <p className="leading-[normal]">Total Low Bids:</p>
                  </div>
                </div>
                <div className="[word-break:break-word] flex flex-col font-cairo font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#131313] text-[14px] whitespace-nowrap">
                  <p className="leading-[normal]">{formatAmount(totals.low)}</p>
                </div>
              </div>
              <div className="flex gap-[8px] items-center relative shrink-0">
                <div className="flex gap-[4px] items-center relative shrink-0">
                  <AucJudgmentIcon />
                  <div className="[word-break:break-word] flex flex-col font-cairo font-normal justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(19,19,19,0.7)] whitespace-nowrap">
                    <p className="leading-[normal]">Total High Bids:</p>
                  </div>
                </div>
                <div className="[word-break:break-word] flex flex-col font-cairo font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#131313] text-[14px] whitespace-nowrap">
                  <p className="leading-[normal]">{formatAmount(totals.high)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute right-[16px] top-1/2 -translate-y-1/2 hidden md:block">
          <AucArrowCircle onClick={onOpen} label={`Open ${auction.name}`} />
        </div>
        <button
          type="button"
          onClick={onOpen}
          aria-label={`Open ${auction.name}`}
          className="md:hidden bg-[#2a459d] rounded-[24px] text-white font-cairo font-bold text-[14px] px-[16px] py-[8px] w-full cursor-pointer"
        >
          View Auction
        </button>
      </div>
    </div>
  );
}

type MyAuctionsProps = {
  auctions: Auction[];
  onNavigate: (page: SideBarPage) => void;
  onOpenAuction: (auction: Auction) => void;
};

/* "Auctions" — the auctions list screen */
export default function MyAuctions({ auctions, onNavigate, onOpenAuction }: MyAuctionsProps) {
  const [search, setSearch] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  /* draft dates apply on Apply, matching the ledger date-filter pattern */
  const [appliedFrom, setAppliedFrom] = useState("");
  const [appliedTo, setAppliedTo] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [sortKey, setSortKey] = useState<SortKey>("date");
  const [sortOpen, setSortOpen] = useState(false);
  const [site, setSite] = useState<string | null>(null);
  const fromRef = useRef<HTMLInputElement>(null);
  const toRef = useRef<HTMLInputElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);

  const openPicker = (ref: React.RefObject<HTMLInputElement | null>) => {
    const el = ref.current;
    if (!el) return;
    if (typeof el.showPicker === "function") {
      try {
        el.showPicker();
        return;
      } catch {
        /* fall through */
      }
    }
    el.focus();
  };

  /* All filters combine with AND semantics; sort applies on the filtered set */
  const visible = useMemo(() => {
    const filtered = auctions.filter((a) => {
      if (search && !a.name.toLowerCase().includes(search.toLowerCase())) return false;
      if (appliedFrom && a.createdAt < new Date(appliedFrom).getTime()) return false;
      if (appliedTo && a.createdAt > new Date(appliedTo).getTime() + 24 * 60 * 60 * 1000 - 1) return false;
      if (category && a.category !== category) return false;
      if (site && a.site !== site) return false;
      return true;
    });
    const sorted = [...filtered];
    if (sortKey === "date") sorted.sort((a, b) => b.createdAt - a.createdAt);
    else if (sortKey === "bidders") sorted.sort((a, b) => b.bidders.length - a.bidders.length);
    else sorted.sort((a, b) => auctionTotals(b).high - auctionTotals(a).high);
    return sorted;
  }, [auctions, search, appliedFrom, appliedTo, category, site, sortKey]);

  /* KPI values derived from seed data (Payment Success Rate has no payment model — static per Figma) */
  const kpis = useMemo(() => {
    const highs = auctions.map((a) => auctionTotals(a).high);
    const total = auctions.reduce((s, a) => s + a.bids.reduce((x, b) => x + b.amount, 0), 0);
    return {
      total: `$${total.toLocaleString("en-US")}`,
      highest: `$${Math.max(0, ...highs).toLocaleString("en-US")}`,
      success: "40",
      perAuction: `$${Math.round(total / Math.max(1, auctions.length)).toLocaleString("en-US")}`,
    };
  }, [auctions]);

  const scrollTabs = (dir: number) => tabsRef.current?.scrollBy({ left: dir * 240, behavior: "smooth" });

  return (
    <div className="bg-[#f5f5f5] flex flex-col items-start min-h-screen p-[24px] relative w-full" data-name="Auctions">
      <div className="flex flex-col lg:flex-row gap-[16px] items-start lg:justify-center relative shrink-0 w-full max-w-[1392px] mx-auto" data-name="Sidebar Container">
        <div className="flex items-start relative shrink-0 w-full lg:w-auto">
          <div className="flex flex-col gap-[24px] lg:h-full items-start relative shrink-0 w-full lg:w-[201px]">
            <UserProfile />
            <SideBar className="lg:h-[940px] relative shrink-0 w-full lg:w-[200px]" active="myAuctions" onNavigate={onNavigate} />
          </div>
        </div>
        <div className="flex flex-col gap-[24px] items-end relative shrink-0 w-full lg:w-auto lg:flex-[1_0_0] lg:max-w-[1159px] min-w-0" data-name="Main Content">
          <TopBar />
          <div className="flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-name="Metrics Section">
            {/* Metrics Row */}
            <div className="bg-white flex flex-col xl:flex-row gap-[16px] items-start py-[16px] relative rounded-[24px] shrink-0 w-full" data-name="Metrics Row">
              <MetricCard
                title="Total Revenue Generated"
                value={kpis.total}
                icon={
                  <div className="h-[32px] relative shrink-0 w-[36.716px]" data-name="Icons/Money/Cash/Version-2">
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      <img alt="" className="absolute h-[153.98%] left-[-17.82%] max-w-none top-[-25.41%] w-[134.21%]" src={kpiCash} />
                    </div>
                  </div>
                }
              />
              <MetricCard
                title="Highest Bid Reached"
                value={kpis.highest}
                icon={
                  <div className="h-[32px] relative shrink-0 w-[33.337px]" data-name="Icons/Briefcase/Money-1">
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      <img alt="" className="absolute h-[142.62%] left-[-18.05%] max-w-none top-[-21.31%] w-[136.9%]" src={kpiBriefcase} />
                    </div>
                  </div>
                }
              />
              <MetricCard
                title="Payment Success Rate"
                value={kpis.success}
                icon={
                  <div className="h-[32px] relative shrink-0 w-[39.443px]" data-name="Icons/Cards/Summer-2">
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      <img alt="" className="absolute h-[203.58%] left-[-33.71%] max-w-none top-[-50.89%] w-[165.16%]" src={kpiCard} />
                    </div>
                  </div>
                }
              />
              <MetricCard
                title="Revenue per Auction"
                value={kpis.perAuction}
                last
                wideLabel
                icon={
                  <div className="h-[32px] relative shrink-0 w-[44.999px]" data-name="Icons/Cards/Summer-2">
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      <img alt="" className="absolute h-[168.91%] left-[-8.52%] max-w-none top-[-34.85%] w-[120.12%]" src={kpiGavel} />
                    </div>
                  </div>
                }
              />
            </div>

            {/* Filter Section */}
            <div className="bg-white flex flex-col gap-[16px] items-start p-[16px] relative rounded-[24px] shrink-0 w-full" data-name="Filter Section">
              <div className="flex flex-col gap-[8px] items-start relative shrink-0 w-full">
                <div className="flex flex-col lg:flex-row gap-[16px] lg:items-center relative shrink-0 w-full">
                  <div className="bg-[#f9f9f9] flex flex-col md:flex-row flex-1 gap-[16px] md:items-center min-w-0 p-[8px] relative rounded-[40px]" data-name="Filter Input Container">
                    <div className="bg-white border border-[#dadada] border-solid flex flex-1 h-[40px] items-center justify-between min-w-0 px-[16px] py-[11px] relative rounded-[24px]" data-name="Search Input Container">
                      <div className="flex gap-[8px] items-center relative flex-1 min-w-0">
                        <AucSearchIcon />
                        <input
                          type="text"
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                          placeholder="Search Here"
                          aria-label="Search auctions"
                          className="flex-1 min-w-0 bg-transparent outline-none font-cairo font-normal text-[12px] leading-[18px] text-[#131313] placeholder:text-[rgba(19,19,19,0.7)]"
                        />
                      </div>
                      <button type="button" onClick={() => setSearch("")} aria-label="Clear search" className="cursor-pointer shrink-0">
                        <AucClearIcon />
                      </button>
                    </div>
                    <div className="flex gap-[8px] items-center relative shrink-0" data-name="Date Picker Container">
                      <button
                        type="button"
                        onClick={() => openPicker(fromRef)}
                        className="bg-white border border-[#dadada] border-solid flex flex-col h-[40px] items-start justify-center px-[16px] py-[11px] relative rounded-[24px] shrink-0 w-[122px] cursor-pointer"
                        data-name="Date Picker"
                      >
                        <div className="flex gap-[8px] items-center relative shrink-0">
                          <AucCalendarIcon />
                          <div className="[word-break:break-word] flex flex-col font-cairo font-normal justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-[rgba(19,19,19,0.7)] whitespace-nowrap">
                            <p className="leading-[18px]">{fromDate ? fromDate : "From Date"}</p>
                          </div>
                        </div>
                        <input ref={fromRef} type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} aria-label="From Date" className="absolute inset-0 opacity-0 pointer-events-none" tabIndex={-1} />
                      </button>
                      <button
                        type="button"
                        onClick={() => openPicker(toRef)}
                        className="bg-white border border-[#dadada] border-solid flex flex-col h-[40px] items-start justify-center px-[16px] py-[11px] relative rounded-[24px] shrink-0 cursor-pointer"
                        data-name="To Date Picker"
                      >
                        <div className="flex gap-[8px] items-center relative shrink-0">
                          <AucCalendarIcon />
                          <div className="[word-break:break-word] flex flex-col font-cairo font-normal justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-[rgba(19,19,19,0.7)] whitespace-nowrap">
                            <p className="leading-[18px]">{toDate ? toDate : "To date"}</p>
                          </div>
                        </div>
                        <input ref={toRef} type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} aria-label="To date" className="absolute inset-0 opacity-0 pointer-events-none" tabIndex={-1} />
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setAppliedFrom(fromDate);
                        setAppliedTo(toDate);
                      }}
                      className="bg-[#28459d] flex h-[40px] items-center justify-center px-[16px] py-[8px] relative rounded-[24px] shrink-0 w-[88px] cursor-pointer"
                    >
                      <div className="[word-break:break-word] flex flex-col font-cairo font-bold justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap">
                        <p className="leading-[normal]">Apply</p>
                      </div>
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      /* navigate to auction creation */
                    }}
                    className="bg-[#1b9e74] flex gap-[4px] h-[40px] items-center justify-center px-[16px] py-[8px] relative rounded-[24px] shrink-0 cursor-pointer"
                    data-name="Create Auction Button Container"
                  >
                    <div className="[word-break:break-word] flex flex-col font-cairo font-bold justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap">
                      <p className="leading-[normal]">Create New Auction</p>
                    </div>
                    <AucPlusIcon />
                  </button>
                </div>
                <div className="flex items-center relative shrink-0 w-full" data-name="Sort Container">
                  <div className="bg-[#f9f9f9] flex flex-1 items-center min-w-0 p-[8px] relative rounded-[40px]" data-name="Sort Row">
                    <div className="flex flex-col md:flex-row gap-[16px] md:gap-[24px] items-stretch md:items-center relative w-full" data-name="Sort Options Container">
                      {/* Category dropdown */}
                      <div className="relative flex-1 min-w-0">
                        <button
                          type="button"
                          onClick={() => setCategoryOpen((o) => !o)}
                          aria-haspopup="listbox"
                          aria-expanded={categoryOpen}
                          className="bg-white border border-[#dadada] border-solid flex h-[40px] items-center justify-between min-w-0 px-[16px] py-[11px] relative rounded-[24px] w-full cursor-pointer"
                          data-name="Category Dropdown"
                        >
                          <div className="flex gap-[8px] items-center relative shrink-0">
                            <AucCategoryFilterIcon />
                            <div className="[word-break:break-word] flex flex-col font-cairo font-normal justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(19,19,19,0.7)] whitespace-nowrap">
                              <p className="leading-[18px]">{category ?? "Category"}</p>
                            </div>
                          </div>
                          <AucDropArrow />
                        </button>
                        {categoryOpen && (
                          <>
                            <div className="fixed inset-0 z-10" onClick={() => setCategoryOpen(false)} aria-hidden="true" />
                            <div role="listbox" aria-label="Category" className="absolute left-0 top-[44px] z-20 bg-white border border-[#f5f5f5] rounded-[16px] shadow-[0px_4px_16px_0px_rgba(0,0,0,0.08)] py-[4px] w-full max-h-[240px] overflow-y-auto">
                              {[null, ...AUCTION_CATEGORIES].map((c) => (
                                <button
                                  key={c ?? "all"}
                                  type="button"
                                  role="option"
                                  aria-selected={category === c}
                                  onClick={() => {
                                    setCategory(c);
                                    setCategoryOpen(false);
                                  }}
                                  className={`w-full px-[16px] py-[8px] cursor-pointer hover:bg-[#f9f9f9] text-left font-cairo text-[14px] ${category === c ? "font-bold text-[#28459d]" : "font-normal text-[#131313]"}`}
                                >
                                  {c ?? "All"}
                                </button>
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                      {/* Sort dropdown */}
                      <div className="relative flex-1 min-w-0">
                        <button
                          type="button"
                          onClick={() => setSortOpen((o) => !o)}
                          aria-haspopup="listbox"
                          aria-expanded={sortOpen}
                          className="bg-white border border-[#dadada] border-solid flex h-[40px] items-center justify-between min-w-0 px-[16px] py-[11px] relative rounded-[24px] w-full cursor-pointer"
                          data-name="Sort Dropdown"
                        >
                          <div className="flex gap-[8px] items-center relative shrink-0">
                            <AucSortIcon />
                            <div className="[word-break:break-word] flex flex-col font-cairo font-normal justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(19,19,19,0.7)] whitespace-nowrap">
                              <p className="leading-[18px]">{sortKey === "date" ? "Sort by" : SORT_OPTIONS.find((s) => s.key === sortKey)?.label}</p>
                            </div>
                          </div>
                          <AucDropArrow />
                        </button>
                        {sortOpen && (
                          <>
                            <div className="fixed inset-0 z-10" onClick={() => setSortOpen(false)} aria-hidden="true" />
                            <div role="listbox" aria-label="Sort by" className="absolute left-0 top-[44px] z-20 bg-white border border-[#f5f5f5] rounded-[16px] shadow-[0px_4px_16px_0px_rgba(0,0,0,0.08)] py-[4px] w-full">
                              {SORT_OPTIONS.map((o) => (
                                <button
                                  key={o.key}
                                  type="button"
                                  role="option"
                                  aria-selected={sortKey === o.key}
                                  onClick={() => {
                                    setSortKey(o.key);
                                    setSortOpen(false);
                                  }}
                                  className={`w-full px-[16px] py-[8px] cursor-pointer hover:bg-[#f9f9f9] text-left font-cairo text-[14px] ${sortKey === o.key ? "font-bold text-[#28459d]" : "font-normal text-[#131313]"}`}
                                >
                                  {o.label}
                                </button>
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Site tabs */}
              <div className="flex gap-[12px] lg:gap-[24px] items-center relative shrink-0 w-full" data-name="Category Tabs">
                <button type="button" onClick={() => scrollTabs(-1)} aria-label="Scroll sites left" className="bg-[rgba(255,255,255,0.1)] flex items-center justify-center p-[8px] relative rounded-[24px] shrink-0 size-[32px] cursor-pointer">
                  <AucChevron size={19.2} className="rotate-90" />
                </button>
                <div ref={tabsRef} className="flex gap-[14px] items-center overflow-x-auto [scrollbar-width:none] relative flex-1 min-w-0" data-name="Category Tabs Container">
                  {[null, ...AUCTION_SITES].map((s) => {
                    const activeTab = site === s;
                    return (
                      <button
                        key={s ?? "all"}
                        type="button"
                        onClick={() => setSite(s)}
                        aria-pressed={activeTab}
                        className={`${activeTab ? "bg-[#28459d]" : "bg-[rgba(245,245,245,0.2)]"} flex h-[32px] items-center justify-center px-[16px] py-[8px] relative rounded-[24px] shrink-0 cursor-pointer`}
                        data-name="Category Tab"
                      >
                        <div className={`[word-break:break-word] flex flex-col font-cairo ${activeTab ? "font-bold text-white" : "font-medium text-[#828282]"} justify-center leading-[0] not-italic relative shrink-0 text-[16px] whitespace-nowrap`}>
                          <p className="leading-[normal]">{s ?? "All"}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
                <button type="button" onClick={() => scrollTabs(1)} aria-label="Scroll sites right" className="bg-[#28459d] flex items-center justify-center p-[8px] relative rounded-[24px] shrink-0 size-[32px] cursor-pointer">
                  <AucChevron size={19.2} className="-rotate-90 brightness-0 invert" />
                </button>
              </div>
            </div>

            {/* Auctions List */}
            <div className="bg-white flex flex-col relative rounded-[24px] shrink-0 w-full" data-name="Auctions List">
              <div className="flex flex-col gap-[16px] items-start p-[24px] relative w-full">
                <div className="flex items-center relative shrink-0 w-full border-b border-[#f5f5f5] border-solid pb-[16px]" data-name="Auctions Header">
                  <div className="flex gap-[8px] items-center relative shrink-0">
                    <AucJudgmentIcon size={14.4} />
                    <div className="flex gap-[8px] items-baseline relative shrink-0">
                      <div className="[word-break:break-word] flex flex-col font-cairo font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#131313] text-[16px] whitespace-nowrap">
                        <p className="leading-[normal]">Auctions:</p>
                      </div>
                      <div className="[word-break:break-word] flex flex-col font-cairo font-medium justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(19,19,19,0.7)] whitespace-nowrap">
                        <p className="leading-[normal]">{visible.length}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-[16px] items-start relative shrink-0 w-full max-h-[492px] overflow-y-auto pr-[4px]" data-name="Items List">
                  {visible.map((a) => (
                    <AuctionCard key={a.id} auction={a} onOpen={() => onOpenAuction(a)} />
                  ))}
                  {visible.length === 0 && (
                    <div className="flex flex-col gap-[8px] items-center justify-center py-[64px] relative shrink-0 w-full">
                      <div className="size-[80px] relative">
                        <img alt="" className="absolute block inset-0 max-w-none size-full object-contain" src={kpiGavel} />
                      </div>
                      <div className="[word-break:break-word] font-cairo font-bold text-[#131313] text-[20px] text-center">No auctions match your filters</div>
                      <div className="[word-break:break-word] font-cairo font-normal text-[16px] text-[rgba(19,19,19,0.7)] text-center">Adjust the search, dates, category or site tabs to see more auctions.</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
