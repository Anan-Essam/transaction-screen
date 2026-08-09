import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import { EsgCalendarIcon, EsgArrowIcon } from "../esgIcons";
import { ESG_MONTHS_LONG, ESG_MONTHS_SHORT, ESG_YEARS, esgPointsEqual } from "../../esgData";
import type { EsgPeriod, EsgPoint } from "../../esgData";

type PickerProps = {
  /* Figma layer name — "From Date Picker" / "To Date Picker" */
  name: string;
  label: string;
  value: EsgPoint;
  onChange: (p: EsgPoint) => void;
  className?: string;
};

/* "Date Picker" — month + year only. There is deliberately no day anywhere in
   this control: the button opens a panel holding one Month listbox and one Year
   listbox, and the report's smallest unit is a calendar month.

   Open/close follows the project's robust pattern — a local state toggle plus a
   click-away backdrop that only exists while the panel is open. No
   document-level listeners. The panel is portalled to <body> so no ancestor's
   overflow can clip it. */
function MonthYearPicker({ name, label, value, onChange, className }: PickerProps) {
  const [open, setOpen] = useState(false);
  const [rect, setRect] = useState<{ top: number; left: number } | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const toggle = () => {
    if (!open && buttonRef.current) {
      const box = buttonRef.current.getBoundingClientRect();
      /* keep the 288px-wide panel on screen on narrow viewports */
      setRect({ top: box.bottom + 8, left: Math.max(8, Math.min(box.left, window.innerWidth - 296)) });
    }
    setOpen((o) => !o);
  };

  const text = `${ESG_MONTHS_SHORT[value.month]} ${value.year}`;

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        onClick={toggle}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`${label}: ${text}`}
        className={`bg-white border border-[#dadada] border-solid content-stretch flex h-[40px] items-center px-[16px] py-[11px] relative rounded-[24px] shrink-0 cursor-pointer ${className ?? ""}`}
        data-name={name}
      >
        <span className="content-stretch flex gap-[8px] items-center relative shrink-0 text-[rgba(19,19,19,0.7)]">
          <EsgCalendarIcon className="shrink-0 size-[16px]" />
          <span className="[word-break:break-word] font-cairo font-normal leading-[18px] not-italic relative shrink-0 text-[14px] text-[rgba(19,19,19,0.7)] whitespace-nowrap">
            {text}
          </span>
        </span>
      </button>

      {open &&
        rect &&
        createPortal(
          <>
            {/* click-away backdrop — rendered only while the panel is open */}
            <div className="fixed inset-0 z-[100] cursor-default" aria-hidden onClick={() => setOpen(false)} />
            <div
              className="fixed z-[101] w-[288px] bg-white border border-[#f0f0f0] border-solid rounded-[16px] p-[12px] shadow-[0px_8px_24px_rgba(19,19,19,0.12)]"
              style={{ top: rect.top, left: rect.left }}
            >
              <div className="content-stretch flex gap-[12px] items-start">
                <div className="flex flex-col gap-[6px] flex-[1_0_0] min-w-px">
                  <p className="font-cairo font-bold leading-[normal] text-[12px] text-[rgba(19,19,19,0.7)]">Month</p>
                  <div
                    role="listbox"
                    aria-label={`${label} month`}
                    className="max-h-[220px] overflow-y-auto rounded-[8px] border border-[#f5f5f5] border-solid"
                  >
                    {ESG_MONTHS_LONG.map((m, i) => (
                      <button
                        key={m}
                        type="button"
                        role="option"
                        aria-selected={i === value.month}
                        onClick={() => {
                          onChange({ ...value, month: i });
                          setOpen(false);
                        }}
                        className={`block w-full text-left px-[12px] py-[8px] font-cairo text-[14px] cursor-pointer hover:bg-[#f9f9f9] ${
                          i === value.month ? "bg-[rgba(40,69,157,0.08)] font-bold text-[#28459d]" : "font-semibold text-[#131313]"
                        }`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-[6px] w-[104px] shrink-0">
                  <p className="font-cairo font-bold leading-[normal] text-[12px] text-[rgba(19,19,19,0.7)]">Year</p>
                  <div
                    role="listbox"
                    aria-label={`${label} year`}
                    className="max-h-[220px] overflow-y-auto rounded-[8px] border border-[#f5f5f5] border-solid"
                  >
                    {ESG_YEARS.map((y) => (
                      <button
                        key={y}
                        type="button"
                        role="option"
                        aria-selected={y === value.year}
                        onClick={() => {
                          onChange({ ...value, year: y });
                          setOpen(false);
                        }}
                        className={`block w-full text-left px-[12px] py-[8px] font-cairo text-[14px] cursor-pointer hover:bg-[#f9f9f9] ${
                          y === value.year ? "bg-[rgba(40,69,157,0.08)] font-bold text-[#28459d]" : "font-semibold text-[#131313]"
                        }`}
                      >
                        {y}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>,
          document.body,
        )}
    </>
  );
}

type PeriodFilterProps = {
  applied: EsgPeriod;
  onApply: (p: EsgPeriod) => void;
};

/* "Filter Input Container" — the From / To month range plus the blue Apply
   control. Same shape as the Transaction screen's date filter: the two pickers
   stage a range and the round button commits it, so the report only recomputes
   once a whole range has been chosen. */
export default function PeriodFilter({ applied, onApply }: PeriodFilterProps) {
  const [from, setFrom] = useState<EsgPoint>(applied.from);
  const [to, setTo] = useState<EsgPoint>(applied.to);

  const dirty = !esgPointsEqual(from, applied.from) || !esgPointsEqual(to, applied.to);

  return (
    <div
      className="bg-white content-stretch flex flex-wrap gap-[16px] items-center p-[8px] relative rounded-[40px] shrink-0"
      data-name="Filter Input Container"
    >
      <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Date Picker Container">
        <MonthYearPicker name="From Date Picker" label="From month" value={from} onChange={setFrom} />
        <MonthYearPicker name="To Date Picker" label="To month" value={to} onChange={setTo} />
      </div>
      <button
        type="button"
        onClick={() => onApply({ from, to })}
        aria-label="Apply reporting period"
        title="Apply reporting period"
        className={`bg-[#28459d] content-stretch flex items-center justify-center p-[8px] relative rounded-[24px] shrink-0 size-[32px] cursor-pointer text-white ${
          dirty ? "" : "opacity-60"
        }`}
        data-name="Frame 188"
      >
        <EsgArrowIcon className="-scale-y-100 rotate-90 shrink-0 size-[19.2px]" />
      </button>
    </div>
  );
}
