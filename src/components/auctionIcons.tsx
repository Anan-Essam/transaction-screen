import aucPlus from "../assets/figma/aucPlus.svg";
import aucSearchG1 from "../assets/figma/aucSearchG1.svg";
import aucSearchG2 from "../assets/figma/aucSearchG2.svg";
import aucClearMask from "../assets/figma/aucClearMask.svg";
import aucCalendar from "../assets/figma/aucCalendar.svg";
import aucCategoryIcon from "../assets/figma/aucCategoryIcon.svg";
import aucArrowDown from "../assets/figma/aucArrowDown.svg";
import aucSortG1 from "../assets/figma/aucSortG1.svg";
import aucSortG2 from "../assets/figma/aucSortG2.svg";
import aucClock from "../assets/figma/aucClock.svg";
import aucBidding from "../assets/figma/aucBidding.svg";
import aucBidderUp from "../assets/figma/aucBidderUp.svg";
import aucProduct from "../assets/figma/aucProduct.svg";
import aucLocG1 from "../assets/figma/aucLocG1.svg";
import aucLocG2 from "../assets/figma/aucLocG2.svg";
import aucLocG3 from "../assets/figma/aucLocG3.svg";
import aucMoneyLow from "../assets/figma/aucMoneyLow.svg";
import aucJudgment from "../assets/figma/aucJudgment.svg";
import aucMedalStar from "../assets/figma/aucMedalStar.svg";
import aucTagG1 from "../assets/figma/aucTagG1.svg";
import aucTagG2 from "../assets/figma/aucTagG2.svg";
import aucCal12 from "../assets/figma/aucCal12.svg";
import aucShare from "../assets/figma/aucShare.svg";
import aucUnchecked from "../assets/figma/aucUnchecked.svg";
import aucLock from "../assets/figma/aucLock.svg";
import aucLightning from "../assets/figma/aucLightning.svg";
import aucStar from "../assets/figma/aucStar.svg";
import aucInfoI from "../assets/figma/aucInfoI.svg";
import aucCheck from "../assets/figma/aucCheck.svg";
import aucX from "../assets/figma/aucX.svg";
import aucCloseX from "../assets/figma/aucCloseX.svg";
import aucTrash from "../assets/figma/aucTrash.svg";
import aucScales1 from "../assets/figma/aucScales1.svg";
import aucScales2 from "../assets/figma/aucScales2.svg";
import aucScales3 from "../assets/figma/aucScales3.svg";
import aucScales4 from "../assets/figma/aucScales4.svg";
import aucLiveStatus from "../assets/figma/aucLiveStatus.svg";
import aucOverviewIcon from "../assets/figma/aucOverviewIcon.svg";
import aucKycIcon from "../assets/figma/aucKycIcon.svg";
import aucVerified from "../assets/figma/aucVerified.png";
import aucAwardCoin from "../assets/figma/aucAwardCoin.png";
import aucTrophy from "../assets/figma/aucTrophy.png";
import aucEmptyGavel from "../assets/figma/aucEmptyGavel.png";
import aucEmptyShare from "../assets/figma/aucEmptyShare.svg";
import aucBadgeActive from "../assets/figma/aucBadgeActive.png";
import aucBadgeClosed from "../assets/figma/aucBadgeClosed.png";
import aucBadgeDraft from "../assets/figma/aucBadgeDraft.png";

/* search_450058 1 — 16px search glass */
export function AucSearchIcon() {
  return (
    <div className="overflow-clip relative shrink-0 size-[16px]" data-name="search_450058 1">
      <div className="absolute contents inset-0">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={aucSearchG1} />
      </div>
      <div className="absolute contents inset-[11.71%_36.12%_63.88%_39.48%]">
        <div className="absolute inset-[11.71%_36.12%_63.88%_39.48%]">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={aucSearchG2} />
        </div>
      </div>
    </div>
  );
}

/* Clear (X-in-circle) mask icon for search inputs */
export function AucClearIcon() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Clear Icon">
      <div
        className="absolute bg-[rgba(19,19,19,0.6)] inset-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[5.407px_5.408px] mask-size-[13.185px_13.185px]"
        style={{ maskImage: `url("${aucClearMask}")` }}
      />
    </div>
  );
}

export function AucCalendarIcon({ size = 16 }: { size?: number }) {
  return (
    <div className="overflow-clip relative shrink-0" style={{ width: size, height: size }} data-name="calendar_9883816 1">
      <div className="absolute inset-[2.93%]">
        <div className="absolute inset-[-3.11%]">
          <img alt="" className="block max-w-none size-full" src={aucCalendar} />
        </div>
      </div>
    </div>
  );
}

export function AucCategoryFilterIcon() {
  return (
    <div className="h-[12px] relative shrink-0 w-[13.45px]">
      <div className="absolute inset-[-3.49%_-3.11%]">
        <img alt="" className="block max-w-none size-full" src={aucCategoryIcon} />
      </div>
    </div>
  );
}

export function AucSortIcon() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0" data-name="Sort Icon Container">
      <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-[0.94px] place-items-start relative row-1">
        <div className="col-1 h-[11.056px] ml-0 mt-0 relative row-1 w-[7.444px]">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={aucSortG1} />
        </div>
      </div>
      <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-[7.51px] mt-0 place-items-start relative row-1">
        <div className="col-1 h-[11.056px] ml-0 mt-0 relative row-1 w-[7.444px]">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={aucSortG2} />
        </div>
      </div>
    </div>
  );
}

/* vuesax/linear/arrow-down at 19.2px, rendered as the dropdown chevron */
export function AucDropArrow({ size = 19.2, white = false }: { size?: number; white?: boolean }) {
  return (
    <div className="flex items-center justify-center relative shrink-0">
      <div className="-scale-y-100 flex-none rotate-180">
        <div className="relative" style={{ width: size, height: size }} data-name="Category Arrow Icon">
          <div className="absolute contents inset-0">
            <div className={`absolute inset-[0_0.01%_0_-0.01%] ${white ? "invert brightness-0" : ""}`}>
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={aucArrowDown} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* plain (unmirrored) chevron pointing down; rotate via className */
export function AucChevron({ size = 14.4, className }: { size?: number; className?: string }) {
  return (
    <div className={`relative shrink-0 ${className || ""}`} style={{ width: size, height: size }} data-name="vuesax/linear/arrow-down">
      <div className="absolute inset-[0_0.01%_0_-0.01%]">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={aucArrowDown} />
      </div>
    </div>
  );
}

export function AucPlusIcon() {
  return (
    <div className="overflow-clip relative shrink-0 size-[16px]" data-name="plus">
      <div className="absolute inset-[16.67%]">
        <div className="absolute inset-[-6.25%]">
          <img alt="" className="block max-w-none size-full" src={aucPlus} />
        </div>
      </div>
    </div>
  );
}

export function AucClockIcon({ size = 12 }: { size?: number }) {
  return (
    <div className="overflow-clip relative shrink-0" style={{ width: size, height: size }} data-name="clock_2794439 1">
      <img alt="" className="absolute block inset-0 max-w-none size-full" src={aucClock} />
    </div>
  );
}

export function AucBiddingIcon({ size = 12 }: { size?: number }) {
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }} data-name="bidding_1203608 1">
      <img alt="" className="absolute block inset-0 max-w-none size-full" src={aucBidding} />
    </div>
  );
}

export function AucBidderUpIcon() {
  return (
    <div className="h-[9px] mr-[-1px] overflow-clip relative shrink-0 w-[10px]" data-name="Frame 37/arrow/Property 24">
      <div className="absolute bottom-[20.83%] left-1/4 right-1/4 top-[22.56%]">
        <div className="absolute inset-[-8.18%_-8.33%]">
          <img alt="" className="block max-w-none size-full" src={aucBidderUp} />
        </div>
      </div>
    </div>
  );
}

export function AucProductIcon({ size = 12 }: { size?: number }) {
  return (
    <div className="overflow-clip relative shrink-0" style={{ width: size, height: size }} data-name="product_9288207 1">
      <div className="absolute inset-[3.38%_9.63%]">
        <div className="absolute inset-[-3.78%]">
          <img alt="" className="block max-w-none size-full" src={aucProduct} />
        </div>
      </div>
    </div>
  );
}

export function AucLocationIcon({ size = 12 }: { size?: number }) {
  return (
    <div className="overflow-clip relative shrink-0" style={{ width: size, height: size }} data-name="placeholder_330864 (2) 1">
      <div className="absolute inset-[-0.01%_13.71%_0.01%_13.71%]">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={aucLocG1} />
      </div>
      <div className="absolute inset-[19.83%_33.56%_47.28%_33.56%]">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={aucLocG2} />
      </div>
      <div className="absolute bottom-[63.72%] left-1/2 right-[23.63%] top-[9.91%]">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={aucLocG3} />
      </div>
    </div>
  );
}

export function AucMoneyIcon() {
  return (
    <div className="overflow-clip relative shrink-0 size-[12px]" data-name="money_7428155 1">
      <div className="absolute inset-[6.17%_2.93%]">
        <div className="absolute inset-[-3.34%_-3.11%]">
          <img alt="" className="block max-w-none size-full" src={aucMoneyLow} />
        </div>
      </div>
    </div>
  );
}

export function AucJudgmentIcon({ size = 12 }: { size?: number }) {
  return (
    <div className="overflow-clip relative shrink-0" style={{ width: size, height: size }} data-name="judgment_9117545 1">
      <div className="absolute inset-[2.95%_3.02%_2.94%_3.02%]">
        <div className="absolute inset-[-3.13%]">
          <img alt="" className="block max-w-none size-full" src={aucJudgment} />
        </div>
      </div>
    </div>
  );
}

export function AucScalesIcon({ size = 8.138 }: { size?: number }) {
  return (
    <div className="overflow-clip relative shrink-0" style={{ width: size, height: size }} data-name="scales_1039579 1">
      <div className="absolute inset-[72.01%_10.58%_-0.04%_10.49%]">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={aucScales1} />
      </div>
      <div className="absolute inset-[0.01%_10.53%_31.45%_10.57%]">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={aucScales2} />
      </div>
      <div className="absolute inset-[14.11%_50.22%_75.52%_42.35%]">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={aucScales3} />
      </div>
      <div className="absolute inset-[16.82%_42.42%_72.41%_49.64%]">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={aucScales4} />
      </div>
    </div>
  );
}

/* Exact Figma fills for the circular "go to" action button */
export const AUCTION_GREEN = "#1b9e74";
export const AUCTION_BLUE = "#2a459d";
/* Figma draws the arrow white inside the green circle and #21C18D inside the blue one */
const ARROW_ON_GREEN = "#ffffff";
const ARROW_ON_BLUE = "#21c18d";

/* arrow/up left — round action circle (Rectangle notch sits behind it on the cards) */
export function AucArrowCircle({
  size = 44,
  color = AUCTION_BLUE,
  iconSize = 11.694,
  onClick,
  label,
}: {
  size?: number;
  color?: string;
  iconSize?: number;
  onClick?: () => void;
  label?: string;
}) {
  const stroke = color === AUCTION_GREEN ? ARROW_ON_GREEN : ARROW_ON_BLUE;
  const inner = (
    <div className="flex items-center justify-center overflow-clip rounded-full" style={{ width: size, height: size, backgroundColor: color }} data-name="arrow/up left">
      <svg width={iconSize} height={iconSize} viewBox="0 0 13.3437 13.3437" fill="none" aria-hidden="true" className="block shrink-0 -scale-x-100">
        <path
          d="M12.5187 12.5187L1.66026 1.66026M0.825 10.8481V2.00624C0.825 1.35386 1.35386 0.825 2.00624 0.825H10.8481"
          stroke={stroke}
          strokeWidth="1.65"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
  if (!onClick) return inner;
  return (
    <button type="button" onClick={onClick} aria-label={label} className="cursor-pointer shrink-0">
      {inner}
    </button>
  );
}

/* "Rectangle 932" — product card frame: white body, notched bottom-right corner for the
   action button, mirrored horizontally exactly as the Figma instance renders. 183 x 139.462 */
export function ProductCardFrame({ selected }: { selected: boolean }) {
  return (
    <svg viewBox="0 0 183 139.462" width="183" height="139.462" fill="none" aria-hidden="true" className="absolute inset-0 block size-full">
      <g transform="scale(-1 1) translate(-183 0)">
        <path
          d="M16.0996 0.295898H161.667C173.285 0.296069 182.704 9.71479 182.704 21.333V118.129C182.704 129.747 173.285 139.166 161.667 139.166H40.2109C36.9737 139.166 34.4808 137.363 32.7734 134.701C31.0628 132.035 30.159 128.529 30.1162 125.209C30.0793 122.349 29.7812 119.959 29.0312 117.745C28.2805 115.529 27.0817 113.503 25.2627 111.365C23.8384 109.691 22.5353 108.408 21.0547 107.43C19.571 106.45 17.9221 105.785 15.8164 105.33C14.3506 105.014 12.6226 104.94 10.877 104.911C9.11977 104.882 7.34727 104.9 5.74902 104.773C4.14674 104.646 2.77303 104.377 1.80566 103.806C1.32738 103.523 0.953512 103.171 0.698242 102.728C0.443041 102.285 0.295901 101.734 0.295898 101.044V16.0996C0.296158 7.37175 7.37175 0.296161 16.0996 0.295898Z"
          fill="white"
          stroke={selected ? AUCTION_GREEN : "#f0f0f0"}
          strokeWidth="0.592446"
        />
      </g>
    </svg>
  );
}

/* "Rectangle 932" — buyer card frame, same notch treatment. 202 x 61 */
export function BuyerCardFrame({ selected }: { selected: boolean }) {
  return (
    <svg viewBox="0 0 202 61" width="202" height="61" fill="none" aria-hidden="true" className="absolute inset-0 block size-full">
      <g transform="scale(-1 1) translate(-202 0)">
        <path
          d="M8.74219 0.295898H186C194.673 0.2959 201.704 7.32704 201.704 16V45C201.704 53.673 194.673 60.7041 186 60.7041H38.2539C37.1626 60.7041 36.3479 60.4294 35.7256 59.9687C35.1002 59.5057 34.6436 58.8356 34.3027 58.0059C33.6147 56.3311 33.4264 54.089 33.2109 51.793C32.9468 48.9781 32.6174 46.6088 31.8477 44.4121C31.0755 42.2087 29.8641 40.1903 27.8516 38.0635C26.2792 36.4018 24.8418 35.1296 23.2109 34.1611C21.578 33.1916 19.7644 32.5341 17.4463 32.084C15.8175 31.7678 13.9075 31.6428 11.9795 31.5303C10.0428 31.4173 8.08568 31.3163 6.33008 31.0518C4.56997 30.7865 3.05303 30.3618 1.98145 29.626C0.93032 28.9041 0.29595 27.8771 0.295898 26.3428V8.74219C0.295898 4.07782 4.07782 0.295898 8.74219 0.295898Z"
          fill="white"
          stroke={selected ? AUCTION_GREEN : "#f0f0f0"}
          strokeWidth="0.592446"
        />
      </g>
    </svg>
  );
}

/* Gold coin used inside the green "Awarded" badge */
export function AucAwardCoin({ size = 10 }: { size?: number }) {
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }} data-name="Object">
      <img alt="" className="absolute inset-0 max-w-none object-contain size-full" src={aucAwardCoin} />
    </div>
  );
}

/* Trophy in the Winners-state "Auction completion" bar */
export function AucTrophyIcon() {
  return (
    <div className="h-[15.983px] relative shrink-0 w-[18.571px]" data-name="Object">
      <img alt="" className="absolute inset-0 max-w-none object-contain size-full" src={aucTrophy} />
    </div>
  );
}

/* Icons/Cards/Summer-2 — gavel illustration used by every auction empty state */
export function AucEmptyGavel() {
  return (
    <div className="h-[64px] relative shrink-0 w-[89.997px]" data-name="Icons/Cards/Summer-2">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-[168.91%] left-[-8.52%] max-w-none top-[-34.85%] w-[120.12%]" src={aucEmptyGavel} />
      </div>
    </div>
  );
}

/* Share glyph used on the "No bids received yet" empty-state button */
export function AucEmptyShareIcon() {
  return (
    <div className="h-[16px] relative shrink-0 w-[15px]" data-name="Vector">
      <img alt="" className="absolute block inset-0 max-w-none size-full" src={aucEmptyShare} />
    </div>
  );
}

export function AucMedalStarIcon() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="vuesax/linear/medal-star">
      <img alt="" className="absolute block inset-0 max-w-none size-full" src={aucMedalStar} />
    </div>
  );
}

export function AucTagIcon() {
  return (
    <div className="overflow-clip relative shrink-0 size-[12px]" data-name="tag_222314 1">
      <div className="absolute inset-[0.01%_0_-0.01%_0]">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={aucTagG1} />
      </div>
      <div className="absolute inset-[15.33%_15.33%_66.53%_66.53%]">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={aucTagG2} />
      </div>
    </div>
  );
}

export function AucCal12Icon() {
  return (
    <div className="overflow-clip relative shrink-0 size-[12px]" data-name="calendar_9883816 1">
      <div className="absolute inset-[2.93%]">
        <div className="absolute inset-[-2.49%]">
          <img alt="" className="block max-w-none size-full" src={aucCal12} />
        </div>
      </div>
    </div>
  );
}

export function AucShareIcon() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="Group">
      <div className="col-1 h-[16px] ml-0 mt-0 relative row-1 w-[15px]">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={aucShare} />
      </div>
    </div>
  );
}

export function AucUncheckedIcon() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="unchecked_142228 1">
      <img alt="" className="absolute block inset-0 max-w-none size-full" src={aucUnchecked} />
    </div>
  );
}

/* Iconex/Light/Lock — locked action indicator */
export function AucLockIcon() {
  return (
    <div className="flex items-center px-[3px] py-[2px] relative shrink-0 w-[38px]" data-name="Iconex/Light/Lock" aria-label="Locked while auction is running">
      <div className="h-[13.5px] relative shrink-0 w-[12px]">
        <div className="absolute inset-[-4.17%_-4.69%]">
          <img alt="" className="block max-w-none size-full" src={aucLock} />
        </div>
      </div>
    </div>
  );
}

export function AucLightningIcon() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Iconex/Light/Lightning">
      <div className="absolute h-[11.667px] left-[2.92px] top-[1.17px] w-[8.167px]">
        <div className="absolute inset-[-1.73%_-1.84%_-1.75%_-1.83%]">
          <img alt="" className="block max-w-none size-full" src={aucLightning} />
        </div>
      </div>
    </div>
  );
}

export function AucStarIcon({ size = 12 }: { size?: number }) {
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }} data-name="vuesax/linear/star">
      <img alt="" className="absolute block inset-0 max-w-none size-full" src={aucStar} />
    </div>
  );
}

/* Blue "Verified" object badge dot (raster) */
export function AucVerifiedObject({ size = 12 }: { size?: number }) {
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }} data-name="Object">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={aucVerified} />
    </div>
  );
}

/* Iconex/Light/Info circle — green info button */
export function AucInfoButton({ onClick, label, size = 16 }: { onClick: () => void; label: string; size?: number }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="bg-[rgba(27,158,116,0.08)] flex flex-col items-center justify-center overflow-clip relative rounded-[12.8px] shrink-0 cursor-pointer"
      style={{ width: size, height: size }}
      data-name="arrow btn"
    >
      <div className="relative shrink-0 size-[9.143px]" data-name="Info Icon">
        <div className="absolute border-[#1b9e74] border-[0.571px] border-solid left-[0.58px] rounded-[13.714px] size-[7.619px] top-[0.58px]" />
        <div className="absolute inset-[29.17%_47.92%_29.17%_43.75%]">
          <div className="absolute inset-[-7.5%_-37.5%_-7.51%_-37.5%]">
            <img alt="" className="block max-w-none size-full" src={aucInfoI} />
          </div>
        </div>
      </div>
    </button>
  );
}

/* Quick Request accept (✓) / decline (✗) buttons */
export function AucCheckButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="bg-[rgba(0,122,85,0.08)] flex items-center justify-center relative rounded-[21px] shrink-0 size-[28px] cursor-pointer"
      data-name="Quick Request Container"
    >
      <div className="relative shrink-0 size-[14px]" data-name="icon-check-2">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={aucCheck} />
      </div>
    </button>
  );
}

export function AucXButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="bg-[rgba(195,9,19,0.08)] flex items-center justify-center relative rounded-[21px] shrink-0 size-[28px] cursor-pointer"
      data-name="Quick Request Container"
    >
      <div className="h-[10.5px] relative shrink-0 w-[8.135px]">
        <div className="absolute inset-[0_-9.52%_-1.58%_0]">
          <img alt="" className="block max-w-none size-full" src={aucX} />
        </div>
      </div>
    </button>
  );
}

/* close cross — bordered circular close button for modals/popovers */
export function AucCloseButton({ onClick, size = 32 }: { onClick: () => void; size?: number }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Close"
      className="border border-[#f5f5f5] border-solid flex items-center justify-center overflow-clip relative rounded-[24px] shrink-0 cursor-pointer"
      style={{ width: size, height: size }}
      data-name="close cross"
    >
      <div className="relative shrink-0" style={{ width: size * 0.3125, height: size * 0.3125 }}>
        <div className="absolute inset-[-6%]">
          <img alt="" className="block max-w-none size-full" src={aucCloseX} />
        </div>
      </div>
    </button>
  );
}

export function AucTrashButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button type="button" onClick={onClick} aria-label={label} className="flex items-center justify-center shrink-0 cursor-pointer size-[24px]">
      <div className="h-[16.742px] relative w-[14.7px]" data-name="Trash can">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={aucTrash} />
      </div>
    </button>
  );
}

export function AucLiveStatusIcon() {
  return (
    <div className="relative shrink-0 size-[16px]">
      <img alt="" className="absolute block inset-0 max-w-none size-full" src={aucLiveStatus} />
    </div>
  );
}

export function AucOverviewIcon() {
  return (
    <div className="h-[14.001px] relative shrink-0 w-[14.436px]" data-name="Group">
      <div className="absolute inset-[-3.11%_0_-3.11%_-3.02%]">
        <img alt="" className="block max-w-none size-full" src={aucOverviewIcon} />
      </div>
    </div>
  );
}

export function AucKycHeaderIcon() {
  return (
    <div className="relative shrink-0 size-[14px]">
      <img alt="" className="absolute block inset-0 max-w-none size-full" src={aucKycIcon} />
    </div>
  );
}

/* "Frame 34" — the status badge overlaid on an auction card's photo.
   Each state is its own Figma variant with a distinct fill, gap, padding and icon:
     active  (215:33965) rgba(27,158,116,0.7)  gap 2  p 8      Icons/Money/Cash/Version-2  15x16
     Closed  (215:33958) rgba(130,130,130,0.8) gap 4  p 8      Icons/Cards/Summer-2        16x16
     Drafted (231:12255) rgba(40,69,157,0.48)  gap 4  px12 py8 Icons/Briefcase/Money-1     13x16 */
export type AuctionBadgeState = "active" | "closed" | "drafted";

export function AuctionStatusBadge({ state }: { state: AuctionBadgeState }) {
  if (state === "active") {
    return (
      <div className="bg-[rgba(27,158,116,0.7)] flex gap-[2px] h-[24px] items-center justify-center p-[8px] relative rounded-[24px]" data-name="Frame 34">
        <div className="h-[16px] relative shrink-0 w-[15px]" data-name="Icons/Money/Cash/Version-2">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={aucBadgeActive} />
        </div>
        <div className="[word-break:break-word] flex flex-col font-cairo font-bold justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-white whitespace-nowrap">
          <p className="leading-[normal]">active</p>
        </div>
      </div>
    );
  }
  if (state === "drafted") {
    return (
      <div className="bg-[rgba(40,69,157,0.48)] flex gap-[4px] h-[24px] items-center justify-center px-[12px] py-[8px] relative rounded-[24px]" data-name="Frame 34">
        <div className="h-[16px] relative shrink-0 w-[13px]" data-name="Icons/Briefcase/Money-1">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <img alt="" className="absolute h-[123.47%] left-[-21.87%] max-w-none top-[-10.89%] w-[149.6%]" src={aucBadgeDraft} />
          </div>
        </div>
        <div className="[word-break:break-word] flex flex-col font-cairo font-bold justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-white whitespace-nowrap">
          <p className="leading-[normal]">Drafted</p>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-[rgba(130,130,130,0.8)] flex gap-[4px] h-[24px] items-center justify-center p-[8px] relative rounded-[24px]" data-name="Frame 34">
      <div className="relative shrink-0 size-[16px]" data-name="Icons/Cards/Summer-2">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute left-[-6.44%] max-w-none size-[120%] top-[-8.66%]" src={aucBadgeClosed} />
        </div>
      </div>
      <div className="[word-break:break-word] flex flex-col font-cairo font-bold justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-white whitespace-nowrap">
        <p className="leading-[normal]">{`Closed `}</p>
      </div>
    </div>
  );
}
