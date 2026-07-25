import auction1 from "./assets/figma/auction1.jpg";
import auction2 from "./assets/figma/auction2.jpg";
import aucCardPhoto from "./assets/figma/aucCardPhoto.jpg";
import productPhoto from "./assets/figma/productPhoto.jpg";
import modalPhoto from "./assets/figma/modalPhoto.jpg";

/* ---------- types ---------- */

export type KycStatus = "Verified" | "Unverified" | "Not submitted";
export type KycDoc = { name: string; section: "Basic Documents" | "Additional Documents"; status: KycStatus };

export type AuctionBidder = {
  id: string; // "#BID-88241"
  rating: number;
  kycDocs: KycDoc[];
};

/* A bidder is Verified ONLY if every required document is uploaded AND verified */
export const isBidderVerified = (b: AuctionBidder) => b.kycDocs.every((d) => d.status === "Verified");

export type AuctionProduct = {
  id: string;
  name: string;
  category: string;
  qtyUnits: number;
  pricePerUnit: number;
  image: string;
};

export type Bid = {
  id: string;
  bidderId: string;
  productId: string;
  qtyTons: number;
  amount: number; // EGP
  placedAt: string;
};

export type AuctionStatus = "active" | "ready" | "completed" | "cancelled" | "draft";

export type Auction = {
  id: string;
  name: string;
  site: string;
  category: string;
  status: AuctionStatus;
  createdAt: number; // ms epoch — date filter + default newest-first sort
  startedLabel: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  timeRemaining: string;
  detailTimeRemaining: string;
  timeProgress: number; // 0..1
  description: string;
  location: string;
  image: string;
  gallery: string[];
  extraImages: number;
  biddersDelta: number;
  products: AuctionProduct[];
  bidders: AuctionBidder[];
  bids: Bid[];
  /* Winners already settled on this auction when the app boots (Winners State) */
  seedAccepted?: { bidId: string; qtyTons: number }[];
};

export const AUCTION_SITES = [
  "Dell Cairo Recycling Hub",
  "Dell Cairo 2 Recycling Hub",
  "Dell Texas HQ Storage",
  "Dell Frankfurt Hub",
  "Dell Jeddah Facility",
];

export const AUCTION_CATEGORIES = ["Copper", "Stainless Steel", "Batteries", "Electronics", "Steel & Iron", "Plastic", "Cables & Wires"];

/* ---------- KYC document sets (varied so verification logic is observable) ---------- */

const fullKyc = (): KycDoc[] => [
  { name: "Commercial Registration", section: "Basic Documents", status: "Verified" },
  { name: "Tax Card", section: "Basic Documents", status: "Verified" },
  { name: "National ID", section: "Basic Documents", status: "Verified" },
  { name: "Environmental Permit", section: "Additional Documents", status: "Verified" },
  { name: "Industrial License", section: "Additional Documents", status: "Verified" },
  { name: "Operating License", section: "Additional Documents", status: "Verified" },
];

/* Partially verified — uploaded but one doc still unverified => bidder NOT verified */
const partialKyc = (): KycDoc[] => [
  { name: "Commercial Registration", section: "Basic Documents", status: "Verified" },
  { name: "Tax Card", section: "Basic Documents", status: "Verified" },
  { name: "National ID", section: "Basic Documents", status: "Unverified" },
  { name: "Environmental Permit", section: "Additional Documents", status: "Verified" },
  { name: "Industrial License", section: "Additional Documents", status: "Unverified" },
  { name: "Operating License", section: "Additional Documents", status: "Not submitted" },
];

/* Missing upload — everything verified except one never submitted => bidder NOT verified */
const missingKyc = (): KycDoc[] => [
  { name: "Commercial Registration", section: "Basic Documents", status: "Verified" },
  { name: "Tax Card", section: "Basic Documents", status: "Verified" },
  { name: "National ID", section: "Basic Documents", status: "Verified" },
  { name: "Environmental Permit", section: "Additional Documents", status: "Verified" },
  { name: "Industrial License", section: "Additional Documents", status: "Verified" },
  { name: "Operating License", section: "Additional Documents", status: "Not submitted" },
];

/* ---------- seed auctions ---------- */

const day = 24 * 60 * 60 * 1000;
const base = new Date("2025-08-01T10:00:00").getTime();

const IMAGES = [auction2, auction1, aucCardPhoto, productPhoto, modalPhoto];

/* A1 — RUNNING auction (accept actions locked) */
const a1Products: AuctionProduct[] = [
  { id: "p1", name: "Copper Scrap Wire", category: "Copper", qtyUnits: 8000, pricePerUnit: 1.76, image: auction1 },
  { id: "p2", name: "Server Chassis Steel", category: "Steel & Iron", qtyUnits: 5200, pricePerUnit: 0.98, image: auction2 },
  { id: "p3", name: "Lithium Battery Packs", category: "Batteries", qtyUnits: 2400, pricePerUnit: 3.4, image: productPhoto },
  { id: "p4", name: "Mainboard E-Scrap", category: "Electronics", qtyUnits: 1600, pricePerUnit: 5.2, image: modalPhoto },
  { id: "p5", name: "HDPE Casing Plastic", category: "Plastic", qtyUnits: 9000, pricePerUnit: 0.42, image: aucCardPhoto },
];
const a1Bidders: AuctionBidder[] = [
  { id: "#BID-88241", rating: 4.6, kycDocs: fullKyc() },
  { id: "#BID-77105", rating: 4.2, kycDocs: partialKyc() },
  { id: "#BID-66320", rating: 3.9, kycDocs: fullKyc() },
  { id: "#BID-55418", rating: 4.8, kycDocs: missingKyc() },
];
const a1Bids: Bid[] = [
  { id: "b1", bidderId: "#BID-88241", productId: "p1", qtyTons: 2.5, amount: 112500, placedAt: "16-8-2025" },
  { id: "b2", bidderId: "#BID-77105", productId: "p1", qtyTons: 2, amount: 84000, placedAt: "15-8-2025" },
  { id: "b3", bidderId: "#BID-66320", productId: "p1", qtyTons: 1.5, amount: 58500, placedAt: "15-8-2025" },
  { id: "b4", bidderId: "#BID-88241", productId: "p2", qtyTons: 4, amount: 96000, placedAt: "16-8-2025" },
  { id: "b5", bidderId: "#BID-55418", productId: "p2", qtyTons: 3, amount: 78000, placedAt: "14-8-2025" },
  { id: "b6", bidderId: "#BID-77105", productId: "p3", qtyTons: 1, amount: 150000, placedAt: "16-8-2025" },
  { id: "b7", bidderId: "#BID-66320", productId: "p3", qtyTons: 1.2, amount: 132000, placedAt: "15-8-2025" },
  { id: "b8", bidderId: "#BID-88241", productId: "p4", qtyTons: 0.8, amount: 120000, placedAt: "13-8-2025" },
  { id: "b9", bidderId: "#BID-55418", productId: "p4", qtyTons: 0.6, amount: 90000, placedAt: "16-8-2025" },
  /* p5 has NO bids — drives the product-level empty state */
];

/* A2 — READY auction (bidding window over, accepts unlocked) */
const a2Products: AuctionProduct[] = [
  { id: "p1", name: "Retired Laptop Units", category: "Electronics", qtyUnits: 3000, pricePerUnit: 6.4, image: auction1 },
  { id: "p2", name: "Aluminum Body Panels", category: "Steel & Iron", qtyUnits: 4200, pricePerUnit: 1.1, image: aucCardPhoto },
  { id: "p3", name: "PVC Cable Insulation", category: "Plastic", qtyUnits: 5100, pricePerUnit: 0.6, image: productPhoto },
];
const a2Bidders: AuctionBidder[] = [
  { id: "#BID-90112", rating: 4.7, kycDocs: fullKyc() },
  { id: "#BID-40233", rating: 4.1, kycDocs: partialKyc() },
  { id: "#BID-30990", rating: 4.4, kycDocs: fullKyc() },
];
const a2Bids: Bid[] = [
  { id: "b1", bidderId: "#BID-90112", productId: "p1", qtyTons: 2, amount: 240000, placedAt: "10-8-2025" },
  { id: "b2", bidderId: "#BID-40233", productId: "p1", qtyTons: 1.5, amount: 165000, placedAt: "9-8-2025" },
  { id: "b3", bidderId: "#BID-30990", productId: "p2", qtyTons: 3, amount: 96000, placedAt: "10-8-2025" },
  { id: "b4", bidderId: "#BID-90112", productId: "p2", qtyTons: 2.4, amount: 72000, placedAt: "8-8-2025" },
  { id: "b5", bidderId: "#BID-40233", productId: "p3", qtyTons: 2, amount: 48000, placedAt: "10-8-2025" },
  { id: "b6", bidderId: "#BID-30990", productId: "p3", qtyTons: 1.8, amount: 39600, placedAt: "9-8-2025" },
];

/* A3 — RUNNING copper auction on another site */
const a3Products: AuctionProduct[] = [
  { id: "p1", name: "Insulated Copper Cable", category: "Copper", qtyUnits: 6400, pricePerUnit: 2.1, image: modalPhoto },
  { id: "p2", name: "Copper Busbars", category: "Copper", qtyUnits: 1800, pricePerUnit: 4.6, image: auction2 },
];
const a3Bidders: AuctionBidder[] = [
  { id: "#BID-21678", rating: 4.3, kycDocs: fullKyc() },
  { id: "#BID-11554", rating: 3.7, kycDocs: partialKyc() },
];
const a3Bids: Bid[] = [
  { id: "b1", bidderId: "#BID-21678", productId: "p1", qtyTons: 3, amount: 189000, placedAt: "17-8-2025" },
  { id: "b2", bidderId: "#BID-11554", productId: "p1", qtyTons: 2.2, amount: 132000, placedAt: "16-8-2025" },
  { id: "b3", bidderId: "#BID-11554", productId: "p2", qtyTons: 1, amount: 98000, placedAt: "17-8-2025" },
];

/* A4 — COMPLETED auction (settled) */
const a4Products: AuctionProduct[] = [
  { id: "p1", name: "Structural Steel Beams", category: "Steel & Iron", qtyUnits: 12000, pricePerUnit: 0.9, image: aucCardPhoto },
  { id: "p2", name: "Stainless Steel Sheets", category: "Stainless Steel", qtyUnits: 5400, pricePerUnit: 1.9, image: productPhoto },
];
const a4Bidders: AuctionBidder[] = [
  { id: "#BID-70441", rating: 4.9, kycDocs: fullKyc() },
  { id: "#BID-60218", rating: 4.0, kycDocs: fullKyc() },
];
const a4Bids: Bid[] = [
  { id: "b1", bidderId: "#BID-70441", productId: "p1", qtyTons: 6, amount: 300000, placedAt: "2-8-2025" },
  { id: "b2", bidderId: "#BID-60218", productId: "p1", qtyTons: 5, amount: 240000, placedAt: "1-8-2025" },
  { id: "b3", bidderId: "#BID-60218", productId: "p2", qtyTons: 2.5, amount: 190000, placedAt: "2-8-2025" },
];

/* A5 — READY auction with a single bidder (fewest-buyers scenario trivially observable) */
const a5Products: AuctionProduct[] = [
  { id: "p1", name: "UPS Battery Banks", category: "Batteries", qtyUnits: 900, pricePerUnit: 7.5, image: productPhoto },
  { id: "p2", name: "Mixed E-Waste Pallets", category: "Electronics", qtyUnits: 2600, pricePerUnit: 2.2, image: auction1 },
];
const a5Bidders: AuctionBidder[] = [
  { id: "#BID-50777", rating: 4.5, kycDocs: missingKyc() },
  { id: "#BID-51222", rating: 4.2, kycDocs: fullKyc() },
];
const a5Bids: Bid[] = [
  { id: "b1", bidderId: "#BID-50777", productId: "p1", qtyTons: 1.4, amount: 210000, placedAt: "5-8-2025" },
  { id: "b2", bidderId: "#BID-51222", productId: "p1", qtyTons: 1.1, amount: 154000, placedAt: "4-8-2025" },
  { id: "b3", bidderId: "#BID-50777", productId: "p2", qtyTons: 2, amount: 110000, placedAt: "5-8-2025" },
];

export const INITIAL_AUCTIONS: Auction[] = [
  {
    id: "#AUC-4521",
    name: "Server Hardware (Batch 156)",
    site: "Dell Cairo 2 Recycling Hub",
    category: "Electronics",
    status: "active",
    createdAt: base + 14 * day,
    startedLabel: "Started: Dec 15, 2024 10:00 AM",
    startDate: "Jan 15,2025",
    startTime: "10:00 AM",
    endDate: "Jan 18,2025",
    endTime: "10:00 AM",
    timeRemaining: "2 days, 5 hours",
    detailTimeRemaining: "2d 14h 32m",
    timeProgress: 0.18,
    description:
      "High-quality scrap rebar in various diameters, suitable for recycling and industrial use. It features high durability and is free from large impurities, available in different quantities as needed. Ideal for smelting plants, remanufacturing, and foundries.",
    location: "Alexandria - Borg El Arab",
    image: auction2,
    gallery: IMAGES,
    extraImages: 20,
    biddersDelta: 5,
    products: a1Products,
    bidders: a1Bidders,
    bids: a1Bids,
  },
  {
    id: "#AUC-4488",
    name: "Retired Laptops (Batch 243)",
    site: "Dell Cairo Recycling Hub",
    category: "Electronics",
    status: "ready",
    createdAt: base + 9 * day,
    startedLabel: "Started: Dec 10, 2024 09:00 AM",
    startDate: "Jan 10,2025",
    startTime: "09:00 AM",
    endDate: "Jan 10,2025",
    endTime: "09:00 PM",
    timeRemaining: "0 hours",
    detailTimeRemaining: "0h 0m",
    timeProgress: 1,
    description:
      "Corporate IT assets retired from service. Laptops are sold as-is for parts recovery and certified recycling, with mixed configurations across the batch.",
    location: "Alexandria - Borg El Arab",
    image: auction1,
    gallery: IMAGES,
    extraImages: 12,
    biddersDelta: 5,
    products: a2Products,
    bidders: a2Bidders,
    bids: a2Bids,
  },
  {
    id: "#AUC-4470",
    name: "Copper Cable Yard Liquidation",
    site: "Dell Texas HQ Storage",
    category: "Copper",
    status: "active",
    createdAt: base + 16 * day,
    startedLabel: "Started: Dec 17, 2024 12:00 PM",
    startDate: "Jan 17,2025",
    startTime: "12:00 PM",
    endDate: "Jan 18,2025",
    endTime: "12:00 AM",
    timeRemaining: "1 day, 8 hours",
    detailTimeRemaining: "1d 8h 05m",
    timeProgress: 0.55,
    description: "Full yard liquidation of insulated copper cable and busbars. Sorted lots with verified copper content, ready for granulation.",
    location: "Dell Texas HQ Storage",
    image: modalPhoto,
    gallery: IMAGES,
    extraImages: 6,
    biddersDelta: 2,
    products: a3Products,
    bidders: a3Bidders,
    bids: a3Bids,
  },
  {
    id: "#AUC-4433",
    name: "Factory Steel Clearance",
    site: "Dell Frankfurt Hub",
    category: "Steel & Iron",
    status: "completed",
    createdAt: base + 2 * day,
    startedLabel: "Started: Dec 02, 2024 08:00 AM",
    startDate: "Jan 02,2025",
    startTime: "08:00 AM",
    endDate: "Jan 02,2025",
    endTime: "08:00 PM",
    timeRemaining: "0 hours",
    detailTimeRemaining: "0h 0m",
    timeProgress: 1,
    description: "Clearance of structural steel beams and stainless sheets from a decommissioned production hall. Certified weights per lot.",
    location: "Dell Frankfurt Hub",
    image: aucCardPhoto,
    gallery: IMAGES,
    extraImages: 4,
    biddersDelta: 1,
    products: a4Products,
    bidders: a4Bidders,
    bids: a4Bids,
    /* every product awarded — opens directly in the Winners State */
    seedAccepted: [
      { bidId: "b1", qtyTons: 6 },
      { bidId: "b3", qtyTons: 2.5 },
    ],
  },
  {
    id: "#AUC-4410",
    name: "UPS & E-Waste Pallet Lot",
    site: "Dell Jeddah Facility",
    category: "Batteries",
    status: "ready",
    createdAt: base + 5 * day,
    startedLabel: "Started: Dec 05, 2024 11:00 AM",
    startDate: "Jan 05,2025",
    startTime: "11:00 AM",
    endDate: "Jan 05,2025",
    endTime: "11:00 PM",
    timeRemaining: "0 hours",
    detailTimeRemaining: "0h 0m",
    timeProgress: 1,
    description: "UPS battery banks and mixed e-waste pallets from a data-center refresh. Hazmat-compliant packaging included.",
    location: "Dell Jeddah Facility",
    image: productPhoto,
    gallery: IMAGES,
    extraImages: 8,
    biddersDelta: 3,
    products: a5Products,
    bidders: a5Bidders,
    bids: a5Bids,
  },
  {
    id: "#AUC-4402",
    name: "Warehouse Clearance Lot",
    site: "Dell Cairo Recycling Hub",
    category: "Stainless Steel",
    status: "active",
    createdAt: base + 12 * day,
    startedLabel: "Started: Dec 12, 2024 09:30 AM",
    startDate: "Jan 12,2025",
    startTime: "09:30 AM",
    endDate: "Jan 12,2025",
    endTime: "09:30 PM",
    timeRemaining: "3 days, 2 hours",
    detailTimeRemaining: "3d 2h 14m",
    timeProgress: 0.08,
    description:
      "Mixed stainless offcuts and shelving from a warehouse clearance. Freshly listed — no offers have been submitted yet.",
    location: "Dell Cairo Recycling Hub",
    image: aucCardPhoto,
    gallery: IMAGES,
    extraImages: 3,
    biddersDelta: 0,
    products: [
      { id: "p1", name: "Stainless Shelving Units", category: "Stainless Steel", qtyUnits: 1800, pricePerUnit: 2.4, image: aucCardPhoto },
      { id: "p2", name: "Stainless Offcut Bundles", category: "Stainless Steel", qtyUnits: 3400, pricePerUnit: 1.7, image: auction2 },
    ],
    /* no bidder activity at all — opens in the Empty State */
    bidders: [],
    bids: [],
  },
  {
    id: "#AUC-4395",
    name: "Cable Drum Lot (Draft)",
    site: "Dell Frankfurt Hub",
    category: "Cables & Wires",
    status: "draft",
    createdAt: base + 1 * day,
    startedLabel: "Not started yet",
    startDate: "—",
    startTime: "—",
    endDate: "—",
    endTime: "—",
    timeRemaining: "0 hours",
    detailTimeRemaining: "0h 0m",
    timeProgress: 1,
    description: "Draft listing for a cable drum lot. Still being prepared and not yet published to buyers.",
    location: "Dell Frankfurt Hub",
    image: modalPhoto,
    gallery: IMAGES,
    extraImages: 2,
    biddersDelta: 0,
    products: [{ id: "p1", name: "Empty Cable Drums", category: "Cables & Wires", qtyUnits: 640, pricePerUnit: 0.9, image: modalPhoto }],
    bidders: [],
    bids: [],
  },
];

/* ---------- derived helpers ---------- */

export type AcceptedBid = { bidId: string; qtyTons: number };
export type AcceptedMap = Record<string, AcceptedBid[]>; // auctionId -> accepted bids
export type DeclinedMap = Record<string, string[]>; // auctionId -> declined bid ids

export const formatAmount = (v: number) => `${v.toLocaleString("en-US")} LE`;
export const formatEgp = (v: number) => `${v.toLocaleString("en-US")} EGP`;

/* current highest (non-declined) bid amount for a product */
export function highestBidFor(auction: Auction, productId: string, declined: string[] = []): number {
  return Math.max(0, ...auction.bids.filter((b) => b.productId === productId && !declined.includes(b.id)).map((b) => b.amount));
}

/* bids for a product ranked by price, highest first */
export function rankedBidsFor(auction: Auction, productId: string, declined: string[] = []): Bid[] {
  return auction.bids.filter((b) => b.productId === productId && !declined.includes(b.id)).sort((a, b) => b.amount - a.amount);
}

export function bidsByBidder(auction: Auction, bidderId: string, declined: string[] = []): Bid[] {
  return auction.bids.filter((b) => b.bidderId === bidderId && !declined.includes(b.id));
}

export function productById(auction: Auction, productId: string): AuctionProduct | undefined {
  return auction.products.find((p) => p.id === productId);
}

export function bidderById(auction: Auction, bidderId: string): AuctionBidder | undefined {
  return auction.bidders.find((b) => b.id === bidderId);
}

/* totals shown on the list card */
export function auctionTotals(a: Auction) {
  const amounts = a.bids.map((b) => b.amount);
  return {
    low: amounts.length ? Math.min(...amounts) : 0,
    high: amounts.length ? Math.max(...amounts) : 0,
  };
}

/* ---------- recommendation scenarios (mock of a server-side optimizer) ---------- */

export type Scenario = {
  key: "max" | "fewest" | "balanced";
  title: string;
  chip: string;
  chipTone: "blue" | "green" | "orange";
  revenue: number;
  note: string;
  allocation: Bid[]; // one winning bid per product
};

export function buildScenarios(auction: Auction, declined: string[] = []): Scenario[] {
  const productIds = auction.products.filter((p) => rankedBidsFor(auction, p.id, declined).length > 0).map((p) => p.id);
  if (productIds.length === 0) return [];

  /* Max Revenue — highest bid per product */
  const maxAlloc = productIds.map((pid) => rankedBidsFor(auction, pid, declined)[0]);
  const maxRevenue = maxAlloc.reduce((s, b) => s + b.amount, 0);

  /* Fewest Buyers — greedily pick bidders covering the most products */
  const remaining = new Set(productIds);
  const fewestAlloc: Bid[] = [];
  while (remaining.size > 0) {
    let bestBidder: string | null = null;
    let bestBids: Bid[] = [];
    for (const bidder of auction.bidders) {
      const bids = [...remaining]
        .map((pid) => rankedBidsFor(auction, pid, declined).find((b) => b.bidderId === bidder.id))
        .filter((b): b is Bid => !!b);
      if (bids.length > bestBids.length || (bids.length === bestBids.length && bids.reduce((s, b) => s + b.amount, 0) > bestBids.reduce((s, b) => s + b.amount, 0))) {
        bestBidder = bidder.id;
        bestBids = bids;
      }
    }
    if (!bestBidder || bestBids.length === 0) break;
    for (const b of bestBids) {
      fewestAlloc.push(b);
      remaining.delete(b.productId);
    }
  }
  const fewestRevenue = fewestAlloc.reduce((s, b) => s + b.amount, 0);

  /* Balanced — alternate between top-2 bids per product to spread across buyers */
  const balancedAlloc = productIds.map((pid, i) => {
    const ranked = rankedBidsFor(auction, pid, declined);
    return ranked.length > 1 && i % 2 === 1 ? ranked[1] : ranked[0];
  });
  const balancedRevenue = balancedAlloc.reduce((s, b) => s + b.amount, 0);

  return [
    {
      key: "max",
      title: "Max Revenue",
      chip: "Accepted",
      chipTone: "blue",
      revenue: maxRevenue,
      note: "Highest revenue — reference",
      allocation: maxAlloc,
    },
    {
      key: "fewest",
      title: "Fewest Buyers",
      chip: "Simplest ops",
      chipTone: "green",
      revenue: fewestRevenue,
      note: `▼  ${(maxRevenue - fewestRevenue).toLocaleString("en-US")} EGP vs Max Revenue`,
      allocation: fewestAlloc,
    },
    {
      key: "balanced",
      title: "Balanced",
      chip: "Best spread",
      chipTone: "orange",
      revenue: balancedRevenue,
      note: `▼  ${(maxRevenue - balancedRevenue).toLocaleString("en-US")} EGP vs Max Revenue`,
      allocation: balancedAlloc,
    },
  ];
}
