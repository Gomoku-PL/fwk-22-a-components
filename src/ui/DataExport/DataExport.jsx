import React, { useState } from "react";
import styles from "./DataExport.module.css";

export default function DataExport({
  onRequestExport,
  onCancel,
  formats = ["json", "csv"],
  defaultFormat = "json",
  title = "Export Your Data",
  description = "Download a copy of your personal data in a machine-readable format.",
  isLoading = false,
  isSuccess = false,
  error = null,
  className = ""
}) {
  const [selectedFormat, setSelectedFormat] = useState(defaultFormat);

  const handleExport = () => {
    if (onRequestExport) {
      onRequestExport({ format: selectedFormat });
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };

  const handleFormatChange = (e) => {
    setSelectedFormat(e.target.value);
  };

  return (
    <div
      className={`${styles.dataExport} ${className}`}
      role="region"
      aria-label="Data Export"
    >
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
      </div>

      <div className={styles.content}>
        <div className={styles.formatSelector}>
          <label htmlFor="export-format" className={styles.label}>
            Select Export Format:
          </label>
          <select
            id="export-format"
            value={selectedFormat}
            onChange={handleFormatChange}
            disabled={isLoading}
            className={styles.select}
            aria-label="Choose data export format"
          >
            {formats.map((format) => (
              <option key={format} value={format}>
                {format.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        {error && (
          <div className={styles.error} role="alert" aria-live="assertive">
            <span className={styles.errorIcon} aria-hidden="true">
              ⚠
            </span>
            <span className={styles.errorMessage}>{error}</span>
          </div>
        )}

        {isSuccess && (
          <div className={styles.success} role="status" aria-live="polite">
            <span className={styles.successIcon} aria-hidden="true">
              ✓
            </span>
            <span className={styles.successMessage}>
              Your data has been exported successfully!
            </span>
          </div>
        )}

        {isLoading && (
          <div className={styles.loading} role="status" aria-live="polite">
            <div className={styles.spinner} aria-hidden="true"></div>
            <span className={styles.loadingText}>Preparing your data export...</span>
          </div>
        )}

        <div className={styles.actions}>
          <button
            type="button"
            onClick={handleExport}
            disabled={isLoading || isSuccess}
            className={`${styles.button} ${styles.primary}`}
            aria-label={`Export data as ${selectedFormat.toUpperCase()}`}
          >
            {isLoading ? "Exporting..." : isSuccess ? "Exported" : "Export Data"}
          </button>
          {onCancel && (
            <button
              type="button"
              onClick={handleCancel}
              disabled={isLoading}
              className={`${styles.button} ${styles.secondary}`}
              aria-label="Cancel data export"
            >
              Cancel
            </button>
          )}
        </div>

        <div className={styles.info}>
          <p className={styles.infoText}>
            <strong>What's included:</strong> Your profile information, game history,
            preferences, and consent records.
          </p>
          <p className={styles.infoText}>
            <strong>Format info:</strong> JSON is ideal for technical users and
            developers. CSV can be opened in spreadsheet applications.
          </p>
        </div>
      </div>
    </div>
  );
}
