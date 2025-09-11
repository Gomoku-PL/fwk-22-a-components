import React from "react";
import styles from "./Button.module.css";



/**
 * Button (CSS Modules)
 * Variants: "primary" | "secondary" | "disabled"
 */
export default function Button({
  children,
  variant = "primary",
  onClick,
  type = "button",
  ariaLabel,
}) {
  const isDisabled = variant === "disabled";
  const className = `${styles.btn} ${styles[variant] || styles.primary}`;
  const computedAriaLabel =
    ariaLabel || (typeof children === "string" ? children : undefined);

  return (
    <button
      type={type}
      className={className}
      disabled={isDisabled}
      onClick={isDisabled ? undefined : onClick}
      aria-label={computedAriaLabel}
    >
      {children}
    </button>
  );
}
