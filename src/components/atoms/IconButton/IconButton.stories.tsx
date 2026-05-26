import type { Meta, StoryObj } from "@storybook/react";
import { IconButton } from "./IconButton";

const meta: Meta<typeof IconButton> = {
  title: "Atoms/IconButton",
  component: IconButton,
  // Giúp bạn có một giao diện để click chọn màu, đổi tên SVG trực tiếp trên UI của Storybook
  argTypes: {
    color: { control: "color" },
    variant: {
      control: "select",
      options: ["default", "ghost", "circular"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof IconButton>;

// Kịch bản 1: Test nút dạng mặc định
export const Default: Story = {
  args: {
    svgName: "icn-cart",
    "aria-label": "Giỏ hàng",
    variant: "default",
  },
};

// Kịch bản 2: Test nút dạng Ghost (Nút Close X của bạn)
export const GhostClose: Story = {
  args: {
    svgName: "icn-close",
    "aria-label": "Đóng thông báo",
    variant: "ghost",
  },
};

// Kịch bản 3: Test nút hình tròn
export const CircularFilter: Story = {
  args: {
    svgName: "icn-filter",
    "aria-label": "Lọc",
    variant: "circular",
  },
};

export const Social: Story = {
  args: {
    svgName: "icn-github",
    "aria-label": "Người dùng",
    variant: "social",
  },
};
