import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { ProductGridHeader } from "./index";

const meta = {
  title: "Components/Organisms/ProductGridHeader",
  component: ProductGridHeader,
  tags: ["autodocs"],
} satisfies Meta<typeof ProductGridHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

const MOCK_SORT_OPTIONS = [
  { id: "popular", label: "Most Popular" },
  { id: "newest", label: "Newest Arrivals" },
  { id: "price-asc", label: "Price: Low to High" },
  { id: "price-desc", label: "Price: High to Low" },
];

export const Default: Story = {
  args: {
    title: "Casual",
    showingStart: 1,
    showingEnd: 10,
    totalProducts: 100,
    sortOptions: MOCK_SORT_OPTIONS,
  },
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [sort, setSort] = useState("popular");
    return (
      <ProductGridHeader
        {...args}
        sortValue={sort}
        onSortChange={setSort}
      />
    );
  },
};
