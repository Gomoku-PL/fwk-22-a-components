import ConsentToggle from "./ConsentToggle";

export default {
  title: "UI/ConsentToggle",
  component: ConsentToggle,
  parameters: {
    docs: {
      description: {
        component:
          "A reusable consent toggle component with clear states for granting or withdrawing consent for specific processing purposes.",
      },
    },
  },
  argTypes: {
    purposeId: {
      description: "Unique identifier for the consent purpose",
      control: "text",
    },
    label: {
      description: "Label for the consent toggle",
      control: "text",
    },
    description: {
      description: "Optional description text",
      control: "text",
    },
    initialValue: {
      description: "Initial consent state",
      control: "boolean",
    },
    disabled: {
      description: "Whether the toggle is disabled",
      control: "boolean",
    },
    onGrant: {
      description: "Callback when consent is granted",
      action: "onGrant",
    },
    onWithdraw: {
      description: "Callback when consent is withdrawn",
      action: "onWithdraw",
    },
  },
};

// Basic withdrawn state
export const Withdrawn = {
  args: {
    purposeId: "analytics",
    label: "Analytics Cookies",
    description:
      "Allow us to collect anonymous usage data to improve our service.",
    initialValue: false,
    disabled: false,
    onGrant: (payload) => console.log("Consent granted:", payload),
    onWithdraw: (payload) => console.log("Consent withdrawn:", payload),
  },
};

// Basic granted state
export const Granted = {
  args: {
    purposeId: "marketing",
    label: "Marketing Cookies",
    description: "Allow us to show you personalized advertisements.",
    initialValue: true,
    disabled: false,
    onGrant: (payload) => console.log("Consent granted:", payload),
    onWithdraw: (payload) => console.log("Consent withdrawn:", payload),
  },
};

// Without description
export const WithoutDescription = {
  args: {
    purposeId: "essential",
    label: "Essential Cookies",
    initialValue: false,
    disabled: false,
    onGrant: (payload) => console.log("Consent granted:", payload),
    onWithdraw: (payload) => console.log("Consent withdrawn:", payload),
  },
};

// Disabled state
export const Disabled = {
  args: {
    purposeId: "necessary",
    label: "Necessary Cookies",
    description:
      "Required for basic website functionality. Cannot be disabled.",
    initialValue: true,
    disabled: true,
    onGrant: (payload) => console.log("Consent granted:", payload),
    onWithdraw: (payload) => console.log("Consent withdrawn:", payload),
  },
};

// Multiple purposes example
export const MultiplePurposes = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        maxWidth: "400px",
      }}
    >
      <ConsentToggle
        purposeId="analytics"
        label="Analytics"
        description="Help us understand how you use our website"
        initialValue={false}
        onGrant={(payload) => console.log("Analytics granted:", payload)}
        onWithdraw={(payload) => console.log("Analytics withdrawn:", payload)}
      />
      <ConsentToggle
        purposeId="marketing"
        label="Marketing"
        description="Personalized ads and content recommendations"
        initialValue={true}
        onGrant={(payload) => console.log("Marketing granted:", payload)}
        onWithdraw={(payload) => console.log("Marketing withdrawn:", payload)}
      />
      <ConsentToggle
        purposeId="social"
        label="Social Media"
        description="Integration with social media platforms"
        initialValue={false}
        onGrant={(payload) => console.log("Social granted:", payload)}
        onWithdraw={(payload) => console.log("Social withdrawn:", payload)}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Example showing multiple consent toggles for different purposes",
      },
    },
  },
};

// Dark theme
export const DarkTheme = {
  args: {
    purposeId: "analytics-dark",
    label: "Analytics Cookies",
    description:
      "Allow us to collect anonymous usage data to improve our service.",
    initialValue: false,
    disabled: false,
    onGrant: (payload) => console.log("Consent granted:", payload),
    onWithdraw: (payload) => console.log("Consent withdrawn:", payload),
  },
  parameters: {
    backgrounds: { default: "dark" },
    docs: {
      description: {
        story: "Dark theme variant of the consent toggle",
      },
    },
  },
};

// Accessibility showcase
export const AccessibilityShowcase = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        maxWidth: "400px",
      }}
    >
      <p>
        <strong>Accessibility features:</strong>
      </p>
      <ul style={{ fontSize: "0.875rem", marginBottom: "1rem" }}>
        <li>Keyboard navigation (Space/Enter to toggle)</li>
        <li>Screen reader support with aria-pressed</li>
        <li>Focus indicators</li>
        <li>Descriptive labels and status</li>
      </ul>

      <ConsentToggle
        purposeId="accessibility-demo"
        label="Try keyboard navigation"
        description="Use Tab to focus, Space or Enter to toggle"
        initialValue={false}
        onGrant={(payload) => console.log("Granted:", payload)}
        onWithdraw={(payload) => console.log("Withdrawn:", payload)}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Demonstrates the accessibility features of the consent toggle",
      },
    },
  },
};
