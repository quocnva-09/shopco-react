import type { Meta, StoryObj } from '@storybook/react';
import { StyleCategoryCard } from './StyleCategoryCard';
import { defaultStyleCategories } from '@/components/organisms/StyleCategorySection';

const [casual, formal, party, gym] = defaultStyleCategories;

const meta: Meta<typeof StyleCategoryCard> = {
  title: 'Molecules/StyleCategoryCard',
  component: StyleCategoryCard,
  tags: ['autodocs'],
  argTypes: {
    category: {
      description: 'Dữ liệu category (label, image, variant)',
    },
  },
  args: {
    category: casual,
  },
};

export default meta;
type Story = StoryObj<typeof StyleCategoryCard>;

// 1. Casual variant
export const Casual: Story = {
  args: { category: casual },
  render: (args) => (
    <div style={{ width: '300px', height: '250px' }}>
      <StyleCategoryCard {...args} />
    </div>
  ),
};

// 2. Formal variant
export const Formal: Story = {
  args: { category: formal },
  render: (args) => (
    <div style={{ width: '450px', height: '250px' }}>
      <StyleCategoryCard {...args} />
    </div>
  ),
};

// 3. All variants — so sánh kích thước
export const AllVariants: Story = {
  render: () => (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(10, 1fr)',
      gap: '20px',
      gridAutoRows: '250px',
      maxWidth: '1200px',
    }}>
      <div style={{ gridColumn: 'span 4' }}>
        <StyleCategoryCard category={casual} />
      </div>
      <div style={{ gridColumn: 'span 6' }}>
        <StyleCategoryCard category={formal} />
      </div>
      <div style={{ gridColumn: 'span 6' }}>
        <StyleCategoryCard category={party} />
      </div>
      <div style={{ gridColumn: 'span 4' }}>
        <StyleCategoryCard category={gym} />
      </div>
    </div>
  ),
};
