import { useState } from "react";
import { CloseCrossButton } from "./icons2";
import { CarouselArrow, UniquenessIcon, ColorPaletteIcon, ScalesIcon, PriceIcon, CubeIcon, SurveyIcon, TrashCan24Icon, EditIcon } from "./icons3";
import { formatDimensions } from "../data";
import type { LibraryProduct } from "../data";

type ProductDetailsScreenProps = {
  product: LibraryProduct;
  onClose: () => void;
  onDelete: () => void;
  onEdit: () => void;
};

/* "Product Details Screen" — right-hand detail panel (Figma 180:13878) */
export default function ProductDetailsScreen({ product, onClose, onDelete, onEdit }: ProductDetailsScreenProps) {
  const [imageIndex, setImageIndex] = useState(0);
  const images = product.images.length > 0 ? product.images : [];
  const cycle = (dir: 1 | -1) => setImageIndex((i) => (i + dir + images.length) % images.length);
  const thumbs = [images[(imageIndex + 1) % images.length], images[(imageIndex + 2) % images.length]].filter(Boolean);

  return (
    <div className="bg-white content-stretch flex flex-col lg:h-[639px] items-start p-[16px] relative rounded-[24px] shrink-0 w-full lg:w-auto" data-name="Product Details Screen">
      <div className="content-stretch flex lg:h-[623px] items-start overflow-x-clip overflow-y-auto relative shrink-0 w-full lg:w-auto">
        <div className="content-stretch flex flex-col gap-[16px] lg:h-[623px] items-center overflow-clip relative shrink-0 w-full lg:w-[552px]">
          <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
            <div className="border-[#f5f5f5] border-b border-solid content-stretch flex items-center pb-[8px] relative shrink-0 w-full lg:w-[552px]">
              <div className="content-stretch flex flex-[1_0_0] items-center justify-between min-w-px relative">
                <div className="[word-break:break-word] flex flex-col font-cairo font-bold justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-[rgba(19,19,19,0.7)] whitespace-nowrap">
                  <p className="leading-[normal]">{product.detailTitle}</p>
                </div>
                <div className="content-stretch flex h-[40px] items-center justify-end relative shrink-0 lg:w-[329px]">
                  <CloseCrossButton onClick={onClose} />
                </div>
              </div>
            </div>
            <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
              <div className="content-stretch flex flex-col sm:flex-row gap-[8px] sm:h-[230px] items-start relative rounded-[24px] shrink-0 w-full lg:w-[548px]">
                <div className="h-[230px] overflow-clip relative rounded-[24px] shrink-0 w-full sm:w-auto sm:flex-1 lg:flex-none lg:w-[397px]">
                  <img alt={product.name} className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[24px] size-full" src={images[imageIndex]} />
                  <div className="absolute content-stretch flex gap-[12px] items-center right-[8px] bottom-[8px]">
                    <button type="button" onClick={() => cycle(-1)} className="cursor-pointer" aria-label="Previous image">
                      <CarouselArrow direction="prev" />
                    </button>
                    <button type="button" onClick={() => cycle(1)} className="cursor-pointer" aria-label="Next image">
                      <CarouselArrow direction="next" />
                    </button>
                  </div>
                </div>
                <div className="content-stretch flex sm:flex-col gap-[8px] h-[230px] items-start relative shrink-0">
                  {thumbs.map((src, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setImageIndex((imageIndex + i + 1) % images.length)}
                      className="h-[111px] relative rounded-[24px] shrink-0 w-[143px] cursor-pointer"
                      aria-label={`View image ${((imageIndex + i + 1) % images.length) + 1}`}
                    >
                      <div aria-hidden className="absolute inset-0 pointer-events-none rounded-[24px]">
                        <div className="absolute bg-white inset-0 rounded-[24px]" />
                        <img alt="" className="absolute max-w-none object-cover rounded-[24px] size-full" src={src} />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="content-stretch flex flex-col gap-[12px] items-end justify-center relative shrink-0 w-full">
            <div className="bg-white border-[1.042px] border-[#f6f6f7] border-solid content-stretch flex flex-col gap-[8px] items-start p-[8px] relative rounded-[12px] shrink-0 w-full" data-name="Card Info">
              <div className="border-[#f6f6f7] border-b-[1.042px] border-solid content-stretch flex items-center justify-center pb-[8.334px] relative shrink-0 w-full">
                <div className="[word-break:break-word] flex flex-[1_0_0] flex-col font-cairo font-bold h-[20.836px] justify-center leading-[0] min-w-px not-italic relative text-[14px] text-[#131313]">
                  <p className="leading-[normal]" dir="auto">
                    Product Details
                  </p>
                </div>
              </div>
              <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
                <div className="content-stretch flex flex-col sm:flex-row gap-[4px] sm:gap-[171.898px] items-start relative shrink-0 w-full">
                  <div className="content-stretch flex gap-[8.334px] items-center relative shrink-0">
                    <UniquenessIcon />
                    <div className="[word-break:break-word] flex flex-col font-cairo font-medium justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-[#4a4a4a] text-right whitespace-nowrap">
                      <p className="leading-[normal]" dir="auto">
                        {product.category}
                      </p>
                    </div>
                  </div>
                  <div className="content-stretch flex gap-[8.334px] items-center justify-end relative shrink-0">
                    <ColorPaletteIcon />
                    <div className="[word-break:break-word] flex flex-col font-cairo font-medium justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-[#4a4a4a] text-right whitespace-nowrap">
                      <p className="leading-[normal]" dir="auto">
                        {product.subcategory}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex flex-col sm:flex-row gap-[4px] sm:gap-[152px] items-start relative shrink-0 w-full">
                  <div className="content-stretch flex gap-[8.334px] items-center relative shrink-0">
                    <ScalesIcon />
                    <div className="[word-break:break-word] flex flex-col font-cairo font-medium justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-[#4a4a4a] text-right whitespace-nowrap">
                      <p className="leading-[normal]" dir="auto">
                        {product.weight}
                      </p>
                    </div>
                  </div>
                  <div className="content-stretch flex gap-[8.334px] items-center justify-end relative shrink-0">
                    <PriceIcon />
                    <div className="[word-break:break-word] flex flex-col font-cairo font-medium justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-[#4a4a4a] text-right whitespace-nowrap">
                      <p className="leading-[normal]" dir="auto">
                        Color: {product.color || "-"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex flex-col sm:flex-row gap-[4px] sm:gap-[73.968px] items-start relative shrink-0 w-full">
                  <div className="content-stretch flex gap-[8.334px] items-center justify-end relative shrink-0">
                    <CubeIcon />
                    <div className="[word-break:break-word] flex flex-col font-cairo font-medium justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-[#4a4a4a] text-right whitespace-nowrap">
                      <p className="leading-[normal]" dir="auto">
                        Dimensions: {formatDimensions(product.dimensions)}
                      </p>
                    </div>
                  </div>
                  <div className="content-stretch flex gap-[8.334px] items-center justify-end relative shrink-0">
                    <SurveyIcon />
                    <div className="[word-break:break-word] flex flex-col font-cairo font-medium justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-[#4a4a4a] text-right whitespace-nowrap">
                      <p className="leading-[normal]" dir="auto">
                        {product.condition}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white border-[1.042px] border-[#f6f6f7] border-solid content-stretch flex flex-col gap-[8px] items-start p-[8px] relative rounded-[12px] shrink-0 w-full" data-name="Card Info">
              <div className="border-[#f6f6f7] border-b-[1.042px] border-solid content-stretch flex items-center justify-center pb-[8.334px] relative shrink-0 w-full">
                <div className="[word-break:break-word] flex flex-[1_0_0] flex-col font-cairo font-bold h-[20.836px] justify-center leading-[0] min-w-px not-italic relative text-[14px] text-[#131313]">
                  <p className="leading-[normal]" dir="auto">
                    Product Description
                  </p>
                </div>
              </div>
              <div className="[word-break:break-word] flex flex-col font-cairo font-medium justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-[#4a4a4a] w-full">
                <p className="leading-[normal]" dir="auto">
                  {product.description}
                </p>
              </div>
            </div>
            <div className="content-stretch flex gap-[16px] h-[40px] items-center justify-end relative shrink-0 w-[329px] max-w-full">
              <button
                type="button"
                onClick={onDelete}
                className="bg-[#f6f6f7] content-stretch flex flex-col items-center justify-center overflow-clip p-[8px] relative rounded-[32px] shrink-0 size-[40px] cursor-pointer"
                aria-label="Delete product"
                data-name="arrow btn"
              >
                <TrashCan24Icon />
              </button>
              <button
                type="button"
                onClick={onEdit}
                className="bg-[#28459d] content-stretch flex gap-[8px] h-[40px] items-center justify-center px-[16px] py-[8px] relative rounded-[24px] shrink-0 cursor-pointer"
              >
                <EditIcon />
                <div className="[word-break:break-word] flex flex-col font-cairo font-bold justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">
                  <p className="leading-[normal]">Edit Product</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
