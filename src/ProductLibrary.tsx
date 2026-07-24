import { useState } from "react";
import statCash from "./assets/figma/statCash.png";
import statSummer2 from "./assets/figma/statSummer2.png";
import statSummer3 from "./assets/figma/statSummer3.png";
import statSummer4 from "./assets/figma/statSummer4.png";
import imgLine10 from "./assets/figma/imgLine10.svg";
import SideBar from "./components/SideBar";
import type { SideBarPage } from "./components/SideBar";
import { UserProfile, TopBar } from "./MoneyTransactions";
import { SearchIcon, ClearIcon } from "./components/icons";
import { DropdownArrowIcon, ProductIcon } from "./components/icons2";
import { CategoryIcon, EllipseDot, ProductRowChevron } from "./components/icons3";
import ProductDetailsScreen from "./components/ProductDetailsScreen";
import { PRODUCT_CATEGORIES } from "./data";
import type { LibraryProduct } from "./data";

/* Stats strip cell with illustration icon + value */
function StatItem({ title, icon, value, last, wideLabel }: { title: string; icon: React.ReactNode; value: string; last?: boolean; wideLabel?: boolean }) {
  return (
    <div className={`${last ? "" : "xl:border-r border-[#f0f0f0] border-solid "}content-stretch flex xl:flex-[1_0_0] gap-[16px] items-center min-w-px overflow-clip px-[48px] py-[8px] relative w-full xl:w-auto`}>
      <div className={`content-stretch flex flex-col gap-[4px] ${wideLabel ? "h-[84px] " : ""}items-start justify-center relative shrink-0`}>
        <div className={`[word-break:break-word] flex flex-col font-cairo font-medium ${wideLabel ? "h-[30px] " : ""}justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(19,19,19,0.7)] ${wideLabel ? "w-[165px]" : "whitespace-nowrap"}`}>
          <p className={wideLabel ? "leading-[24px]" : "leading-[normal]"} dir="auto">
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
        <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
          {icon}
          <div className="[word-break:break-word] flex flex-col font-cairo font-bold h-[30px] justify-center leading-[0] not-italic relative shrink-0 text-[#131313] text-[24px] w-[119px]">
            <p className="leading-[normal]" dir="auto">
              {value}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Product row in the "All Products" list */
function ProductListRow({ product, selected, onToggle }: { product: LibraryProduct; selected: boolean; onToggle: () => void }) {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
        <div className="relative rounded-[6px] shrink-0 size-[40px]">
          <div aria-hidden className="absolute inset-0 pointer-events-none rounded-[6px]">
            <div className="absolute bg-white inset-0 rounded-[6px]" />
            <img alt="" className="absolute max-w-none object-cover rounded-[6px] size-full" src={product.images[0]} />
          </div>
        </div>
        <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-[132px]">
          <div className="flex flex-col font-cairo font-bold h-[19px] justify-center leading-[0] not-italic relative shrink-0 text-[#131313] text-[14px] w-[132px]" title={product.name}>
            <p className="leading-[normal] overflow-hidden text-ellipsis whitespace-nowrap">{product.name}</p>
          </div>
          <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
            <div className="[word-break:break-word] flex flex-col font-cairo font-medium h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-[rgba(19,19,19,0.7)] whitespace-nowrap">
              <p className="leading-[normal]">{`${product.category} `}</p>
            </div>
            <EllipseDot />
            <div className="[word-break:break-word] flex flex-col font-cairo font-medium h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-[rgba(19,19,19,0.7)] whitespace-nowrap">
              <p className="leading-[normal]">{product.subcategory}</p>
            </div>
          </div>
        </div>
      </div>
      <button type="button" onClick={onToggle} className="cursor-pointer shrink-0" aria-expanded={selected} aria-label={selected ? `Close ${product.name} details` : `Open ${product.name} details`}>
        <ProductRowChevron selected={selected} />
      </button>
    </div>
  );
}

type ProductLibraryProps = {
  products: LibraryProduct[];
  onNavigate: (page: SideBarPage) => void;
  onAddNewItem: () => void;
  onEditProduct: (product: LibraryProduct) => void;
  onDeleteProduct: (id: string) => void;
};

/* Small confirmation dialog so a single accidental click never deletes */
function ConfirmDeleteDialog({ productName, onCancel, onConfirm }: { productName: string; onCancel: () => void; onConfirm: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(19,19,19,0.4)] p-[16px]" onMouseDown={(e) => e.target === e.currentTarget && onCancel()}>
      <div className="bg-white content-stretch flex flex-col gap-[24px] items-start p-[24px] rounded-[24px] w-[400px] max-w-full">
        <div className="content-stretch flex flex-col gap-[4px] items-start w-full">
          <p className="font-cairo font-bold text-[18px] text-[#131313] leading-[normal]">Delete product?</p>
          <p className="font-cairo font-medium text-[14px] text-[rgba(19,19,19,0.7)] leading-[normal]">{`\u201c${productName}\u201d will be permanently removed from the Product Library.`}</p>
        </div>
        <div className="content-stretch flex gap-[16px] items-center justify-end w-full">
          <button
            type="button"
            onClick={onCancel}
            className="bg-white border border-[#28459d] border-solid content-stretch flex h-[48px] items-center justify-center px-[16px] py-[8px] rounded-[24px] w-[103px] cursor-pointer"
          >
            <span className="font-cairo font-bold text-[#28459d] text-[16px] leading-[normal]">Cancel</span>
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="bg-[#da1414] content-stretch flex h-[48px] items-center justify-center px-[16px] py-[8px] rounded-[24px] w-[103px] cursor-pointer"
          >
            <span className="font-cairo font-bold text-white text-[16px] leading-[normal]">Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
}

/* "Product Library" screen (Figma 49:21078) */
export default function ProductLibrary({ products, onNavigate, onAddNewItem, onEditProduct, onDeleteProduct }: ProductLibraryProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>(PRODUCT_CATEGORIES[0].name);
  const [subcategory, setSubcategory] = useState<string>("All");
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(products[0]?.id ?? null);
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  const activeCategory = PRODUCT_CATEGORIES.find((c) => c.name === category);
  const subcategories = activeCategory ? activeCategory.subcategories : [];

  // search + category + subcategory all apply together (AND)
  const q = search.trim().toLowerCase();
  const visibleProducts = products.filter((p) => {
    if (category && p.category !== category) return false;
    if (subcategory !== "All" && p.subcategory !== subcategory) return false;
    if (q && !p.name.toLowerCase().includes(q) && !p.category.toLowerCase().includes(q) && !p.subcategory.toLowerCase().includes(q)) return false;
    return true;
  });
  const selectedProduct = visibleProducts.find((p) => p.id === selectedId) ?? null;

  return (
    <div className="bg-[#f5f5f5] content-stretch flex flex-col items-start min-h-screen p-[24px] relative w-full" data-name="Product Library">
      <div className="content-stretch flex flex-col lg:flex-row gap-[16px] lg:h-[1018px] items-start lg:justify-center relative shrink-0 w-full max-w-[1392px] mx-auto" data-name="Sidebar Container">
        <div className="content-stretch flex lg:h-[969px] items-start relative shrink-0 w-full lg:w-auto">
          <div className="content-stretch flex flex-col gap-[24px] lg:h-full items-start relative shrink-0 w-full lg:w-[201px]">
            <UserProfile />
            <SideBar className="lg:h-[940px] relative shrink-0 w-full lg:w-[200px]" active="productLibrary" onNavigate={onNavigate} />
          </div>
        </div>
        <div className="content-stretch flex flex-col gap-[19px] items-end relative shrink-0 w-full lg:w-auto lg:flex-[1_0_0] lg:max-w-[1159px] min-w-0">
          <TopBar />
          <div className="content-stretch flex items-start justify-end relative shrink-0 w-full">
            <div className="content-stretch flex flex-[1_0_0] flex-col gap-[24px] items-start min-w-px relative">
              {/* Stats strip */}
              <div className="bg-white content-stretch flex flex-col xl:flex-row items-start justify-between py-[16px] relative rounded-[24px] shrink-0 w-full">
                <StatItem
                  title="Total Items"
                  value="420"
                  icon={
                    <div className="h-[32px] relative shrink-0 w-[50.126px]" data-name="Icons/Money/Cash/Version-2">
                      <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <img alt="" className="absolute h-[164.33%] left-[-17.86%] max-w-none top-[-48.6%] w-[131.13%]" src={statCash} />
                      </div>
                    </div>
                  }
                />
                <StatItem
                  title="Available for Auction"
                  value="120"
                  icon={
                    <div className="h-[32px] relative shrink-0 w-[44.999px]" data-name="Icons/Cards/Summer-2">
                      <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <img alt="" className="absolute h-[168.91%] left-[-8.52%] max-w-none top-[-34.85%] w-[120.12%]" src={statSummer2} />
                      </div>
                    </div>
                  }
                />
                <StatItem
                  title="In Active Auctions"
                  value="30"
                  icon={
                    <div className="h-[32px] relative shrink-0 w-[37px]" data-name="Icons/Cards/Summer-2">
                      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={statSummer3} />
                    </div>
                  }
                />
                <StatItem
                  title="Pending Inspection"
                  value="15"
                  wideLabel
                  last
                  icon={
                    <div className="h-[32px] relative shrink-0 w-[30.222px]" data-name="Icons/Cards/Summer-2">
                      <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <img alt="" className="absolute h-[177.78%] left-[-79.9%] max-w-none top-[-38.89%] w-[250.98%]" src={statSummer4} />
                      </div>
                    </div>
                  }
                />
              </div>

              {/* Filter card */}
              <div className="bg-white content-stretch flex flex-col items-start overflow-clip p-[16px] relative rounded-[24px] shrink-0 w-full">
                <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
                  <div className="content-stretch flex flex-col gap-[16px] items-start justify-center relative shrink-0 w-full">
                    <div className="bg-[#f5f5f5] content-stretch flex items-center p-[8px] relative rounded-[40px] shrink-0 w-full">
                      <div className="content-stretch flex flex-col md:flex-row flex-[1_0_0] gap-[16px] items-stretch md:items-center min-w-px relative">
                        <div className="bg-white border border-[#dadada] border-solid content-stretch flex md:flex-[1_0_0] h-[40px] items-center justify-between min-w-px px-[16px] py-[11px] relative rounded-[24px]">
                          <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-w-px relative">
                            <SearchIcon />
                            <input
                              type="text"
                              value={search}
                              onChange={(e) => setSearch(e.target.value)}
                              placeholder="Search Here By Category and Item Name"
                              className="[word-break:break-word] bg-transparent border-none outline-none font-cairo font-normal leading-[18px] relative flex-[1_0_0] min-w-px text-[#131313] text-[12px] placeholder:text-[rgba(19,19,19,0.7)]"
                            />
                          </div>
                          <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Right Icons">
                            <button type="button" onClick={() => setSearch("")} className="cursor-pointer" aria-label="Clear search">
                              <ClearIcon />
                            </button>
                          </div>
                        </div>
                        <div className="relative shrink-0 md:w-[192px]">
                          <button
                            type="button"
                            aria-haspopup="listbox"
                            aria-expanded={categoryOpen}
                            onClick={() => setCategoryOpen((o) => !o)}
                            className="bg-white border border-[#dadada] border-solid content-stretch flex h-[40px] items-center justify-between px-[16px] py-[11px] relative rounded-[24px] shrink-0 w-full md:w-[192px] cursor-pointer"
                          >
                            <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
                              <CategoryIcon />
                              <div className="[word-break:break-word] flex flex-col font-cairo font-normal justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(19,19,19,0.7)] whitespace-nowrap">
                                <p className="leading-[18px]">{category}</p>
                              </div>
                            </div>
                            <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Right Icons">
                              <DropdownArrowIcon />
                            </div>
                          </button>
                          {categoryOpen && (
                            <>
                              {/* click-away backdrop — closes without document-level listeners */}
                              <div className="fixed inset-0 z-10 cursor-default" aria-hidden onClick={() => setCategoryOpen(false)} />
                              <div role="listbox" className="absolute left-0 right-0 top-[44px] z-20 bg-white border border-[#f5f5f5] border-solid rounded-[8px] overflow-hidden overflow-y-auto max-h-[280px] shadow-[0px_4px_16px_rgba(19,19,19,0.08)]">
                                {PRODUCT_CATEGORIES.map((c) => (
                                  <button
                                    key={c.name}
                                    type="button"
                                    role="option"
                                    aria-selected={c.name === category}
                                    onClick={() => {
                                      setCategory(c.name);
                                      // subcategory options depend on the chosen category
                                      setSubcategory("All");
                                      setCategoryOpen(false);
                                    }}
                                    className="block w-full text-left px-[16px] py-[10px] font-cairo font-semibold text-[14px] text-[#131313] cursor-pointer hover:bg-[#f9f9f9]"
                                  >
                                    {c.name}
                                  </button>
                                ))}
                              </div>
                            </>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={onAddNewItem}
                          className="bg-[#1b9e74] content-stretch flex h-[40px] items-center justify-center px-[16px] py-[8px] relative rounded-[24px] shrink-0 cursor-pointer"
                        >
                          <div className="[word-break:break-word] flex flex-col font-cairo font-bold justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap">
                            <p className="leading-[normal] whitespace-pre">{`+  Add New Item`}</p>
                          </div>
                        </button>
                      </div>
                    </div>
                    {subcategories.length > 0 && (
                      <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-full">
                        <div className="content-stretch flex flex-wrap flex-[1_0_0] gap-[8px] items-center min-w-px relative">
                          {["All", ...subcategories].map((sub) => {
                            const active = subcategory === sub;
                            return (
                              <button
                                key={sub}
                                type="button"
                                onClick={() => setSubcategory(sub)}
                                className={`${active ? "bg-[#28459d]" : "bg-[rgba(245,245,245,0.2)]"} content-stretch flex h-[32px] items-center justify-center px-[16px] py-[8px] relative rounded-[24px] shrink-0 cursor-pointer`}
                              >
                                <div className={`[word-break:break-word] flex flex-col font-cairo ${active ? "font-bold text-white" : "font-medium text-[#828282]"} justify-center leading-[0] not-italic relative shrink-0 text-[16px] whitespace-nowrap`}>
                                  <p className="leading-[normal]">{sub}</p>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Product list + detail panel */}
              <div className="content-stretch flex flex-col lg:flex-row gap-[24px] lg:h-[728px] items-start relative shrink-0 w-full">
                <div className="content-stretch flex flex-[1_0_0] flex-col lg:h-full items-start min-w-px relative w-full lg:w-auto">
                  <div className="bg-white content-stretch flex flex-col lg:h-[621px] items-start p-[16px] relative rounded-[24px] shrink-0 w-full">
                    <div className="content-stretch flex flex-col gap-[16px] items-start overflow-clip relative shrink-0 w-full lg:overflow-y-auto lg:max-h-[589px]">
                      <div className="border-[#f5f5f5] border-b border-solid content-stretch flex items-center pb-[16px] relative shrink-0 w-full">
                        <div className="content-stretch flex gap-[5px] items-center relative shrink-0">
                          <ProductIcon size={14} />
                          <div className="[word-break:break-word] flex flex-col font-cairo font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#131313] text-[16px] whitespace-nowrap">
                            <p className="leading-[normal]" dir="auto">
                              All Products
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
                        {visibleProducts.length === 0 ? (
                          <div className="font-cairo font-semibold text-[14px] text-[rgba(19,19,19,0.4)]">No products match the current filters</div>
                        ) : (
                          visibleProducts.map((p) => (
                            <ProductListRow key={p.id} product={p} selected={p.id === selectedId} onToggle={() => setSelectedId(p.id === selectedId ? null : p.id)} />
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                {selectedProduct && (
                  <ProductDetailsScreen
                    key={selectedProduct.id}
                    product={selectedProduct}
                    onClose={() => setSelectedId(null)}
                    onDelete={() => setConfirmingDelete(true)}
                    onEdit={() => onEditProduct(selectedProduct)}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {confirmingDelete && selectedProduct && (
        <ConfirmDeleteDialog
          productName={selectedProduct.name}
          onCancel={() => setConfirmingDelete(false)}
          onConfirm={() => {
            setConfirmingDelete(false);
            setSelectedId(null);
            onDeleteProduct(selectedProduct.id);
          }}
        />
      )}
    </div>
  );
}
