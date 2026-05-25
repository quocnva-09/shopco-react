import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { NotificationBar } from './NotificationBar';

const meta: Meta<typeof NotificationBar> = {
  title: 'Organisms/NotificationBar',
  component: NotificationBar,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof NotificationBar>;

export const Default: Story = {};
