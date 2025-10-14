import CookieBanner from "./CookieBanner";

export default {
  title: "UI/CookieBanner",
  component: CookieBanner,
  args: {
    isVisible: true,
    showModal: false,
    initialPreferences: {},
    title: "Cookie Preferences",
    description:
      "We use cookies to enhance your experience. Choose your preferences below.",
  },
  argTypes: {
    isVisible: {
      control: "boolean",
      description: "Controls banner visibility",
    },
    showModal: {
      control: "boolean",
      description: "Opens modal on render",
    },
    initialPreferences: {
      control: "object",
      description: "Initial cookie preferences state",
    },
    title: {
      control: "text",
      description: "Banner title text",
    },
    description: {
      control: "text",
      description: "Banner description text",
    },
    onSave: {
      action: "preferences-saved",
      description: "Callback when preferences are saved",
    },
    onDismiss: {
      action: "banner-dismissed",
      description: "Callback when banner is dismissed",
    },
    onShowModal: {
      action: "modal-opened",
      description: "Callback when modal opens",
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Cookie consent banner with customizable preferences modal. Provides Accept All, Reject All, and Customize options with accessible keyboard navigation.",
      },
    },
    layout: "fullscreen",
  },
};

export const Playground = {};

export const BannerOnly = {
  args: {
    isVisible: true,
    showModal: false,
  },
  parameters: {
    docs: {
      description: {
        story: "Default banner state without modal open.",
      },
    },
  },
};

export const WithModal = {
  args: {
    isVisible: true,
    showModal: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Banner with preferences modal open.",
      },
    },
  },
};

export const WithInitialPreferences = {
  args: {
    isVisible: true,
    showModal: true,
    initialPreferences: {
      analytics: true,
      marketing: false,
    },
  },
  parameters: {
    docs: {
      description: {
        story: "Banner with pre-configured preferences.",
      },
    },
  },
};

export const CustomContent = {
  args: {
    isVisible: true,
    title: "Privacy Settings",
    description:
      "Customize your data sharing preferences to control how we personalize your experience.",
  },
  parameters: {
    docs: {
      description: {
        story: "Banner with custom title and description text.",
      },
    },
  },
};

export const Hidden = {
  args: {
    isVisible: false,
  },
  parameters: {
    docs: {
      description: {
        story: "Banner in hidden state (dismissed).",
      },
    },
  },
};

export const InteractiveDemo = {
  render: (args) => {
    const handleSave = (preferences) => {
      console.log("Preferences saved:", preferences);
      alert(`Preferences saved: ${JSON.stringify(preferences, null, 2)}`);
    };

    const handleDismiss = () => {
      console.log("Banner dismissed");
      alert("Banner dismissed");
    };

    const handleShowModal = () => {
      console.log("Modal opened");
    };

    return (
      <CookieBanner
        {...args}
        onSave={handleSave}
        onDismiss={handleDismiss}
        onShowModal={handleShowModal}
      />
    );
  },
  args: {
    isVisible: true,
    showModal: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Interactive demo with console logging and alerts to demonstrate callback functionality.",
      },
    },
  },
};
