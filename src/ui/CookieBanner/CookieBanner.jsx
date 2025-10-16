import React, { useState, useRef, useEffect } from "react";
import styles from "./CookieBanner.module.css";

const COOKIE_CATEGORIES = {
  necessary: { label: "Necessary", required: true },
  analytics: { label: "Analytics", required: false },
  marketing: { label: "Marketing", required: false },
};

export default function CookieBanner({
  isVisible = true,
  showModal = false,
  initialPreferences = {},
  onSave,
  onDismiss,
  onShowModal,
  title = "Cookie Preferences",
  description = "We use cookies to enhance your experience. Choose your preferences below.",
}) {
  const [modalOpen, setModalOpen] = useState(showModal);
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: initialPreferences.analytics ?? false,
    marketing: initialPreferences.marketing ?? false,
  });

  const bannerRef = useRef(null);
  const modalRef = useRef(null);
  const previousFocusRef = useRef(null);

  useEffect(() => {
    if (modalOpen) {
      previousFocusRef.current = document.activeElement;
      modalRef.current?.focus();
    } else if (previousFocusRef.current) {
      previousFocusRef.current.focus();
    }
  }, [modalOpen]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && modalOpen) {
        handleCloseModal();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [modalOpen]);

  const handleAcceptAll = () => {
    const allAccepted = { necessary: true, analytics: true, marketing: true };
    onSave?.(allAccepted);
    onDismiss?.();
  };

  const handleRejectAll = () => {
    const onlyNecessary = {
      necessary: true,
      analytics: false,
      marketing: false,
    };
    onSave?.(onlyNecessary);
    onDismiss?.();
  };

  const handleCustomize = () => {
    setModalOpen(true);
    onShowModal?.();
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSavePreferences = () => {
    onSave?.(preferences);
    setModalOpen(false);
    onDismiss?.();
  };

  const handlePreferenceChange = (category, value) => {
    if (category === "necessary") return;
    setPreferences((prev) => ({ ...prev, [category]: value }));
  };

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      handleCloseModal();
    }
  };

  if (!isVisible) return null;

  return (
    <>
      <div
        ref={bannerRef}
        className={styles.banner}
        role="banner"
        aria-label="Cookie consent banner"
      >
        <div className={styles.content}>
          <div className={styles.text}>
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.description}>{description}</p>
          </div>
          <div className={styles.actions}>
            <button
              className={`${styles.button} ${styles.primary}`}
              onClick={handleAcceptAll}
              aria-label="Accept all cookies"
            >
              Accept All
            </button>
            <button
              className={`${styles.button} ${styles.secondary}`}
              onClick={handleRejectAll}
              aria-label="Reject all non-essential cookies"
            >
              Reject All
            </button>
            <button
              className={`${styles.button} ${styles.secondary}`}
              onClick={handleCustomize}
              aria-label="Customize cookie preferences"
            >
              Customize
            </button>
          </div>
        </div>
      </div>

      {modalOpen && (
        <div
          className={styles.modalBackdrop}
          onClick={handleBackdropClick}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div
            ref={modalRef}
            className={styles.modal}
            tabIndex={-1}
            role="document"
          >
            <div className={styles.modalHeader}>
              <h3 id="modal-title" className={styles.modalTitle}>
                Cookie Preferences
              </h3>
              <button
                className={styles.closeButton}
                onClick={handleCloseModal}
                aria-label="Close modal"
              >
                ×
              </button>
            </div>

            <div className={styles.modalBody}>
              {Object.entries(COOKIE_CATEGORIES).map(
                ([key, { label, required }]) => (
                  <div key={key} className={styles.preferenceGroup}>
                    <div className={styles.preferenceHeader}>
                      <label
                        htmlFor={`cookie-${key}`}
                        className={styles.preferenceLabel}
                      >
                        {label}
                        {required && (
                          <span className={styles.required}> (Required)</span>
                        )}
                      </label>
                    </div>
                    <div className={styles.preferenceControl}>
                      <input
                        id={`cookie-${key}`}
                        type="checkbox"
                        checked={preferences[key]}
                        disabled={required}
                        onChange={(e) =>
                          handlePreferenceChange(key, e.target.checked)
                        }
                        className={styles.checkbox}
                        aria-describedby={`${key}-description`}
                      />
                      <p
                        id={`${key}-description`}
                        className={styles.preferenceDescription}
                      >
                        {getDescriptionForCategory(key)}
                      </p>
                    </div>
                  </div>
                ),
              )}
            </div>

            <div className={styles.modalFooter}>
              <button
                className={`${styles.button} ${styles.secondary}`}
                onClick={handleCloseModal}
              >
                Cancel
              </button>
              <button
                className={`${styles.button} ${styles.primary}`}
                onClick={handleSavePreferences}
              >
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function getDescriptionForCategory(category) {
  switch (category) {
    case "necessary":
      return "Essential for site functionality and security.";
    case "analytics":
      return "Help us understand site usage and improve performance.";
    case "marketing":
      return "Used to deliver personalized ads and track campaign effectiveness.";
    default:
      return "";
  }
}
