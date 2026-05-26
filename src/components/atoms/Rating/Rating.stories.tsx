import type { Meta, StoryObj } from '@storybook/react';
import { Rating } from './Rating';

const meta: Meta<typeof Rating> = {
  title: 'Atoms/Rating',
  component: Rating,
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'number', min: 0, max: 5, step: 0.5 },
      description: 'Số điểm đánh giá (Hỗ trợ bước nhảy 0.5 để test nửa sao)',
    },
    variant: {
      control: 'inline-radio',
      options: ['default', 'row'],
      description: 'Biến thể hiển thị: default (trong card) hoặc row (trong bộ lọc có hover)',
    },
    showText: {
      control: 'boolean',
      description: 'Bật/tắt hiển thị chữ số kèm theo (ví dụ: 4.5/5)',
    },
  },
  args: {
    value: 4.5,
    variant: 'default',
    showText: true,
  },
};

export default meta;
type Story = StoryObj<typeof Rating>;

// 1. Trạng thái mặc định dùng trong ProductCard (Có text điểm số, không hover)
export const DefaultInCard: Story = {
  args: {
    value: 4.5,
    variant: 'default',
    showText: true,
  },
};

// 2. Trạng thái test Nửa Sao (4.5) và Sao Chẵn (4.0)
export const FullStarOnly: Story = {
  args: {
    value: 4.0,
    variant: 'default',
    showText: true,
  },
};

export const WithHalfStar: Story = {
  args: {
    value: 3.5,
    variant: 'default',
    showText: true,
  },
};

// 3. Biến thể hàng chọn trong Bộ lọc (Rating Row - Có hiệu ứng Hover mờ đi)
export const FilterRow: Story = {
  args: {
    value: 4.0,
    variant: 'row',
    showText: false, // Thường bộ lọc bên sidebar chỉ cần hàng sao, không cần text /5
  },
  render: (args) => (
    <div style={{ maxWidth: '200px', padding: '10px', border: '1px dashed #ccc' }}>
      <p style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>Rê chuột vào để check hover opacity:</p>
      <Rating {...args} />
    </div>
  ),
};

// 4. Trạng thái ẩn phần chữ số (Chỉ hiển thị cụm sao thuần túy)
export const StarsOnly: Story = {
  args: {
    value: 5.0,
    variant: 'default',
    showText: false,
  },
};