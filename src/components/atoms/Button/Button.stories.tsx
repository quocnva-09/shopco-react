import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    // Định nghĩa bảng điều khiển (Controls) trực quan trên Storybook
    variant: {
      control: 'inline-radio',
      options: ['solid', 'outline'],
      description: 'Kiểu dáng hiển thị của nút',
    },
    colorScheme: {
      control: 'inline-radio',
      options: ['dark', 'danger'],
      description: 'Hệ màu áp dụng cho nút',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Bật/tắt chế độ giãn căng 100% chiều ngang',
    },
    disabled: {
      control: 'boolean',
      description: 'Trạng thái vô hiệu hóa nút',
    },
  },
  args: {
    // Giá trị mặc định khi mở Storybook
    variant: 'solid',
    colorScheme: 'dark',
    fullWidth: false,
    disabled: false,
    children: 'Button Text',
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// 1. Trạng thái Solid Dark mặc định (Ví dụ: Shop Now, Add to Cart)
export const SolidDark: Story = {
  args: {
    variant: 'solid',
    colorScheme: 'dark',
    children: 'Shop Now',
  },
};

// 2. Trạng thái Outline Dark (Ví dụ: View All, Load More)
export const OutlineDark: Story = {
  args: {
    variant: 'outline',
    colorScheme: 'dark',
    children: 'View All',
  },
};

// 3. Trạng thái Co giãn hết cỡ (Full Width)
export const FullWidth: Story = {
  args: {
    variant: 'solid',
    colorScheme: 'dark',
    fullWidth: true,
    children: 'Add to Cart',
  },
  render: (args) => (
    <div style={{ width: '400px', padding: '20px', border: '1px dashed #ccc' }}>
      <p style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>Khung test giả lập rộng 400px:</p>
      <Button {...args} />
    </div>
  ),
};

// 4. Trạng thái chứa Icon (Kiểm tra căn chỉnh flexbox giữa text và icon)
export const WithIcon: Story = {
  args: {
    variant: 'outline',
    colorScheme: 'dark',
    children: 'Sign In with Google',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
      </svg>
    ),
    iconPosition: 'left',
  },
};

// 5. Biến thể màu đỏ nguy hiểm (Solid Danger)
export const SolidDanger: Story = {
  args: {
    variant: 'solid',
    colorScheme: 'danger',
    children: 'Delete Account',
  },
};

// 6. Trạng thái bị khóa (Disabled)
export const Disabled: Story = {
  args: {
    variant: 'solid',
    colorScheme: 'dark',
    disabled: true,
    children: 'Not Allowed',
  },
};