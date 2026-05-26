import type { Meta, StoryObj } from '@storybook/react';
import { NotificationBar } from './NotificationBar';

const meta: Meta<typeof NotificationBar> = {
  title: 'Organisms/NotificationBar',
  component: NotificationBar,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof NotificationBar>;

export const Default: Story = {};
