import { useRef } from "react";
import companyLogo from "../../assets/settings/companyLogo.jpg";
import { SettingsCard, SettingsCardHeader, EditInfoButton, InfoRow } from "./SettingsParts";
import { CompanyInfoIcon, UserInfoIcon, KycDocsIcon, DocPdfIcon, DocTrashIcon, DocDotIcon, SettingsEditIcon } from "../settingsIcons";
import { UploadIcon } from "../icons3";
import type { CompanyInfo, UserInfo, AdminInfo, KycDocument, UserRole } from "../../settingsData";
import { ADMIN_INFO } from "../../settingsData";

/* "Input" — a KYC document slot. Empty slots offer the upload affordance,
   filled slots show the file with Preview / delete. Admin only. */
function KycDocumentRow({ doc, onUpload, onRemove }: { doc: KycDocument; onUpload: (name: string) => void; onRemove: () => void }) {
  const fileRef = useRef<HTMLInputElement>(null);

  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Input">
      <div className="content-stretch flex flex-col items-start relative rounded-[2px] shrink-0 w-full" data-name=".❖ Main / Input">
        <div
          className={`bg-white border ${doc.fileName ? "border-[#f0f0f0]" : "border-[#ccc]"} border-solid content-stretch flex flex-col gap-[12px] items-start px-[16px] relative rounded-[8px] shrink-0 w-full`}
          data-name="Input"
        >
          <div className="h-[0.001px] relative shrink-0 w-full" data-name="Label Container">
            <div className="[word-break:break-word] absolute bg-white content-stretch flex items-start left-0 not-italic px-[4px] rounded-[8px] top-[-10px] max-w-[calc(100%-8px)]" data-name="Label">
              {/* long KYC labels wrap instead of pushing the card past the viewport */}
              <div className="flex flex-col font-cairo font-semibold justify-center leading-[0] min-w-0 opacity-80 relative text-[#131313] text-[16px]">
                <p className="leading-[20px]">{doc.label}</p>
              </div>
              <p className="font-['Source_Sans_Pro',sans-serif] font-semibold leading-[16px] opacity-80 relative shrink-0 text-[#da1414] text-[11px]">*</p>
            </div>
          </div>

          {doc.fileName ? (
            <div className="content-stretch flex flex-wrap gap-[16px] items-center justify-between py-[8px] relative shrink-0 w-full">
              <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
                <DocPdfIcon className="h-[24px] w-[18px] shrink-0" />
                <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Description">
                  <div className="[word-break:break-word] flex flex-col font-cairo font-normal justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-black whitespace-nowrap">
                    <p className="leading-[normal]">{doc.fileName}</p>
                  </div>
                  <DocDotIcon className="size-[2px] shrink-0 text-[#131313]" />
                  <button
                    type="button"
                    onClick={() => {
                      /* preview the uploaded document */
                    }}
                    className="[word-break:break-word] flex flex-col font-cairo font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#28459d] text-[12px] whitespace-nowrap cursor-pointer"
                  >
                    <p className="leading-[normal]">Preview</p>
                  </button>
                </div>
              </div>
              <button type="button" onClick={onRemove} className="cursor-pointer shrink-0" aria-label={`Remove ${doc.label}`}>
                <DocTrashIcon className="h-[16px] w-[13px]" />
              </button>
            </div>
          ) : (
            <div className="content-stretch flex flex-wrap gap-[16px] items-center justify-center py-[8px] relative shrink-0 w-full">
              <UploadIcon />
              <div className="content-stretch flex flex-wrap gap-[16px] flex-[1_0_0] items-center justify-between min-w-px relative" data-name="Bottom Content">
                <div className="[word-break:break-word] content-stretch flex flex-col font-cairo font-normal gap-[4px] items-start justify-center leading-[0] not-italic relative shrink-0 w-[252px] max-w-full" data-name="Description">
                  <div className="flex flex-col h-[18px] justify-center relative shrink-0 text-[13px] text-black w-full">
                    <p className="leading-[normal]">Select a file or drag and drop here</p>
                  </div>
                  <div className="flex flex-col h-[18px] justify-center relative shrink-0 text-[12px] text-[rgba(19,19,19,0.6)] w-full">
                    <p className="leading-[normal]">JPG, PNG or PDF, file size no more than 10MB</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className="bg-[rgba(0,0,0,0)] border border-[#28459d] border-solid content-stretch flex items-center justify-center px-[16px] py-[8px] relative rounded-[24px] shrink-0 cursor-pointer"
                >
                  <div className="[word-break:break-word] flex flex-col font-cairo font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#28459d] text-[12px] whitespace-nowrap">
                    <p className="leading-[normal]">Select File</p>
                  </div>
                </button>
                <input
                  ref={fileRef}
                  type="file"
                  accept=".jpg,.jpeg,.png,.pdf"
                  className="hidden"
                  aria-label={`Upload ${doc.label}`}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) onUpload(file.name);
                    e.target.value = "";
                  }}
                />
              </div>
            </div>
          )}
          <div className="h-[0.001px] relative shrink-0 w-[288px] max-w-full" data-name="Icons" />
        </div>
      </div>
    </div>
  );
}

type AccountInformationProps = {
  role: UserRole;
  company: CompanyInfo;
  user: UserInfo;
  admin?: AdminInfo;
  kycDocs: KycDocument[];
  onEditCompany: () => void;
  onEditUser: () => void;
  onUploadKyc: (docId: string, fileName: string) => void;
  onRemoveKyc: (docId: string) => void;
};

/* "Account Information" (Figma 506:12155) */
export default function AccountInformation({
  role,
  company,
  user,
  admin = ADMIN_INFO,
  kycDocs,
  onEditCompany,
  onEditUser,
  onUploadKyc,
  onRemoveKyc,
}: AccountInformationProps) {
  const isAdmin = role === "admin";

  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
      <div className="content-stretch flex flex-col lg:flex-row gap-[24px] items-stretch relative shrink-0 w-full" data-name="Frame 326">
        {/* Company Information */}
        <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px relative w-full">
          <SettingsCard className="h-full">
            <SettingsCardHeader
              icon={<CompanyInfoIcon className="size-[14px] shrink-0 text-[#131313]" />}
              title="Company Information"
              /* editing company data is an Admin-only capability — absent for a regular user */
              action={isAdmin ? <EditInfoButton onClick={onEditCompany} /> : undefined}
            />
            <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Frame 91">
              <div className="content-stretch flex items-start justify-between relative shrink-0 w-full">
                <div className="[word-break:break-word] flex flex-col font-cairo font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#131313] text-[12px] whitespace-nowrap">
                  <p className="leading-[normal]">Company Profile:</p>
                </div>
                <div className="border border-[#f5f5f5] border-solid overflow-clip relative rounded-[4.571px] shrink-0 size-[80px]">
                  <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[4.571px] size-full" src={companyLogo} />
                  {isAdmin && (
                    <button
                      type="button"
                      onClick={onEditCompany}
                      aria-label="Change company logo"
                      className="absolute bg-[rgba(40,69,157,0.08)] content-stretch flex items-center left-[55px] p-[5px] rounded-[15px] top-[3px] cursor-pointer"
                    >
                      <SettingsEditIcon className="size-[10px] shrink-0 text-[#28459d]" />
                    </button>
                  )}
                </div>
              </div>
              <InfoRow label="Company Name:" value={company.name} />
              <InfoRow label="Business Email:" value={company.businessEmail} />
              <InfoRow label="Phone Number:" value={company.phone} />
              <InfoRow label="Country:" value={company.country} />
              <InfoRow label="City:" value={company.city} />
              <InfoRow label="Number of Employees:" value={company.employees} />
              <InfoRow label="Industry:" value={company.industry} />
              <InfoRow label="VAT Number:" value={company.vatNumber} />
            </div>
          </SettingsCard>
        </div>

        {/* User Information */}
        <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px relative w-full">
          <SettingsCard className="h-full">
            <SettingsCardHeader
              icon={<UserInfoIcon className="size-[14px] shrink-0 text-[#131313]" />}
              title="User Information"
              action={<EditInfoButton onClick={onEditUser} />}
            />
            <div className="border-[#f5f5f5] border-b border-solid content-stretch flex flex-col gap-[8px] items-start pb-[24px] relative shrink-0 w-full" data-name="Frame 91">
              <InfoRow label="Full Name:" value={user.fullName} />
              <InfoRow label="Job Title:" value={user.jobTitle} />
              <InfoRow label="Email Address:" value={user.email} />
              <InfoRow label="Phone Number:" value={user.phone} />
            </div>
            <div className="[word-break:break-word] content-stretch flex flex-col gap-[16px] items-start leading-[0] not-italic relative shrink-0 text-[12px] w-full">
              <div className="flex flex-col font-cairo font-bold justify-center relative shrink-0 text-[#131313]">
                <p className="leading-[normal]">Admin Info:</p>
              </div>
              <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
                <InfoRow label="Name:" value={admin.name} />
                <InfoRow label="Titles:" value={admin.title} />
              </div>
            </div>
          </SettingsCard>
        </div>
      </div>

      {/* Official Documents (KYC) — Admin only, not rendered at all for a regular user */}
      {isAdmin && (
        <SettingsCard>
          <SettingsCardHeader icon={<KycDocsIcon className="size-[14px] shrink-0 text-[#131313]" />} title="Official Documents (KYC)" />
          <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-full" data-name="Frame 91">
            {kycDocs.map((doc) => (
              <KycDocumentRow key={doc.id} doc={doc} onUpload={(name) => onUploadKyc(doc.id, name)} onRemove={() => onRemoveKyc(doc.id)} />
            ))}
          </div>
        </SettingsCard>
      )}
    </div>
  );
}
