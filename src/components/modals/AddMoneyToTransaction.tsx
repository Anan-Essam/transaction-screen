import { useState } from "react";
import { ModalOverlay, ModalHeader, ModalFooter, PaymentDetailsSection, DeliveredQtyTable } from "./ModalParts";
import { AUCTIONS } from "../../data";

type AddMoneyToTransactionProps = {
  buyer: string;
  bidId: string;
  onClose: () => void;
  onSubmit: (s: { amount: number; remaining: number }) => void;
};

/* "Add New Transaction" — add a money installment to an existing transaction (Figma 539:65852) */
export default function AddMoneyToTransaction({ buyer, bidId, onClose, onSubmit }: AddMoneyToTransactionProps) {
  const [amount, setAmount] = useState("");
  const auction = AUCTIONS[0];
  const outstanding = auction.outstandingAmount;
  const remaining = Math.max(0, outstanding - (Number(amount) || 0));
  const canSubmit = Number(amount) > 0;

  return (
    <ModalOverlay onClose={onClose}>
      <div className="bg-white content-stretch flex flex-col items-start p-[16px] relative rounded-[24px] w-full" data-name="Add New Transaction">
        <div className="content-stretch flex items-center justify-end relative shrink-0 w-full" data-name="Container">
          <div className="content-stretch flex flex-[1_0_0] flex-col gap-[40px] items-end min-w-px overflow-clip relative" data-name="Container">
            <ModalHeader
              title="Add Money Transaction"
              subtitle={`${buyer} · ${bidId} · one or multiple products per entry`}
              closeVariant="bordered"
              onClose={onClose}
            />
            <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-full">
              <PaymentDetailsSection amount={amount} onAmountChange={setAmount} outstanding={outstanding} remaining={remaining} />
              <DeliveredQtyTable title={auction.name} rows={auction.deliveredForBuyer} />
            </div>
            <ModalFooter onCancel={onClose} onSubmit={() => canSubmit && onSubmit({ amount: Number(amount), remaining })} submitDisabled={!canSubmit} />
          </div>
        </div>
      </div>
    </ModalOverlay>
  );
}
