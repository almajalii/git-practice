import type { Meta, StoryObj } from "@storybook/react";
import { Icon } from "./Icon";
const meta = {
  title: "Journal/IcoMoon icons",
  component: Icon,
  args: { size: 32 },
} satisfies Meta<typeof Icon>;
export default meta;
export const Grid: StoryObj<typeof meta> = { args: { name: "grid" } };
export const Arrow: StoryObj<typeof meta> = { args: { name: "arrow" } };
