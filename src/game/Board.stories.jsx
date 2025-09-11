import React from "react";
import Board from "./Board.jsx";

export default {
  title: "Game/Board",
  component: Board,
  argTypes: {
    size: {
      control: { type: "number", min: 5, max: 20, step: 1 },
      description: "Board size (NxN)",
      defaultValue: 15,
    },
  },
};

const Template = (args) => <Board {...args} />;

// Sample board state for demonstration
const sampleBoard = [
  ["X", null, "O", null, null, null, null, null],
  [null, "X", null, null, null, null, null, null],
  [null, null, "O", null, null, null, null, null],
  [null, null, null, "X", null, null, null, null],
  [null, null, null, null, "O", null, null, null],
  [null, null, null, null, null, "X", null, null],
  [null, null, null, null, null, null, "O", null],
  [null, null, null, null, null, null, null, "X"],
];

export const Default = Template.bind({});
Default.args = {
  size: 15,
};

export const SmallBoard = Template.bind({});
SmallBoard.args = {
  size: 8,
};

export const SampleState = Template.bind({});
SampleState.args = {
  board: sampleBoard,
  size: 8,
};
