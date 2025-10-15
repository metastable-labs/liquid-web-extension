"use client";
import * as React from "react";
import { motion } from "framer-motion";
import classNames from "classnames";

type MotionButtonBase = Omit<
  React.ComponentProps<typeof motion.button>,
  "children"
>;

type ButtonProps = MotionButtonBase & {
  children?: React.ReactNode;
  variant?: "primary" | "secondary";
  size?: "md" | "sm";
  fullWidth?: boolean;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  loading?: boolean;
};

const sizeStyles = {
  md: "h-10 rounded-xl px-6 text-sm font-medium",
  sm: "h-8 rounded-lg px-4 text-xs font-medium",
} as const;

const variantStyles = {
  primary:
    "bg-[#5499FE] text-white shadow-[0_2px_0_0_#4182FF] border border-[#4691FE] hover:brightness-105 active:brightness-95",
  secondary:
    "bg-white text-[#414651] shadow-[0_2px_0_0_#E2E8F0] border border-[#EAEEF4] hover:bg-gray-50 active:bg-gray-100",
} as const;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      fullWidth = true,
      leading,
      trailing,
      loading = false,
      className,
      children,
      disabled,
      type = "button",
      ...rest
    },
    ref
  ) => {
    const isDisabled = disabled || loading;
    const isActuallyDisabled = !!disabled;

    const primaryDisabledStyles =
      variant === "primary" && isActuallyDisabled
        ? "bg-[#717680] opacity-20 text-white shadow-none border-none"
        : null;

    const secondaryDisabledStyles =
      variant === "secondary" && isActuallyDisabled ? "opacity-60" : null;

    return (
      <motion.button
        ref={ref}
        type={type}
        disabled={isDisabled}
        data-variant={variant}
        data-size={size}
        data-loading={loading ? "" : undefined}
        className={classNames(
          "relative inline-flex select-none items-center justify-center gap-3 font-medium font-aeonik",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#4691FE]",
          fullWidth && "w-full",
          sizeStyles[size],
          variantStyles[variant],

          isDisabled && "pointer-events-none",
          primaryDisabledStyles,
          secondaryDisabledStyles,

          className
        )}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
        aria-busy={loading}
        aria-live="polite"
        initial={false}
        {...rest}
      >
        <span
          className={classNames(
            "inline-flex items-center gap-3",
            loading && "opacity-0"
          )}
        >
          {leading && <span className="shrink-0">{leading}</span>}
          <span className="truncate">{children}</span>
          {trailing && <span className="shrink-0">{trailing}</span>}
        </span>

        {loading && (
          <span
            className="absolute inset-0 grid place-items-center"
            aria-hidden="true"
          >
            <span className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
            <span className="sr-only">Loading</span>
          </span>
        )}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
export default Button;
