import DataDeletionConfirm from "./DataDeletionConfirm";

export default {
  title: "UI/DataDeletionConfirm",
  component: DataDeletionConfirm,
  args: {
    isOpen: true,
    confirmationType: "type",
    confirmationText: "DELETE",
    warningLevel: "strong",
    title: "Delete Your Data",
    message: "This action cannot be undone. All your data will be permanently deleted.",
    details: [
      "Your profile and account information",
      "All game history and statistics",
      "Saved preferences and settings",
      "Consent and privacy records"
    ]
  },
  argTypes: {
    isOpen: {
      control: "boolean",
      description: "Controls modal visibility"
    },
    onConfirm: {
      action: "confirmed",
      description: "Callback when deletion is confirmed"
    },
    onCancel: {
      action: "cancelled",
      description: "Callback when deletion is cancelled"
    },
    confirmationType: {
      control: "select",
      options: ["type", "checkbox"],
      description: "Type of confirmation required"
    },
    confirmationText: {
      control: "text",
      description: "Text user must type for confirmation"
    },
    warningLevel: {
      control: "select",
      options: ["strong", "soft"],
      description: "Visual warning intensity"
    },
    title: {
      control: "text",
      description: "Modal title"
    },
    message: {
      control: "text",
      description: "Main warning message"
    },
    details: {
      control: "object",
      description: "List of items that will be deleted"
    }
  },
  parameters: {
    docs: {
      description: {
        component: "Modal confirmation dialog for irreversible data deletion. Features focus trap, ESC key support, and accessible markup. Supports two confirmation methods: typing a word or checking a box."
      }
    }
  }
};

export const Playground = {};

export const StrongWarningWithTyping = {
  args: {
    confirmationType: "type",
    warningLevel: "strong"
  },
  parameters: {
    docs: {
      description: {
        story: "Strong warning variant requiring user to type DELETE for confirmation. Recommended for critical actions."
      }
    }
  }
};

export const SoftWarningWithTyping = {
  args: {
    confirmationType: "type",
    warningLevel: "soft"
  },
  parameters: {
    docs: {
      description: {
        story: "Soft warning variant with typing confirmation. Suitable for less critical deletions."
      }
    }
  }
};

export const StrongWarningWithCheckbox = {
  args: {
    confirmationType: "checkbox",
    warningLevel: "strong"
  },
  parameters: {
    docs: {
      description: {
        story: "Strong warning variant with checkbox confirmation. Faster but less protective."
      }
    }
  }
};

export const SoftWarningWithCheckbox = {
  args: {
    confirmationType: "checkbox",
    warningLevel: "soft"
  },
  parameters: {
    docs: {
      description: {
        story: "Soft warning variant with checkbox confirmation."
      }
    }
  }
};

export const CustomConfirmationText = {
  args: {
    confirmationType: "type",
    confirmationText: "PERMANENTLY DELETE",
    warningLevel: "strong"
  },
  parameters: {
    docs: {
      description: {
        story: "Example with custom confirmation text that user must type."
      }
    }
  }
};

export const MinimalDetails = {
  args: {
    details: ["All your data"],
    message: "Are you sure you want to delete everything?"
  },
  parameters: {
    docs: {
      description: {
        story: "Minimal variant with simplified details list."
      }
    }
  }
};

export const ComprehensiveDetails = {
  args: {
    details: [
      "Profile information (name, email, avatar)",
      "Game statistics and match history",
      "Preferences and settings",
      "Consent records and privacy choices",
      "Activity logs and timestamps",
      "Connected accounts and integrations",
      "Saved game states and replays",
      "Friend lists and social connections"
    ]
  },
  parameters: {
    docs: {
      description: {
        story: "Comprehensive variant with detailed list of what will be deleted."
      }
    }
  }
};

export const InteractiveDemo = {
  render: (args) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [deletionComplete, setDeletionComplete] = React.useState(false);

    const handleOpen = () => {
      setIsOpen(true);
      setDeletionComplete(false);
    };

    const handleConfirm = () => {
      setIsOpen(false);
      setDeletionComplete(true);
      setTimeout(() => setDeletionComplete(false), 3000);
    };

    const handleCancel = () => {
      setIsOpen(false);
    };

    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <button
          onClick={handleOpen}
          style={{
            padding: "1rem 2rem",
            fontSize: "1rem",
            fontWeight: 600,
            background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
            color: "#ffffff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer"
          }}
        >
          Delete My Data
        </button>

        {deletionComplete && (
          <div
            style={{
              marginTop: "1rem",
              padding: "1rem",
              background: "rgba(34, 197, 94, 0.1)",
              border: "1px solid rgba(34, 197, 94, 0.3)",
              borderRadius: "8px",
              color: "#86efac"
            }}
          >
            ✓ Data deletion confirmed (demo only)
          </div>
        )}

        <DataDeletionConfirm
          {...args}
          isOpen={isOpen}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Interactive demo showing full user flow from button click to confirmation."
      }
    }
  }
};

export const AccessibilityTest = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: "Test accessibility features: keyboard navigation (Tab, Shift+Tab, ESC), focus trap, screen reader support, and ARIA attributes."
      }
    }
  }
};

export const ResponsiveDemo = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: "Resize browser window to see responsive behavior on mobile devices."
      }
    }
  }
};

export const WarningComparison = {
  render: (args) => {
    const [activeModal, setActiveModal] = React.useState(null);

    return (
      <div style={{ display: "flex", gap: "1rem", padding: "2rem", justifyContent: "center" }}>
        <button
          onClick={() => setActiveModal("soft")}
          style={{
            padding: "1rem 1.5rem",
            fontSize: "1rem",
            fontWeight: 600,
            background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
            color: "#ffffff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer"
          }}
        >
          Soft Warning
        </button>

        <button
          onClick={() => setActiveModal("strong")}
          style={{
            padding: "1rem 1.5rem",
            fontSize: "1rem",
            fontWeight: 600,
            background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
            color: "#ffffff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer"
          }}
        >
          Strong Warning
        </button>

        <DataDeletionConfirm
          {...args}
          isOpen={activeModal === "soft"}
          warningLevel="soft"
          onConfirm={() => setActiveModal(null)}
          onCancel={() => setActiveModal(null)}
        />

        <DataDeletionConfirm
          {...args}
          isOpen={activeModal === "strong"}
          warningLevel="strong"
          onConfirm={() => setActiveModal(null)}
          onCancel={() => setActiveModal(null)}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Compare soft vs strong warning visual styles."
      }
    }
  }
};

export const ConfirmationTypeComparison = {
  render: (args) => {
    const [activeModal, setActiveModal] = React.useState(null);

    return (
      <div style={{ display: "flex", gap: "1rem", padding: "2rem", justifyContent: "center" }}>
        <button
          onClick={() => setActiveModal("type")}
          style={{
            padding: "1rem 1.5rem",
            fontSize: "1rem",
            fontWeight: 600,
            background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
            color: "#ffffff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer"
          }}
        >
          Type Confirmation
        </button>

        <button
          onClick={() => setActiveModal("checkbox")}
          style={{
            padding: "1rem 1.5rem",
            fontSize: "1rem",
            fontWeight: 600,
            background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
            color: "#ffffff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer"
          }}
        >
          Checkbox Confirmation
        </button>

        <DataDeletionConfirm
          {...args}
          isOpen={activeModal === "type"}
          confirmationType="type"
          onConfirm={() => setActiveModal(null)}
          onCancel={() => setActiveModal(null)}
        />

        <DataDeletionConfirm
          {...args}
          isOpen={activeModal === "checkbox"}
          confirmationType="checkbox"
          onConfirm={() => setActiveModal(null)}
          onCancel={() => setActiveModal(null)}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Compare typing vs checkbox confirmation methods."
      }
    }
  }
};
