import type { Meta, StoryObj } from "@storybook/react";
import { FeedbackSection } from "./FeedbackSection";
import { MOCK_REVIEWS } from "./feedbackData";
import "@/styles/index.scss";

const meta: Meta<typeof FeedbackSection> = {
  title: "Organisms/FeedbackSection",
  component: FeedbackSection,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    title: {
      control: "text",
      description: "Tiêu đề section",
    },
  },
  args: {
    title: "WHAT OUR CUSTOMERS SAY",
    reviews: MOCK_REVIEWS.slice(0, 4),
  },
};

export default meta;
type Story = StoryObj<typeof FeedbackSection>;

// 1. Default — 4 review cards
export const Default: Story = {
  render: (args) => (
    <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "0 100px" }}>
      <FeedbackSection {...args} />
    </div>
  ),
};

// 2. Many Reviews — 6 reviews, test horizontal scroll
export const ManyReviews: Story = {
  args: {
    reviews: MOCK_REVIEWS,
  },
  render: (args) => (
    <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "0 100px" }}>
      <FeedbackSection {...args} />
    </div>
  ),
};

// 3. Mobile View — test scroll-snap + swipe behavior
export const MobileView: Story = {
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
  render: (args) => (
    <div style={{ padding: "0 16px" }}>
      <FeedbackSection {...args} />
    </div>
  ),
};
