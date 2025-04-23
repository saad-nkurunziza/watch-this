import type * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground shadow",
        secondary: "border-transparent bg-secondary text-secondary-foreground",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow",
        outline: "text-foreground",
        blue: "bg-blue-950 text-blue-200 border-blue-800",
        amber: "bg-amber-950 text-amber-200 border-amber-800",
        red: "bg-red-950 text-red-200 border-red-800",
        green: "bg-green-950 text-green-200 border-green-800",
        gray: "bg-gray-950 text-gray-200 border-gray-800",
        indigo: "bg-indigo-950 text-indigo-200 border-indigo-800",
        pink: "bg-pink-950 text-pink-200 border-pink-800",
        purple: "bg-purple-950 text-purple-200 border-purple-800",
        teal: "bg-teal-950 text-teal-200 border-teal-800",
        yellow: "bg-yellow-950 text-yellow-200 border-yellow-800",
        violet: "bg-violet-950 text-violet-200 border-violet-800",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
