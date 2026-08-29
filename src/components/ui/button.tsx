import type { ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-sans text-sm font-medium tracking-wide transition-[opacity,transform,background-color,color,border-color] duration-150 ease-out active:not-disabled:scale-[0.96] disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-crimson",
  {
    variants: {
      variant: {
        primary:
          "bg-crimson text-crimson-fg hover:opacity-90 border border-crimson",
        ink: "bg-ink text-paper hover:opacity-90 border border-ink",
        ghost:
          "bg-transparent text-ink border border-rule hover:border-ink hover:bg-paper-2",
        link: "bg-transparent text-crimson underline-offset-4 hover:underline px-0",
      },
      size: {
        sm: "h-9 px-3 rounded-sm",
        md: "h-11 px-4 rounded-sm",
        lg: "h-12 px-5 rounded-md text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export function Button({
  className,
  variant,
  size,
  type = "button",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants>) {
  return (
    <button
      type={type}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
