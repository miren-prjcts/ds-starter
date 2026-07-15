import * as React from "react";
import { DotsThreeVertical } from "@phosphor-icons/react";
import { cn } from "../lib/utils";

/**
 * StatCard — 1:1 з Figma-компонентом «Card / Stat».
 *
 * title/value — per-instance контент (як TEXT-property у Figma): кожна картка свій текст.
 * Кольори ТІЛЬКИ з семантичних токенів: bg-card, border-border, text-muted-foreground,
 * text-foreground. Дія top-right — доступна кнопка (aria-label), іконка декоративна.
 */
export interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  value: string;
}

export function StatCard({ title, value, className, ...props }: StatCardProps): React.ReactElement {
  return (
    <div
      className={cn("relative rounded-lg border border-border bg-card p-5", className)}
      {...props}
    >
      <button
        type="button"
        aria-label="More options"
        className="absolute top-4 right-4 cursor-pointer border-0 bg-transparent p-0 leading-none text-muted-foreground hover:text-foreground"
      >
        <DotsThreeVertical size={20} aria-hidden />
      </button>
      <div className="text-sm text-muted-foreground">{title}</div>
      <div className="text-2xl font-semibold text-foreground">{value}</div>
    </div>
  );
}
