import { useRef, useState } from "react";
import { ModalOverlay, ModalHeader, SelectField, TextField } from "./ModalParts";
import { UploadIcon, TrashCan14Icon } from "../icons3";
import { DropdownArrowIcon } from "../icons2";
import { PRODUCT_CATEGORIES, CONDITION_OPTIONS, UNIT_OPTIONS } from "../../data";
import type { LibraryProduct, ProductDimensions } from "../../data";

const MAX_PHOTOS = 5;
const MAX_SIZE = 5 * 1024 * 1024; // 5 MB
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export type NewItemSubmission = {
  name: string;
  category: string;
  subcategory: string;
  color: string;
  dimensions: ProductDimensions;
  condition: string;
  description: string;
  images: string[]; // object URLs of uploaded photos
};

type DimensionFieldProps = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  unit: string;
  onUnitChange: (u: string) => void;
};

/* Dimensions "Input" — numeric value with a shared-unit dropdown suffix (Figma 739:13564) */
function DimensionField({ label, value, onChange, unit, onUnitChange }: DimensionFieldProps) {
  const [open, setOpen] = useState(false);
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full md:w-[208.889px]" data-name="Input">
      <div className="content-stretch flex flex-col items-start relative rounded-[2px] shrink-0 w-full" data-name=".❖ Main / Input">
        <div className="bg-white border border-[#ccc] border-solid content-stretch flex flex-col gap-[12px] h-[48px] items-start justify-center px-[16px] relative rounded-[8px] shrink-0 w-full" data-name="Input">
          <div className="h-[0.001px] relative shrink-0 w-full" data-name="Label Container">
            <div className="[word-break:break-word] absolute bg-white content-stretch flex items-center left-0 not-italic px-[4px] rounded-[8px] top-[-22px] whitespace-nowrap" data-name="Label">
              <div className="flex flex-col font-cairo font-semibold justify-center leading-[0] opacity-80 relative shrink-0 text-[#131313] text-[16px]">
                <p className="leading-[20px]">{label}</p>
              </div>
              <p className="font-['Source_Sans_Pro',sans-serif] font-semibold leading-[16px] opacity-80 relative shrink-0 text-[#da1414] text-[11px]">*</p>
            </div>
          </div>
          <div className="content-stretch flex gap-[8px] items-center overflow-visible relative shrink-0 w-full" data-name="Icons + Text">
            <div className="border-[#f5f5f5] border-r border-solid content-stretch flex flex-[1_0_0] gap-[4px] items-start min-w-px pr-[4px] relative" data-name="Left Icon + Text">
              <input
                type="text"
                inputMode="decimal"
                value={value}
                onChange={(e) => onChange(e.target.value.replace(/[^\d.]/g, ""))}
                className="[word-break:break-word] w-full min-w-0 bg-transparent border-none outline-none font-cairo font-semibold leading-[24px] opacity-80 text-[14px] text-[#131313] placeholder:text-[rgba(19,19,19,0.6)]"
                aria-label={label}
              />
            </div>
            <div className="content-stretch flex items-center relative shrink-0" data-name="Right Icons">
              <button
                type="button"
                aria-haspopup="listbox"
                aria-expanded={open}
                onClick={() => setOpen((o) => !o)}
                className="content-stretch flex items-center relative shrink-0 cursor-pointer"
              >
                <div className="[word-break:break-word] flex flex-col font-cairo font-semibold justify-center leading-[0] not-italic opacity-80 relative shrink-0 text-[14px] text-[rgba(19,19,19,0.6)] whitespace-nowrap">
                  <p className="leading-[24px]">{unit.toUpperCase()}</p>
                </div>
                <DropdownArrowIcon />
              </button>
              {open && (
                <>
                  {/* click-away backdrop — closes without document-level listeners */}
                  <div className="fixed inset-0 z-10 cursor-default" aria-hidden onClick={() => setOpen(false)} />
                  <div role="listbox" className="absolute right-0 top-[32px] z-20 min-w-[72px] bg-white border border-[#f5f5f5] border-solid rounded-[8px] overflow-hidden shadow-[0px_4px_16px_rgba(19,19,19,0.08)]">
                    {UNIT_OPTIONS.map((u) => (
                      <button
                        key={u}
                        type="button"
                        role="option"
                        aria-selected={u === unit}
                        onClick={() => {
                          onUnitChange(u);
                          setOpen(false);
                        }}
                        className="block w-full text-left px-[16px] py-[8px] font-cairo font-semibold text-[14px] text-[#131313] cursor-pointer hover:bg-[#f9f9f9]"
                      >
                        {u}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

type AddNewItemProps = {
  onClose: () => void;
  onSubmit: (item: NewItemSubmission) => void;
  /* when set, the modal edits this product in place instead of creating a new one */
  initial?: LibraryProduct;
};

/* "Add New Item" — add/edit-product modal (Figma 125:12435) */
export default function AddNewItem({ onClose, onSubmit, initial }: AddNewItemProps) {
  const [name, setName] = useState(initial?.name ?? "");
  const [category, setCategory] = useState<string | null>(initial?.category ?? null);
  const [subcategory, setSubcategory] = useState<string | null>(initial?.subcategory ?? null);
  const [color, setColor] = useState(initial?.color ?? "");
  const [condition, setCondition] = useState<string | null>(initial?.condition ?? null);
  const [description, setDescription] = useState(initial?.description ?? "");
  const [length, setLength] = useState(initial?.dimensions.length ?? "");
  const [width, setWidth] = useState(initial?.dimensions.width ?? "");
  const [height, setHeight] = useState(initial?.dimensions.height ?? "");
  const [unit, setUnit] = useState(initial?.dimensions.unit ?? "cm");
  const [photos, setPhotos] = useState<string[]>(initial?.images ?? []);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isEdit = !!initial;
  const activeCategory = PRODUCT_CATEGORIES.find((c) => c.name === category);

  const addFiles = (files: FileList | File[]) => {
    const accepted = Array.from(files).filter((f) => ACCEPTED_TYPES.includes(f.type) && f.size <= MAX_SIZE);
    setPhotos((p) => [...p, ...accepted.slice(0, MAX_PHOTOS - p.length).map((f) => URL.createObjectURL(f))]);
  };

  const canSubmit = name.trim() !== "" && !!category && !!subcategory && photos.length >= 1;

  return (
    <ModalOverlay onClose={onClose}>
      <div className="bg-white content-stretch flex flex-col items-start p-[16px] relative rounded-[24px] w-full max-w-[702px] mx-auto" data-name="Add New Item">
        <div className="content-stretch flex items-center justify-end relative shrink-0 w-full" data-name="Container">
          <div className="content-stretch flex flex-[1_0_0] flex-col gap-[40px] items-end min-w-px overflow-x-clip relative" data-name="Container">
            <ModalHeader title={isEdit ? "Edit Product" : "Add New Item"} closeVariant="plain" onClose={onClose} />
            <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
              <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
                <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
                  <TextField label="Item Name" placeholder="Copper Cables Bundle" value={name} onChange={setName} />
                  <div className="content-stretch flex flex-col md:flex-row gap-[16px] items-start relative shrink-0 w-full">
                    <div className="md:flex-[1_0_0] min-w-px w-full md:w-auto">
                      <SelectField
                        label="Category"
                        placeholder="Metals"
                        value={category}
                        options={PRODUCT_CATEGORIES.map((c) => c.name)}
                        onSelect={(v) => {
                          setCategory(v);
                          // subcategory options depend on the chosen category
                          setSubcategory(null);
                        }}
                        labelBackground="white"
                      />
                    </div>
                    <div className="md:flex-[1_0_0] min-w-px w-full md:w-auto">
                      <SelectField
                        label="Sub Category"
                        placeholder="Metals"
                        value={subcategory}
                        options={activeCategory ? activeCategory.subcategories : []}
                        onSelect={setSubcategory}
                        labelBackground="white"
                        disabled={!activeCategory}
                      />
                    </div>
                  </div>
                  <div className="content-stretch flex flex-col md:flex-row gap-[16px] items-start relative shrink-0 w-full">
                    <div className="md:flex-[1_0_0] min-w-px w-full md:w-auto">
                      <TextField label="Color" placeholder="Black" value={color} onChange={setColor} />
                    </div>
                    <div className="md:flex-[1_0_0] min-w-px w-full md:w-auto">
                      <SelectField label="Condition" placeholder="New" value={condition} options={CONDITION_OPTIONS} onSelect={setCondition} labelBackground="white" />
                    </div>
                  </div>
                  <TextField label="Description" placeholder="add more details if you want" value={description} onChange={setDescription} />
                  <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-full">
                    <p className="[word-break:break-word] font-cairo font-bold leading-[normal] not-italic relative shrink-0 text-[#131313] text-[14px] w-full">Dimensions</p>
                    <div className="content-stretch flex flex-col md:flex-row gap-[16px] items-start relative shrink-0 w-full">
                      <DimensionField label="Length" value={length} onChange={setLength} unit={unit} onUnitChange={setUnit} />
                      <DimensionField label="Width" value={width} onChange={setWidth} unit={unit} onUnitChange={setUnit} />
                      <DimensionField label="Height" value={height} onChange={setHeight} unit={unit} onUnitChange={setUnit} />
                    </div>
                  </div>
                  <div className="bg-[#f9f9f9] content-stretch flex flex-col items-start overflow-clip px-[18px] py-[10px] relative rounded-[16px] shrink-0 w-full" data-name="photos-card">
                    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full max-w-[621px]">
                      <p className="[word-break:break-word] font-cairo font-bold leading-[normal] not-italic relative shrink-0 text-[#131313] text-[14px] w-full">Photos</p>
                      <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          onDragOver={(e) => {
                            e.preventDefault();
                            setDragOver(true);
                          }}
                          onDragLeave={() => setDragOver(false)}
                          onDrop={(e) => {
                            e.preventDefault();
                            setDragOver(false);
                            addFiles(e.dataTransfer.files);
                          }}
                          className={`bg-white ${dragOver ? "border-[#28459d]" : "border-[#e5e7eb]"} border-[1.5px] border-solid h-[144px] overflow-clip relative rounded-[12px] shrink-0 w-full cursor-pointer`}
                          data-name="upload-zone"
                          aria-label="Upload photos"
                        >
                          <div className="-translate-x-1/2 -translate-y-1/2 absolute content-stretch flex flex-col gap-[8px] items-center left-[calc(50%+0.5px)] top-[calc(50%+0.5px)] w-[336px] max-w-full">
                            <UploadIcon />
                            <div className="[word-break:break-word] content-stretch flex flex-col font-cairo font-normal items-center leading-[normal] not-italic relative shrink-0 text-[#858c94] w-full">
                              <p className="relative shrink-0 text-[12px] w-full">Select a file or drag and drop here. at least one image per item.</p>
                              <p className="relative shrink-0 text-[11px] text-center w-full whitespace-pre-wrap">{`JPG / PNG / WEBP  ·  max 5 MB`}</p>
                            </div>
                          </div>
                        </button>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept={ACCEPTED_TYPES.join(",")}
                          multiple
                          className="hidden"
                          onChange={(e) => {
                            if (e.target.files) addFiles(e.target.files);
                            e.target.value = "";
                          }}
                        />
                        <div className="content-stretch flex flex-wrap md:flex-nowrap gap-[8px] items-center relative shrink-0 w-full">
                          {photos.map((src, i) => (
                            <div key={`${src}-${i}`} className="content-stretch flex items-center relative shrink-0 size-[97px]">
                              <div className="flex-[1_0_0] h-full min-w-px overflow-clip relative rounded-[8px]">
                                <img alt={`Photo ${i + 1}`} className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[8px] size-full" src={src} />
                                <button
                                  type="button"
                                  onClick={() => setPhotos((p) => p.filter((_, j) => j !== i))}
                                  className="absolute bg-[#f6f6f7] content-stretch flex flex-col items-center justify-center left-[73px] overflow-clip p-[4px] rounded-[16px] size-[20px] top-[4px] cursor-pointer"
                                  aria-label={`Remove photo ${i + 1}`}
                                  data-name="arrow btn"
                                >
                                  <TrashCan14Icon />
                                </button>
                              </div>
                            </div>
                          ))}
                          {Array.from({ length: Math.max(0, MAX_PHOTOS - photos.length) }).map((_, i) => (
                            <div key={`empty-${i}`} className="bg-white border border-[#e5e7eb] border-solid relative rounded-[8px] shrink-0 size-[97px]" data-name="thumb-0" />
                          ))}
                          {photos.length < MAX_PHOTOS && (
                            <button
                              type="button"
                              onClick={() => fileInputRef.current?.click()}
                              className="bg-white border border-[#e5e7eb] border-solid overflow-clip relative rounded-[13.846px] shrink-0 size-[97px] cursor-pointer"
                              data-name="thumb-4"
                              aria-label="Add photo"
                            >
                              <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-cairo font-medium h-[38px] justify-center leading-[0] left-[calc(50%-10.5px)] not-italic text-[40px] text-[rgba(19,19,19,0.4)] top-[calc(50%-5.5px)] w-[23px]">
                                <p className="leading-[normal]">+</p>
                              </div>
                            </button>
                          )}
                        </div>
                        <p className="[word-break:break-word] font-cairo font-normal leading-[normal] not-italic relative shrink-0 text-[#9ca3af] text-[11px] w-full">Up to 5 photos — max 5 MB each</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="content-stretch flex gap-[16px] h-[48px] items-center justify-end relative shrink-0 w-[388px] max-w-full">
              <button
                type="button"
                onClick={onClose}
                className="bg-white border border-[#28459d] border-solid content-stretch flex h-[48px] items-center justify-center px-[16px] py-[8px] relative rounded-[24px] shrink-0 w-[103px] cursor-pointer"
              >
                <div className="[word-break:break-word] flex flex-col font-cairo font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#28459d] text-[16px] whitespace-nowrap">
                  <p className="leading-[normal]">Cancel</p>
                </div>
              </button>
              <button
                type="button"
                disabled={!canSubmit}
                onClick={() =>
                  canSubmit &&
                  onSubmit({
                    name: name.trim(),
                    category: category!,
                    subcategory: subcategory!,
                    color: color.trim(),
                    dimensions: { length, width, height, unit },
                    condition: condition ?? "",
                    description: description.trim(),
                    images: photos,
                  })
                }
                className="bg-[#28459d] border border-solid border-white content-stretch flex h-[48px] items-center justify-center px-[16px] py-[8px] relative rounded-[24px] shrink-0 w-[103px] cursor-pointer disabled:opacity-50 disabled:cursor-default"
              >
                <div className="[word-break:break-word] flex flex-col font-cairo font-bold justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap">
                  <p className="leading-[normal]">{isEdit ? "Save" : "Add"}</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </ModalOverlay>
  );
}
