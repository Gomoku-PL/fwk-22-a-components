import SecurityBadge from "./SecurityBadge";

export default {
  title: "UI/SecurityBadge",
  component: SecurityBadge,
  args: {
    httpsStatus: "secure",
    authStatus: "secure",
    cookiesStatus: "secure",
    showDetails: false,
    compact: false,
    disabled: false,
  },
  argTypes: {
    httpsStatus: {
      control: "select",
      options: ["secure", "warning", "insecure"],
      description: "HTTPS connection security status",
    },
    authStatus: {
      control: "select",
      options: ["secure", "warning", "insecure"],
      description: "User authentication status",
    },
    cookiesStatus: {
      control: "select",
      options: ["secure", "warning", "insecure"],
      description: "Cookie security status",
    },
    showDetails: {
      control: "boolean",
      description: "Show individual security feature indicators",
    },
    compact: {
      control: "boolean",
      description: "Use compact layout with icon only",
    },
    disabled: {
      control: "boolean",
      description: "Disable interaction and tooltip",
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Security status badge that displays HTTPS, authentication, and cookie security with color-coded indicators and detailed tooltips. Provides visual feedback on application security state.",
      },
    },
    layout: "centered",
  },
};

export const Playground = {};

export const AllSecure = {
  args: {
    httpsStatus: "secure",
    authStatus: "secure",
    cookiesStatus: "secure",
  },
  parameters: {
    docs: {
      description: {
        story:
          "All security features are working properly - optimal security state.",
      },
    },
  },
};

export const WithWarnings = {
  args: {
    httpsStatus: "secure",
    authStatus: "warning",
    cookiesStatus: "warning",
  },
  parameters: {
    docs: {
      description: {
        story: "Some security features have warnings - partial security state.",
      },
    },
  },
};

export const Insecure = {
  args: {
    httpsStatus: "insecure",
    authStatus: "insecure",
    cookiesStatus: "insecure",
  },
  parameters: {
    docs: {
      description: {
        story: "Multiple security issues detected - critical security state.",
      },
    },
  },
};

export const MixedStates = {
  args: {
    httpsStatus: "secure",
    authStatus: "warning",
    cookiesStatus: "insecure",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Mixed security states - overall status determined by worst state.",
      },
    },
  },
};

export const WithDetails = {
  args: {
    httpsStatus: "secure",
    authStatus: "warning",
    cookiesStatus: "secure",
    showDetails: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Badge with individual security feature indicators visible.",
      },
    },
  },
};

export const CompactMode = {
  args: {
    httpsStatus: "warning",
    authStatus: "secure",
    cookiesStatus: "warning",
    compact: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Compact version showing only the overall security status icon.",
      },
    },
  },
};

export const DisabledState = {
  args: {
    httpsStatus: "secure",
    authStatus: "secure",
    cookiesStatus: "secure",
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Disabled badge with no interaction or tooltip functionality.",
      },
    },
  },
};

export const SecurityStatesDemo = {
  render: () => {
    const states = [
      {
        name: "All Secure",
        https: "secure",
        auth: "secure",
        cookies: "secure",
      },
      {
        name: "Auth Warning",
        https: "secure",
        auth: "warning",
        cookies: "secure",
      },
      {
        name: "Cookie Issues",
        https: "secure",
        auth: "secure",
        cookies: "insecure",
      },
      {
        name: "HTTPS Problem",
        https: "insecure",
        auth: "secure",
        cookies: "secure",
      },
      {
        name: "Multiple Issues",
        https: "warning",
        auth: "insecure",
        cookies: "warning",
      },
      {
        name: "All Insecure",
        https: "insecure",
        auth: "insecure",
        cookies: "insecure",
      },
    ];

    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "2rem",
          padding: "2rem",
        }}
      >
        {states.map((state) => (
          <div key={state.name} style={{ textAlign: "center" }}>
            <SecurityBadge
              httpsStatus={state.https}
              authStatus={state.auth}
              cookiesStatus={state.cookies}
              showDetails={true}
            />
            <p
              style={{
                marginTop: "0.75rem",
                color: "#94a3b8",
                fontSize: "0.875rem",
              }}
            >
              {state.name}
            </p>
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Demonstration of all possible security state combinations with detailed indicators.",
      },
    },
  },
};

export const InteractiveTooltips = {
  render: (args) => {
    return (
      <div
        style={{
          display: "flex",
          gap: "2rem",
          alignItems: "center",
          justifyContent: "center",
          padding: "3rem",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <SecurityBadge
            httpsStatus="secure"
            authStatus="secure"
            cookiesStatus="secure"
            {...args}
          />
          <p
            style={{
              marginTop: "1rem",
              color: "#94a3b8",
              fontSize: "0.875rem",
            }}
          >
            Hover or focus to see tooltip
          </p>
        </div>
        <div style={{ textAlign: "center" }}>
          <SecurityBadge
            httpsStatus="secure"
            authStatus="warning"
            cookiesStatus="insecure"
            showDetails={true}
            {...args}
          />
          <p
            style={{
              marginTop: "1rem",
              color: "#94a3b8",
              fontSize: "0.875rem",
            }}
          >
            With detailed view
          </p>
        </div>
      </div>
    );
  },
  args: {},
  parameters: {
    docs: {
      description: {
        story:
          "Interactive demonstration of tooltip functionality on hover and focus.",
      },
    },
  },
};

export const AccessibilityTest = {
  render: (args) => {
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
          <strong style={{ color: "#f8fafc" }}>Accessibility Features:</strong>
          <ul style={{ margin: "0.5rem 0 0 1.25rem", lineHeight: "1.5" }}>
            <li>Keyboard navigation with Tab/Enter/Space</li>
            <li>Screen reader announcements with aria-label</li>
            <li>Focus management with visible focus indicators</li>
            <li>Semantic roles and ARIA attributes</li>
            <li>Escape key closes tooltip</li>
          </ul>
        </div>

        <div
          style={{
            display: "flex",
            gap: "2rem",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <SecurityBadge
            httpsStatus="secure"
            authStatus="warning"
            cookiesStatus="secure"
            showDetails={true}
            {...args}
          />
          <SecurityBadge
            httpsStatus="warning"
            authStatus="insecure"
            cookiesStatus="warning"
            compact={true}
            {...args}
          />
        </div>
      </div>
    );
  },
  args: {},
  parameters: {
    docs: {
      description: {
        story:
          "Test keyboard navigation, screen reader compatibility, and focus management.",
      },
    },
  },
};

export const ResponsiveLayout = {
  render: (args) => {
    return (
      <div>
        <div
          style={{
            marginBottom: "1rem",
            color: "#94a3b8",
            fontSize: "0.9rem",
            textAlign: "center",
          }}
        >
          Resize browser window to see responsive behavior
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
            justifyContent: "center",
          }}
        >
          <SecurityBadge
            httpsStatus="secure"
            authStatus="secure"
            cookiesStatus="secure"
            showDetails={true}
            {...args}
          />
          <SecurityBadge
            httpsStatus="warning"
            authStatus="warning"
            cookiesStatus="insecure"
            showDetails={true}
            {...args}
          />
          <SecurityBadge
            httpsStatus="insecure"
            authStatus="insecure"
            cookiesStatus="insecure"
            compact={true}
            {...args}
          />
        </div>
      </div>
    );
  },
  args: {},
  parameters: {
    docs: {
      description: {
        story:
          "Responsive layout demonstration showing how badges adapt to different screen sizes.",
      },
    },
  },
};

export const RealWorldScenarios = {
  render: () => {
    const scenarios = [
      {
        title: "Production Environment",
        description: "Fully secure production setup",
        https: "secure",
        auth: "secure",
        cookies: "secure",
      },
      {
        title: "Development Environment",
        description: "Local development with some warnings",
        https: "warning",
        auth: "secure",
        cookies: "warning",
      },
      {
        title: "Session Expiring",
        description: "User session about to expire",
        https: "secure",
        auth: "warning",
        cookies: "secure",
      },
      {
        title: "Compromised Session",
        description: "Security breach detected",
        https: "secure",
        auth: "insecure",
        cookies: "insecure",
      },
    ];

    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "1.5rem",
          padding: "1rem",
        }}
      >
        {scenarios.map((scenario) => (
          <div
            key={scenario.title}
            style={{
              padding: "1.5rem",
              background: "rgba(30, 41, 59, 0.6)",
              borderRadius: "8px",
              border: "1px solid rgba(148, 163, 184, 0.2)",
            }}
          >
            <div style={{ textAlign: "center", marginBottom: "1rem" }}>
              <SecurityBadge
                httpsStatus={scenario.https}
                authStatus={scenario.auth}
                cookiesStatus={scenario.cookies}
                showDetails={true}
              />
            </div>
            <h4
              style={{
                margin: "0 0 0.5rem 0",
                color: "#f8fafc",
                fontSize: "1rem",
              }}
            >
              {scenario.title}
            </h4>
            <p
              style={{
                margin: "0",
                color: "#94a3b8",
                fontSize: "0.875rem",
                lineHeight: "1.4",
              }}
            >
              {scenario.description}
            </p>
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Real-world usage scenarios showing different security states in context.",
      },
    },
  },
};
