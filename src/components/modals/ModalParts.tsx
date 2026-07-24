import { useState } from "react";
import auctionThumb from "../../assets/figma/auctionThumb.jpg";
import ellipseGreen from "../../assets/figma/ellipseGreen.svg";
import ellipseGray from "../../assets/figma/ellipseGray.svg";
import type { AuctionOption } from "../../data";
import {
  MoneyWithdrawalIcon,
  CopyLink,
  CloseX20Button,
  CloseCrossButton,
  BiddingIcon,
  ProductIcon,
  LocationIcon,
  DropdownArrowIcon,
  TickSquare,
} from "../icons2";

/* Fullscreen overlay hosting an "Add New Transaction" dialog (860px wide in Figma) */
export function ModalOverlay({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(19,19,19,0.4)] p-[16px] overflow-y-auto" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="w-[860px] max-w-full max-h-[calc(100vh-32px)] overflow-y-auto rounded-[24px]">{children}</div>
    </div>
  );
}

type ModalHeaderProps = {
  title: string;
  subtitle?: string;
  closeVariant: "plain" | "bordered";
  onClose: () => void;
};

/* "Header Container" */
export function ModalHeader({ title, subtitle, closeVariant, onClose }: ModalHeaderProps) {
  return (
    <div className={`border-[#f5f5f5] border-b border-solid content-stretch flex gap-[8px] ${subtitle ? "items-start" : "items-center"} pb-[16px] relative shrink-0 w-full`} data-name="Header Container">
      <MoneyWithdrawalIcon />
      <div className={`content-stretch flex flex-[1_0_0] ${subtitle ? "items-start" : "items-center"} justify-between min-w-px relative`} data-name="Title Bar">
        {subtitle ? (
          <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-start leading-[0] not-italic relative shrink-0 text-[16px]">
            <div className="flex flex-col font-cairo font-bold h-[15px] justify-center relative shrink-0 text-[#131313] w-[164px]">
              <p className="leading-[normal] whitespace-nowrap">{title}</p>
            </div>
            <div className="flex flex-col font-cairo font-normal justify-center relative shrink-0 text-[rgba(19,19,19,0.7)] whitespace-nowrap">
              <p className="leading-[normal]">{subtitle}</p>
            </div>
          </div>
        ) : (
          <div className="[word-break:break-word] flex flex-col font-cairo font-bold justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-[rgba(19,19,19,0.7)] whitespace-nowrap">
            <p className="leading-[normal]">{title}</p>
          </div>
        )}
        <div className="content-stretch flex gap-[24px] items-center justify-end relative shrink-0">
          <CopyLink />
          {closeVariant === "plain" ? <CloseX20Button onClick={onClose} /> : <CloseCrossButton onClick={onClose} />}
        </div>
      </div>
    </div>
  );
}

type SelectFieldProps = {
  label: string;
  placeholder: string;
  value: string | null;
  options: string[];
  onSelect: (value: string) => void;
  labelBackground?: "gray-white" | "diagonal" | "white";
  disabled?: boolean;
};

/* ".❖ Main / Input" — floating-label select with functional dropdown menu */
export function SelectField({ label, placeholder, value, options, onSelect, labelBackground = "gray-white", disabled }: SelectFieldProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative w-full">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => !disabled && setOpen((o) => !o)}
        className="content-stretch cursor-pointer flex flex-col items-start relative shrink-0 w-full"
        data-name="Input"
      >
        <div className="content-stretch flex flex-col items-start relative rounded-[2px] shrink-0 w-full" data-name=".❖ Main / Input">
          <div className="bg-white border border-[#ccc] border-solid content-stretch flex flex-col gap-[12px] h-[48px] items-start px-[16px] relative rounded-[8px] shrink-0 w-full" data-name="Input">
            <div className="h-[0.001px] relative shrink-0 w-full" data-name="Label Container">
              <div
                className={`[word-break:break-word] absolute content-stretch flex items-center left-0 not-italic px-[4px] rounded-[8px] text-left top-[-10px] whitespace-nowrap ${labelBackground === "gray-white" ? "bg-gradient-to-b from-[#f9f9f9] to-white" : labelBackground === "white" ? "bg-white" : ""}`}
                style={labelBackground === "diagonal" ? { backgroundImage: "linear-gradient(-11.165720381518426deg, rgb(255, 255, 255) 24.611%, rgb(249, 249, 249) 80.358%)" } : undefined}
                data-name="Label"
              >
                <div className="flex flex-col font-cairo font-semibold justify-center leading-[0] opacity-80 relative shrink-0 text-[#131313] text-[16px]">
                  <p className="leading-[20px]">{label}</p>
                </div>
                <p className="font-['Source_Sans_Pro',sans-serif] font-semibold leading-[16px] opacity-80 relative shrink-0 text-[#da1414] text-[11px]">*</p>
              </div>
            </div>
            <div className="content-stretch flex items-start justify-between overflow-clip relative shrink-0 w-full" data-name="Icons + Text">
              <div className="content-stretch flex gap-[4px] items-start relative shrink-0 w-[228px]" data-name="Left Icon + Text">
                <div className={`[word-break:break-word] flex flex-[1_0_0] flex-col font-cairo font-semibold justify-center leading-[0] min-w-px not-italic opacity-80 relative text-[14px] ${value ? "text-[#131313]" : "text-[rgba(19,19,19,0.6)]"} text-left whitespace-nowrap`}>
                  <p className="leading-[24px]">{value ?? placeholder}</p>
                </div>
              </div>
              <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Right Icons">
                <DropdownArrowIcon />
              </div>
            </div>
            <div className="h-[0.001px] relative shrink-0 w-[288px] max-w-full" data-name="Icons" />
          </div>
        </div>
      </button>
      {open && (
        <>
          {/* click-away backdrop — closes the menu without document-level listeners */}
          <div className="fixed inset-0 z-10 cursor-default" aria-hidden onClick={() => setOpen(false)} />
          <div role="listbox" className="absolute left-0 right-0 top-[52px] z-20 bg-white border border-[#f5f5f5] border-solid rounded-[8px] overflow-hidden shadow-[0px_4px_16px_rgba(19,19,19,0.08)]">
            {options.length === 0 ? (
              <div className="px-[16px] py-[10px] font-cairo font-semibold text-[14px] text-[rgba(19,19,19,0.4)]">No options</div>
            ) : (
              options.map((opt) => (
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
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
}

/* Auction option card with photo thumb + radio dot */
function AuctionOptionCard({ auction, selected, onSelect }: { auction: AuctionOption; selected: boolean; onSelect: () => void }) {
  return (
    <button type="button" onClick={onSelect} className="flex items-center justify-center relative shrink-0 w-full cursor-pointer">
      <div className="-scale-y-100 flex-none rotate-180 w-full">
        <div className={`bg-white border ${selected ? "border-[#1b9e74]" : "border-[#f5f5f5]"} border-solid content-stretch flex gap-[8px] items-center justify-end p-[8px] relative rounded-[16px] w-full`}>
          <div className="flex items-center justify-center relative shrink-0 min-w-0 flex-1">
            <div className="-scale-y-100 flex-none rotate-180 max-w-full">
              <div className="content-stretch flex flex-col gap-[12px] items-start relative w-[688px] max-w-full">
                <div className="[word-break:break-word] flex flex-col font-cairo font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#131313] text-[14px] whitespace-nowrap">
                  <p className="leading-[24px]">{auction.name}</p>
                </div>
                <div className="content-stretch flex flex-wrap gap-[32px] items-start relative shrink-0">
                  <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-[115px]">
                    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
                      <BiddingIcon />
                      <div className="[word-break:break-word] flex flex-col font-cairo font-normal h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(19,19,19,0.7)] w-[50px]">
                        <p className="leading-[normal]">Bidders:</p>
                      </div>
                    </div>
                    <div className="[word-break:break-word] flex flex-col font-cairo font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#131313] text-[14px] whitespace-nowrap">
                      <p className="leading-[normal]">{auction.bidders}</p>
                    </div>
                  </div>
                  <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
                    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
                      <ProductIcon size={12} />
                      <div className="[word-break:break-word] flex flex-col font-cairo font-normal justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(19,19,19,0.7)] whitespace-nowrap">
                        <p className="leading-[normal]">Products:</p>
                      </div>
                    </div>
                    <div className="[word-break:break-word] flex flex-col font-cairo font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#131313] text-[14px] whitespace-nowrap">
                      <p className="leading-[normal]">{auction.productsCount}</p>
                    </div>
                  </div>
                  <div className="content-stretch flex gap-[8.334px] items-center justify-end relative shrink-0">
                    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
                      <LocationIcon />
                      <div className="[word-break:break-word] flex flex-col font-cairo font-normal justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(19,19,19,0.7)] text-right whitespace-nowrap">
                        <p className="leading-[normal]" dir="auto">
                          Location:
                        </p>
                      </div>
                    </div>
                    <div className="[word-break:break-word] flex flex-col font-cairo font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#131313] text-[14px] text-right whitespace-nowrap">
                      <p className="leading-[normal]" dir="auto">
                        {auction.location}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center relative shrink-0">
            <div className="-scale-y-100 flex-none rotate-180">
              <div className="h-[62px] overflow-clip relative rounded-[8px] w-[76px]">
                <div aria-hidden className="absolute inset-0 pointer-events-none rounded-[8px]">
                  <img alt="" className="absolute max-w-none object-cover rounded-[8px] size-full" src={auctionThumb} />
                  <div className="absolute bg-gradient-to-b from-[rgba(19,32,67,0)] inset-0 rounded-[8px] to-[99.038%] to-[rgba(19,32,67,0.6)]" />
                </div>
                <div className={`absolute bg-white border ${selected ? "border-[#1b9e74]" : "border-[#d9d9d9]"} border-solid content-stretch flex items-center left-[4px] p-[4px] rounded-[8px] size-[16px] top-[4px]`}>
                  <div className="relative shrink-0 size-[8px]">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={selected ? ellipseGreen : ellipseGray} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}

type AuctionSelectSectionProps = {
  auctions: AuctionOption[];
  selectedAuctionId: string | null;
  onSelectAuction: (id: string) => void;
  selectedBuyer: string | null;
  onSelectBuyer: (buyer: string) => void;
};

/* "Select Auction" section — auction radio cards + buyer select (buyers limited to auction winners) */
export function AuctionSelectSection({ auctions, selectedAuctionId, onSelectAuction, selectedBuyer, onSelectBuyer }: AuctionSelectSectionProps) {
  const selectedAuction = auctions.find((a) => a.id === selectedAuctionId) ?? null;
  return (
    <div className="bg-[#f9f9f9] content-stretch flex flex-col gap-[16px] items-start p-[8px] relative rounded-[16px] shrink-0 w-full">
      <div className="border border-[#f9f9f9] border-solid content-stretch flex flex-col gap-[20px] items-start p-[8px] relative rounded-[16px] shrink-0 w-full">
        <div className="[word-break:break-word] flex flex-col font-cairo font-bold justify-center leading-[0] not-italic opacity-80 relative shrink-0 text-[#131313] text-[16px] whitespace-nowrap">
          <p className="leading-[20px]">Select Auction</p>
        </div>
        <div className="content-stretch flex flex-col gap-[8px] items-start justify-center relative shrink-0 w-full">
          {auctions.map((a) => (
            <AuctionOptionCard key={a.id} auction={a} selected={a.id === selectedAuctionId} onSelect={() => onSelectAuction(a.id)} />
          ))}
        </div>
      </div>
      <SelectField
        label="Buyer"
        placeholder="Select buyer"
        value={selectedBuyer}
        options={selectedAuction ? selectedAuction.buyers : []}
        onSelect={onSelectBuyer}
        disabled={!selectedAuction}
      />
    </div>
  );
}

type PaymentDetailsSectionProps = {
  amount: string;
  onAmountChange: (v: string) => void;
  outstanding: number;
  remaining: number;
};

/* "Payment Details" — amount input + outstanding/remaining boxes */
export function PaymentDetailsSection({ amount, onAmountChange, outstanding, remaining }: PaymentDetailsSectionProps) {
  return (
    <div className="bg-[#f9f9f9] content-stretch flex flex-col gap-[24px] items-start justify-center p-[8px] relative rounded-[16px] shrink-0 w-full">
      <div className="[word-break:break-word] capitalize flex flex-col font-cairo font-bold justify-center leading-[0] not-italic opacity-80 relative shrink-0 text-[#131313] text-[16px] whitespace-nowrap">
        <p className="leading-[20px]">Payment Details</p>
      </div>
      <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
        <div className="content-stretch flex flex-col items-start relative rounded-[2px] shrink-0 w-full" data-name=".❖ Main / Input">
          <div className="bg-white border border-[#ccc] border-solid content-stretch flex flex-col gap-[12px] h-[48px] items-start justify-center px-[16px] relative rounded-[8px] shrink-0 w-full" data-name="Input">
            <div className="h-[0.001px] relative shrink-0 w-full" data-name="Label Container">
              <div className="[word-break:break-word] absolute bg-gradient-to-t content-stretch flex from-white items-center left-0 not-italic px-[4px] rounded-[8px] text-left to-[#f9f9f9] top-[-22px] whitespace-nowrap" data-name="Label">
                <div className="flex flex-col font-cairo font-semibold justify-center leading-[0] opacity-80 relative shrink-0 text-[#131313] text-[16px]">
                  <p className="leading-[20px]">Payment Amount</p>
                </div>
                <p className="font-['Source_Sans_Pro',sans-serif] font-semibold leading-[16px] opacity-80 relative shrink-0 text-[#da1414] text-[11px]">*</p>
              </div>
            </div>
            <input
              type="text"
              inputMode="decimal"
              value={amount}
              onChange={(e) => onAmountChange(e.target.value.replace(/[^\d.]/g, ""))}
              placeholder="Enter received amount"
              className="[word-break:break-word] w-full bg-transparent border-none outline-none font-cairo font-semibold leading-[24px] opacity-80 text-[14px] text-[#131313] placeholder:text-[rgba(19,19,19,0.6)]"
            />
          </div>
        </div>
        <div className="[word-break:break-word] content-stretch flex flex-col sm:flex-row gap-[12px] items-stretch sm:items-center leading-[0] not-italic relative shrink-0 w-full">
          <div className="bg-white content-stretch flex sm:flex-[1_0_0] flex-col gap-[8px] items-start min-w-px px-[8px] py-[4px] relative rounded-[8px]">
            <div className="flex flex-col font-cairo font-medium h-[20px] justify-center relative shrink-0 text-[14px] text-[rgba(19,19,19,0.5)] w-[141px]">
              <p className="leading-[normal]">Outstanding Amount</p>
            </div>
            <div className="flex flex-col font-cairo font-bold h-[23px] justify-center relative shrink-0 text-[#131313] text-[16px] whitespace-nowrap">
              <p className="leading-[normal]">EGP {outstanding.toLocaleString("en-US")}</p>
            </div>
          </div>
          <div className="bg-white content-stretch flex sm:flex-[1_0_0] flex-col gap-[8px] items-start min-w-px px-[8px] py-[4px] relative rounded-[8px]">
            <div className="flex flex-col font-cairo font-medium h-[20px] justify-center relative shrink-0 text-[14px] text-[rgba(19,19,19,0.5)] w-[141px]">
              <p className="leading-[normal]">Remaining Balance</p>
            </div>
            <div className="flex flex-col font-cairo font-bold h-[23px] justify-center relative shrink-0 text-[#131313] text-[16px] whitespace-nowrap">
              <p className="leading-[normal]">EGP {remaining.toLocaleString("en-US")}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

type DeliveredQtyTableProps = {
  title: string;
  rows: { product: string; deliveredQty: string; remaining: string; unitPrice: string }[];
};

/* Read-only delivered quantities context ("Retired Laptops (Batch 243)" table) */
export function DeliveredQtyTable({ title, rows }: DeliveredQtyTableProps) {
  return (
    <div className="[word-break:break-word] bg-[#f9f9f9] content-stretch flex flex-col gap-[20px] items-start leading-[0] not-italic p-[8px] relative rounded-[16px] shrink-0 w-full">
      <div className="capitalize flex flex-col font-cairo font-bold justify-center opacity-80 relative shrink-0 text-[#131313] text-[16px] whitespace-nowrap">
        <p className="leading-[20px]">{title}</p>
      </div>
      <div className="bg-white content-stretch flex flex-col gap-[16px] items-start p-[8px] relative rounded-[8px] shrink-0 text-[14px] w-full overflow-x-auto" data-name="Bidding Vertical">
        <div className="border-[#f5f5f5] border-b border-solid content-stretch flex font-cairo font-medium items-center justify-between p-[8px] relative shrink-0 text-[rgba(19,19,19,0.7)] w-full min-w-[500px]" data-name="Bidding Headers">
          <div className="flex flex-col h-[16px] justify-center relative shrink-0 w-[81px]">
            <p className="leading-[normal]">Product</p>
          </div>
          <div className="flex flex-col justify-center relative shrink-0 whitespace-nowrap">
            <p className="leading-[normal]">Delivered Qty</p>
          </div>
          <div className="flex flex-col justify-center relative shrink-0 whitespace-nowrap">
            <p className="leading-[normal]">Remaining</p>
          </div>
          <div className="flex flex-col justify-center relative shrink-0 w-[80px]">
            <p className="leading-[normal]">Unit Price</p>
          </div>
        </div>
        <div className="content-stretch flex flex-col font-cairo font-semibold gap-[12px] items-start relative shrink-0 text-[#131313] w-full min-w-[500px]">
          {rows.map((r, i) => (
            <div
              key={i}
              className={`${i % 2 === 0 ? "bg-[#f9f9f9] rounded-[4px] " : ""}content-stretch flex items-center justify-between p-[8px] relative shrink-0 w-full`}
              data-name="Bid Row"
            >
              <div className="flex flex-col justify-center relative shrink-0 w-[79px]">
                <p className="leading-[normal]">{r.product}</p>
              </div>
              <div className="flex flex-col justify-center relative shrink-0 w-[80px]">
                <p className="leading-[normal]">{r.deliveredQty}</p>
              </div>
              <div className="flex flex-col justify-center relative shrink-0 w-[80px]">
                <p className="leading-[normal]">{r.remaining}</p>
              </div>
              <div className="flex flex-col justify-center relative shrink-0 whitespace-nowrap">
                <p className="leading-[normal]">{r.unitPrice}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* "This is the final quantity release." checkbox row */
export function FinalReleaseCheckbox({ checked, onToggle }: { checked: boolean; onToggle: () => void }) {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full">
      <div className="content-stretch flex items-center py-[6px] relative shrink-0">
        <button type="button" onClick={onToggle} className="block cursor-pointer relative shrink-0 size-[24px]" aria-checked={checked} role="checkbox" data-name="vuesax">
          <TickSquare checked={checked} />
        </button>
      </div>
      <div className="[word-break:break-word] capitalize content-stretch flex flex-col items-start leading-[0] not-italic relative shrink-0 w-[511px] max-w-full">
        <div className="flex flex-col font-cairo font-bold justify-center relative shrink-0 text-[#131313] text-[16px] w-full">
          <p className="leading-[normal]">This is the final quantity release.</p>
        </div>
        <div className="flex flex-col font-cairo font-medium justify-center relative shrink-0 text-[13px] text-[rgba(19,19,19,0.7)] w-full">
          <p className="leading-[normal]">Once submitted, all awarded quantities will be marked as released.</p>
        </div>
      </div>
    </div>
  );
}

type ModalFooterProps = {
  cancelLabel?: string;
  submitLabel?: string;
  onCancel: () => void;
  onSubmit: () => void;
  submitDisabled?: boolean;
  fullWidth?: boolean;
};

/* Cancel / Add footer buttons */
export function ModalFooter({ cancelLabel = "Cancel", submitLabel = "Add", onCancel, onSubmit, submitDisabled, fullWidth }: ModalFooterProps) {
  return (
    <div className={`content-stretch flex gap-[16px] h-[48px] items-center justify-end relative shrink-0 ${fullWidth ? "w-full" : "w-[388px] max-w-full"}`}>
      <button
        type="button"
        onClick={onCancel}
        className={`bg-white border border-[#28459d] border-solid content-stretch flex h-[48px] items-center justify-center px-[16px] py-[8px] relative rounded-[24px] shrink-0 cursor-pointer ${fullWidth ? "flex-[1_0_0] min-w-px" : "w-[103px]"}`}
      >
        <div className="[word-break:break-word] flex flex-col font-cairo font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#28459d] text-[16px] whitespace-nowrap">
          <p className="leading-[normal]">{cancelLabel}</p>
        </div>
      </button>
      <button
        type="button"
        onClick={onSubmit}
        disabled={submitDisabled}
        className={`bg-[#28459d] border border-solid border-white content-stretch flex h-[48px] items-center justify-center px-[16px] py-[8px] relative rounded-[24px] shrink-0 cursor-pointer disabled:opacity-50 disabled:cursor-default ${fullWidth ? "flex-[1_0_0] min-w-px" : "w-[103px]"}`}
      >
        <div className="[word-break:break-word] flex flex-col font-cairo font-bold justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap">
          <p className="leading-[normal]">{submitLabel}</p>
        </div>
      </button>
    </div>
  );
}

/* "Deliver Now" quantity input — h-32 w-129/169 with Ton suffix */
export function QtyInput({ value, onChange, width = 129 }: { value: string; onChange: (v: string) => void; width?: 129 | 169 }) {
  return (
    <div
      className={`bg-white border border-[#ccc] border-solid content-stretch flex h-[32px] items-center justify-between px-[8px] relative rounded-[8px] shrink-0 ${width === 129 ? "w-[129px]" : "w-[169px]"}`}
      data-name="Input"
    >
      <input
        type="text"
        inputMode="decimal"
        value={value}
        onChange={(e) => onChange(e.target.value.replace(/[^\d.]/g, ""))}
        className="[word-break:break-word] w-full min-w-0 bg-transparent border-none outline-none font-cairo font-bold leading-[24px] opacity-80 text-[#131313] text-[14px]"
      />
      <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Left Icon + Text">
        <div className="[word-break:break-word] flex flex-col font-cairo font-normal justify-center leading-[0] not-italic opacity-80 relative shrink-0 text-[12px] text-[rgba(19,19,19,0.5)] whitespace-nowrap">
          <p className="leading-[24px]">Ton</p>
        </div>
      </div>
    </div>
  );
}

type TextFieldProps = {
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
};

/* ".❖ Main / Input" — floating-label free text input (white label chip) */
export function TextField({ label, placeholder, value, onChange }: TextFieldProps) {
  return (
    <div className="content-stretch flex flex-col items-start relative rounded-[2px] shrink-0 w-full" data-name=".❖ Main / Input">
      <div className="bg-white border border-[#ccc] border-solid content-stretch flex flex-col h-[48px] items-start justify-center px-[16px] relative rounded-[8px] shrink-0 w-full" data-name="Input">
        <div className="h-[0.001px] relative shrink-0 w-full" data-name="Label Container">
          <div className="[word-break:break-word] absolute bg-white content-stretch flex items-center left-0 not-italic px-[4px] rounded-[8px] text-left top-[-22px] whitespace-nowrap" data-name="Label">
            <div className="flex flex-col font-cairo font-semibold justify-center leading-[0] opacity-80 relative shrink-0 text-[#131313] text-[16px]">
              <p className="leading-[20px]">{label}</p>
            </div>
            <p className="font-['Source_Sans_Pro',sans-serif] font-semibold leading-[16px] opacity-80 relative shrink-0 text-[#da1414] text-[11px]">*</p>
          </div>
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="[word-break:break-word] w-full bg-transparent border-none outline-none font-cairo font-semibold leading-[24px] opacity-80 text-[14px] text-[#131313] placeholder:text-[rgba(19,19,19,0.6)]"
        />
      </div>
    </div>
  );
}
