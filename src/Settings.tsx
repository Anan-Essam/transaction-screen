import type { ReactNode } from "react";
import SideBar from "./components/SideBar";
import type { SideBarPage } from "./components/SideBar";
import { UserProfile, TopBar } from "./MoneyTransactions";
import AccountInformation from "./components/settings/AccountInformation";
import SitesScreen from "./components/settings/SitesScreen";
import SecurityAccess from "./components/settings/SecurityAccess";
import UsersRoles from "./components/settings/UsersRoles";
import NotificationPreferences from "./components/settings/NotificationPreferences";
import {
  SetNavAccountIcon,
  SetNavSitesIcon,
  SetNavSecurityIcon,
  SetNavUsersIcon,
  SetNavNotificationsIcon,
  SetNavLogoutIcon,
} from "./components/settingsIcons";
import type {
  ActiveSession,
  NotificationChannel,
  NotificationGroup,
  CompanyInfo,
  KycDocument,
  LoginHistoryEntry,
  SecurityPreferences,
  Site,
  TeamMember,
  UserInfo,
  UserRole,
} from "./settingsData";

export type SettingsSection = "account" | "sites" | "security" | "users" | "notifications";

type NavItem = { key: SettingsSection; label: string; icon: (className: string) => ReactNode };

const NAV_ITEMS: NavItem[] = [
  { key: "account", label: "Account Information", icon: (c) => <SetNavAccountIcon className={c} /> },
  { key: "sites", label: "Sites", icon: (c) => <SetNavSitesIcon className={c} /> },
  { key: "security", label: "Security & Access", icon: (c) => <SetNavSecurityIcon className={c} /> },
  { key: "users", label: "Users & Roles", icon: (c) => <SetNavUsersIcon className={c} /> },
  { key: "notifications", label: "Notifications", icon: (c) => <SetNavNotificationsIcon className={c} /> },
];

/* "Frame 238" — the Settings tab bar. Figma moved the sub-navigation from a
   left rail to a horizontal bar above the content, with a blue active pill. */
function SettingsTabs({
  section,
  onSelect,
  onLogout,
  role,
}: {
  section: SettingsSection;
  onSelect: (s: SettingsSection) => void;
  onLogout: () => void;
  role: UserRole;
}) {
  /* Users & Roles is an Admin-only screen — a regular user never even sees the tab */
  const items = NAV_ITEMS.filter((i) => (i.key === "users" ? role === "admin" : true));

  return (
    <div className="bg-white content-stretch flex items-start p-[8px] relative rounded-[32px] shrink-0 w-full" data-name="Frame 238">
      <nav
        className="content-stretch flex flex-[1_0_0] flex-wrap gap-[14px] items-center min-w-px relative"
        aria-label="Settings sections"
        data-name="Metrics Row"
      >
        {items.map((item) => {
          const active = item.key === section;
          return (
            <button
              key={item.key}
              type="button"
              onClick={() => onSelect(item.key)}
              aria-current={active ? "page" : undefined}
              className={`content-stretch cursor-pointer flex flex-[1_0_0] h-[32px] items-center justify-center min-w-[140px] relative ${
                active ? "bg-[#28459d] gap-[4px] px-[16px] py-[8px] rounded-[24px]" : "gap-[8px] px-[8px] py-[4px]"
              }`}
            >
              {item.icon(`size-[12px] shrink-0 ${active ? "text-white" : "text-[#131313]"}`)}
              <div
                className={`[word-break:break-word] flex flex-col font-cairo ${active ? "font-bold text-white" : "font-normal text-[#131313]"} justify-center leading-[0] not-italic relative shrink-0 text-[14px] whitespace-nowrap`}
              >
                <p className="leading-[normal]">{item.label}</p>
              </div>
            </button>
          );
        })}
        <button
          type="button"
          onClick={onLogout}
          className="content-stretch cursor-pointer flex flex-[1_0_0] gap-[8px] h-[32px] items-center justify-center min-w-[140px] px-[8px] py-[4px] relative"
        >
          <SetNavLogoutIcon className="size-[12px] shrink-0 text-[#131313]" />
          <div className="[word-break:break-word] flex flex-col font-cairo font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#131313] text-[14px] whitespace-nowrap">
            <p className="leading-[normal]">Log Out</p>
          </div>
        </button>
      </nav>
    </div>
  );
}

export type SettingsProps = {
  role: UserRole;
  section: SettingsSection;
  onSection: (s: SettingsSection) => void;
  onNavigate: (page: SideBarPage) => void;

  company: CompanyInfo;
  user: UserInfo;
  kycDocs: KycDocument[];
  onEditCompany: () => void;
  onEditUser: () => void;
  onUploadKyc: (docId: string, fileName: string) => void;
  onRemoveKyc: (docId: string) => void;

  sites: Site[];
  onAddSite: () => void;
  onEditSite: (site: Site) => void;

  sessions: ActiveSession[];
  history: LoginHistoryEntry[];
  prefs: SecurityPreferences;
  onTogglePref: (key: keyof SecurityPreferences) => void;
  onEndSession: (id: string) => void;
  onEndOtherSessions: () => void;
  onChangePassword: () => void;
  onForgotPassword: () => void;

  notifications: NotificationGroup[];
  onToggleNotification: (groupId: string, rowId: string, channel: NotificationChannel) => void;

  team: TeamMember[];
  onAddUser: () => void;
  onEditMember: (member: TeamMember) => void;
  onToggleMemberStatus: (id: string) => void;

  onRequestLogout: () => void;
};

/* "Settings" (Figma section 506:12154) */
export default function Settings(props: SettingsProps) {
  const { role, section, onSection, onNavigate } = props;
  /* Guard as well as hide: a regular user can never end up on an Admin-only screen */
  const activeSection: SettingsSection = section === "users" && role !== "admin" ? "account" : section;

  return (
    <div className="bg-[#f5f5f5] content-stretch flex flex-col items-start min-h-screen p-[24px] relative w-full" data-name="Settings">
      <div className="content-stretch flex flex-col lg:flex-row gap-[16px] items-start lg:justify-center relative shrink-0 w-full max-w-[1392px] mx-auto" data-name="Sidebar Container">
        <div className="content-stretch flex items-start relative shrink-0 w-full lg:w-auto">
          <div className="content-stretch flex flex-col gap-[24px] lg:h-full items-start relative shrink-0 w-full lg:w-[201px]">
            <UserProfile />
            <SideBar className="lg:h-[940px] relative shrink-0 w-full lg:w-[200px]" active="settings" onNavigate={onNavigate} />
          </div>
        </div>
        <div className="content-stretch flex flex-col gap-[19px] items-end relative shrink-0 w-full lg:w-auto lg:flex-[1_0_0] lg:max-w-[1159px] min-w-0">
          <TopBar />
          <div className="content-stretch flex flex-col gap-[19px] items-start relative shrink-0 w-full">
            <SettingsTabs section={activeSection} onSelect={onSection} onLogout={props.onRequestLogout} role={role} />
            <div className="content-stretch flex flex-col gap-[19px] items-start relative shrink-0 w-full">
              {activeSection === "account" && (
                <AccountInformation
                  role={role}
                  company={props.company}
                  user={props.user}
                  kycDocs={props.kycDocs}
                  onEditCompany={props.onEditCompany}
                  onEditUser={props.onEditUser}
                  onUploadKyc={props.onUploadKyc}
                  onRemoveKyc={props.onRemoveKyc}
                />
              )}

              {activeSection === "sites" && <SitesScreen sites={props.sites} onAddSite={props.onAddSite} onEditSite={props.onEditSite} />}

              {activeSection === "security" && (
                <SecurityAccess
                  sessions={props.sessions}
                  history={props.history}
                  prefs={props.prefs}
                  onTogglePref={props.onTogglePref}
                  onEndSession={props.onEndSession}
                  onEndOtherSessions={props.onEndOtherSessions}
                  onChangePassword={props.onChangePassword}
                  onForgotPassword={props.onForgotPassword}
                />
              )}

              {activeSection === "users" && role === "admin" && (
                <UsersRoles team={props.team} onAddUser={props.onAddUser} onEditMember={props.onEditMember} onToggleMemberStatus={props.onToggleMemberStatus} />
              )}

              {activeSection === "notifications" && <NotificationPreferences groups={props.notifications} onToggle={props.onToggleNotification} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
