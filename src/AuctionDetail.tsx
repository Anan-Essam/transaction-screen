import { useMemo, useState } from "react";
import SideBar from "./components/SideBar";
import type { SideBarPage } from "./components/SideBar";
import { UserProfile, TopBar } from "./MoneyTransactions";
import kpiGavel from "./assets/figma/kpiGavel.png";
import aucBadgeCash from "./assets/figma/aucBadgeCash.png";
import aucMap from "./assets/figma/aucMap.jpg";
import aucAcceptCheck from "./assets/figma/aucAcceptCheck.png";
import {
  AucSearchIcon,
  AucClearIcon,
  AucChevron,
  AucBiddingIcon,
  AucProductIcon,
  AucJudgmentIcon,
  AucScalesIcon,
  AucArrowCircle,
  AucMedalStarIcon,
  AucTagIcon,
  AucCal12Icon,
  AucShareIcon,
  AucUncheckedIcon,
  AucLockIcon,
  AucLightningIcon,
  AucStarIcon,
  AucVerifiedObject,
  AucInfoButton,
  AucCheckButton,
  AucXButton,
  AucCloseButton,
  AucLiveStatusIcon,
  AucOverviewIcon,
  AucKycHeaderIcon,
  AucLocationIcon,
  AucClockIcon,
} from "./components/auctionIcons";
import {
  isBidderVerified,
  highestBidFor,
  rankedBidsFor,
  bidsByBidder,
  productById,
  bidderById,
  buildScenarios,
} from "./auctionsData";
import type { Auction, AuctionBidder, Bid, AcceptedBid, Scenario } from "./auctionsData";

export type DetailView = "product" | "buyer" | "recommendation";

/* ---------- small shared pieces ---------- */

function VerifiedChip({ bidder, small }: { bidder: AuctionBidder; small?: boolean }) {
  const verified = isBidderVerified(bidder);
  return verified ? (
    <div className={`bg-[rgba(40,69,157,0.1)] flex gap-[4px] items-center justify-center p-[4px] relative rounded-[24px] shrink-0 ${small ? "h-[18px]" : "h-[18px]"}`}>
      <AucVerifiedObject size={8} />
      <span className="font-cairo font-semibold text-[#28459d] text-[10px] leading-[normal] whitespace-nowrap">Verified</span>
    </div>
  ) : (
    <div className="bg-[rgba(19,19,19,0.04)] flex items-center justify-center p-[4px] h-[18px] relative rounded-[24px] shrink-0">
      <span className="font-cairo font-semibold text-[rgba(19,19,19,0.7)] text-[10px] leading-[normal] whitespace-nowrap">Unverified</span>
    </div>
  );
}

/* Rank pill — green for the top-ranked bid, amber otherwise */
function RankPill({ rank }: { rank: number }) {
  const top = rank === 1;
  return (
    <div className={`${top ? "bg-[rgba(27,158,116,0.1)]" : "bg-[rgba(249,160,0,0.1)]"} flex items-center justify-center px-[8px] py-[4px] relative rounded-[24px] shrink-0`}>
      <span className={`font-cairo font-bold ${top ? "text-[#1b9e74]" : "text-[#f9a000]"} text-[10px] leading-[normal]`}>#{rank}</span>
    </div>
  );
}

/* Price cell: "Highest Bid" label on the top bid, otherwise the product's current top price as context */
function PriceCell({ amount, highest }: { amount: number; highest: number }) {
  const isHighest = amount >= highest;
  return (
    <div className="flex flex-col items-start justify-center relative shrink-0 w-[89px]">
      <span className="font-cairo font-semibold text-[#131313] text-[14px] leading-[normal] mb-[-2px] whitespace-nowrap">{amount.toLocaleString("en-US")}</span>
      {isHighest ? (
        <div className="flex items-center relative shrink-0">
          <AucLightningIcon />
          <span className="font-cairo font-semibold text-[#1b9e74] text-[10px] leading-[normal] whitespace-nowrap">Highest bid</span>
        </div>
      ) : (
        <div className="flex items-center gap-[2px] relative shrink-0">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path d="M6 9.5V2.5M6 2.5L3 5.5M6 2.5L9 5.5" stroke="#f9a000" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="font-cairo font-semibold text-[#f9a000] text-[10px] leading-[normal] whitespace-nowrap">Top bid: {highest.toLocaleString("en-US")}</span>
        </div>
      )}
    </div>
  );
}

function AcceptedChip() {
  return (
    <div className="bg-[rgba(27,158,116,0.1)] flex items-center justify-center px-[8px] py-[4px] relative rounded-[24px] shrink-0">
      <span className="font-cairo font-bold text-[#1b9e74] text-[10px] leading-[normal] whitespace-nowrap">Accepted</span>
    </div>
  );
}

/* Empty state — gavel illustration + title + subtitle (Figma "Frame 175") */
function EmptyState({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="flex flex-col gap-[16px] items-center justify-center py-[64px] px-[16px] relative w-full" data-name="Frame 175">
      <div className="size-[80px] relative">
        <img alt="" className="absolute block inset-0 max-w-none size-full object-contain" src={kpiGavel} />
      </div>
      <div className="flex flex-col gap-[8px] items-center relative max-w-[422px] text-center">
        <p className="font-cairo font-bold text-[#131313] text-[22px] leading-[normal]">{title}</p>
        {subtitle && <p className="font-cairo font-normal text-[16px] text-[rgba(19,19,19,0.7)] leading-[24px]">{subtitle}</p>}
      </div>
    </div>
  );
}

/* KYC Required — document checklist popover */
function KycPopover({ bidder, onClose }: { bidder: AuctionBidder; onClose: () => void }) {
  const sections: ("Basic Documents" | "Additional Documents")[] = ["Basic Documents", "Additional Documents"];
  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} aria-hidden="true" />
      <div role="dialog" aria-label="KYC Required" className="absolute right-0 top-[24px] z-50 bg-white flex flex-col items-start p-[16px] rounded-[24px] w-[299px] shadow-[0px_8px_24px_0px_rgba(0,0,0,0.12)]" data-name="KYC Popup">
        <div className="flex flex-col gap-[8px] items-center relative w-full">
          <div className="border-[#f5f5f5] border-b border-solid flex items-center justify-between pb-[8px] relative shrink-0 w-full">
            <div className="flex gap-[5px] items-center relative shrink-0">
              <AucKycHeaderIcon />
              <span className="font-cairo font-bold text-[#131313] text-[14px] leading-[normal]">KYC Required</span>
            </div>
            <AucCloseButton onClick={onClose} size={24} />
          </div>
          {sections.map((section) => (
            <div key={section} className="flex flex-col gap-[4px] items-start relative shrink-0 w-full">
              <span className="font-cairo font-bold text-[#131313] text-[12px] leading-[normal] w-full">{section}</span>
              <div className="flex flex-col gap-[4px] items-start relative shrink-0 w-full">
                {bidder.kycDocs
                  .filter((d) => d.section === section)
                  .map((d) => (
                    <div key={d.name} className="flex items-center justify-between relative shrink-0 w-full">
                      <span className="font-cairo font-semibold opacity-80 text-[12px] text-[rgba(19,19,19,0.6)] leading-[24px] whitespace-nowrap">{d.name}</span>
                      {d.status === "Verified" ? (
                        <div className="bg-[rgba(40,69,157,0.1)] flex gap-[4px] h-[18px] items-center justify-center p-[4px] relative rounded-[24px] shrink-0">
                          <AucVerifiedObject size={8} />
                          <span className="font-cairo font-semibold text-[#28459d] text-[10px] leading-[normal]">Verified</span>
                        </div>
                      ) : d.status === "Unverified" ? (
                        <div className="bg-[rgba(19,19,19,0.04)] flex h-[18px] items-center justify-center p-[4px] relative rounded-[24px] shrink-0">
                          <span className="font-cairo font-semibold text-[10px] text-[rgba(19,19,19,0.7)] leading-[normal]">Unverified</span>
                        </div>
                      ) : (
                        <div className="flex h-[18px] items-center justify-center p-[4px] relative rounded-[24px] shrink-0">
                          <span className="font-cairo font-semibold text-[10px] text-[rgba(19,19,19,0.5)] leading-[normal]">Not submitted</span>
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

/* Bidder id + verified dot + KYC info button */
function BidderInfoCell({ bidder }: { bidder: AuctionBidder }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex gap-[4px] items-center relative shrink-0" data-name="Bidder Info">
      <span className="font-cairo font-semibold text-[#131313] text-[14px] leading-[normal] w-[75px]">{bidder.id}</span>
      <div className="bg-[#f5f5f5] flex gap-[4px] items-center p-[2px] relative rounded-[20px] shrink-0" data-name="Info Container">
        {isBidderVerified(bidder) && <AucVerifiedObject size={12} />}
        <AucInfoButton onClick={() => setOpen((o) => !o)} label={`KYC details for ${bidder.id}`} />
      </div>
      {open && <KycPopover bidder={bidder} onClose={() => setOpen(false)} />}
    </div>
  );
}

/* ---------- View A: By Product ---------- */

function ProductCardSmall({
  product,
  bidsCount,
  awarded,
  selected,
  onSelect,
}: {
  product: NonNullable<ReturnType<typeof productById>>;
  bidsCount: number;
  awarded: boolean;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`bg-white relative rounded-[12px] shrink-0 w-[183px] text-left cursor-pointer border ${selected ? "border-[#1b9e74]" : "border-[#f5f5f5]"} border-solid`}
      data-name="Product Card"
    >
      <div className="flex flex-col gap-[4.74px] p-[6px] relative w-full">
        <div className="h-[57px] overflow-clip relative rounded-tl-[12px] rounded-tr-[12px] shrink-0 w-full">
          <img alt="" className="absolute max-w-none object-cover rounded-tl-[12px] rounded-tr-[12px] size-full" src={product.image} />
          <div className="absolute bg-gradient-to-b from-[rgba(19,32,67,0)] inset-0 rounded-tl-[12px] rounded-tr-[12px] to-[99.038%] to-[rgba(19,32,67,0.6)]" />
          {awarded && (
            <div className="absolute bg-[#1b9e74] flex gap-[2px] h-[15.394px] items-center justify-center px-[5px] rounded-[15.118px] right-[4px] top-[4px]">
              <div className="h-[10px] relative shrink-0 w-[9.92px]">
                <img alt="" className="absolute inset-0 max-w-none object-cover size-full" src={aucBadgeCash} />
              </div>
              <span className="font-cairo font-medium text-[9px] text-white leading-[14.417px] whitespace-nowrap">Awarded</span>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-[8px] items-start justify-center relative w-[145px]">
          <div className="flex flex-col gap-[2px] items-start relative shrink-0 w-full">
            <span className="font-cairo font-bold text-[#131313] text-[12px] leading-[16px]">{product.name}</span>
            <span className="font-cairo font-medium text-[#7c7c7c] text-[8px] leading-[12.207px]">{product.category}</span>
          </div>
          <div className="content-center flex flex-wrap gap-[4px_8px] items-center relative shrink-0 w-[145px]">
            <div className="flex gap-[6px] items-center relative shrink-0">
              <AucScalesIcon />
              <span className="font-cairo font-semibold text-[8px] text-[#4a4a4a] leading-[12.207px]">{product.qtyUnits.toLocaleString("en-US")} unit</span>
            </div>
            <div className="flex gap-[6px] items-center relative shrink-0">
              <AucBiddingIcon size={8} />
              <span className="font-cairo font-semibold text-[8px] text-[#4a4a4a] leading-[12.207px]">{bidsCount} bidders</span>
            </div>
            <div className="flex gap-[6px] items-center relative shrink-0">
              <AucJudgmentIcon size={8} />
              <span className="font-cairo font-semibold text-[8px] text-[#4a4a4a] leading-[12.207px]">{product.pricePerUnit}  EGP/unit</span>
            </div>
          </div>
        </div>
        <div className="absolute bottom-[8px] right-[6px]">
          <AucArrowCircle size={24.413} color="#1b9e74" iconSize={5.287} />
        </div>
      </div>
    </button>
  );
}

/* ---------- winners panel (accepted offers overview) ---------- */

function WinnersPanel({
  auction,
  accepted,
  onClose,
}: {
  auction: Auction;
  accepted: AcceptedBid[];
  onClose: () => void;
}) {
  const [openBuyers, setOpenBuyers] = useState<string[]>([]);
  const acceptedBids = accepted
    .map((a) => ({ acc: a, bid: auction.bids.find((b) => b.id === a.bidId) }))
    .filter((x): x is { acc: AcceptedBid; bid: Bid } => !!x.bid);
  const awardedProducts = new Set(acceptedBids.map((x) => x.bid.productId));
  const completion = Math.round((awardedProducts.size / Math.max(1, auction.products.length)) * 100);
  const totalPrice = acceptedBids.reduce((s, x) => s + x.bid.amount, 0);
  const byBuyer = new Map<string, { acc: AcceptedBid; bid: Bid }[]>();
  for (const x of acceptedBids) {
    byBuyer.set(x.bid.bidderId, [...(byBuyer.get(x.bid.bidderId) ?? []), x]);
  }
  return (
    <>
      <div className="fixed inset-0 z-40 bg-[rgba(19,19,19,0.2)]" onClick={onClose} aria-hidden="true" />
      <div role="dialog" aria-label="Winners" className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-white rounded-[24px] p-[24px] w-[min(812px,calc(100vw-32px))] max-h-[85vh] overflow-y-auto flex flex-col gap-[16px]">
        <div className="flex items-center justify-between relative shrink-0 w-full">
          <div className="flex gap-[8px] items-baseline">
            <span className="font-cairo font-bold text-[#131313] text-[16px]">Winners</span>
            <span className="font-cairo font-medium text-[14px] text-[rgba(19,19,19,0.7)]">{acceptedBids.length} recorded actions</span>
          </div>
          <AucCloseButton onClick={onClose} />
        </div>
        <div className="border-b border-[#f5f5f5] border-solid pb-[16px] flex flex-col gap-[8px] w-full">
          <div className="flex items-center justify-between w-full">
            <span className="font-cairo font-semibold text-[#131313] text-[14px]">Award completion</span>
            <span className="font-cairo font-bold text-[#28459d] text-[14px]">{completion}%</span>
          </div>
          <div className="h-[6px] rounded-[3px] bg-[#f5f5f5] w-full relative">
            <div className="absolute h-full left-0 rounded-[3px] bg-[#1b9e74]" style={{ width: `${completion}%` }} />
          </div>
        </div>
        <div className="bg-white border border-[#f5f5f5] border-solid rounded-[16px] flex flex-wrap items-center w-full">
          {[
            { label: "Total products", value: `${auction.products.length}` },
            { label: "Awarded", value: `${awardedProducts.size}` },
            { label: "Pending", value: `${auction.products.length - awardedProducts.size}` },
            { label: "Total Price", value: `${totalPrice.toLocaleString("en-US")} EGP` },
          ].map((s, i, arr) => (
            <div key={s.label} className={`flex flex-col gap-[4px] flex-1 min-w-[120px] px-[24px] py-[12px] ${i < arr.length - 1 ? "border-r border-[#f5f5f5] border-solid" : ""}`}>
              <span className="font-cairo font-medium text-[14px] text-[rgba(19,19,19,0.7)] whitespace-nowrap">{s.label}</span>
              <span className="font-cairo font-bold text-[#131313] text-[20px] whitespace-nowrap">{s.value}</span>
            </div>
          ))}
        </div>
        {acceptedBids.length === 0 ? (
          <EmptyState title="No winners yet" subtitle="Accepted offers will appear here once the auction is ready and you start awarding bids." />
        ) : (
          <div className="flex flex-col gap-[12px] w-full">
            {[...byBuyer.entries()].map(([buyerId, rows]) => {
              const open = openBuyers.includes(buyerId);
              const total = rows.reduce((s, x) => s + x.bid.amount, 0);
              return (
                <div key={buyerId} className="flex flex-col gap-[12px] w-full">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex gap-[8px] items-baseline">
                      <span className="font-cairo font-bold text-[#131313] text-[15px]">{buyerId}</span>
                      <span className="font-cairo font-semibold text-[#666464] text-[14px]">
                        {rows.length} products · {total.toLocaleString("en-US")} total
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setOpenBuyers((s) => (open ? s.filter((b) => b !== buyerId) : [...s, buyerId]))}
                      aria-expanded={open}
                      aria-label={`Toggle ${buyerId} winners`}
                      className="bg-[rgba(40,69,157,0.1)] flex items-center justify-center p-[6px] rounded-[18px] size-[24px] cursor-pointer"
                    >
                      <AucChevron size={14.4} className={open ? "rotate-180" : ""} />
                    </button>
                  </div>
                  {open && (
                    <div className="bg-[#f9f9f9] flex flex-col gap-[12px] p-[8px] rounded-[8px] w-full">
                      <div className="border-b border-[#f5f5f5] border-solid flex items-center justify-between p-[8px] font-cairo font-medium text-[14px] text-[rgba(19,19,19,0.7)] w-full">
                        <span className="w-[140px]">Product</span>
                        <span className="w-[60px]">Qty</span>
                        <span className="w-[89px]">Price</span>
                        <span className="w-[64px]">Action</span>
                      </div>
                      <div className="bg-white border border-[#f5f5f5] border-solid flex flex-col gap-[8px] p-[8px] rounded-[16px] w-full">
                        {rows.map((x) => (
                          <div key={x.bid.id} className="border-b last:border-b-0 border-[#f5f5f5] border-solid flex items-center justify-between p-[8px] w-full">
                            <span className="font-cairo font-semibold text-[#131313] text-[14px] w-[140px] leading-[20px]">{productById(auction, x.bid.productId)?.name}</span>
                            <span className="font-cairo font-semibold text-[#131313] text-[14px] w-[60px]">{x.acc.qtyTons} Ton</span>
                            <span className="font-cairo font-semibold text-[#131313] text-[14px] w-[89px]">{x.bid.amount.toLocaleString("en-US")}</span>
                            <div className="w-[64px]">
                              <AcceptedChip />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}

/* ---------- main detail screen ---------- */

export type AcceptRequest =
  | { kind: "product"; bid: Bid }
  | { kind: "buyer"; bidderId: string; bids: Bid[] }
  | { kind: "scenario"; scenario: Scenario };

type AuctionDetailProps = {
  auction: Auction;
  accepted: AcceptedBid[];
  declined: string[];
  onNavigate: (page: SideBarPage) => void;
  onBack: () => void;
  onRequestAccept: (req: AcceptRequest) => void;
  onRequestClose: () => void;
  onDeclineBid: (bidId: string) => void;
  onOpenTransaction: () => void;
};

export default function AuctionDetail({
  auction,
  accepted,
  declined,
  onNavigate,
  onBack,
  onRequestAccept,
  onRequestClose,
  onDeclineBid,
  onOpenTransaction,
}: AuctionDetailProps) {
  const [view, setView] = useState<DetailView>("product");
  const [productSearch, setProductSearch] = useState("");
  const [productCategory, setProductCategory] = useState<string | null>(null);
  const [awardTab, setAwardTab] = useState<"Awarded" | "Pending" | null>(null);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(auction.products[0]?.id ?? null);
  const [selectedBidderId, setSelectedBidderId] = useState<string | null>(auction.bidders[0]?.id ?? null);
  const [selectedScenario, setSelectedScenario] = useState<Scenario["key"]>("max");
  const [openBuyerGroups, setOpenBuyerGroups] = useState<string[]>([]);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [winnersOpen, setWinnersOpen] = useState(false);

  const running = auction.status === "active";
  const locked = running || auction.status === "cancelled";
  const acceptedBidIds = accepted.map((a) => a.bidId);

  const isProductAwarded = (productId: string) => auction.bids.some((b) => b.productId === productId && acceptedBidIds.includes(b.id));

  const categories = useMemo(() => [...new Set(auction.products.map((p) => p.category))], [auction]);

  const visibleProducts = useMemo(() => {
    return auction.products.filter((p) => {
      if (productSearch && !p.name.toLowerCase().includes(productSearch.toLowerCase())) return false;
      if (productCategory && p.category !== productCategory) return false;
      if (awardTab === "Awarded" && !isProductAwarded(p.id)) return false;
      if (awardTab === "Pending" && isProductAwarded(p.id)) return false;
      return true;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auction, productSearch, productCategory, awardTab, accepted]);

  const selectedProduct = visibleProducts.find((p) => p.id === selectedProductId) ?? visibleProducts[0] ?? null;
  const selectedBidder = auction.bidders.find((b) => b.id === selectedBidderId) ?? auction.bidders[0] ?? null;

  const scenarios = useMemo(() => buildScenarios(auction, declined), [auction, declined]);
  const everyProductHasBids = auction.products.every((p) => rankedBidsFor(auction, p.id, declined).length > 0);
  const activeScenario = scenarios.find((s) => s.key === selectedScenario) ?? scenarios[0];

  const maxBid = Math.max(0, ...auction.bids.map((b) => b.amount));

  /* Action cell for a bid row, correctly derived from auction status + accept state */
  const actionCell = (bid: Bid) =>
    acceptedBidIds.includes(bid.id) ? (
      <AcceptedChip />
    ) : locked ? (
      <AucLockIcon />
    ) : (
      <div className="flex gap-[8px] items-center relative shrink-0">
        <AucCheckButton onClick={() => onRequestAccept({ kind: "product", bid })} label={`Accept bid ${bid.id}`} />
        <AucXButton onClick={() => onDeclineBid(bid.id)} label={`Decline bid ${bid.id}`} />
      </div>
    );

  const galleryPrev = () => setGalleryIndex((i) => (i - 1 + auction.gallery.length) % auction.gallery.length);
  const galleryNext = () => setGalleryIndex((i) => (i + 1) % auction.gallery.length);

  return (
    <div className="bg-[#f5f5f5] flex flex-col items-start min-h-screen p-[24px] relative w-full" data-name="Auctions">
      <div className="flex flex-col lg:flex-row gap-[16px] items-start lg:justify-center relative shrink-0 w-full max-w-[1392px] mx-auto" data-name="Sidebar Container">
        <div className="flex items-start relative shrink-0 w-full lg:w-auto">
          <div className="flex flex-col gap-[24px] lg:h-full items-start relative shrink-0 w-full lg:w-[201px]">
            <UserProfile />
            <SideBar className="lg:h-[940px] relative shrink-0 w-full lg:w-[200px]" active="myAuctions" onNavigate={onNavigate} />
          </div>
        </div>
        <div className="flex flex-col gap-[24px] items-end relative shrink-0 w-full lg:w-auto lg:flex-[1_0_0] lg:max-w-[1175px] min-w-0" data-name="Main Content">
          <TopBar />

          {/* Auction Information header */}
          <div className="flex flex-col md:flex-row gap-[16px] md:items-center md:justify-between relative shrink-0 w-full" data-name="Auction Information">
            <div className="flex flex-col gap-[8px] items-start justify-center relative shrink-0" data-name="Auction Details">
              <div className="flex gap-[16px] items-center relative shrink-0" data-name="Auction Name Container">
                <div className="flex gap-[4px] items-center relative shrink-0">
                  <button type="button" onClick={onBack} aria-label="Back to auctions" className="flex items-center justify-center relative shrink-0 size-[19.2px] cursor-pointer">
                    <AucChevron size={19.2} className="rotate-90" />
                  </button>
                  <span className="font-cairo font-bold text-[#131313] text-[18px] leading-[normal] whitespace-nowrap">{auction.name}</span>
                </div>
                <div className={`${running ? "bg-[rgba(27,158,116,0.16)]" : "bg-[rgba(19,19,19,0.08)]"} flex gap-[2px] h-[24px] items-center justify-center p-[8px] relative rounded-[24px] shrink-0`}>
                  <div className="h-[16px] relative shrink-0 w-[15px]">
                    <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={aucBadgeCash} />
                  </div>
                  <span className={`font-cairo font-bold ${running ? "text-[#1b9e74]" : "text-[rgba(19,19,19,0.7)]"} text-[10px] leading-[normal] whitespace-nowrap`}>
                    {running ? "active" : "Closed"}
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap gap-x-[32px] gap-y-[4px] items-center pl-[22px] relative shrink-0 max-w-full" data-name="Icons + Text">
                <div className="flex gap-[8px] items-center relative shrink-0">
                  <AucTagIcon />
                  <span className="font-cairo font-semibold opacity-80 text-[14px] text-[rgba(19,19,19,0.8)] leading-[20px] whitespace-nowrap">Auction ID: {auction.id}</span>
                </div>
                <div className="flex gap-[8px] items-center relative shrink-0">
                  <AucCal12Icon />
                  <span className="font-cairo font-semibold opacity-80 text-[14px] text-[rgba(19,19,19,0.8)] leading-[20px] whitespace-nowrap">{auction.startedLabel}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-[16px] items-center relative shrink-0 flex-wrap" data-name="Badge Container">
              <button
                type="button"
                onClick={() => setWinnersOpen(true)}
                disabled={accepted.length === 0}
                className={`${accepted.length === 0 ? "bg-[rgba(40,69,157,0.3)] cursor-default" : "bg-[#28459d] cursor-pointer"} flex gap-[4px] h-[40px] items-center justify-center px-[16px] py-[8px] relative rounded-[24px] shrink-0`}
                aria-label="Awarded offers"
              >
                <AucMedalStarIcon />
                <span className="font-cairo font-bold text-[16px] text-white leading-[normal] whitespace-nowrap">
                  {accepted.length > 0 ? `Awarded ${accepted.length}` : "Awarded"}
                </span>
              </button>
              <button
                type="button"
                onClick={() => {
                  /* share auction */
                }}
                aria-label="Share auction"
                className="bg-white border border-[#f0f0f0] border-solid flex items-center justify-center px-[16px] py-[8px] relative rounded-[24px] shrink-0 size-[40px] cursor-pointer"
                data-name="Options Icon"
              >
                <AucShareIcon />
              </button>
              {running && (
                <button
                  type="button"
                  onClick={onRequestClose}
                  className="bg-[#1b9e74] flex gap-[8px] h-[40px] items-center justify-center px-[16px] py-[8px] relative rounded-[24px] shrink-0 cursor-pointer"
                >
                  <AucUncheckedIcon />
                  <span className="font-cairo font-bold text-[16px] text-white leading-[normal] whitespace-nowrap">End Auction</span>
                </button>
              )}
            </div>
          </div>

          {/* Metrics Section: center views + right info column */}
          <div className="flex flex-col xl:flex-row gap-[16px] items-start relative shrink-0 w-full" data-name="Metrics Section">
            <div className="flex flex-col gap-[16px] items-start relative flex-1 min-w-0 w-full" data-name="Metrics Section">
              {/* View tabs */}
              <div className="bg-white flex items-center p-[8px] relative rounded-[24px] shrink-0 w-full" data-name="Frame 226">
                <div className="flex flex-col sm:flex-row gap-[14px] items-stretch sm:items-center relative w-full">
                  {(
                    [
                      { key: "product", label: "Product View" },
                      { key: "buyer", label: "Buyer View" },
                      { key: "recommendation", label: "Recommendation" },
                    ] as { key: DetailView; label: string }[]
                  ).map((t) => (
                    <button
                      key={t.key}
                      type="button"
                      onClick={() => setView(t.key)}
                      aria-pressed={view === t.key}
                      className={`${view === t.key ? "bg-[#28459d]" : "bg-gradient-to-b from-[#fdfdfd] to-[#f5f5f5]"} flex sm:flex-1 h-[32px] items-center justify-center px-[16px] py-[8px] relative rounded-[24px] min-w-0 cursor-pointer`}
                    >
                      <span className={`font-cairo font-bold text-[16px] leading-[normal] whitespace-nowrap ${view === t.key ? "text-white" : "text-[rgba(19,19,19,0.4)]"}`}>{t.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Completed / cancelled banner */}
              {auction.status === "completed" && (
                <div className="bg-white flex flex-col items-center gap-[12px] rounded-[24px] p-[24px] w-full" data-name="Auction Completed">
                  <div className="size-[48px] relative">
                    <img alt="" className="absolute block inset-0 max-w-none size-full object-contain" src={aucAcceptCheck} />
                  </div>
                  <span className="font-cairo font-bold text-[#131313] text-[22px] leading-[normal] text-center">Auction completed</span>
                  <span className="font-cairo font-normal text-[16px] text-[rgba(19,19,19,0.7)] leading-[24px] text-center max-w-[422px]">
                    All offers have been accepted and this auction is settled. Record the money and quantity movements as transactions.
                  </span>
                  <button
                    type="button"
                    onClick={onOpenTransaction}
                    className="bg-[#28459d] flex h-[44px] items-center justify-center px-[24px] py-[8px] relative rounded-[24px] cursor-pointer"
                  >
                    <span className="font-cairo font-bold text-[16px] text-white leading-[normal]">Transaction</span>
                  </button>
                </div>
              )}
              {auction.status === "cancelled" && (
                <div className="bg-white flex flex-col items-center gap-[8px] rounded-[24px] p-[24px] w-full" data-name="Auction Cancelled">
                  <span className="font-cairo font-bold text-[#131313] text-[22px] leading-[normal] text-center">Auction cancelled</span>
                  <span className="font-cairo font-normal text-[16px] text-[rgba(19,19,19,0.7)] leading-[24px] text-center max-w-[422px]">
                    This auction was voided — no offers were accepted and all products returned to inventory.
                  </span>
                </div>
              )}

              {/* Bidding Section */}
              <div className="bg-white flex flex-col relative rounded-[24px] shrink-0 w-full" data-name="Bidding Section">
                <div className="flex flex-col gap-[16px] p-[16px] relative w-full" data-name="Bidding Container">
                  {view === "product" && (
                    <>
                      <div className="flex items-center justify-between relative shrink-0 w-full" data-name="Bidding Header">
                        <div className="flex gap-[5px] items-center relative shrink-0">
                          <AucProductIcon size={14} />
                          <div className="flex gap-[8px] items-baseline relative shrink-0">
                            <span className="font-cairo font-bold text-[#131313] text-[16px] leading-[normal]">Product</span>
                            <span className="font-cairo font-medium text-[14px] text-[rgba(19,19,19,0.7)] leading-[normal]">{auction.products.length} products</span>
                          </div>
                        </div>
                        <div className="flex gap-[8px] items-center relative shrink-0" data-name="Bidding Status">
                          {(["Awarded", "Pending"] as const).map((t) => (
                            <button
                              key={t}
                              type="button"
                              onClick={() => setAwardTab(awardTab === t ? null : t)}
                              aria-pressed={awardTab === t}
                              className={`px-[8px] py-[1px] font-cairo cursor-pointer text-[16px] leading-[30px] ${awardTab === t ? "font-bold text-[#28459d] border-b-2 border-[#28459d] border-solid" : "font-medium text-[rgba(19,19,19,0.5)]"}`}
                            >
                              {t}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="bg-[#f9f9f9] flex items-center p-[4px] relative rounded-[40px] shrink-0 w-full" data-name="Bids List">
                        <div className="bg-white border border-[#dadada] border-solid flex flex-1 h-[40px] items-center justify-between min-w-0 px-[16px] py-[11px] relative rounded-[24px]" data-name="Bid Entry">
                          <div className="flex gap-[8px] items-center relative flex-1 min-w-0">
                            <AucSearchIcon />
                            <input
                              type="text"
                              value={productSearch}
                              onChange={(e) => setProductSearch(e.target.value)}
                              placeholder="Search Here By Product Name"
                              aria-label="Search products"
                              className="flex-1 min-w-0 bg-transparent outline-none font-cairo font-normal text-[12px] leading-[18px] text-[#131313] placeholder:text-[rgba(19,19,19,0.7)]"
                            />
                          </div>
                          <button type="button" onClick={() => setProductSearch("")} aria-label="Clear product search" className="cursor-pointer shrink-0">
                            <AucClearIcon />
                          </button>
                        </div>
                      </div>
                      <div className="flex gap-[12px] items-center relative shrink-0 w-full overflow-x-auto [scrollbar-width:none]" data-name="Filters Container">
                        {[null, ...categories].map((c) => {
                          const active = productCategory === c;
                          return (
                            <button
                              key={c ?? "all"}
                              type="button"
                              onClick={() => setProductCategory(c)}
                              aria-pressed={active}
                              className={`${active ? "bg-[#28459d]" : "bg-[rgba(245,245,245,0.2)] border border-[#f5f5f5] border-solid"} flex h-[32px] items-center justify-center px-[16px] py-[8px] relative rounded-[24px] shrink-0 cursor-pointer`}
                            >
                              <span className={`font-cairo ${active ? "font-bold text-white" : "font-medium text-[#828282]"} text-[16px] leading-[normal] whitespace-nowrap`}>{c ?? "All"}</span>
                            </button>
                          );
                        })}
                      </div>
                      <div className="flex flex-col md:flex-row gap-[16px] items-start relative shrink-0 w-full" data-name="Bid Items List">
                        <div className="flex flex-row md:flex-col gap-[8px] items-start relative shrink-0 w-full md:w-[199px] overflow-x-auto md:overflow-x-visible md:max-h-[600px] md:overflow-y-auto [scrollbar-width:none] pr-[4px]" data-name="Bid Item Container">
                          {visibleProducts.map((p) => (
                            <ProductCardSmall
                              key={p.id}
                              product={p}
                              bidsCount={rankedBidsFor(auction, p.id, declined).length}
                              awarded={isProductAwarded(p.id)}
                              selected={selectedProduct?.id === p.id}
                              onSelect={() => setSelectedProductId(p.id)}
                            />
                          ))}
                          {visibleProducts.length === 0 && (
                            <span className="font-cairo font-medium text-[14px] text-[rgba(19,19,19,0.6)] p-[8px]">No products match.</span>
                          )}
                        </div>
                        <div className="flex flex-col flex-1 min-w-0 relative w-full border-l-0 md:border-l border-[#f5f5f5] border-solid md:pl-[16px]" data-name="Bid Item Info">
                          {selectedProduct ? (
                            (() => {
                              const ranked = rankedBidsFor(auction, selectedProduct.id, declined);
                              const highest = highestBidFor(auction, selectedProduct.id, declined);
                              return (
                                <div className="flex flex-col gap-[24px] relative w-full" data-name="Bid Item Vertical">
                                  <div className="flex gap-[5px] items-center relative shrink-0">
                                    <AucBiddingIcon size={14} />
                                    <div className="flex gap-[8px] items-baseline relative shrink-0">
                                      <span className="font-cairo font-bold text-[#131313] text-[16px] leading-[normal]">Bid History</span>
                                      <span className="font-cairo font-medium text-[14px] text-[rgba(19,19,19,0.7)] leading-[normal]">{ranked.length} Bidders</span>
                                    </div>
                                  </div>
                                  {ranked.length === 0 ? (
                                    <EmptyState title="No bids on this product yet" subtitle={`It stays in the "No bids" status until a buyer submits an offer for it.`} />
                                  ) : (
                                    <div className="flex flex-col relative w-full overflow-x-auto" data-name="Bidding List">
                                      <div className="min-w-[560px]">
                                        <div className="flex items-center justify-between p-[8px] font-cairo font-medium text-[14px] text-[rgba(19,19,19,0.7)] w-full" data-name="Bidding Headers">
                                          <span className="w-[44px]">Rank</span>
                                          <span className="w-[119px]">Bidder ID</span>
                                          <span className="w-[39px]">Rating</span>
                                          <span className="w-[75px]">Offered Qty</span>
                                          <span className="w-[89px]">Bid Offered</span>
                                          <span className="w-[64px]">Action</span>
                                        </div>
                                        {ranked.map((bid, i) => {
                                          const bidder = bidderById(auction, bid.bidderId)!;
                                          return (
                                            <div key={bid.id} className="border-b border-[#f5f5f5] border-solid flex items-center justify-between p-[8px] relative w-full min-h-[59px]" data-name="Bid Row">
                                              <div className="w-[44px]">
                                                <RankPill rank={i + 1} />
                                              </div>
                                              <div className="w-[119px] relative">
                                                <BidderInfoCell bidder={bidder} />
                                              </div>
                                              <div className="flex gap-[4px] items-center relative shrink-0 w-[39px]">
                                                <span className="font-cairo font-semibold text-[#131313] text-[14px] leading-[normal]">{bidder.rating}</span>
                                                <AucStarIcon />
                                              </div>
                                              <span className="font-cairo font-semibold text-[#131313] text-[14px] leading-[normal] w-[75px]">{bid.qtyTons} Ton</span>
                                              <PriceCell amount={bid.amount} highest={highest} />
                                              <div className="w-[64px] flex items-center">{actionCell(bid)}</div>
                                            </div>
                                          );
                                        })}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              );
                            })()
                          ) : (
                            <EmptyState title="No bids on this product yet" subtitle={`It stays in the "No bids" status until a buyer submits an offer for it.`} />
                          )}
                        </div>
                      </div>
                    </>
                  )}

                  {view === "buyer" && (
                    <>
                      <div className="flex items-center justify-between relative shrink-0 w-full" data-name="Bidding Header">
                        <div className="flex gap-[5px] items-center relative shrink-0">
                          <AucBiddingIcon size={14} />
                          <div className="flex gap-[8px] items-baseline relative shrink-0">
                            <span className="font-cairo font-bold text-[#131313] text-[16px] leading-[normal]">Bids Received</span>
                            <span className="font-cairo font-medium text-[14px] text-[rgba(19,19,19,0.7)] leading-[normal]">{auction.bidders.length} buyers</span>
                          </div>
                        </div>
                      </div>
                      {auction.bidders.length === 0 ? (
                        <EmptyState title="No bids received yet" subtitle="Share this auction with suppliers and buyers to start collecting offers on your products." />
                      ) : (
                        <div className="flex flex-col md:flex-row gap-[16px] items-start relative shrink-0 w-full" data-name="Bid Items List">
                          <div className="flex flex-row md:flex-col gap-[8px] items-start relative shrink-0 w-full md:w-[212px] overflow-x-auto md:overflow-x-visible [scrollbar-width:none] pr-[4px]" data-name="Bid Item Container">
                            {auction.bidders.map((b) => {
                              const bids = bidsByBidder(auction, b.id, declined);
                              const total = bids.reduce((s, x) => s + x.amount, 0);
                              const sel = selectedBidder?.id === b.id;
                              return (
                                <button
                                  key={b.id}
                                  type="button"
                                  onClick={() => setSelectedBidderId(b.id)}
                                  aria-pressed={sel}
                                  className={`bg-white relative rounded-[12px] shrink-0 w-[202px] text-left cursor-pointer border ${sel ? "border-[#28459d]" : "border-[#f5f5f5]"} border-solid`}
                                  data-name="Product Card"
                                >
                                  <div className="flex flex-col gap-[12px] p-[8px] relative w-full">
                                    <div className="flex items-center justify-between relative w-full">
                                      <div className="flex gap-[4px] items-center relative shrink-0">
                                        <span className="font-cairo font-bold text-[#131313] text-[12px] leading-[normal]">{b.id}</span>
                                        <div className="flex gap-[2px] items-center relative shrink-0">
                                          <span className="font-cairo font-semibold text-[#28459d] text-[10px] leading-[normal]">{b.rating}</span>
                                          <AucStarIcon size={10} />
                                        </div>
                                      </div>
                                      <VerifiedChip bidder={b} small />
                                    </div>
                                    <div className="flex items-center justify-between relative w-full">
                                      <div className="flex gap-[12px] items-center relative shrink-0">
                                        <div className="flex gap-[4px] items-center relative shrink-0">
                                          <AucScalesIcon size={8} />
                                          <span className="font-cairo font-semibold text-[10px] text-[#4a4a4a] leading-[12.207px]">{bids.length} products</span>
                                        </div>
                                        <div className="flex gap-[4px] items-center relative shrink-0">
                                          <AucJudgmentIcon size={8} />
                                          <span className="font-cairo font-semibold text-[10px] text-[#4a4a4a] leading-[12.207px]">{total.toLocaleString("en-US")} EGP</span>
                                        </div>
                                      </div>
                                      <AucArrowCircle size={24.413} color="#1b9e74" iconSize={5.287} />
                                    </div>
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                          <div className="flex flex-col flex-1 min-w-0 relative w-full border-l-0 md:border-l border-[#f5f5f5] border-solid md:pl-[16px]" data-name="Bid Item Info">
                            {selectedBidder &&
                              (() => {
                                const bids = bidsByBidder(auction, selectedBidder.id, declined);
                                return (
                                  <div className="flex flex-col gap-[24px] relative w-full">
                                    <div className="flex items-center justify-between relative shrink-0 w-full">
                                      <div className="flex gap-[5px] items-center relative shrink-0">
                                        <AucBiddingIcon size={14} />
                                        <div className="flex gap-[8px] items-baseline relative shrink-0">
                                          <span className="font-cairo font-bold text-[#131313] text-[16px] leading-[normal]">All Products</span>
                                          <span className="font-cairo font-medium text-[14px] text-[rgba(19,19,19,0.7)] leading-[normal]">{bids.length} Product</span>
                                        </div>
                                      </div>
                                      {locked ? (
                                        <AucLockIcon />
                                      ) : bids.some((b) => !acceptedBidIds.includes(b.id)) ? (
                                        <button
                                          type="button"
                                          onClick={() => onRequestAccept({ kind: "buyer", bidderId: selectedBidder.id, bids: bids.filter((b) => !acceptedBidIds.includes(b.id)) })}
                                          className="bg-[#1b9e74] flex h-[32px] items-center justify-center px-[16px] py-[4px] relative rounded-[24px] cursor-pointer"
                                        >
                                          <span className="font-cairo font-bold text-[14px] text-white leading-[normal]">Accept All</span>
                                        </button>
                                      ) : (
                                        <AcceptedChip />
                                      )}
                                    </div>
                                    {bids.length === 0 ? (
                                      <EmptyState title="No bids received yet" subtitle="Share this auction with suppliers and buyers to start collecting offers on your products." />
                                    ) : (
                                      <div className="flex flex-col relative w-full overflow-x-auto">
                                        <div className="min-w-[540px]">
                                          <div className="flex items-center justify-between p-[8px] font-cairo font-medium text-[14px] text-[rgba(19,19,19,0.7)] w-full" data-name="Frame 63">
                                            <span className="w-[130px]">Product</span>
                                            <span className="w-[44px]">Rank</span>
                                            <span className="w-[60px]">Qty</span>
                                            <span className="w-[89px]">Price</span>
                                            <span className="w-[64px]">Action</span>
                                          </div>
                                          {bids.map((bid) => {
                                            const ranked = rankedBidsFor(auction, bid.productId, declined);
                                            const rank = ranked.findIndex((r) => r.id === bid.id) + 1;
                                            const highest = highestBidFor(auction, bid.productId, declined);
                                            return (
                                              <div key={bid.id} className="border-b border-[#f5f5f5] border-solid flex items-center justify-between p-[8px] relative w-full min-h-[59px] bg-[#fbfbfb] rounded-[8px] mb-[4px]">
                                                <span className="font-cairo font-semibold text-[#131313] text-[14px] leading-[20px] w-[130px]">{productById(auction, bid.productId)?.name}</span>
                                                <div className="w-[44px]">
                                                  <RankPill rank={rank} />
                                                </div>
                                                <span className="font-cairo font-semibold text-[#131313] text-[14px] w-[60px]">{bid.qtyTons} Ton</span>
                                                <PriceCell amount={bid.amount} highest={highest} />
                                                <div className="w-[64px] flex items-center">{actionCell(bid)}</div>
                                              </div>
                                            );
                                          })}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                );
                              })()}
                          </div>
                        </div>
                      )}
                    </>
                  )}

                  {view === "recommendation" && (
                    <>
                      <div className="flex gap-[5px] items-center relative shrink-0">
                        <AucBiddingIcon size={14} />
                        <span className="font-cairo font-bold text-[#131313] text-[16px] leading-[normal]">Optimized allocation</span>
                      </div>
                      {!everyProductHasBids || scenarios.length === 0 ? (
                        <EmptyState
                          title="No recommendation available yet"
                          subtitle="We need at least one bid on every product before an optimized allocation scenario can be calculated."
                        />
                      ) : (
                        <>
                          <div className="flex flex-col lg:flex-row gap-[16px] items-stretch relative shrink-0 w-full" data-name="Scenario Container">
                            {scenarios.map((s) => {
                              const sel = selectedScenario === s.key;
                              return (
                                <button
                                  key={s.key}
                                  type="button"
                                  onClick={() => setSelectedScenario(s.key)}
                                  aria-pressed={sel}
                                  className={`bg-white border-2 ${sel ? "border-[#28459d]" : "border-[#f5f5f5]"} border-solid flex flex-1 flex-col gap-[16px] items-start min-w-0 p-[12px] relative rounded-[12px] text-left cursor-pointer`}
                                >
                                  <div className="flex flex-col gap-[8px] items-start relative shrink-0 w-full">
                                    <div className="flex items-center justify-between relative shrink-0 w-full">
                                      <span className="font-cairo font-bold text-[#131313] text-[16px] leading-[normal] whitespace-nowrap">{s.title}</span>
                                      <div
                                        className={`${s.chipTone === "blue" ? "bg-[rgba(40,69,157,0.1)]" : s.chipTone === "green" ? "bg-[rgba(27,158,116,0.1)]" : "bg-[rgba(249,160,0,0.1)]"} flex items-center justify-center px-[8px] py-[4px] relative rounded-[24px] shrink-0`}
                                      >
                                        <span className={`font-cairo font-bold text-[10px] leading-[normal] ${s.chipTone === "blue" ? "text-[#28459d]" : s.chipTone === "green" ? "text-[#1b9e74]" : "text-[#f9a000]"}`}>
                                          {s.chip}
                                        </span>
                                      </div>
                                    </div>
                                    <div className="flex flex-col gap-[8px] items-start relative shrink-0 w-full">
                                      <span className={`font-cairo font-bold text-[20px] leading-[normal] w-full ${s.key === "max" ? "text-[#28459d]" : "text-[#131313]"}`}>
                                        {s.revenue.toLocaleString("en-US")} EGP
                                      </span>
                                      <div className={`${s.key === "max" ? "bg-[rgba(27,158,116,0.08)]" : "bg-[#f5f5f5]"} flex items-center px-[8px] relative rounded-[24px] shrink-0 w-full overflow-clip`}>
                                        <span className={`font-cairo font-bold text-[10px] leading-[normal] whitespace-pre ${s.key === "max" ? "text-[#1b9e74]" : "text-[#666464]"}`}>{s.note}</span>
                                      </div>
                                    </div>
                                  </div>
                                  {sel && (
                                    <span
                                      role="button"
                                      tabIndex={locked ? -1 : 0}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        if (!locked) onRequestAccept({ kind: "scenario", scenario: s });
                                      }}
                                      aria-disabled={locked}
                                      aria-label={`Accept scenario ${s.title}`}
                                      className={`${locked ? "bg-[rgba(40,69,157,0.3)] cursor-default" : "bg-[#28459d] cursor-pointer"} flex h-[44px] items-center justify-center relative rounded-[22px] w-full`}
                                    >
                                      <span className="font-cairo font-bold text-[13px] text-white leading-[normal]">Accept this scenario</span>
                                    </span>
                                  )}
                                </button>
                              );
                            })}
                          </div>
                          {activeScenario && (
                            <div className="flex flex-col gap-[16px] relative shrink-0 w-full" data-name="Frame 2085663850">
                              <div className="flex items-center justify-between relative shrink-0 w-full">
                                <div className="flex gap-[8px] items-baseline relative shrink-0">
                                  <span className="font-cairo font-bold text-[#131313] text-[16px] leading-[normal]">
                                    {new Set(activeScenario.allocation.map((b) => b.bidderId)).size} unique buyers
                                  </span>
                                  <span className="font-cairo font-medium text-[14px] text-[rgba(19,19,19,0.7)] leading-[normal]">{activeScenario.allocation.length} Product</span>
                                </div>
                                {locked && <AucLockIcon />}
                              </div>
                              <div className="flex flex-col gap-[16px] relative shrink-0 w-full">
                                {[...new Set(activeScenario.allocation.map((b) => b.bidderId))].map((buyerId) => {
                                  const rows = activeScenario.allocation.filter((b) => b.bidderId === buyerId);
                                  const total = rows.reduce((s, b) => s + b.amount, 0);
                                  const open = openBuyerGroups.includes(buyerId);
                                  return (
                                    <div key={buyerId} className="flex flex-col gap-[12px] relative shrink-0 w-full">
                                      <div className="flex items-start justify-between relative shrink-0 w-full">
                                        <div className="flex gap-[8px] items-baseline relative shrink-0">
                                          <span className="font-cairo font-bold text-[#131313] text-[15px] leading-[normal]">{buyerId}</span>
                                          <span className="font-cairo font-semibold text-[#666464] text-[14px] leading-[normal]">
                                            {rows.length} products · {total.toLocaleString("en-US")} total
                                          </span>
                                        </div>
                                        <button
                                          type="button"
                                          onClick={() => setOpenBuyerGroups((s) => (open ? s.filter((b) => b !== buyerId) : [...s, buyerId]))}
                                          aria-expanded={open}
                                          aria-label={`Toggle ${buyerId} products`}
                                          className="bg-[rgba(40,69,157,0.1)] flex items-center justify-center p-[6px] rounded-[18px] size-[24px] cursor-pointer"
                                        >
                                          <AucChevron size={14.4} className={open ? "rotate-180" : ""} />
                                        </button>
                                      </div>
                                      {open && (
                                        <div className="bg-[#f9f9f9] flex flex-col gap-[12px] items-start p-[8px] relative rounded-[8px] shrink-0 w-full">
                                          <div className="border-b border-[#f5f5f5] border-solid flex items-center justify-between p-[8px] font-cairo font-medium text-[14px] text-[rgba(19,19,19,0.7)] relative shrink-0 w-full">
                                            <span className="w-[140px]">Product</span>
                                            <span className="w-[60px]">Qty</span>
                                            <span className="w-[89px]">Price</span>
                                            <span className="w-[64px]">Action</span>
                                          </div>
                                          <div className="bg-white border border-[#f5f5f5] border-solid flex flex-col gap-[8px] items-start p-[8px] relative rounded-[16px] shrink-0 w-full">
                                            {rows.map((bid) => {
                                              const highest = highestBidFor(auction, bid.productId, declined);
                                              return (
                                                <div key={bid.id} className="border-b last:border-b-0 border-[#f5f5f5] border-solid flex items-center justify-between p-[8px] relative shrink-0 w-full">
                                                  <span className="font-cairo font-semibold text-[#131313] text-[14px] leading-[20px] w-[140px]">{productById(auction, bid.productId)?.name}</span>
                                                  <span className="font-cairo font-semibold text-[#131313] text-[14px] w-[60px]">{bid.qtyTons} Ton</span>
                                                  <PriceCell amount={bid.amount} highest={highest} />
                                                  <div className="w-[64px] flex items-center">{acceptedBidIds.includes(bid.id) ? <AcceptedChip /> : <AucLockIcon />}</div>
                                                </div>
                                              );
                                            })}
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Fixed right column */}
            <div className="flex flex-col gap-[16px] items-start relative shrink-0 w-full xl:w-[325px]" data-name="Card Container">
              <div className="flex gap-[6.6px] items-start relative shrink-0 w-full" data-name="Card Details">
                <div className="h-[192px] overflow-clip relative rounded-[16px] flex-1 min-w-0" data-name="Card Image">
                  <img alt="" className="absolute max-w-none object-cover size-full" src={auction.gallery[galleryIndex]} />
                  <div className="absolute bottom-[8px] right-[8px] flex gap-[8px]">
                    <button type="button" onClick={galleryPrev} aria-label="Previous image" className="bg-[rgba(255,255,255,0.3)] flex items-center justify-center rounded-full size-[28px] cursor-pointer">
                      <AucChevron size={14.4} className="rotate-90 brightness-0 invert" />
                    </button>
                    <button type="button" onClick={galleryNext} aria-label="Next image" className="bg-[#28459d] flex items-center justify-center rounded-full size-[28px] cursor-pointer">
                      <AucChevron size={14.4} className="-rotate-90 brightness-0 invert" />
                    </button>
                  </div>
                </div>
                <div className="flex flex-col gap-[6.66px] items-start relative shrink-0 w-[119px]" data-name="Carousel Container">
                  <div className="h-[92.29px] overflow-clip relative rounded-[12px] w-full">
                    <img alt="" className="absolute max-w-none object-cover size-full" src={auction.gallery[(galleryIndex + 1) % auction.gallery.length]} />
                  </div>
                  <div className="h-[92.29px] overflow-clip relative rounded-[12px] w-full">
                    <img alt="" className="absolute max-w-none object-cover size-full" src={auction.gallery[(galleryIndex + 2) % auction.gallery.length]} />
                    <div className="absolute inset-0 bg-[rgba(19,32,67,0.6)] flex items-center justify-center">
                      <span className="font-cairo font-bold text-[24px] text-white">+{auction.extraImages}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Live Status */}
              <div className="bg-white flex flex-col items-start p-[16px] relative rounded-[24px] shrink-0 w-full" data-name="Frame 535">
                <div className="flex flex-col gap-[24px] items-center overflow-clip relative shrink-0 w-full">
                  <div className="border-b border-[#f5f5f5] border-solid flex gap-[5px] items-center pb-[16px] relative shrink-0 w-full">
                    <AucLiveStatusIcon />
                    <span className="font-cairo font-bold text-[#131313] text-[16px] leading-[normal] h-[21px] w-[131px]">Live Status</span>
                  </div>
                  <div className="flex items-start justify-between relative shrink-0 w-full">
                    <div className="flex flex-col gap-[3px] h-[57px] items-start relative shrink-0 w-[136px]">
                      <span className="font-cairo font-semibold text-[12px] text-[rgba(19,19,19,0.6)] leading-[normal] whitespace-nowrap">Current Highest Bid</span>
                      <span className="font-cairo font-bold text-[#28459d] text-[24px] leading-[32px] whitespace-nowrap">{maxBid.toLocaleString("en-US")} $</span>
                    </div>
                    <div className="bg-[rgba(27,158,116,0.1)] flex flex-col items-center p-[8px] relative rounded-[8px] shrink-0 w-[157px]">
                      <div className="flex flex-col gap-[3px] items-start relative shrink-0 text-[#1b9e74]">
                        <span className="font-cairo font-semibold text-[12px] leading-[normal] whitespace-nowrap">Time Remaining</span>
                        <span className="font-cairo font-bold text-[20px] leading-[32px] whitespace-nowrap">{running ? auction.detailTimeRemaining : "0h 0m"}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Auction Overview */}
              <div className="bg-white flex flex-col items-start p-[16px] relative rounded-[24px] shrink-0 w-full" data-name="Frame 538">
                <div className="flex flex-col gap-[24px] items-center overflow-clip relative shrink-0 w-full">
                  <div className="border-b border-[#f5f5f5] border-solid flex gap-[5px] items-center pb-[16px] relative shrink-0 w-full">
                    <AucOverviewIcon />
                    <span className="font-cairo font-bold text-[#131313] text-[16px] leading-[normal] h-[21px] w-[131px]">Auction Overview</span>
                  </div>
                  <div className="flex flex-col gap-[16px] items-start relative shrink-0 w-full">
                    <div className="border border-[#f5f5f5] border-solid flex items-center justify-between p-[12px] relative rounded-[20px] shrink-0 w-full">
                      <div className="flex gap-[8px] items-start relative shrink-0">
                        <AucCal12Icon />
                        <div className="flex flex-col gap-[12px] items-start relative shrink-0">
                          <span className="font-cairo font-semibold h-[11px] opacity-80 text-[14px] text-[rgba(19,19,19,0.6)] leading-[24px]">Start Date</span>
                          <div className="font-cairo font-semibold opacity-80 text-[#131313] text-[14px] leading-[20px]">
                            <p className="mb-0 whitespace-pre">{auction.startDate} </p>
                            <p className="whitespace-pre">{auction.startTime}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-[8px] items-start relative shrink-0">
                        <AucClockIcon />
                        <div className="flex flex-col gap-[12px] items-start relative shrink-0">
                          <span className="font-cairo font-semibold h-[11px] opacity-80 text-[14px] text-[rgba(19,19,19,0.6)] leading-[24px]">End Date</span>
                          <div className="font-cairo font-semibold opacity-80 text-[#131313] text-[14px] leading-[20px]">
                            <p className="mb-0 whitespace-pre">{auction.endDate} </p>
                            <p className="whitespace-pre">{auction.endTime}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="border border-[#f5f5f5] border-solid flex flex-col gap-[12px] items-start p-[12px] relative rounded-[28px] shrink-0 w-full">
                      <div className="border-b-[1.042px] border-[#f6f6f7] border-solid flex items-center pb-[8.334px] relative shrink-0 w-full">
                        <span className="font-cairo font-bold flex-1 h-[20.836px] min-w-0 text-[14px] text-[#131313] leading-[normal]">Description</span>
                      </div>
                      <span className="font-cairo font-medium text-[12px] text-[#4a4a4a] leading-[normal] w-full">{auction.description}</span>
                    </div>
                    <div className="bg-white border-[1.042px] border-[#f6f6f7] border-solid flex flex-col gap-[8px] items-start p-[12px] relative rounded-[28px] shrink-0 w-full" data-name="Card Info">
                      <div className="h-[105px] relative rounded-[20px] w-full">
                        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[20px] size-full" src={aucMap} />
                      </div>
                      <div className="flex gap-[8.334px] items-center relative shrink-0">
                        <AucLocationIcon />
                        <span className="font-cairo font-medium text-[12px] text-[#4a4a4a] leading-[normal] whitespace-nowrap">{auction.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {winnersOpen && <WinnersPanel auction={auction} accepted={accepted} onClose={() => setWinnersOpen(false)} />}
    </div>
  );
}
