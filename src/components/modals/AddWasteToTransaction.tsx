import { useState } from "react";
import { ModalOverlay, ModalHeader, ModalFooter, SelectField, FinalReleaseCheckbox, QtyInput } from "./ModalParts";
import { TrashCanIcon } from "../icons2";
import { AUCTIONS } from "../../data";
import type { WasteEntry } from "./NewWasteTransaction";

type ProductLine = {
  product: string;
  awardedQty: string;
  committedQty: string;
  qty: string;
  existing: boolean; // previously recorded products cannot be removed
};

type AddWasteToTransactionProps = {
  buyer: string;
  bidId: string;
  onClose: () => void;
  onSubmit: (s: { entries: WasteEntry[]; finalRelease: boolean }) => void;
};

/* "Add New Transaction" — add delivered quantities to an existing transaction (Figma 539:66291) */
export default function AddWasteToTransaction({ buyer, bidId, onClose, onSubmit }: AddWasteToTransactionProps) {
  const auction = AUCTIONS[0];
  const [lines, setLines] = useState<ProductLine[]>(
    auction.products.map((p) => ({
      product: p.name,
      awardedQty: `${p.awardedQty} Ton`,
      committedQty: p.committedQty > 0 ? `${p.committedQty} Ton` : "0",
      qty: "1",
      existing: p.committedQty > 0,
    })),
  );
  const [finalRelease, setFinalRelease] = useState(false);

  const availableProducts = auction.products.filter((p) => !lines.some((l) => l.product === p.name)).map((p) => p.name);
  const canSubmit = lines.some((l) => Number(l.qty) > 0);

  const addProduct = (name: string) => {
    const p = auction.products.find((x) => x.name === name);
    if (p)
      setLines((ls) => [
        ...ls,
        { product: p.name, awardedQty: `${p.awardedQty} Ton`, committedQty: p.committedQty > 0 ? `${p.committedQty} Ton` : "0", qty: "1", existing: p.committedQty > 0 },
      ]);
  };

  return (
    <ModalOverlay onClose={onClose}>
      <div className="bg-white content-stretch flex flex-col items-start p-[16px] relative rounded-[24px] w-full" data-name="Add New Transaction">
        <div className="content-stretch flex items-center justify-end relative shrink-0 w-full" data-name="Container">
          <div className="content-stretch flex flex-[1_0_0] flex-col gap-[40px] items-end min-w-px overflow-clip relative" data-name="Container">
            <ModalHeader
              title="Add Waste Transaction"
              subtitle={`${buyer} · ${bidId} · one or multiple products per entry`}
              closeVariant="bordered"
              onClose={onClose}
            />
            <div className="bg-[#f9f9f9] content-stretch flex flex-col gap-[24px] items-start p-[8px] relative rounded-[16px] shrink-0 w-full">
              <div className="[word-break:break-word] capitalize flex flex-col font-cairo font-bold justify-center leading-[0] not-italic opacity-80 relative shrink-0 text-[#131313] text-[16px] whitespace-nowrap">
                <p className="leading-[20px]">Products</p>
              </div>
              <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-full">
                <SelectField
                  label="Add Product"
                  placeholder="Select Product"
                  value={null}
                  options={availableProducts}
                  onSelect={addProduct}
                  labelBackground="diagonal"
                />
                <div className="bg-white content-stretch flex flex-col gap-[16px] items-start p-[8px] relative rounded-[8px] shrink-0 w-full overflow-x-auto" data-name="Bidding Vertical">
                  <div className="[word-break:break-word] border-[#f5f5f5] border-b border-solid content-stretch flex font-cairo font-medium items-center justify-between leading-[0] not-italic p-[8px] relative shrink-0 text-[14px] text-[rgba(19,19,19,0.7)] w-full min-w-[640px]" data-name="Bidding Headers">
                    <div className="flex flex-col justify-center relative shrink-0 w-[79px]">
                      <p className="leading-[normal]">Product</p>
                    </div>
                    <div className="flex flex-col h-[16px] justify-center relative shrink-0 w-[81px]">
                      <p className="leading-[normal]">Awarded Qty</p>
                    </div>
                    <div className="flex flex-col justify-center relative shrink-0 whitespace-nowrap">
                      <p className="leading-[normal]">Committed Qty</p>
                    </div>
                    <div className="flex flex-col justify-center relative shrink-0 w-[169px]">
                      <p className="leading-[normal]">Deliver Now</p>
                    </div>
                    <div className="flex flex-col justify-center relative shrink-0 whitespace-nowrap">
                      <p className="leading-[normal]">Actions</p>
                    </div>
                  </div>
                  <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full min-w-[640px]">
                    {lines.map((line, i) => (
                      <div
                        key={line.product + i}
                        className={`${i % 2 === 0 ? "bg-[#f9f9f9] rounded-[4px] " : ""}content-stretch flex items-center justify-between p-[8px] relative shrink-0 w-full`}
                        data-name="Bid Row"
                      >
                        <div className="[word-break:break-word] flex flex-col font-cairo font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#131313] text-[14px] w-[79px]">
                          <p className="leading-[normal]">{line.product}</p>
                        </div>
                        <div className="[word-break:break-word] flex flex-col font-cairo font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#131313] text-[14px] w-[81px]">
                          <p className="leading-[normal]">{line.awardedQty}</p>
                        </div>
                        <div className="[word-break:break-word] flex flex-col font-cairo font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#131313] text-[14px] w-[90px]">
                          <p className="leading-[normal]">{line.committedQty}</p>
                        </div>
                        <div className="content-stretch flex flex-col gap-[8px] items-start justify-center relative shrink-0">
                          <QtyInput width={169} value={line.qty} onChange={(v) => setLines((ls) => ls.map((l, j) => (j === i ? { ...l, qty: v } : l)))} />
                          <p className="[word-break:break-word] font-['Inter',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#828282] text-[12px] whitespace-nowrap">
                            Remaining Quantity 81.3 Tons
                          </p>
                        </div>
                        <div className={`content-stretch flex items-center ${line.existing ? "opacity-32 " : ""}relative shrink-0 w-[44px]`}>
                          <button
                            type="button"
                            disabled={line.existing}
                            onClick={() => setLines((ls) => ls.filter((_, j) => j !== i))}
                            className="bg-white content-stretch flex flex-col items-center justify-center overflow-clip p-[4.8px] relative rounded-[19.2px] shrink-0 size-[24px] cursor-pointer disabled:cursor-default"
                            aria-label={`Remove ${line.product}`}
                            data-name="arrow btn"
                          >
                            <TrashCanIcon />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <FinalReleaseCheckbox checked={finalRelease} onToggle={() => setFinalRelease((c) => !c)} />
            <ModalFooter
              onCancel={onClose}
              onSubmit={() =>
                canSubmit &&
                onSubmit({ entries: lines.filter((l) => Number(l.qty) > 0).map((l) => ({ product: l.product, qty: Number(l.qty) })), finalRelease })
              }
              submitDisabled={!canSubmit}
            />
          </div>
        </div>
      </div>
    </ModalOverlay>
  );
}
