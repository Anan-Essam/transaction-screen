import { useRef, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import authBg from "./assets/figma/authBg.jpg";
import authLogo from "./assets/figma/authLogo.svg";
import authFlagBase from "./assets/figma/authFlagBase.svg";
import authFlagV1 from "./assets/figma/authFlagV1.svg";
import authFlagV2 from "./assets/figma/authFlagV2.svg";
import authFlagV3 from "./assets/figma/authFlagV3.svg";
import authDropMask from "./assets/figma/authDropMask.svg";
import authDropFill from "./assets/figma/authDropFill.svg";
import authEye from "./assets/figma/authEye.svg";
import authWarn from "./assets/figma/authWarn.png";

/* Mock backend lookup — hardcoded mapping for testing, no real backend exists */
export type PhoneState = "existing" | "new" | "unregistered";
export function lookupPhone(phone: string): PhoneState {
  const digits = phone.replace(/\D/g, "");
  if (digits === "01000000001") return "existing";
  if (digits === "01000000002") return "new";
  return "unregistered";
}

/* ---------- shared pieces ---------- */

/* Full-bleed scrapyard photo + 40% black overlay + centered white card */
function AuthShell({ children, tall }: { children: ReactNode; tall?: boolean }) {
  return (
    <div className="relative min-h-screen w-full" data-name="Sign in">
      <img alt="" className="fixed inset-0 max-w-none object-cover size-full" src={authBg} />
      <div className="fixed inset-0 bg-[rgba(0,0,0,0.4)]" />
      <div className="relative flex items-center justify-center min-h-screen p-[16px] sm:p-[24px]">
        <div
          className={`bg-white border border-[#f5f5f5] border-solid flex flex-col gap-[40px] items-center justify-between p-[20px] rounded-[24px] w-full max-w-[611px] ${tall ? "md:h-[614px]" : "md:h-[604px]"} md:gap-0`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

function AuthHeader({ title, subtitle, subtitleLeading }: { title: string; subtitle: string; subtitleLeading?: string }) {
  return (
    <div className="flex flex-col gap-[24px] items-center relative shrink-0 w-full">
      <div className="h-[48px] relative shrink-0 w-[110.063px]" data-name="next-logo-01 1 [Vectorized]">
        <img alt="Next by Bekia" className="absolute block inset-0 max-w-none size-full" src={authLogo} />
      </div>
      <div className="[word-break:break-word] flex flex-col gap-[8px] items-center leading-[0] not-italic relative shrink-0 text-center w-full">
        <div className="flex flex-col font-cairo font-bold justify-center relative shrink-0 text-[#131313] text-[24px] md:text-[32px] w-full max-w-[453px]">
          <p className="leading-[36px] md:leading-[48px]">{title}</p>
        </div>
        <div className="flex flex-col font-cairo font-normal justify-center relative shrink-0 text-[18px] md:text-[20px] text-[rgba(19,19,19,0.7)] w-full max-w-[453px]">
          <p className={subtitleLeading ?? "leading-[normal]"}>{subtitle}</p>
        </div>
      </div>
    </div>
  );
}

/* Primary CTA — solid blue like the default Figma frames; the 30% "dimmed" style is
   only used for the blocked (unregistered) state, exactly as in "Sign in 3".
   Invalid-but-not-blocked submits are simply guarded no-ops by each form. */
function PrimaryButton({ label, dimmed }: { label: string; dimmed?: boolean }) {
  return (
    <button
      type="submit"
      disabled={dimmed}
      className={`${dimmed ? "bg-[rgba(40,69,157,0.3)] cursor-default" : "bg-[#28459d] cursor-pointer"} flex h-[48px] items-center justify-center px-[16px] py-[8px] relative rounded-[24px] shrink-0 w-full`}
    >
      <div className="[word-break:break-word] flex flex-col font-cairo font-bold justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap">
        <p className="leading-[normal]">{label}</p>
      </div>
    </button>
  );
}

/* "Back to Login" link — styled exactly like the Figma forgot-password screen's link */
function BackToLogin({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="[word-break:break-word] flex flex-col font-cairo font-bold justify-center leading-[0] not-italic opacity-80 relative shrink-0 text-[#28459d] text-[16px] whitespace-nowrap cursor-pointer"
    >
      <p className="leading-[24px]">Back to Login</p>
    </button>
  );
}

/* Floating label that straddles the input's top border */
function FieldLabel({ label }: { label: string }) {
  return (
    <div className="h-[0.001px] relative shrink-0 w-full" data-name="Label Container">
      <div className="[word-break:break-word] absolute bg-white flex items-center left-0 not-italic px-[4px] rounded-[8px] text-left top-[-10px] whitespace-nowrap" data-name="Label">
        <div className="flex flex-col font-cairo font-semibold justify-center leading-[0] opacity-80 relative shrink-0 text-[#131313] text-[16px]">
          <p className="leading-[20px]">{label}</p>
        </div>
        <p className="font-sans font-semibold leading-[16px] opacity-80 relative shrink-0 text-[#da1414] text-[11px]">*</p>
      </div>
    </div>
  );
}

/* Egypt flag — base + 3 vector overlays, verbatim Figma composite */
function EgyptFlag() {
  return (
    <div className="overflow-clip relative shrink-0 size-[20px]" data-name="Input/egypt">
      <img alt="" className="absolute block inset-0 max-w-none size-full" src={authFlagBase} />
      <div className="absolute inset-[0_3.11%_67.39%_3.11%]">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={authFlagV1} />
      </div>
      <div className="absolute inset-[67.39%_3.11%_0_3.11%]">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={authFlagV2} />
      </div>
      <div className="absolute inset-[40.22%_32.61%_42.39%_32.61%]">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={authFlagV3} />
      </div>
    </div>
  );
}

/* Phone Number input with country-code dropdown (backdrop open/close pattern) */
function PhoneNumberField({ value, onChange, autoFocus }: { value: string; onChange: (v: string) => void; autoFocus?: boolean }) {
  const [countryOpen, setCountryOpen] = useState(false);
  return (
    <div className="flex flex-col items-start relative rounded-[2px] shrink-0 w-full" data-name=".❖ Main / Input">
      <div className="bg-white border border-[#ccc] border-solid flex flex-col gap-[12px] h-[48px] items-start px-[16px] relative rounded-[8px] shrink-0 w-full" data-name="Input">
        <FieldLabel label="Phone Number" />
        <div className="flex items-start justify-between relative shrink-0 w-full" data-name="Icons + Text">
          <div className="flex gap-[8px] items-center relative flex-1 min-w-0" data-name="Left Icon + Text">
            <div className="border-[#f5f5f5] border-r border-solid flex gap-[4px] items-center pr-[8px] relative shrink-0">
              <button
                type="button"
                onClick={() => setCountryOpen((o) => !o)}
                aria-haspopup="listbox"
                aria-expanded={countryOpen}
                aria-label="Select country code"
                className="flex gap-[4px] items-center cursor-pointer relative"
              >
                <EgyptFlag />
                <div className="relative shrink-0 size-[20px]" data-name="Navigation / arrow drop_down">
                  <div
                    className="absolute inset-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[5px_8px] mask-size-[14px_8px]"
                    style={{ maskImage: `url("${authDropMask}")` }}
                  >
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={authDropFill} />
                  </div>
                </div>
              </button>
              {countryOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setCountryOpen(false)} aria-hidden="true" />
                  <div
                    role="listbox"
                    aria-label="Country code"
                    className="absolute left-0 top-[32px] z-20 bg-white border border-[#f5f5f5] rounded-[8px] shadow-[0px_4px_16px_0px_rgba(0,0,0,0.08)] py-[4px] min-w-[160px]"
                  >
                    <button
                      type="button"
                      role="option"
                      aria-selected="true"
                      onClick={() => setCountryOpen(false)}
                      className="flex gap-[8px] items-center w-full px-[12px] py-[8px] cursor-pointer hover:bg-[#f9f9f9] text-left"
                    >
                      <EgyptFlag />
                      <span className="font-cairo font-semibold text-[14px] text-[#131313] leading-[24px]">Egypt (+20)</span>
                    </button>
                  </div>
                </>
              )}
            </div>
            <div className="[word-break:break-word] flex flex-1 font-cairo font-semibold gap-[4px] items-center leading-[0] min-w-0 not-italic relative text-[14px] text-left">
              <div className="flex flex-col justify-center opacity-80 relative shrink-0 whitespace-nowrap text-[rgba(19,19,19,0.6)]">
                <p className="leading-[24px]">(+20)</p>
              </div>
              <input
                type="tel"
                inputMode="numeric"
                autoFocus={autoFocus}
                value={value}
                onChange={(e) => onChange(e.target.value.replace(/[^\d]/g, ""))}
                placeholder="Number"
                aria-label="Phone Number"
                className="flex-1 min-w-0 h-[24px] leading-[24px] bg-transparent outline-none font-cairo font-semibold text-[14px] text-[#131313] placeholder:text-[rgba(19,19,19,0.6)] placeholder:opacity-80"
              />
            </div>
          </div>
          <div className="flex gap-[8px] h-[24px] items-center relative shrink-0" data-name="Right Icons" />
        </div>
        <div className="h-[0.001px] relative shrink-0 w-[288px]" data-name="Icons" />
      </div>
      <div className="flex flex-col items-start pt-[4px] px-[16px] relative shrink-0 w-full" data-name="Description">
        <div className="[word-break:break-word] flex flex-col font-cairo font-normal justify-center leading-[0] not-italic opacity-60 relative shrink-0 text-[#131313] text-[12px] text-left w-full">
          <p className="leading-[20px]">Enter the local phone number only (e.g., 1012345678). It must be at least 20 digits</p>
        </div>
      </div>
    </div>
  );
}

/* Password input with show/hide eye toggle; optional description slot (e.g. Forgot link) */
function PasswordField({
  label,
  placeholder,
  value,
  onChange,
  autoFocus,
  description,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  autoFocus?: boolean;
  description?: ReactNode;
}) {
  const [visible, setVisible] = useState(false);
  return (
    <div className="flex flex-col items-start relative rounded-[2px] shrink-0 w-full" data-name=".❖ Main / Input">
      <div className="bg-white border border-[#ccc] border-solid flex flex-col gap-[12px] h-[48px] items-start px-[16px] relative rounded-[8px] shrink-0 w-full" data-name="Input">
        <FieldLabel label={label} />
        <div className="flex items-start justify-between relative shrink-0 w-full" data-name="Icons + Text">
          <div className="flex gap-[4px] items-start relative flex-1 min-w-0" data-name="Left Icon + Text">
            <input
              type={visible ? "text" : "password"}
              autoFocus={autoFocus}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              aria-label={label}
              className="flex-1 min-w-0 h-[24px] leading-[24px] bg-transparent outline-none font-cairo font-semibold text-[14px] text-[#131313] placeholder:text-[rgba(19,19,19,0.6)] placeholder:opacity-80"
            />
          </div>
          <div className="flex gap-[8px] items-center relative shrink-0" data-name="Right Icons">
            <button
              type="button"
              onClick={() => setVisible((v) => !v)}
              aria-label={visible ? "Hide password" : "Show password"}
              aria-pressed={visible}
              className={`overflow-clip relative shrink-0 size-[20px] cursor-pointer ${visible ? "" : "opacity-100"}`}
            >
              <div className={`absolute inset-[16.67%_11.05%_16.67%_11.06%] ${visible ? "opacity-40" : ""}`} data-name="Icon">
                <div className="absolute inset-[-6.25%_-5.35%]">
                  <img alt="" className="block max-w-none size-full" src={authEye} />
                </div>
              </div>
            </button>
          </div>
        </div>
        <div className="h-[0.001px] relative shrink-0 w-[288px]" data-name="Icons" />
      </div>
      {description && (
        <div className="flex flex-col items-start pt-[4px] px-[16px] relative shrink-0 w-full" data-name="Description">
          {description}
        </div>
      )}
    </div>
  );
}

/* Remember Me — 16px checkbox row */
function RememberMe({ checked, onToggle }: { checked: boolean; onToggle: () => void }) {
  return (
    <button type="button" onClick={onToggle} aria-pressed={checked} className="flex gap-[8px] items-center relative shrink-0 w-full cursor-pointer text-left">
      <div
        className={`relative rounded-[4px] shrink-0 size-[16px] border border-solid ${checked ? "bg-[#28459d] border-[#28459d]" : "bg-white border-[#ccc]"}`}
      >
        {checked && (
          <svg viewBox="0 0 16 16" className="absolute inset-0 size-full" fill="none" aria-hidden="true">
            <path d="M4 8.2L6.8 11L12 5.4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>
      <div className="[word-break:break-word] flex flex-col font-cairo font-semibold justify-center leading-[0] not-italic opacity-80 relative shrink-0 text-[14px] text-[rgba(19,19,19,0.6)]">
        <p className="leading-[24px]">Remember Me</p>
      </div>
    </button>
  );
}

/* Red warning banner for the unregistered (blocked) state */
function UnregisteredBanner() {
  return (
    <div
      role="alert"
      className="bg-[rgba(218,20,20,0.04)] border border-[rgba(218,20,20,0.4)] border-solid flex items-center justify-center p-[8px] relative rounded-[8px] shrink-0 w-full"
    >
      <div className="flex flex-1 gap-[8px] items-start min-w-0 relative">
        <div className="h-[23.733px] relative shrink-0 w-[22.5px]" data-name="m028t0154_i_icon_18sep22 1">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <img alt="" className="absolute h-[176.06%] left-[-42.39%] max-w-none top-[-42.03%] w-[185.7%]" src={authWarn} />
          </div>
        </div>
        <div className="flex flex-1 flex-col items-start min-w-0 relative">
          <div className="[word-break:break-word] flex flex-col font-cairo font-medium justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(19,19,19,0.8)] w-full">
            <p className="leading-[normal]">This number is not registered in our system.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Six-box OTP entry with auto-advance, backspace navigation and paste support */
function OtpBoxes({ digits, onChange }: { digits: string[]; onChange: (d: string[]) => void }) {
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  const setDigit = (i: number, v: string) => {
    const clean = v.replace(/\D/g, "");
    const next = [...digits];
    if (clean.length === 0) {
      next[i] = "";
      onChange(next);
      return;
    }
    // typed or pasted digits — distribute forward from box i
    for (let k = 0; k < clean.length && i + k < 6; k++) next[i + k] = clean[k];
    onChange(next);
    const focusIdx = Math.min(i + clean.length, 5);
    refs.current[focusIdx]?.focus();
  };

  return (
    <div className="flex gap-[8px] sm:gap-[16px] items-start relative shrink-0" role="group" aria-label="Verification code">
      {digits.map((d, i) => (
        <input
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          type="text"
          inputMode="numeric"
          maxLength={6}
          value={d}
          autoFocus={i === 0}
          aria-label={`Digit ${i + 1}`}
          onChange={(e) => setDigit(i, e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Backspace" && !digits[i] && i > 0) refs.current[i - 1]?.focus();
          }}
          onFocus={(e) => e.target.select()}
          className="bg-white border border-[#ccc] border-solid rounded-[8px] shrink-0 size-[44px] sm:size-[72px] text-center font-cairo font-bold text-[24px] text-[#131313] outline-none focus:border-[#28459d]"
        />
      ))}
    </div>
  );
}

/* ---------- screens (named after their Figma layers) ---------- */

/* "Sign in 1" — phone number entry; doubles as "Sign in 3" when the unregistered error is shown.
   onSubmit returns true when the number is unregistered (blocked). */
function SignIn1({ onSubmit }: { onSubmit: (phone: string) => boolean }) {
  const [phone, setPhone] = useState("");
  const [showError, setShowError] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (phone.length > 0 && !showError && onSubmit(phone)) setShowError(true);
  };

  return (
    <AuthShell>
      <form onSubmit={submit} className="contents" data-name={showError ? "Sign in 3" : "Sign in 1"}>
        <div className="flex flex-col gap-[40px] md:gap-[64px] items-center relative shrink-0 w-full">
          <AuthHeader title="Verify Your Phone Number" subtitle="Enter your registered phone number to continue." />
          <div className="flex flex-col gap-[40px] items-start relative shrink-0 w-full">
            {showError && <UnregisteredBanner />}
            <div className="flex flex-col items-start justify-center relative shrink-0 w-full">
              <PhoneNumberField
                value={phone}
                onChange={(v) => {
                  setPhone(v);
                  setShowError(false);
                }}
                autoFocus
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center relative shrink-0 w-full">
          <PrimaryButton label="Phone Number Verification" dimmed={showError} />
        </div>
      </form>
    </AuthShell>
  );
}

/* "Sign in 4" — OTP verification; reused for the forgot-password flow ("Sign in 7") */
function SignIn4({ onVerify, onBack }: { onVerify: () => void; onBack: () => void }) {
  const [digits, setDigits] = useState<string[]>(["", "", "", "", "", ""]);
  const complete = digits.every((d) => d !== "");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (complete) onVerify();
  };

  return (
    <AuthShell tall>
      <form onSubmit={submit} className="contents" data-name="Sign in 4">
        <div className="flex flex-col gap-[40px] md:gap-[64px] items-center relative shrink-0 w-full">
          <AuthHeader title="Enter the verification code" subtitle="We’ve sent a 6-digit code to your email (e.g., ahmed***@mail.com)" />
          <div className="flex flex-col gap-[40px] items-center justify-center relative shrink-0 w-full">
            <OtpBoxes digits={digits} onChange={setDigits} />
            <div className="[word-break:break-word] flex flex-col font-cairo font-normal justify-center leading-[0] not-italic opacity-80 relative shrink-0 text-[16px] text-[rgba(19,19,19,0.6)] whitespace-nowrap">
              <p className="whitespace-pre">
                <span className="leading-[24px]">{`Create a Didn’t get the code?  `}</span>
                <button
                  type="button"
                  onClick={() => setDigits(["", "", "", "", "", ""])}
                  className="[word-break:break-word] font-cairo font-medium leading-[24px] not-italic text-[#28459d] cursor-pointer"
                >
                  [Resend OTP]
                </button>
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-[16px] items-center relative shrink-0 w-full">
          <PrimaryButton label="Verify Code" />
          <BackToLogin onClick={onBack} />
        </div>
      </form>
    </AuthShell>
  );
}

/* "Sign in 2" — set a new password; reused as "Sign in 6" (Reset your password) in the forgot flow */
function SignIn2({
  title,
  showRememberMe,
  onSubmit,
  onBack,
}: {
  title: string;
  showRememberMe: boolean;
  onSubmit: (password: string) => void;
  onBack: () => void;
}) {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [remember, setRemember] = useState(false);
  const valid = password.length > 0 && password === confirm;

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (valid) onSubmit(password);
  };

  return (
    <AuthShell tall>
      <form onSubmit={submit} className="contents" data-name="Sign in 2">
        <div className="flex flex-col gap-[40px] md:gap-[56px] items-center relative shrink-0 w-full">
          <AuthHeader title={title} subtitle="Create a strong new password to keep your account secure." subtitleLeading="leading-[30px]" />
          <div className="flex flex-col items-start justify-center relative shrink-0 w-full">
            <div className="flex flex-col gap-[16px] items-start relative shrink-0 w-full">
              <div className="flex flex-col gap-[32px] items-start justify-center relative shrink-0 w-full">
                <PasswordField label="New Password" placeholder="Enter your Password" value={password} onChange={setPassword} autoFocus />
                <PasswordField label="Confirm New Password" placeholder="Enter your Password" value={confirm} onChange={setConfirm} />
              </div>
              {showRememberMe && <RememberMe checked={remember} onToggle={() => setRemember((c) => !c)} />}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center relative shrink-0 w-full">
          <PrimaryButton label="Phone Number Verification" />
          <div className="flex flex-col gap-[16px] items-center pt-[16px] relative shrink-0 w-full">
            <BackToLogin onClick={onBack} />
          </div>
        </div>
      </form>
    </AuthShell>
  );
}

/* "Sign in 8" — Welcome Back: existing account password entry */
function SignIn8({
  phone,
  onLogin,
  onForgot,
  onBack,
}: {
  phone: string;
  onLogin: (password: string) => void;
  onForgot: () => void;
  onBack: () => void;
}) {
  const [phoneValue, setPhoneValue] = useState(phone);
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (password.length > 0) onLogin(password);
  };

  return (
    <AuthShell tall>
      <form onSubmit={submit} className="contents" data-name="Sign in 8">
        <div className="flex flex-col gap-[40px] md:gap-[64px] items-center relative shrink-0 w-full">
          <AuthHeader title="Welcome Back" subtitle="Enter your password to access your account." />
          <div className="flex flex-col gap-[40px] items-start justify-center relative shrink-0 w-full">
            <PhoneNumberField value={phoneValue} onChange={setPhoneValue} />
            <div className="flex flex-col gap-[16px] items-start relative shrink-0 w-full">
              <PasswordField
                label="Password"
                placeholder="Enter your password"
                value={password}
                onChange={setPassword}
                autoFocus
                description={
                  <button
                    type="button"
                    onClick={onForgot}
                    className="[word-break:break-word] flex flex-col font-cairo font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#28459d] text-[14px] text-left cursor-pointer"
                  >
                    <p className="leading-[20px]">Forgot your password?</p>
                  </button>
                }
              />
              <RememberMe checked={remember} onToggle={() => setRemember((c) => !c)} />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center relative shrink-0 w-full">
          <PrimaryButton label="Phone Number Verification" />
          <div className="flex flex-col gap-[16px] items-center pt-[16px] relative shrink-0 w-full">
            <BackToLogin onClick={onBack} />
          </div>
        </div>
      </form>
    </AuthShell>
  );
}

/* "Sign in 5" — forgot password: re-enter phone number */
function SignIn5({ onSubmit, onBack }: { onSubmit: (phone: string) => void; onBack: () => void }) {
  const [phone, setPhone] = useState("");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (phone.length > 0) onSubmit(phone);
  };

  return (
    <AuthShell>
      <form onSubmit={submit} className="contents" data-name="Sign in 5">
        <div className="flex flex-col gap-[40px] md:gap-[64px] items-center relative shrink-0 w-full">
          <AuthHeader title="Forgot your password" subtitle="Enter your registered email to receive reset instructions" subtitleLeading="leading-[30px]" />
          <div className="flex flex-col items-start justify-center relative shrink-0 w-full">
            <PhoneNumberField value={phone} onChange={setPhone} autoFocus />
          </div>
        </div>
        <div className="flex flex-col items-center relative shrink-0 w-full">
          <div className="flex flex-col gap-[16px] items-center relative shrink-0 w-full">
            <PrimaryButton label="Send Reset Link" />
            <BackToLogin onClick={onBack} />
          </div>
        </div>
      </form>
    </AuthShell>
  );
}

/* ---------- flow ---------- */

type AuthStep =
  | { step: "phone" }
  | { step: "otp"; phone: string }
  | { step: "setPassword"; phone: string }
  | { step: "password"; phone: string }
  | { step: "forgotPhone" }
  | { step: "forgotOtp"; phone: string }
  | { step: "forgotReset"; phone: string };

export default function AuthFlow({ onLogin }: { onLogin: () => void }) {
  const [state, setState] = useState<AuthStep>({ step: "phone" });
  const toLogin = () => setState({ step: "phone" });

  /* Route by mock lookup; returns true when the number is unregistered so the screen shows the blocked state */
  const submitPhone = (phone: string): boolean => {
    const kind = lookupPhone(phone);
    if (kind === "existing") setState({ step: "password", phone });
    else if (kind === "new") setState({ step: "otp", phone });
    return kind === "unregistered";
  };

  switch (state.step) {
    case "phone":
      return <SignIn1 onSubmit={submitPhone} />;
    case "otp":
      return <SignIn4 onVerify={() => setState({ step: "setPassword", phone: state.phone })} onBack={toLogin} />;
    case "setPassword":
      return <SignIn2 title="Set your password" showRememberMe onSubmit={() => onLogin()} onBack={toLogin} />;
    case "password":
      return <SignIn8 phone={state.phone} onLogin={() => onLogin()} onForgot={() => setState({ step: "forgotPhone" })} onBack={toLogin} />;
    case "forgotPhone":
      return <SignIn5 onSubmit={(phone) => setState({ step: "forgotOtp", phone })} onBack={toLogin} />;
    case "forgotOtp":
      return <SignIn4 onVerify={() => setState({ step: "forgotReset", phone: state.phone })} onBack={toLogin} />;
    case "forgotReset":
      /* reset does NOT auto-login — back to phone entry so the user logs in fresh */
      return <SignIn2 title="Reset your password" showRememberMe={false} onSubmit={toLogin} onBack={toLogin} />;
  }
}
