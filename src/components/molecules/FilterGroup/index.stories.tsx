import type { Meta, StoryObj } from "@storybook/react";
import { FilterGroup } from "./index";
import { ColorSelector } from "@/components/molecules/ColorSelector";
import { SizeSelector } from "@/components/molecules/SizeSelector";
import { FilterListItem } from "@/components/molecules/FilterListItem";
import { PriceRangeSlider } from "@/components/molecules/PriceRangeSlider";

const meta = {
  title: "Components/Molecules/FilterGroup",
  component: FilterGroup,
  tags: ["autodocs"],
} satisfies Meta<typeof FilterGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

const MOCK_COLORS = [
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

const MOCK_SIZES = [
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

const MOCK_CATEGORIES = [
  { id: 1, label: "T-shirts", href: "/categories/t-shirts" },
  { id: 2, label: "Shorts", href: "/categories/shorts" },
  { id: 3, label: "Shirts", href: "/categories/shirts" },
  { id: 4, label: "Hoodie", href: "/categories/hoodie" },
  { id: 5, label: "Jeans", href: "/categories/jeans" },
];

export const Default: Story = {
  args: {
    defaultOpen: true,
    children: (
      <>
        <FilterGroup.Header title="Colors" />
        <FilterGroup.Content>
          <ColorSelector
            name="colors"
            colors={MOCK_COLORS}
            className="color-selector--filter"
          />
        </FilterGroup.Content>
      </>
    ),
  },
  render: (args) => (
    <div
      style={{
        maxWidth: 247,
        border: "1px solid #eaeaea",
      }}
    >
      <FilterGroup {...args} />
    </div>
  ),
};

export const ClosedByDefault: Story = {
  args: {
    defaultOpen: false,
    children: (
      <>
        <FilterGroup.Header title="Colors" />
        <FilterGroup.Content>
          <ColorSelector name="colors" colors={MOCK_COLORS} />
        </FilterGroup.Content>
      </>
    ),
  },
  render: (args) => (
    <div
      style={{
        maxWidth: 300,
        padding: 20,
        border: "1px solid #eaeaea",
        borderRadius: 8,
      }}
    >
      <FilterGroup {...args} />
    </div>
  ),
};

export const SizeFilter: Story = {
  args: {
    defaultOpen: true,
    children: (
      <>
        <FilterGroup.Header title="Size" />
        <FilterGroup.Content>
          <SizeSelector name="sizes" sizes={MOCK_SIZES} />
        </FilterGroup.Content>
      </>
    ),
  },
  render: (args) => (
    <div
      style={{
        maxWidth: 247,
        border: "1px solid #eaeaea",
        borderRadius: 8,
      }}
    >
      <FilterGroup {...args} />
    </div>
  ),
};

export const CategoriesFilter: Story = {
  args: {
    defaultOpen: true,
    children: (
      <>
        <FilterGroup.Content>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {MOCK_CATEGORIES.map((category) => (
              <FilterListItem
                key={category.id}
                label={category.label}
                href={category.href}
              />
            ))}
          </div>
        </FilterGroup.Content>
      </>
    ),
  },
  render: (args) => (
    <div
      style={{
        maxWidth: 247,
        border: "1px solid #eaeaea",
        borderRadius: 8,
      }}
    >
      <FilterGroup {...args} />
    </div>
  ),
};

export const PriceFilter: Story = {
  args: {
    defaultOpen: true,
    children: (
      <>
        <FilterGroup.Header title="Price" />
        <FilterGroup.Content>
          <PriceRangeSlider
            min={50}
            max={200}
            defaultMinValue={50}
            defaultMaxValue={200}
          />
        </FilterGroup.Content>
      </>
    ),
  },
  render: (args) => (
    <div
      style={{
        maxWidth: 247,
        border: "1px solid #eaeaea",
        borderRadius: 8,
      }}
    >
      <FilterGroup {...args} />
    </div>
  ),
};
