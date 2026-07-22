import { useState } from "react";
import { ModalOverlay, ModalHeader, ModalFooter, AuctionSelectSection, PaymentDetailsSection, DeliveredQtyTable } from "./ModalParts";
import { AUCTIONS } from "../../data";

export type MoneySubmission = {
  auctionId: string;
  buyer: string;
  amount: number;
  remaining: number;
};

type NewMoneyTransactionProps = {
  onClose: () => void;
  onSubmit: (s: MoneySubmission) => void;
};

/* "Add New Transaction" — New Money Transaction (Figma 546:67550) */
export default function NewMoneyTransaction({ onClose, onSubmit }: NewMoneyTransactionProps) {
  const [auctionId, setAuctionId] = useState<string | null>(null);
  const [buyer, setBuyer] = useState<string | null>(null);
  const [amount, setAmount] = useState("");

  const auction = AUCTIONS.find((a) => a.id === auctionId) ?? null;
  const outstanding = auction ? auction.outstandingAmount : 0;
  const remaining = Math.max(0, outstanding - (Number(amount) || 0));
  const canSubmit = !!auctionId && !!buyer && Number(amount) > 0;

  return (
    <ModalOverlay onClose={onClose}>
      <div className="bg-white content-stretch flex flex-col items-start p-[16px] relative rounded-[24px] w-full" data-name="Add New Transaction">
        <div className="content-stretch flex items-center justify-end relative shrink-0 w-full" data-name="Container">
          <div className="content-stretch flex flex-[1_0_0] flex-col gap-[40px] items-end min-w-px overflow-clip relative" data-name="Container">
            <ModalHeader title="Add Money Transaction" closeVariant="plain" onClose={onClose} />
            <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-full">
              <AuctionSelectSection
                auctions={AUCTIONS}
                selectedAuctionId={auctionId}
                onSelectAuction={(id) => {
                  setAuctionId(id);
                  setBuyer(null);
                }}
                selectedBuyer={buyer}
                onSelectBuyer={setBuyer}
              />
              <PaymentDetailsSection amount={amount} onAmountChange={setAmount} outstanding={outstanding} remaining={remaining} />
              {auction && buyer && auction.deliveredForBuyer.length > 0 && (
                <DeliveredQtyTable title={auction.name} rows={auction.deliveredForBuyer} />
              )}
            </div>
            <ModalFooter
              onCancel={onClose}
              onSubmit={() => canSubmit && onSubmit({ auctionId: auctionId!, buyer: buyer!, amount: Number(amount), remaining })}
              submitDisabled={!canSubmit}
            />
          </div>
        </div>
      </div>
    </ModalOverlay>
  );
}
