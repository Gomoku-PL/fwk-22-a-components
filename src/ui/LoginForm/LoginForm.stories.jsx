import LoginForm from "./LoginForm";

export default {
  title: "UI/LoginForm",
  component: LoginForm,
  args: {
    emailLabel: "Email",
    passwordLabel: "Password",
    submitLabel: "Log In",
    forgotPasswordLabel: "Forgot password?",
    showForgotPassword: true,
    emailPlaceholder: "Enter your email",
    passwordPlaceholder: "Enter your password",
    autoComplete: false,
    isLoading: false,
    error: null
  },
  argTypes: {
    onSubmit: {
      action: "submitted",
      description: "Callback when form is submitted with { email, password }"
    },
    onForgotPassword: {
      action: "forgot-password",
      description: "Callback when forgot password link is clicked"
    },
    isLoading: {
      control: "boolean",
      description: "Loading state during authentication"
    },
    error: {
      control: "text",
      description: "Error message to display"
    },
    autoComplete: {
      control: "boolean",
      description: "Enable browser autocomplete for credentials"
    },
    showForgotPassword: {
      control: "boolean",
      description: "Show forgot password link"
    }
  },
  parameters: {
    docs: {
      description: {
        component: "Secure login form component with email and password fields. Features client-side validation, loading states, error handling, and accessibility support. No autofill by default for enhanced security."
      }
    },
    layout: "centered"
  }
};

export const Playground = {};

export const DefaultState = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: "Default idle state ready for user input."
      }
    }
  }
};

export const LoadingState = {
  args: {
    isLoading: true
  },
  parameters: {
    docs: {
      description: {
        story: "Loading state shown during authentication process."
      }
    }
  }
};

export const ErrorState = {
  args: {
    error: "Invalid email or password. Please try again."
  },
  parameters: {
    docs: {
      description: {
        story: "Error state with authentication failure message."
      }
    }
  }
};

export const WithoutForgotPassword = {
  args: {
    showForgotPassword: false
  },
  parameters: {
    docs: {
      description: {
        story: "Variant without forgot password link."
      }
    }
  }
};

export const WithAutoComplete = {
  args: {
    autoComplete: true
  },
  parameters: {
    docs: {
      description: {
        story: "Variant with browser autocomplete enabled for convenience."
      }
    }
  }
};

export const CustomLabels = {
  args: {
    emailLabel: "Your Email Address",
    passwordLabel: "Your Password",
    submitLabel: "Sign In",
    forgotPasswordLabel: "Reset Password"
  },
  parameters: {
    docs: {
      description: {
        story: "Example with customized labels for internationalization or branding."
      }
    }
  }
};

export const InteractiveDemo = {
  render: (args) => {
    const [state, setState] = React.useState({
      isLoading: false,
      error: null
    });

    const handleSubmit = ({ email, password }) => {
      setState({ isLoading: true, error: null });

      // Simulate authentication
      setTimeout(() => {
        if (email === "test@example.com" && password === "password") {
          setState({ isLoading: false, error: null });
          alert("Login successful!");
        } else {
          setState({
            isLoading: false,
            error: "Invalid email or password. Try test@example.com / password"
          });
        }
      }, 1500);
    };

    const handleForgotPassword = () => {
      alert("Forgot password clicked - would navigate to password reset");
    };

    return (
      <div style={{ padding: "2rem" }}>
        <div
          style={{
            marginBottom: "1.5rem",
            padding: "1rem",
            background: "rgba(59, 130, 246, 0.1)",
            border: "1px solid rgba(59, 130, 246, 0.3)",
            borderRadius: "8px",
            color: "#93c5fd",
            fontSize: "0.9rem",
            textAlign: "center"
          }}
        >
          <strong>Demo credentials:</strong> test@example.com / password
        </div>
        <LoginForm
          {...args}
          {...state}
          onSubmit={handleSubmit}
          onForgotPassword={handleForgotPassword}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Interactive demo with simulated authentication. Try logging in with test@example.com / password."
      }
    }
  }
};

export const ValidationDemo = {
  render: (args) => {
    return (
      <div style={{ padding: "2rem" }}>
        <div
          style={{
            marginBottom: "1.5rem",
            padding: "1rem",
            background: "rgba(59, 130, 246, 0.1)",
            border: "1px solid rgba(59, 130, 246, 0.3)",
            borderRadius: "8px",
            color: "#93c5fd",
            fontSize: "0.9rem"
          }}
        >
          <strong>Test validation:</strong>
          <ul style={{ margin: "0.5rem 0 0 1.25rem", lineHeight: "1.5" }}>
            <li>Email must be a valid email format</li>
            <li>Password is required</li>
            <li>Submit button disabled until valid</li>
            <li>Validation errors shown after field blur</li>
          </ul>
        </div>
        <LoginForm {...args} />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Demonstrates client-side validation with real-time feedback."
      }
    }
  }
};

export const StateFlow = {
  render: (args) => {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "3rem", padding: "2rem" }}>
        <div>
          <h3 style={{ color: "#f8fafc", marginBottom: "1rem", textAlign: "center" }}>
            Default State
          </h3>
          <LoginForm {...args} />
        </div>
        <div>
          <h3 style={{ color: "#f8fafc", marginBottom: "1rem", textAlign: "center" }}>
            Loading State
          </h3>
          <LoginForm {...args} isLoading={true} />
        </div>
        <div>
          <h3 style={{ color: "#f8fafc", marginBottom: "1rem", textAlign: "center" }}>
            Error State
          </h3>
          <LoginForm {...args} error="Invalid credentials. Please try again." />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Side-by-side comparison of all form states."
      }
    }
  }
};

export const AccessibilityTest = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: "Test accessibility features: keyboard navigation, screen reader support, ARIA labels, and error announcements."
      }
    }
  }
};

export const ResponsiveDemo = {
  render: (args) => {
    return (
      <div style={{ padding: "1rem" }}>
        <div style={{ marginBottom: "1rem", color: "#94a3b8", fontSize: "0.9rem", textAlign: "center" }}>
          Resize browser window to see responsive behavior
        </div>
        <LoginForm {...args} />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Responsive design demonstration for different screen sizes."
      }
    }
  }
};

export const SecurityFeatures = {
  render: (args) => {
    return (
      <div style={{ padding: "2rem" }}>
        <div
          style={{
            marginBottom: "1.5rem",
            padding: "1rem",
            background: "rgba(34, 197, 94, 0.1)",
            border: "1px solid rgba(34, 197, 94, 0.3)",
            borderRadius: "8px",
            color: "#86efac",
            fontSize: "0.9rem"
          }}
        >
          <strong>Security by Design:</strong>
          <ul style={{ margin: "0.5rem 0 0 1.25rem", lineHeight: "1.5" }}>
            <li>No autocomplete by default (can be enabled)</li>
            <li>Password visibility toggle for user control</li>
            <li>Client-side validation prevents invalid submissions</li>
            <li>Clear error messaging without revealing details</li>
            <li>Loading state prevents multiple submissions</li>
            <li>ARIA attributes for accessibility</li>
          </ul>
        </div>
        <LoginForm {...args} />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Overview of security features built into the component."
      }
    }
  }
};
