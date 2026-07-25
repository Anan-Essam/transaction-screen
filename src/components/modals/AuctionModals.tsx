import { useState } from "react";
import type { ReactNode } from "react";
import aucAcceptCheck from "../../assets/figma/aucAcceptCheck.png";
import authWarn from "../../assets/figma/authWarn.png";
import { AucCloseButton, AucStarIcon, AucVerifiedObject, AucTrashButton, AucChevron } from "../auctionIcons";
import { isBidderVerified, productById, bidderById } from "../../auctionsData";
import type { Auction, AuctionBidder, Bid, AcceptedBid, Scenario } from "../../auctionsData";

/* Shared modal shell — 507px card on dimmed backdrop */
function AuctionModalShell({ title, onClose, children }: { title: string; onClose: () => void; children: ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-[16px]">
      <div className="absolute inset-0 bg-[rgba(19,19,19,0.4)]" onClick={onClose} aria-hidden="true" />
      <div role="dialog" aria-label={title} className="bg-white flex flex-col items-start p-[16px] relative rounded-[24px] w-[507px] max-w-full max-h-[90vh] overflow-y-auto">
        <div className="flex flex-col gap-[24px] items-center relative w-full">
          <div className="border-b border-[#f5f5f5] border-solid flex items-center pb-[16px] relative shrink-0 w-full" data-name="Header Container">
            <div className="flex flex-1 items-center justify-between min-w-0 relative">
              <span className="font-cairo font-bold text-[16px] text-[rgba(19,19,19,0.7)] leading-[normal] whitespace-nowrap">{title}</span>
              <AucCloseButton onClick={onClose} />
            </div>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

function TealCheck() {
  return (
    <div className="h-[48px] relative shrink-0 w-[47px]" data-name="Object">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={aucAcceptCheck} />
    </div>
  );
}

function BidderRow({ bidder }: { bidder: AuctionBidder }) {
  return (
    <div className="flex flex-col items-start overflow-clip p-[8px] relative rounded-[8px] shrink-0 w-full">
      <div className="flex items-center justify-between relative shrink-0 w-full" data-name="Bid Info">
        <span className="font-cairo font-bold text-[#28459d] text-[14px] leading-[normal] whitespace-nowrap">{bidder.id}</span>
        <div className="flex gap-[8px] items-center relative shrink-0">
          {isBidderVerified(bidder) ? (
            <div className="bg-[rgba(40,69,157,0.1)] flex gap-[4px] items-center justify-center px-[8px] py-[2px] relative rounded-[24px] shrink-0 w-[67px]">
              <AucVerifiedObject size={8} />
              <span className="font-cairo font-bold text-[#28459d] text-[10px] leading-[normal]">Verified</span>
            </div>
          ) : (
            <div className="bg-[rgba(19,19,19,0.04)] flex items-center justify-center px-[8px] py-[2px] relative rounded-[24px] shrink-0">
              <span className="font-cairo font-bold text-[10px] text-[rgba(19,19,19,0.7)] leading-[normal]">Unverified</span>
            </div>
          )}
          <div className="flex gap-[4px] items-center relative shrink-0 w-[39px]">
            <span className="font-cairo font-semibold text-[#131313] text-[14px] leading-[normal]">{bidder.rating}</span>
            <AucStarIcon />
          </div>
        </div>
      </div>
    </div>
  );
}

function ActionButtons({ cancelLabel = "Cancel", confirmLabel, onCancel, onConfirm, confirmDisabled }: { cancelLabel?: string; confirmLabel: string; onCancel: () => void; onConfirm: () => void; confirmDisabled?: boolean }) {
  return (
    <div className="flex gap-[16px] items-start relative shrink-0 w-full" data-name="Action Buttons Container">
      <button type="button" onClick={onCancel} className="bg-transparent border border-[#9ca3af] border-solid flex flex-1 h-[44px] items-center justify-center min-w-0 px-[16px] py-[8px] relative rounded-[24px] cursor-pointer">
        <span className="font-cairo font-bold text-[#9ca3af] text-[14px] leading-[normal] whitespace-nowrap">{cancelLabel}</span>
      </button>
      <button
        type="button"
        onClick={onConfirm}
        disabled={confirmDisabled}
        className={`${confirmDisabled ? "bg-[rgba(27,158,116,0.4)] cursor-default" : "bg-[#1b9e74] cursor-pointer"} border border-solid border-white flex flex-1 h-[44px] items-center justify-center min-w-0 px-[16px] py-[8px] relative rounded-[24px]`}
      >
        <span className="font-cairo font-bold text-[14px] text-white leading-[normal] whitespace-nowrap">{confirmLabel}</span>
      </button>
    </div>
  );
}

/* Stats strip used by the buyer / recommendation variants and the Close modal */
function StatsStrip({ stats }: { stats: { value: string; label: string }[] }) {
  return (
    <div className="bg-[#f9f9f9] flex overflow-clip relative rounded-[12px] shrink-0 w-full" data-name="Frame">
      {stats.map((s) => (
        <div key={s.label} className="flex flex-col items-center justify-center flex-1 min-w-0 py-[14px] relative">
          <span className="font-cairo font-bold text-[#28459d] text-[18px] leading-[normal] text-center w-full">{s.value}</span>
          <span className="font-cairo font-normal text-[#9ca3af] text-[11px] leading-[normal] text-center w-full">{s.label}</span>
        </div>
      ))}
    </div>
  );
}

/* Qty input with Ton suffix */
function QtyField({ value, onChange, max }: { value: string; onChange: (v: string) => void; max?: number }) {
  return (
    <div className="bg-white border border-[#ccc] border-solid flex items-center justify-between px-[12px] h-[32px] relative rounded-[8px] shrink-0 w-[130px]">
      <input
        type="text"
        inputMode="decimal"
        value={value}
        onChange={(e) => {
          const clean = e.target.value.replace(/[^\d.]/g, "");
          if (max !== undefined && clean !== "" && parseFloat(clean) > max) return;
          onChange(clean);
        }}
        aria-label="Quantity in tons"
        className="flex-1 min-w-0 bg-transparent outline-none font-cairo font-semibold text-[14px] text-[#131313]"
      />
      <span className="font-cairo font-normal text-[12px] text-[rgba(19,19,19,0.4)]">Ton</span>
    </div>
  );
}

/* ---------- Accept Bid — from View A (adjust quantity) ---------- */

export function AcceptBidProduct({
  auction,
  bid,
  onClose,
  onConfirm,
}: {
  auction: Auction;
  bid: Bid;
  onClose: () => void;
  onConfirm: (accepted: AcceptedBid[]) => void;
}) {
  const [qty, setQty] = useState(String(bid.qtyTons));
  const bidder = bidderById(auction, bid.bidderId)!;
  const product = productById(auction, bid.productId)!;
  const qtyNum = parseFloat(qty) || 0;
  const amountDue = Math.round((qtyNum / bid.qtyTons) * bid.amount);
  const remaining = Math.max(0, +(bid.qtyTons - qtyNum).toFixed(2));

  return (
    <AuctionModalShell title="Accept Bid" onClose={onClose}>
      <div className="border-b border-[#f0f0f0] border-solid flex flex-col items-center pb-[8px] relative shrink-0 w-full gap-[8px]" data-name="Description Container">
        <TealCheck />
        <span className="font-cairo font-bold text-[#131313] text-[24px] leading-[normal] whitespace-nowrap">Accept This Bid?</span>
      </div>
      <div className="flex flex-col gap-[32px] items-start relative shrink-0 w-full" data-name="Content">
        <div className="flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Summary Container">
          <BidderRow bidder={bidder} />
          <div className="bg-[#f9f9f9] flex flex-col items-start overflow-clip px-[7px] py-[6px] relative rounded-[12px] shrink-0 w-full">
            <div className="flex flex-col gap-[4px] items-start relative shrink-0 text-[#131313] text-[13px] w-full">
              <span className="font-cairo font-bold w-full">Product</span>
              <div className="flex items-center justify-between relative shrink-0 w-full whitespace-nowrap">
                <span className="font-cairo font-normal">{product.name}</span>
                <span className="font-cairo font-semibold">Offered {bid.qtyTons} Tons</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Input Section">
          <div className="flex flex-col items-start relative rounded-[2px] shrink-0 w-full">
            <div className="bg-white border border-[#ccc] border-solid flex flex-col gap-[12px] h-[48px] items-start px-[16px] relative rounded-[8px] shrink-0 w-full">
              <div className="h-[0.001px] relative shrink-0 w-full">
                <div className="[word-break:break-word] absolute bg-white flex items-center left-0 not-italic px-[4px] rounded-[8px] top-[-10px] whitespace-nowrap">
                  <span className="font-cairo font-semibold opacity-80 text-[#131313] text-[16px] leading-[20px]">Quantity to accept (Tons)</span>
                  <span className="font-sans font-semibold leading-[16px] opacity-80 text-[#da1414] text-[11px]">*</span>
                </div>
              </div>
              <input
                type="text"
                inputMode="decimal"
                value={qty}
                onChange={(e) => {
                  const clean = e.target.value.replace(/[^\d.]/g, "");
                  if (clean !== "" && parseFloat(clean) > bid.qtyTons) return;
                  setQty(clean);
                }}
                aria-label="Quantity to accept (Tons)"
                className="w-full h-[24px] leading-[24px] bg-transparent outline-none font-cairo font-semibold text-[14px] text-[#131313]"
              />
              <div className="h-[0.001px] relative shrink-0 w-[288px]" />
            </div>
          </div>
          <div className="flex items-start justify-between relative shrink-0 text-[14px] w-full whitespace-nowrap" data-name="Amount Due Section">
            <div className="flex flex-col gap-[2px] items-start relative shrink-0">
              <span className="font-cairo font-semibold text-[#131313]">Amount due</span>
              <span className="font-cairo font-normal text-[rgba(19,19,19,0.6)]">Remaining {remaining} Tons stays open for other bids</span>
            </div>
            <span className="font-cairo font-bold text-[#28459d]">{amountDue.toLocaleString("en-US")} LE</span>
          </div>
        </div>
      </div>
      <ActionButtons
        confirmLabel="✓ Accept Bid"
        confirmDisabled={qtyNum <= 0}
        onCancel={onClose}
        onConfirm={() => onConfirm([{ bidId: bid.id, qtyTons: qtyNum }])}
      />
    </AuctionModalShell>
  );
}

/* ---------- Accept Bid — from View B (remove products before confirming) ---------- */

export function AcceptBidBuyer({
  auction,
  bidderId,
  bids,
  onClose,
  onConfirm,
}: {
  auction: Auction;
  bidderId: string;
  bids: Bid[];
  onClose: () => void;
  onConfirm: (accepted: AcceptedBid[]) => void;
}) {
  const bidder = bidderById(auction, bidderId)!;
  const [rows, setRows] = useState(bids.map((b) => ({ bid: b, qty: String(b.qtyTons) })));
  const totalQty = rows.reduce((s, r) => s + (parseFloat(r.qty) || 0), 0);
  const total = rows.reduce((s, r) => s + Math.round(((parseFloat(r.qty) || 0) / r.bid.qtyTons) * r.bid.amount), 0);

  return (
    <AuctionModalShell title="Accept Bid" onClose={onClose}>
      <div className="border-b border-[#f0f0f0] border-solid flex flex-col items-center pb-[8px] relative shrink-0 w-full gap-[8px]">
        <TealCheck />
        <span className="font-cairo font-bold text-[#131313] text-[24px] leading-[normal] text-center">Accept this buyer across {rows.length} products?</span>
      </div>
      <BidderRow bidder={bidder} />
      <StatsStrip
        stats={[
          { value: `${rows.length}`, label: "Products" },
          { value: `${+totalQty.toFixed(2)}T`, label: "Total qty" },
          { value: total.toLocaleString("en-US"), label: "LE total" },
        ]}
      />
      <div className="border border-[#f5f5f5] border-solid flex flex-col gap-[8px] items-start p-[12px] relative rounded-[16px] shrink-0 w-full">
        <span className="font-cairo font-bold text-[#131313] text-[13px] leading-[normal] w-full">Products in this Bid</span>
        <div className="flex flex-col items-start relative shrink-0 w-full max-h-[320px] overflow-y-auto">
          {rows.map((r) => (
            <div key={r.bid.id} className="flex items-center justify-between gap-[8px] py-[10px] relative shrink-0 w-full border-b last:border-b-0 border-[#f5f5f5] border-solid">
              <span className="font-cairo font-normal text-[#131313] text-[13px] leading-[normal] flex-1 min-w-0">{productById(auction, r.bid.productId)?.name}</span>
              <QtyField value={r.qty} onChange={(v) => setRows((rs) => rs.map((x) => (x.bid.id === r.bid.id ? { ...x, qty: v } : x)))} max={r.bid.qtyTons} />
              <span className="font-cairo font-bold text-[#28459d] text-[13px] leading-[normal] w-[90px] text-right">
                {Math.round(((parseFloat(r.qty) || 0) / r.bid.qtyTons) * r.bid.amount).toLocaleString("en-US")} LE
              </span>
              <AucTrashButton onClick={() => setRows((rs) => rs.filter((x) => x.bid.id !== r.bid.id))} label={`Remove ${productById(auction, r.bid.productId)?.name}`} />
            </div>
          ))}
          {rows.length === 0 && <span className="font-cairo font-medium text-[13px] text-[rgba(19,19,19,0.6)] py-[16px]">All products removed — nothing to accept.</span>}
        </div>
      </div>
      <ActionButtons
        confirmLabel={`✓ Accept All ${rows.length}`}
        confirmDisabled={rows.length === 0 || rows.some((r) => (parseFloat(r.qty) || 0) <= 0)}
        onCancel={onClose}
        onConfirm={() => onConfirm(rows.map((r) => ({ bidId: r.bid.id, qtyTons: parseFloat(r.qty) || 0 })))}
      />
    </AuctionModalShell>
  );
}

/* ---------- Accept Bid — from View C (recommendation, grouped by buyer) ---------- */

export function AcceptBidScenario({
  auction,
  scenario,
  onClose,
  onConfirm,
}: {
  auction: Auction;
  scenario: Scenario;
  onClose: () => void;
  onConfirm: (accepted: AcceptedBid[]) => void;
}) {
  const [rows, setRows] = useState(scenario.allocation.map((b) => ({ bid: b, qty: String(b.qtyTons) })));
  const [openBuyers, setOpenBuyers] = useState<string[]>(rows.length ? [rows[0].bid.bidderId] : []);
  const buyers = [...new Set(rows.map((r) => r.bid.bidderId))];
  const total = rows.reduce((s, r) => s + Math.round(((parseFloat(r.qty) || 0) / r.bid.qtyTons) * r.bid.amount), 0);

  return (
    <AuctionModalShell title="Accept Bid" onClose={onClose}>
      <div className="border-b border-[#f0f0f0] border-solid flex flex-col items-center pb-[8px] relative shrink-0 w-full gap-[8px]">
        <TealCheck />
        <span className="font-cairo font-bold text-[#131313] text-[24px] leading-[normal] text-center">Accept recommended allocation?</span>
        <span className="font-cairo font-normal text-[16px] text-[rgba(19,19,19,0.7)] leading-[24px] text-center max-w-[360px]">
          Assigns {rows.length} products across {buyers.length} buyers for highest total revenue
        </span>
      </div>
      <StatsStrip
        stats={[
          { value: `${rows.length}`, label: "Products" },
          { value: `${buyers.length}`, label: "Buyers" },
          { value: total.toLocaleString("en-US"), label: "LE revenue" },
        ]}
      />
      <div className="border border-[#f5f5f5] border-solid flex flex-col gap-[8px] items-start p-[12px] relative rounded-[16px] shrink-0 w-full">
        <span className="font-cairo font-bold text-[#131313] text-[13px] leading-[normal] w-full">Products in this Bid</span>
        <div className="flex flex-col gap-[8px] items-start relative shrink-0 w-full max-h-[320px] overflow-y-auto">
          {buyers.map((buyerId) => {
            const buyerRows = rows.filter((r) => r.bid.bidderId === buyerId);
            const buyerTotal = buyerRows.reduce((s, r) => s + Math.round(((parseFloat(r.qty) || 0) / r.bid.qtyTons) * r.bid.amount), 0);
            const open = openBuyers.includes(buyerId);
            return (
              <div key={buyerId} className="flex flex-col gap-[4px] relative shrink-0 w-full">
                <div className="flex items-center justify-between relative shrink-0 w-full">
                  <div className="flex gap-[8px] items-baseline">
                    <span className="font-cairo font-bold text-[#131313] text-[14px]">{buyerId}</span>
                    <span className="font-cairo font-semibold text-[#666464] text-[12px]">
                      {buyerRows.length} products · {buyerTotal.toLocaleString("en-US")} LE
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setOpenBuyers((s) => (open ? s.filter((b) => b !== buyerId) : [...s, buyerId]))}
                    aria-expanded={open}
                    aria-label={`Toggle ${buyerId} allocation`}
                    className="bg-[rgba(40,69,157,0.1)] flex items-center justify-center p-[6px] rounded-[18px] size-[24px] cursor-pointer"
                  >
                    <AucChevron size={14.4} className={open ? "rotate-180" : ""} />
                  </button>
                </div>
                {open && (
                  <div className="flex flex-col relative w-full">
                    {buyerRows.map((r) => (
                      <div key={r.bid.id} className="flex items-center justify-between gap-[8px] py-[8px] relative shrink-0 w-full border-b last:border-b-0 border-[#f5f5f5] border-solid">
                        <span className="font-cairo font-normal text-[#131313] text-[13px] leading-[normal] flex-1 min-w-0">{productById(auction, r.bid.productId)?.name}</span>
                        <QtyField value={r.qty} onChange={(v) => setRows((rs) => rs.map((x) => (x.bid.id === r.bid.id ? { ...x, qty: v } : x)))} max={r.bid.qtyTons} />
                        <span className="font-cairo font-bold text-[#28459d] text-[13px] leading-[normal] w-[90px] text-right">
                          {Math.round(((parseFloat(r.qty) || 0) / r.bid.qtyTons) * r.bid.amount).toLocaleString("en-US")} LE
                        </span>
                        <AucTrashButton onClick={() => setRows((rs) => rs.filter((x) => x.bid.id !== r.bid.id))} label={`Remove ${productById(auction, r.bid.productId)?.name}`} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
          {rows.length === 0 && <span className="font-cairo font-medium text-[13px] text-[rgba(19,19,19,0.6)] py-[16px]">All products removed — nothing to accept.</span>}
        </div>
      </div>
      <ActionButtons
        confirmLabel="✓ Accept Recommendation"
        confirmDisabled={rows.length === 0 || rows.some((r) => (parseFloat(r.qty) || 0) <= 0)}
        onCancel={onClose}
        onConfirm={() => onConfirm(rows.map((r) => ({ bidId: r.bid.id, qtyTons: parseFloat(r.qty) || 0 })))}
      />
    </AuctionModalShell>
  );
}

/* ---------- Close Auction modal ---------- */

export function CloseAuctionModal({
  auction,
  onClose,
  onConfirm,
}: {
  auction: Auction;
  onClose: () => void;
  onConfirm: (outcome: "end" | "cancel") => void;
}) {
  const [choice, setChoice] = useState<"end" | "cancel" | null>(null);
  const maxBid = Math.max(0, ...auction.bids.map((b) => b.amount));

  const option = (key: "end" | "cancel", title: string, body: string) => (
    <button
      type="button"
      role="radio"
      aria-checked={choice === key}
      onClick={() => setChoice(key)}
      className={`bg-white border ${choice === key ? "border-[#28459d]" : "border-[#f5f5f5]"} border-solid flex gap-[8px] items-start p-[8px] relative rounded-[12px] shrink-0 w-full text-left cursor-pointer`}
    >
      <div className="flex items-center py-[6px] relative shrink-0">
        <div className={`border ${choice === key ? "border-[#28459d]" : "border-[#d9d9d9]"} border-solid flex items-center justify-center p-[3px] relative rounded-[8px] shrink-0 size-[16px]`}>
          {choice === key && <div className="bg-[#28459d] rounded-full size-[8px]" />}
        </div>
      </div>
      <div className="flex flex-col items-start relative flex-1 min-w-0">
        <span className="font-cairo font-semibold text-[#131313] text-[14px] leading-[normal] w-full">{title}</span>
        <span className="font-cairo font-normal text-[11px] text-[rgba(19,19,19,0.7)] leading-[18px] w-full">{body}</span>
      </div>
    </button>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-[16px]">
      <div className="absolute inset-0 bg-[rgba(19,19,19,0.4)]" onClick={onClose} aria-hidden="true" />
      <div role="dialog" aria-label="Close Auction" className="bg-white flex flex-col items-start p-[16px] relative rounded-[24px] w-[420px] max-w-full max-h-[90vh] overflow-y-auto" data-name="Close Auction">
        <div className="flex flex-col gap-[20px] items-center relative w-full">
          <div className="border-b border-[#f5f5f5] border-solid flex items-center pb-[16px] relative shrink-0 w-full">
            <div className="flex flex-1 items-center justify-between min-w-0 relative">
              <span className="font-cairo font-bold text-[16px] text-[rgba(19,19,19,0.7)] leading-[normal] whitespace-nowrap">Close Auction</span>
              <AucCloseButton onClick={onClose} />
            </div>
          </div>
          <div className="h-[48px] relative shrink-0 w-[45.507px]" data-name="m028t0154_i_icon_18sep22 1">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <img alt="" className="absolute h-[176.06%] left-[-42.39%] max-w-none top-[-42.03%] w-[185.7%]" src={authWarn} />
            </div>
          </div>
          <StatsStrip
            stats={[
              { value: `${auction.bidders.length}`, label: "Active Bidders" },
              { value: `${auction.products.length}`, label: "Products" },
              { value: `$${Math.round(maxBid / 1000)}K`, label: "Highest Bid" },
            ]}
          />
          <div className="flex flex-col gap-[16px] items-start relative shrink-0 w-full">
            <span className="font-cairo font-medium text-[13px] text-[rgba(19,19,19,0.6)] leading-[normal] w-full">What do you want to do?</span>
            <div className="flex flex-col gap-[8px] items-start relative shrink-0 w-full" role="radiogroup" aria-label="Close auction options">
              {option("end", "Close early & accept current winners", "Highest bid per product becomes the winning bid. Auction ends now, winners are notified.")}
              {option("cancel", "Cancel auction completely", "No winners. All products return to inventory. All bidders are notified of the cancellation.")}
            </div>
          </div>
          <div className="flex gap-[16px] items-center justify-center relative shrink-0 w-full">
            <button type="button" onClick={onClose} className="bg-transparent border border-[#9ca3af] border-solid flex h-[44px] items-center justify-center px-[16px] py-[8px] relative rounded-[24px] shrink-0 w-[173px] cursor-pointer">
              <span className="font-cairo font-bold text-[#9ca3af] text-[14px] leading-[normal] whitespace-nowrap">Keep Auction Open</span>
            </button>
            {choice === null ? (
              <span className="font-cairo font-bold flex-1 min-w-0 text-[#131313] text-[14px] text-center leading-[normal]">Select An Option</span>
            ) : (
              <button type="button" onClick={() => onConfirm(choice)} className="bg-[#28459d] flex flex-1 h-[44px] items-center justify-center min-w-0 px-[16px] py-[8px] relative rounded-[24px] cursor-pointer">
                <span className="font-cairo font-bold text-[14px] text-white leading-[normal] whitespace-nowrap">{choice === "end" ? "Close & accept winners" : "Cancel auction"}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
