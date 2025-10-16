import GDPRSupport from "./GDPRSupport";

export default {
  title: "UI/GDPRSupport",
  component: GDPRSupport,
  args: {
    disabled: false,
    showValidation: true,
    initialData: {},
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
    initialData: {
      control: "object",
      description: "Pre-populate form with initial data",
    },
    onSubmit: {
      action: "form-submitted",
      description: "Callback fired when form is submitted with valid data",
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "GDPR Support contact form with comprehensive validation, accessibility features, and error handling. Supports various request types for data protection compliance.",
      },
    },
    layout: "centered",
  },
};

export const Playground = {};

export const EmptyForm = {
  args: {
    initialData: {},
    showValidation: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Empty form showing all fields with validation enabled.",
      },
    },
  },
};

export const PrefilledForm = {
  args: {
    initialData: {
      name: "Jane Doe",
      email: "jane.doe@example.com",
      requestType: "data-access",
      message:
        "I would like to request access to all personal data you have stored about me as per Article 15 of GDPR.",
    },
    showValidation: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Form pre-filled with sample data for testing and demonstration.",
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
    initialData: {
      name: "John Smith",
      email: "john@example.com",
      requestType: "data-deletion",
      message: "Please delete all my personal data from your systems.",
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "Form in disabled state, typically shown when submission is in progress or form is read-only.",
      },
    },
  },
};

export const WithAllRequestTypes = {
  render: (args) => {
    const handleSubmit = (data) => {
      console.log("Form submitted:", data);
      alert(
        `Submitted: ${data.requestType} request from ${data.name} (${data.email})`,
      );
    };

    return <GDPRSupport {...args} onSubmit={handleSubmit} />;
  },
  args: {
    showValidation: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Interactive form demonstrating all available request types with console logging.",
      },
    },
  },
};

export const ValidationDemo = {
  render: (args) => {
    const handleSubmit = async (data) => {
      console.log("Validation demo - form submitted:", data);

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      alert(
        `Successfully submitted ${
          data.requestType
        } request!\n\nData: ${JSON.stringify(data, null, 2)}`,
      );
    };

    return <GDPRSupport {...args} onSubmit={handleSubmit} />;
  },
  args: {
    showValidation: true,
    initialData: {},
  },
  parameters: {
    docs: {
      description: {
        story:
          "Validation demonstration - try submitting empty form or invalid data to see error messages. Shows loading state during submission.",
      },
    },
  },
};

export const AccessibilityTest = {
  render: (args) => {
    const handleSubmit = (data) => {
      console.log("Accessibility test - form submitted:", data);
    };

    return (
      <div>
        <p
          style={{ marginBottom: "1rem", color: "#64748b", fontSize: "0.9rem" }}
        >
          Test accessibility features: Use Tab to navigate, screen readers will
          announce errors, and form has proper ARIA labels and descriptions.
        </p>
        <GDPRSupport {...args} onSubmit={handleSubmit} />
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
          "Form configured for accessibility testing with screen readers and keyboard navigation.",
      },
    },
  },
};

export const ErrorStates = {
  render: (args) => {
    const handleSubmit = (data) => {
      console.log("Error states demo - form submitted:", data);
    };

    return <GDPRSupport {...args} onSubmit={handleSubmit} />;
  },
  args: {
    showValidation: true,
    initialData: {
      name: "A", // Too short
      email: "invalid-email", // Invalid format
      requestType: "", // Not selected
      message: "Short", // Too short
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "Form pre-filled with invalid data to demonstrate error states and validation messages.",
      },
    },
  },
};
