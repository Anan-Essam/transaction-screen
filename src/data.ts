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
  { id: "t2", paymentId: "MT-2041", buyer: "Buyer #3", auction: "Auction #102", product: "Buyer-level settlement", type: "Money", date: "27 Jun 2026", paymentAmount: "200,500 EGP", committedQty: "-", status: "Closed" },
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

/* ---------------- Product Library ---------------- */

export type ProductCategory = { name: string; subcategories: string[] };

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  { name: "Ferrous Metals", subcategories: ["Heavy Melting Steel (HMS 1)", "HMS 2", "Cast Iron", "Stainless Steel", "Steel Turnings", "Steel Sheets", "Structural Steel", "Rebar", "Rail Scrap"] },
  { name: "Non-Ferrous Metals", subcategories: ["Copper", "Aluminum", "Brass", "Bronze", "Lead", "Zinc", "Nickel", "Titanium", "Mixed Non-Ferrous"] },
  { name: "Cables & Wires", subcategories: ["Copper Cable", "Aluminum Cable", "Insulated Wire", "Bare Bright Copper", "Electrical Wire", "Telecom Cable"] },
  { name: "Electronic Scrap (E-Waste)", subcategories: ["Computers", "Laptops", "Servers", "Mobile Phones", "PCBs", "Power Supplies", "Hard Drives"] },
  { name: "Electrical Equipment", subcategories: ["Electric Motors", "Transformers", "Generators", "Switchgear", "Circuit Breakers", "Control Panels"] },
  { name: "Industrial Machinery", subcategories: ["CNC Machines", "Compressors", "Pumps", "Conveyor Systems", "Boilers", "Production Equipment"] },
  { name: "Construction Materials", subcategories: ["Steel Beams", "Pipes", "Scaffolding", "Metal Sheets", "Roofing Panels", "Structural Components"] },
  { name: "Automotive Scrap", subcategories: ["Complete Vehicles", "Engines", "Gearboxes", "Wheels & Rims", "Catalytic Converters", "Batteries"] },
  { name: "Plastic Scrap", subcategories: ["PET", "HDPE", "LDPE", "PP", "PVC", "ABS", "Mixed Plastic"] },
  { name: "Paper & Cardboard", subcategories: ["OCC Cardboard", "Newspapers", "Office Paper", "Mixed Paper", "Cartons"] },
  { name: "Glass Scrap", subcategories: ["Clear Glass", "Green Glass", "Brown Glass", "Mixed Glass"] },
  { name: "Rubber & Tires", subcategories: ["Used Tires", "Shredded Rubber", "Conveyor Belts", "Industrial Rubber"] },
  { name: "Wood & Pallets", subcategories: ["Wooden Pallets", "Timber", "Crates", "Wood Waste"] },
  { name: "Textile Scrap", subcategories: ["Cotton", "Polyester", "Fabric Rolls", "Mixed Textile"] },
  { name: "Batteries", subcategories: ["Lead Acid", "Lithium-ion", "Nickel-Cadmium", "Industrial Batteries"] },
  { name: "Industrial Residues", subcategories: ["Slag", "Ash", "Metal Dust", "Mill Scale", "Foundry Sand"] },
  { name: "Mixed Scrap Lots", subcategories: ["Mixed Metals", "Mixed Industrial Waste", "Warehouse Clearance", "Factory Liquidation"] },
  { name: "Other Recyclables", subcategories: ["Composite Materials", "Packaging Waste", "Miscellaneous"] },
];

/* Fixed condition values (Arabic labels are a translation reference only; the UI renders English) */
export const CONDITION_OPTIONS = ["New", "Like New", "Excellent", "Good", "Fair", "Poor", "Damaged", "Defective", "Refurbished", "Used", "Scrap", "Mixed Condition"];

export const UNIT_OPTIONS = ["mm", "cm", "m", "in", "ft"];

export type ProductDimensions = { length: string; width: string; height: string; unit: string };

export type LibraryProduct = {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  detailTitle: string;
  weight: string;
  color: string; // raw color value ("Wooden")
  dimensions: ProductDimensions;
  condition: string;
  description: string;
  images: string[]; // asset URLs (imported or object URLs from upload)
};

export function formatDimensions(d: ProductDimensions): string {
  if (!d.length && !d.width && !d.height) return "-";
  return `${d.length || "-"} \u00d7 ${d.width || "-"} \u00d7 ${d.height || "-"} ${d.unit}`;
}

const PRODUCT_DESCRIPTION =
  "High-quality scrap reinforcing iron with various diameters, suitable for recycling and industrial use. It features high durability and is free from large impurities, available in different quantities as needed. Ideal for smelting and remanufacturing plants.";

/* Seed products spread across a representative set of categories so filtering stays observable */
export function buildInitialProducts(defaultImages: string[]): LibraryProduct[] {
  const seed: [string, string, string][] = [
    // [name, category, subcategory]
    ["Rebar Scrap Bundle", "Ferrous Metals", "Rebar"],
    ["Steel Sheets Pack", "Ferrous Metals", "Steel Sheets"],
    ["Cast Iron Lot", "Ferrous Metals", "Cast Iron"],
    ["Structural Steel Beams", "Ferrous Metals", "Structural Steel"],
    ["HMS 1 Bulk Lot", "Ferrous Metals", "Heavy Melting Steel (HMS 1)"],
    ["Stainless Steel Offcuts", "Ferrous Metals", "Stainless Steel"],
    ["Copper Cables Bundle", "Cables & Wires", "Copper Cable"],
    ["Insulated Wire Coils", "Cables & Wires", "Insulated Wire"],
    ["Copper Wire Coils", "Non-Ferrous Metals", "Copper"],
    ["Aluminum Sheets Pack", "Non-Ferrous Metals", "Aluminum"],
    ["Retired Laptops (Batch 243)", "Electronic Scrap (E-Waste)", "Laptops"],
    ["Server PCB Boards", "Electronic Scrap (E-Waste)", "PCBs"],
    ["PET Bottle Bales", "Plastic Scrap", "PET"],
    ["HDPE Drums Lot", "Plastic Scrap", "HDPE"],
    ["Lead Acid Battery Lot", "Batteries", "Lead Acid"],
    ["OCC Cardboard Bales", "Paper & Cardboard", "OCC Cardboard"],
  ];
  return seed.map(([name, category, subcategory], i) => ({
    id: `p${i + 1}`,
    name,
    category,
    subcategory,
    detailTitle: "Iron Scrap - 500 kg",
    weight: "15 tons",
    color: "Wooden",
    dimensions: { length: "120", width: "80", height: "60", unit: "cm" },
    condition: "Good",
    description: PRODUCT_DESCRIPTION,
    images: defaultImages,
  }));
}
