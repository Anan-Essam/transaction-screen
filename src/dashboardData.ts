import auction1 from "./assets/figma/auction1.jpg";
import auction2 from "./assets/figma/auction2.jpg";
import productPhoto from "./assets/figma/productPhoto.jpg";
import modalPhoto from "./assets/figma/modalPhoto.jpg";

export type DashAuction = {
  id: string;
  name: string;
  subtitle: string;
  site: string;
  category: string;
  currentBid: string;
  bidders: number;
  biddersDelta: number;
  timeRemaining: string;
  timeProgress: number; // 0..1 of the time bar
  status: "active";
  image: string;
  createdAt: number; // ordering for "most recent"
};

/* One material line inside an auction — the shared dataset every dashboard section derives from */
export type DashLine = {
  auctionId: string;
  site: string;
  category: string;
  material: string;
  awardedValue: number; // EGP
  received: number; // EGP
  overdue: number; // EGP overdue 90+ days
  awardedQty: number; // tons
  releasedQty: number; // tons
  bids: number;
};

export const DASH_SITES = ["Dell Cairo 2 Recycling Hub", "Alexandria - Borg El Arab", "Giza Industrial Zone"];

export const DASH_AUCTIONS: DashAuction[] = [
  { id: "a2", name: "Server Hardware (Batch 156)", subtitle: "Data Center Equipment", site: "Dell Cairo 2 Recycling Hub", category: "Electrical Equipment", currentBid: "$28,750", bidders: 12, biddersDelta: 5, timeRemaining: "5 days, 12 hours", timeProgress: 0.14, status: "active", image: auction2, createdAt: 3 },
  { id: "a1", name: "Retired Laptops (Batch 243)", subtitle: "Corporate IT Assets", site: "Dell Cairo 2 Recycling Hub", category: "Electronic Scrap (E-Waste)", currentBid: "$12,450", bidders: 18, biddersDelta: 5, timeRemaining: "2 days, 5 hours", timeProgress: 0.31, status: "active", image: auction1, createdAt: 4 },
  { id: "a3", name: "Factory Clearance (Batch 88)", subtitle: "Mixed Industrial Lots", site: "Giza Industrial Zone", category: "Ferrous Metals", currentBid: "$41,200", bidders: 24, biddersDelta: 3, timeRemaining: "1 day, 8 hours", timeProgress: 0.65, status: "active", image: productPhoto, createdAt: 2 },
  { id: "a4", name: "Cable Yard Liquidation", subtitle: "Copper & Insulated Cables", site: "Alexandria - Borg El Arab", category: "Cables & Wires", currentBid: "$9,900", bidders: 9, biddersDelta: 2, timeRemaining: "3 days, 2 hours", timeProgress: 0.42, status: "active", image: modalPhoto, createdAt: 1 },
];

/* Values engineered so the unfiltered totals match the Figma frame exactly:
   awarded 4,250,000 / received 3,203,700 (75.4%) / qty 386.4 vs 305.1 tons (78.9%) / 142 bids / 177,000 overdue */
export const DASH_LINES: DashLine[] = [
  { auctionId: "a1", site: "Dell Cairo 2 Recycling Hub", category: "Electronic Scrap (E-Waste)", material: "Copper Scrap", awardedValue: 1200000, received: 1000000, overdue: 80000, awardedQty: 30, releasedQty: 22, bids: 25 },
  { auctionId: "a1", site: "Dell Cairo 2 Recycling Hub", category: "Electronic Scrap (E-Waste)", material: "Aluminum Scrap", awardedValue: 450000, received: 300000, overdue: 0, awardedQty: 40.4, releasedQty: 30.1, bids: 15 },
  { auctionId: "a2", site: "Dell Cairo 2 Recycling Hub", category: "Electrical Equipment", material: "Steel Scrap", awardedValue: 600000, received: 450000, overdue: 47000, awardedQty: 80, releasedQty: 60, bids: 20 },
  { auctionId: "a2", site: "Dell Cairo 2 Recycling Hub", category: "Electrical Equipment", material: "Copper Scrap", awardedValue: 500000, received: 403700, overdue: 0, awardedQty: 12, releasedQty: 8, bids: 12 },
  { auctionId: "a3", site: "Giza Industrial Zone", category: "Ferrous Metals", material: "Iron Scrap", awardedValue: 700000, received: 550000, overdue: 50000, awardedQty: 120, releasedQty: 105, bids: 30 },
  { auctionId: "a3", site: "Giza Industrial Zone", category: "Ferrous Metals", material: "Steel Scrap", awardedValue: 300000, received: 200000, overdue: 0, awardedQty: 54, releasedQty: 40, bids: 15 },
  { auctionId: "a4", site: "Alexandria - Borg El Arab", category: "Cables & Wires", material: "Copper Scrap", awardedValue: 400000, received: 250000, overdue: 0, awardedQty: 20, releasedQty: 15, bids: 15 },
  { auctionId: "a4", site: "Alexandria - Borg El Arab", category: "Cables & Wires", material: "Plastic Scrap (HDPE)", awardedValue: 100000, received: 50000, overdue: 0, awardedQty: 30, releasedQty: 25, bids: 10 },
];

export type DashFilters = { auction: string | null; site: string | null; category: string | null };

/* All active filters apply together (AND) — shared by every dashboard section */
export function filterLines(lines: DashLine[], filters: DashFilters, auctions: DashAuction[]): DashLine[] {
  const auctionId = filters.auction ? auctions.find((a) => a.name === filters.auction)?.id : null;
  return lines.filter((l) => {
    if (auctionId && l.auctionId !== auctionId) return false;
    if (filters.site && l.site !== filters.site) return false;
    if (filters.category && l.category !== filters.category) return false;
    return true;
  });
}

export function filterAuctions(auctions: DashAuction[], filters: DashFilters): DashAuction[] {
  return auctions.filter((a) => {
    if (filters.auction && a.name !== filters.auction) return false;
    if (filters.site && a.site !== filters.site) return false;
    if (filters.category && a.category !== filters.category) return false;
    return true;
  });
}

export type DashTotals = {
  awarded: number;
  received: number;
  outstanding: number;
  overdue: number;
  bids: number;
  awardedQty: number;
  releasedQty: number;
  remainingQty: number;
  pctCollected: number;
  pctReleased: number;
};

const sum = (xs: number[]) => xs.reduce((a, b) => a + b, 0);

export function aggregate(lines: DashLine[]): DashTotals {
  const awarded = sum(lines.map((l) => l.awardedValue));
  const received = sum(lines.map((l) => l.received));
  const awardedQty = sum(lines.map((l) => l.awardedQty));
  const releasedQty = sum(lines.map((l) => l.releasedQty));
  return {
    awarded,
    received,
    outstanding: awarded - received,
    overdue: sum(lines.map((l) => l.overdue)),
    bids: sum(lines.map((l) => l.bids)),
    awardedQty,
    releasedQty,
    remainingQty: awardedQty - releasedQty,
    pctCollected: awarded > 0 ? (received / awarded) * 100 : 0,
    pctReleased: awardedQty > 0 ? (releasedQty / awardedQty) * 100 : 0,
  };
}

export type MaterialMoneyRow = { material: string; avgPrice: number; gmv: number };
export type MaterialQtyRow = { material: string; qty: number };

/* Top Performing Materials — ranked by revenue (money generated) */
export function topByRevenue(lines: DashLine[], limit = 4): MaterialMoneyRow[] {
  const byMaterial = new Map<string, { awarded: number; received: number; qty: number }>();
  for (const l of lines) {
    const m = byMaterial.get(l.material) ?? { awarded: 0, received: 0, qty: 0 };
    m.awarded += l.awardedValue;
    m.received += l.received;
    m.qty += l.awardedQty;
    byMaterial.set(l.material, m);
  }
  return [...byMaterial.entries()]
    .map(([material, m]) => ({ material, avgPrice: m.qty > 0 ? m.awarded / m.qty : 0, gmv: m.received }))
    .sort((a, b) => b.gmv - a.gmv)
    .slice(0, limit);
}

/* Top Performing Materials by Fulfilled Quantity — ranked by delivered tons */
export function topByFulfilledQty(lines: DashLine[], limit = 5): MaterialQtyRow[] {
  const byMaterial = new Map<string, number>();
  for (const l of lines) byMaterial.set(l.material, (byMaterial.get(l.material) ?? 0) + l.releasedQty);
  return [...byMaterial.entries()]
    .map(([material, qty]) => ({ material, qty }))
    .sort((a, b) => b.qty - a.qty)
    .slice(0, limit);
}

export const formatTons = (v: number) => `${v % 1 !== 0 ? v.toFixed(1) : v.toLocaleString("en-US")}`;
export const formatGMV = (v: number) =>
  v >= 1_000_000 ? `${(v / 1_000_000).toFixed(2)}M EGP` : v >= 1_000 ? `${Math.round(v / 1_000)}K EGP` : `${v.toLocaleString("en-US")} EGP`;
export const formatPct = (v: number) => `${v.toFixed(1)}%`;
