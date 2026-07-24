import imgRectangle1 from "../assets/figma/imgRectangle1.svg";
import imgLine6 from "../assets/figma/imgLine6.svg";
import {
  DashboardIcon,
  MyAuctionsIcon,
  ProductLibraryIcon,
  TransactionIcon,
  ReportsIcon,
  SettingsIcon,
} from "./icons";
import { ProductLibraryIconWhite, TransactionIconDark } from "./icons3";
import { DashboardIconWhite } from "./icons4";

export type SideBarPage = "dashboard" | "productLibrary" | "transaction";

type SideBarItemProps = {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
};

function SideBarItem({ icon, label, onClick }: SideBarItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="content-stretch flex gap-[8px] items-center px-[16px] py-[8px] relative shrink-0 w-[180px] cursor-pointer text-left"
    >
      {icon}
      <div className="[word-break:break-word] flex flex-col font-cairo font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#131313] text-[16px] whitespace-nowrap">
        <p className="leading-[normal]" dir="auto">
          {label}
        </p>
      </div>
    </button>
  );
}

/* Active nav item — blue pill with curved corner flourishes */
function ActiveSideBarItem({ icon, label, onClick }: SideBarItemProps) {
  return (
    <div className="h-[78px] relative shrink-0 w-[180px]">
      <button
        type="button"
        onClick={onClick}
        className="-translate-y-1/2 absolute bg-[#28459d] content-stretch flex gap-[8px] items-center leading-[0] left-0 px-[16px] py-[8px] right-0 rounded-bl-[32px] rounded-tl-[32px] top-1/2 cursor-pointer text-left"
      >
        {icon}
        <div className="[word-break:break-word] flex flex-col font-cairo font-bold justify-center not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap">
          <p className="leading-[normal]" dir="auto">
            {label}
          </p>
        </div>
      </button>
      <div className="absolute inset-[0_0_79.49%_81.54%]">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgRectangle1} />
      </div>
      <div className="absolute flex inset-[79.49%_0_0_81.54%] items-center justify-center" style={{ containerType: "size" }}>
        <div className="-rotate-180 -scale-x-100 flex-none h-[100cqh] w-[100cqw]">
          <div className="relative size-full">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgRectangle1} />
          </div>
        </div>
      </div>
    </div>
  );
}

type SideBarProps = {
  className?: string;
  active?: SideBarPage;
  onNavigate?: (page: SideBarPage) => void;
};

export default function SideBar({ className, active = "transaction", onNavigate }: SideBarProps) {
  const go = (page: SideBarPage) => onNavigate?.(page);
  return (
    <div className={className || "lg:h-[940px] relative w-full lg:w-[200px]"} data-name="Side Bar">
      <div className="relative lg:absolute bg-white lg:inset-[0.34%_0.25%_0_0] overflow-clip rounded-[24px]">
        <div className="relative lg:absolute content-stretch flex flex-col gap-[20px] items-end justify-center lg:left-0 py-[29px] lg:py-0 lg:top-[29px] w-full lg:w-[200px]">
          {active === "dashboard" ? (
            <ActiveSideBarItem icon={<DashboardIconWhite />} label="Dashboard" onClick={() => go("dashboard")} />
          ) : (
            <SideBarItem icon={<DashboardIcon />} label="Dashboard" onClick={() => go("dashboard")} />
          )}
          <SideBarItem
            icon={<MyAuctionsIcon />}
            label="My Auctions"
            onClick={() => {
              /* navigate to My Auctions */
            }}
          />
          {active === "productLibrary" ? (
            <ActiveSideBarItem icon={<ProductLibraryIconWhite />} label="Product Library" onClick={() => go("productLibrary")} />
          ) : (
            <SideBarItem icon={<ProductLibraryIcon />} label="Product Library" onClick={() => go("productLibrary")} />
          )}
          {active === "transaction" ? (
            <ActiveSideBarItem icon={<TransactionIcon />} label="Transaction" onClick={() => go("transaction")} />
          ) : (
            <SideBarItem icon={<TransactionIconDark />} label="Transaction" onClick={() => go("transaction")} />
          )}
          <SideBarItem
            icon={<ReportsIcon />}
            label="Reports"
            onClick={() => {
              /* navigate to Reports */
            }}
          />
          <SideBarItem
            icon={<SettingsIcon />}
            label="Settings"
            onClick={() => {
              /* navigate to Settings */
            }}
          />
        </div>
      </div>
      <div
        className={`absolute hidden lg:flex ${active === "dashboard" ? "inset-[2.54%_0.25%_86.34%_99.75%]" : active === "productLibrary" ? "inset-[15.47%_0.25%_70.77%_99.75%]" : "inset-[22.87%_0.25%_63.37%_99.75%]"} items-center justify-center`}
        style={{ containerType: "size" }}
      >
        <div className="-rotate-90 flex-none h-[0px] w-[100cqh]">
          <div className="relative size-full">
            <div className="absolute inset-[-1px_0_0_0]">
              <img alt="" className="block max-w-none size-full" src={imgLine6} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
