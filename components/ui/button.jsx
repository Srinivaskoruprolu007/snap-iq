import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-[#D69ADE] text-white shadow-md hover:bg-[#D69ADE]/90 transition-colors",
        primary:
          "bg-[#D69ADE] text-white shadow-md hover:bg-[#D69ADE]/90 transition-colors",
        destructive:
          "bg-[#E53888] text-white shadow-md hover:bg-[#E53888]/90 focus-visible:ring-[#E53888]/20 dark:bg-[#E53888]/70 dark:focus-visible:ring-[#E53888]/40 transition-colors",
        outline:
          "border border-[#4F959D] text-[#4F959D] bg-transparent shadow-sm hover:bg-[#4F959D]/10 dark:hover:bg-[#4F959D]/20 transition-colors",
        secondary:
          "bg-[#4D55CC] text-white shadow-md hover:bg-[#4D55CC]/80 transition-colors",
        ghost:
          "bg-transparent text-[#D69ADE] hover:bg-[#D69ADE]/10 hover:text-[#D69ADE] dark:hover:bg-[#D69ADE]/20 transition-colors",
        link: "text-[#D69ADE] underline underline-offset-4 hover:text-[#D69ADE]/80 transition-colors",
        glass:
          "bg-white/20 text-black backdrop-blur-md shadow-md hover:bg-white/30 dark:bg-white/10 dark:hover:bg-white/20 transition-colors border border-white/20",
        success:
          "bg-[#727D73] text-white shadow-md hover:bg-[#727D73]/90 transition-colors",
      },  
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({ className, variant, size, asChild = false, ...props }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
