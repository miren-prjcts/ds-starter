import type { Meta, StoryObj } from "@storybook/react";
import { StatCard } from "@repo/ui";

const meta: Meta<typeof StatCard> = {
  title: "Components/Card",
  component: StatCard,
  args: { title: "Total products", value: "1,248" },
};
export default meta;

type Story = StoryObj<typeof StatCard>;

export const Default: Story = {
  render: (args) => (
    <div style={{ width: 220 }}>
      <StatCard {...args} />
    </div>
  ),
};

/**
 * Три картки з ОДНОГО компонента — різний title/value на інстанс.
 * Це і є per-instance content (як TEXT-property у Figma), а не три окремі компоненти.
 */
export const Stats: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 16 }}>
      <StatCard title="Total products" value="1,248" style={{ width: 220, flexShrink: 0 }} />
      <StatCard title="Low stock" value="23" style={{ width: 220, flexShrink: 0 }} />
      <StatCard title="Out of stock" value="5" style={{ width: 220, flexShrink: 0 }} />
    </div>
  ),
};
