import type { Meta, StoryObj } from '@storybook/react';
import { PriceText } from './PriceText';

const meta: Meta<typeof PriceText> = {
  title: 'Atoms/PriceText',
  component: PriceText,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['current', 'old'],
    },
    currency: {
      control: 'text',
      description: 'Mã tiền tệ ISO (Ví dụ: USD, EUR, VND)',
    },
  },
  args: {
    value: 120,
    variant: 'current',
    currency: 'USD',
  },
};

export default meta;
type Story = StoryObj<typeof PriceText>;

export const CurrentPrice: Story = {
  args: {
    variant: 'current',
    value: 1250, // Test xem có tự thêm dấu phẩy phân tách hàng nghìn ($1,250) không
  },
};

export const OldPrice: Story = {
  args: {
    variant: 'old',
    value: 1600, // Test xem có ăn gạch ngang và đổi màu xám không
  },
};

export const OtherCurrency: Story = {
  args: {
    variant: 'current',
    value: 100,
    currency: 'EUR', // Test độ linh hoạt của hàm với đồng Euro (€100)
  },
};