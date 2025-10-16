import React, { useState } from 'react';
import styles from './ConsentToggle.module.css';

/**
 * ConsentToggle - A reusable consent toggle component with clear states
 * 
 * @param {Object} props
 * @param {string} props.purposeId - Unique identifier for the consent purpose
 * @param {string} props.label - Label for the consent toggle
 * @param {string} [props.description] - Optional description text
 * @param {boolean} [props.initialValue=false] - Initial consent state
 * @param {function} props.onGrant - Callback when consent is granted
 * @param {function} props.onWithdraw - Callback when consent is withdrawn
 * @param {boolean} [props.disabled=false] - Whether the toggle is disabled
 * @param {string} [props.className] - Additional CSS classes
 */
export default function ConsentToggle({
  purposeId,
  label,
  description,
  initialValue = false,
  onGrant,
  onWithdraw,
  disabled = false,
  className = ''
}) {
  const [isGranted, setIsGranted] = useState(initialValue);

  const handleToggle = () => {
    if (disabled) return;

    const newValue = !isGranted;
    setIsGranted(newValue);

    // Fire appropriate callback with payload
    const payload = { purposeId, value: newValue };
    
    if (newValue) {
      onGrant?.(payload);
    } else {
      onWithdraw?.(payload);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      handleToggle();
    }
  };

  const toggleId = `consent-toggle-${purposeId}`;
  const descriptionId = description ? `${toggleId}-description` : undefined;

  return (
    <div className={`${styles.consentToggle} ${className}`}>
      <div className={styles.toggleContainer}>
        <button
          id={toggleId}
          className={`${styles.toggle} ${isGranted ? styles.granted : styles.withdrawn} ${disabled ? styles.disabled : ''}`}
          onClick={handleToggle}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          aria-pressed={isGranted}
          aria-describedby={descriptionId}
          aria-label={`${label} - ${isGranted ? 'Granted' : 'Withdrawn'}`}
          type="button"
        >
          <span className={styles.toggleTrack}>
            <span className={styles.toggleThumb} />
          </span>
        </button>
        
        <div className={styles.labelContainer}>
          <label htmlFor={toggleId} className={styles.label}>
            {label}
          </label>
          <span className={`${styles.status} ${isGranted ? styles.granted : styles.withdrawn}`}>
            {isGranted ? 'Granted' : 'Withdrawn'}
          </span>
        </div>
      </div>
      
      {description && (
        <p id={descriptionId} className={styles.description}>
          {description}
        </p>
      )}
    </div>
  );
}