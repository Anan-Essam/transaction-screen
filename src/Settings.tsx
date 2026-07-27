import type { ReactNode } from "react";
import SideBar from "./components/SideBar";
import type { SideBarPage } from "./components/SideBar";
import { UserProfile, TopBar } from "./MoneyTransactions";
import { SettingsPageTitle, SettingsPrimaryButton } from "./components/settings/SettingsParts";
import AccountInformation from "./components/settings/AccountInformation";
import SitesScreen from "./components/settings/SitesScreen";
import SecurityAccess from "./components/settings/SecurityAccess";
import UsersRoles from "./components/settings/UsersRoles";
import {
  SetNavAccountIcon,
  SetNavSitesIcon,
  SetNavSecurityIcon,
  SetNavUsersIcon,
  SetNavNotificationsIcon,
  SetNavLogoutIcon,
  UsersRolesTitleIcon,
} from "./components/settingsIcons";
import { Plus } from "./components/icons";
import type {
  ActiveSession,
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

/* "Frame 20" — the Settings sub-navigation card */
function SettingsNav({
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
  /* Users & Roles is an Admin-only screen — a regular user never even sees the entry */
  const items = NAV_ITEMS.filter((i) => (i.key === "users" ? role === "admin" : true));

  return (
    <div className="bg-white content-stretch flex flex-col items-start p-[16px] relative rounded-[24px] shrink-0 w-full lg:w-[198px]" data-name="Frame 238">
      <nav className="content-stretch flex flex-col gap-[16px] items-start justify-center relative shrink-0 w-full lg:w-[166px]" aria-label="Settings sections">
        {items.map((item) => {
          const active = item.key === section;
          return (
            <button
              key={item.key}
              type="button"
              onClick={() => onSelect(item.key)}
              aria-current={active ? "page" : undefined}
              className={`content-stretch cursor-pointer flex gap-[8px] items-center p-[8px] relative rounded-[24px] shrink-0 w-full lg:w-[166px] text-left ${
                active ? "bg-[#1b9e74]" : ""
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
          className="content-stretch cursor-pointer flex gap-[8px] items-center p-[8px] relative rounded-[24px] shrink-0 w-full lg:w-[166px] text-left"
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

  const titles: Record<SettingsSection, { label: string; icon: ReactNode }> = {
    account: { label: "Account Information", icon: <SetNavAccountIcon className="size-[16px] shrink-0 text-[#131313]" /> },
    sites: { label: "Sites", icon: <SetNavSitesIcon className="size-[12px] shrink-0 text-[#131313]" /> },
    security: { label: "Security & Access", icon: <SetNavSecurityIcon className="size-[16px] shrink-0 text-[#131313]" /> },
    users: { label: "Users & Roles", icon: <UsersRolesTitleIcon className="size-[16px] shrink-0 text-[#131313]" /> },
    notifications: { label: "Notifications", icon: <SetNavNotificationsIcon className="h-[16px] w-[15px] shrink-0 text-[#131313]" /> },
  };

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
          <div className="content-stretch flex flex-col lg:flex-row gap-[19px] items-start relative shrink-0 w-full">
            <SettingsNav section={activeSection} onSelect={onSection} onLogout={props.onRequestLogout} role={role} />
            <div className="content-stretch flex flex-[1_0_0] flex-col gap-[19px] items-start min-w-px relative w-full">
              <SettingsPageTitle
                icon={titles[activeSection].icon}
                title={titles[activeSection].label}
                action={
                  activeSection === "users" && role === "admin" ? (
                    <SettingsPrimaryButton label="Add User" icon={<Plus className="overflow-clip relative size-[18px]" />} onClick={props.onAddUser} />
                  ) : undefined
                }
              />

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
                <UsersRoles team={props.team} onEditMember={props.onEditMember} onToggleMemberStatus={props.onToggleMemberStatus} />
              )}

              {activeSection === "notifications" && (
                <div className="bg-white font-cairo font-medium p-[24px] rounded-[24px] text-[14px] text-[rgba(19,19,19,0.6)] w-full">
                  Notification preferences are not part of this build yet.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
