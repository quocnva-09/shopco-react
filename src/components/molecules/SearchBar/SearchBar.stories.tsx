import type { Meta, StoryObj } from '@storybook/react';
import { SearchBar } from './SearchBar';

const meta: Meta<typeof SearchBar> = {
  title: 'Molecules/SearchBar',
  component: SearchBar,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof SearchBar>;

// 1. Desktop view
export const Desktop: Story = {
  render: () => (
    <div style={{ width: '400px' }}> {/* Wrapper div to constrain the test container */}
      <SearchBar />
    </div>
  ),
};

// 2. Mobile view (using Storybook's simulated viewport)
export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  render: () => <SearchBar />,
};