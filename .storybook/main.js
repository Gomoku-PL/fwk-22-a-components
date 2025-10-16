/** @type { import('@storybook/react-vite').StorybookConfig } */
export default {
  // Only load *our* stories from src (we can keep the example folder in the repo,
  // it just won't be scanned by Storybook)
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx|mdx)"],

  addons: ["@storybook/addon-docs"],

  framework: { name: "@storybook/react-vite", options: {} },

  docs: { autodocs: true },
};
