import React from "react";
import styles from "./Button.module.css";

export default function Button({
  children,
  variant = "primary",
  onClick,
  type = "button",
  ariaLabel,
}) {
  const isDisabled = variant === "disabled";
  const className = `${styles.btn} ${styles[variant] || styles.primary}`;
  const computerAriaLabel =
    ariaLabel || (typeof children === "string" ? children : undefined);
  return (
    <button
      className={className}
      onClick={isDisabled ? undefined : onClick}
      type={type}
      aria-label={computerAriaLabel}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
}
