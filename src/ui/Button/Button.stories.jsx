import Button from "./Button";

export default {
  title: "UI/Button",
  component: Button,
  args: { children: "Start Game", variant: "primary", type: "button" },
  argTypes: {
    variant: {
      control: { type: "radio" },
      options: ["primary", "secondary", "disabled"],
    },
    children: { control: "text" },
    onClick: { action: "clicked" },
    type: {
      control: { type: "radio" },
      options: ["button", "submit", "reset"],
    },
    ariaLabel: { control: "text" },
  },
  parameters: {
    docs: {
      description: {
        component: "Gradient pill Button with primary/secondary/disabled.",
      },
    },
  },
};

export const Playground = {};
export const Secondary = {
  args: { variant: "secondary", children: "Ångra drag" },
};
export const Disabled = {
  args: { variant: "disabled", children: "Återställ" },
};
