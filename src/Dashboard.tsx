import { useState } from "react";
import bannerObject from "./assets/figma/bannerObject.png";
import SideBar from "./components/SideBar";
import type { SideBarPage } from "./components/SideBar";
import { UserProfile, TopBar } from "./MoneyTransactions";
import { MyAuctionsIcon } from "./components/icons";
import { AgreementIcon, ProductIcon } from "./components/icons2";
import { CategoryIcon } from "./components/icons3";
import { Swap3Icon, FilterPillArrow, SitesIcon, BidderUpIcon, ActionArrowButton, DeadlineIcon } from "./components/icons4";
import {
  DASH_AUCTIONS,
  DASH_LINES,
  DASH_SITES,
  filterLines,
  filterAuctions,
  aggregate,
  topByRevenue,
  topByFulfilledQty,
  formatTons,
  formatGMV,
  formatPct,
} from "./dashboardData";
import type { DashFilters } from "./dashboardData";
import { PRODUCT_CATEGORIES } from "./data";

/* Filter pill select with click-away backdrop (no document-level listeners) */
function FilterPill({ icon, placeholder, value, options, onSelect }: { icon: React.ReactNode; placeholder: string; value: string | null; options: string[]; onSelect: (v: string | null) => void }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative md:flex-[1_0_0] min-w-px w-full md:w-auto">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="bg-white border border-[#dadada] border-solid content-stretch flex h-[40px] items-center justify-between min-w-px px-[16px] py-[11px] relative rounded-[24px] w-full cursor-pointer"
      >
        <div className="content-stretch flex gap-[8px] items-center leading-[0] relative shrink-0 min-w-0">
          {icon}
          <div className="[word-break:break-word] flex flex-col font-cairo font-normal justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(19,19,19,0.7)] whitespace-nowrap overflow-hidden text-ellipsis">
            <p className="leading-[18px]">{value ?? placeholder}</p>
          </div>
        </div>
        <FilterPillArrow />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10 cursor-default" aria-hidden onClick={() => setOpen(false)} />
          <div role="listbox" className="absolute left-0 right-0 top-[44px] z-20 bg-white border border-[#f5f5f5] border-solid rounded-[8px] overflow-hidden overflow-y-auto max-h-[280px] shadow-[0px_4px_16px_rgba(19,19,19,0.08)]">
            <button
              type="button"
              role="option"
              aria-selected={value === null}
              onClick={() => {
                onSelect(null);
                setOpen(false);
              }}
              className="block w-full text-left px-[16px] py-[10px] font-cairo font-semibold text-[14px] text-[#131313] cursor-pointer hover:bg-[#f9f9f9]"
            >
              All
            </button>
            {options.map((opt) => (
              <button
                key={opt}
                type="button"
                role="option"
                aria-selected={opt === value}
                onClick={() => {
                  onSelect(opt);
                  setOpen(false);
                }}
                className="block w-full text-left px-[16px] py-[10px] font-cairo font-semibold text-[14px] text-[#131313] cursor-pointer hover:bg-[#f9f9f9]"
              >
                {opt}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

/* 6px rounded progress bar (money: gold track / quantity: faded green track) */
function LedgerBar({ pct, variant }: { pct: number; variant: "money" | "quantity" }) {
  return (
    <div className="relative h-[6px] w-full" data-name="Lines">
      <div className={`absolute inset-0 rounded-full ${variant === "money" ? "bg-[#d6af68]" : "bg-[rgba(27,158,116,0.24)]"}`} />
      <div className="absolute left-0 top-0 h-full rounded-full bg-[#1b9e74]" style={{ width: `${Math.min(100, Math.max(0, pct))}%` }} />
    </div>
  );
}

type LedgerStat = { label: string; value: string; note: string; noteColor: string };

function LedgerStatCell({ stat, last, fixedWidth }: { stat: LedgerStat; last?: boolean; fixedWidth?: boolean }) {
  return (
    <div className={`bg-white ${last ? "rounded-[12px]" : "border-[#f5f5f5] border-r border-solid"} content-stretch flex flex-[1_0_0] flex-col gap-[12px] items-start ${last || !fixedWidth ? "justify-center " : ""}min-w-px p-[12px] relative`}>
      <div className={`content-stretch flex flex-col gap-[4px] items-center justify-center relative shrink-0 ${fixedWidth ? "w-[115px]" : "w-full"}`} data-name="Nested Frame">
        <p className="font-['Inter',sans-serif] font-normal relative shrink-0 text-[#828282] text-[12px] w-full">{stat.label}</p>
        <p className="font-cairo font-bold relative shrink-0 text-[#131313] text-[18px] w-full">{stat.value}</p>
      </div>
      <p className="font-['Inter',sans-serif] font-normal relative shrink-0 text-[10px] whitespace-nowrap" style={{ color: stat.noteColor }}>
        {stat.note}
      </p>
    </div>
  );
}

const BAR_COLORS = ["#1b9e74", "#126c4f", "#0b4935", "#28459d", "#3653aa"];

type DashboardProps = {
  onNavigate: (page: SideBarPage) => void;
};

/* "Homepage" — Dashboard screen (Figma 505:13726) */
export default function Homepage({ onNavigate }: DashboardProps) {
  const [filters, setFilters] = useState<DashFilters>({ auction: null, site: null, category: null });

  const lines = filterLines(DASH_LINES, filters, DASH_AUCTIONS);
  const totals = aggregate(lines);
  const auctions = filterAuctions(DASH_AUCTIONS, filters)
    .slice()
    .sort((a, b) => b.createdAt - a.createdAt)
    .slice(0, 2);
  const byRevenue = topByRevenue(lines);
  const byQty = topByFulfilledQty(lines);
  const maxQty = byQty.length > 0 ? byQty[0].qty : 0;

  return (
    <div className="bg-[#f5f5f5] content-stretch flex flex-col items-start min-h-screen p-[24px] relative w-full" data-name="Homepage">
      <div className="content-stretch flex flex-col lg:flex-row gap-[16px] items-start lg:justify-center relative shrink-0 w-full max-w-[1392px] mx-auto" data-name="Sidebar Container">
        <div className="content-stretch flex lg:h-[969px] items-start relative shrink-0 w-full lg:w-auto" data-name="Profile Section">
          <div className="content-stretch flex flex-col gap-[24px] lg:h-full items-start relative shrink-0 w-full lg:w-[201px]" data-name="Profile Details">
            <UserProfile />
            <SideBar className="lg:h-[940px] relative shrink-0 w-full lg:w-[200px]" active="dashboard" onNavigate={onNavigate} />
          </div>
        </div>
        <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full lg:w-auto lg:flex-[1_0_0] min-w-0">
          <TopBar />
          <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-full" data-name="Dashboard Home Content">
            {/* Banner */}
            <div
              className="content-stretch flex flex-col md:flex-row md:h-[133px] gap-[16px] md:gap-0 items-start md:items-center justify-between overflow-clip p-[16px] md:py-0 md:pl-[24px] md:pr-[32px] relative rounded-[24px] shrink-0 w-full"
              style={{ backgroundImage: "linear-gradient(90.02495460729575deg, rgb(40, 69, 157) 0%, rgb(27, 158, 116) 97.7%)" }}
            >
              <div className="content-stretch flex gap-[24px] items-center relative shrink-0 w-full md:w-[903px] md:max-w-[calc(100%-200px)] min-w-0">
                <div className="h-[80px] relative shrink-0 w-[70.417px]" data-name="Object">
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <img alt="" className="absolute h-full left-[0.06%] max-w-none top-0 w-[99.94%]" src={bannerObject} />
                  </div>
                </div>
                <div className="md:border-[rgba(255,255,255,0.3)] md:border-r border-solid content-stretch flex flex-[1_0_0] md:h-[93px] items-center min-w-px relative">
                  <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start leading-[0] min-w-px not-italic relative">
                    <div className="flex flex-col font-cairo font-bold justify-center relative shrink-0 text-[24px] text-white w-full md:w-[379px]">
                      <p className="leading-[normal]">Hi Ahmed, your auction hub is ready!</p>
                    </div>
                    <div className="flex flex-col font-cairo font-normal justify-center relative shrink-0 text-[12px] text-[rgba(255,255,255,0.8)] w-full md:w-[439px]">
                      <p className="leading-[18px]">Track your live bids, manage upcoming auctions, and review pending KYC applications—all in one streamlined dashboard.</p>
                    </div>
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  /* navigate to auction creation */
                }}
                className="bg-white content-stretch flex items-center justify-center px-[16px] py-[8px] relative rounded-[24px] shrink-0 cursor-pointer"
              >
                <div className="[word-break:break-word] flex flex-col font-cairo font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#28459d] text-[16px] whitespace-nowrap">
                  <p className="leading-[normal]">Start Your Auctions</p>
                </div>
              </button>
            </div>

            <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
              {/* Filter Section */}
              <div className="bg-white content-stretch flex flex-col items-start overflow-visible p-[8px] relative rounded-[56px] shrink-0 w-full" data-name="Filter Section">
                <div className="bg-[#f9f9f9] content-stretch flex items-center p-[4px] relative rounded-[40px] shrink-0 w-full" data-name="Sort Row">
                  <div className="content-stretch flex flex-col md:flex-row flex-[1_0_0] gap-[12px] items-stretch md:items-center min-w-px relative" data-name="Sort Options Container">
                    <FilterPill
                      icon={<CategoryIcon />}
                      placeholder="Auction"
                      value={filters.auction}
                      options={DASH_AUCTIONS.map((a) => a.name)}
                      onSelect={(v) => setFilters((f) => ({ ...f, auction: v }))}
                    />
                    <FilterPill
                      icon={<SitesIcon />}
                      placeholder="Sites"
                      value={filters.site}
                      options={DASH_SITES}
                      onSelect={(v) => setFilters((f) => ({ ...f, site: v }))}
                    />
                    <FilterPill
                      icon={<ProductIcon size={14} />}
                      placeholder="Material category"
                      value={filters.category}
                      options={PRODUCT_CATEGORIES.map((c) => c.name)}
                      onSelect={(v) => setFilters((f) => ({ ...f, category: v }))}
                    />
                    <button
                      type="button"
                      onClick={() => setFilters({ auction: null, site: null, category: null })}
                      className="flex items-center justify-center relative shrink-0 cursor-pointer self-center"
                      aria-label="Reset filters"
                    >
                      <div className="-scale-y-100 flex-none rotate-180">
                        <div className="bg-[rgba(42,69,157,0.1)] content-stretch flex items-center justify-center overflow-clip p-[17.182px] relative rounded-[25.772px] size-[40px]" data-name="arrow/up left">
                          <Swap3Icon className="relative shrink-0 size-[24px]" />
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>

              {/* Ledger cards */}
              <div className="content-stretch flex flex-col xl:flex-row gap-[20px] items-start relative shrink-0 w-full">
                {/* Money Ledger */}
                <div className="bg-white content-stretch flex xl:flex-[1_0_0] flex-col gap-[16px] items-start min-w-px p-[12px] relative rounded-[16px] w-full xl:w-auto">
                  <div className="content-stretch flex items-start justify-between relative shrink-0 w-full">
                    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-[288.25px]">
                      <AgreementIcon />
                      <div className="[word-break:break-word] flex flex-col font-cairo font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#131313] text-[18px] whitespace-nowrap">
                        <p className="leading-[normal]">Money Ledger</p>
                      </div>
                    </div>
                    <div className="bg-[rgba(249,160,0,0.06)] content-stretch flex gap-[2px] h-[24px] items-center justify-center px-[12px] py-[8px] relative rounded-[24px] shrink-0">
                      <div className="[word-break:break-word] flex flex-col font-cairo font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#f9a000] text-[12px] whitespace-nowrap">
                        <p className="leading-[normal]">{formatPct(totals.pctCollected)} collected</p>
                      </div>
                    </div>
                  </div>
                  <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-full">
                    <div className="[word-break:break-word] content-stretch flex flex-col sm:flex-row gap-[8px] items-stretch sm:items-center justify-center leading-[normal] not-italic relative shrink-0 w-full" data-name="Stats Row">
                      <LedgerStatCell stat={{ label: "Awarded Bid Value", value: `${totals.awarded.toLocaleString("en-US")} EGP`, note: `${totals.bids} awarded bids`, noteColor: "#28459d" }} fixedWidth />
                      <LedgerStatCell stat={{ label: "Payments Received", value: `${totals.received.toLocaleString("en-US")} EGP`, note: `${formatPct(totals.pctCollected)} of awarded value`, noteColor: "#1b9e74" }} />
                      <LedgerStatCell stat={{ label: "Outstanding Balance", value: `${totals.outstanding.toLocaleString("en-US")} EGP`, note: `${totals.overdue.toLocaleString("en-US")} EGP overdue 90+ days`, noteColor: "#a66c05" }} last />
                    </div>
                    <div className="content-stretch flex flex-col gap-[8px] items-end justify-center relative shrink-0 w-full" data-name="Remaining Quantity Section">
                      <LedgerBar pct={totals.pctCollected} variant="money" />
                      <div className="[word-break:break-word] content-stretch flex font-cairo font-medium items-center justify-between leading-[normal] not-italic relative shrink-0 text-[#4a4a4a] text-[12px] text-right w-full whitespace-nowrap" data-name="Quantity Info">
                        <p className="relative shrink-0" dir="auto">
                          Received: {totals.received.toLocaleString("en-US")} EGP
                        </p>
                        <p className="relative shrink-0" dir="auto">
                          Outstanding: {totals.outstanding.toLocaleString("en-US")} EGP
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Quantity Ledger */}
                <div className="bg-white content-stretch flex xl:flex-[1_0_0] flex-col gap-[16px] items-start min-w-px p-[12px] relative rounded-[16px] w-full xl:w-auto">
                  <div className="content-stretch flex items-start justify-between relative shrink-0 w-full">
                    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-[288.25px]">
                      <ProductIcon size={14} />
                      <div className="[word-break:break-word] flex flex-col font-cairo font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#131313] text-[18px] whitespace-nowrap">
                        <p className="leading-[normal]">Quantity Ledger</p>
                      </div>
                    </div>
                    <div className="bg-[rgba(27,158,116,0.08)] content-stretch flex gap-[2px] h-[24px] items-center justify-center px-[12px] py-[8px] relative rounded-[24px] shrink-0">
                      <div className="[word-break:break-word] flex flex-col font-cairo font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#1b9e74] text-[12px] whitespace-nowrap">
                        <p className="leading-[normal]">{formatPct(totals.pctReleased)} released</p>
                      </div>
                    </div>
                  </div>
                  <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-full">
                    <div className="[word-break:break-word] content-stretch flex flex-col sm:flex-row gap-[8px] items-stretch sm:items-center justify-center leading-[normal] not-italic relative shrink-0 w-full" data-name="Stats Row">
                      <LedgerStatCell stat={{ label: "Awarded Quantity", value: `${formatTons(totals.awardedQty)} tons`, note: `Across ${totals.bids} awarded bids`, noteColor: "#828282" }} fixedWidth />
                      <LedgerStatCell stat={{ label: "Released Quantity", value: `${formatTons(totals.releasedQty)} tons`, note: `${formatPct(totals.pctReleased)} left the hubs`, noteColor: "#828282" }} />
                      <LedgerStatCell stat={{ label: "Remaining in Hubs", value: `${formatTons(totals.remainingQty)} tons`, note: "Storage cost exposure", noteColor: "#828282" }} last />
                    </div>
                    <div className="content-stretch flex flex-col gap-[8px] items-end justify-center relative shrink-0 w-full" data-name="Remaining Quantity Section">
                      <LedgerBar pct={totals.pctReleased} variant="quantity" />
                      <div className="[word-break:break-word] content-stretch flex font-cairo font-medium items-center justify-between leading-[normal] not-italic relative shrink-0 text-[#4a4a4a] text-[12px] text-right w-full whitespace-nowrap" data-name="Quantity Info">
                        <p className="relative shrink-0" dir="auto">
                          Released: {formatTons(totals.releasedQty)} tons
                        </p>
                        <p className="relative shrink-0" dir="auto">
                          Remaining: {formatTons(totals.remainingQty)} tons
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Active Auctions */}
            <div className="content-stretch flex items-start relative shrink-0 w-full">
              <div className="bg-white content-stretch flex flex-col items-start overflow-x-auto px-[24px] py-[16px] relative rounded-[24px] shrink-0 w-full">
                <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full min-w-[900px] lg:min-w-0">
                  <div className="content-stretch flex items-start justify-between relative shrink-0 w-full">
                    <div className="border-[#f5f5f5] border-b border-solid content-stretch flex gap-[5px] items-center pb-[8px] relative shrink-0">
                      <MyAuctionsIcon />
                      <div className="[word-break:break-word] flex flex-col font-cairo font-bold h-[21px] justify-center leading-[0] not-italic relative shrink-0 text-[#131313] text-[16px] w-[131px]">
                        <p className="leading-[normal]">Active Auctions</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        /* navigate to My Auctions */
                      }}
                      className="[word-break:break-word] flex flex-col font-cairo font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#28459d] text-[14px] w-[48px] cursor-pointer text-left"
                    >
                      <p className="leading-[normal]">View All</p>
                    </button>
                  </div>
                  <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
                    <div className="[word-break:break-word] border-[#f5f5f5] border-b border-solid content-stretch flex font-cairo font-medium items-center justify-between leading-[0] not-italic pb-[16px] relative shrink-0 text-[14px] text-[rgba(19,19,19,0.7)] w-full">
                      <div className="flex flex-col h-[16px] justify-center relative shrink-0 w-[255px]">
                        <p className="leading-[normal]">Auctions</p>
                      </div>
                      <div className="flex flex-col h-[16px] justify-center relative shrink-0 w-[67px]">
                        <p className="leading-[normal]">Current Bid</p>
                      </div>
                      <div className="flex flex-col h-[16px] justify-center relative shrink-0 w-[50px]">
                        <p className="leading-[normal]">Bidders</p>
                      </div>
                      <div className="flex flex-col h-[16px] justify-center relative shrink-0 w-[120px]">
                        <p className="leading-[normal]">Time Remaining</p>
                      </div>
                      <div className="flex flex-col h-[16px] justify-center relative shrink-0 w-[157px]">
                        <p className="leading-[normal]">Site</p>
                      </div>
                      <div className="flex flex-col h-[16px] justify-center relative shrink-0 w-[50px]">
                        <p className="leading-[normal]">Status</p>
                      </div>
                      <div className="flex flex-col justify-center relative shrink-0 whitespace-nowrap">
                        <p className="leading-[normal]">Action</p>
                      </div>
                    </div>
                    {auctions.length === 0 ? (
                      <div className="font-cairo font-semibold text-[14px] text-[rgba(19,19,19,0.4)]">No auctions match the current filters</div>
                    ) : (
                      auctions.map((a, i) => (
                        <div key={a.id} className={`${i < auctions.length - 1 ? "border-[#f5f5f5] border-b border-solid pb-[16px] " : ""}content-stretch flex items-start justify-between relative shrink-0 w-full`}>
                          <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-[255px]">
                            <div className="h-[40px] relative rounded-[8px] shrink-0 w-[66px]" data-name="_ (3) 1">
                              <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[8px] size-full" src={a.image} />
                            </div>
                            <div className="[word-break:break-word] content-stretch flex flex-col gap-[8px] items-start leading-[0] not-italic relative shrink-0 w-[174px]">
                              <div className="flex flex-col font-cairo font-semibold justify-center relative shrink-0 text-[#131313] text-[14px] w-full">
                                <p className="leading-[normal] overflow-hidden text-ellipsis whitespace-nowrap">{a.name}</p>
                              </div>
                              <div className="flex flex-col font-cairo font-medium h-[10px] justify-center relative shrink-0 text-[10px] text-[rgba(19,19,19,0.6)] w-full">
                                <p className="leading-[normal]">{a.subtitle}</p>
                              </div>
                            </div>
                          </div>
                          <div className="[word-break:break-word] flex flex-col font-cairo font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#131313] text-[14px] w-[67px]">
                            <p className="leading-[normal]">{a.currentBid}</p>
                          </div>
                          <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-[50px]">
                            <div className="[word-break:break-word] flex flex-col font-cairo font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#131313] text-[14px] whitespace-nowrap">
                              <p className="leading-[normal]">{a.bidders}</p>
                            </div>
                            <div className="content-stretch flex items-center relative shrink-0">
                              <BidderUpIcon />
                              <div className="[word-break:break-word] flex flex-col font-cairo font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#0cc60c] text-[10px] whitespace-nowrap">
                                <p className="leading-[normal]">+{a.biddersDelta}</p>
                              </div>
                            </div>
                          </div>
                          <div className="content-stretch flex flex-col gap-[11px] items-start relative shrink-0 w-[120px]">
                            <div className="[word-break:break-word] flex flex-col font-cairo font-semibold h-[11px] justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#131313] text-[10px] w-[min-content]">
                              <p className="leading-[normal]">{a.timeRemaining}</p>
                            </div>
                            <div className="relative h-[5px] w-[120px]">
                              <div className="absolute inset-0 rounded-full bg-[#f5f5f5]" />
                              <div className="absolute left-0 top-0 h-full rounded-full bg-[#28459d]" style={{ width: `${a.timeProgress * 100}%` }} />
                            </div>
                          </div>
                          <div className="[word-break:break-word] flex flex-col font-cairo font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#131313] text-[14px] w-[157px]">
                            <p className="leading-[normal]">{a.site}</p>
                          </div>
                          <div className="bg-[rgba(40,69,157,0.1)] content-stretch flex gap-[8px] items-center justify-center px-[12px] py-[4px] relative rounded-[24px] shrink-0">
                            <div className="[word-break:break-word] flex flex-col font-cairo font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#28459d] text-[10px] whitespace-nowrap">
                              <p className="leading-[normal]" dir="auto">
                                {a.status}
                              </p>
                            </div>
                          </div>
                          <div className="content-stretch flex items-center relative shrink-0 w-[36px]">
                            <ActionArrowButton
                              onClick={() => {
                                /* open auction details */
                              }}
                              label={`Open ${a.name}`}
                            />
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Reports */}
            <div className="content-stretch flex flex-col xl:flex-row gap-[16px] items-stretch xl:items-center relative shrink-0 w-full">
              <div className="bg-white content-stretch flex xl:flex-[1_0_0] flex-col items-start min-w-px p-[16px] relative rounded-[24px] w-full xl:w-auto">
                <div className="content-stretch flex flex-col gap-[20px] items-start justify-center overflow-clip relative shrink-0 w-full">
                  <div className="border-[#f5f5f5] border-b border-solid content-stretch flex gap-[5px] items-center pb-[16px] relative shrink-0 w-full">
                    <DeadlineIcon />
                    <div className="[word-break:break-word] flex flex-col font-cairo font-bold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#131313] text-[16px] w-[176px]">
                      <p className="leading-[normal]">Top Performing Materials</p>
                    </div>
                  </div>
                  <div className="[word-break:break-word] content-stretch flex flex-col gap-[8px] items-start leading-[0] not-italic relative shrink-0 text-[14px] w-full">
                    <div className="border-[#f5f5f5] border-b border-solid content-stretch flex font-cairo font-medium items-center justify-between pb-[16px] relative shrink-0 text-[rgba(19,19,19,0.7)] w-full">
                      <div className="flex flex-col justify-center relative shrink-0 whitespace-nowrap">
                        <p className="leading-[normal]">Rank</p>
                      </div>
                      <div className="flex flex-col h-[16px] justify-center relative shrink-0 w-[122px]">
                        <p className="leading-[normal]">Material</p>
                      </div>
                      <div className="flex flex-col justify-center relative shrink-0 w-[81px]">
                        <p className="leading-[normal]">Avg Price</p>
                      </div>
                      <div className="flex flex-col justify-center relative shrink-0 w-[74px]">
                        <p className="leading-[normal]">GMV</p>
                      </div>
                    </div>
                    {byRevenue.length === 0 ? (
                      <div className="font-cairo font-semibold text-[14px] text-[rgba(19,19,19,0.4)]">No data for the current filters</div>
                    ) : (
                      byRevenue.map((r, i) => (
                        <div key={r.material} className="border-[#f5f5f5] border-b border-solid content-stretch flex font-cairo font-semibold items-start justify-between pb-[16px] relative shrink-0 text-[#131313] w-full">
                          <div className="flex flex-col justify-center relative shrink-0 w-[31px]">
                            <p className="leading-[normal]">#{i + 1}</p>
                          </div>
                          <div className="flex flex-col justify-center relative shrink-0 w-[122px]">
                            <p className="leading-[normal]">{r.material}</p>
                          </div>
                          <div className="flex flex-col justify-center relative shrink-0 w-[81px]">
                            <p className="leading-[normal]">{Math.round(r.avgPrice).toLocaleString("en-US")} EGP/t</p>
                          </div>
                          <div className={`flex flex-col justify-center relative shrink-0 ${i === byRevenue.length - 1 ? "whitespace-nowrap" : "w-[74px]"}`}>
                            <p className="leading-[normal]">{formatGMV(r.gmv)}</p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
              <div className="bg-white content-stretch flex flex-col items-start overflow-clip relative rounded-[20px] shrink-0 w-full xl:w-[492px]" data-name="card">
                <div className="[word-break:break-word] content-stretch flex flex-col items-start not-italic overflow-clip p-[16px] relative shrink-0 w-full" data-name="card-header">
                  <p className="font-cairo font-bold leading-[37px] relative shrink-0 text-[16px] text-black w-full">Top Performing Materials by Fulfilled Quantity</p>
                  <p className="font-cairo font-normal leading-[23px] relative shrink-0 text-[#383838] text-[14px] tracking-[0.5px] w-full">Ranked by total GMV generated from completed auctions.</p>
                </div>
                <div className="content-stretch flex flex-col items-start justify-center overflow-clip pb-[16px] px-[16px] relative shrink-0 w-full" data-name="card-body">
                  {byQty.length === 0 ? (
                    <div className="font-cairo font-semibold text-[14px] text-[rgba(19,19,19,0.4)]">No data for the current filters</div>
                  ) : (
                    <div className="[word-break:break-word] content-stretch flex flex-col font-cairo font-semibold items-start leading-[normal] not-italic relative shrink-0 text-[14px] text-center text-white w-full" data-name="chart-graphic">
                      {byQty.map((r, i) => (
                        <div
                          key={r.material}
                          className={`content-stretch flex h-[43px] items-center justify-between overflow-clip px-[15px] py-[10px] relative shrink-0 ${i === 0 ? "rounded-tl-[6px] rounded-tr-[6px]" : i === byQty.length - 1 ? "rounded-bl-[6px] rounded-br-[6px]" : "rounded-br-[6px]"}`}
                          style={{ backgroundColor: BAR_COLORS[i % BAR_COLORS.length], width: `${Math.max(45, (r.qty / maxQty) * 100)}%` }}
                        >
                          <p className="relative shrink-0 whitespace-nowrap">{r.material}</p>
                          <p className="relative shrink-0 whitespace-nowrap">{formatTons(r.qty)} t</p>
                        </div>
                      ))}
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
