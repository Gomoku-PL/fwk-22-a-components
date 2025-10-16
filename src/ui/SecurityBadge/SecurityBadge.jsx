import React, { useState } from "react";
import styles from "./SecurityBadge.module.css";

const SECURITY_STATES = {
  secure: {
    color: "green",
    label: "Secure",
    description: "All security checks passed",
  },
  warning: {
    color: "orange",
    label: "Warning",
    description: "Some security features may be limited",
  },
  insecure: {
    color: "red",
    label: "Insecure",
    description: "Security issues detected",
  },
};

const SECURITY_FEATURES = {
  https: {
    label: "HTTPS",
    secure: "Connection is encrypted and secure",
    warning: "Mixed content detected - some resources may be insecure",
    insecure: "Connection is not encrypted",
  },
  authentication: {
    label: "Authentication",
    secure: "User is authenticated with valid session",
    warning: "Session expires soon - please refresh",
    insecure: "User is not authenticated",
  },
  cookies: {
    label: "Cookies",
    secure: "All cookies are secure and properly configured",
    warning: "Some cookies may not be fully secure",
    insecure: "Cookies are not properly secured",
  },
};

export default function SecurityBadge({
  httpsStatus = "secure",
  authStatus = "secure",
  cookiesStatus = "secure",
  showDetails = false,
  compact = false,
  disabled = false,
  className = "",
}) {
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [hoveredFeature, setHoveredFeature] = useState(null);

  const getOverallStatus = () => {
    const statuses = [httpsStatus, authStatus, cookiesStatus];

    if (statuses.includes("insecure")) return "insecure";
    if (statuses.includes("warning")) return "warning";
    return "secure";
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "secure":
        return "✓";
      case "warning":
        return "!";
      case "insecure":
        return "✗";
      default:
        return "?";
    }
  };

  const handleMouseEnter = () => {
    if (!disabled) {
      setTooltipVisible(true);
    }
  };

  const handleMouseLeave = () => {
    setTooltipVisible(false);
    setHoveredFeature(null);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setTooltipVisible(!tooltipVisible);
    } else if (event.key === "Escape") {
      setTooltipVisible(false);
      setHoveredFeature(null);
    }
  };

  const overallStatus = getOverallStatus();
  const badgeId = `security-badge-${Math.random().toString(36).substr(2, 9)}`;
  const tooltipId = `${badgeId}-tooltip`;

  return (
    <div
      className={`${styles.badge} ${styles[overallStatus]} ${
        compact ? styles.compact : ""
      } ${disabled ? styles.disabled : ""} ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onKeyDown={handleKeyDown}
      tabIndex={disabled ? -1 : 0}
      role="button"
      aria-label={`Security status: ${SECURITY_STATES[overallStatus].label}`}
      aria-describedby={tooltipVisible ? tooltipId : undefined}
      aria-expanded={tooltipVisible}
    >
      <div className={styles.indicator}>
        <span className={styles.icon} aria-hidden="true">
          {getStatusIcon(overallStatus)}
        </span>
        {!compact && (
          <span className={styles.label}>
            {SECURITY_STATES[overallStatus].label}
          </span>
        )}
      </div>

      {showDetails && !compact && (
        <div className={styles.details}>
          {Object.entries({
            https: httpsStatus,
            authentication: authStatus,
            cookies: cookiesStatus,
          }).map(([feature, status]) => (
            <div
              key={feature}
              className={`${styles.feature} ${styles[status]}`}
              onMouseEnter={() => setHoveredFeature(feature)}
              onMouseLeave={() => setHoveredFeature(null)}
              aria-label={`${SECURITY_FEATURES[feature].label}: ${SECURITY_STATES[status].label}`}
            >
              <span className={styles.featureIcon} aria-hidden="true">
                {getStatusIcon(status)}
              </span>
              <span className={styles.featureLabel}>
                {SECURITY_FEATURES[feature].label}
              </span>
            </div>
          ))}
        </div>
      )}

      {tooltipVisible && (
        <div
          id={tooltipId}
          className={styles.tooltip}
          role="tooltip"
          aria-live="polite"
        >
          <div className={styles.tooltipHeader}>
            <strong>
              Security Status: {SECURITY_STATES[overallStatus].label}
            </strong>
          </div>
          <div className={styles.tooltipContent}>
            <p className={styles.tooltipDescription}>
              {SECURITY_STATES[overallStatus].description}
            </p>

            <div className={styles.tooltipFeatures}>
              {Object.entries({
                https: httpsStatus,
                authentication: authStatus,
                cookies: cookiesStatus,
              }).map(([feature, status]) => (
                <div
                  key={feature}
                  className={`${styles.tooltipFeature} ${
                    hoveredFeature === feature ? styles.highlighted : ""
                  }`}
                >
                  <div className={styles.tooltipFeatureHeader}>
                    <span
                      className={`${styles.tooltipIcon} ${styles[status]}`}
                      aria-hidden="true"
                    >
                      {getStatusIcon(status)}
                    </span>
                    <span className={styles.tooltipFeatureLabel}>
                      {SECURITY_FEATURES[feature].label}
                    </span>
                  </div>
                  <p className={styles.tooltipFeatureDescription}>
                    {SECURITY_FEATURES[feature][status]}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.tooltipArrow} aria-hidden="true"></div>
        </div>
      )}
    </div>
  );
}
