import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { PaginationBox } from "./index";

const meta = {
  title: "Components/Organisms/PaginationBox",
  component: PaginationBox,
  tags: ["autodocs"],
} satisfies Meta<typeof PaginationBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    currentPage: 1,
    totalPages: 10,
    onPageChange: () => {},
  },
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [page, setPage] = useState(args.currentPage);

    return (
      <div style={{ maxWidth: 920 }}>
        <PaginationBox {...args} currentPage={page} onPageChange={setPage} />
      </div>
    );
  },
};
