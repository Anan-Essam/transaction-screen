import type { ReactNode } from "react";
import { AucEmptyGavel } from "./auctionIcons";

/* "Frame 391" — the auction empty state: gavel illustration, title, body copy and
   an optional green call-to-action, exactly as the Figma Empty State frames define it. */
export default function AuctionEmptyState({
  title,
  body,
  actionLabel,
  actionIcon,
  onAction,
}: {
  title: string;
  body: string;
  actionLabel?: string;
  actionIcon?: ReactNode;
  onAction?: () => void;
}) {
  return (
    <div className="bg-white flex flex-col gap-[7px] items-center relative w-full py-[24px]" data-name="Frame 391">
      <AucEmptyGavel />
      <div className="flex flex-col gap-[32px] items-center relative shrink-0 max-w-full">
        <div className="[word-break:break-word] flex flex-col gap-[4px] items-center leading-[0] not-italic relative shrink-0 text-center w-full">
          <div className="flex flex-col font-cairo font-bold justify-center relative shrink-0 text-[#131313] text-[20px]">
            <p className="leading-[normal]">{title}</p>
          </div>
          <div className="flex flex-col font-cairo font-medium justify-center relative shrink-0 text-[14px] text-[rgba(19,19,19,0.7)] w-[422px] max-w-full px-[16px]">
            <p className="leading-[24px]">{body}</p>
          </div>
        </div>
        {actionLabel && onAction && (
          <button
            type="button"
            onClick={onAction}
            className="bg-[#1b9e74] flex gap-[8px] h-[40px] items-center justify-center px-[16px] py-[8px] relative rounded-[24px] shrink-0 cursor-pointer"
          >
            <div className="[word-break:break-word] flex flex-col font-cairo font-bold justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap">
              <p className="leading-[normal]">{actionLabel}</p>
            </div>
            {actionIcon}
          </button>
        )}
      </div>
    </div>
  );
}
