import { useState } from "react";
import { SettingsCard, SettingsCardHeader, SettingsTable, SettingsToggle } from "./SettingsParts";
import PasswordField from "./PasswordField";
import { PasswordMgmtIcon, SecurityPrefsIcon, ActiveSessionsIcon, LoginHistoryIcon, DeviceIcon, SetNavLogoutIcon } from "../settingsIcons";
import { PASSWORD_RULES } from "../../settingsData";
import type { ActiveSession, LoginHistoryEntry, SecurityPreferences } from "../../settingsData";

function PreferenceRow({ title, description, on, onToggle }: { title: string; description: string; on: boolean; onToggle: () => void }) {
  return (
    <div className="content-stretch flex gap-[16px] items-center justify-between relative shrink-0 w-full" data-name="Frame 547">
      <div className="[word-break:break-word] content-stretch flex flex-col items-start leading-[0] not-italic relative shrink-0" data-name="Frame 542">
        <div className="flex flex-col font-cairo font-bold justify-center relative shrink-0 text-[#131313] text-[14px]">
          <p className="leading-[26px]">{title}</p>
        </div>
        <div className="flex flex-col font-cairo font-normal justify-center relative shrink-0 text-[12px] text-[rgba(19,19,19,0.6)]">
          <p className="leading-[22px]">{description}</p>
        </div>
      </div>
      <SettingsToggle on={on} onToggle={onToggle} label={title} />
    </div>
  );
}

type SecurityAccessProps = {
  sessions: ActiveSession[];
  history: LoginHistoryEntry[];
  prefs: SecurityPreferences;
  onTogglePref: (key: keyof SecurityPreferences) => void;
  onEndSession: (id: string) => void;
  onEndOtherSessions: () => void;
  onChangePassword: () => void;
  onForgotPassword: () => void;
};

const HISTORY_PREVIEW = 4;

/* "Security & Access" (Figma 506:12472) */
export default function SecurityAccess({
  sessions,
  history,
  prefs,
  onTogglePref,
  onEndSession,
  onEndOtherSessions,
  onChangePassword,
  onForgotPassword,
}: SecurityAccessProps) {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [showAllHistory, setShowAllHistory] = useState(false);

  const submit = () => {
    if (!current) return setError("Enter your current password.");
    if (!PASSWORD_RULES.every((r) => r.test(next))) return setError("Your new password does not meet the requirements.");
    if (next !== confirm) return setError("The two passwords do not match.");
    setError(null);
    setCurrent("");
    setNext("");
    setConfirm("");
    onChangePassword();
  };

  const visibleHistory = showAllHistory ? history : history.slice(0, HISTORY_PREVIEW);

  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
      <div className="content-stretch flex flex-col lg:flex-row gap-[24px] items-stretch relative shrink-0 w-full" data-name="Frame 541">
        {/* Password Management */}
        <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px relative w-full">
          <SettingsCard className="h-full">
            <SettingsCardHeader icon={<PasswordMgmtIcon className="size-[14px] shrink-0 text-[#131313]" />} title="Password Management" />
            <div className="content-stretch flex flex-col gap-[24px] items-start pt-[10px] relative shrink-0 w-full" data-name="Frame 91">
              <PasswordField label="Current Password" value={current} onChange={setCurrent} />
              <PasswordField
                label="New Password"
                value={next}
                onChange={setNext}
                footer={
                  <ul className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full list-none">
                    {PASSWORD_RULES.map((r) => (
                      <li key={r.label} className="content-stretch flex gap-[8px] items-center relative shrink-0">
                        <span className={`size-[4px] rounded-full shrink-0 ${next && r.test(next) ? "bg-[#1b9e74]" : "bg-[rgba(19,19,19,0.5)]"}`} />
                        <span className={`font-cairo font-normal text-[12px] ${next && r.test(next) ? "text-[#1b9e74]" : "text-[rgba(19,19,19,0.6)]"}`}>{r.label}</span>
                      </li>
                    ))}
                  </ul>
                }
              />
              <PasswordField label="Confirm New Password" value={confirm} onChange={setConfirm} />
              {error && (
                <p className="font-cairo font-semibold text-[12px] text-[#da1414] w-full" role="alert">
                  {error}
                </p>
              )}
            </div>
            <div className="content-stretch flex flex-wrap gap-[16px] items-center justify-between relative shrink-0 w-full" data-name="Frame 231">
              <button
                type="button"
                onClick={onForgotPassword}
                className="[word-break:break-word] flex flex-col font-cairo font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#28459d] text-[16px] whitespace-nowrap cursor-pointer"
              >
                <p className="leading-[20px]">Forgot Password?</p>
              </button>
              <button
                type="button"
                onClick={submit}
                className="bg-[#28459d] content-stretch flex h-[48px] items-center justify-center px-[16px] relative rounded-[24px] shrink-0 cursor-pointer"
                data-name="Frame 131"
              >
                <div className="[word-break:break-word] flex flex-col font-cairo font-bold justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap">
                  <p className="leading-[normal]">Change Password</p>
                </div>
              </button>
            </div>
          </SettingsCard>
        </div>

        {/* Security Preferences */}
        <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px relative w-full">
          <SettingsCard className="h-full">
            <SettingsCardHeader icon={<SecurityPrefsIcon className="size-[14px] shrink-0 text-[#131313]" />} title="Security Preferences" />
            <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Frame 91">
              <PreferenceRow
                title="Login notifications"
                description="Get notified of new login attempts"
                on={prefs.loginNotifications}
                onToggle={() => onTogglePref("loginNotifications")}
              />
              <PreferenceRow
                title="Auto logout"
                description="Automatically logout after inactivity"
                on={prefs.autoLogout}
                onToggle={() => onTogglePref("autoLogout")}
              />
              <PreferenceRow
                title="Suspicious activity alerts"
                description="Alert for unusual account activity"
                on={prefs.suspiciousActivityAlerts}
                onToggle={() => onTogglePref("suspiciousActivityAlerts")}
              />
            </div>
          </SettingsCard>
        </div>
      </div>

      {/* Active Sessions */}
      <SettingsCard>
        <SettingsCardHeader
          icon={<ActiveSessionsIcon className="size-[14px] shrink-0 text-[#131313]" />}
          title="Active Sessions"
          action={
            <button type="button" onClick={onEndOtherSessions} className="content-stretch cursor-pointer flex gap-[4px] items-center relative shrink-0">
              <SetNavLogoutIcon className="size-[12px] shrink-0 text-[#da1414]" />
              <div className="[word-break:break-word] flex flex-col font-cairo font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#da1414] text-[12px] whitespace-nowrap">
                <p className="leading-[normal]">Log Out All Session</p>
              </div>
            </button>
          }
        />
        <SettingsTable
          ariaLabel="Active sessions"
          columns={[
            { key: "device", label: "Device Name" },
            { key: "browser", label: "Browser" },
            { key: "location", label: "Location" },
            { key: "lastActive", label: "Last Active" },
            { key: "actions", label: "Actions" },
          ]}
          rows={sessions.map((s) => ({
            id: s.id,
            cells: {
              device: (
                <span className="inline-flex items-center gap-[8px]">
                  <DeviceIcon className="size-[12px] shrink-0 text-[#131313]" />
                  <span>{s.device}</span>
                  {s.current && (
                    <span className="bg-[rgba(27,158,116,0.1)] font-cairo font-semibold px-[8px] py-[4px] rounded-[16px] text-[#1b9e74] text-[12px]">Current</span>
                  )}
                </span>
              ),
              browser: <span className="font-normal text-[rgba(19,19,19,0.7)]">{s.browser}</span>,
              location: <span className="font-normal text-[rgba(19,19,19,0.7)]">{s.location}</span>,
              lastActive: <span className="font-normal text-[rgba(19,19,19,0.7)]">{s.lastActive}</span>,
              actions: s.current ? (
                <span className="font-normal text-[rgba(19,19,19,0.7)]">Current session</span>
              ) : (
                <button type="button" onClick={() => onEndSession(s.id)} className="font-cairo font-semibold text-[#da1414] text-[14px] cursor-pointer">
                  Log Out
                </button>
              ),
            },
          }))}
        />
      </SettingsCard>

      {/* Login History */}
      <SettingsCard>
        <SettingsCardHeader
          icon={<LoginHistoryIcon className="size-[14px] shrink-0 text-[#131313]" />}
          title="Login History"
          action={
            <button
              type="button"
              onClick={() => setShowAllHistory((v) => !v)}
              className="[word-break:break-word] flex flex-col font-cairo font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#28459d] text-[12px] whitespace-nowrap cursor-pointer"
            >
              <p className="leading-[normal]">{showAllHistory ? "Show Less" : "View All"}</p>
            </button>
          }
        />
        <SettingsTable
          ariaLabel="Login history"
          columns={[
            { key: "dateTime", label: "Date & Time" },
            { key: "ipAddress", label: "IP Address" },
            { key: "location", label: "Location" },
            { key: "device", label: "Device" },
          ]}
          rows={visibleHistory.map((h) => ({
            id: h.id,
            cells: {
              dateTime: h.dateTime,
              ipAddress: <span className="font-normal text-[rgba(19,19,19,0.7)]">{h.ipAddress}</span>,
              location: <span className="font-normal text-[rgba(19,19,19,0.7)]">{h.location}</span>,
              device: <span className="font-normal text-[rgba(19,19,19,0.7)]">{h.device}</span>,
            },
          }))}
        />
      </SettingsCard>
    </div>
  );
}
