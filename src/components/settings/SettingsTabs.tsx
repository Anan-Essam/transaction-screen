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

/* "Frame 57" — the six Settings tabs, in Figma's order. The icon callback is
   handed the shrink/colour classes and each glyph adds its own Figma size:
   10 × 10 for all of them except the bell, which is 9.167 × 10.017. */
const TABS: TabDef[] = [
  { key: "account", label: "Account Information", icon: (c) => <SetNavAccountIcon className={`${c} size-[10px]`} /> },
  { key: "sites", label: "Sites", icon: (c) => <SetNavSitesIcon className={`${c} size-[10px]`} /> },
  { key: "security", label: "Security & Access", icon: (c) => <SetNavSecurityIcon className={`${c} size-[10px]`} /> },
  { key: "users", label: "Users & Roles", icon: (c) => <SetNavUsersIcon className={`${c} size-[10px]`} /> },
  { key: "notifications", label: "Notifications", icon: (c) => <SetNavNotificationsIcon className={`${c} h-[10.017px] w-[9.167px]`} /> },
  { key: "logout", label: "Log Out", icon: (c) => <SetNavLogoutIcon className={`${c} size-[10px]`} /> },
];

type SettingsTabsProps = {
  section: SettingsSection;
  onSelect: (s: SettingsSection) => void;
  onLogout: () => void;
  role: UserRole;
};

/* "Frame 2085664004" — the Settings tab rail, shared by all five Settings
   screens. Figma stacks the tabs vertically down a 172px white card (16px
   padding, 24px radius) that stretches to the height of the content beside it.
   Each tab is 38px tall (8px padding around a 22px line) with a 10px icon and
   an 8px gap; they sit 16px apart. Only the active tab is painted — a #1b9e74
   pill that fills the card's 140px content width, with its label in Cairo Bold
   12 white. The rest hug their own content in Cairo Regular 12 #131313.

   Below `lg` the rail spans the full width and sits above the content, so the
   tabs keep their vertical reading order on narrow screens. */
export default function SettingsTabs({ section, onSelect, onLogout, role }: SettingsTabsProps) {
  /* Users & Roles is Admin-only — a regular user never even sees the tab */
  const tabs = TABS.filter((t) => (t.key === "users" ? role === "admin" : true));

  return (
    <div
      className="content-stretch flex flex-col items-start justify-center relative shrink-0 w-full lg:w-[172px]"
      data-name="Frame 2085664004"
    >
      {/* the card only stretches once the rail sits beside the content — below
          `lg` its height comes from the tabs themselves */}
      <div
        className="bg-white content-stretch flex flex-col items-start lg:flex-[1_0_0] lg:min-h-px p-[16px] relative rounded-[24px] w-full"
        data-name="Frame 238"
      >
        <div className="content-stretch flex flex-col items-start lg:flex-[1_0_0] lg:min-h-px overflow-clip relative w-full" data-name="Frame 20">
          <nav
            className="content-stretch flex flex-col gap-[16px] items-start justify-center relative shrink-0 w-full"
            aria-label="Settings sections"
            data-name="Frame 57"
          >
            {tabs.map((tab) => {
              const active = tab.key === section;
              return (
                <button
                  key={tab.key}
                  type="button"
                  data-name={active ? "Frame 48" : "Frame 57"}
                  onClick={() => (tab.key === "logout" ? onLogout() : onSelect(tab.key as SettingsSection))}
                  aria-current={active ? "page" : undefined}
                  className={`content-stretch cursor-pointer flex gap-[8px] items-center max-w-full min-w-0 p-[8px] relative shrink-0 ${
                    active ? "bg-[#1b9e74] rounded-[24px] w-full" : ""
                  }`}
                >
                  {tab.icon(`shrink-0 ${active ? "text-white" : "text-[#131313]"}`)}
                  <div
                    className={`[word-break:break-word] flex flex-col font-cairo ${
                      active ? "font-bold text-white" : "font-normal text-[#131313]"
                    } justify-center leading-[0] min-w-0 not-italic relative text-[12px] text-left`}
                  >
                    <p className="leading-[22px] overflow-hidden text-ellipsis whitespace-nowrap">{tab.label}</p>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
}
