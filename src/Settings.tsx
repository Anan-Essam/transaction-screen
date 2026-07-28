import SideBar from "./components/SideBar";
import type { SideBarPage } from "./components/SideBar";
import { UserProfile, TopBar } from "./MoneyTransactions";
import AccountInformation from "./components/settings/AccountInformation";
import SitesScreen from "./components/settings/SitesScreen";
import SecurityAccess from "./components/settings/SecurityAccess";
import UsersRoles from "./components/settings/UsersRoles";
import NotificationPreferences from "./components/settings/NotificationPreferences";
import SettingsTabs from "./components/settings/SettingsTabs";
export type { SettingsSection } from "./components/settings/SettingsTabs";
import type { SettingsSection } from "./components/settings/SettingsTabs";
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
