import React from "react";
import styles from "./PrivacyNotice.module.css";

export default function PrivacyNotice({
  variant = "footer",
  theme = "dark",
  showLastUpdated = true,
  policyUrl = "/privacy-policy",
  settingsUrl = "/privacy-settings",
  onPolicyClick,
  onSettingsClick,
  className = ""
}) {
  const handlePolicyClick = (e) => {
    e.preventDefault();
    if (onPolicyClick) {
      onPolicyClick();
    } else {
      window.open(policyUrl, "_blank", "noopener,noreferrer");
    }
  };

  const handleSettingsClick = (e) => {
    e.preventDefault();
    if (onSettingsClick) {
      onSettingsClick();
    } else {
      window.open(settingsUrl, "_blank", "noopener,noreferrer");
    }
  };

  const lastUpdated = "November 2025";

  if (variant === "settings") {
    return (
      <div
        className={`${styles.notice} ${styles.settings} ${styles[theme]} ${className}`}
        role="region"
        aria-label="Privacy Information"
      >
        <div className={styles.settingsContent}>
          <h3 className={styles.settingsTitle}>Privacy & Data Protection</h3>
          <p className={styles.settingsDescription}>
            We are committed to protecting your privacy and ensuring transparent data practices.
            Your data is processed securely and in accordance with applicable privacy laws.
          </p>
          
          <div className={styles.settingsActions}>
            <button
              type="button"
              className={styles.primaryButton}
              onClick={handlePolicyClick}
              aria-label="View full privacy policy"
            >
              Read Full Privacy Policy
            </button>
            <button
              type="button"
              className={styles.secondaryButton}
              onClick={handleSettingsClick}
              aria-label="Manage privacy preferences"
            >
              Manage Preferences
            </button>
          </div>

          <div className={styles.settingsFooter}>
            <p className={styles.highlight}>
              Key Points:
            </p>
            <ul className={styles.keyPoints}>
              <li>We collect minimal data necessary for functionality</li>
              <li>Your data is never sold to third parties</li>
              <li>You can request data deletion at any time</li>
              <li>All data is encrypted and securely stored</li>
            </ul>
            {showLastUpdated && (
              <p className={styles.lastUpdated}>
                Privacy Policy last updated: {lastUpdated}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${styles.notice} ${styles.footer} ${styles[theme]} ${className}`}
      role="contentinfo"
      aria-label="Privacy Notice"
    >
      <div className={styles.footerContent}>
        <p className={styles.footerText}>
          We respect your privacy and protect your data.{" "}
          <button
            type="button"
            className={styles.link}
            onClick={handlePolicyClick}
            aria-label="View privacy policy"
          >
            Privacy Policy
          </button>
          {" | "}
          <button
            type="button"
            className={styles.link}
            onClick={handleSettingsClick}
            aria-label="Manage privacy settings"
          >
            Privacy Settings
          </button>
        </p>
        
        {showLastUpdated && (
          <p className={styles.footerMeta}>
            Last updated: {lastUpdated}
          </p>
        )}
      </div>
    </div>
  );
}