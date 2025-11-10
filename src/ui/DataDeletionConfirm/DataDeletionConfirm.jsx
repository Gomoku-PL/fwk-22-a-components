import React, { useState, useEffect, useRef } from "react";
import styles from "./DataDeletionConfirm.module.css";

export default function DataDeletionConfirm({
  isOpen = false,
  onConfirm,
  onCancel,
  confirmationType = "type", // "type" or "checkbox"
  confirmationText = "DELETE",
  warningLevel = "strong", // "strong" or "soft"
  title = "Delete Your Data",
  message = "This action cannot be undone. All your data will be permanently deleted.",
  details = [
    "Your profile and account information",
    "All game history and statistics",
    "Saved preferences and settings",
    "Consent and privacy records"
  ],
  className = ""
}) {
  const [inputValue, setInputValue] = useState("");
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [isConfirmEnabled, setIsConfirmEnabled] = useState(false);
  const modalRef = useRef(null);
  const previousActiveElement = useRef(null);

  useEffect(() => {
    if (confirmationType === "type") {
      setIsConfirmEnabled(inputValue.trim() === confirmationText);
    } else {
      setIsConfirmEnabled(checkboxChecked);
    }
  }, [inputValue, checkboxChecked, confirmationText, confirmationType]);

  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement;
      
      // Focus trap
      const focusableElements = modalRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      if (focusableElements && focusableElements.length > 0) {
        focusableElements[0].focus();
      }

      // Prevent body scroll
      document.body.style.overflow = "hidden";
    } else {
      // Restore focus and scroll
      document.body.style.overflow = "";
      if (previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
      
      // Reset state
      setInputValue("");
      setCheckboxChecked(false);
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      handleCancel();
    }

    // Focus trap
    if (e.key === "Tab" && modalRef.current) {
      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  };

  const handleConfirm = () => {
    if (isConfirmEnabled && onConfirm) {
      onConfirm();
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleCancel();
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className={`${styles.overlay} ${className}`}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="deletion-title"
      aria-describedby="deletion-description"
      onKeyDown={handleKeyDown}
    >
      <div
        ref={modalRef}
        className={`${styles.modal} ${styles[warningLevel]}`}
      >
        <div className={styles.header}>
          <div className={`${styles.icon} ${styles[warningLevel]}`} aria-hidden="true">
            ⚠
          </div>
          <h2 id="deletion-title" className={styles.title}>
            {title}
          </h2>
        </div>

        <div className={styles.content}>
          <p id="deletion-description" className={styles.message}>
            {message}
          </p>

          {details && details.length > 0 && (
            <div className={styles.details}>
              <p className={styles.detailsTitle}>The following will be deleted:</p>
              <ul className={styles.detailsList}>
                {details.map((detail, index) => (
                  <li key={index} className={styles.detailItem}>
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {warningLevel === "strong" && (
            <div className={styles.strongWarning} role="alert">
              <strong>⚠ Warning:</strong> This action is permanent and cannot be reversed.
            </div>
          )}

          {confirmationType === "type" ? (
            <div className={styles.confirmation}>
              <label htmlFor="confirm-input" className={styles.confirmLabel}>
                To confirm, type <strong>{confirmationText}</strong> below:
              </label>
              <input
                id="confirm-input"
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={`Type "${confirmationText}"`}
                className={styles.confirmInput}
                autoComplete="off"
                aria-required="true"
                aria-describedby="confirm-hint"
              />
              <span id="confirm-hint" className={styles.hint}>
                Case sensitive
              </span>
            </div>
          ) : (
            <div className={styles.confirmation}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={checkboxChecked}
                  onChange={(e) => setCheckboxChecked(e.target.checked)}
                  className={styles.checkbox}
                  aria-required="true"
                />
                <span className={styles.checkboxText}>
                  I understand this action is permanent and cannot be undone
                </span>
              </label>
            </div>
          )}
        </div>

        <div className={styles.actions}>
          <button
            type="button"
            onClick={handleCancel}
            className={`${styles.button} ${styles.cancel}`}
            aria-label="Cancel deletion"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={!isConfirmEnabled}
            className={`${styles.button} ${styles.confirm} ${styles[warningLevel]}`}
            aria-label="Confirm deletion"
            aria-disabled={!isConfirmEnabled}
          >
            Delete My Data
          </button>
        </div>
      </div>
    </div>
  );
}
