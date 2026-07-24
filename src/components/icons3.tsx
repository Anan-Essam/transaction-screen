import categoryIcon from "../assets/figma/categoryIcon.svg";
import ellipseDot from "../assets/figma/ellipseDot.svg";
import arrowGreen from "../assets/figma/arrowGreen.svg";
import arrowBlue from "../assets/figma/arrowBlue.svg";
import arrowWhite from "../assets/figma/arrowWhite.svg";
import uniquenessIcon from "../assets/figma/uniquenessIcon.svg";
import colorPaletteIcon from "../assets/figma/colorPaletteIcon.svg";
import scales1 from "../assets/figma/scales1.svg";
import scales2 from "../assets/figma/scales2.svg";
import scales3 from "../assets/figma/scales3.svg";
import scales4 from "../assets/figma/scales4.svg";
import priceIcon from "../assets/figma/priceIcon.svg";
import cubeIcon from "../assets/figma/cubeIcon.svg";
import surveyG952 from "../assets/figma/surveyG952.svg";
import surveyG953 from "../assets/figma/surveyG953.svg";
import surveyG964 from "../assets/figma/surveyG964.svg";
import surveyG968 from "../assets/figma/surveyG968.svg";
import surveyG972 from "../assets/figma/surveyG972.svg";
import surveyG976 from "../assets/figma/surveyG976.svg";
import surveyG980 from "../assets/figma/surveyG980.svg";
import trashCan24 from "../assets/figma/trashCan24.svg";
import editIcon from "../assets/figma/editIcon.svg";
import uploadIcon from "../assets/figma/uploadIcon.svg";
import plG1204w from "../assets/figma/plG1204w.svg";
import plG1205w from "../assets/figma/plG1205w.svg";
import plG1208w from "../assets/figma/plG1208w.svg";
import plG1220w from "../assets/figma/plG1220w.svg";
import plG1230w from "../assets/figma/plG1230w.svg";
import transG4dark from "../assets/figma/transG4dark.svg";
import transG5dark from "../assets/figma/transG5dark.svg";

/* Category filter icon — 13.45×12 */
export function CategoryIcon() {
  return (
    <div className="h-[12px] relative shrink-0 w-[13.45px]" data-name="Group">
      <div className="absolute inset-[-3.49%_-3.11%]">
        <img alt="" className="block max-w-none size-full" src={categoryIcon} />
      </div>
    </div>
  );
}

/* 4px separator dot in product row subtitle */
export function EllipseDot() {
  return (
    <div className="relative shrink-0 size-[4px]">
      <img alt="" className="absolute block inset-0 max-w-none size-full" src={ellipseDot} />
    </div>
  );
}

/* Product row chevron — selected: green, pointing left; unselected: blue, pointing right */
export function ProductRowChevron({ selected }: { selected: boolean }) {
  const inner = (
    <div className={`${selected ? "bg-[rgba(27,158,116,0.1)]" : "bg-[rgba(40,69,157,0.1)]"} content-stretch flex items-center justify-center p-[6px] relative rounded-[18px] ${selected ? "shrink-0 " : ""}size-[24px]`}>
      <div className="flex items-center justify-center relative shrink-0 size-[14.4px]">
        <div className="-rotate-90 -scale-y-100 flex-none">
          <div className="content-stretch flex gap-[6px] items-center relative" data-name="Right Icons">
            <div className="relative shrink-0 size-[14.4px]" data-name="vuesax/linear/arrow-down">
              <div className="absolute contents inset-0" data-name="vuesax/linear/arrow-down">
                <div className="absolute inset-[0_0.01%_0_-0.01%]" data-name="arrow-down">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={selected ? arrowGreen : arrowBlue} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  return selected ? (
    inner
  ) : (
    <div className="flex items-center justify-center relative shrink-0">
      <div className="-scale-y-100 flex-none rotate-180">{inner}</div>
    </div>
  );
}

/* Image carousel arrow buttons — 32px round, white arrow */
export function CarouselArrow({ direction }: { direction: "prev" | "next" }) {
  return (
    <div className={`${direction === "prev" ? "bg-[rgba(255,255,255,0.1)]" : "bg-[#28459d]"} content-stretch flex items-center justify-center p-[8px] relative rounded-[24px] shrink-0 size-[32px]`}>
      <div className="flex items-center justify-center relative shrink-0 size-[19.2px]">
        <div className={`${direction === "prev" ? "-rotate-90 -scale-y-100" : "-scale-y-100 rotate-90"} flex-none`}>
          <div className="relative size-[19.2px]" data-name="vuesax/linear/arrow-down">
            <div className="absolute contents inset-0" data-name="vuesax/linear/arrow-down">
              <div className="absolute inset-[0_0.01%_0_-0.01%]" data-name="arrow-down">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={arrowWhite} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* uniqueness_11427211 (2) 1 — 12×12 */
export function UniquenessIcon() {
  return (
    <div className="overflow-clip relative shrink-0 size-[12px]" data-name="uniqueness_11427211 (2) 1">
      <div className="absolute inset-[2.93%_2.92%_2.93%_2.94%]" data-name="Group">
        <div className="absolute inset-[-3.24%]">
          <img alt="" className="block max-w-none size-full" src={uniquenessIcon} />
        </div>
      </div>
    </div>
  );
}

/* color-palette_1812482 1 — 12×12 */
export function ColorPaletteIcon() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="color-palette_1812482 1">
      <img alt="" className="absolute block inset-0 max-w-none size-full" src={colorPaletteIcon} />
    </div>
  );
}

/* scales_1039579 1 — 12×12 */
export function ScalesIcon() {
  return (
    <div className="overflow-clip relative shrink-0 size-[12px]" data-name="scales_1039579 1">
      <div className="absolute contents inset-[71.97%_10.55%_0_10.52%]" data-name="Group">
        <div className="absolute inset-[71.97%_10.55%_0_10.52%]" data-name="Group">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={scales1} />
        </div>
      </div>
      <div className="absolute contents inset-[-0.01%_10.51%_31.47%_10.59%]" data-name="Group">
        <div className="absolute inset-[-0.01%_10.51%_31.47%_10.59%]" data-name="Group">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={scales2} />
        </div>
      </div>
      <div className="absolute contents inset-[14.04%_50.21%_75.59%_42.36%]" data-name="Group">
        <div className="absolute inset-[14.04%_50.21%_75.59%_42.36%]" data-name="Group">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={scales3} />
        </div>
      </div>
      <div className="absolute contents inset-[16.82%_42.39%_72.42%_49.67%]" data-name="Group">
        <div className="absolute inset-[16.82%_42.39%_72.42%_49.67%]" data-name="Group">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={scales4} />
        </div>
      </div>
    </div>
  );
}

/* price_4581967 1 — 12.5×12.5 */
export function PriceIcon() {
  return (
    <div className="relative shrink-0 size-[12.502px]" data-name="price_4581967 1">
      <img alt="" className="absolute block inset-0 max-w-none size-full" src={priceIcon} />
    </div>
  );
}

/* cube_3230859 1 — 12×12 */
export function CubeIcon() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="cube_3230859 1">
      <img alt="" className="absolute block inset-0 max-w-none size-full" src={cubeIcon} />
    </div>
  );
}

/* survey_3410108 1 — 12×12 masked composite */
export function SurveyIcon() {
  return (
    <div className="overflow-clip relative shrink-0 size-[12px]" data-name="survey_3410108 1">
      <div className="absolute contents inset-[0_-0.01%_0_0.01%]" style={{ containerType: "size" }} data-name="g948">
        <div className="absolute contents inset-[0_-0.01%_0_0.01%]" style={{ containerType: "size" }} data-name="g950">
          <div className="absolute contents inset-[0_-0.01%_0_0.01%]" style={{ containerType: "size" }} data-name="Clip path group">
            <div className="absolute flex inset-[3%_18.54%_3%_18.56%] items-center justify-center" style={{ containerType: "size" }}>
              <div className="-rotate-180 -scale-x-100 flex-none h-[100cqh] w-[100cqw]">
                <div className="mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-2.226px_-0.361px] mask-size-[12px_12px] relative size-full" style={{ maskImage: `url("${surveyG952}")` }} data-name="g952">
                  <div className="absolute inset-[-3.12%_-4.66%_-3.13%_-4.66%]">
                    <img alt="" className="block max-w-none size-full" src={surveyG953} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute flex inset-[36.52%_56.44%_52.74%_29.89%] items-center justify-center" style={{ containerType: "size" }}>
            <div className="-rotate-180 -scale-x-100 flex-none h-[100cqh] w-[100cqw]">
              <div className="relative size-full" data-name="g964">
                <div className="absolute inset-[-43.36%_-16.58%_-17.28%_-16.74%]">
                  <img alt="" className="block max-w-none size-full" src={surveyG964} />
                </div>
              </div>
            </div>
          </div>
          <div className="absolute flex inset-[62.48%_57.16%_25.02%_30.34%] items-center justify-center" style={{ containerType: "size" }}>
            <div className="-rotate-180 -scale-x-100 flex-none h-[100cqh] w-[100cqw]">
              <div className="relative size-full" data-name="g968">
                <div className="absolute inset-[-16.57%]">
                  <img alt="" className="block max-w-none size-full" src={surveyG968} />
                </div>
              </div>
            </div>
          </div>
          <div className="absolute flex inset-[62.48%_57.16%_25.02%_30.34%] items-center justify-center" style={{ containerType: "size" }}>
            <div className="-rotate-180 -scale-x-100 flex-none h-[100cqh] w-[100cqw]">
              <div className="relative size-full" data-name="g972">
                <div className="absolute inset-[-16.57%]">
                  <img alt="" className="block max-w-none size-full" src={surveyG972} />
                </div>
              </div>
            </div>
          </div>
          <div className="absolute flex inset-[44.4%_27.92%_55.6%_51.77%] items-center justify-center" style={{ containerType: "size" }}>
            <div className="-rotate-180 -scale-x-100 flex-none h-[0px] w-[100cqw]">
              <div className="relative size-full" data-name="g976">
                <div className="absolute inset-[-0.35px_0]">
                  <img alt="" className="block max-w-none size-full" src={surveyG976} />
                </div>
              </div>
            </div>
          </div>
          <div className="absolute flex inset-[68.73%_27.92%_31.27%_51.77%] items-center justify-center" style={{ containerType: "size" }}>
            <div className="-rotate-180 -scale-x-100 flex-none h-[0px] w-[100cqw]">
              <div className="relative size-full" data-name="g980">
                <div className="absolute inset-[-0.35px_0]">
                  <img alt="" className="block max-w-none size-full" src={surveyG980} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Iconex/Light/Trash can — 24px */
export function TrashCan24Icon() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Iconex/Light/Trash can">
      <div className="absolute h-[18.999px] left-[3px] top-[3px] w-[18px]" data-name="Trash can">
        <div className="absolute inset-[-3.95%_0]">
          <img alt="" className="block max-w-none size-full" src={trashCan24} />
        </div>
      </div>
    </div>
  );
}

/* edit/2 — 16px white pencil */
export function EditIcon() {
  return (
    <div className="overflow-clip relative shrink-0 size-[16px]" data-name="edit/2">
      <div className="absolute inset-[20.12%_20.12%_16.67%_19.18%]" data-name="Icon">
        <div className="absolute inset-[-4.39%_-4.58%]">
          <img alt="" className="block max-w-none size-full" src={editIcon} />
        </div>
      </div>
    </div>
  );
}

/* upload_2028173 1 — 40px cloud upload */
export function UploadIcon() {
  return (
    <div className="relative shrink-0 size-[40px]" data-name="upload_2028173 1">
      <img alt="" className="absolute block inset-0 max-w-none size-full" src={uploadIcon} />
    </div>
  );
}

/* Small trash can for photo thumbs — 14px */
export function TrashCan14Icon() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Iconex/Light/Trash can">
      <div className="absolute h-[11.083px] left-[1.75px] top-[1.75px] w-[10.5px]" data-name="Trash can">
        <div className="absolute inset-[-3.95%_0]">
          <img alt="" className="block max-w-none size-full" src={trashCan24} />
        </div>
      </div>
    </div>
  );
}

/* Product Library recycle icon in WHITE (active sidebar pill) — 14×14 */
export function ProductLibraryIconWhite() {
  return (
    <div className="flex items-center justify-center relative shrink-0">
      <div className="-scale-y-100 flex-none">
        <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative" data-name="g1194">
          <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] ml-0 mt-0 place-items-start relative row-1" data-name="g1196">
            <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative row-1" data-name="Clip path group">
              <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-[0.41px] mt-[2.11px] place-items-start relative row-1" data-name="g1198">
                <div className="col-1 h-[5.742px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-0.41px_-6.153px] mask-size-[14px_14px] ml-0 mt-0 relative row-1 w-[6.59px]" style={{ maskImage: `url("${plG1204w}")` }} data-name="g1204">
                  <div className="absolute inset-[0_-6.23%_-7.14%_-6.22%]">
                    <img alt="" className="block max-w-none size-full" src={plG1205w} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-1 h-[2.461px] ml-[2.9px] mt-[5.39px] relative row-1 w-[1.641px]" data-name="g1208">
            <div className="absolute inset-[-16.67%_-24.99%_0_-25.01%]">
              <img alt="" className="block max-w-none size-full" src={plG1208w} />
            </div>
          </div>
          <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] ml-0 mt-0 place-items-start relative row-1" data-name="g1212">
            <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative row-1" data-name="Clip path group">
              <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-[7px] mt-[2.11px] place-items-start relative row-1" data-name="g1214">
                <div className="col-1 h-[5.742px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-7px_-6.153px] mask-size-[14px_14px] ml-0 mt-0 relative row-1 w-[6.59px]" style={{ maskImage: `url("${plG1204w}")` }} data-name="g1220">
                  <div className="absolute inset-[0_-6.23%_-7.14%_0]">
                    <img alt="" className="block max-w-none size-full" src={plG1220w} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-1 h-[2.461px] ml-[9.46px] mt-[5.39px] relative row-1 w-[1.641px]" data-name="g1224">
            <div className="absolute inset-[-16.67%_-24.99%_0_-25.01%]">
              <img alt="" className="block max-w-none size-full" src={plG1208w} />
            </div>
          </div>
          <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] ml-0 mt-0 place-items-start relative row-1" data-name="g1228">
            <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative row-1" data-name="Clip path group">
              <div className="col-1 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-0.41px_-0.41px] mask-size-[14px_14px] ml-[0.41px] mt-[0.41px] relative row-1 size-[13.18px]" style={{ maskImage: `url("${plG1204w}")` }} data-name="g1230">
                <div className="absolute inset-[-3.11%]">
                  <img alt="" className="block max-w-none size-full" src={plG1230w} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Transaction arrows icon in DARK (inactive sidebar item) — 14.955×12 */
export function TransactionIconDark() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
      <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-[0.94px] place-items-start relative row-1" data-name="Group">
        <div className="col-1 h-[11.056px] ml-0 mt-0 relative row-1 w-[7.444px]" data-name="Group">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={transG4dark} />
        </div>
      </div>
      <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-[7.51px] mt-0 place-items-start relative row-1" data-name="Group">
        <div className="col-1 h-[11.056px] ml-0 mt-0 relative row-1 w-[7.444px]" data-name="Group">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={transG5dark} />
        </div>
      </div>
    </div>
  );
}
