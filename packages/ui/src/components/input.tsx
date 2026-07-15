"use client";

import * as React from "react";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { cn } from "../lib/utils";

/**
 * Input (search) — 1:1 з Figma-компонентом «Input».
 *
 * Обгортка несе рамку/фокус-кільце (focus-within), <input> — прозорий.
 * Кольори ТІЛЬКИ з семантичних токенів: border-input, bg-background, ring-ring,
 * text-foreground, placeholder:text-muted-foreground. Жодних hex.
 *
 * Іконка — Phosphor MagnifyingGlass (та сама офіційна бібліотека, що у Figma),
 * декоративна (aria-hidden); доступну назву несе сам <input> через aria-label.
 */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Override-клас для обгортки (напр. ширина: "w-[280px]"). */
  containerClassName?: string;
}

export function Input({
  className,
  containerClassName,
  type = "text",
  "aria-label": ariaLabel = "Search",
  ...props
}: InputProps): React.ReactElement {
  return (
    <div
      className={cn(
        "inline-flex h-9 items-center gap-2 rounded-md border border-input bg-background px-3 focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background",
        containerClassName,
      )}
    >
      <MagnifyingGlass size={16} className="shrink-0 text-muted-foreground" aria-hidden />
      <input
        type={type}
        aria-label={ariaLabel}
        className={cn(
          "w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none",
          className,
        )}
        {...props}
      />
    </div>
  );
}
