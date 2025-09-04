

/** @type { import('@storybook/react-vite').StorybookConfig } */
export default  {
  "stories": [
    "../src/**/*.stories.@(js|jsx|ts|tsx|mdx)" //scaning src for stories
  ],
  "addons": [
    "@storybook/addon-essentials"
  ],
  "framework": {
    "name": "@storybook/react-vite",
    "options": {}
  }
};
