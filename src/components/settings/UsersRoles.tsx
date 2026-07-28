import { useState } from "react";
import { SettingsCard, SettingsCardHeader, SettingsSearchBar, SettingsTable, SettingsPrimaryButton } from "./SettingsParts";
import { UsersRolesTitleIcon, RolesFilterIcon, SetNavAccountIcon, PermCheckIcon, PermCrossIcon } from "../settingsIcons";
import { Plus } from "../icons";
import { ROLE_PERMISSIONS, ROLE_PILL, TEAM_ROLES, roleUserCount } from "../../settingsData";
import type { TeamMember } from "../../settingsData";

/* "Frame 490" — round action chip used in the Actions column */
function ActionChip({ tint, onClick, label, children }: { tint: string; onClick: () => void; label: string; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="content-stretch flex items-center justify-center relative rounded-[16px] shrink-0 size-[32px] cursor-pointer"
      style={{ backgroundColor: tint }}
    >
      {children}
    </button>
  );
}

function EditGlyph() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path
        d="M1.34 8.31l.5-1.5c.06-.19.15-.36.28-.5L6.33 2.1a1.4 1.4 0 011.98 0l1.6 1.6a1.4 1.4 0 010 1.98l-4.2 4.2c-.14.14-.31.23-.5.29l-1.5.5a.7.7 0 01-.89-.89z"
        stroke="#28459D"
        strokeWidth="1"
        strokeLinejoin="round"
      />
      <path d="M5.67 2.67L9 6" stroke="#28459D" strokeWidth="1" strokeLinecap="round" />
      <path d="M5 12.33h7" stroke="#28459D" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

function PauseGlyph() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
      <rect x="2" y="1.5" width="3" height="9" rx="1.5" fill="#828282" />
      <rect x="7" y="1.5" width="3" height="9" rx="1.5" fill="#828282" />
    </svg>
  );
}

function PlayGlyph() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path d="M2.5 9.96V2.04c0-1.1 1.27-1.73 2.15-1.06l5.14 3.96c.7.54.7 1.58 0 2.12L4.65 11.02C3.77 11.69 2.5 11.06 2.5 9.96z" fill="#287D3C" stroke="#287D3C" strokeLinecap="round" />
    </svg>
  );
}

/* "Frame 557" — one Roles & Permissions summary card */
function RolePermissionCardView({ role, description, permissions, users }: { role: string; description: string; permissions: { label: string; allowed: boolean }[]; users: number }) {
  return (
    <div className="bg-white border border-[#f0f0f0] border-solid content-stretch flex flex-col gap-[12px] items-start p-[16px] relative rounded-[16px] shrink-0 w-full" data-name="Frame 557">
      <div className="content-stretch flex gap-[16px] items-center justify-between relative shrink-0 w-full" data-name="Frame 562">
        <div className="[word-break:break-word] flex flex-col font-cairo font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#131313] text-[16px] whitespace-nowrap">
          <p className="leading-[normal]">{role}</p>
        </div>
        <div className="bg-[rgba(40,69,157,0.08)] content-stretch flex items-center px-[12px] py-[4px] relative rounded-[16px] shrink-0" data-name="Frame 540">
          <div className="[word-break:break-word] flex flex-col font-cairo font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#28459d] text-[12px] whitespace-nowrap">
            <p className="leading-[normal]">{users} User{users === 1 ? "" : "s"}</p>
          </div>
        </div>
      </div>
      <div className="[word-break:break-word] flex flex-col font-cairo font-normal justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(19,19,19,0.6)] w-full">
        <p className="leading-[24px]">{description}</p>
      </div>
      <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Frame 556">
        {permissions.map((p) => (
          <div key={p.label} className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Frame 558">
            {p.allowed ? <PermCheckIcon className="size-[12px] shrink-0" /> : <PermCrossIcon className="size-[12px] shrink-0" />}
            <div className="[word-break:break-word] flex flex-col font-cairo font-normal justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[#131313] whitespace-nowrap">
              <p className="leading-[22px]">{p.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

type UsersRolesProps = {
  team: TeamMember[];
  onAddUser: () => void;
  onEditMember: (member: TeamMember) => void;
  onToggleMemberStatus: (id: string) => void;
};

/* "Users & Roles" (Figma 506:12780) — Admin only; the Settings shell never
   mounts this screen for a regular user. */
export default function UsersRoles({ team, onAddUser, onEditMember, onToggleMemberStatus }: UsersRolesProps) {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All Roles");

  const q = search.trim().toLowerCase();
  const visible = team.filter((m) => {
    if (roleFilter !== "All Roles" && m.role !== roleFilter) return false;
    if (q && !m.name.toLowerCase().includes(q) && !m.email.toLowerCase().includes(q)) return false;
    return true;
  });

  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
      <SettingsCard>
        <SettingsCardHeader
          icon={<SetNavAccountIcon className="size-[14px] shrink-0 text-[#131313]" />}
          title="Team Member"
          divider={false}
          action={
            /* Figma moved the search, role filter and Add User into the card header */
            <div className="content-stretch flex flex-col lg:flex-row gap-[16px] items-stretch lg:items-center min-w-0 relative" data-name="Frame 2085664033">
              <div className="lg:w-[523px] max-w-full">
                <SettingsSearchBar
                  search={search}
                  onSearch={setSearch}
                  filterIcon={<RolesFilterIcon className="h-[13px] w-[15px] shrink-0 text-[rgba(19,19,19,0.7)]" />}
                  filterValue={roleFilter}
                  filterOptions={["All Roles", ...TEAM_ROLES]}
                  onFilter={setRoleFilter}
                  filterLabel="Filter by role"
                />
              </div>
              <SettingsPrimaryButton
                label="Add User"
                variant="green"
                icon={<Plus className="overflow-clip relative shrink-0 size-[18px]" />}
                onClick={onAddUser}
              />
            </div>
          }
        />
        <SettingsTable
          ariaLabel="Team members"
          columns={[
            { key: "name", label: "Name" },
            { key: "email", label: "Email" },
            { key: "role", label: "Role" },
            { key: "status", label: "Status" },
            { key: "lastLogin", label: "Last Login" },
            { key: "actions", label: "Actions" },
          ]}
          rows={visible.map((m) => ({
            id: m.id,
            cells: {
              name: (
                <span className="inline-flex items-center gap-[8px]">
                  <img alt="" src={m.avatar} className="size-[18px] rounded-full object-cover shrink-0" />
                  <span>{m.name}</span>
                </span>
              ),
              email: <span className="font-normal text-[rgba(19,19,19,0.7)]">{m.email}</span>,
              role: (
                <span
                  className="inline-flex font-cairo font-semibold items-center px-[12px] py-[4px] rounded-[16px] text-[12px] whitespace-nowrap"
                  style={{ backgroundColor: ROLE_PILL[m.role].bg, color: ROLE_PILL[m.role].text }}
                >
                  {m.role}
                </span>
              ),
              status: (
                <span
                  className={`inline-flex font-cairo font-semibold gap-[8px] items-center px-[12px] py-[4px] rounded-[16px] text-[12px] whitespace-nowrap ${
                    m.status === "Active" ? "bg-[rgba(27,158,116,0.1)] text-[#1b9e74]" : "bg-[rgba(218,20,20,0.08)] text-[#da1414]"
                  }`}
                  data-name="Frame 555"
                >
                  <span className={`size-[6px] rounded-full ${m.status === "Active" ? "bg-[#1b9e74]" : "bg-[#da1414]"}`} />
                  {m.status}
                </span>
              ),
              lastLogin: <span className="font-normal text-[rgba(19,19,19,0.7)]">{m.lastLogin}</span>,
              actions: (
                <span className="inline-flex gap-[8px] items-center" data-name="Frame 530">
                  <ActionChip tint="rgba(40,69,157,0.08)" onClick={() => onEditMember(m)} label={`Edit ${m.name}`}>
                    <EditGlyph />
                  </ActionChip>
                  {m.status === "Active" ? (
                    <ActionChip tint="rgba(130,130,130,0.08)" onClick={() => onToggleMemberStatus(m.id)} label={`Suspend ${m.name}`}>
                      <PauseGlyph />
                    </ActionChip>
                  ) : (
                    <ActionChip tint="rgba(12,198,12,0.08)" onClick={() => onToggleMemberStatus(m.id)} label={`Reactivate ${m.name}`}>
                      <PlayGlyph />
                    </ActionChip>
                  )}
                </span>
              ),
            },
          }))}
        />
        {visible.length === 0 && (
          <div className="font-cairo font-medium text-[14px] text-[rgba(19,19,19,0.6)] py-[16px] w-full text-center">No team members match your search.</div>
        )}
      </SettingsCard>

      <SettingsCard>
        <SettingsCardHeader icon={<UsersRolesTitleIcon className="size-[14px] shrink-0 text-[#131313]" />} title="Roles & Permissions" />
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[24px] w-full" data-name="Frame 561">
          {ROLE_PERMISSIONS.map((r) => (
            <RolePermissionCardView key={r.role} role={r.role} description={r.description} permissions={r.permissions} users={roleUserCount(team, r.role)} />
          ))}
        </div>
      </SettingsCard>
    </div>
  );
}
