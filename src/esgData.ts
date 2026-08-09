/* ESG & Sustainability Disclosure — mock dataset and period derivation.
   ---------------------------------------------------------------------
   There is no backend, so the whole report is derived from one seeded table of
   monthly tonnages per material. Everything the screen shows — headline KPIs,
   the material breakdown, the monthly-volume chart, the carbon table, the
   year-over-year captions, the document reference and the issue date — comes
   out of `buildEsgReport(period)`. Nothing on the screen is hardcoded, so
   changing the period changes every number and every string that mentions it. */

export type EsgMaterial = "Cardboard" | "Plastics" | "Metal" | "Paper" | "Cooking oil" | "Electronics" | "Residual";

/* "Frame 38" — the material rows, in the order Figma lists them, each with the
   swatch colour of its legend dot. */
export const ESG_MATERIALS: { name: EsgMaterial; color: string }[] = [
  { name: "Cardboard", color: "#1b9e74" },
  { name: "Plastics", color: "rgba(27,158,116,0.8)" },
  { name: "Metal", color: "rgba(27,158,116,0.6)" },
  { name: "Paper", color: "rgba(27,158,116,0.4)" },
  { name: "Cooking oil", color: "#d6af68" },
  { name: "Electronics", color: "#aaa" },
  { name: "Residual", color: "#d2d2d2" },
];

/* tCO₂e avoided per tonne recovered — factor set BKN-EF-2025.2-EG. Residual
   waste is landfilled, so it avoids nothing and never reaches the carbon table. */
export const ESG_EMISSION_FACTORS: number[] = [3.14, 1.3829, 2.02, 3.55, 2.48, 1.85, 0];

export const ESG_MONTHS_SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
export const ESG_MONTHS_LONG = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/* The 12 bar shades Figma paints across the Monthly-volume chart, light to
   dark. Sampled straight off the rendered frame, wobble and all. */
export const ESG_BAR_COLORS = [
  "#eff9f6",
  "#e8f5f1",
  "#b8e1d4",
  "#a3d8c7",
  "#85cbb5",
  "#96d2bf",
  "#a3d8c7",
  "#66bea2",
  "#6dc1a6",
  "#49b190",
  "#49b190",
  "#19906a",
];

type YearRecord = {
  /* [month][material] tonnes */
  tonnes: number[][];
  collections: number[];
  sites: number[];
};

/* Seeded monthly figures. Jan–Dec 2025 reproduces the Figma frame exactly:
   412.4 t handled, 1,018 tCO₂e avoided, 1,847 collections across 6 sites, and
   the same per-material split. 2024 is pinned so the default view's comparison
   caption lands on Figma's own wording (+20.7% material, +19.6% tCO₂e, −0.9%
   per tonne). The surrounding years carry plausible growth and seasonality. */
const ESG_DATASET: Record<number, YearRecord> = {
  2022: {
    tonnes: [
      [4.5, 2.9, 1.8, 1.4, 1, 0.2, 0.2],
      [6.7, 3.4, 2, 1.8, 1, 0.2, 0.3],
      [8.7, 3.5, 2.5, 2, 1.3, 0.3, 0.3],
      [9, 4.9, 3, 2.7, 1.8, 0.4, 0.3],
      [12, 5.2, 3, 2.6, 2.3, 0.4, 0.4],
      [14.2, 6.8, 4.6, 4, 2.1, 0.5, 0.5],
      [10.3, 4.4, 3.3, 2.2, 1.9, 0.3, 0.4],
      [13.8, 6.7, 4.4, 2.8, 2.7, 0.5, 0.5],
      [11, 6.2, 3.6, 3.3, 1.7, 0.4, 0.5],
      [6.3, 2.7, 2.1, 1.7, 1.3, 0.3, 0.2],
      [5.7, 2.9, 2, 1.8, 1.2, 0.2, 0.3],
      [8.5, 3.3, 2, 1.8, 1.5, 0.2, 0.3],
    ],
    collections: [54, 71, 77, 91, 124, 139, 109, 145, 117, 63, 59, 88],
    sites: [6, 6, 6, 5, 6, 5, 5, 6, 5, 5, 5, 6],
  },
  2023: {
    tonnes: [
      [6.9, 2.9, 2, 1.6, 1.2, 0.2, 0.3],
      [8.4, 4.4, 2.5, 1.8, 1.5, 0.3, 0.4],
      [8.3, 4.3, 2.7, 2.3, 1.6, 0.3, 0.4],
      [13.6, 6.1, 4.5, 3, 2.7, 0.6, 0.5],
      [13.8, 7.1, 4.7, 3.4, 2.7, 0.5, 0.6],
      [13.1, 5.4, 3.4, 3.4, 2.1, 0.4, 0.5],
      [16.8, 9.3, 5.3, 4.7, 2.7, 0.6, 0.5],
      [10.9, 6.5, 3.9, 2.5, 2, 0.5, 0.5],
      [11.6, 5.1, 3.7, 2.4, 2, 0.4, 0.4],
      [7, 3.9, 2.3, 2.3, 1.6, 0.3, 0.4],
      [9.5, 5, 3.2, 2.3, 1.7, 0.3, 0.5],
      [6.7, 4, 2.4, 2.1, 1.3, 0.3, 0.4],
    ],
    collections: [72, 87, 88, 152, 157, 117, 163, 126, 110, 80, 103, 72],
    sites: [5, 6, 5, 5, 5, 6, 5, 5, 5, 5, 5, 5],
  },
  2024: {
    tonnes: [
      [8.1, 3.4, 2.7, 1.6, 1.5, 0.3, 0.4],
      [7.3, 4.3, 2.4, 1.5, 1.3, 0.2, 0.4],
      [11.6, 5.1, 3.2, 3.1, 1.9, 0.4, 0.5],
      [12.3, 6.2, 4.5, 3.2, 2.3, 0.5, 0.6],
      [18.2, 9.8, 4.8, 4.4, 3.5, 0.7, 0.8],
      [12.2, 8.5, 4.2, 3.6, 2.4, 0.6, 0.6],
      [16.2, 8.4, 4.9, 3.4, 2.8, 0.5, 0.8],
      [14.2, 7.7, 5.9, 3.7, 3.3, 0.7, 0.8],
      [9.9, 6.9, 4.5, 3, 2.2, 0.5, 0.6],
      [12.6, 6.9, 4.3, 3, 2.1, 0.4, 0.6],
      [10.3, 5, 3.5, 2.5, 1.9, 0.4, 0.5],
      [9.4, 5.1, 2.7, 2.2, 1.4, 0.3, 0.4],
    ],
    collections: [88, 86, 107, 126, 184, 136, 183, 166, 116, 143, 101, 93],
    sites: [5, 5, 6, 5, 6, 5, 6, 6, 5, 5, 5, 5],
  },
  2025: {
    tonnes: [
      [10.2, 5.4, 4.2, 2.4, 2.1, 0.5, 0.6],
      [12.4, 6.4, 4.7, 3.1, 2.6, 0.5, 0.6],
      [7.8, 4.3, 2.2, 1.7, 1.4, 0.3, 0.4],
      [11.3, 7, 4.6, 3.1, 2.3, 0.6, 0.8],
      [15.5, 10.1, 5, 3.6, 3.2, 0.6, 0.8],
      [17.5, 10.5, 6.4, 5.1, 4.2, 0.8, 0.9],
      [7.2, 4.2, 2.4, 1.5, 1.4, 0.2, 0.3],
      [12.1, 7.7, 4.3, 2.6, 2.1, 0.5, 0.6],
      [20.3, 10.6, 6.4, 5.2, 3.3, 0.8, 1.1],
      [12.8, 6.9, 4.4, 3.3, 2, 0.5, 0.7],
      [17.7, 9.6, 5.8, 4.7, 3.9, 0.8, 1.1],
      [23.6, 13.8, 7.9, 4.9, 3.6, 0.7, 1.2],
    ],
    collections: [120, 122, 80, 138, 175, 202, 79, 122, 215, 149, 206, 239],
    sites: [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
  },
  2026: {
    tonnes: [
      [9.5, 4.9, 3, 1.9, 1.9, 0.3, 0.4],
      [9.8, 5.5, 3.1, 2.1, 1.8, 0.5, 0.5],
      [13.3, 8, 4.4, 3.3, 2.8, 0.6, 0.8],
      [19.6, 10.1, 6.4, 4.8, 3.9, 0.7, 1.1],
      [16.5, 10.7, 7.7, 5.1, 3.4, 0.8, 1.1],
      [15.7, 9, 5.9, 4.2, 3, 0.8, 1],
      [21.9, 12.7, 6.2, 4.5, 3.6, 0.7, 1.2],
      [19.2, 10.3, 5.7, 3.6, 3.4, 0.6, 1],
      [17.1, 12.3, 7.3, 4.6, 3.3, 0.7, 1.1],
      [13.6, 6.9, 4.2, 3.6, 2.5, 0.6, 0.6],
      [13.8, 9, 5.6, 3.9, 3, 0.6, 0.8],
      [13.7, 9.5, 5.5, 3, 2.9, 0.7, 0.9],
    ],
    collections: [105, 109, 141, 212, 196, 182, 208, 204, 209, 129, 174, 172],
    sites: [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
  },
};

export const ESG_YEARS = Object.keys(ESG_DATASET)
  .map(Number)
  .sort((a, b) => a - b);

/* One point on the period axis. `month` is 0-based — there is no day anywhere
   in this model, which is what keeps the filter month-and-year only. */
export type EsgPoint = { month: number; year: number };
export type EsgPeriod = { from: EsgPoint; to: EsgPoint };

/* The report Figma renders: the full 2025 calendar year. */
export const ESG_DEFAULT_PERIOD: EsgPeriod = { from: { month: 0, year: 2025 }, to: { month: 11, year: 2025 } };

export const ESG_COMPANY = "Nile Delta Foods S.A.E.";

const ordinal = (p: EsgPoint) => p.year * 12 + p.month;
const pointFromOrdinal = (o: number): EsgPoint => ({ month: ((o % 12) + 12) % 12, year: Math.floor(o / 12) });

export function esgPointsEqual(a: EsgPoint, b: EsgPoint) {
  return a.month === b.month && a.year === b.year;
}

/* From/To are order-free: picking a To that sits before the From simply flips
   the range rather than producing an empty report. */
export function normalizeEsgPeriod(period: EsgPeriod): EsgPeriod {
  return ordinal(period.from) <= ordinal(period.to) ? period : { from: period.to, to: period.from };
}

function monthsIn(period: EsgPeriod): EsgPoint[] {
  const { from, to } = normalizeEsgPeriod(period);
  const out: EsgPoint[] = [];
  for (let o = ordinal(from); o <= ordinal(to); o++) out.push(pointFromOrdinal(o));
  return out;
}

const round1 = (n: number) => Math.round(n * 10) / 10;
const round2 = (n: number) => Math.round(n * 100) / 100;

export const esgFormat = (n: number, decimals: number) =>
  n.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

/* Months outside the seeded range are reported as zero rather than throwing —
   the year select only ever offers seeded years, so this is belt and braces. */
function monthRow(p: EsgPoint) {
  const year = ESG_DATASET[p.year];
  if (!year) return { tonnes: ESG_MATERIALS.map(() => 0), collections: 0, sites: 0 };
  return { tonnes: year.tonnes[p.month], collections: year.collections[p.month], sites: year.sites[p.month] };
}

export type EsgMaterialRow = { name: EsgMaterial; color: string; tonnes: number; share: number; carbon: number };
export type EsgChartBar = { label: string; month: string; tonnes: number; color: string };

export type EsgTotals = {
  tonnes: number;
  carbon: number;
  collections: number;
  sites: number;
  months: number;
  materials: EsgMaterialRow[];
};

function totalsFor(period: EsgPeriod): EsgTotals {
  const points = monthsIn(period);
  const tonnes = ESG_MATERIALS.map(() => 0);
  let collections = 0;
  let sites = 0;
  for (const p of points) {
    const row = monthRow(p);
    row.tonnes.forEach((t, i) => (tonnes[i] += t));
    collections += row.collections;
    sites = Math.max(sites, row.sites);
  }
  const total = round1(tonnes.reduce((a, b) => a + b, 0));
  const materials: EsgMaterialRow[] = ESG_MATERIALS.map((m, i) => ({
    name: m.name,
    color: m.color,
    tonnes: round1(tonnes[i]),
    share: total > 0 ? (tonnes[i] / total) * 100 : 0,
    carbon: round2(tonnes[i] * ESG_EMISSION_FACTORS[i]),
  }));
  return {
    tonnes: total,
    carbon: round2(materials.reduce((a, m) => a + m.carbon, 0)),
    collections,
    sites,
    months: points.length,
    materials,
  };
}

/* The same window shifted back one year, used for the comparison captions. */
function previousYearPeriod(period: EsgPeriod): EsgPeriod {
  const { from, to } = normalizeEsgPeriod(period);
  return { from: { ...from, year: from.year - 1 }, to: { ...to, year: to.year - 1 } };
}

const DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const daysIn = (month: number, year: number) =>
  month === 1 && (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) ? 29 : DAYS_IN_MONTH[month];

const quarterOf = (month: number) => Math.floor(month / 3);
const QUARTER_LETTER = ["A", "B", "C", "D"];

function signedPct(current: number, previous: number) {
  if (previous <= 0) return null;
  return (current / previous - 1) * 100;
}

export type EsgReport = {
  period: EsgPeriod;
  totals: EsgTotals;
  previous: EsgTotals | null;
  /* strings that mention the period — all derived, never hardcoded */
  periodShort: string;
  periodLong: string;
  subtitle: string;
  documentReference: string;
  issuedOn: string;
  headline: string;
  certificatesLine: string;
  comparisonLine: string;
  carbonRows: EsgMaterialRow[];
  chart: EsgChartBar[];
  certificates: number;
};

export function buildEsgReport(rawPeriod: EsgPeriod): EsgReport {
  const period = normalizeEsgPeriod(rawPeriod);
  const { from, to } = period;
  const totals = totalsFor(period);
  const points = monthsIn(period);

  const prevPeriod = previousYearPeriod(period);
  const hasPrevious = ESG_DATASET[prevPeriod.from.year] !== undefined && ESG_DATASET[prevPeriod.to.year] !== undefined;
  const previous = hasPrevious ? totalsFor(prevPeriod) : null;

  /* "Jan – Dec 2025" when the range sits inside one year, otherwise both years
     are spelled out; a single month is just "Mar 2025". */
  const sameYear = from.year === to.year;
  const periodShort = esgPointsEqual(from, to)
    ? `${ESG_MONTHS_SHORT[from.month]} ${from.year}`
    : sameYear
      ? `${ESG_MONTHS_SHORT[from.month]} – ${ESG_MONTHS_SHORT[to.month]} ${to.year}`
      : `${ESG_MONTHS_SHORT[from.month]} ${from.year} – ${ESG_MONTHS_SHORT[to.month]} ${to.year}`;

  const startDate = `1 ${ESG_MONTHS_SHORT[from.month]}${sameYear ? "" : ` ${from.year}`}`;
  const endDate = `${daysIn(to.month, to.year)} ${ESG_MONTHS_SHORT[to.month]} ${to.year}`;
  const periodLong = `${startDate} – ${endDate}`;

  const fullYear = sameYear && from.month === 0 && to.month === 11;
  const subtitle = `${fullYear ? "Annual" : "Period"} waste & circularity performance · ${periodLong}`;

  const documentReference = `BKN-DISC-NDF-${from.year}${QUARTER_LETTER[quarterOf(from.month)]}-${String(
    (from.month % 3) + 1,
  ).padStart(2, "0")}`;

  /* Issued on the 14th of the second month after the reporting window closes —
     Jan–Dec 2025 is issued 14 Feb 2026, exactly as the frame shows. */
  const issuedPoint = pointFromOrdinal(ordinal(to) + 2);
  const issuedOn = `14 ${ESG_MONTHS_SHORT[issuedPoint.month]} ${issuedPoint.year}`;

  const headline = `Over ${totals.months} Month${totals.months === 1 ? "" : "s"} , ${esgFormat(totals.tonnes, 1)} tonnes of material were handled.`;

  const certificates = Math.round(totals.carbon * 0.828);
  const quarters = Array.from(new Set(points.map((p) => quarterOf(p.month)))).sort((a, b) => a - b);
  const quarterLabel =
    quarters.length === 1 ? `Q${quarters[0] + 1}` : `Q${quarters[0] + 1}–Q${quarters[quarters.length - 1] + 1}`;
  const certificatesLine = `${esgFormat(certificates, 0)}·certificates ${quarterLabel}, all retired`;

  const carbonDelta = previous ? signedPct(totals.carbon, previous.carbon) : null;
  const tonnesDelta = previous ? signedPct(totals.tonnes, previous.tonnes) : null;
  const perTonne = totals.tonnes > 0 ? totals.carbon / totals.tonnes : 0;
  const prevPerTonne = previous && previous.tonnes > 0 ? previous.carbon / previous.tonnes : 0;
  const perTonneDelta = prevPerTonne > 0 ? (perTonne / prevPerTonne - 1) * 100 : null;

  const comparisonLine =
    carbonDelta === null || tonnesDelta === null || perTonneDelta === null
      ? `No comparable ${periodShort.replace(String(from.year), String(from.year - 1))} period is on record, so no year-over-year comparison is shown.`
      : `${carbonDelta >= 0 ? "Rose" : "Fell"} ${esgFormat(Math.abs(carbonDelta), 1)}% because you handled ${esgFormat(
          Math.abs(tonnesDelta),
          1,
        )}% ${tonnesDelta >= 0 ? "more" : "less"} material. Per tonne it ${
          perTonneDelta >= 0 ? "rose" : "fell"
        } ${esgFormat(Math.abs(perTonneDelta), 1)}%. Volume drives this number, not performance.`;

  /* Carbon table: only materials that avoid emissions, heaviest first. */
  const carbonRows = totals.materials.filter((m) => m.carbon > 0).sort((a, b) => b.carbon - a.carbon);

  /* One bar per month in the window. The shade ramp is Figma's 12-step palette
     stretched across however many months are on screen. */
  const chart: EsgChartBar[] = points.map((p, i) => {
    const row = monthRow(p);
    const ramp =
      points.length === 1 ? ESG_BAR_COLORS.length - 1 : Math.round((i * (ESG_BAR_COLORS.length - 1)) / (points.length - 1));
    return {
      label: ESG_MONTHS_SHORT[p.month].charAt(0),
      month: `${ESG_MONTHS_SHORT[p.month]} ${p.year}`,
      tonnes: round1(row.tonnes.reduce((a, b) => a + b, 0)),
      color: ESG_BAR_COLORS[ramp],
    };
  });

  return {
    period,
    totals,
    previous,
    periodShort,
    periodLong,
    subtitle,
    documentReference,
    issuedOn,
    headline,
    certificatesLine,
    comparisonLine,
    carbonRows,
    chart,
    certificates,
  };
}
