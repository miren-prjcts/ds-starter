import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Input } from "./input";

describe("Input", () => {
  it("has an accessible search field and accepts input", async () => {
    const user = userEvent.setup();
    render(<Input placeholder="Search components" />);

    const input = screen.getByRole("textbox", { name: "Search" });
    await user.type(input, "Button");

    expect(input).toHaveValue("Button");
    expect(input).toHaveAttribute("placeholder", "Search components");
  });

  it("allows the accessible label to be overridden", () => {
    render(<Input aria-label="Component search" />);

    expect(screen.getByRole("textbox", { name: "Component search" })).toBeInTheDocument();
  });
});
