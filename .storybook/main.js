/** @type { import('@storybook/react-vite').StorybookConfig } */
<<<<<<< HEAD
const config = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@chromatic-com/storybook",
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
    "@storybook/addon-vitest"
  ],
  "framework": {
    "name": "@storybook/react-vite",
    "options": {}
  }
=======
export default {
  // Only load *our* stories from src (we can keep the example folder in the repo,
  // it just won't be scanned by Storybook)
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx|mdx)"],


  addons: ["@storybook/addon-docs"],

  framework: { name: "@storybook/react-vite", options: {} },

  docs: { autodocs: true },
>>>>>>> dd500617c7ba8ce620460d7a3b463ec2028e654e
};
