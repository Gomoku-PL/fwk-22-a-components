import Button from "./Button";

export default {
  title: "UI/Button",
  component: Button,
  args: { children: "Click me", variant: "primary" ,type: "button" },
argTypes: {
    variant: {
      control: { type: "radio" },
      options: ["primary", "secondary", "disabled"],
    description:'Visual style: "disabled" is non-interactive'
    },
    children: { control: "text", description: "Button label" },
    onClick: { action: "clicked", description: "Click Handler" },
    type: {
      control: { type: "radio" },
      options: ["button", "submit", "reset"],
    },
    ariaLabel: {
      control: "text",
      description: "Defaults to text children when it is not a string",
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