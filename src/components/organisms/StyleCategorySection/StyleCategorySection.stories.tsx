import type { Meta, StoryObj } from '@storybook/react';
import { StyleCategorySection } from './StyleCategorySection';
import { defaultStyleCategories } from './StyleCategorySection.data';

const meta: Meta<typeof StyleCategorySection> = {
  title: 'Organisms/StyleCategorySection',
  component: StyleCategorySection,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'Section title',
    },
  },
  args: {
    title: 'BROWSE BY DRESS STYLE',
    categories: defaultStyleCategories,
  },
};

export default meta;
type Story = StoryObj<typeof StyleCategorySection>;

// 1. Default — full section with 4 categories (real images from public/style-categories)
export const Default: Story = {
  render: (args) => (
    <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 100px' }}>
      <StyleCategorySection {...args} />
    </div>
  ),
};

// 2. Mobile View — test grid collapse sang single column
export const MobileView: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  render: (args) => (
    <div style={{ padding: '0 16px' }}>
      <StyleCategorySection {...args} />
    </div>
  ),
};
