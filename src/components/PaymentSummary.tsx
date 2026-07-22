import imgLine10 from "../assets/figma/imgLine10.svg";

type StatCardProps = {
  title: string;
  value: string;
  valueClassName?: string;
};

/* One summary cell — "Frame 23 / 49 / 48 / 51" */
function StatCard({ title, value, valueClassName }: StatCardProps) {
  return (
    <div className="border-[#f0f0f0] border-b xl:border-b-0 xl:border-r border-solid content-stretch flex gap-[16px] items-center min-w-px overflow-clip px-[48px] py-[8px] relative w-full xl:flex-[1_0_0]">
      <div className="content-stretch flex flex-col gap-[4px] items-start justify-center relative shrink-0">
        <div className="[word-break:break-word] flex flex-col font-cairo font-medium justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(19,19,19,0.7)] whitespace-nowrap">
          <p className="leading-[normal]" dir="auto">
            {title}
          </p>
        </div>
        <div className="flex h-[16px] items-center justify-center relative shrink-0 w-0">
          <div className="flex-none rotate-90">
            <div className="h-0 relative w-[16px]">
              <div className="absolute inset-[-1px_0_0_0]">
                <img alt="" className="block max-w-none size-full" src={imgLine10} />
              </div>
            </div>
          </div>
        </div>
        <div className="content-stretch flex items-center relative shrink-0">
          <div
            className={`[word-break:break-word] flex flex-col font-cairo font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#131313] text-[24px] ${valueClassName || "whitespace-nowrap"}`}
          >
            <p className="leading-[normal]" dir="auto">
              {value}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* "Frame 315" — payment summary strip */
export default function PaymentSummary() {
  return (
    <div className="bg-white content-stretch flex flex-col xl:flex-row items-start justify-between py-[16px] relative rounded-[24px] shrink-0 w-full">
      <StatCard title="Total Payments Received" value="17,630 EGP" />
      <StatCard title="Outstanding Balance" value="17,630 EGP" />
      <StatCard title="Paid Buyers" value="120" />
      <StatCard title="Partially Paid Buyers" value="60" valueClassName="h-[30px] w-[119px]" />
    </div>
  );
}
