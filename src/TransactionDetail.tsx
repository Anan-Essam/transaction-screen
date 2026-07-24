import { useState } from "react";
import linesGreen from "./assets/figma/linesGreen.svg";
import linesOrange from "./assets/figma/linesOrange.svg";
import SideBar from "./components/SideBar";
import { UserProfile, TopBar } from "./MoneyTransactions";
import { Plus } from "./components/icons";
import { BackArrowIcon, CircleChevronButton, TagIcon, ProfileIcon, Calendar12Icon, BannerDivider, AgreementIcon, ProductIcon } from "./components/icons2";
import type { InstallmentRecord, PaymentRecord } from "./data";
import type { SideBarPage } from "./components/SideBar";

type ProductStatus = "Done" | "In fulfilment";

export type DetailProduct = {
  name: string;
  status: ProductStatus;
  committed: string;
  fulfilled: string;
  remaining: string;
};

export const DETAIL_PRODUCTS: DetailProduct[] = [
  { name: "Iron Scrap", status: "Done", committed: "40.0 t", fulfilled: "0", remaining: "0" },
  { name: "Iron Scrap", status: "In fulfilment", committed: "40.0 t", fulfilled: "28.5 t", remaining: "11.5 t" },
  { name: "Iron Scrap", status: "Done", committed: "40.0 t", fulfilled: "0", remaining: "0" },
  { name: "Iron Scrap", status: "In fulfilment", committed: "40.0 t", fulfilled: "28.5 t", remaining: "11.5 t" },
  { name: "Iron Scrap", status: "Done", committed: "40.0 t", fulfilled: "0", remaining: "0" },
  { name: "Iron Scrap", status: "Done", committed: "40.0 t", fulfilled: "0", remaining: "0" },
  { name: "Iron Scrap", status: "Done", committed: "40.0 t", fulfilled: "0", remaining: "0" },
  { name: "Iron Scrap", status: "Done", committed: "40.0 t", fulfilled: "0", remaining: "0" },
];

/* Animated expand/collapse container (grid-rows transition) */
function Collapsible({ open, children }: { open: boolean; children: React.ReactNode }) {
  return (
    <div className={`grid w-full transition-[grid-template-rows] duration-300 ease-in-out ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
      <div className="overflow-hidden min-h-0 w-full">{children}</div>
    </div>
  );
}

/* Ledger-style record row: id | label | date */
function RecordRow({ id, label, date, last }: { id: string; label: string; date: string; last: boolean }) {
  return (
    <div className={`${last ? "" : "border-[#f5f5f5] border-b border-solid pb-[8px] "}content-stretch flex flex-wrap gap-y-[4px] items-center justify-between relative shrink-0 w-full`}>
      <div className="content-stretch flex gap-[16px] md:gap-[40px] items-start justify-center relative shrink-0">
        <div className="capitalize flex flex-col font-cairo font-medium justify-center relative shrink-0 text-[rgba(19,19,19,0.5)]">
          <p className="leading-[normal]">{id}</p>
        </div>
        <div className="flex flex-col font-cairo font-semibold justify-center relative shrink-0 text-[#131313]">
          <p className="leading-[normal]">{label}</p>
        </div>
      </div>
      <div className="flex flex-col font-cairo font-semibold justify-center relative shrink-0 text-[#131313]">
        <p className="leading-[normal]">{date}</p>
      </div>
    </div>
  );
}

type BannerStat = { dotColor: string; label: string; value: string; note: string; noteColor: string };

/* "Stats Row" cell with colored square dot */
function StatCell({ stat, last, fixedLabelWidth }: { stat: BannerStat; last?: boolean; fixedLabelWidth?: boolean }) {
  return (
    <div
      className={`bg-white ${last ? "rounded-[12px]" : "xl:border-[#f5f5f5] xl:border-r border-solid"} content-stretch flex xl:flex-[1_0_0] gap-[8px] items-start min-w-px p-[12px] relative w-full xl:w-auto`}
    >
      <div className="content-stretch flex items-center py-[4px] relative shrink-0">
        <div className="relative rounded-[2px] shrink-0 size-[8px]" style={{ backgroundColor: stat.dotColor }} />
      </div>
      <div className={`[word-break:break-word] content-stretch flex ${fixedLabelWidth ? "" : "flex-[1_0_0] min-w-px "}flex-col gap-[8px] items-start leading-[normal] not-italic relative shrink-0`}>
        <div className={`content-stretch flex flex-col gap-[4px] items-center justify-center relative shrink-0 ${fixedLabelWidth ? "w-[115px]" : "w-full"}`} data-name="Nested Frame">
          <p className="font-['Inter',sans-serif] font-normal relative shrink-0 text-[#828282] text-[12px] w-full">{stat.label}</p>
          <p className="font-cairo font-bold relative shrink-0 text-[#131313] text-[18px] w-full">{stat.value}</p>
        </div>
        <p className="font-['Inter',sans-serif] font-normal relative shrink-0 text-[10px] whitespace-nowrap" style={{ color: stat.noteColor }}>
          {stat.note}
        </p>
      </div>
    </div>
  );
}

/* Product card in "Quantity (Waste) Transaction" — collapsible with animated height */
function ProductCard({ product, installments }: { product: DetailProduct; installments: InstallmentRecord[] }) {
  const [open, setOpen] = useState(false);
  const done = product.status === "Done";
  return (
    <div className="bg-white border border-[#f5f5f5] border-solid content-stretch flex flex-col gap-[16px] items-start p-[16px] relative rounded-[28px] shrink-0 w-full">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`${open ? "border-[#f5f5f5] border-b border-solid " : ""}content-stretch flex flex-col md:flex-row gap-[12px] md:gap-0 items-start md:items-center justify-between p-[8px] relative shrink-0 w-full cursor-pointer text-left`}
      >
        <div className="content-stretch flex gap-[12px] items-center relative shrink-0">
          <div className="[word-break:break-word] flex flex-col font-cairo font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-[rgba(19,19,19,0.7)] whitespace-nowrap">
            <p className="leading-[normal]" dir="auto">
              {product.name}
            </p>
          </div>
          <div className={`${done ? "bg-[rgba(27,158,116,0.1)]" : "bg-[rgba(249,160,0,0.1)]"} content-stretch flex items-center justify-center px-[16px] py-[4px] relative rounded-[24px] shrink-0`}>
            <div className={`[word-break:break-word] flex flex-col font-cairo font-bold justify-center leading-[0] not-italic relative shrink-0 ${done ? "text-[#1b9e74]" : "text-[#f9a000]"} text-[10px] whitespace-nowrap`}>
              <p className="leading-[normal]">{product.status}</p>
            </div>
          </div>
        </div>
        <div className="content-stretch flex flex-wrap gap-[28px] items-center relative shrink-0">
          <div className="[word-break:break-word] content-stretch flex gap-[40px] items-start leading-[0] not-italic relative shrink-0 text-[14px]">
            <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-[64px]">
              <div className="flex flex-col font-cairo font-medium h-[16px] justify-center relative shrink-0 text-[rgba(19,19,19,0.5)] w-[66px]">
                <p className="leading-[normal]">Committed</p>
              </div>
              <div className="flex flex-col font-cairo font-semibold h-[16px] justify-center min-w-full relative shrink-0 text-[#131313] w-[min-content]">
                <p className="leading-[normal]">{product.committed}</p>
              </div>
            </div>
            <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-[47px]">
              <div className="flex flex-col font-cairo font-medium h-[16px] justify-center relative shrink-0 text-[rgba(19,19,19,0.5)] w-full">
                <p className="leading-[normal]">Fulfilled</p>
              </div>
              <div className="flex flex-col font-cairo font-semibold h-[16px] justify-center relative shrink-0 text-[#1b9e74] w-full">
                <p className="leading-[normal]">{product.fulfilled}</p>
              </div>
            </div>
            <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-[64px]">
              <div className="flex flex-col font-cairo font-medium h-[16px] justify-center relative shrink-0 text-[rgba(19,19,19,0.5)] w-full">
                <p className="leading-[normal]">Remaining</p>
              </div>
              <div className="flex flex-col font-cairo font-semibold h-[16px] justify-center relative shrink-0 text-[#131313] w-full">
                <p className="leading-[normal]">{product.remaining}</p>
              </div>
            </div>
          </div>
          <div className="content-stretch flex flex-col h-[0.197px] items-end justify-center relative shrink-0 w-[119.5px]" data-name="Lines Container">
            {done ? (
              <div className="h-[0.104px] relative shrink-0 w-full" data-name="Lines">
                <div className="absolute inset-[-4386.88%_0_0_0]">
                  <img alt="" className="block max-w-none size-full" src={linesGreen} />
                </div>
              </div>
            ) : (
              <div className="h-[0.197px] relative shrink-0 w-full" data-name="Lines">
                <div className="absolute inset-[-2299.48%_0_0_0]">
                  <img alt="" className="block max-w-none size-full" src={linesOrange} />
                </div>
              </div>
            )}
          </div>
          <CircleChevronButton expanded={open} />
        </div>
      </button>
      <Collapsible open={open}>
        <div className="[word-break:break-word] bg-[#f9f9f9] content-stretch flex flex-col gap-[8px] items-start leading-[0] not-italic p-[8px] relative rounded-[12px] text-[16px] w-full whitespace-nowrap">
          {installments.map((r, i) => (
            <RecordRow key={i} id={r.paymentId} label={r.label} date={r.date} last={i === installments.length - 1} />
          ))}
        </div>
      </Collapsible>
    </div>
  );
}

type WasteTransactionsProps = {
  payments: PaymentRecord[];
  installments: InstallmentRecord[];
  onBack: () => void;
  onAddMoney: () => void;
  onAddWaste: () => void;
  onNavigate: (page: SideBarPage) => void;
};

/* "Waste Transactions" — Transaction Detail View (Figma 537:13657) */
export default function WasteTransactions({ payments, installments, onBack, onAddMoney, onAddWaste, onNavigate }: WasteTransactionsProps) {
  const [historyOpen, setHistoryOpen] = useState(true);

  return (
    <div className="bg-[#f5f5f5] content-stretch flex flex-col items-start min-h-screen p-[24px] relative w-full" data-name="Waste Transactions">
      <div className="content-stretch flex flex-col lg:flex-row gap-[16px] items-start lg:justify-center relative shrink-0 w-full max-w-[1392px] mx-auto" data-name="Sidebar Container">
        <div className="content-stretch flex lg:h-[969px] items-start relative shrink-0 w-full lg:w-auto">
          <div className="content-stretch flex flex-col gap-[24px] lg:h-full items-start relative shrink-0 w-full lg:w-[201px]">
            <UserProfile />
            <SideBar className="lg:h-[940px] relative shrink-0 w-full lg:w-[200px]" active="transaction" onNavigate={onNavigate} />
          </div>
        </div>
        <div className="content-stretch flex flex-[1_0_0] flex-col gap-[19px] items-start min-w-px relative w-full lg:w-auto lg:max-w-[1159px]">
          <TopBar />
          <div className="content-stretch flex items-start justify-end relative shrink-0 w-full">
            <div className="content-stretch flex flex-[1_0_0] flex-col gap-[24px] items-start min-w-px relative">
              <div className="content-stretch flex flex-col gap-[12px] items-start justify-center relative shrink-0 w-full" data-name="Auction Details">
                <div className="content-stretch flex items-center relative shrink-0" data-name="Auction Name Container">
                  <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Auction Name and Arrow">
                    <button type="button" onClick={onBack} className="cursor-pointer" aria-label="Back to transactions">
                      <BackArrowIcon />
                    </button>
                    <div className="content-stretch flex gap-[16px] items-center relative shrink-0">
                      <div className="[word-break:break-word] flex flex-col font-cairo font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#131313] text-[18px] whitespace-nowrap">
                        <p>
                          <span className="leading-[normal]">{`Transaction `}</span>
                          <span className="[word-break:break-word] font-cairo font-bold leading-[normal] not-italic">#W-1024</span>
                        </p>
                      </div>
                      <div className="bg-[rgba(130,130,130,0.1)] content-stretch flex items-center justify-center px-[16px] py-[8px] relative rounded-[24px] shrink-0">
                        <div className="[word-break:break-word] flex flex-col font-cairo font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#828282] text-[10px] whitespace-nowrap">
                          <p className="leading-[normal]">Open</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-[#28459d] content-stretch flex flex-col md:flex-row gap-[16px] md:gap-[8px] items-start p-[16px] relative rounded-[16px] shrink-0 w-full">
                  <div className="content-stretch flex flex-[1_0_0] flex-col gap-[12px] items-start min-w-px relative w-full md:w-auto">
                    <div className="content-stretch flex flex-wrap md:flex-nowrap gap-[12px] items-center relative shrink-0 w-full md:w-[307px]">
                      <div className="content-stretch flex gap-[4px] h-[24px] items-center relative shrink-0">
                        <TagIcon />
                        <div className="[word-break:break-word] flex flex-col font-cairo font-bold justify-center leading-[0] not-italic relative shrink-0 text-[18px] text-white whitespace-nowrap">
                          <p className="leading-[normal]">Auction ID: #AUC-4521</p>
                        </div>
                      </div>
                      <BannerDivider />
                      <div className="content-stretch flex gap-[4px] h-[24px] items-center relative shrink-0">
                        <ProfileIcon />
                        <div className="[word-break:break-word] flex flex-col font-cairo font-bold justify-center leading-[0] not-italic relative shrink-0 text-[18px] text-white whitespace-nowrap">
                          <p className="leading-[normal]">Buyer #3</p>
                        </div>
                      </div>
                      <BannerDivider />
                      <div className="bg-[rgba(255,255,255,0.1)] content-stretch flex items-center justify-center px-[16px] py-[2px] relative rounded-[24px] shrink-0">
                        <div className="[word-break:break-word] flex flex-col font-cairo font-bold justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">
                          <p className="leading-[normal]">Money Transaction</p>
                        </div>
                      </div>
                    </div>
                    <div className="[word-break:break-word] content-stretch flex flex-wrap font-cairo font-semibold gap-[8px] items-center leading-[0] not-italic relative shrink-0 text-[rgba(255,255,255,0.8)] whitespace-nowrap" data-name="Auction ID">
                      <div className="flex flex-col justify-center relative shrink-0 text-[18px]">
                        <p className="leading-[20px]">10 items</p>
                      </div>
                      <div className="flex flex-col justify-center relative shrink-0 text-[20px]">
                        <p className="leading-[20px]">.</p>
                      </div>
                      <div className="flex flex-col justify-center relative shrink-0 text-[18px]">
                        <p className="leading-[20px]">1,000 Ton released</p>
                      </div>
                      <div className="flex flex-col justify-center relative shrink-0 text-[20px]">
                        <p className="leading-[20px]">.</p>
                      </div>
                      <div className="flex flex-col justify-center relative shrink-0 text-[18px]">
                        <p className="leading-[20px]">4,250,000 EGP Awarded Bid Value</p>
                      </div>
                    </div>
                  </div>
                  <div className="content-stretch flex flex-col items-start justify-between relative self-stretch shrink-0 gap-[8px] md:gap-0" data-name="Auction ID">
                    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
                      <div className="content-stretch flex gap-[4.8px] items-center relative shrink-0" data-name="Right Icons">
                        <Calendar12Icon />
                      </div>
                      <div className="[word-break:break-word] flex flex-col font-cairo font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[18px] text-[rgba(255,255,255,0.8)] whitespace-nowrap">
                        <p className="leading-[20px]">Transaction Time</p>
                      </div>
                    </div>
                    <div className="[word-break:break-word] flex flex-col font-cairo font-bold justify-center leading-[0] not-italic relative shrink-0 text-[18px] text-[rgba(255,255,255,0.9)] whitespace-nowrap">
                      <p className="leading-[20px]">27 Jun 2026 · 11:45 AM</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Money Transaction Details */}
              <div className="bg-white content-stretch flex flex-col items-start relative rounded-[24px] shrink-0 w-full" data-name="Bid Item Info">
                <div className="content-stretch flex items-start p-[16px] relative shrink-0 w-full" data-name="Bid Item">
                  <div className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-center min-w-px overflow-clip relative" data-name="Bid Item Vertical">
                    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
                      <div className="border-[#f5f5f5] border-b border-solid content-stretch flex flex-col md:flex-row gap-[12px] md:gap-0 items-start md:items-center justify-between pb-[12px] relative shrink-0 w-full" data-name="Bid Item Horizontal">
                        <div className="content-stretch flex flex-wrap gap-[24px] items-center relative min-w-0" data-name="Bid History Icon">
                          <div className="content-stretch flex flex-wrap gap-[5px] items-center relative min-w-0">
                            <AgreementIcon />
                            <div className="[word-break:break-word] content-stretch flex flex-wrap gap-[8px] md:h-[21px] items-center md:justify-center leading-[0] not-italic relative min-w-0" data-name="Bid Information">
                              <div className="flex flex-col font-cairo font-bold justify-center relative shrink-0 text-[#131313] text-[18px]">
                                <p className="leading-[normal]">Money Transaction Details</p>
                              </div>
                              <div className="flex flex-col font-cairo font-medium justify-center relative shrink-0 text-[16px] text-[rgba(19,19,19,0.7)]">
                                <p className="leading-[normal]">{payments.length + 6} Transaction</p>
                              </div>
                            </div>
                          </div>
                          <div className="bg-[rgba(27,158,116,0.1)] content-stretch flex items-center justify-center px-[16px] py-[4px] relative rounded-[24px] shrink-0">
                            <div className="[word-break:break-word] flex flex-col font-cairo font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#1b9e74] text-[10px] whitespace-nowrap">
                              <p className="leading-[normal]">Completed</p>
                            </div>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={onAddMoney}
                          className="bg-[#1b9e74] content-stretch flex gap-[4px] h-[40px] items-center justify-center px-[16px] py-[8px] relative rounded-[24px] shrink-0 cursor-pointer"
                          data-name="Create Auction Button Container"
                        >
                          <Plus className="overflow-clip relative shrink-0 size-[16px]" />
                          <div className="[word-break:break-word] flex flex-col font-cairo font-bold justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap">
                            <p className="leading-[normal] whitespace-pre">{`Add  Money Transaction`}</p>
                          </div>
                        </button>
                      </div>
                      <div className="content-stretch flex flex-col xl:flex-row gap-[16px] xl:gap-[64px] items-center justify-center relative shrink-0 w-full" data-name="Stats Row">
                        <StatCell stat={{ dotColor: "#28459d", label: "Awarded Bid Value", value: "4,250,000 EGP", note: "142 awarded bids", noteColor: "#28459d" }} fixedLabelWidth />
                        <StatCell stat={{ dotColor: "#1b9e74", label: "Payments Received", value: "3,203,700 EGP", note: "75.4% of awarded value", noteColor: "#1b9e74" }} />
                        <StatCell stat={{ dotColor: "#da1414", label: "Outstanding Balance", value: "1,046,300 EGP", note: "177,000 EGP overdue 90+ days", noteColor: "#a66c05" }} last />
                      </div>
                    </div>
                    <div className="bg-white border border-[#f5f5f5] border-solid content-stretch flex flex-col gap-[16px] items-start p-[16px] relative rounded-[28px] shrink-0 w-full">
                      <button type="button" onClick={() => setHistoryOpen((o) => !o)} className="content-stretch flex items-center justify-between relative shrink-0 w-full cursor-pointer">
                        <div className="[word-break:break-word] flex flex-col font-cairo font-bold justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-[rgba(19,19,19,0.7)] whitespace-nowrap">
                          <p className="leading-[normal]" dir="auto">
                            Payment History
                          </p>
                        </div>
                        <CircleChevronButton expanded={historyOpen} />
                      </button>
                      <Collapsible open={historyOpen}>
                        <div className="[word-break:break-word] bg-[#f9f9f9] content-stretch flex flex-col gap-[8px] items-start leading-[0] not-italic p-[8px] relative rounded-[12px] text-[16px] w-full whitespace-nowrap">
                          {payments.map((r, i) => (
                            <RecordRow key={i} id={r.paymentId} label={r.amount} date={r.date} last={i === payments.length - 1} />
                          ))}
                        </div>
                      </Collapsible>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quantity (Waste) Transaction */}
              <div className="bg-white content-stretch flex flex-col items-start relative rounded-[24px] shrink-0 w-full" data-name="Bid Item Info">
                <div className="content-stretch flex items-start p-[16px] relative shrink-0 w-full" data-name="Bid Item">
                  <div className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-center min-w-px overflow-clip relative" data-name="Bid Item Vertical">
                    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
                      <div className="border-[#f5f5f5] border-b border-solid content-stretch flex flex-col md:flex-row gap-[12px] md:gap-0 items-start md:items-center justify-between pb-[16px] relative shrink-0 w-full" data-name="Bid Item Horizontal">
                        <div className="content-stretch flex flex-wrap gap-[5px] items-center relative min-w-0" data-name="Bid History Icon">
                          <ProductIcon size={14} />
                          <div className="[word-break:break-word] content-stretch flex flex-wrap gap-[8px] md:h-[21px] items-center md:justify-center leading-[0] not-italic relative min-w-0" data-name="Bid Information">
                            <div className="flex flex-col font-cairo font-bold justify-center relative shrink-0 text-[#131313] text-[18px]">
                              <p className="leading-[normal]">Quantity (Waste) Transaction</p>
                            </div>
                            <div className="flex flex-col font-cairo font-medium justify-center relative shrink-0 text-[16px] text-[rgba(19,19,19,0.7)]">
                              <p className="leading-[normal]">{DETAIL_PRODUCTS.length + 2} Products</p>
                            </div>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={onAddWaste}
                          className="bg-[#1b9e74] content-stretch flex gap-[4px] h-[40px] items-center justify-center px-[16px] py-[8px] relative rounded-[24px] shrink-0 cursor-pointer"
                          data-name="Create Auction Button Container"
                        >
                          <Plus className="overflow-clip relative shrink-0 size-[16px]" />
                          <div className="[word-break:break-word] flex flex-col font-cairo font-bold justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap">
                            <p className="leading-[normal]">Add Waste Transaction</p>
                          </div>
                        </button>
                      </div>
                      <div className="content-stretch flex flex-col xl:flex-row gap-[16px] xl:gap-[64px] items-center justify-center relative shrink-0 w-full" data-name="Stats Row">
                        <StatCell stat={{ dotColor: "#28459d", label: "Awarded Quantity", value: "386.4 tons", note: "Across 142 awarded bids", noteColor: "#666464" }} fixedLabelWidth />
                        <StatCell stat={{ dotColor: "#1b9e74", label: "Released Quantity", value: "305.1 tons", note: "78.9% left the hubs", noteColor: "#666464" }} />
                        <StatCell stat={{ dotColor: "#da1414", label: "Remaining in Hubs", value: "81.3 tons", note: "Storage cost exposure", noteColor: "#666464" }} last />
                      </div>
                    </div>
                    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
                      {DETAIL_PRODUCTS.map((p, i) => (
                        <ProductCard key={i} product={p} installments={installments} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
