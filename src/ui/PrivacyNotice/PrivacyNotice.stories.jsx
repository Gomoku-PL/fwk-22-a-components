import PrivacyNotice from "./PrivacyNotice";

export default {
  title: "UI/PrivacyNotice",
  component: PrivacyNotice,
  args: {
    variant: "footer",
    theme: "dark",
    showLastUpdated: true,
    policyUrl: "/privacy-policy",
    settingsUrl: "/privacy-settings"
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["footer", "settings"],
      description: "Display variant for different page sections"
    },
    theme: {
      control: "select",
      options: ["dark", "light"],
      description: "Theme compatibility for light and dark modes"
    },
    showLastUpdated: {
      control: "boolean",
      description: "Show last updated date"
    },
    policyUrl: {
      control: "text",
      description: "URL for privacy policy page"
    },
    settingsUrl: {
      control: "text", 
      description: "URL for privacy settings page"
    },
    onPolicyClick: {
      action: "policy-clicked",
      description: "Callback when policy link is clicked"
    },
    onSettingsClick: {
      action: "settings-clicked", 
      description: "Callback when settings link is clicked"
    }
  },
  parameters: {
    docs: {
      description: {
        component: "Privacy notice component with footer and settings variants. Provides clear privacy information with links to full policy and settings. Supports both light and dark themes."
      }
    },
    layout: "centered"
  }
};

export const Playground = {};

export const FooterDark = {
  args: {
    variant: "footer",
    theme: "dark"
  },
  parameters: {
    docs: {
      description: {
        story: "Footer variant with dark theme - ideal for footer placement in dark mode applications."
      }
    }
  }
};

export const FooterLight = {
  args: {
    variant: "footer", 
    theme: "light"
  },
  parameters: {
    docs: {
      description: {
        story: "Footer variant with light theme - ideal for footer placement in light mode applications."
      }
    }
  }
};

export const SettingsDark = {
  args: {
    variant: "settings",
    theme: "dark"
  },
  parameters: {
    docs: {
      description: {
        story: "Settings variant with dark theme - comprehensive privacy information for settings pages."
      }
    }
  }
};

export const SettingsLight = {
  args: {
    variant: "settings",
    theme: "light"
  },
  parameters: {
    docs: {
      description: {
        story: "Settings variant with light theme - comprehensive privacy information for settings pages."
      }
    }
  }
};

export const WithoutLastUpdated = {
  args: {
    variant: "settings",
    theme: "dark",
    showLastUpdated: false
  },
  parameters: {
    docs: {
      description: {
        story: "Settings variant without last updated date display."
      }
    }
  }
};

export const ThemeComparison = {
  render: (args) => {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "2rem", padding: "2rem" }}>
        <div>
          <h3 style={{ marginBottom: "1rem", color: "#f8fafc", textAlign: "center" }}>Dark Theme</h3>
          <PrivacyNotice {...args} theme="dark" />
        </div>
        <div>
          <h3 style={{ marginBottom: "1rem", color: "#111827", textAlign: "center" }}>Light Theme</h3>
          <PrivacyNotice {...args} theme="light" />
        </div>
      </div>
    );
  },
  args: {
    variant: "settings"
  },
  parameters: {
    docs: {
      description: {
        story: "Side-by-side comparison of dark and light theme support."
      }
    }
  }
};

export const VariantComparison = {
  render: (args) => {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "3rem", padding: "2rem" }}>
        <div>
          <h3 style={{ marginBottom: "1rem", color: "#f8fafc", textAlign: "center" }}>Footer Variant</h3>
          <PrivacyNotice {...args} variant="footer" />
        </div>
        <div>
          <h3 style={{ marginBottom: "1rem", color: "#f8fafc", textAlign: "center" }}>Settings Variant</h3>
          <PrivacyNotice {...args} variant="settings" />
        </div>
      </div>
    );
  },
  args: {
    theme: "dark"
  },
  parameters: {
    docs: {
      description: {
        story: "Comparison of footer and settings variants showing different use cases."
      }
    }
  }
};

export const InteractiveDemo = {
  render: (args) => {
    const handlePolicyClick = () => {
      alert("Privacy Policy clicked - would navigate to policy page");
    };

    const handleSettingsClick = () => {
      alert("Privacy Settings clicked - would open settings modal/page");
    };

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "2rem", padding: "2rem" }}>
        <div style={{ textAlign: "center", marginBottom: "1rem" }}>
          <p style={{ color: "#cbd5e1", fontSize: "0.9rem" }}>
            Click the privacy links to see interaction callbacks
          </p>
        </div>
        <PrivacyNotice 
          {...args} 
          onPolicyClick={handlePolicyClick}
          onSettingsClick={handleSettingsClick}
        />
      </div>
    );
  },
  args: {
    variant: "settings",
    theme: "dark"
  },
  parameters: {
    docs: {
      description: {
        story: "Interactive demo showing callback functionality for privacy links."
      }
    }
  }
};

export const FooterIntegrationExample = {
  render: (args) => {
    return (
      <div style={{ 
        minHeight: "100vh", 
        display: "flex", 
        flexDirection: "column",
        background: "#0f172a"
      }}>
        <div style={{ 
          flex: 1, 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center",
          color: "#cbd5e1"
        }}>
          <p>Main application content would go here...</p>
        </div>
        <PrivacyNotice {...args} variant="footer" theme="dark" />
      </div>
    );
  },
  args: {},
  parameters: {
    docs: {
      description: {
        story: "Example of footer integration in a full-page layout."
      }
    }
  }
};

export const SettingsPageExample = {
  render: (args) => {
    return (
      <div style={{ 
        padding: "2rem",
        background: "#0f172a",
        minHeight: "100vh"
      }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <h1 style={{ color: "#f8fafc", marginBottom: "2rem", textAlign: "center" }}>
            Privacy Settings
          </h1>
          <PrivacyNotice {...args} variant="settings" theme="dark" />
        </div>
      </div>
    );
  },
  args: {},
  parameters: {
    docs: {
      description: {
        story: "Example of settings page integration with contextual layout."
      }
    }
  }
};

export const AccessibilityTest = {
  render: (args) => {
    return (
      <div>
        <div style={{ 
          marginBottom: "1.5rem", 
          padding: "1rem", 
          background: "rgba(59, 130, 246, 0.1)", 
          border: "1px solid rgba(59, 130, 246, 0.2)", 
          borderRadius: "8px",
          color: "#cbd5e1",
          fontSize: "0.9rem"
        }}>
          <strong style={{ color: "#f8fafc" }}>Accessibility Features:</strong>
          <ul style={{ margin: "0.5rem 0 0 1.25rem", lineHeight: "1.5" }}>
            <li>Semantic HTML with proper ARIA labels</li>
            <li>Keyboard navigation support</li>
            <li>Screen reader compatible</li>
            <li>Focus management with visible indicators</li>
            <li>High contrast text and interactive elements</li>
          </ul>
        </div>
        <PrivacyNotice {...args} />
      </div>
    );
  },
  args: {
    variant: "settings",
    theme: "dark"
  },
  parameters: {
    docs: {
      description: {
        story: "Accessibility testing with keyboard navigation and screen reader support."
      }
    }
  }
};

export const ResponsiveDemo = {
  render: (args) => {
    return (
      <div>
        <div style={{ marginBottom: "1rem", color: "#94a3b8", fontSize: "0.9rem", textAlign: "center" }}>
          Resize browser window to see responsive behavior
        </div>
        <PrivacyNotice {...args} />
      </div>
    );
  },
  args: {
    variant: "settings",
    theme: "dark"
  },
  parameters: {
    docs: {
      description: {
        story: "Responsive design demonstration for different screen sizes."
      }
    }
  }
};