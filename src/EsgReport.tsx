import { useRef, useState } from "react";
import SideBar from "./components/SideBar";
import type { SideBarPage } from "./components/SideBar";
import { UserProfile, TopBar } from "./MoneyTransactions";
import PeriodFilter from "./components/esg/PeriodFilter";
import { EsgCardTitleIcon, EsgCloudDownloadIcon, EsgPrinterIcon, EsgShareIcon } from "./components/esgIcons";
import esgAvoidedWarning from "./assets/figma/esgAvoidedWarning.png";
import { ESG_COMPANY, ESG_DEFAULT_PERIOD, buildEsgReport, esgFormat } from "./esgData";
import type { EsgPeriod } from "./esgData";

type EsgReportProps = {
  onNavigate: (page: SideBarPage) => void;
};

/* "Frame 247" — the title row every report card shares */
function CardHeader({ title, aside }: { title: string; aside: React.ReactNode }) {
  return (
    <div
      className="border-[#f5f5f5] border-b border-solid content-stretch flex gap-[8px] items-center justify-between pb-[16px] relative shrink-0 w-full"
      data-name="Frame 247"
    >
      <div className="content-stretch flex gap-[8px] items-center min-w-0 relative shrink-0" data-name="Frame 2085664043">
        <EsgCardTitleIcon className="shrink-0 size-[12px] text-[#131313]" />
        <div className="[word-break:break-word] flex flex-col font-cairo font-bold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#131313] text-[16px]">
          <p className="leading-[normal]">{title}</p>
        </div>
      </div>
      <div className="[word-break:break-word] flex flex-col font-cairo font-normal justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(19,19,19,0.7)] whitespace-nowrap">
        {aside}
      </div>
    </div>
  );
}

/* "Frame 4" — one cell of the headline KPI strip */
function KpiCell({ label, value, unit, note, last }: { label: string; value: string; unit?: string; note?: string; last?: boolean }) {
  return (
    <div
      className={`content-stretch flex flex-[1_0_0] gap-[16px] items-center min-w-px overflow-clip px-[24px] xl:px-[48px] py-[8px] relative ${
        last ? "" : "border-[#f0f0f0] border-b lg:border-b-0 lg:border-r border-solid"
      }`}
      data-name="Frame 23"
    >
      <div className="content-stretch flex flex-col gap-[4px] justify-center min-w-0 relative shrink-0" data-name="Frame 4">
        <div className="[word-break:break-word] flex flex-col font-cairo font-medium justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(19,19,19,0.7)]">
          <p className="leading-[normal]">{label}</p>
        </div>
        {/* "Line 10" — the 16px tick between label and value */}
        <div className="bg-[#f0f0f0] h-[16px] shrink-0 w-px" data-name="Line 10" />
        <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Frame 2085664038">
          <div className="[word-break:break-word] flex flex-col font-cairo font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#131313] text-[24px] whitespace-nowrap">
            <p className="leading-[normal]">
              {value}
              {unit ? (
                <span className="[word-break:break-word] font-cairo font-normal not-italic text-[16px] text-[rgba(19,19,19,0.7)]">{` ${unit}`}</span>
              ) : null}
            </p>
          </div>
          {note ? (
            <div className="[word-break:break-word] flex flex-col font-cairo font-medium justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-[rgba(19,19,19,0.7)] whitespace-nowrap">
              <p className="leading-[normal]">{note}</p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

/* "Homepage" — ESG & Sustainability Disclosure (Figma 845:13444) */
export default function EsgReport({ onNavigate }: EsgReportProps) {
  /* The single source of truth: one month-and-year range every number, chart
     and period string on the page is derived from. */
  const [period, setPeriod] = useState<EsgPeriod>(ESG_DEFAULT_PERIOD);
  const [exporting, setExporting] = useState(false);
  const [shareNote, setShareNote] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);

  const report = buildEsgReport(period);
  const { totals } = report;
  const maxBar = Math.max(...report.chart.map((b) => b.tonnes), 0.0001);

  const handlePrint = () => window.print();

  /* Share is a placeholder until there is something to share a link to — same
     convention as the other not-yet-wired actions in this project. */
  const handleShare = () => {
    setShareNote(true);
    window.setTimeout(() => setShareNote(false), 2600);
  };

  /* PDF only, generated in the browser: rasterise the report card stack with
     html2canvas and lay it into an A4 jsPDF document, paging as needed. */
  const handleExportPdf = async () => {
    const node = reportRef.current;
    if (!node || exporting) return;
    setExporting(true);
    try {
      const [{ default: html2canvas }, { jsPDF }] = await Promise.all([import("html2canvas"), import("jspdf")]);
      const canvas = await html2canvas(node, { scale: 2, backgroundColor: "#ffffff", useCORS: true, logging: false });
      /* JPEG keeps a full-page render around a megabyte; PNG runs to tens of MB */
      const image = canvas.toDataURL("image/jpeg", 0.95);
      const pdf = new jsPDF({ orientation: "portrait", unit: "pt", format: "a4" });
      const margin = 24;
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const width = pageWidth - margin * 2;
      const height = (canvas.height / canvas.width) * width;
      const usable = pageHeight - margin * 2;
      for (let offset = 0; offset < height; offset += usable) {
        if (offset > 0) pdf.addPage();
        /* pages beyond the first shift the same image up; the PDF page box clips */
        pdf.addImage(image, "JPEG", margin, margin - offset, width, height);
      }
      pdf.save(`${report.documentReference}.pdf`);
    } finally {
      setExporting(false);
    }
  };

  return (
    <div
      className="bg-[#f5f5f5] content-stretch flex flex-col items-start min-h-screen p-[24px] relative w-full esg-print-page"
      data-name="Homepage"
    >
      <div
        className="content-stretch flex flex-col lg:flex-row gap-[16px] items-start lg:justify-center relative shrink-0 w-full max-w-[1392px] mx-auto esg-print-shell"
        data-name="Sidebar Container"
      >
        <div className="content-stretch flex items-start relative shrink-0 w-full lg:w-auto esg-print-hide" data-name="Profile Section">
          <div className="content-stretch flex flex-col gap-[24px] lg:h-full items-start relative shrink-0 w-full lg:w-[201px]">
            <UserProfile />
            <SideBar className="lg:h-[940px] relative shrink-0 w-full lg:w-[200px]" active="esgReports" onNavigate={onNavigate} />
          </div>
        </div>

        <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-full lg:w-auto lg:flex-[1_0_0] lg:max-w-[1175px] min-w-0 esg-print-main">
          <div className="w-full esg-print-hide">
            <TopBar />
          </div>

          <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-full" data-name="Dashboard Home Content">
            {/* "Auction Information" — title, period filter and the report actions */}
            <div
              className="content-stretch flex flex-col xl:flex-row gap-[16px] xl:gap-0 items-start xl:items-center justify-between relative shrink-0 w-full esg-print-hide"
              data-name="Auction Information"
            >
              <div className="[word-break:break-word] flex flex-col font-cairo font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#131313] text-[18px]">
                <h1 className="leading-[normal]">ESG &amp; Sustainability Disclosure</h1>
              </div>

              <div className="content-stretch flex flex-wrap gap-[24px] items-center xl:justify-end relative shrink-0" data-name="Badge Container">
                <div className="content-stretch flex items-center xl:border-r xl:border-solid xl:border-white xl:pr-[24px] relative shrink-0">
                  <PeriodFilter applied={report.period} onApply={setPeriod} />
                </div>

                <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Frame 2085664035">
                  <button
                    type="button"
                    onClick={handlePrint}
                    aria-label="Print report"
                    title="Print report"
                    className="bg-white content-stretch flex items-center justify-center px-[16px] py-[8px] relative rounded-[24px] shrink-0 size-[40px] cursor-pointer text-[#131313]"
                    data-name="Frame 153"
                  >
                    <EsgPrinterIcon className="shrink-0 size-[16px]" />
                  </button>

                  <button
                    type="button"
                    onClick={handleShare}
                    aria-label="Share report"
                    title="Share report"
                    className="bg-white border border-[#f0f0f0] border-solid content-stretch flex items-center justify-center px-[16px] py-[8px] relative rounded-[24px] shrink-0 size-[40px] cursor-pointer text-[#131313]"
                    data-name="Options Icon"
                  >
                    <EsgShareIcon className="shrink-0 h-[16px] w-[15px]" />
                  </button>

                  <button
                    type="button"
                    onClick={handleExportPdf}
                    disabled={exporting}
                    className="bg-[#1b9e74] content-stretch flex gap-[8px] h-[40px] items-center justify-center px-[16px] py-[8px] relative rounded-[24px] shrink-0 cursor-pointer text-white disabled:opacity-60 disabled:cursor-default"
                    data-name="Frame 27"
                  >
                    <EsgCloudDownloadIcon className="shrink-0 size-[14px]" />
                    <span className="[word-break:break-word] font-cairo font-bold leading-[normal] not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap">
                      {exporting ? "Preparing…" : "Export PDF"}
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {shareNote && (
              <div
                role="status"
                className="bg-white border border-[#f0f0f0] border-solid font-cairo font-semibold px-[16px] py-[10px] rounded-[24px] text-[#131313] text-[14px] w-full esg-print-hide"
              >
                Sharing a link to this disclosure isn’t wired up yet.
              </div>
            )}

            {/* Everything below here is what Print and Export PDF capture */}
            <div ref={reportRef} className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-full esg-report">
              {/* "Frame 2085664026" — report header card */}
              <div
                className="bg-white content-stretch flex flex-col lg:flex-row gap-[16px] lg:gap-[24px] items-start lg:items-center justify-between overflow-clip p-[24px] relative rounded-[24px] shrink-0 w-full esg-avoid-break"
                data-name="Frame 2085664026"
              >
                <div className="content-stretch flex flex-col gap-[8px] items-start min-w-0 relative shrink-0" data-name="Frame 12">
                  <div className="[word-break:break-word] flex flex-col font-cairo font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#131313] text-[24px]">
                    <p className="leading-[37px]">{ESG_COMPANY}</p>
                  </div>
                  <div className="[word-break:break-word] flex flex-col font-cairo font-normal justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-[rgba(19,19,19,0.7)]">
                    <p className="leading-[18px]">{report.subtitle}</p>
                  </div>
                </div>

                <div className="content-stretch flex gap-[24px] lg:gap-[48px] h-full items-center relative shrink-0" data-name="Frame 2085664037">
                  {[
                    { label: "Document reference", value: report.documentReference, bold: true },
                    { label: "Issued", value: report.issuedOn, bold: false },
                  ].map((f) => (
                    <div key={f.label} className="content-stretch flex flex-col gap-[12px] justify-center relative shrink-0" data-name="Nested Frame">
                      <div className="[word-break:break-word] flex flex-col font-['Inter',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-[rgba(19,19,19,0.7)] whitespace-nowrap">
                        <p className="leading-[normal]">{f.label}</p>
                      </div>
                      <div
                        className={`[word-break:break-word] flex flex-col font-cairo ${
                          f.bold ? "font-bold" : "font-semibold"
                        } justify-center leading-[0] not-italic relative shrink-0 text-[#131313] text-[14px] whitespace-nowrap`}
                      >
                        <p className="leading-[normal]">{f.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* "Over N Months , X tonnes of material were handled." */}
              <div
                className="[word-break:break-word] flex flex-col font-cairo font-normal justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(19,19,19,0.7)] w-full"
                data-name="Over 4 Months , 412 tonnes of material were handled."
              >
                <p>
                  <span className="leading-[18px]">{`Over ${totals.months} Month${totals.months === 1 ? "" : "s"} , `}</span>
                  <span className="[word-break:break-word] font-cairo font-bold leading-[18px] not-italic text-[#131313]">{`${esgFormat(totals.tonnes, 1)} tonnes`}</span>
                  <span className="leading-[18px]">{` of material were handled.`}</span>
                </p>
              </div>

              {/* "Frame 315" — headline KPIs */}
              <div
                className="bg-white content-stretch flex flex-col lg:flex-row items-stretch lg:items-start justify-between py-[16px] relative rounded-[24px] shrink-0 w-full esg-avoid-break"
                data-name="Frame 315"
              >
                <KpiCell label="Material recovered" value={esgFormat(totals.tonnes, 1)} unit="t" />
                <KpiCell label="Landfill avoided" value={esgFormat(Math.round(totals.carbon), 0)} unit="tCO₂e" />
                <KpiCell
                  label="Collections made"
                  value={esgFormat(totals.collections, 0)}
                  note={`across ${totals.sites} site${totals.sites === 1 ? "" : "s"}`}
                  last
                />
              </div>

              {/* "Frame 2085664025" — material breakdown + monthly volume */}
              <div className="content-stretch flex flex-col lg:flex-row gap-[16px] items-stretch relative shrink-0 w-full" data-name="Frame 2085664025">
                {/* "Frame 239" — What you sent us */}
                <div
                  className="bg-white content-stretch flex flex-[1_0_0] flex-col items-start min-w-px p-[16px] relative rounded-[24px] esg-avoid-break"
                  data-name="Frame 239"
                >
                  <div className="content-stretch flex flex-col gap-[20px] items-start justify-center overflow-clip relative shrink-0 w-full" data-name="Frame 20">
                    <CardHeader
                      title="What you sent us"
                      aside={
                        <p className="text-[14px]">
                          <span className="leading-[26px]">{`Total `}</span>
                          <span className="[word-break:break-word] font-cairo font-bold leading-[26px] not-italic text-[#131313]">{`${esgFormat(totals.tonnes, 1)} t`}</span>
                        </p>
                      }
                    />

                    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Frame 38">
                      <div
                        className="[word-break:break-word] border-[#f5f5f5] border-b border-solid content-stretch flex font-cairo font-medium items-center justify-between leading-[0] not-italic pb-[16px] relative shrink-0 text-[14px] text-[rgba(19,19,19,0.7)] w-full"
                        data-name="Frame 35"
                      >
                        <div className="flex flex-col justify-center relative shrink-0 w-[78px]">
                          <p className="leading-[26px]">Material</p>
                        </div>
                        <div className="content-stretch flex gap-[56px] items-center relative shrink-0 whitespace-nowrap">
                          <div className="flex flex-col justify-center relative shrink-0">
                            <p className="leading-[26px]">Tonnes</p>
                          </div>
                          <div className="flex flex-col justify-center relative shrink-0">
                            <p className="leading-[26px]">Share</p>
                          </div>
                        </div>
                      </div>

                      {totals.materials.map((m) => (
                        <div
                          key={m.name}
                          className="border-[#f5f5f5] border-b border-solid content-stretch flex gap-[8px] items-start justify-between pb-[16px] relative shrink-0 w-full"
                          data-name="Frame 43"
                        >
                          <div className="content-stretch flex gap-[8px] items-center min-w-0 relative shrink-0 md:w-[78px]">
                            <div className="relative rounded-[2px] shrink-0 size-[8px]" style={{ backgroundColor: m.color }} />
                            <div className="[word-break:break-word] flex flex-col font-cairo font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#131313] text-[14px] whitespace-nowrap">
                              <p className="leading-[26px]">{m.name}</p>
                            </div>
                          </div>
                          <div className="[word-break:break-word] content-stretch flex font-cairo font-semibold gap-[48px] items-center leading-[0] not-italic relative shrink-0 text-[14px]">
                            <div className="flex flex-col justify-center relative shrink-0 text-[#131313] w-[43px]">
                              <p className="leading-[26px]">{esgFormat(m.tonnes, 1)}</p>
                            </div>
                            <div className="flex flex-col justify-center relative shrink-0 text-[rgba(19,19,19,0.7)] w-[35px]">
                              <p className="leading-[26px]">{esgFormat(m.share, 1)}%</p>
                            </div>
                          </div>
                        </div>
                      ))}

                      <div className="[word-break:break-word] content-stretch flex items-start justify-between leading-[0] not-italic relative shrink-0 text-[14px] w-full" data-name="Frame 50">
                        <div className="flex flex-col font-cairo font-semibold justify-center relative shrink-0 text-[#131313] whitespace-nowrap">
                          <p className="leading-[26px]">Total</p>
                        </div>
                        <div className="content-stretch flex font-cairo font-bold gap-[48px] items-center relative shrink-0">
                          <div className="flex flex-col justify-center relative shrink-0 text-[#131313] w-[43px]">
                            <p className="leading-[26px]">{esgFormat(totals.tonnes, 1)}</p>
                          </div>
                          <div className="flex flex-col justify-center relative shrink-0 text-[rgba(19,19,19,0.7)] w-[35px]">
                            <p className="leading-[26px]">100%</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* "card" — Monthly volume */}
                <div
                  className="bg-white content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip p-[16px] relative rounded-[20px] esg-avoid-break"
                  data-name="card"
                >
                  <CardHeader title="Monthly volume" aside={<p className="leading-[26px]">{report.periodShort}</p>} />
                  <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px pt-[16px] relative w-full" data-name="Frame 2085664057">
                    <div
                      className="content-stretch flex flex-[1_0_0] flex-col gap-[10px] items-center justify-end min-h-px overflow-clip relative w-full"
                      data-name="chart-graphic"
                    >
                      <div className="content-stretch flex gap-[12px] h-[198px] items-end relative shrink-0 w-full" data-name="Chart" role="img" aria-label={`Monthly volume, ${report.periodShort}`}>
                        {report.chart.map((bar, i) => (
                          <div
                            key={`${bar.month}-${i}`}
                            className="flex-[1_0_0] min-w-px rounded-[8px]"
                            style={{ backgroundColor: bar.color, height: `${Math.max((bar.tonnes / maxBar) * 100, 2)}%` }}
                            title={`${bar.month}: ${esgFormat(bar.tonnes, 1)} t`}
                            data-name="Rectangle 38"
                            data-month={bar.month}
                            data-tonnes={bar.tonnes}
                          />
                        ))}
                      </div>
                      <div
                        className="[word-break:break-word] content-stretch flex font-['DM_Sans',sans-serif] font-medium gap-[12px] items-end leading-[20px] relative shrink-0 text-[12px] text-black text-center tracking-[-0.24px] w-full"
                        data-name="years"
                      >
                        {report.chart.map((bar, i) => (
                          <p key={`${bar.month}-label-${i}`} className="flex-[1_0_0] h-[22px] min-w-px relative">
                            {bar.label}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* "Frame 2085664062" — Carbon */}
              <div
                className="bg-[rgba(27,158,116,0.04)] content-stretch flex flex-col gap-[20px] items-start p-[16px] relative rounded-[24px] shrink-0 w-full"
                data-name="Frame 2085664062"
              >
                <div className="content-stretch flex flex-col gap-[8px] items-start justify-center relative shrink-0" data-name="Frame 2085664058">
                  <div className="[word-break:break-word] flex flex-col font-cairo font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#131313] text-[20px]">
                    <h2 className="leading-[28px]">Carbon</h2>
                  </div>
                  <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full">
                    <div className="content-stretch flex items-center py-[4px] relative shrink-0">
                      <div className="bg-[#1b9e74] relative rounded-[2px] shrink-0 size-[8px]" />
                    </div>
                    <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-wrap gap-[8px] items-center leading-[0] min-w-px not-italic relative">
                      <div className="flex flex-col font-cairo font-bold justify-center min-w-0 relative text-[#287d3c] text-[16px]">
                        <p className="leading-[18px]">Does not go in your footprint</p>
                      </div>
                      <div className="flex flex-col font-cairo font-normal justify-center min-w-0 relative text-[14px] text-[rgba(19,19,19,0.7)]">
                        <p className="leading-[26px]">Avoided emissions — impact reporting only</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* "Frame 239" — the carbon figures */}
                <div className="bg-white content-stretch flex items-start p-[16px] relative rounded-[24px] shrink-0 w-full esg-avoid-break" data-name="Frame 239">
                  <div className="content-stretch flex flex-[1_0_0] flex-col gap-[20px] items-start justify-center min-w-px overflow-clip relative" data-name="Frame 22">
                    <div
                      className="bg-[rgba(232,245,241,0.4)] content-stretch flex items-center justify-center overflow-clip p-[12px] relative rounded-[8px] shrink-0 w-full"
                      data-name="Frame 2085664026"
                    >
                      <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[12px] items-start leading-[0] min-w-px not-italic relative">
                        <div className="content-stretch flex gap-[8px] items-end relative shrink-0" data-name="Frame 2085664060">
                          <div className="flex flex-col font-cairo font-bold justify-center relative shrink-0 text-[#287d3c] text-[24px]">
                            <p className="leading-[27px]">{esgFormat(Math.round(totals.carbon), 0)}</p>
                          </div>
                          <div className="flex flex-col font-cairo font-normal justify-center relative shrink-0 text-[12px] text-[rgba(40,125,60,0.9)]">
                            <p className="leading-[18px]">tCO₂e avoided</p>
                          </div>
                        </div>
                        <div className="flex flex-col font-cairo font-normal justify-center relative shrink-0 text-[12px] text-[rgba(40,125,60,0.9)]">
                          <p>
                            <span className="leading-[18px] text-[rgba(19,19,19,0.6)]">{`From ${report.periodLong}:`}</span>
                            <span className="leading-[18px]">{` ${report.certificatesLine}`}</span>
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Frame 248">
                      <div
                        className="[word-break:break-word] border-[#f5f5f5] border-b border-solid content-stretch flex font-cairo font-medium items-center justify-between leading-[0] not-italic pb-[16px] relative shrink-0 text-[14px] text-[rgba(19,19,19,0.7)] w-full"
                        data-name="Frame 35"
                      >
                        <div className="flex flex-col justify-center relative shrink-0 w-[78px]">
                          <p className="leading-[26px]">Material</p>
                        </div>
                        <div className="flex flex-col justify-center relative shrink-0 text-right w-[54px]">
                          <p className="leading-[26px]">tCO₂e</p>
                        </div>
                      </div>

                      {report.carbonRows.map((m) => (
                        <div
                          key={m.name}
                          className="border-[#f5f5f5] border-b border-solid content-stretch flex items-start justify-between pb-[16px] relative shrink-0 w-full"
                          data-name="Frame 43"
                        >
                          <div className="content-stretch flex items-center relative shrink-0 w-[78px]">
                            <div className="[word-break:break-word] flex flex-col font-cairo font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#131313] text-[14px] whitespace-nowrap">
                              <p className="leading-[26px]">{m.name}</p>
                            </div>
                          </div>
                          <div className="[word-break:break-word] flex flex-col font-cairo font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#131313] text-[14px] text-right w-[54px]">
                            <p className="leading-[26px]">{esgFormat(m.carbon, 2)}</p>
                          </div>
                        </div>
                      ))}

                      <div className="[word-break:break-word] content-stretch flex items-start justify-between leading-[0] not-italic relative shrink-0 text-[14px] w-full whitespace-nowrap" data-name="Frame 50">
                        <div className="flex flex-col font-cairo font-semibold justify-center relative shrink-0 text-[#131313]">
                          <p className="leading-[26px]">Total</p>
                        </div>
                        <div className="flex flex-col font-cairo font-bold justify-center relative shrink-0 text-[#287d3c] text-right">
                          <p className="leading-[26px]">{esgFormat(totals.carbon, 2)}</p>
                        </div>
                      </div>
                    </div>

                    <div className="border-[#f5f5f5] border-solid border-t content-stretch flex items-center justify-center pt-[16px] relative shrink-0 w-full" data-name="Frame 2085664061">
                      <div className="[word-break:break-word] flex flex-[1_0_0] flex-col font-cairo font-normal justify-center leading-[0] min-w-px not-italic relative text-[14px] text-[rgba(19,19,19,0.7)]">
                        <p className="leading-[normal]">{report.comparisonLine}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* "Frame 341" — what the avoided-emissions figure is not */}
                <div
                  className="bg-[rgba(255,255,255,0.3)] border border-[rgba(40,125,60,0.2)] border-solid content-stretch flex items-center justify-center p-[12px] relative rounded-[16px] shrink-0 w-full esg-avoid-break"
                  data-name="Frame 341"
                >
                  <div className="content-stretch flex flex-[1_0_0] gap-[16px] items-start min-w-px relative" data-name="Frame 343">
                    <img alt="" src={esgAvoidedWarning} className="h-[32px] relative shrink-0 w-[30px]" data-name="m028t0154_i_icon_18sep22 1" />
                    <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start leading-[0] min-w-px not-italic relative" data-name="Frame 307">
                      <div className="flex flex-col font-cairo font-bold justify-center relative shrink-0 text-[#131313] text-[16px]">
                        <p className="leading-[normal]">{`Read this before using the ${esgFormat(Math.round(totals.carbon), 0)} figure`}</p>
                      </div>
                      <div className="flex flex-col font-cairo font-semibold justify-center min-w-full relative shrink-0 text-[14px] text-[rgba(19,19,19,0.7)] w-[min-content]">
                        <p>
                          <span className="leading-[normal]">{`Avoided emissions are `}</span>
                          <span className="[word-break:break-word] font-cairo font-bold leading-[normal] not-italic">NOT an offset</span>
                          <span className="leading-[normal]">{` and `}</span>
                          <span className="[word-break:break-word] font-cairo font-bold leading-[normal] not-italic">
                            NOT a reduction in your footprint
                          </span>
                          <span className="leading-[normal]">
                            . Use them in impact reporting, tender responses and communications, always labelled “avoided emissions”. If
                            your goal is to reduce the number, the lever is generating less waste, not recovering more.
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-[#f5f5f5] border-solid border-t content-stretch flex items-center justify-center pt-[16px] relative shrink-0 w-full" data-name="Frame 2085664061">
                  <div className="[word-break:break-word] flex flex-[1_0_0] flex-col font-cairo font-normal justify-center leading-[0] min-w-px not-italic relative text-[14px] text-[rgba(19,19,19,0.7)]">
                    <p className="leading-[normal]">
                      Baseline for avoided emissions: uncontrolled Egyptian landfill with no gas capture, which is the prevailing local
                      condition. US EPA WARM v16 assumes roughly 75% capture, so we apply an Egypt overlay rather than using US defaults
                      unadjusted. Factor set BKN-EF-2025.2-EG. Biogenic CO₂ of {esgFormat(totals.tonnes * 0.00584, 2)} t is reported
                      separately and excluded from the Category 5 total.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
