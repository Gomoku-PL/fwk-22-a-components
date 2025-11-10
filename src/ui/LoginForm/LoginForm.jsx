import React, { useState } from "react";
import styles from "./LoginForm.module.css";

export default function LoginForm({
  onSubmit,
  isLoading = false,
  error = null,
  emailLabel = "Email",
  passwordLabel = "Password",
  submitLabel = "Log In",
  forgotPasswordLabel = "Forgot password?",
  onForgotPassword,
  showForgotPassword = true,
  emailPlaceholder = "Enter your email",
  passwordPlaceholder = "Enter your password",
  autoComplete = false,
  className = ""
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [touched, setTouched] = useState({ email: false, password: false });
  const [showPassword, setShowPassword] = useState(false);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const isEmailValid = validateEmail(email);
  const isPasswordValid = password.length >= 1;
  const isFormValid = isEmailValid && isPasswordValid;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isFormValid && onSubmit) {
      onSubmit({ email, password });
    }
  };

  const handleEmailBlur = () => {
    setTouched({ ...touched, email: true });
  };

  const handlePasswordBlur = () => {
    setTouched({ ...touched, password: true });
  };

  const handleForgotPasswordClick = (e) => {
    e.preventDefault();
    if (onForgotPassword) {
      onForgotPassword();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`${styles.loginForm} ${className}`}
      noValidate
    >
      <div className={styles.formGroup}>
        <label htmlFor="login-email" className={styles.label}>
          {emailLabel}
        </label>
        <input
          id="login-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={handleEmailBlur}
          placeholder={emailPlaceholder}
          disabled={isLoading}
          autoComplete={autoComplete ? "email" : "off"}
          className={`${styles.input} ${
            touched.email && !isEmailValid ? styles.invalid : ""
          }`}
          aria-invalid={touched.email && !isEmailValid}
          aria-describedby={
            touched.email && !isEmailValid ? "email-error" : undefined
          }
          required
        />
        {touched.email && !isEmailValid && (
          <span id="email-error" className={styles.errorText} role="alert">
            Please enter a valid email address
          </span>
        )}
      </div>

      <div className={styles.formGroup}>
        <div className={styles.labelRow}>
          <label htmlFor="login-password" className={styles.label}>
            {passwordLabel}
          </label>
          {showForgotPassword && (
            <button
              type="button"
              onClick={handleForgotPasswordClick}
              className={styles.forgotLink}
              tabIndex={0}
              aria-label="Forgot password"
            >
              {forgotPasswordLabel}
            </button>
          )}
        </div>
        <div className={styles.passwordWrapper}>
          <input
            id="login-password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={handlePasswordBlur}
            placeholder={passwordPlaceholder}
            disabled={isLoading}
            autoComplete={autoComplete ? "current-password" : "off"}
            className={`${styles.input} ${styles.passwordInput} ${
              touched.password && !isPasswordValid ? styles.invalid : ""
            }`}
            aria-invalid={touched.password && !isPasswordValid}
            aria-describedby={
              touched.password && !isPasswordValid ? "password-error" : undefined
            }
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className={styles.togglePassword}
            aria-label={showPassword ? "Hide password" : "Show password"}
            tabIndex={0}
          >
            {showPassword ? "👁️" : "👁️‍🗨️"}
          </button>
        </div>
        {touched.password && !isPasswordValid && (
          <span id="password-error" className={styles.errorText} role="alert">
            Password is required
          </span>
        )}
      </div>

      {error && (
        <div className={styles.error} role="alert" aria-live="assertive">
          <span className={styles.errorIcon} aria-hidden="true">
            ⚠
          </span>
          <span className={styles.errorMessage}>{error}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={!isFormValid || isLoading}
        className={styles.submitButton}
        aria-label={submitLabel}
      >
        {isLoading ? (
          <>
            <span className={styles.spinner} aria-hidden="true"></span>
            <span>Logging in...</span>
          </>
        ) : (
          submitLabel
        )}
      </button>
    </form>
  );
}
