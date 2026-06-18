import { type ComponentPropsWithoutRef, useState, useEffect } from "react";
import clsx from "clsx";
import { FilterHeader } from "@/components/molecules/FilterHeader";
import { FilterGroup } from "@/components/molecules/FilterGroup";
import { FilterListItem } from "@/components/molecules/FilterListItem";
import { PriceRangeSlider } from "@/components/molecules/PriceRangeSlider";
import { ColorSelector } from "@/components/molecules/ColorSelector";
import { SizeSelector } from "@/components/molecules/SizeSelector";
import { Button } from "@/components/atoms/Button";
import { IconButton } from "@/components/atoms/IconButton";
import "./index.scss";

import type { CategoryApi, ColorApi, SizeApi, StyleApi } from "@/types/api/master-data.api";

export type SidebarFilterProps = ComponentPropsWithoutRef<"aside"> & {
  categories: CategoryApi[];
  colors: ColorApi[];
  sizes: SizeApi[];
  styles: StyleApi[];
  initialFilters?: {
    category_slug?: string;
    colors?: string[]; // IDs or names? The API uses names. We'll use IDs here for internal UI state and map to names when applying, or just use names. ColorItem uses id. Let's use id.
    sizes?: string[]; // names
    style_slugs?: string[];
    min_price?: number;
    max_price?: number;
  };
  onApplyFilter?: (filters: {
    category_slug?: string;
    colors?: string[];
    sizes?: string[];
    style_slugs?: string[];
    min_price?: number;
    max_price?: number;
  }) => void;
  onClose?: () => void;
};

export const SidebarFilter = ({
  categories,
  colors,
  sizes,
  styles,
  initialFilters,
  onApplyFilter,
  onClose,
  className,
  ...rest
}: SidebarFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);

  // Internal state for filters
  const [priceRange, setPriceRange] = useState<[number, number]>([
    initialFilters?.min_price ?? 50,
    initialFilters?.max_price ?? 200,
  ]);
  
  // Note: Since ColorSelector and SizeSelector currently only support single selection (radio), 
  // we will map the first array element to the ID.
  // We need to map string name from URL to ID for the selectors.
  const initialColor = colors.find(c => initialFilters?.colors?.includes(c.name))?.id;
  const initialSize = sizes.find(s => initialFilters?.sizes?.includes(s.name))?.id;
  
  const [selectedColorId, setSelectedColorId] = useState<number | undefined>(initialColor);
  const [selectedSizeId, setSelectedSizeId] = useState<number | undefined>(initialSize);

  // Sync internal state when initialFilters prop changes (e.g., from URL updates)
  useEffect(() => {
    setPriceRange([
      initialFilters?.min_price ?? 50,
      initialFilters?.max_price ?? 200,
    ]);
    setSelectedColorId(colors.find(c => initialFilters?.colors?.includes(c.name))?.id);
    setSelectedSizeId(sizes.find(s => initialFilters?.sizes?.includes(s.name))?.id);
  }, [initialFilters, colors, sizes]);


  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    onClose?.();
  };

  return (
    <>
      <IconButton
        svgName="icn-filter"
        className="sidebar-filter__mobile-trigger"
        onClick={() => setIsOpen(true)}
      />

      <div
        className={clsx(
          "sidebar-filter__overlay",
          isOpen && "sidebar-filter__overlay--open",
        )}
        onClick={handleClose}
      />

      <aside
        className={clsx(
          "sidebar-filter",
          isOpen && "sidebar-filter--open",
          className,
        )}
        {...rest}
      >
        <div className="sidebar-filter__header-container">
          <FilterHeader
            title="Filters"
            iconName={isOpen ? "icn-close" : "icn-filter"}
            iconWidth={20}
            iconHeight={19}
            onIconClick={isOpen ? handleClose : onClose}
            className="sidebar-filter__main-header"
          />
        </div>

        <div className="sidebar-filter__divider" />

        <div className="sidebar-filter__scrollable-content">
          <div className="sidebar-filter__content">
            {/* Categories (No Header) */}
            <div className="filter-group">
              <div className="sidebar-filter__list">
                {categories.map((cat) => (
                  <FilterListItem
                    key={cat.id}
                    label={cat.name}
                    href={`/category?category_slug=${cat.slug}`}
                  />
                ))}
              </div>
            </div>

            {/* Price */}
            <FilterGroup defaultOpen>
              <FilterGroup.Header title="Price" />
              <FilterGroup.Content>
                <PriceRangeSlider
                  min={50}
                  max={200}
                  defaultMinValue={priceRange[0]}
                  defaultMaxValue={priceRange[1]}
                  onChange={setPriceRange}
                />
              </FilterGroup.Content>
            </FilterGroup>

            {/* Colors */}
            <FilterGroup defaultOpen>
              <FilterGroup.Header title="Colors" />
              <FilterGroup.Content>
                <ColorSelector 
                  name="sidebar-colors" 
                  colors={colors.map(c => ({ id: c.id, name: c.name, hexCode: c.hex_code }))} 
                  defaultValue={selectedColorId}
                  onChange={setSelectedColorId}
                />
              </FilterGroup.Content>
            </FilterGroup>

            {/* Size */}
            <FilterGroup defaultOpen>
              <FilterGroup.Header title="Size" />
              <FilterGroup.Content>
                <SizeSelector 
                  name="sidebar-sizes" 
                  sizes={sizes} 
                  defaultValue={selectedSizeId}
                  onChange={setSelectedSizeId}
                />
              </FilterGroup.Content>
            </FilterGroup>

            {/* Dress Style */}
            <FilterGroup defaultOpen>
              <FilterGroup.Header title="Dress Style" />
              <FilterGroup.Content>
                <div className="sidebar-filter__list">
                  {styles.map((style) => {
                    const currentCategorySlug = initialFilters?.category_slug ? `category_slug=${initialFilters.category_slug}&` : "";
                    return (
                      <FilterListItem
                        key={style.id}
                        label={style.name}
                        href={`/category?${currentCategorySlug}style_slugs=${style.slug}`}
                      />
                    );
                  })}
                </div>
              </FilterGroup.Content>
            </FilterGroup>
          </div>
        </div>

        <div className="sidebar-filter__footer-container">
          <Button
            variant="solid"
            colorScheme="dark"
            className="sidebar-filter__apply-btn"
            onClick={() => {
              handleClose();
              if (onApplyFilter) {
                const selectedColorName = colors.find(c => c.id === selectedColorId)?.name;
                const selectedSizeName = sizes.find(s => s.id === selectedSizeId)?.name;
                
                onApplyFilter({
                  category_slug: initialFilters?.category_slug,
                  style_slugs: initialFilters?.style_slugs,
                  colors: selectedColorName ? [selectedColorName] : undefined,
                  sizes: selectedSizeName ? [selectedSizeName] : undefined,
                  min_price: priceRange[0],
                  max_price: priceRange[1],
                });
              }
            }}
          >
            Apply Filter
          </Button>
        </div>
      </aside>
    </>
  );
};
