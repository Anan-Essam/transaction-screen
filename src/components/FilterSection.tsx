import { useState } from "react";
import { SearchIcon, ClearIcon, CalendarIcon, Plus } from "./icons";

function formatDate(iso: string): string {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }).replace(/ /g, " ");
}

/* "Filter Section" */
export default function FilterSection() {
  const [search, setSearch] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  return (
    <div className="bg-white content-stretch flex flex-col items-start overflow-clip p-[16px] relative rounded-[24px] shrink-0 w-full" data-name="Filter Section">
      <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Filter Container">
        <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Filter Box">
          <div className="content-stretch flex flex-col lg:flex-row gap-[16px] items-stretch lg:items-center relative shrink-0 w-full" data-name="Filter Row">
            <div className="bg-[#f9f9f9] content-stretch flex flex-col md:flex-row lg:flex-[1_0_0] gap-[16px] items-stretch md:items-center min-w-px p-[8px] relative rounded-[40px]" data-name="Filter Input Container">
              <div className="bg-white border border-[#dadada] border-solid content-stretch flex md:flex-[1_0_0] h-[40px] items-center justify-between min-w-px px-[16px] py-[11px] relative rounded-[24px]" data-name="Search Input Container">
                <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-w-px relative" data-name="Search Icon Container">
                  <SearchIcon />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search Here By Product Name Or Buyer Handel"
                    className="[word-break:break-word] bg-transparent border-none outline-none font-cairo font-normal leading-[18px] relative flex-[1_0_0] min-w-px text-[#131313] text-[12px] placeholder:text-[rgba(19,19,19,0.7)]"
                  />
                </div>
                <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Right Icons">
                  <button type="button" onClick={() => setSearch("")} className="cursor-pointer" aria-label="Clear search">
                    <ClearIcon />
                  </button>
                </div>
              </div>
              <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Date Picker Container">
                <label className="bg-white border border-[#dadada] border-solid content-stretch flex flex-col h-[40px] items-start justify-center px-[16px] py-[11px] relative rounded-[24px] shrink-0 w-[122px] cursor-pointer" data-name="Date Picker">
                  <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="From Date Picker">
                    <CalendarIcon variant="from" />
                    <div className="[word-break:break-word] flex flex-col font-cairo font-normal justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(19,19,19,0.7)] whitespace-nowrap">
                      <p className="leading-[18px]">{fromDate ? formatDate(fromDate) : "From Date"}</p>
                    </div>
                  </div>
                  <input
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    aria-label="From date"
                  />
                </label>
                <label className="bg-white border border-[#dadada] border-solid content-stretch flex flex-col h-[40px] items-start justify-center px-[16px] py-[11px] relative rounded-[24px] shrink-0 cursor-pointer" data-name="To Date Picker">
                  <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="To Date Text">
                    <CalendarIcon variant="to" />
                    <div className="[word-break:break-word] flex flex-col font-cairo font-normal justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(19,19,19,0.7)] whitespace-nowrap">
                      <p className="leading-[18px]">{toDate ? formatDate(toDate) : "To date"}</p>
                    </div>
                  </div>
                  <input
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    aria-label="To date"
                  />
                </label>
              </div>
              <button
                type="button"
                onClick={() => {
                  /* apply search + date range filters */
                }}
                className="bg-[#28459d] content-stretch flex h-[40px] items-center justify-center px-[16px] py-[8px] relative rounded-[24px] shrink-0 w-[88px] cursor-pointer"
                data-name="Apply Button Container"
              >
                <div className="[word-break:break-word] flex flex-col font-cairo font-bold justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap">
                  <p className="leading-[normal]">Apply</p>
                </div>
              </button>
            </div>
            <button
              type="button"
              onClick={() => {
                /* open Add Transaction flow */
              }}
              className="bg-[#1b9e74] content-stretch flex gap-[4px] h-[40px] items-center justify-center px-[16px] py-[8px] relative rounded-[24px] shrink-0 cursor-pointer"
              data-name="Create Auction Button Container"
            >
              <Plus className="overflow-clip relative shrink-0 size-[16px]" />
              <div className="[word-break:break-word] flex flex-col font-cairo font-bold justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap">
                <p className="leading-[normal] whitespace-pre">{`Add  Transaction`}</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
