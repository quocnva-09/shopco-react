import { type ComponentPropsWithoutRef } from "react";
import clsx from "clsx";
import { FilterHeader } from "@/components/molecules/FilterHeader";
import { FilterGroup } from "@/components/molecules/FilterGroup";
import { FilterListItem } from "@/components/molecules/FilterListItem";
import { PriceRangeSlider } from "@/components/molecules/PriceRangeSlider";
import { ColorSelector } from "@/components/molecules/ColorSelector";
import { SizeSelector } from "@/components/molecules/SizeSelector";
import { Button } from "@/components/atoms/Button";
import "./index.scss";

// Mock data
const CATEGORIES = [
  { id: 1, label: "T-shirts", href: "/categories/t-shirts" },
  { id: 2, label: "Shorts", href: "/categories/shorts" },
  { id: 3, label: "Shirts", href: "/categories/shirts" },
  { id: 4, label: "Hoodie", href: "/categories/hoodie" },
  { id: 5, label: "Jeans", href: "/categories/jeans" },
];

const COLORS = [
  { id: 1, name: "Green", hexCode: "#00C12B" },
  { id: 2, name: "Red", hexCode: "#F50606" },
  { id: 3, name: "Yellow", hexCode: "#F5DD06" },
  { id: 4, name: "Orange", hexCode: "#F57906" },
  { id: 5, name: "Light Blue", hexCode: "#06CAF5" },
  { id: 6, name: "Blue", hexCode: "#063AF5" },
  { id: 7, name: "Purple", hexCode: "#7D06F5" },
  { id: 8, name: "Pink", hexCode: "#F506A4" },
  { id: 9, name: "White", hexCode: "#FFFFFF" },
  { id: 10, name: "Black", hexCode: "#000000" },
];

const SIZES = [
  { id: 1, name: "XX-Small", label: "XX-Small" },
  { id: 2, name: "X-Small", label: "X-Small" },
  { id: 3, name: "Small", label: "Small" },
  { id: 4, name: "Medium", label: "Medium" },
  { id: 5, name: "Large", label: "Large" },
  { id: 6, name: "X-Large", label: "X-Large" },
  { id: 7, name: "XX-Large", label: "XX-Large" },
  { id: 8, name: "3X-Large", label: "3X-Large" },
  { id: 9, name: "4X-Large", label: "4X-Large" },
];

const DRESS_STYLES = [
  { id: 1, label: "Casual", href: "/styles/casual" },
  { id: 2, label: "Formal", href: "/styles/formal" },
  { id: 3, label: "Party", href: "/styles/party" },
  { id: 4, label: "Gym", href: "/styles/gym" },
];

export type SidebarFilterProps = ComponentPropsWithoutRef<"aside"> & {
  onApplyFilter?: () => void;
  onClose?: () => void;
};

export const SidebarFilter = ({
  onApplyFilter,
  onClose,
  className,
  ...rest
}: SidebarFilterProps) => {
  return (
    <aside className={clsx("sidebar-filter", className)} {...rest}>
      <FilterHeader
        title="Filters"
        iconName="icn-filter"
        iconWidth={20}
        iconHeight={19}
        onIconClick={onClose}
        className="sidebar-filter__main-header"
      />

      <div className="sidebar-filter__divider" />

      <div className="sidebar-filter__content">
        {/* Categories (No Header) */}
        <div className="filter-group">
          <div className="sidebar-filter__list">
            {CATEGORIES.map((cat) => (
              <FilterListItem key={cat.id} label={cat.label} href={cat.href} />
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
              defaultMinValue={50}
              defaultMaxValue={200}
            />
          </FilterGroup.Content>
        </FilterGroup>

        {/* Colors */}
        <FilterGroup defaultOpen>
          <FilterGroup.Header title="Colors" />
          <FilterGroup.Content>
            <ColorSelector name="sidebar-colors" colors={COLORS} />
          </FilterGroup.Content>
        </FilterGroup>

        {/* Size */}
        <FilterGroup defaultOpen>
          <FilterGroup.Header title="Size" />
          <FilterGroup.Content>
            <SizeSelector name="sidebar-sizes" sizes={SIZES} />
          </FilterGroup.Content>
        </FilterGroup>

        {/* Dress Style */}
        <FilterGroup defaultOpen>
          <FilterGroup.Header title="Dress Style" />
          <FilterGroup.Content>
            <div className="sidebar-filter__list">
              {DRESS_STYLES.map((style) => (
                <FilterListItem
                  key={style.id}
                  label={style.label}
                  href={style.href}
                />
              ))}
            </div>
          </FilterGroup.Content>
        </FilterGroup>
      </div>

      <Button
        variant="solid"
        colorScheme="dark"
        className="sidebar-filter__apply-btn"
        onClick={onApplyFilter}
      >
        Apply Filter
      </Button>
    </aside>
  );
};
