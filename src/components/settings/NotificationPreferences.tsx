import { SettingsCard, SettingsCardHeader, SettingsToggle } from "./SettingsParts";
import { SetNavAccountIcon } from "../settingsIcons";
import { NOTIFICATION_CHANNELS } from "../../settingsData";
import type { NotificationChannel, NotificationGroup } from "../../settingsData";

/* "Frame 38" — one notification group's channel matrix */
function NotificationTable({ group, onToggle }: { group: NotificationGroup; onToggle: (rowId: string, channel: NotificationChannel) => void }) {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-end relative shrink-0 w-full overflow-x-auto" data-name="Frame 38">
      <div className="content-stretch flex flex-col gap-[16px] items-end relative shrink-0 w-full min-w-[620px]">
        {/* "Frame 35" — column headings */}
        <div
          className="[word-break:break-word] border-[#f5f5f5] border-b border-solid content-stretch flex font-cairo font-medium items-center justify-between leading-[0] not-italic pb-[16px] px-[8px] relative shrink-0 text-[14px] text-[rgba(19,19,19,0.7)] w-full"
          data-name="Frame 35"
        >
          <div className="flex flex-col justify-center relative shrink-0 w-[223px]">
            <p className="leading-[normal]">Notification Type</p>
          </div>
          {NOTIFICATION_CHANNELS.map((c) => (
            <div key={c.key} className="flex flex-col justify-center relative shrink-0 w-[41px]">
              <p className="leading-[normal]">{c.label}</p>
            </div>
          ))}
        </div>

        {group.rows.map((row) => (
          <div key={row.id} className="content-stretch flex items-center justify-between p-[8px] relative shrink-0 w-full" data-name="Frame 307">
            <div className="[word-break:break-word] content-stretch flex flex-col gap-[2px] items-start justify-center leading-[0] not-italic relative shrink-0 w-[223px]" data-name="Frame 565">
              <div className="flex flex-col font-cairo font-bold justify-center relative shrink-0 text-[#131313] text-[14px] w-full">
                <p className="leading-[normal]">{row.title}</p>
              </div>
              <div className="flex flex-col font-cairo font-normal justify-center relative shrink-0 text-[12px] text-[rgba(19,19,19,0.7)] w-full">
                <p className="leading-[normal]">{row.description}</p>
              </div>
            </div>
            {NOTIFICATION_CHANNELS.map((c) => (
              <SettingsToggle
                key={c.key}
                tone={group.tone}
                width={41}
                on={row.channels[c.key]}
                onToggle={() => onToggle(row.id, c.key)}
                label={`${row.title} — ${c.label}`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

type NotificationPreferencesProps = {
  /* the unsaved draft — the Settings shell owns it so the header's Save
     Changes button can read the same state */
  groups: NotificationGroup[];
  onToggle: (groupId: string, rowId: string, channel: NotificationChannel) => void;
};

/* "Notifications" (Figma 506:13142) */
export default function NotificationPreferences({ groups, onToggle }: NotificationPreferencesProps) {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-name="Frame 314">
      {groups.map((group) => (
        <SettingsCard key={group.id}>
          <SettingsCardHeader icon={<SetNavAccountIcon className="size-[14px] shrink-0 text-[#131313]" />} title={group.title} divider={false} />
          <NotificationTable group={group} onToggle={(rowId, channel) => onToggle(group.id, rowId, channel)} />
        </SettingsCard>
      ))}
    </div>
  );
}
