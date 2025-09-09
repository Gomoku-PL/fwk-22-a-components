import Cell from "./Cell";

export default {
  title: "Game/Cell",
  component: Cell,
};

export const Empty = {
  args: { state: "empty" },
};

export const Player1 = {
  args: { state: "player1" },
};

export const Player2 = {
  args: { state: "player2" },
};
