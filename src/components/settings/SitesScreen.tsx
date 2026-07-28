import { useState } from "react";
import arrowBlue from "../../assets/figma/arrowBlue.svg";
import { SettingsCard, SettingsCardHeader, SettingsSearchBar, SettingsPrimaryButton } from "./SettingsParts";
import { ActiveSessionsIcon, SetNavSitesIcon, SettingsEditIcon } from "../settingsIcons";
import type { Site } from "../../settingsData";
import { SITE_FILTER_OPTIONS } from "../../settingsData";

/* "vuesax/linear/arrow-down" in its circular chip — points up while the row is open */
function SiteChevron({ open }: { open: boolean }) {
  return (
    <div className="bg-[rgba(40,69,157,0.1)] content-stretch flex items-center justify-center p-[6px] relative rounded-[18px] shrink-0 size-[24px]">
      <img
        alt=""
        src={arrowBlue}
        className={`block size-[14.4px] max-w-none transition-transform duration-300 ${open ? "rotate-180" : ""}`}
      />
    </div>
  );
}

/* "Frame 500" — the permanent / temporary site pill */
function PermanenceBadge({ permanence }: { permanence: Site["permanence"] }) {
  return (
    <div className="bg-[#28459d] content-stretch flex gap-[8px] items-center justify-center px-[8px] py-[4px] relative rounded-[24px] shrink-0" data-name="Frame 500">
      <div className="[word-break:break-word] flex flex-col font-cairo font-bold justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-white whitespace-nowrap">
        <p className="leading-[normal]">{permanence}</p>
      </div>
    </div>
  );
}

/* "Frame 248" — one line inside the expanded site panel */
function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="content-stretch flex gap-[16px] items-start justify-between relative shrink-0 w-full" data-name="Frame 248">
      <div className="[word-break:break-word] flex flex-col font-cairo font-normal justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(19,19,19,0.6)] whitespace-nowrap">
        <p className="leading-[24px]">{label}</p>
      </div>
      <div className="[word-break:break-word] flex flex-col font-cairo font-semibold justify-center leading-[0] not-italic relative min-w-0 text-[#131313] text-[14px] text-right">
        <p className="leading-[24px] break-words">{value}</p>
      </div>
    </div>
  );
}

function DetailSection({ title, rows }: { title: string; rows: { label: string; value: string }[] }) {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Frame 20">
      <div className="[word-break:break-word] flex flex-col font-cairo font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#131313] text-[14px] whitespace-nowrap">
        <p className="leading-[18px]">{title}</p>
      </div>
      <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Frame 284">
        {rows.map((r) => (
          <DetailRow key={r.label} label={r.label} value={r.value} />
        ))}
      </div>
    </div>
  );
}

/* "Frame 508" — a site row; collapsed it shows name + region, expanded it grows
   (animated) to reveal the site + contact details. */
function SiteRow({ site, open, onToggle, onEdit }: { site: Site; open: boolean; onToggle: () => void; onEdit: () => void }) {
  const siteRows = [
    { label: "Location:", value: site.location },
    { label: "Working Days:", value: `${site.workingFrom} - ${site.workingTo}` },
  ];
  const contactRows = [
    ...(site.contactName ? [{ label: "Name:", value: site.contactName }] : []),
    ...(site.contactPosition ? [{ label: "Position:", value: site.contactPosition }] : []),
    ...(site.contactPhone ? [{ label: "Phone Number:", value: site.contactPhone }] : []),
  ];

  return (
    <div
      className={`content-stretch flex flex-col items-start px-[12px] py-[8px] relative rounded-[16px] shrink-0 w-full border border-solid transition-colors duration-200 ${
        open ? "border-[#28459d] bg-[rgba(40,69,157,0.02)]" : "border-[#f0f0f0] bg-white"
      }`}
      data-name="Frame 508"
    >
      <div className="content-stretch flex flex-col gap-[0px] items-start relative shrink-0 w-full">
        <div className="content-stretch flex gap-[16px] items-center justify-between relative shrink-0 w-full" data-name="Frame 506">
          <div className="content-stretch flex flex-[1_0_0] gap-[12px] items-center min-w-px relative">
            <div className="flex flex-col font-cairo font-bold justify-center leading-[0] not-italic min-w-0 relative text-[#131313] text-[16px]">
              <p className="leading-[normal] overflow-hidden text-ellipsis whitespace-nowrap">{site.name}</p>
            </div>
            {open && <PermanenceBadge permanence={site.permanence} />}
          </div>
          <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Frame 2085664032">
            <button type="button" onClick={onEdit} className="content-stretch cursor-pointer flex gap-[4px] items-center relative shrink-0" aria-label={`Edit ${site.name}`}>
              <SettingsEditIcon className="size-[14px] shrink-0 text-[#28459d]" />
              <div className="[word-break:break-word] flex flex-col font-cairo font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#28459d] text-[12px] whitespace-nowrap">
                <p className="leading-[normal]">Edit</p>
              </div>
            </button>
            <button
              type="button"
              onClick={onToggle}
              className="cursor-pointer shrink-0"
              aria-expanded={open}
              aria-label={open ? `Collapse ${site.name}` : `Expand ${site.name}`}
            >
              <SiteChevron open={open} />
            </button>
          </div>
        </div>
        <div className="[word-break:break-word] flex flex-col font-cairo font-semibold justify-center leading-[0] not-italic opacity-80 relative shrink-0 text-[14px] text-[rgba(19,19,19,0.7)] w-full">
          <p className="leading-[20px]">{site.region}</p>
        </div>
      </div>

      {/* animated reveal — grid-rows 0fr -> 1fr keeps the transition height-agnostic */}
      <div className={`grid w-full transition-[grid-template-rows] duration-300 ease-in-out ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
        <div className="overflow-hidden" data-name="Site Detail Clip">
          <div className="bg-white border border-[#f0f0f0] border-solid content-stretch flex flex-col gap-[16px] items-start mt-[12px] p-[12px] relative rounded-[8px] shrink-0 w-full" data-name="Frame 522">
            <DetailSection title="Site Information" rows={siteRows} />
            {contactRows.length > 0 && <DetailSection title="Contact Person" rows={contactRows} />}
          </div>
        </div>
      </div>
    </div>
  );
}

type SitesScreenProps = {
  sites: Site[];
  onAddSite: () => void;
  onEditSite: (site: Site) => void;
};

/* "Sites" (Figma 566:15190) */
export default function SitesScreen({ sites, onAddSite, onEditSite }: SitesScreenProps) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState(SITE_FILTER_OPTIONS[0]);
  const [openId, setOpenId] = useState<string | null>(sites[0]?.id ?? null);

  const q = search.trim().toLowerCase();
  const visible = sites.filter((s) => {
    if (filter !== SITE_FILTER_OPTIONS[0] && s.permanence !== filter) return false;
    if (q && !s.name.toLowerCase().includes(q) && !s.region.toLowerCase().includes(q) && !s.location.toLowerCase().includes(q)) return false;
    return true;
  });

  return (
    <SettingsCard>
      <SettingsCardHeader
        icon={<ActiveSessionsIcon className="size-[14px] shrink-0 text-[#131313]" />}
        title="Active Sessions"
        action={<SettingsPrimaryButton label={"+  Add New Site"} variant="green" height={40} onClick={onAddSite} />}
      />
      <SettingsSearchBar
        search={search}
        onSearch={setSearch}
        filterIcon={<SetNavSitesIcon className="size-[12px] shrink-0 text-[rgba(19,19,19,0.7)]" />}
        filterValue={filter}
        filterOptions={SITE_FILTER_OPTIONS}
        onFilter={setFilter}
        filterLabel="Filter sites"
      />
      <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Frame 480">
        {visible.length === 0 ? (
          <div className="font-cairo font-medium text-[14px] text-[rgba(19,19,19,0.6)] py-[24px] w-full text-center">No sites match your search.</div>
        ) : (
          visible.map((site) => (
            <SiteRow
              key={site.id}
              site={site}
              open={openId === site.id}
              onToggle={() => setOpenId((id) => (id === site.id ? null : site.id))}
              onEdit={() => onEditSite(site)}
            />
          ))
        )}
      </div>
    </SettingsCard>
  );
}
