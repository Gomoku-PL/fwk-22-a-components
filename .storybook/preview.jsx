/** @type { import('@storybook/react-vite').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },
  },
};


import { useEffect } from "react";
import "../src/ui/Board/board.css";
import "../src/styles/reset.css";

function ThemeDecorator(Story, context) {
  useEffect(() => {
    // Set CSS variables for light/dark
    if (context.globals.theme === "dark") {
      document.body.style.setProperty("--sb-bg", "#181a1b");
      document.body.style.setProperty("--sb-fg", "#f8f8f8");
    } else {
      document.body.style.setProperty("--sb-bg", "#f8f8f8");
      document.body.style.setProperty("--sb-fg", "#222");
    }
  }, [context.globals.theme]);
  return <Story />;
}

export const decorators = [ThemeDecorator];

export const globalTypes = {
  theme: {
    name: "Theme",
    description: "Global theme for components",
    defaultValue: "light",
    toolbar: {
      icon: "circlehollow",
      items: [
        { value: "light", title: "Light" },
        { value: "dark", title: "Dark" },
      ],
      showName: true,
    },
  },
};

export default preview;
