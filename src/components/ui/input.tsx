import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-11 w-full rounded-sm border border-rule bg-paper px-3 font-sans text-sm text-ink",
        "placeholder:text-faint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-crimson",
        className,
      )}
      {...props}
    />
  );
}
