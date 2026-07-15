import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@repo/ui";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  args: { children: "Button" },
  argTypes: {
    variant: { control: "inline-radio", options: ["solid", "outline", "ghost"] },
    size: { control: "inline-radio", options: ["sm", "md"] },
  },
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Solid: Story = { args: { variant: "solid" } };
export const Outline: Story = { args: { variant: "outline" } };
export const Ghost: Story = { args: { variant: "ghost" } };

export const Both: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 8 }}>
      <Button variant="solid">Solid</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  ),
};

/**
 * Матриця variant × state. Hover/Focus — псевдостани, тож показані СТАТИЧНО:
 * форсуємо ті самі утиліти, що дає псевдостан (opacity-90 для hover, ring-* для focus).
 * У реальному використанні це :hover / :focus-visible. Кольори — лише семантичні класи.
 */
const STATES: Array<{ label: string; props: Partial<React.ComponentProps<typeof Button>> }> = [
  { label: "Default", props: {} },
  { label: "Hover", props: { className: "opacity-90" } },
  { label: "Focus", props: { className: "ring-2 ring-ring ring-offset-2 ring-offset-background" } },
  { label: "Disabled", props: { disabled: true } },
];
const VARIANTS = ["solid", "outline", "ghost"] as const;

const cellLabel: React.CSSProperties = {
  font: "500 12px/16px var(--font-sans, sans-serif)",
  color: "var(--muted-foreground)",
};

export const AllStates: Story = {
  render: () => (
    <div
      style={{
        display: "inline-grid",
        gridTemplateColumns: "72px repeat(4, max-content)",
        gap: 16,
        alignItems: "center",
      }}
    >
      <span />
      {STATES.map((s) => (
        <span key={s.label} style={cellLabel}>
          {s.label}
        </span>
      ))}
      {VARIANTS.flatMap((variant) => [
        <span key={variant} style={cellLabel}>
          {variant}
        </span>,
        ...STATES.map((s) => (
          <Button key={`${variant}-${s.label}`} variant={variant} {...s.props}>
            Button
          </Button>
        )),
      ])}
    </div>
  ),
};
