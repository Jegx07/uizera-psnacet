import * as React from "react";

import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-orange text-white shadow-[0_10px_24px_rgba(250,100,0,0.2)] hover:bg-orange-light hover:shadow-[0_14px_30px_rgba(250,100,0,0.24)] active:bg-orange-dark",
  secondary:
    "bg-white text-orange border border-orange hover:bg-orange-pale hover:border-orange-light",
  outline:
    "bg-transparent text-gray-900 border border-gray-200 hover:border-orange hover:bg-orange-pale",
  ghost: "bg-transparent text-gray-900 hover:bg-gray-100",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base",
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", type = "button", asChild = false, children, ...props }, ref) => {
    const baseClasses = cn(
      "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:pointer-events-none disabled:opacity-50",
      variantClasses[variant],
      sizeClasses[size],
      className,
    );

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children as React.ReactElement<{ className?: string }>, {
        className: cn(baseClasses, (children.props as { className?: string }).className),
      });
    }

    return (
      <button
        ref={ref}
        type={type}
        data-cursor="button"
        className={baseClasses}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";

export { Button };
