import type { Meta, StoryObj } from "@storybook/react";
import { Heading } from "./Heading";

const meta: Meta<typeof Heading> = {
  title: "Atoms/Heading",
  component: Heading,
  tags: ["autodocs"],
  argTypes: {
    as: {
      control: "inline-radio",
      options: ["h1", "h2", "h3", "h4", "h5", "h6"],
    },
    lineClamp: {
      control: { type: "number", min: 1, max: 5, step: 1 },
    },
    showTooltip: {
      control: "boolean",
    },
  },
  args: {
    as: "h3",
    lineClamp: 1,
    showTooltip: true,
    children: "Đây là một chuỗi tiêu đề sản phẩm siêu siêu dài để kiểm thử tính năng cắt chữ",
  },
};

export default meta;
type Story = StoryObj<typeof Heading>;

// 1. Giả lập đúng case Product Card (Cắt chữ trên 1 dòng kèm Tooltip)
export const ProductCardStyle: Story = {
  args: {
    as: "h3",
    lineClamp: 1,
    showTooltip: true,
  },
  render: (args) => (
    <div style={{ width: "200px", padding: "20px", border: "1px dashed #ccc" }}>
      <Heading {...args} />
    </div>
  ),
};

// 2. Giả lập cắt chữ nhiều dòng (Ví dụ: Cắt 2 dòng cho Blog)
export const MultiLineClamp: Story = {
  args: {
    as: "h2",
    lineClamp: 2,
    showTooltip: false,
    children: "Khám phá bộ sưu tập thời trang đường phố mới nhất vừa được ra mắt vào tháng này với những thiết kế vô cùng phá cách và độc đáo.",
  },
  render: (args) => (
    <div style={{ width: "250px", padding: "20px", border: "1px dashed #ccc" }}>
      <Heading {...args} />
    </div>
  ),
};