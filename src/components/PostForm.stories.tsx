import type { Meta, StoryObj } from "@storybook/react";
import { PostForm } from "./PostForm";
const meta = {
  title: "Journal/Post form",
  component: PostForm,
  args: { onSubmit: async () => {} },
  decorators: [
    (Story) => (
      <div style={{ width: 420, maxWidth: "90vw", padding: 20 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof PostForm>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Empty: Story = {};
export const Editing: Story = {
  args: {
    initialValues: {
      title: "Designing with intent",
      category: "Design",
      body: "Start with the people using your product and build from there.",
    },
  },
};
export const Saving: Story = { args: { pending: true } };
