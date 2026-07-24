import swap3 from "../assets/figma/swap3.svg";
import dashWhite from "../assets/figma/dashWhite.svg";
import dashArrow19 from "../assets/figma/dashArrow19.svg";
import siteG3161 from "../assets/figma/siteG3161.svg";
import siteG3173 from "../assets/figma/siteG3173.svg";
import siteG3174 from "../assets/figma/siteG3174.svg";
import siteG3177 from "../assets/figma/siteG3177.svg";
import siteG3181 from "../assets/figma/siteG3181.svg";
import siteG3185 from "../assets/figma/siteG3185.svg";
import siteG3197 from "../assets/figma/siteG3197.svg";
import siteG3201 from "../assets/figma/siteG3201.svg";
import siteG3205 from "../assets/figma/siteG3205.svg";
import siteG3209 from "../assets/figma/siteG3209.svg";
import bidderUp from "../assets/figma/bidderUp.svg";
import actionArrow from "../assets/figma/actionArrow.svg";
import deadlineVector from "../assets/figma/deadlineVector.svg";
import deadlineG19 from "../assets/figma/deadlineG19.svg";
import deadlineG20 from "../assets/figma/deadlineG20.svg";

/* Iconex/Light/Swap 3 — filter reset icon */
export function Swap3Icon({ className }: { className?: string }) {
  return (
    <div className={className || "relative size-[24px]"} data-name="Iconex/Light/Swap 3">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-[22.625px] relative w-[23.187px]" data-name="Swap 3">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={swap3} />
        </div>
      </div>
    </div>
  );
}

/* Dashboard grid icon in WHITE (active sidebar pill) — 14×14 */
export function DashboardIconWhite() {
  return (
    <div className="overflow-clip relative shrink-0 size-[14px]" data-name="visualization_553264">
      <div className="absolute contents inset-[52.93%_52.93%_0_0]" data-name="Group">
        <div className="absolute inset-[52.93%_52.93%_0_0]" data-name="Group">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={dashWhite} />
        </div>
      </div>
      <div className="absolute contents inset-[0_52.93%_52.93%_0]" data-name="Group">
        <div className="absolute inset-[0_52.93%_52.93%_0]" data-name="Group">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={dashWhite} />
        </div>
      </div>
      <div className="absolute contents inset-[52.93%_0_0_52.93%]" data-name="Group">
        <div className="absolute inset-[52.93%_0_0_52.93%]" data-name="Group">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={dashWhite} />
        </div>
      </div>
      <div className="absolute contents inset-[0_0_52.93%_52.93%]" data-name="Group">
        <div className="absolute inset-[0_0_52.93%_52.93%]" data-name="Group">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={dashWhite} />
        </div>
      </div>
    </div>
  );
}

/* Filter pill chevron — 19.2px arrow pointing down */
export function FilterPillArrow() {
  return (
    <div className="flex items-center justify-center relative shrink-0">
      <div className="-scale-y-100 flex-none rotate-180">
        <div className="relative size-[19.2px]" data-name="Category Arrow Icon">
          <div className="absolute contents inset-0" data-name="vuesax/linear/arrow-down">
            <div className="absolute inset-[0_0.01%_0_-0.01%]" data-name="arrow-down">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={dashArrow19} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Sites filter icon — 12×12 masked composite (g3159) */
export function SitesIcon() {
  return (
    <div className="flex items-center justify-center relative shrink-0">
      <div className="-scale-y-100 flex-none">
        <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative" data-name="g3159">
          <div className="col-1 h-0 ml-[1.76px] mt-[7.43px] relative row-1 w-[8.484px]" data-name="g3161">
            <div className="absolute inset-[-0.35px_0]">
              <img alt="" className="block max-w-none size-full" src={siteG3161} />
            </div>
          </div>
          <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] ml-0 mt-0 place-items-start relative row-1" data-name="g3165">
            <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative row-1" data-name="Clip path group">
              <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-[1.76px] mt-[0.35px] place-items-start relative row-1" data-name="g3167">
                <div className="col-1 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-1.758px_-3.163px] mask-size-[12px_12px] ml-0 mt-0 relative row-1 size-[8.484px]" style={{ maskImage: `url("${siteG3173}")` }} data-name="g3173">
                  <div className="absolute inset-[0_-4.14%_-4.15%_-4.14%]">
                    <img alt="" className="block max-w-none size-full" src={siteG3174} />
                  </div>
                </div>
                <div className="col-1 h-[1.891px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-3.164px_-9.757px] mask-size-[12px_12px] ml-[1.41px] mt-0 relative row-1 w-[5.672px]" style={{ maskImage: `url("${siteG3173}")` }} data-name="g3177">
                  <div className="absolute inset-[0_-6.2%_-18.61%_-6.2%]">
                    <img alt="" className="block max-w-none size-full" src={siteG3177} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-1 h-[1.891px] ml-[4.11px] mt-[2.24px] relative row-1 w-[3.781px]" data-name="g3181">
            <div className="absolute inset-[0_-9.3%_-18.61%_-9.3%]">
              <img alt="" className="block max-w-none size-full" src={siteG3181} />
            </div>
          </div>
          <div className="col-1 ml-[5.05px] mt-[4.13px] relative row-1 size-[1.891px]" data-name="g3185">
            <div className="absolute inset-[0_-18.59%_-18.61%_-18.6%]">
              <img alt="" className="block max-w-none size-full" src={siteG3185} />
            </div>
          </div>
          <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] ml-0 mt-0 place-items-start relative row-1" data-name="g3189">
            <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative row-1" data-name="Clip path group">
              <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-[0.35px] mt-[0.35px] place-items-start relative row-1" data-name="g3191">
                <div className="col-1 h-[11.285px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-0.352px_-0.362px] mask-size-[12px_12px] ml-0 mt-0 relative row-1 w-[11.297px]" style={{ maskImage: `url("${siteG3173}")` }} data-name="g3197">
                  <div className="absolute inset-[-3.11%_-3.11%_-3.21%_-3.11%]">
                    <img alt="" className="block max-w-none size-full" src={siteG3197} />
                  </div>
                </div>
                <div className="col-1 h-[1.891px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-5.055px_-9.757px] mask-size-[12px_12px] ml-[4.7px] mt-0 relative row-1 w-0" style={{ maskImage: `url("${siteG3173}")` }} data-name="g3201">
                  <div className="absolute inset-[0_-0.35px]">
                    <img alt="" className="block max-w-none size-full" src={siteG3201} />
                  </div>
                </div>
                <div className="col-1 h-[1.891px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-6.945px_-9.757px] mask-size-[12px_12px] ml-[6.59px] mt-0 relative row-1 w-0" style={{ maskImage: `url("${siteG3173}")` }} data-name="g3205">
                  <div className="absolute inset-[0_-0.35px]">
                    <img alt="" className="block max-w-none size-full" src={siteG3205} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-1 h-[1.891px] ml-[6px] mt-[2.24px] relative row-1 w-0" data-name="g3209">
            <div className="absolute inset-[0_-0.35px]">
              <img alt="" className="block max-w-none size-full" src={siteG3209} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Bidders trend arrow — 10×9 green */
export function BidderUpIcon() {
  return (
    <div className="h-[9px] mr-[-1px] overflow-clip relative shrink-0 w-[10px]" data-name="Frame 37/arrow/Property 24">
      <div className="absolute bottom-[20.83%] left-1/4 right-1/4 top-[22.56%]" data-name="Icon">
        <div className="absolute inset-[-8.18%_-8.33%]">
          <img alt="" className="block max-w-none size-full" src={bidderUp} />
        </div>
      </div>
    </div>
  );
}

/* Auction row action — 24px blue circle with white arrow */
export function ActionArrowButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button type="button" onClick={onClick} className="flex items-center justify-center relative shrink-0 cursor-pointer" aria-label={label}>
      <div className="-scale-y-100 flex-none rotate-180">
        <div className="bg-[#2a459d] content-stretch flex items-center justify-center overflow-clip p-[10.309px] relative rounded-[15.463px] size-[24px]" data-name="arrow/up left">
          <div className="relative shrink-0 size-[6.378px]" data-name="Icon">
            <div className="absolute inset-[-7.06%]">
              <img alt="" className="block max-w-none size-full" src={actionArrow} />
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}

/* deadline_9708281 1 — 12×12 report header icon */
export function DeadlineIcon() {
  return (
    <div className="overflow-clip relative shrink-0 size-[12px]" data-name="deadline_9708281 1">
      <div className="absolute contents inset-[0_3.03%_2.92%_3.03%]" data-name="Group">
        <div className="absolute contents inset-[33.93%_49.15%_30.34%_37.25%]" data-name="Group">
          <div className="absolute contents inset-[33.93%_49.15%_30.35%_37.25%]" data-name="Group">
            <div className="absolute inset-[41.16%_49.15%_37.66%_37.25%]" data-name="Vector">
              <div className="absolute inset-[-13.79%_-21.49%]">
                <img alt="" className="block max-w-none size-full" src={deadlineVector} />
              </div>
            </div>
            <div className="absolute contents inset-[33.93%_55.95%_30.35%_44.05%]" data-name="Group">
              <div className="absolute inset-[33.92%_55.95%_30.36%_44.05%]" data-name="Group">
                <div className="absolute inset-[0_-0.35px]">
                  <img alt="" className="block max-w-none size-full" src={deadlineG19} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-[0_3.03%_2.92%_3.03%]" data-name="Group">
          <div className="absolute inset-[0_-3.11%_-3.01%_-3.11%]">
            <img alt="" className="block max-w-none size-full" src={deadlineG20} />
          </div>
        </div>
      </div>
    </div>
  );
}
