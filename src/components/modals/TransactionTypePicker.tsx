import { useState } from "react";
import { ModalOverlay, ModalHeader, ModalFooter } from "./ModalParts";
import { ProductIcon, AgreementIcon } from "../icons2";

export type TransactionKind = "waste" | "money";

type OptionCardProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  selected: boolean;
  onSelect: () => void;
};

function OptionCard({ title, description, icon, selected, onSelect }: OptionCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`${selected ? "bg-[rgba(40,69,157,0.04)] border-[#28459d]" : "bg-white border-[#f5f5f5]"} border border-solid content-stretch flex md:flex-[1_0_0] gap-[24px] items-start min-w-px p-[20px] relative rounded-[12px] cursor-pointer text-left w-full md:w-auto`}
    >
      <div
        className={`${selected ? "bg-[rgba(40,69,157,0.08)]" : "bg-[#f5f5f5]"} content-stretch flex flex-col items-center justify-center overflow-clip p-[12px] relative rounded-[32px] shrink-0 size-[32px]`}
        data-name="arrow btn"
      >
        {icon}
      </div>
      <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start min-w-px not-italic relative">
        <div className="flex flex-col font-cairo font-bold h-[23px] justify-center leading-[0] relative shrink-0 text-[#131313] text-[18px] w-full">
          <p className="leading-[normal]">{title}</p>
        </div>
        <p className="font-cairo font-semibold leading-[normal] relative shrink-0 text-[14px] text-[rgba(19,19,19,0.6)] w-full">{description}</p>
      </div>
    </button>
  );
}

type TransactionTypePickerProps = {
  onClose: () => void;
  onContinue: (kind: TransactionKind) => void;
};

/* "Add New Transaction" — transaction type picker (Figma 284:16382) */
export default function TransactionTypePicker({ onClose, onContinue }: TransactionTypePickerProps) {
  const [kind, setKind] = useState<TransactionKind>("waste");

  return (
    <ModalOverlay onClose={onClose}>
      <div className="bg-white content-stretch flex flex-col items-start p-[16px] relative rounded-[24px] w-full" data-name="Add New Transaction">
        <div className="content-stretch flex items-center justify-end relative shrink-0 w-full" data-name="Container">
          <div className="content-stretch flex flex-[1_0_0] flex-col gap-[56px] items-end min-w-px overflow-clip relative" data-name="Container">
            <div className="content-stretch flex flex-col gap-[40px] items-start relative shrink-0 w-full">
              <ModalHeader title="Add Money Transaction" closeVariant="plain" onClose={onClose} />
              <div className="content-stretch flex flex-col gap-[48px] items-center relative shrink-0 w-full max-w-[828px] mx-auto">
                <div className="[word-break:break-word] content-stretch flex flex-col gap-[2px] h-[69px] items-center leading-[0] not-italic relative shrink-0 w-[344px] max-w-full">
                  <div className="flex flex-col font-cairo font-bold justify-center relative shrink-0 text-[#131313] text-[20px] whitespace-nowrap">
                    <p className="leading-[normal]">What would you like to add?</p>
                  </div>
                  <div className="flex flex-col font-cairo font-semibold justify-center min-w-full relative shrink-0 text-[16px] text-[rgba(19,19,19,0.6)] w-[min-content]">
                    <p className="leading-[normal]">Choose the type of transaction you want to record.</p>
                  </div>
                </div>
                <div className="content-stretch flex flex-col md:flex-row gap-[24px] md:h-[117px] items-stretch md:items-center relative shrink-0 w-full">
                  <OptionCard
                    title="Waste Transaction"
                    description="Track changes in item quantities such as adding, removing, or adjusting stock."
                    icon={<ProductIcon size={14} />}
                    selected={kind === "waste"}
                    onSelect={() => setKind("waste")}
                  />
                  <OptionCard
                    title="Money Transaction"
                    description="Record financial activities such as payments, receipts, expenses, or transfers."
                    icon={<AgreementIcon />}
                    selected={kind === "money"}
                    onSelect={() => setKind("money")}
                  />
                </div>
              </div>
            </div>
            <ModalFooter cancelLabel="Cancel" submitLabel="Continue" onCancel={onClose} onSubmit={() => onContinue(kind)} fullWidth />
          </div>
        </div>
      </div>
    </ModalOverlay>
  );
}
