import { useState } from "react";
import imgGroup17 from "../assets/figma/imgGroup17.svg";
import { LedgerIcon, CloudDownloadIcon, VuesaxLinearEye, CreateAuctionIcon } from "./icons";

type TransactionType = "Waste" | "Money";
type TransactionStatus = "Active" | "Closed";

type Transaction = {
  paymentId: string;
  buyer: string;
  auction: string;
  product: string;
  type: TransactionType;
  date: string;
  paymentAmount: string;
  committedQty: string;
  status: TransactionStatus;
  editDisabled?: boolean;
};

const TRANSACTIONS: Transaction[] = [
  { paymentId: "PO-2041", buyer: "Buyer #3", auction: "Auction #102", product: "Iron Scrap", type: "Waste", date: "27 Jun 2026", paymentAmount: "-", committedQty: "1,000 kg", status: "Active" },
  { paymentId: "MT-2041", buyer: "Buyer #3", auction: "Auction #102", product: "Buyer-level settlement", type: "Money", date: "27 Jun 2026", paymentAmount: "200,500 EGP", committedQty: "-", status: "Closed", editDisabled: true },
  { paymentId: "PO-2041", buyer: "Buyer #3", auction: "Auction #102", product: "Iron Scrap", type: "Waste", date: "27 Jun 2026", paymentAmount: "-", committedQty: "1,000 kg", status: "Active" },
  { paymentId: "PO-2041", buyer: "Buyer #3", auction: "Auction #102", product: "Iron Scrap", type: "Waste", date: "27 Jun 2026", paymentAmount: "-", committedQty: "1,000 kg", status: "Closed" },
  { paymentId: "MT-2041", buyer: "Buyer #3", auction: "Auction #102", product: "Buyer-level settlement", type: "Money", date: "27 Jun 2026", paymentAmount: "200,500 EGP", committedQty: "-", status: "Active" },
  { paymentId: "PO-2041", buyer: "Buyer #3", auction: "Auction #102", product: "Iron Scrap", type: "Waste", date: "27 Jun 2026", paymentAmount: "-", committedQty: "1,000 kg", status: "Active" },
  { paymentId: "MT-2041", buyer: "Buyer #3", auction: "Auction #102", product: "Buyer-level settlement", type: "Money", date: "27 Jun 2026", paymentAmount: "200,500 EGP", committedQty: "-", status: "Active" },
  { paymentId: "MT-2041", buyer: "Buyer #3", auction: "Auction #102", product: "Buyer-level settlement", type: "Money", date: "27 Jun 2026", paymentAmount: "200,500 EGP", committedQty: "-", status: "Closed" },
  { paymentId: "PO-2041", buyer: "Buyer #3", auction: "Auction #102", product: "Iron Scrap", type: "Waste", date: "27 Jun 2026", paymentAmount: "-", committedQty: "1,000 kg", status: "Active" },
];

const CATEGORY_TABS = [
  { label: "All", textClassName: "w-[18px]" },
  { label: "Money", textClassName: "w-[47px]" },
  { label: "Waste ", textClassName: "w-[44px]" },
] as const;

type CategoryTabProps = {
  label: string;
  textClassName: string;
  active: boolean;
  onClick: () => void;
};

/* "Category Tab" */
function CategoryTab({ label, textClassName, active, onClick }: CategoryTabProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${active ? "bg-[#28459d]" : "bg-[rgba(245,245,245,0.2)]"} content-stretch flex h-[28px] items-center justify-center px-[16px] py-[4px] relative rounded-[24px] shrink-0 cursor-pointer`}
      data-name="Category Tab"
    >
      <div
        className={`[word-break:break-word] flex flex-col font-cairo ${active ? "font-bold text-white" : "font-medium text-[#828282]"} h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[16px] ${textClassName}`}
      >
        <p className="leading-[normal]">{label}</p>
      </div>
    </button>
  );
}

/* Type / Status pill — "Frame 36" (Waste), "Frame 2085663935" (Money), "Frame 35" (Active), "Frame 2085663933" (Closed) */
function Badge({ label, color, fixedWidth }: { label: string; color: "green" | "blue" | "gray"; fixedWidth?: boolean }) {
  const colors = {
    green: "bg-[rgba(27,158,116,0.1)] text-[#1b9e74]",
    blue: "bg-[rgba(40,69,157,0.1)] text-[#28459d]",
    gray: "bg-[rgba(130,130,130,0.1)] text-[#828282]",
  } as const;
  const [bg, text] = colors[color].split(" ") as [string, string];
  return (
    <div className={`${bg} content-stretch flex items-center justify-center px-[16px] py-[8px] relative rounded-[24px] shrink-0 ${fixedWidth ? "w-[61px]" : ""}`}>
      <div className={`[word-break:break-word] flex flex-col font-cairo font-bold justify-center leading-[0] not-italic relative shrink-0 ${text} text-[10px] whitespace-nowrap`}>
        <p className="leading-[normal]">{label}</p>
      </div>
    </div>
  );
}

/* "Bid Row" */
function BidRow({ transaction, striped }: { transaction: Transaction; striped: boolean }) {
  const t = transaction;
  return (
    <div className={`${striped ? "bg-[#f9f9f9] " : ""}content-stretch flex items-center justify-between p-[8px] relative shrink-0 w-full`} data-name="Bid Row">
      <div className="[word-break:break-word] flex flex-col font-cairo font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#131313] text-[14px] w-[69px]">
        <p className="leading-[normal]">{t.paymentId}</p>
      </div>
      <div className="[word-break:break-word] flex flex-col font-cairo font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#131313] text-[14px] whitespace-nowrap">
        <p className="leading-[normal]">{t.buyer}</p>
      </div>
      <div className="[word-break:break-word] flex flex-col font-cairo font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#131313] text-[14px] w-[80px]">
        <p className="leading-[normal]">{t.auction}</p>
      </div>
      {t.type === "Waste" ? (
        <div className="[word-break:break-word] flex flex-col font-cairo font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#131313] text-[14px] w-[117px]">
          <p className="leading-[normal]">{t.product}</p>
        </div>
      ) : (
        <div className="[word-break:break-word] flex flex-col font-cairo font-medium justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-[rgba(19,19,19,0.6)] whitespace-nowrap">
          <p className="leading-[normal]">{t.product}</p>
        </div>
      )}
      <Badge label={t.type} color={t.type === "Waste" ? "green" : "blue"} fixedWidth={t.type === "Waste"} />
      <div className="[word-break:break-word] flex flex-col font-cairo font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#131313] text-[14px] whitespace-nowrap">
        <p className="leading-[normal]">{t.date}</p>
      </div>
      <div className="[word-break:break-word] flex flex-col font-cairo font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#131313] text-[14px] w-[104px]">
        <p className="leading-[normal]" dir="auto">
          {t.paymentAmount}
        </p>
      </div>
      <div className="[word-break:break-word] flex flex-col font-cairo font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#131313] text-[14px] w-[90px]">
        <p className="leading-[normal]" dir="auto">
          {t.committedQty}
        </p>
      </div>
      <Badge label={t.status} color={t.status === "Active" ? "green" : "gray"} fixedWidth={t.status === "Active"} />
      <div className="content-stretch flex gap-[8px] items-center py-[2px] relative shrink-0" data-name="Iconex/Light/Lock">
        <button
          type="button"
          onClick={() => {
            /* view transaction details */
          }}
          className="bg-[rgba(40,69,157,0.08)] content-stretch flex flex-col items-center justify-center overflow-clip p-[8px] relative rounded-[32px] shrink-0 size-[28px] cursor-pointer"
          data-name="arrow btn"
          aria-label="View transaction"
        >
          <VuesaxLinearEye className="relative shrink-0 size-[20px]" />
        </button>
        <button
          type="button"
          disabled={t.editDisabled}
          onClick={() => {
            /* add payment / movement for this transaction */
          }}
          className={`bg-[rgba(218,218,218,0.5)] content-stretch flex flex-col items-center justify-center ${t.editDisabled ? "opacity-30 " : ""}overflow-clip p-[8px] relative rounded-[32px] shrink-0 size-[28px] cursor-pointer disabled:cursor-default`}
          data-name="arrow btn"
          aria-label="Add to transaction"
        >
          <CreateAuctionIcon />
        </button>
      </div>
    </div>
  );
}

/* "Bidding Headers" */
function BiddingHeaders() {
  return (
    <div className="[word-break:break-word] border-[#f5f5f5] border-b border-solid content-stretch flex font-cairo font-medium items-center justify-between leading-[0] not-italic p-[8px] relative shrink-0 text-[14px] text-[rgba(19,19,19,0.7)] w-full" data-name="Bidding Headers">
      <div className="flex flex-col justify-center relative shrink-0 whitespace-nowrap">
        <p className="leading-[normal]">Payment ID</p>
      </div>
      <div className="flex flex-col h-[16px] justify-center relative shrink-0 w-[54px]">
        <p className="leading-[normal]">Buyer</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0 w-[80px]">
        <p className="leading-[normal]">Auction</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0 w-[117px]">
        <p className="leading-[normal]">Product</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0 w-[61px]">
        <p className="leading-[normal]">Type</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0 w-[73px]">
        <p className="leading-[normal]">{` Date`}</p>
      </div>
      <div className="capitalize flex flex-col justify-center relative shrink-0 whitespace-nowrap">
        <p className="leading-[normal]">Payment Amount</p>
      </div>
      <div className="capitalize flex flex-col justify-center relative shrink-0 whitespace-nowrap">
        <p className="leading-[normal]">Committed Qty</p>
      </div>
      <div className="capitalize flex flex-col justify-center relative shrink-0 w-[55px]">
        <p className="leading-[normal]">Status</p>
      </div>
      <div className="capitalize flex flex-col justify-center relative shrink-0 w-[64px]">
        <p className="leading-[normal]">Action</p>
      </div>
    </div>
  );
}

/* "Bid Item Info" — movement & money ledger card */
export default function BidItemInfo() {
  const [activeTab, setActiveTab] = useState<string>("All");

  const visibleTransactions = TRANSACTIONS.filter((t) => activeTab === "All" || t.type === activeTab.trim());

  return (
    <div className="bg-white content-stretch flex flex-col lg:h-[753px] items-start relative rounded-[24px] shrink-0 w-full" data-name="Bid Item Info">
      <div className="content-stretch flex items-start p-[16px] relative shrink-0 w-full" data-name="Bid Item">
        <div className="content-stretch flex flex-[1_0_0] flex-col gap-[24px] items-center min-w-px overflow-clip relative" data-name="Bid Item Vertical">
          <div className="border-[#f5f5f5] border-b border-solid content-stretch flex flex-col md:flex-row gap-[16px] md:gap-0 items-start md:items-center justify-between pb-[16px] relative shrink-0 w-full" data-name="Bid Item Horizontal">
            <div className="content-stretch flex flex-wrap gap-[5px] md:h-[32px] items-center relative shrink-0" data-name="Bid History Icon">
              <LedgerIcon />
              <div className="content-stretch flex flex-wrap gap-[24px] items-center justify-center relative shrink-0" data-name="Bid Information">
                <div className="[word-break:break-word] flex flex-col font-cairo font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#131313] text-[20px] whitespace-nowrap">
                  <p className="leading-[normal]">{`Movement & money ledger`}</p>
                </div>
                <div className="content-stretch flex gap-[14px] items-center overflow-clip relative shrink-0" data-name="Category Tabs Container">
                  {CATEGORY_TABS.map((tab) => (
                    <CategoryTab
                      key={tab.label}
                      label={tab.label}
                      textClassName={tab.textClassName}
                      active={activeTab === tab.label}
                      onClick={() => setActiveTab(tab.label)}
                    />
                  ))}
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                /* export ledger as file */
              }}
              className="bg-[rgba(40,69,157,0.1)] content-stretch flex gap-[8px] items-center pl-[8px] pr-[4px] py-[4px] relative rounded-[24px] shrink-0 cursor-pointer"
            >
              <div className="[word-break:break-word] flex flex-col font-cairo font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#28459d] text-[14px] whitespace-nowrap">
                <p className="leading-[normal]" dir="auto">
                  Export
                </p>
              </div>
              <CloudDownloadIcon />
            </button>
          </div>
          <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full overflow-x-auto" data-name="Bidding List">
            <div className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-w-[1111px] relative" data-name="Bidding Vertical">
              <BiddingHeaders />
              <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
                {visibleTransactions.map((t, i) => (
                  <BidRow key={i} transaction={t} striped={i % 2 === 1} />
                ))}
              </div>
            </div>
            <div className="h-[613px] relative shrink-0 w-0 hidden lg:block" data-name="Group 1">
              <div className="absolute h-[613px] left-[-2px] top-0 w-[4px]">
                <img alt="" className="block max-w-none size-full" src={imgGroup17} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
