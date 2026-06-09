import type { Meta, StoryObj } from '@storybook/react';
import { Rating } from './index';

const meta: Meta<typeof Rating> = {
  title: 'Atoms/Rating',
  component: Rating,
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'number', min: 0, max: 5, step: 0.5 },
      description: 'Rating score (supports 0.5 step increments for testing half stars)',
    },
    variant: {
      control: 'inline-radio',
      options: ['default', 'row'],
      description: 'Display variant: default (inside card) or row (inside a filter with hover)',
    },
    showText: {
      control: 'boolean',
      description: 'Toggle visibility of the numeric score text (e.g. 4.5/5)',
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

// 1. Default state used in ProductCard (with score text, no hover)
export const DefaultInCard: Story = {
  args: {
    value: 4.5,
    variant: 'default',
    showText: true,
  },
};

// 2. Test half star (4.5) and whole star (4.0)
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

// 3. Row variant for Filter selector (with fade hover effect)
export const FilterRow: Story = {
  args: {
    value: 4.0,
    variant: 'row',
    showText: false, // Filter sidebar usually only needs the star row, no /5 text
  },
  render: (args) => (
    <div style={{ maxWidth: '200px', padding: '10px', border: '1px dashed #ccc' }}>
      <p style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>Hover over to check hover opacity:</p>
      <Rating {...args} />
    </div>
  ),
};

// 4. Hidden numeric text state (stars only, no score text)
export const StarsOnly: Story = {
  args: {
    value: 5.0,
    variant: 'default',
    showText: false,
  },
};