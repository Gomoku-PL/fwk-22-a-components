import React, { useState } from "react";
import styles from "./RegisterForm.module.css";

const validateField = (name, value, formData = {}) => {
  switch (name) {
    case "email":
      if (!value.trim()) return "Email is required";
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value.trim()))
        return "Please enter a valid email address";
      return "";

    case "password":
      if (!value) return "Password is required";
      if (value.length < 8) return "Password must be at least 8 characters";
      if (!/(?=.*[a-z])/.test(value))
        return "Password must contain at least one lowercase letter";
      if (!/(?=.*[A-Z])/.test(value))
        return "Password must contain at least one uppercase letter";
      if (!/(?=.*\d)/.test(value))
        return "Password must contain at least one number";
      if (!/(?=.*[!@#$%^&*])/.test(value))
        return "Password must contain at least one special character (!@#$%^&*)";
      return "";

    case "confirmPassword":
      if (!value) return "Please confirm your password";
      if (value !== formData.password) return "Passwords do not match";
      return "";

    case "consent":
      if (!value) return "You must agree to the privacy policy to register";
      return "";

    default:
      return "";
  }
};

export default function RegisterForm({
  onSubmit,
  onCancel,
  disabled = false,
  showValidation = true,
  isModal = false,
}) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    consent: false,
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleFieldChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name] && showValidation) {
      const error = validateField(name, value, { ...formData, [name]: value });
      setErrors((prev) => ({ ...prev, [name]: error }));
    }

    if (
      name === "password" &&
      touched.confirmPassword &&
      formData.confirmPassword
    ) {
      const confirmError = validateField(
        "confirmPassword",
        formData.confirmPassword,
        { ...formData, [name]: value },
      );
      setErrors((prev) => ({ ...prev, confirmPassword: confirmError }));
    }
  };

  const handleFieldBlur = (name) => {
    setTouched((prev) => ({ ...prev, [name]: true }));

    if (showValidation) {
      const error = validateField(name, formData[name], formData);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach((field) => {
      const error = validateField(field, formData[field], formData);
      if (error) newErrors[field] = error;
    });

    setErrors(newErrors);
    setTouched({
      email: true,
      password: true,
      confirmPassword: true,
      consent: true,
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
        email: formData.email.trim(),
        password: formData.password,
        consent: formData.consent,
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

  const getPasswordStrength = (password) => {
    if (!password) return { score: 0, label: "" };

    let score = 0;
    if (password.length >= 8) score++;
    if (/(?=.*[a-z])/.test(password)) score++;
    if (/(?=.*[A-Z])/.test(password)) score++;
    if (/(?=.*\d)/.test(password)) score++;
    if (/(?=.*[!@#$%^&*])/.test(password)) score++;

    const labels = ["Very Weak", "Weak", "Fair", "Good", "Strong"];
    return { score, label: labels[score] || "" };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  return (
    <form
      className={`${styles.form} ${isModal ? styles.modal : ""}`}
      onSubmit={handleSubmit}
      noValidate
      aria-label="User Registration Form"
    >
      <div className={styles.header}>
        <h2 className={styles.title}>Create Account</h2>
        <p className={styles.description}>
          Join us today and start your journey with secure, privacy-focused
          registration.
        </p>
      </div>

      <div className={styles.fields}>
        <div className={styles.fieldGroup}>
          <label htmlFor="register-email" className={styles.label}>
            Email Address <span className={styles.required}>*</span>
          </label>
          <input
            id="register-email"
            type="email"
            value={formData.email}
            onChange={(e) => handleFieldChange("email", e.target.value)}
            onBlur={() => handleFieldBlur("email")}
            className={`${styles.input} ${
              hasError("email") ? styles.inputError : ""
            }`}
            disabled={disabled}
            aria-describedby={hasError("email") ? "email-error" : "email-hint"}
            aria-invalid={hasError("email")}
            placeholder="Enter your email address"
            autoComplete="email"
          />
          <div id="email-hint" className={styles.hint}>
            We'll use this email for account verification and important updates
          </div>
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
          <label htmlFor="register-password" className={styles.label}>
            Password <span className={styles.required}>*</span>
          </label>
          <div className={styles.passwordContainer}>
            <input
              id="register-password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={(e) => handleFieldChange("password", e.target.value)}
              onBlur={() => handleFieldBlur("password")}
              className={`${styles.input} ${styles.passwordInput} ${
                hasError("password") ? styles.inputError : ""
              }`}
              disabled={disabled}
              aria-describedby={
                hasError("password")
                  ? "password-error"
                  : "password-requirements"
              }
              aria-invalid={hasError("password")}
              placeholder="Create a strong password"
              autoComplete="new-password"
            />
            <button
              type="button"
              className={styles.togglePassword}
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              tabIndex={0}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {formData.password && (
            <div className={styles.passwordStrength}>
              <div className={styles.strengthBar}>
                <div
                  className={`${styles.strengthFill} ${
                    styles[`strength${passwordStrength.score}`]
                  }`}
                  style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                />
              </div>
              <span className={styles.strengthLabel}>
                {passwordStrength.label}
              </span>
            </div>
          )}

          <div id="password-requirements" className={styles.requirements}>
            Password must contain: 8+ characters, uppercase, lowercase, number,
            special character
          </div>

          {hasError("password") && (
            <div
              id="password-error"
              className={styles.errorMessage}
              role="alert"
              aria-live="polite"
            >
              {getFieldError("password")}
            </div>
          )}
        </div>

        <div className={styles.fieldGroup}>
          <label htmlFor="register-confirm-password" className={styles.label}>
            Confirm Password <span className={styles.required}>*</span>
          </label>
          <div className={styles.passwordContainer}>
            <input
              id="register-confirm-password"
              type={showConfirmPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={(e) =>
                handleFieldChange("confirmPassword", e.target.value)
              }
              onBlur={() => handleFieldBlur("confirmPassword")}
              className={`${styles.input} ${styles.passwordInput} ${
                hasError("confirmPassword") ? styles.inputError : ""
              }`}
              disabled={disabled}
              aria-describedby={
                hasError("confirmPassword")
                  ? "confirm-password-error"
                  : undefined
              }
              aria-invalid={hasError("confirmPassword")}
              placeholder="Confirm your password"
              autoComplete="new-password"
            />
            <button
              type="button"
              className={styles.togglePassword}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              aria-label={
                showConfirmPassword
                  ? "Hide confirm password"
                  : "Show confirm password"
              }
              tabIndex={0}
            >
              {showConfirmPassword ? "Hide" : "Show"}
            </button>
          </div>
          {hasError("confirmPassword") && (
            <div
              id="confirm-password-error"
              className={styles.errorMessage}
              role="alert"
              aria-live="polite"
            >
              {getFieldError("confirmPassword")}
            </div>
          )}
        </div>

        <div className={styles.fieldGroup}>
          <div className={styles.consentContainer}>
            <input
              id="register-consent"
              type="checkbox"
              checked={formData.consent}
              onChange={(e) => handleFieldChange("consent", e.target.checked)}
              onBlur={() => handleFieldBlur("consent")}
              className={`${styles.checkbox} ${
                hasError("consent") ? styles.inputError : ""
              }`}
              disabled={disabled}
              aria-describedby={
                hasError("consent") ? "consent-error" : "consent-info"
              }
              aria-invalid={hasError("consent")}
            />
            <label htmlFor="register-consent" className={styles.consentLabel}>
              I agree to the{" "}
              <a href="/privacy" target="_blank" rel="noopener noreferrer">
                Privacy Policy
              </a>{" "}
              and
              <a href="/terms" target="_blank" rel="noopener noreferrer">
                {" "}
                Terms of Service
              </a>{" "}
              <span className={styles.required}>*</span>
            </label>
          </div>

          <div id="consent-info" className={styles.gdprInfo}>
            <strong>Data Collection Notice:</strong> We collect your email for
            account creation and communication. Your password is securely
            encrypted. You can request data deletion at any time via our GDPR
            form.
          </div>

          {hasError("consent") && (
            <div
              id="consent-error"
              className={styles.errorMessage}
              role="alert"
              aria-live="polite"
            >
              {getFieldError("consent")}
            </div>
          )}
        </div>
      </div>

      <div className={styles.footer}>
        <div className={styles.actions}>
          {onCancel && (
            <button
              type="button"
              className={styles.cancelButton}
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className={styles.submitButton}
            disabled={disabled || isSubmitting}
            aria-describedby="submit-note"
          >
            {isSubmitting ? "Creating Account..." : "Create Account"}
          </button>
        </div>
        <p id="submit-note" className={styles.note}>
          By creating an account, you confirm that you're 18+ and agree to our
          data handling practices.
        </p>
      </div>
    </form>
  );
}
