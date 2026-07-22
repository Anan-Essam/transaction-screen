export type TransactionType = "Waste" | "Money";
export type TransactionStatus = "Active" | "Closed";

export type LedgerRow = {
  id: string;
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

export type AuctionProduct = {
  name: string;
  awardedQty: number; // in tons
  committedQty: number; // already delivered, in tons
  unitPrice: number; // EGP per ton
};

export type AuctionOption = {
  id: string;
  name: string;
  bidders: number;
  productsCount: number;
  location: string;
  buyers: string[]; // only buyers who won this auction
  products: AuctionProduct[];
  deliveredForBuyer: { product: string; deliveredQty: string; remaining: string; unitPrice: string }[];
  outstandingAmount: number; // EGP owed by the buyer for delivered quantities
};

export type PaymentRecord = { paymentId: string; amount: string; date: string };
export type InstallmentRecord = { paymentId: string; label: string; date: string };

export const INITIAL_ROWS: LedgerRow[] = [
  { id: "t1", paymentId: "PO-2041", buyer: "Buyer #3", auction: "Auction #102", product: "Iron Scrap", type: "Waste", date: "27 Jun 2026", paymentAmount: "-", committedQty: "1,000 kg", status: "Active" },
  { id: "t2", paymentId: "MT-2041", buyer: "Buyer #3", auction: "Auction #102", product: "Buyer-level settlement", type: "Money", date: "27 Jun 2026", paymentAmount: "200,500 EGP", committedQty: "-", status: "Closed", editDisabled: true },
  { id: "t3", paymentId: "PO-2041", buyer: "Buyer #3", auction: "Auction #102", product: "Iron Scrap", type: "Waste", date: "27 Jun 2026", paymentAmount: "-", committedQty: "1,000 kg", status: "Active" },
  { id: "t4", paymentId: "PO-2041", buyer: "Buyer #3", auction: "Auction #102", product: "Iron Scrap", type: "Waste", date: "27 Jun 2026", paymentAmount: "-", committedQty: "1,000 kg", status: "Closed" },
  { id: "t5", paymentId: "MT-2041", buyer: "Buyer #3", auction: "Auction #102", product: "Buyer-level settlement", type: "Money", date: "27 Jun 2026", paymentAmount: "200,500 EGP", committedQty: "-", status: "Active" },
  { id: "t6", paymentId: "PO-2041", buyer: "Buyer #3", auction: "Auction #102", product: "Iron Scrap", type: "Waste", date: "27 Jun 2026", paymentAmount: "-", committedQty: "1,000 kg", status: "Active" },
  { id: "t7", paymentId: "MT-2041", buyer: "Buyer #3", auction: "Auction #102", product: "Buyer-level settlement", type: "Money", date: "27 Jun 2026", paymentAmount: "200,500 EGP", committedQty: "-", status: "Active" },
  { id: "t8", paymentId: "MT-2041", buyer: "Buyer #3", auction: "Auction #102", product: "Buyer-level settlement", type: "Money", date: "27 Jun 2026", paymentAmount: "200,500 EGP", committedQty: "-", status: "Closed" },
  { id: "t9", paymentId: "PO-2041", buyer: "Buyer #3", auction: "Auction #102", product: "Iron Scrap", type: "Waste", date: "27 Jun 2026", paymentAmount: "-", committedQty: "1,000 kg", status: "Active" },
];

const DELIVERED_CONTEXT = [
  { product: "Iron Scrap", deliveredQty: "500 kg", remaining: "500 kg", unitPrice: "10,000EGP/T" },
  { product: "Copper Scrap", deliveredQty: "500 kg", remaining: "500 kg", unitPrice: "10,000EGP/T" },
  { product: "Plastic", deliveredQty: "500 kg", remaining: "500 kg", unitPrice: "10,000EGP/T" },
];

export const AUCTIONS: AuctionOption[] = [
  {
    id: "AUC-4521",
    name: "Retired Laptops (Batch 243)",
    bidders: 18,
    productsCount: 30,
    location: "Alexandria - Borg El Arab",
    buyers: ["Buyer #3", "Buyer #7", "Buyer #12"],
    products: [
      { name: "Iron Scrap", awardedQty: 1000, committedQty: 1000, unitPrice: 10000 },
      { name: "Copper Scrap", awardedQty: 500, committedQty: 500, unitPrice: 10000 },
      { name: "Plastic", awardedQty: 300, committedQty: 0, unitPrice: 10000 },
    ],
    deliveredForBuyer: DELIVERED_CONTEXT,
    outstandingAmount: 12500,
  },
  {
    id: "AUC-4522",
    name: "Retired Laptops (Batch 243)",
    bidders: 18,
    productsCount: 30,
    location: "Alexandria - Borg El Arab",
    buyers: ["Buyer #1", "Buyer #5"],
    products: [
      { name: "Iron Scrap", awardedQty: 1000, committedQty: 0, unitPrice: 10000 },
      { name: "Copper Scrap", awardedQty: 500, committedQty: 0, unitPrice: 10000 },
      { name: "Plastic", awardedQty: 300, committedQty: 0, unitPrice: 10000 },
    ],
    deliveredForBuyer: [],
    outstandingAmount: 12500,
  },
];

export const INITIAL_PAYMENTS: PaymentRecord[] = [
  { paymentId: "MT-2041", amount: "200,500 EGP", date: "24 Jun 2026" },
  { paymentId: "MT-2041", amount: "200,500 EGP", date: "24 Jun 2026" },
  { paymentId: "MT-2041", amount: "200,500 EGP", date: "24 Jun 2026" },
  { paymentId: "MT-2041", amount: "200,500 EGP", date: "24 Jun 2026" },
];

export const INITIAL_INSTALLMENTS: InstallmentRecord[] = [
  { paymentId: "PO-2041", label: "Delivered 250 kg", date: "24 Jun 2026" },
  { paymentId: "PO-2041", label: "Delivered 250 kg", date: "24 Jun 2026" },
  { paymentId: "PO-2041", label: "Delivered 250 kg", date: "24 Jun 2026" },
];

const MONTHS: Record<string, number> = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 };

/* Parse a ledger date like "27 Jun 2026" into a Date (midnight local) */
export function parseLedgerDate(s: string): Date | null {
  const m = s.trim().match(/^(\d{1,2}) (\w{3}) (\d{4})$/);
  if (!m || !(m[2] in MONTHS)) return null;
  return new Date(Number(m[3]), MONTHS[m[2]], Number(m[1]));
}

/* Format a Date as the ledger's "27 Jun 2026" style */
export function formatLedgerDate(d: Date): string {
  const names = Object.keys(MONTHS);
  return `${d.getDate()} ${names[d.getMonth()]} ${d.getFullYear()}`;
}

export function formatEGP(n: number): string {
  return `${n.toLocaleString("en-US")} EGP`;
}
