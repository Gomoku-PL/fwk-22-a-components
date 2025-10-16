import React from "react";
import { StatusBar } from "./StatusBar.jsx";

export default {
  title: "Game/StatusBar",
  component: StatusBar,
  args: {
    boardSize: 15,
    moveCount: 12,
    lastMove: { row: 6, col: 7 },
  },
  argTypes: {
    currentPlayer: {
      control: { type: "radio" },
      options: ["B", "W"],
    },
    winner: {
      control: { type: "radio" },
      options: [null, "B", "W", "draw"],
    },
    onRestart: { action: "restart" },
  },
};

const Template = (args) => <StatusBar {...args} />;

export const TurnBlack = Template.bind({});
TurnBlack.args = {
  currentPlayer: "B",
  winner: null,
};

export const TurnWhite = Template.bind({});
TurnWhite.args = {
  currentPlayer: "W",
  winner: null,
};

export const BlackWins = Template.bind({});
BlackWins.args = {
  currentPlayer: "W", // irrelevant once winner set
  winner: "B",
  moveCount: 70,
  lastMove: { row: 10, col: 10 },
};

export const WhiteWins = Template.bind({});
WhiteWins.args = {
  currentPlayer: "B",
  winner: "W",
  moveCount: 88,
  lastMove: { row: 8, col: 11 },
};

export const Draw = Template.bind({});
Draw.args = {
  currentPlayer: "B",
  winner: "draw",
  moveCount: 225, // 15x15 full board
  lastMove: { row: 14, col: 14 },
};
