import React from "react";

export default function Cell({ state = "empty" }) {
  let content = "";

  if (state === "player1") content = "●"; // svart cirkel
  if (state === "player2") content = "○"; // vit cirkel

  return (
    <div>
      {content}
    </div>
  );
}
