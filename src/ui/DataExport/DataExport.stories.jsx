import DataExport from "./DataExport";

export default {
  title: "UI/DataExport",
  component: DataExport,
  args: {
    formats: ["json", "csv"],
    defaultFormat: "json",
    title: "Export Your Data",
    description: "Download a copy of your personal data in a machine-readable format.",
    isLoading: false,
    isSuccess: false,
    error: null
  },
  argTypes: {
    onRequestExport: {
      action: "export-requested",
      description: "Callback when export button is clicked with format parameter"
    },
    onCancel: {
      action: "cancelled",
      description: "Callback when cancel button is clicked"
    },
    formats: {
      control: "object",
      description: "Array of available export formats"
    },
    defaultFormat: {
      control: "select",
      options: ["json", "csv"],
      description: "Default selected format"
    },
    isLoading: {
      control: "boolean",
      description: "Loading state during export"
    },
    isSuccess: {
      control: "boolean",
      description: "Success state after export completes"
    },
    error: {
      control: "text",
      description: "Error message to display"
    }
  },
  parameters: {
    docs: {
      description: {
        component: "Data export component allowing users to download their personal data in various formats (JSON/CSV). Supports loading states, success feedback, and error handling."
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
        story: "Default idle state ready for user interaction."
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
        story: "Loading state shown while data export is being prepared."
      }
    }
  }
};

export const SuccessState = {
  args: {
    isSuccess: true
  },
  parameters: {
    docs: {
      description: {
        story: "Success state shown after data export completes successfully."
      }
    }
  }
};

export const ErrorState = {
  args: {
    error: "Failed to export data. Please try again later."
  },
  parameters: {
    docs: {
      description: {
        story: "Error state shown when export fails with error message."
      }
    }
  }
};

export const WithoutCancel = {
  args: {
    onCancel: null
  },
  parameters: {
    docs: {
      description: {
        story: "Variant without cancel button - useful when cancel is not applicable."
      }
    }
  }
};

export const CustomFormats = {
  args: {
    formats: ["json", "csv", "xml", "pdf"],
    defaultFormat: "xml"
  },
  parameters: {
    docs: {
      description: {
        story: "Example with custom formats including XML and PDF."
      }
    }
  }
};

export const InteractiveDemo = {
  render: (args) => {
    const [state, setState] = React.useState({
      isLoading: false,
      isSuccess: false,
      error: null
    });

    const handleExport = ({ format }) => {
      setState({ isLoading: true, isSuccess: false, error: null });

      // Simulate export process
      setTimeout(() => {
        const success = Math.random() > 0.2; // 80% success rate
        if (success) {
          setState({ isLoading: false, isSuccess: true, error: null });
          setTimeout(() => {
            setState({ isLoading: false, isSuccess: false, error: null });
          }, 3000);
        } else {
          setState({
            isLoading: false,
            isSuccess: false,
            error: "Export failed. Please try again."
          });
        }
      }, 2000);
    };

    const handleCancel = () => {
      setState({ isLoading: false, isSuccess: false, error: null });
    };

    return (
      <DataExport
        {...args}
        {...state}
        onRequestExport={handleExport}
        onCancel={handleCancel}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Interactive demo with simulated export process showing all states."
      }
    }
  }
};

export const StateFlow = {
  render: (args) => {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "2rem", padding: "2rem" }}>
        <div>
          <h3 style={{ color: "#f8fafc", marginBottom: "1rem", textAlign: "center" }}>Idle</h3>
          <DataExport {...args} />
        </div>
        <div>
          <h3 style={{ color: "#f8fafc", marginBottom: "1rem", textAlign: "center" }}>Loading</h3>
          <DataExport {...args} isLoading={true} />
        </div>
        <div>
          <h3 style={{ color: "#f8fafc", marginBottom: "1rem", textAlign: "center" }}>Success</h3>
          <DataExport {...args} isSuccess={true} />
        </div>
        <div>
          <h3 style={{ color: "#f8fafc", marginBottom: "1rem", textAlign: "center" }}>Error</h3>
          <DataExport {...args} error="Failed to export data. Please try again." />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Side-by-side comparison of all component states."
      }
    }
  }
};

export const AccessibilityTest = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: "Test keyboard navigation, screen reader support, and ARIA attributes."
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
        <DataExport {...args} />
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
