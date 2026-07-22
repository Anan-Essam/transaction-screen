import { useState } from "react";
import { ModalOverlay, ModalHeader, ModalFooter, AuctionSelectSection, SelectField, FinalReleaseCheckbox, QtyInput } from "./ModalParts";
import { TrashCanIcon } from "../icons2";
import { AUCTIONS } from "../../data";

export type WasteEntry = { product: string; qty: number };

export type WasteSubmission = {
  auctionId: string;
  buyer: string;
  entries: WasteEntry[];
  finalRelease: boolean;
};

type ProductLine = { product: string; awardedQty: string; qty: string };

type NewWasteTransactionProps = {
  onClose: () => void;
  onSubmit: (s: WasteSubmission) => void;
};

/* "Add New Transaction" — New Waste (quantity) Transaction (Figma 493:12176) */
export default function NewWasteTransaction({ onClose, onSubmit }: NewWasteTransactionProps) {
  const [auctionId, setAuctionId] = useState<string | null>(null);
  const [buyer, setBuyer] = useState<string | null>(null);
  const [lines, setLines] = useState<ProductLine[]>([]);
  const [finalRelease, setFinalRelease] = useState(false);

  const auction = AUCTIONS.find((a) => a.id === auctionId) ?? null;
  const availableProducts = auction ? auction.products.filter((p) => !lines.some((l) => l.product === p.name)).map((p) => p.name) : [];

  const selectAuction = (id: string) => {
    setAuctionId(id);
    // buyers and products are auction-specific — reset dependent choices
    setBuyer(null);
    const a = AUCTIONS.find((x) => x.id === id)!;
    setLines(a.products.map((p) => ({ product: p.name, awardedQty: `${p.awardedQty} Ton`, qty: "1" })));
  };

  const addProduct = (name: string) => {
    const p = auction?.products.find((x) => x.name === name);
    if (p) setLines((ls) => [...ls, { product: p.name, awardedQty: `${p.awardedQty} Ton`, qty: "1" }]);
  };

  const canSubmit = !!auctionId && !!buyer && lines.some((l) => Number(l.qty) > 0);

  return (
    <ModalOverlay onClose={onClose}>
      <div className="bg-white content-stretch flex flex-col items-start p-[16px] relative rounded-[24px] w-full" data-name="Add New Transaction">
        <div className="content-stretch flex items-center justify-end relative shrink-0 w-full" data-name="Container">
          <div className="content-stretch flex flex-[1_0_0] flex-col gap-[40px] items-end min-w-px overflow-clip relative" data-name="Container">
            <ModalHeader title="New Waste Transaction" closeVariant="bordered" onClose={onClose} />
            <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
              <AuctionSelectSection
                auctions={AUCTIONS}
                selectedAuctionId={auctionId}
                onSelectAuction={selectAuction}
                selectedBuyer={buyer}
                onSelectBuyer={setBuyer}
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
                    disabled={!auction}
                  />
                  <div className="bg-white content-stretch flex flex-col gap-[16px] items-start p-[8px] relative rounded-[8px] shrink-0 w-full overflow-x-auto" data-name="Bidding Vertical">
                    <div className="[word-break:break-word] border-[#f5f5f5] border-b border-solid content-stretch flex font-cairo font-medium items-center justify-between leading-[0] not-italic p-[8px] relative shrink-0 text-[14px] text-[rgba(19,19,19,0.7)] w-full min-w-[500px]" data-name="Bidding Headers">
                      <div className="flex flex-col justify-center relative shrink-0 w-[79px]">
                        <p className="leading-[normal]">Product</p>
                      </div>
                      <div className="flex flex-col h-[16px] justify-center relative shrink-0 w-[81px]">
                        <p className="leading-[normal]">Awarded Qty</p>
                      </div>
                      <div className="flex flex-col justify-center relative shrink-0 w-[129px]">
                        <p className="leading-[normal]">Deliver Now</p>
                      </div>
                      <div className="flex flex-col justify-center relative shrink-0 whitespace-nowrap">
                        <p className="leading-[normal]">Actions</p>
                      </div>
                    </div>
                    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full min-w-[500px]">
                      {lines.length === 0 ? (
                        <div className="p-[8px] font-cairo font-semibold text-[14px] text-[rgba(19,19,19,0.4)]">Select an auction to load its products</div>
                      ) : (
                        lines.map((line, i) => (
                          <div
                            key={line.product}
                            className={`${i % 2 === 0 ? "bg-[#f9f9f9] rounded-[4px] " : ""}content-stretch flex items-center justify-between p-[8px] relative shrink-0 w-full`}
                            data-name="Bid Row"
                          >
                            <div className="[word-break:break-word] flex flex-col font-cairo font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#131313] text-[14px] w-[79px]">
                              <p className="leading-[normal]">{line.product}</p>
                            </div>
                            <div className="[word-break:break-word] flex flex-col font-cairo font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#131313] text-[14px] w-[81px]">
                              <p className="leading-[normal]">{line.awardedQty}</p>
                            </div>
                            <QtyInput value={line.qty} onChange={(v) => setLines((ls) => ls.map((l) => (l.product === line.product ? { ...l, qty: v } : l)))} />
                            <div className="content-stretch flex items-center relative shrink-0 w-[44px]">
                              <button
                                type="button"
                                onClick={() => setLines((ls) => ls.filter((l) => l.product !== line.product))}
                                className="bg-white content-stretch flex flex-col items-center justify-center overflow-clip p-[4.8px] relative rounded-[19.2px] shrink-0 size-[24px] cursor-pointer"
                                aria-label={`Remove ${line.product}`}
                                data-name="arrow btn"
                              >
                                <TrashCanIcon />
                              </button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <FinalReleaseCheckbox checked={finalRelease} onToggle={() => setFinalRelease((c) => !c)} />
            </div>
            <ModalFooter
              onCancel={onClose}
              onSubmit={() =>
                canSubmit &&
                onSubmit({
                  auctionId: auctionId!,
                  buyer: buyer!,
                  entries: lines.filter((l) => Number(l.qty) > 0).map((l) => ({ product: l.product, qty: Number(l.qty) })),
                  finalRelease,
                })
              }
              submitDisabled={!canSubmit}
            />
          </div>
        </div>
      </div>
    </ModalOverlay>
  );
}
