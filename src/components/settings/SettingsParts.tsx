import { useState } from "react";
import type { ReactNode } from "react";
import { SettingsEditIcon } from "../settingsIcons";
import { SearchIcon, ClearIcon } from "../icons";
import { DropdownArrowIcon } from "../icons2";

/* "Frame 233" — the white content card every Settings section sits in */
export function SettingsCard({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={`bg-white content-stretch flex flex-col items-start p-[16px] relative rounded-[24px] shrink-0 w-full ${className ?? ""}`} data-name="Frame 233">
      <div className="content-stretch flex flex-col gap-[24px] items-start justify-center relative shrink-0 w-full" data-name="Frame 20">
        {children}
      </div>
    </div>
  );
}

type CardHeaderProps = {
  icon: ReactNode;
  title: string;
  /* right-hand action — hidden entirely (not disabled) when the viewer may not use it */
  action?: ReactNode;
};

/* "Frame 247" — card title row with a hairline rule underneath */
export function SettingsCardHeader({ icon, title, action }: CardHeaderProps) {
  return (
    <div className="border-[#f5f5f5] border-b border-solid content-stretch flex items-center justify-center pb-[16px] relative shrink-0 w-full" data-name="Frame 247">
      <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center justify-between min-w-px relative" data-name="Frame 357">
        <div className="content-stretch flex gap-[5px] items-center relative shrink-0" data-name="Frame 534">
          {icon}
          <div className="[word-break:break-word] flex flex-col font-cairo font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#131313] text-[16px] whitespace-nowrap">
            <p className="leading-[normal]">{title}</p>
          </div>
        </div>
        {action}
      </div>
    </div>
  );
}

/* "Frame 535" — the blue "Edit Info" affordance in a card header */
export function EditInfoButton({ label = "Edit Info", onClick }: { label?: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="content-stretch cursor-pointer flex gap-[4px] items-center justify-end relative shrink-0"
      data-name="Frame 535"
    >
      <SettingsEditIcon className="size-[14px] shrink-0 text-[#28459d]" />
      <div className="[word-break:break-word] flex flex-col font-cairo font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#28459d] text-[12px] text-left whitespace-nowrap">
        <p className="leading-[normal]">{label}</p>
      </div>
    </button>
  );
}

/* "Frame 248" — label / value pair inside a card */
export function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="[word-break:break-word] content-stretch flex gap-[16px] font-cairo font-semibold items-start justify-between leading-[0] not-italic relative shrink-0 text-[12px] w-full">
      <div className="flex flex-col justify-center relative shrink-0 text-[#131313] whitespace-nowrap">
        <p className="leading-[normal]">{label}</p>
      </div>
      <div className="flex flex-col justify-center relative min-w-0 text-[rgba(19,19,19,0.6)] text-right">
        <p className="leading-[normal] break-words">{value}</p>
      </div>
    </div>
  );
}

/* "Frame 191" — the screen heading above the cards */
export function SettingsPageTitle({ icon, title, action }: { icon: ReactNode; title: string; action?: ReactNode }) {
  return (
    <div className="content-stretch flex gap-[16px] items-center justify-between relative shrink-0 w-full" data-name="Frame 191">
      <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Frame 550">
        {icon}
        <div className="[word-break:break-word] flex flex-col font-cairo font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#131313] text-[18px] whitespace-nowrap">
          <p className="leading-[normal]">{title}</p>
        </div>
      </div>
      {action}
    </div>
  );
}

type SearchFilterBarProps = {
  search: string;
  onSearch: (v: string) => void;
  placeholder?: string;
  filterIcon?: ReactNode;
  filterValue: string;
  filterOptions: string[];
  onFilter: (v: string) => void;
  filterLabel: string;
};

/* "Frame 145" — search box + filter select above a Settings list */
export function SettingsSearchBar({
  search,
  onSearch,
  placeholder = "Search Here",
  filterIcon,
  filterValue,
  filterOptions,
  onFilter,
  filterLabel,
}: SearchFilterBarProps) {
  const [open, setOpen] = useState(false);
  return (
    <div className="content-stretch flex items-center p-[8px] relative rounded-[40px] shrink-0 w-full" data-name="Frame 145">
      <div className="content-stretch flex flex-col md:flex-row flex-[1_0_0] gap-[16px] items-stretch md:items-center min-w-px relative">
        <div className="bg-white border border-[#f0f0f0] border-solid content-stretch flex md:flex-[1_0_0] h-[40px] items-center justify-between min-w-px px-[16px] py-[11px] relative rounded-[24px]">
          <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-w-px relative">
            <SearchIcon />
            <input
              type="text"
              value={search}
              onChange={(e) => onSearch(e.target.value)}
              placeholder={placeholder}
              aria-label={placeholder}
              className="[word-break:break-word] bg-transparent border-none outline-none font-cairo font-normal leading-[18px] relative flex-[1_0_0] min-w-px text-[#131313] text-[14px] placeholder:text-[rgba(19,19,19,0.7)]"
            />
          </div>
          <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Right Icons">
            <button type="button" onClick={() => onSearch("")} className="cursor-pointer" aria-label="Clear search">
              <ClearIcon />
            </button>
          </div>
        </div>
        <div className="relative shrink-0 md:w-[192px]">
          <button
            type="button"
            aria-haspopup="listbox"
            aria-expanded={open}
            aria-label={filterLabel}
            onClick={() => setOpen((o) => !o)}
            className="bg-white border border-[#f0f0f0] border-solid content-stretch flex h-[40px] items-center justify-between px-[16px] py-[11px] relative rounded-[24px] shrink-0 w-full md:w-[192px] cursor-pointer"
          >
            <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
              {filterIcon}
              <div className="[word-break:break-word] flex flex-col font-cairo font-normal justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(19,19,19,0.7)] whitespace-nowrap">
                <p className="leading-[18px]">{filterValue}</p>
              </div>
            </div>
            <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Right Icons">
              <DropdownArrowIcon />
            </div>
          </button>
          {open && (
            <>
              {/* click-away backdrop — no document-level listeners */}
              <div className="fixed inset-0 z-10 cursor-default" aria-hidden onClick={() => setOpen(false)} />
              <div
                role="listbox"
                aria-label={filterLabel}
                className="absolute left-0 right-0 top-[44px] z-20 bg-white border border-[#f5f5f5] border-solid rounded-[8px] overflow-hidden overflow-y-auto max-h-[240px] shadow-[0px_4px_16px_rgba(19,19,19,0.08)]"
              >
                {filterOptions.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    role="option"
                    aria-selected={opt === filterValue}
                    onClick={() => {
                      onFilter(opt);
                      setOpen(false);
                    }}
                    className="block w-full text-left px-[16px] py-[10px] font-cairo font-semibold text-[14px] text-[#131313] cursor-pointer hover:bg-[#f9f9f9]"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* "Frame 131" — the primary pill button used for the screen-level actions */
export function SettingsPrimaryButton({ label, icon, onClick, variant = "blue" }: { label: string; icon?: ReactNode; onClick: () => void; variant?: "blue" | "green" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${variant === "green" ? "bg-[#1b9e74]" : "bg-[#28459d]"} content-stretch flex gap-[8px] h-[40px] items-center justify-center px-[16px] relative rounded-[24px] shrink-0 cursor-pointer`}
      data-name="Frame 131"
    >
      {icon}
      <div className="[word-break:break-word] flex flex-col font-cairo font-bold justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap">
        <p className="leading-[normal]">{label}</p>
      </div>
    </button>
  );
}

/* "Frame 35" / "Frame 307" — the shared Settings data table */
export function SettingsTable({
  columns,
  rows,
  ariaLabel,
}: {
  columns: { key: string; label: string; className?: string }[];
  rows: { id: string; cells: Record<string, ReactNode> }[];
  ariaLabel: string;
}) {
  return (
    <div className="w-full overflow-x-auto" data-name="Frame 38">
      <table className="w-full min-w-[720px] border-collapse" aria-label={ariaLabel}>
        <thead>
          <tr className="border-[#f5f5f5] border-b border-solid">
            {columns.map((c) => (
              <th
                key={c.key}
                scope="col"
                className={`font-cairo font-medium text-[14px] text-[rgba(19,19,19,0.7)] text-left px-[8px] pb-[16px] whitespace-nowrap ${c.className ?? ""}`}
              >
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id} className="border-[#f5f5f5] border-b border-solid last:border-b-0" data-name="Frame 307">
              {columns.map((c) => (
                <td key={c.key} className={`font-cairo font-semibold text-[14px] text-[#131313] px-[8px] py-[11px] align-middle ${c.className ?? ""}`}>
                  {r.cells[c.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
