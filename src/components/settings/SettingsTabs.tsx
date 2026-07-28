import type { ReactNode } from "react";
import {
  SetNavAccountIcon,
  SetNavSitesIcon,
  SetNavSecurityIcon,
  SetNavUsersIcon,
  SetNavNotificationsIcon,
  SetNavLogoutIcon,
} from "../settingsIcons";
import type { UserRole } from "../../settingsData";

export type SettingsSection = "account" | "sites" | "security" | "users" | "notifications";

type TabDef = { key: SettingsSection | "logout"; label: string; icon: (className: string) => ReactNode };

/* "Metrics Row" — the six Settings tabs, in Figma's order */
const TABS: TabDef[] = [
  { key: "account", label: "Account Information", icon: (c) => <SetNavAccountIcon className={c} /> },
  { key: "sites", label: "Sites", icon: (c) => <SetNavSitesIcon className={c} /> },
  { key: "security", label: "Security & Access", icon: (c) => <SetNavSecurityIcon className={c} /> },
  { key: "users", label: "Users & Roles", icon: (c) => <SetNavUsersIcon className={c} /> },
  { key: "notifications", label: "Notifications", icon: (c) => <SetNavNotificationsIcon className={c} /> },
  { key: "logout", label: "Log Out", icon: (c) => <SetNavLogoutIcon className={c} /> },
];

type SettingsTabsProps = {
  section: SettingsSection;
  onSelect: (s: SettingsSection) => void;
  onLogout: () => void;
  role: UserRole;
};

/* "Frame 238" — the Settings tab bar, shared by all five Settings screens.
   Figma: a 48px white bar (8px padding, 32px radius) holding one 32px-tall
   row of equal-width tabs separated by 14px. The active tab is a #28459d
   pill (16/8 padding, 24px radius, 4px gap, Cairo Bold 14 white); the rest
   sit flat (8/4 padding, 8px gap, Cairo Regular 14 #131313). Both carry a
   12px icon.

   The columns are an explicit equal-width grid rather than flex, so the
   active tab's larger horizontal padding cannot make it wider than its
   siblings — Figma lays all six out at the same width. */
export default function SettingsTabs({ section, onSelect, onLogout, role }: SettingsTabsProps) {
  /* Users & Roles is Admin-only — a regular user never even sees the tab */
  const tabs = TABS.filter((t) => (t.key === "users" ? role === "admin" : true));

  return (
    <div className="bg-white content-stretch flex items-start p-[8px] relative rounded-[32px] shrink-0 w-full" data-name="Frame 238">
      <nav
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-[repeat(var(--tab-count),minmax(0,1fr))] gap-[14px] items-center relative w-full"
        style={{ ["--tab-count" as string]: tabs.length }}
        aria-label="Settings sections"
        data-name="Metrics Row"
      >
        {tabs.map((tab) => {
          const active = tab.key === section;
          return (
            <button
              key={tab.key}
              type="button"
              data-name={active ? "Metric Product" : "Tab"}
              onClick={() => (tab.key === "logout" ? onLogout() : onSelect(tab.key as SettingsSection))}
              aria-current={active ? "page" : undefined}
              className={`content-stretch cursor-pointer flex h-[32px] items-center justify-center min-w-0 relative rounded-[24px] ${
                active ? "bg-[#28459d] gap-[4px] px-[16px] py-[8px]" : "gap-[8px] px-[8px] py-[4px]"
              }`}
            >
              {tab.icon(`size-[12px] shrink-0 ${active ? "text-white" : "text-[#131313]"}`)}
              <div
                className={`[word-break:break-word] flex flex-col font-cairo ${
                  active ? "font-bold text-white" : "font-normal text-[#131313]"
                } justify-center leading-[0] min-w-0 not-italic relative text-[14px]`}
              >
                <p className="leading-[normal] overflow-hidden text-ellipsis whitespace-nowrap">{tab.label}</p>
              </div>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
