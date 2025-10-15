import React, { useState } from "react";
import styles from "./GDPRSupport.module.css";

const REQUEST_TYPES = [
  { value: "data-access", label: "Data Access Request" },
  { value: "data-deletion", label: "Data Deletion Request" },
  { value: "data-portability", label: "Data Portability Request" },
  { value: "data-correction", label: "Data Correction Request" },
  { value: "consent-withdrawal", label: "Consent Withdrawal" },
  { value: "other", label: "Other GDPR-related request" },
];

const validateField = (name, value) => {
  switch (name) {
    case "name":
      if (!value.trim()) return "Name is required";
      if (value.trim().length < 2) return "Name must be at least 2 characters";
      if (value.trim().length > 100)
        return "Name must not exceed 100 characters";
      return "";

    case "email":
      if (!value.trim()) return "Email is required";
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value.trim()))
        return "Please enter a valid email address";
      return "";

    case "requestType":
      if (!value) return "Please select a request type";
      return "";

    case "message":
      if (!value.trim()) return "Message is required";
      if (value.trim().length < 10)
        return "Message must be at least 10 characters";
      if (value.trim().length > 2000)
        return "Message must not exceed 2000 characters";
      return "";

    default:
      return "";
  }
};

export default function GDPRSupport({
  onSubmit,
  initialData = {},
  disabled = false,
  showValidation = true,
}) {
  const [formData, setFormData] = useState({
    name: initialData.name || "",
    email: initialData.email || "",
    requestType: initialData.requestType || "",
    message: initialData.message || "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFieldChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name] && showValidation) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleFieldBlur = (name) => {
    setTouched((prev) => ({ ...prev, [name]: true }));

    if (showValidation) {
      const error = validateField(name, formData[name]);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    });

    setErrors(newErrors);
    setTouched({
      name: true,
      email: true,
      requestType: true,
      message: true,
    });

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (disabled || isSubmitting) return;

    const isValid = validateForm();
    if (!isValid) return;

    setIsSubmitting(true);

    try {
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        requestType: formData.requestType,
        message: formData.message.trim(),
        timestamp: new Date().toISOString(),
      };

      await onSubmit?.(payload);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getFieldError = (fieldName) => {
    return touched[fieldName] && errors[fieldName] ? errors[fieldName] : "";
  };

  const hasError = (fieldName) => {
    return Boolean(getFieldError(fieldName));
  };

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit}
      noValidate
      aria-label="GDPR Support Request Form"
    >
      <div className={styles.header}>
        <h2 className={styles.title}>GDPR Support Request</h2>
        <p className={styles.description}>
          Submit your data protection request and we'll respond within 30 days
          as required by GDPR.
        </p>
      </div>

      <div className={styles.fields}>
        <div className={styles.fieldGroup}>
          <label htmlFor="gdpr-name" className={styles.label}>
            Full Name <span className={styles.required}>*</span>
          </label>
          <input
            id="gdpr-name"
            type="text"
            value={formData.name}
            onChange={(e) => handleFieldChange("name", e.target.value)}
            onBlur={() => handleFieldBlur("name")}
            className={`${styles.input} ${
              hasError("name") ? styles.inputError : ""
            }`}
            disabled={disabled}
            aria-describedby={hasError("name") ? "name-error" : undefined}
            aria-invalid={hasError("name")}
            placeholder="Enter your full name"
          />
          {hasError("name") && (
            <div
              id="name-error"
              className={styles.errorMessage}
              role="alert"
              aria-live="polite"
            >
              {getFieldError("name")}
            </div>
          )}
        </div>

        <div className={styles.fieldGroup}>
          <label htmlFor="gdpr-email" className={styles.label}>
            Email Address <span className={styles.required}>*</span>
          </label>
          <input
            id="gdpr-email"
            type="email"
            value={formData.email}
            onChange={(e) => handleFieldChange("email", e.target.value)}
            onBlur={() => handleFieldBlur("email")}
            className={`${styles.input} ${
              hasError("email") ? styles.inputError : ""
            }`}
            disabled={disabled}
            aria-describedby={hasError("email") ? "email-error" : undefined}
            aria-invalid={hasError("email")}
            placeholder="Enter your email address"
          />
          {hasError("email") && (
            <div
              id="email-error"
              className={styles.errorMessage}
              role="alert"
              aria-live="polite"
            >
              {getFieldError("email")}
            </div>
          )}
        </div>

        <div className={styles.fieldGroup}>
          <label htmlFor="gdpr-request-type" className={styles.label}>
            Request Type <span className={styles.required}>*</span>
          </label>
          <select
            id="gdpr-request-type"
            value={formData.requestType}
            onChange={(e) => handleFieldChange("requestType", e.target.value)}
            onBlur={() => handleFieldBlur("requestType")}
            className={`${styles.select} ${
              hasError("requestType") ? styles.inputError : ""
            }`}
            disabled={disabled}
            aria-describedby={
              hasError("requestType") ? "request-type-error" : undefined
            }
            aria-invalid={hasError("requestType")}
          >
            <option value="">Select a request type</option>
            {REQUEST_TYPES.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
          {hasError("requestType") && (
            <div
              id="request-type-error"
              className={styles.errorMessage}
              role="alert"
              aria-live="polite"
            >
              {getFieldError("requestType")}
            </div>
          )}
        </div>

        <div className={styles.fieldGroup}>
          <label htmlFor="gdpr-message" className={styles.label}>
            Message <span className={styles.required}>*</span>
          </label>
          <textarea
            id="gdpr-message"
            value={formData.message}
            onChange={(e) => handleFieldChange("message", e.target.value)}
            onBlur={() => handleFieldBlur("message")}
            className={`${styles.textarea} ${
              hasError("message") ? styles.inputError : ""
            }`}
            disabled={disabled}
            aria-describedby={
              hasError("message") ? "message-error" : "message-hint"
            }
            aria-invalid={hasError("message")}
            placeholder="Please describe your request in detail..."
            rows={6}
          />
          <div id="message-hint" className={styles.hint}>
            {formData.message.length}/2000 characters
          </div>
          {hasError("message") && (
            <div
              id="message-error"
              className={styles.errorMessage}
              role="alert"
              aria-live="polite"
            >
              {getFieldError("message")}
            </div>
          )}
        </div>
      </div>

      <div className={styles.footer}>
        <button
          type="submit"
          className={styles.submitButton}
          disabled={disabled || isSubmitting}
          aria-describedby="submit-note"
        >
          {isSubmitting ? "Submitting..." : "Submit Request"}
        </button>
        <p id="submit-note" className={styles.note}>
          We will respond to your request within 30 days as required by GDPR
          regulations.
        </p>
      </div>
    </form>
  );
}
