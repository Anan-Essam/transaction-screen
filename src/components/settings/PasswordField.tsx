import { useState } from "react";
import authEye from "../../assets/figma/authEye.svg";

type PasswordFieldProps = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  /* rendered inside the field frame, under the input (the password rules list) */
  footer?: React.ReactNode;
  error?: boolean;
};

/* ".❖ Main / Input" — floating-label password input with the show/hide eye */
export default function PasswordField({ label, value, onChange, placeholder = "Enter your password", footer, error }: PasswordFieldProps) {
  const [visible, setVisible] = useState(false);
  return (
    <div className="content-stretch flex flex-col items-start relative rounded-[2px] shrink-0 w-full" data-name=".❖ Main / Input">
      <div
        className={`bg-white border ${error ? "border-[#da1414]" : "border-[#ccc]"} border-solid content-stretch flex flex-col gap-[12px] items-start px-[16px] py-[12px] relative rounded-[8px] shrink-0 w-full`}
        data-name="Input"
      >
        <div className="h-[0.001px] relative shrink-0 w-full" data-name="Label Container">
          <div className="[word-break:break-word] absolute bg-white content-stretch flex items-center left-0 not-italic px-[4px] rounded-[8px] text-left top-[-22px] whitespace-nowrap" data-name="Label">
            <div className="flex flex-col font-cairo font-semibold justify-center leading-[0] opacity-80 relative shrink-0 text-[#131313] text-[16px]">
              <p className="leading-[20px]">{label}</p>
            </div>
            <p className="font-['Source_Sans_Pro',sans-serif] font-semibold leading-[16px] opacity-80 relative shrink-0 text-[#da1414] text-[11px]">*</p>
          </div>
        </div>
        <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Icons + Text">
          <input
            type={visible ? "text" : "password"}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            aria-label={label}
            className="[word-break:break-word] w-full min-w-0 flex-[1_0_0] bg-transparent border-none outline-none font-cairo font-semibold leading-[24px] opacity-80 text-[14px] text-[#131313] placeholder:text-[rgba(19,19,19,0.6)]"
          />
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            className="cursor-pointer shrink-0 size-[20px]"
            aria-label={visible ? `Hide ${label}` : `Show ${label}`}
          >
            <img alt="" className="block size-full" src={authEye} />
          </button>
        </div>
        {footer}
      </div>
    </div>
  );
}
