import arrowDown19 from "../assets/figma/arrowDown19.svg";
import arrowDown14 from "../assets/figma/arrowDown14.svg";
import tagIcon1 from "../assets/figma/tagIcon1.svg";
import tagIcon2 from "../assets/figma/tagIcon2.svg";
import line15 from "../assets/figma/line15.svg";
import profileIcon from "../assets/figma/profileIcon.svg";
import calendar12 from "../assets/figma/calendar12.svg";
import productIcon from "../assets/figma/productIcon.svg";
import agG4526 from "../assets/figma/agG4526.svg";
import agG4530 from "../assets/figma/agG4530.svg";
import agG4534 from "../assets/figma/agG4534.svg";
import agG4538 from "../assets/figma/agG4538.svg";
import agG4550 from "../assets/figma/agG4550.svg";
import agG4551 from "../assets/figma/agG4551.svg";
import agG4554 from "../assets/figma/agG4554.svg";
import agG4558 from "../assets/figma/agG4558.svg";
import agG4562 from "../assets/figma/agG4562.svg";
import agG4566 from "../assets/figma/agG4566.svg";
import agG4570 from "../assets/figma/agG4570.svg";
import agG4574 from "../assets/figma/agG4574.svg";
import agG4578 from "../assets/figma/agG4578.svg";
import agG4582 from "../assets/figma/agG4582.svg";
import moneyWithdrawal from "../assets/figma/moneyWithdrawal.svg";
import copyIcon from "../assets/figma/copyIcon.svg";
import closeX20 from "../assets/figma/closeX20.svg";
import closeX10 from "../assets/figma/closeX10.svg";
import biddingIcon from "../assets/figma/biddingIcon.svg";
import locationIcon1 from "../assets/figma/locationIcon1.svg";
import locationIcon2 from "../assets/figma/locationIcon2.svg";
import locationIcon3 from "../assets/figma/locationIcon3.svg";
import dropdownMask from "../assets/figma/dropdownMask.svg";
import dropdownFill from "../assets/figma/dropdownFill.svg";
import trashCan from "../assets/figma/trashCan.svg";
import tickSquare from "../assets/figma/tickSquare.svg";
import tickSquare2 from "../assets/figma/tickSquare2.svg";

/* vuesax/linear/arrow-down rendered at 19.2px, rotated to point left (back arrow) */
export function BackArrowIcon() {
  return (
    <div className="flex items-center justify-center relative shrink-0 size-[19.2px]">
      <div className="-rotate-90 -scale-y-100 flex-none">
        <div className="relative size-[19.2px]" data-name="Arrow Icon">
          <div className="absolute contents inset-0" data-name="vuesax/linear/arrow-down">
            <div className="absolute inset-[0_0.01%_0_-0.01%]" data-name="arrow-down">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={arrowDown19} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* 24px round chevron button — bg rgba(40,69,157,0.1); expanded points up, collapsed points down */
export function CircleChevronButton({ expanded }: { expanded: boolean }) {
  return (
    <div className="flex items-center justify-center relative shrink-0 size-[24px]">
      <div className={`${expanded ? "rotate-90" : "-rotate-90 -scale-y-100"} flex-none transition-transform duration-300`}>
        <div className="bg-[rgba(40,69,157,0.1)] content-stretch flex items-center justify-center p-[6px] relative rounded-[18px] size-[24px]">
          <div className="flex items-center justify-center relative shrink-0 size-[14.4px]">
            <div className="-rotate-90 -scale-y-100 flex-none">
              <div className="content-stretch flex gap-[6px] items-center relative" data-name="Right Icons">
                <div className="relative shrink-0 size-[14.4px]" data-name="vuesax/linear/arrow-down">
                  <div className="absolute contents inset-0" data-name="vuesax/linear/arrow-down">
                    <div className="absolute inset-[0_0.01%_0_-0.01%]" data-name="arrow-down">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={arrowDown14} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* tag_222314 1 — 14×14 */
export function TagIcon() {
  return (
    <div className="overflow-clip relative shrink-0 size-[14px]" data-name="tag_222314 1">
      <div className="absolute contents inset-0" data-name="Group">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={tagIcon1} />
      </div>
      <div className="absolute contents inset-[15.33%_15.33%_66.53%_66.53%]" data-name="Group">
        <div className="absolute inset-[15.33%_15.33%_66.53%_66.53%]" data-name="Group">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={tagIcon2} />
        </div>
      </div>
    </div>
  );
}

/* vuesax/linear/profile — 14×14 white */
export function ProfileIcon() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="vuesax/linear/profile">
      <div className="absolute contents inset-0" data-name="vuesax/linear/profile">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={profileIcon} />
      </div>
    </div>
  );
}

/* calendar_9883816 1 — 12×12 white */
export function Calendar12Icon() {
  return (
    <div className="overflow-clip relative shrink-0 size-[12px]" data-name="calendar_9883816 1">
      <div className="absolute inset-[2.93%]" data-name="Group">
        <div className="absolute inset-[-2.49%]">
          <img alt="" className="block max-w-none size-full" src={calendar12} />
        </div>
      </div>
    </div>
  );
}

/* Vertical white gradient divider inside the blue banner */
export function BannerDivider() {
  return (
    <div className="hidden md:flex flex-[1_0_0] h-[17px] items-center justify-center min-w-px relative" style={{ containerType: "size" }}>
      <div className="flex-none h-[100cqw] rotate-90">
        <div className="h-full relative w-[17px]">
          <div className="absolute inset-[-1px_0_0_0]">
            <img alt="" className="block max-w-none size-full" src={line15} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* product_9288207 1 — dark product/box icon (14px in section headers, 12px in auction cards) */
export function ProductIcon({ size = 14 }: { size?: 12 | 14 }) {
  return (
    <div className={`overflow-clip relative shrink-0 ${size === 14 ? "size-[14px]" : "size-[12px]"}`} data-name="product_9288207 1">
      <div className="absolute inset-[3.38%_9.63%]" data-name="Group">
        <div className={size === 14 ? "absolute inset-[-3.24%]" : "absolute inset-[-3.78%]"}>
          <img alt="" className="block max-w-none size-full" src={productIcon} />
        </div>
      </div>
    </div>
  );
}

/* agreement_4522676 2 — 14×14 masked composite icon */
export function AgreementIcon() {
  return (
    <div className="overflow-clip relative shrink-0 size-[14px]" data-name="agreement_4522676 2">
      <div className="absolute contents inset-[-0.02%_0_0.02%_0]" style={{ containerType: "size" }} data-name="g4524">
        <div className="absolute flex inset-[61.9%_82.42%_38.1%_11.72%] items-center justify-center" style={{ containerType: "size" }}>
          <div className="-rotate-180 -scale-x-100 flex-none h-[0px] w-[100cqw]">
            <div className="relative size-full" data-name="g4526">
              <div className="absolute inset-[-0.35px_0]">
                <img alt="" className="block max-w-none size-full" src={agG4526} />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute flex inset-[61.9%_35.15%_38.1%_23.44%] items-center justify-center" style={{ containerType: "size" }}>
          <div className="-rotate-180 -scale-x-100 flex-none h-[0px] w-[100cqw]">
            <div className="relative size-full" data-name="g4530">
              <div className="absolute inset-[-0.35px_0]">
                <img alt="" className="block max-w-none size-full" src={agG4530} />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute flex inset-[73.62%_35.15%_26.38%_11.72%] items-center justify-center" style={{ containerType: "size" }}>
          <div className="-rotate-180 -scale-x-100 flex-none h-[0px] w-[100cqw]">
            <div className="relative size-full" data-name="g4534">
              <div className="absolute inset-[-0.35px_0]">
                <img alt="" className="block max-w-none size-full" src={agG4534} />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute flex inset-[85.34%_35.15%_14.66%_11.72%] items-center justify-center" style={{ containerType: "size" }}>
          <div className="-rotate-180 -scale-x-100 flex-none h-[0px] w-[100cqw]">
            <div className="relative size-full" data-name="g4538">
              <div className="absolute inset-[-0.35px_0]">
                <img alt="" className="block max-w-none size-full" src={agG4538} />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute contents inset-[-0.02%_0_0.02%_0]" style={{ containerType: "size" }} data-name="g4542">
          <div className="absolute contents inset-[-0.03%_0_0.03%_0]" style={{ containerType: "size" }} data-name="Clip path group">
            <div className="absolute contents inset-[2.91%_2.93%_2.95%_2.93%]" style={{ containerType: "size" }} data-name="g4544">
              <div className="absolute flex inset-[61.89%_2.93%_2.96%_61.92%] items-center justify-center" style={{ containerType: "size" }}>
                <div className="-rotate-180 -scale-x-100 flex-none h-[100cqh] w-[100cqw]">
                  <div className="mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-8.668px_-8.668px] mask-size-[14px_14px] relative size-full" style={{ maskImage: `url("${agG4550}")` }} data-name="g4550">
                    <div className="absolute inset-[-7.13%_-7.14%_-7.16%_-7.14%]">
                      <img alt="" className="block max-w-none size-full" src={agG4551} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute flex inset-[70.68%_11.71%_20.54%_79.5%] items-center justify-center" style={{ containerType: "size" }}>
                <div className="-rotate-180 -scale-x-100 flex-none h-[100cqh] w-[100cqw]">
                  <div className="mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-11.129px_-9.898px] mask-size-[14px_14px] relative size-full" style={{ maskImage: `url("${agG4550}")` }} data-name="g4554">
                    <div className="absolute inset-[-28.52%_0_0_-28.56%]">
                      <img alt="" className="block max-w-none size-full" src={agG4554} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute flex inset-[20.48%_26.36%_37.11%_73.64%] items-center justify-center" style={{ containerType: "size" }}>
                <div className="-rotate-180 -scale-x-100 flex-none h-[100cqh] w-[0px]">
                  <div className="mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-10.309px_-2.87px] mask-size-[14px_14px] relative size-full" style={{ maskImage: `url("${agG4550}")` }} data-name="g4558">
                    <div className="absolute inset-[0_-0.35px]">
                      <img alt="" className="block max-w-none size-full" src={agG4558} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute flex inset-[2.9%_17.57%_2.96%_2.93%] items-center justify-center" style={{ containerType: "size" }}>
                <div className="-rotate-180 -scale-x-100 flex-none h-[100cqh] w-[100cqw]">
                  <div className="mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-0.41px_-0.41px] mask-size-[14px_14px] relative size-full" style={{ maskImage: `url("${agG4550}")` }} data-name="g4562">
                    <div className="absolute inset-[-2.66%_0_-2.67%_-3.16%]">
                      <img alt="" className="block max-w-none size-full" src={agG4562} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute flex inset-[20.48%_55.66%_67.8%_32.62%] items-center justify-center" style={{ containerType: "size" }}>
                <div className="-rotate-180 -scale-x-100 flex-none h-[100cqh] w-[100cqw]">
                  <div className="mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-4.567px_-2.871px] mask-size-[14px_14px] relative size-full" style={{ maskImage: `url("${agG4550}")` }} data-name="g4566">
                    <div className="absolute inset-[-21.39%_-21.43%_-21.47%_-21.42%]">
                      <img alt="" className="block max-w-none size-full" src={agG4566} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute flex inset-[32.2%_55.66%_56.08%_32.62%] items-center justify-center" style={{ containerType: "size" }}>
                <div className="-rotate-180 -scale-x-100 flex-none h-[100cqh] w-[100cqw]">
                  <div className="mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-4.567px_-4.512px] mask-size-[14px_14px] relative size-full" style={{ maskImage: `url("${agG4550}")` }} data-name="g4570">
                    <div className="absolute inset-[-21.39%_-21.43%_-21.47%_-21.42%]">
                      <img alt="" className="block max-w-none size-full" src={agG4570} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute flex inset-[11.69%_61.52%_79.52%_38.48%] items-center justify-center" style={{ containerType: "size" }}>
                <div className="-rotate-180 -scale-x-100 flex-none h-[100cqh] w-[0px]">
                  <div className="mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-5.387px_-1.641px] mask-size-[14px_14px] relative size-full" style={{ maskImage: `url("${agG4550}")` }} data-name="g4574">
                    <div className="absolute inset-[0_-0.35px]">
                      <img alt="" className="block max-w-none size-full" src={agG4574} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute flex inset-[43.92%_61.52%_47.29%_38.48%] items-center justify-center" style={{ containerType: "size" }}>
                <div className="-rotate-180 -scale-x-100 flex-none h-[100cqh] w-[0px]">
                  <div className="mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-5.387px_-6.152px] mask-size-[14px_14px] relative size-full" style={{ maskImage: `url("${agG4550}")` }} data-name="g4578">
                    <div className="absolute inset-[0_-0.35px]">
                      <img alt="" className="block max-w-none size-full" src={agG4578} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute flex inset-[2.9%_8.79%_79.52%_73.64%] items-center justify-center" style={{ containerType: "size" }}>
                <div className="-rotate-180 -scale-x-100 flex-none h-[100cqh] w-[100cqw]">
                  <div className="mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-10.309px_-0.41px] mask-size-[14px_14px] relative size-full" style={{ maskImage: `url("${agG4550}")` }} data-name="g4582">
                    <div className="absolute inset-[-14.26%_-14.29%_-14.31%_-14.28%]">
                      <img alt="" className="block max-w-none size-full" src={agG4582} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* money-withdrawal_3959892 1 — 14×14 modal header icon */
export function MoneyWithdrawalIcon() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="Group">
      <div className="col-1 ml-0 mt-0 overflow-clip relative row-1 size-[14px]" data-name="money-withdrawal_3959892 1">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={moneyWithdrawal} />
      </div>
    </div>
  );
}

/* Hidden "Copy Link" affordance kept from Figma (opacity-0) */
export function CopyLink() {
  return (
    <div className="border-[#28459d] border-b border-solid content-stretch flex gap-[8px] items-center opacity-0 pb-[4px] relative shrink-0">
      <div className="relative shrink-0 size-[16px]" data-name="copy">
        <div className="absolute inset-[8.33%_16.67%]" data-name="Icon">
          <div className="absolute inset-[-7.5%_-9.38%]">
            <img alt="" className="block max-w-none size-full" src={copyIcon} />
          </div>
        </div>
      </div>
      <div className="[word-break:break-word] flex flex-col font-cairo font-medium h-[17px] justify-center leading-[0] not-italic relative shrink-0 text-[#28459d] text-[16px] w-[65px]">
        <p className="leading-[normal]">Copy Link</p>
      </div>
    </div>
  );
}

/* Large plain X close button — 20×20 (type picker / new money modals) */
export function CloseX20Button({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="block cursor-pointer relative shrink-0 size-[20px]" aria-label="Close" data-name="unchecked_142228 1">
      <img alt="" className="absolute block inset-0 max-w-none size-full" src={closeX20} />
    </button>
  );
}

/* Bordered round close button — 32×32 with 10px X icon */
export function CloseCrossButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="border border-[#f5f5f5] border-solid content-stretch flex items-center justify-center overflow-clip p-[8px] relative rounded-[24px] shrink-0 size-[32px] cursor-pointer"
      aria-label="Close"
      data-name="close cross"
    >
      <div className="relative shrink-0 size-[10px]" data-name="Icon">
        <div className="absolute inset-[-6%]">
          <img alt="" className="block max-w-none size-full" src={closeX10} />
        </div>
      </div>
    </button>
  );
}

/* bidding_1203608 1 — 12×12 */
export function BiddingIcon() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="bidding_1203608 1">
      <img alt="" className="absolute block inset-0 max-w-none size-full" src={biddingIcon} />
    </div>
  );
}

/* placeholder_330864 (2) 1 — 12×12 location pin */
export function LocationIcon() {
  return (
    <div className="overflow-clip relative shrink-0 size-[12px]" data-name="placeholder_330864 (2) 1">
      <div className="absolute contents inset-[-0.01%_13.71%_0.01%_13.71%]" data-name="Group">
        <div className="absolute inset-[-0.01%_13.71%_0.01%_13.71%]" data-name="Group">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={locationIcon1} />
        </div>
      </div>
      <div className="absolute contents inset-[19.83%_33.56%_47.28%_33.56%]" data-name="Group">
        <div className="absolute inset-[19.83%_33.56%_47.28%_33.56%]" data-name="Group">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={locationIcon2} />
        </div>
      </div>
      <div className="absolute bottom-[63.73%] contents left-1/2 right-[23.63%] top-[9.91%]" data-name="Group">
        <div className="absolute bottom-[63.72%] left-1/2 right-[23.63%] top-[9.91%]" data-name="Group">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={locationIcon3} />
        </div>
      </div>
    </div>
  );
}

/* Navigation / arrow drop_down — 24×24 masked chevron */
export function DropdownArrowIcon() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Navigation / arrow drop_down">
      <div
        className="absolute inset-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[5px_8px] mask-size-[14px_8px]"
        style={{ maskImage: `url("${dropdownMask}")` }}
        data-name="Color Fill"
      >
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={dropdownFill} />
      </div>
    </div>
  );
}

/* Delete Icon — 14.4px trash can */
export function TrashCanIcon() {
  return (
    <div className="relative shrink-0 size-[14.4px]" data-name="Delete Icon">
      <div className="absolute h-[11.399px] left-[1.8px] top-[1.8px] w-[10.8px]" data-name="Trash can">
        <div className="absolute inset-[-3.95%_0_-3.94%_0]">
          <img alt="" className="block max-w-none size-full" src={trashCan} />
        </div>
      </div>
    </div>
  );
}

/* vuesax/linear/tick-square — 24×24 checkbox (unchecked gray / checked blue) */
export function TickSquare({ checked }: { checked: boolean }) {
  return (
    <div className="absolute contents inset-0" data-name="vuesax/linear/tick-square">
      <img alt="" className="absolute block inset-0 max-w-none size-full" src={checked ? tickSquare2 : tickSquare} />
    </div>
  );
}
