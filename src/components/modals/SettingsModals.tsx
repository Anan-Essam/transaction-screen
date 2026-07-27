import { useState } from "react";
import { createPortal } from "react-dom";
import type { ReactNode } from "react";
import authFlagBase from "../../assets/figma/authFlagBase.svg";
import authFlagV1 from "../../assets/figma/authFlagV1.svg";
import authFlagV2 from "../../assets/figma/authFlagV2.svg";
import authFlagV3 from "../../assets/figma/authFlagV3.svg";
import authDropMask from "../../assets/figma/authDropMask.svg";
import authDropFill from "../../assets/figma/authDropFill.svg";
import mapPreview from "../../assets/settings/mapPreview.jpg";
import logoutIllustration from "../../assets/settings/logoutIllustration.png";
import resetSuccessBadge from "../../assets/settings/resetSuccessBadge.png";
import { SelectField, TextField, ModalFooter } from "./ModalParts";
import { MoneyWithdrawalIcon, CopyLink, CloseX20Button } from "../icons2";
import { SearchIcon, CalendarIcon } from "../icons";
import PasswordField from "../settings/PasswordField";
import {
  COUNTRY_OPTIONS,
  CITY_OPTIONS,
  EMPLOYEE_RANGE_OPTIONS,
  INDUSTRY_OPTIONS,
  WEEK_DAYS,
  TEAM_ROLES,
  PASSWORD_RULES,
} from "../../settingsData";
import type { CompanyInfo, UserInfo, Site, TeamRole, TeamMember } from "../../settingsData";

/* --------------------------------------------------------------------------
   Shell — every Settings popup is portalled to <body> so no ancestor's
   overflow can clip it, and it floats above the whole app.
-------------------------------------------------------------------------- */
function SettingsModalShell({ width, children, onClose }: { width: number; children: ReactNode; onClose: () => void }) {
  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[rgba(19,19,19,0.4)] p-[16px] overflow-y-auto"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        className="bg-white max-h-[calc(100vh-32px)] overflow-y-auto p-[16px] relative rounded-[24px] w-full z-[101]"
        style={{ maxWidth: width }}
      >
        <div className="content-stretch flex flex-col gap-[24px] items-start relative w-full" data-name="Frame 20">
          {children}
        </div>
      </div>
    </div>,
    document.body,
  );
}

/* "Frame 254" — popup title bar */
function SettingsModalHeader({ title, onClose, icon = true, copyLink }: { title: string; onClose: () => void; icon?: boolean; copyLink?: boolean }) {
  return (
    <div className="border-[#f5f5f5] border-b border-solid content-stretch flex gap-[8px] items-center pb-[16px] relative shrink-0 w-full" data-name="Frame 254">
      {icon && <MoneyWithdrawalIcon />}
      <div className="content-stretch flex flex-[1_0_0] gap-[16px] items-center justify-between min-w-px relative" data-name="Frame 149">
        <div className="[word-break:break-word] flex flex-col font-cairo font-bold justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-[rgba(19,19,19,0.7)] whitespace-nowrap">
          <p className="leading-[normal]">{title}</p>
        </div>
        <div className="content-stretch flex gap-[24px] items-center justify-end relative shrink-0">
          {copyLink && <CopyLink />}
          <CloseX20Button onClick={onClose} />
        </div>
      </div>
    </div>
  );
}

/* "Input/egypt" — the flag composite reused from the auth flow */
function EgyptFlag() {
  return (
    <div className="overflow-clip relative shrink-0 size-[20px]" data-name="Input/egypt">
      <img alt="" className="absolute block inset-0 max-w-none size-full" src={authFlagBase} />
      <div className="absolute inset-[0_3.11%_67.39%_3.11%]">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={authFlagV1} />
      </div>
      <div className="absolute inset-[67.39%_3.11%_0_3.11%]">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={authFlagV2} />
      </div>
      <div className="absolute inset-[40.22%_32.61%_42.39%_32.61%]">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={authFlagV3} />
      </div>
    </div>
  );
}

/* Phone Number input with the country-code dropdown (backdrop open/close pattern) */
function PhoneField({ label = "Phone Number", value, onChange, required = true }: { label?: string; value: string; onChange: (v: string) => void; required?: boolean }) {
  const [countryOpen, setCountryOpen] = useState(false);
  return (
    <div className="flex flex-col items-start relative rounded-[2px] shrink-0 w-full" data-name=".❖ Main / Input">
      <div className="bg-white border border-[#ccc] border-solid flex flex-col gap-[12px] h-[48px] items-start justify-center px-[16px] relative rounded-[8px] shrink-0 w-full" data-name="Input">
        <div className="h-[0.001px] relative shrink-0 w-full" data-name="Label Container">
          <div className="[word-break:break-word] absolute bg-white flex items-center left-0 not-italic px-[4px] rounded-[8px] text-left top-[-22px] whitespace-nowrap" data-name="Label">
            <div className="flex flex-col font-cairo font-semibold justify-center leading-[0] opacity-80 relative shrink-0 text-[#131313] text-[16px]">
              <p className="leading-[20px]">{label}</p>
            </div>
            {required && <p className="font-['Source_Sans_Pro',sans-serif] font-semibold leading-[16px] opacity-80 relative shrink-0 text-[#da1414] text-[11px]">*</p>}
          </div>
        </div>
        <div className="flex items-center justify-between relative shrink-0 w-full" data-name="Icons + Text">
          <div className="flex gap-[8px] items-center relative flex-1 min-w-0" data-name="Left Icon + Text">
            <div className="border-[#f5f5f5] border-r border-solid flex gap-[4px] items-center pr-[8px] relative shrink-0">
              <button
                type="button"
                onClick={() => setCountryOpen((o) => !o)}
                aria-haspopup="listbox"
                aria-expanded={countryOpen}
                aria-label="Select country code"
                className="flex gap-[4px] items-center cursor-pointer relative"
              >
                <EgyptFlag />
                <div className="relative shrink-0 size-[20px]" data-name="Navigation / arrow drop_down">
                  <div
                    className="absolute inset-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[5px_8px] mask-size-[14px_8px]"
                    style={{ maskImage: `url("${authDropMask}")` }}
                  >
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={authDropFill} />
                  </div>
                </div>
              </button>
              {countryOpen && (
                <>
                  {/* click-away backdrop — no document-level listeners */}
                  <div className="fixed inset-0 z-10" onClick={() => setCountryOpen(false)} aria-hidden="true" />
                  <div
                    role="listbox"
                    aria-label="Country code"
                    className="absolute left-0 top-[32px] z-20 bg-white border border-[#f5f5f5] rounded-[8px] shadow-[0px_4px_16px_0px_rgba(0,0,0,0.08)] py-[4px] min-w-[160px]"
                  >
                    <button
                      type="button"
                      role="option"
                      aria-selected="true"
                      onClick={() => setCountryOpen(false)}
                      className="flex gap-[8px] items-center w-full px-[12px] py-[8px] cursor-pointer hover:bg-[#f9f9f9] text-left"
                    >
                      <EgyptFlag />
                      <span className="font-cairo font-semibold text-[14px] text-[#131313] leading-[24px]">Egypt (+20)</span>
                    </button>
                  </div>
                </>
              )}
            </div>
            <div className="[word-break:break-word] flex flex-1 font-cairo font-semibold gap-[4px] items-center leading-[0] min-w-0 not-italic relative text-[14px] text-left">
              <div className="flex flex-col justify-center opacity-80 relative shrink-0 whitespace-nowrap text-[rgba(19,19,19,0.6)]">
                <p className="leading-[24px]">(+20)</p>
              </div>
              <input
                type="tel"
                inputMode="numeric"
                value={value}
                onChange={(e) => onChange(e.target.value.replace(/[^\d]/g, ""))}
                placeholder="01021587912"
                aria-label={label}
                className="flex-1 min-w-0 h-[24px] leading-[24px] bg-transparent outline-none font-cairo font-semibold text-[14px] text-[#131313] placeholder:text-[rgba(19,19,19,0.6)] placeholder:opacity-80"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Text input with a trailing icon (Location search, Working days calendar) */
function IconField({
  label,
  value,
  onChange,
  placeholder,
  required,
  icon,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  required?: boolean;
  icon: ReactNode;
}) {
  return (
    <div className="content-stretch flex flex-col items-start relative rounded-[2px] shrink-0 w-full" data-name=".❖ Main / Input">
      <div className="bg-white border border-[#ccc] border-solid content-stretch flex flex-col h-[48px] items-start justify-center px-[16px] relative rounded-[8px] shrink-0 w-full" data-name="Input">
        <div className="h-[0.001px] relative shrink-0 w-full" data-name="Label Container">
          <div className="[word-break:break-word] absolute bg-white content-stretch flex items-center left-0 not-italic px-[4px] rounded-[8px] text-left top-[-22px] whitespace-nowrap" data-name="Label">
            <div className="flex flex-col font-cairo font-semibold justify-center leading-[0] opacity-80 relative shrink-0 text-[#131313] text-[16px]">
              <p className="leading-[20px]">{label}</p>
            </div>
            {required && <p className="font-['Source_Sans_Pro',sans-serif] font-semibold leading-[16px] opacity-80 relative shrink-0 text-[#da1414] text-[11px]">*</p>}
          </div>
        </div>
        <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            aria-label={label}
            className="[word-break:break-word] flex-[1_0_0] min-w-px bg-transparent border-none outline-none font-cairo font-semibold leading-[24px] opacity-80 text-[14px] text-[#131313] placeholder:text-[rgba(19,19,19,0.6)]"
          />
          <div className="shrink-0">{icon}</div>
        </div>
      </div>
    </div>
  );
}

/* Working-days select — same open/close pattern as every other dropdown, but the
   Figma field carries a calendar affordance instead of the chevron. */
function DaySelectField({ label, value, placeholder, onSelect }: { label: string; value: string; placeholder: string; onSelect: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative w-full">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={label}
        onClick={() => setOpen((o) => !o)}
        className="content-stretch cursor-pointer flex flex-col items-start relative shrink-0 w-full"
      >
        <div className="bg-white border border-[#ccc] border-solid content-stretch flex flex-col h-[48px] items-start justify-center px-[16px] relative rounded-[8px] shrink-0 w-full" data-name="Input">
          <div className="h-[0.001px] relative shrink-0 w-full" data-name="Label Container">
            <div className="[word-break:break-word] absolute bg-white content-stretch flex items-center left-0 not-italic px-[4px] rounded-[8px] text-left top-[-22px] whitespace-nowrap" data-name="Label">
              <div className="flex flex-col font-cairo font-semibold justify-center leading-[0] opacity-80 relative shrink-0 text-[#131313] text-[16px]">
                <p className="leading-[20px]">{label}</p>
              </div>
              <p className="font-['Source_Sans_Pro',sans-serif] font-semibold leading-[16px] opacity-80 relative shrink-0 text-[#da1414] text-[11px]">*</p>
            </div>
          </div>
          <div className="content-stretch flex gap-[8px] items-center justify-between relative shrink-0 w-full">
            <div className={`[word-break:break-word] font-cairo font-semibold leading-[24px] opacity-80 text-[14px] text-left ${value ? "text-[#131313]" : "text-[rgba(19,19,19,0.6)]"}`}>
              {value || placeholder}
            </div>
            <CalendarIcon />
          </div>
        </div>
      </button>
      {open && (
        <>
          {/* click-away backdrop — no document-level listeners */}
          <div className="fixed inset-0 z-10 cursor-default" aria-hidden onClick={() => setOpen(false)} />
          <div
            role="listbox"
            aria-label={label}
            className="absolute left-0 right-0 top-[52px] z-20 bg-white border border-[#f5f5f5] border-solid rounded-[8px] overflow-hidden overflow-y-auto max-h-[240px] shadow-[0px_4px_16px_rgba(19,19,19,0.08)]"
          >
            {WEEK_DAYS.map((d) => (
              <button
                key={d}
                type="button"
                role="option"
                aria-selected={d === value}
                onClick={() => {
                  onSelect(d);
                  setOpen(false);
                }}
                className="block w-full text-left px-[16px] py-[10px] font-cairo font-semibold text-[14px] text-[#131313] cursor-pointer hover:bg-[#f9f9f9]"
              >
                {d}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

/* "Frame 417" — the radio control used by Status / permanence */
function RadioOption({ label, checked, onSelect, name }: { label: string; checked: boolean; onSelect: () => void; name: string }) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={checked}
      aria-label={`${name}: ${label}`}
      onClick={onSelect}
      className="content-stretch flex gap-[8px] items-center relative shrink-0 cursor-pointer"
      data-name="Frame 319"
    >
      <span className={`flex items-center justify-center rounded-full size-[16px] shrink-0 border-2 border-solid ${checked ? "border-[#1b9e74]" : "border-[#d9d9d9]"}`}>
        {checked && <span className="bg-[#1b9e74] rounded-full size-[8px]" />}
      </span>
      <span className="font-cairo font-semibold text-[14px] text-[#131313] leading-[22px] whitespace-nowrap">{label}</span>
    </button>
  );
}

/* --------------------------------------------------------------------------
   Edit Info — Company (Figma 506:13510). Admin only.
-------------------------------------------------------------------------- */
export function EditCompanyInfoModal({ company, onClose, onSubmit }: { company: CompanyInfo; onClose: () => void; onSubmit: (c: CompanyInfo) => void }) {
  const [name, setName] = useState(company.name);
  const [email, setEmail] = useState(company.businessEmail);
  const [phone, setPhone] = useState(company.phone.replace(/\D/g, ""));
  const [country, setCountry] = useState(company.country);
  const [city, setCity] = useState(company.city);
  const [employees, setEmployees] = useState(company.employees);
  const [industry, setIndustry] = useState(company.industry);

  return (
    <SettingsModalShell width={702} onClose={onClose}>
      <SettingsModalHeader title="Company Information" onClose={onClose} />
      <div className="content-stretch flex flex-col gap-[32px] items-start pt-[10px] relative shrink-0 w-full">
        <TextField label="Company Name" placeholder="Enter company name" value={name} onChange={setName} />
        <TextField label="Business Email" placeholder="Enter business email" value={email} onChange={setEmail} />
        <PhoneField value={phone} onChange={setPhone} />
        <div className="content-stretch flex flex-col sm:flex-row gap-[32px] sm:gap-[16px] items-start relative shrink-0 w-full">
          <div className="flex-[1_0_0] min-w-px w-full">
            <SelectField
              label="Country"
              placeholder="Select country"
              value={country}
              options={COUNTRY_OPTIONS}
              labelBackground="white"
              onSelect={(v) => {
                setCountry(v);
                setCity(CITY_OPTIONS[v]?.[0] ?? "");
              }}
            />
          </div>
          <div className="flex-[1_0_0] min-w-px w-full">
            <SelectField label="City" placeholder="Select city" value={city} options={CITY_OPTIONS[country] ?? []} labelBackground="white" onSelect={setCity} />
          </div>
        </div>
        <SelectField
          label="Number of Employees"
          placeholder="Select a range"
          value={employees}
          options={EMPLOYEE_RANGE_OPTIONS}
          labelBackground="white"
          onSelect={setEmployees}
        />
        <SelectField
          label="Company Category / Industry"
          placeholder="Select your industry"
          value={industry}
          options={INDUSTRY_OPTIONS}
          labelBackground="white"
          onSelect={setIndustry}
        />
      </div>
      <ModalFooter
        cancelLabel="Cancel"
        submitLabel="Confirm"
        onCancel={onClose}
        submitDisabled={!name.trim() || !email.trim()}
        onSubmit={() =>
          onSubmit({
            ...company,
            name: name.trim(),
            businessEmail: email.trim(),
            phone: `(+20) ${phone}`,
            country,
            city,
            employees,
            industry,
          })
        }
      />
    </SettingsModalShell>
  );
}

/* --------------------------------------------------------------------------
   Edit Info — User (Figma 506:13566). Available to both roles.
-------------------------------------------------------------------------- */
export function EditUserInfoModal({ user, onClose, onSubmit }: { user: UserInfo; onClose: () => void; onSubmit: (u: UserInfo) => void }) {
  const [fullName, setFullName] = useState(user.fullName);
  const [jobTitle, setJobTitle] = useState(user.jobTitle);
  const [nationalId, setNationalId] = useState(user.nationalId);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone.replace(/\D/g, ""));

  return (
    <SettingsModalShell width={702} onClose={onClose}>
      <SettingsModalHeader title="User Information" onClose={onClose} />
      <div className="content-stretch flex flex-col gap-[32px] items-start pt-[10px] relative shrink-0 w-full">
        <TextField label="Full Name" placeholder="Enter your full name" value={fullName} onChange={setFullName} />
        <TextField label="Job Title / Role" placeholder="Enter your job title" value={jobTitle} onChange={setJobTitle} />
        <TextField label="National ID or Passport Number" placeholder="Enter your ID number" value={nationalId} onChange={setNationalId} />
        <TextField label="Business Email" placeholder="Enter business email" value={email} onChange={setEmail} />
        <PhoneField value={phone} onChange={setPhone} />
      </div>
      <ModalFooter
        cancelLabel="Cancel"
        submitLabel="Confirm"
        onCancel={onClose}
        submitDisabled={!fullName.trim()}
        onSubmit={() =>
          onSubmit({
            fullName: fullName.trim(),
            jobTitle: jobTitle.trim(),
            nationalId: nationalId.trim(),
            email: email.trim(),
            phone: `(+20) ${phone}`,
          })
        }
      />
    </SettingsModalShell>
  );
}

/* --------------------------------------------------------------------------
   Add New Site (Figma 572:16590) — the same form creates and edits; passing
   `initial` pre-fills every field and switches the submit label to Save.
-------------------------------------------------------------------------- */
export function AddNewSiteModal({ initial, onClose, onSubmit }: { initial?: Site; onClose: () => void; onSubmit: (s: Omit<Site, "id">) => void }) {
  const [status, setStatus] = useState<Site["status"]>(initial?.status ?? "Active");
  const [permanence, setPermanence] = useState<Site["permanence"]>(initial?.permanence ?? "permanent site");
  const [name, setName] = useState(initial?.name ?? "");
  const [location, setLocation] = useState(initial?.location ?? "");
  const [from, setFrom] = useState(initial?.workingFrom ?? "");
  const [to, setTo] = useState(initial?.workingTo ?? "");
  const [contactName, setContactName] = useState(initial?.contactName ?? "");
  const [position, setPosition] = useState(initial?.contactPosition ?? "");
  const [phone, setPhone] = useState((initial?.contactPhone ?? "").replace(/\D/g, ""));

  const submit = () =>
    onSubmit({
      name: name.trim(),
      /* the region caption under the site name mirrors the first two parts of the location */
      region: location.split(",")[0].trim(),
      permanence,
      status,
      location: location.trim(),
      workingFrom: from,
      workingTo: to,
      contactName: contactName.trim() || undefined,
      contactPosition: position.trim() || undefined,
      contactPhone: phone ? phone : undefined,
    });

  return (
    <SettingsModalShell width={702} onClose={onClose}>
      <SettingsModalHeader title={initial ? "Edit Site" : "Add New Site"} onClose={onClose} copyLink />

      <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Frame 498">
        <div className="content-stretch flex flex-wrap gap-[16px] items-center justify-between relative shrink-0 w-full" data-name="Frame 327">
          <div className="font-cairo font-semibold text-[14px] text-[#131313] leading-[20px]">Status</div>
          <div className="content-stretch flex gap-[24px] items-center relative shrink-0" role="radiogroup" aria-label="Status">
            <RadioOption name="Status" label="Active" checked={status === "Active"} onSelect={() => setStatus("Active")} />
            <RadioOption name="Status" label="Inactive" checked={status === "Inactive"} onSelect={() => setStatus("Inactive")} />
          </div>
        </div>
        <div className="content-stretch flex flex-wrap gap-[16px] items-center justify-between relative shrink-0 w-full" data-name="Frame 369">
          <div className="font-cairo font-semibold text-[14px] text-[#131313] leading-[20px]">Is this site permanent or temporary?</div>
          <div className="content-stretch flex gap-[24px] items-center relative shrink-0" role="radiogroup" aria-label="Site permanence">
            <RadioOption name="Permanence" label="permanent site" checked={permanence === "permanent site"} onSelect={() => setPermanence("permanent site")} />
            <RadioOption name="Permanence" label="temporary Site" checked={permanence === "temporary Site"} onSelect={() => setPermanence("temporary Site")} />
          </div>
        </div>
      </div>

      <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-full" data-name="Frame 496">
        <div className="font-cairo font-bold text-[16px] text-[#131313] leading-[26px]">Site Information</div>
        <TextField label="Site Name" placeholder="Cairo Recycling Hub" value={name} onChange={setName} />
        <IconField label="Location (City / Country)" placeholder="Cairo, Egypt" value={location} onChange={setLocation} required icon={<SearchIcon />} />
        <div className="h-[121px] overflow-clip relative rounded-[8px] shrink-0 w-full" data-name="Frame 206">
          <img alt="" className="absolute inset-0 max-w-none object-cover size-full" src={mapPreview} />
          <div className="absolute bg-white content-stretch flex items-center left-[6px] px-[16px] py-[5px] rounded-[8px] top-[8px]" data-name="Frame 202">
            <div className="font-cairo font-bold text-[#131313] text-[16px] leading-[30px]">Map Preview</div>
          </div>
        </div>
        <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-full" data-name="Frame 497">
          <div className="font-cairo font-semibold text-[14px] text-[#131313] leading-[20px]">Working days</div>
          <div className="content-stretch flex flex-col sm:flex-row gap-[32px] sm:gap-[16px] items-start relative shrink-0 w-full">
            <div className="flex-[1_0_0] min-w-px w-full">
              <DaySelectField label="Start From" placeholder="Sunday" value={from} onSelect={setFrom} />
            </div>
            <div className="flex-[1_0_0] min-w-px w-full">
              <DaySelectField label="End In" placeholder="Thursday" value={to} onSelect={setTo} />
            </div>
          </div>
        </div>
      </div>

      <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-full" data-name="Frame 495">
        <div className="font-cairo text-[16px] leading-[26px]">
          <span className="font-bold text-[#131313]">Contact Person Information </span>
          <span className="font-normal text-[rgba(19,19,19,0.6)]">(optional)</span>
        </div>
        <TextField label="Name" placeholder="Anan Essam" value={contactName} onChange={setContactName} required={false} />
        <TextField label="Position" placeholder="Site Manager" value={position} onChange={setPosition} required={false} />
        <PhoneField value={phone} onChange={setPhone} required={false} />
      </div>

      <ModalFooter cancelLabel="Cancel" submitLabel={initial ? "Save" : "Add"} onCancel={onClose} onSubmit={submit} submitDisabled={!name.trim() || !location.trim()} />
    </SettingsModalShell>
  );
}

/* --------------------------------------------------------------------------
   Add User (Figma 506:13630) — Admin only.
-------------------------------------------------------------------------- */
export function AddUserModal({
  initial,
  onClose,
  onSubmit,
}: {
  initial?: TeamMember;
  onClose: () => void;
  onSubmit: (u: { name: string; phone: string; role: TeamRole }) => void;
}) {
  const [name, setName] = useState(initial?.name ?? "");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState<TeamRole | null>(initial?.role ?? null);

  return (
    <SettingsModalShell width={702} onClose={onClose}>
      <SettingsModalHeader title={initial ? "Edit User" : "Add User"} onClose={onClose} />
      <div className="content-stretch flex flex-col gap-[32px] items-start pt-[10px] relative shrink-0 w-full">
        <TextField label="Name" placeholder="enter name" value={name} onChange={setName} />
        <PhoneField value={phone} onChange={setPhone} />
        <SelectField
          label="Role"
          placeholder="Choose Your Role"
          value={role}
          options={TEAM_ROLES}
          labelBackground="white"
          onSelect={(v) => setRole(v as TeamRole)}
        />
      </div>
      <ModalFooter
        cancelLabel="Cancel"
        submitLabel="Confirm"
        onCancel={onClose}
        submitDisabled={!name.trim() || !role}
        onSubmit={() => role && onSubmit({ name: name.trim(), phone, role })}
      />
    </SettingsModalShell>
  );
}

/* --------------------------------------------------------------------------
   Log Out (Figma 506:13659) — confirmation before the session actually ends.
-------------------------------------------------------------------------- */
export function LogOutModal({ onClose, onConfirm }: { onClose: () => void; onConfirm: () => void }) {
  return (
    <SettingsModalShell width={406} onClose={onClose}>
      <SettingsModalHeader title="Log Out" onClose={onClose} icon={false} />
      <div className="content-stretch flex flex-col gap-[16px] items-center relative shrink-0 w-full" data-name="Frame 260">
        <img alt="" src={logoutIllustration} className="h-[96px] w-[97px] shrink-0 object-contain" />
        <div className="content-stretch flex flex-col gap-[8px] items-center relative shrink-0 w-full" data-name="Frame 420">
          <div className="font-cairo font-bold text-[#131313] text-[24px] leading-[32px] text-center w-full">Are you sure you want to log out?</div>
          <div className="font-cairo font-normal text-[rgba(19,19,19,0.6)] text-[14px] leading-[24px] text-center w-full">
            We’ll miss you! You can always come back anytime.
          </div>
        </div>
      </div>
      <div className="content-stretch flex gap-[16px] h-[48px] items-center relative shrink-0 w-full" data-name="Frame 572">
        <button
          type="button"
          onClick={onClose}
          className="bg-white border border-[#28459d] border-solid content-stretch flex flex-[1_0_0] h-[48px] items-center justify-center min-w-px px-[16px] relative rounded-[24px] cursor-pointer"
        >
          <div className="font-cairo font-bold text-[#28459d] text-[16px] leading-[30px] whitespace-nowrap">Cancel</div>
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className="bg-[#28459d] content-stretch flex flex-[1_0_0] h-[48px] items-center justify-center min-w-px px-[16px] relative rounded-[24px] cursor-pointer"
        >
          <div className="font-cairo font-bold text-white text-[16px] leading-[30px] whitespace-nowrap">confirm, Log out</div>
        </button>
      </div>
    </SettingsModalShell>
  );
}

/* --------------------------------------------------------------------------
   Change Password flow
   Forgot Password? (506:13420) -> verification code (506:13447)
   -> Reset password (506:13481) -> Password Reset Successful (506:13592)
-------------------------------------------------------------------------- */
/* "Reset password" success dialog (Figma 506:13592) — also shown after the
   inline Change Password form on Security & Access succeeds. */
export function PasswordChangedDialog({ onClose }: { onClose: () => void }) {
  return (
    <SettingsModalShell width={470} onClose={onClose}>
      <SettingsModalHeader title="Reset password" onClose={onClose} />
      <div className="content-stretch flex flex-col gap-[16px] items-center relative shrink-0 w-full">
        <img alt="" src={resetSuccessBadge} className="h-[96px] w-[91px] shrink-0 object-contain" />
        <div className="font-cairo font-bold text-[#131313] text-[20px] leading-[normal] text-center w-full">Password Reset Successful</div>
        <div className="font-cairo font-normal text-[rgba(19,19,19,0.7)] text-[14px] leading-[24px] text-center w-full">
          Your password reset was completed. Please use your new password for future logins.
        </div>
      </div>
      <button
        type="button"
        onClick={onClose}
        className="bg-[#28459d] content-stretch flex h-[48px] items-center justify-center relative rounded-[24px] shrink-0 w-full cursor-pointer"
      >
        <div className="font-cairo font-bold text-white text-[16px] leading-[30px] whitespace-nowrap">Start Now</div>
      </button>
    </SettingsModalShell>
  );
}

type ChangePasswordStep = "phone" | "otp" | "reset" | "done";

export function ChangePasswordFlow({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState<ChangePasswordStep>("phone");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);

  const heading = (title: string, subtitle: string) => (
    <div className="content-stretch flex flex-col gap-[4px] items-center relative shrink-0 w-full">
      <div className="font-cairo font-bold text-[#131313] text-[20px] leading-[normal] text-center w-full">{title}</div>
      <div className="font-cairo font-normal text-[rgba(19,19,19,0.7)] text-[14px] leading-[24px] text-center w-full">{subtitle}</div>
    </div>
  );

  const primary = (label: string, onClick: () => void, disabled?: boolean) => (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="bg-[#28459d] content-stretch flex h-[48px] items-center justify-center relative rounded-[24px] shrink-0 w-full cursor-pointer disabled:opacity-50 disabled:cursor-default"
    >
      <div className="font-cairo font-bold text-white text-[16px] leading-[30px] whitespace-nowrap">{label}</div>
    </button>
  );

  if (step === "done") return <PasswordChangedDialog onClose={onClose} />;

  if (step === "otp") {
    return (
      <SettingsModalShell width={462} onClose={onClose}>
        <SettingsModalHeader title="verification code" onClose={onClose} />
        {heading("Enter the verification code", "We’ve sent a 6-digit code to your email (e.g., ahmed***@mail.com)")}
        <div className="content-stretch flex gap-[8px] items-center justify-center relative shrink-0 w-full">
          {code.map((d, i) => (
            <input
              key={i}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={d}
              aria-label={`Verification code digit ${i + 1}`}
              onChange={(e) => {
                const v = e.target.value.replace(/\D/g, "").slice(0, 1);
                setCode((c) => c.map((x, j) => (j === i ? v : x)));
              }}
              className="bg-white border border-[#f0f0f0] border-solid h-[56px] w-[56px] max-w-[16%] rounded-[8px] text-center font-cairo font-bold text-[20px] text-[#131313] outline-none focus:border-[#28459d]"
            />
          ))}
        </div>
        <div className="content-stretch flex gap-[6px] items-center justify-center relative shrink-0 w-full">
          <span className="font-cairo font-normal text-[14px] text-[rgba(19,19,19,0.6)]">Create a Didn’t get the code?</span>
          <button type="button" onClick={() => setCode(["", "", "", "", "", ""])} className="font-cairo font-semibold text-[14px] text-[#28459d] cursor-pointer">
            [Resend OTP]
          </button>
        </div>
        {primary("Verify Code", () => setStep("reset"), code.some((d) => !d))}
      </SettingsModalShell>
    );
  }

  if (step === "reset") {
    return (
      <SettingsModalShell width={462} onClose={onClose}>
        <SettingsModalHeader title="Reset  password" onClose={onClose} />
        {heading("Reset your password", "Create a strong new password to keep your account secure.")}
        <div className="content-stretch flex flex-col gap-[32px] items-start pt-[10px] relative shrink-0 w-full">
          <PasswordField label="New Password" value={next} onChange={setNext} placeholder="Enter your Password" />
          <PasswordField label="Confirm New Password" value={confirm} onChange={setConfirm} placeholder="Enter your Password" />
        </div>
        {error && (
          <p className="font-cairo font-semibold text-[12px] text-[#da1414] w-full" role="alert">
            {error}
          </p>
        )}
        {primary("Reset Password", () => {
          if (!PASSWORD_RULES.every((r) => r.test(next))) return setError("Your new password does not meet the requirements.");
          if (next !== confirm) return setError("The two passwords do not match.");
          setError(null);
          setStep("done");
        })}
      </SettingsModalShell>
    );
  }

  return (
    <SettingsModalShell width={462} onClose={onClose}>
      <SettingsModalHeader title="Forgot Password?" onClose={onClose} />
      {heading("Forgot your password", "Enter your registered email to receive reset instructions")}
      <div className="pt-[10px] w-full">
        <PhoneField value={phone} onChange={setPhone} />
      </div>
      {primary("Send Reset Link", () => setStep("otp"), !phone)}
    </SettingsModalShell>
  );
}
