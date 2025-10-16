import RegisterForm from "./RegisterForm";

export default {
  title: "UI/RegisterForm",
  component: RegisterForm,
  args: {
    disabled: false,
    showValidation: true,
    isModal: false,
  },
  argTypes: {
    disabled: {
      control: "boolean",
      description: "Disables all form fields and submission",
    },
    showValidation: {
      control: "boolean",
      description: "Show validation errors as user interacts with form",
    },
    isModal: {
      control: "boolean",
      description: "Apply modal-specific styling for smaller spaces",
    },
    onSubmit: {
      action: "form-submitted",
      description: "Callback fired when form is submitted with valid data",
    },
    onCancel: {
      action: "form-cancelled",
      description:
        "Optional callback for cancel button (shows button when provided)",
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "User registration form with email, password validation, and GDPR-compliant consent handling. Features password strength indicator and comprehensive accessibility support.",
      },
    },
    layout: "centered",
  },
};

export const Playground = {};

export const EmptyForm = {
  args: {
    showValidation: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Empty registration form with validation enabled. Try submitting to see error states.",
      },
    },
  },
};

export const WithCancelButton = {
  args: {
    showValidation: true,
    onCancel: () => {},
  },
  parameters: {
    docs: {
      description: {
        story:
          "Form with cancel button visible, typically used in modal contexts.",
      },
    },
  },
};

export const ModalVersion = {
  args: {
    isModal: true,
    showValidation: true,
    onCancel: () => {},
  },
  parameters: {
    docs: {
      description: {
        story:
          "Compact version designed for modal dialogs with reduced padding and sizing.",
      },
    },
  },
};

export const ValidationDisabled = {
  args: {
    showValidation: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Form with real-time validation disabled (validation still occurs on submit).",
      },
    },
  },
};

export const DisabledState = {
  args: {
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Form in disabled state, typically shown during submission or when form is read-only.",
      },
    },
  },
};

export const InteractiveDemo = {
  render: (args) => {
    const handleSubmit = async (data) => {
      console.log("Registration submitted:", data);

      await new Promise((resolve) => setTimeout(resolve, 2000));

      alert(
        `Account created successfully!\n\nEmail: ${data.email}\nConsent: ${data.consent}\nTimestamp: ${data.timestamp}`,
      );
    };

    const handleCancel = () => {
      console.log("Registration cancelled");
      alert("Registration cancelled");
    };

    return (
      <RegisterForm {...args} onSubmit={handleSubmit} onCancel={handleCancel} />
    );
  },
  args: {
    showValidation: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Interactive demo with simulated submission. Complete the form to see the submission flow with loading states.",
      },
    },
  },
};

export const PasswordStrengthDemo = {
  render: (args) => {
    const handleSubmit = (data) => {
      console.log("Password strength demo - form submitted:", data);
      alert("Registration successful! Check console for submitted data.");
    };

    return (
      <div>
        <p
          style={{
            marginBottom: "1rem",
            color: "#64748b",
            fontSize: "0.9rem",
            textAlign: "center",
          }}
        >
          Try different passwords to see the strength indicator in action
        </p>
        <RegisterForm {...args} onSubmit={handleSubmit} />
      </div>
    );
  },
  args: {
    showValidation: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates the password strength indicator with different password combinations.",
      },
    },
  },
};

export const ValidationErrorStates = {
  render: (args) => {
    const handleSubmit = (data) => {
      console.log("Validation demo - form submitted:", data);
    };

    return (
      <div>
        <p
          style={{
            marginBottom: "1rem",
            color: "#64748b",
            fontSize: "0.9rem",
            textAlign: "center",
          }}
        >
          Form with validation errors. Try submitting to see all error states at
          once.
        </p>
        <RegisterForm {...args} onSubmit={handleSubmit} />
      </div>
    );
  },
  args: {
    showValidation: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Demonstrates various validation error states and messages.",
      },
    },
  },
};

export const AccessibilityTest = {
  render: (args) => {
    const handleSubmit = (data) => {
      console.log("Accessibility test - form submitted:", data);
    };

    const handleCancel = () => {
      console.log("Accessibility test - form cancelled");
    };

    return (
      <div>
        <p
          style={{
            marginBottom: "1rem",
            color: "#64748b",
            fontSize: "0.9rem",
            textAlign: "center",
          }}
        >
          Test with keyboard navigation (Tab/Shift+Tab), screen readers, and
          focus management
        </p>
        <RegisterForm
          {...args}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </div>
    );
  },
  args: {
    showValidation: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Form configured for accessibility testing with proper ARIA labels, keyboard navigation, and screen reader support.",
      },
    },
  },
};

export const GDPRComplianceDemo = {
  render: (args) => {
    const handleSubmit = (data) => {
      console.log("GDPR Demo - Registration data:", {
        email: data.email,
        hasConsent: data.consent,
        dataCollected: "Email address only",
        passwordHandling: "Securely encrypted, not stored in plain text",
        timestamp: data.timestamp,
      });

      alert(
        `GDPR Compliant Registration!\n\nData collected: Email only\nConsent given: ${
          data.consent ? "Yes" : "No"
        }\nUser rights: Can request data deletion anytime`,
      );
    };

    return (
      <div>
        <div
          style={{
            marginBottom: "1.5rem",
            padding: "1rem",
            background: "rgba(59, 130, 246, 0.1)",
            border: "1px solid rgba(59, 130, 246, 0.2)",
            borderRadius: "8px",
            color: "#cbd5e1",
            fontSize: "0.9rem",
          }}
        >
          <strong style={{ color: "#f8fafc" }}>
            GDPR Compliance Features:
          </strong>
          <ul style={{ margin: "0.5rem 0 0 1.25rem", lineHeight: "1.5" }}>
            <li>Clear data collection notice</li>
            <li>Explicit consent checkbox</li>
            <li>Links to Privacy Policy & Terms</li>
            <li>Minimal data collection (email only)</li>
            <li>Password security explanation</li>
            <li>Age verification notice</li>
          </ul>
        </div>
        <RegisterForm {...args} onSubmit={handleSubmit} />
      </div>
    );
  },
  args: {
    showValidation: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates GDPR compliance features including data collection transparency, explicit consent, and user rights information.",
      },
    },
  },
};
