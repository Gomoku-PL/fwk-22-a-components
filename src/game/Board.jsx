import React, { useState } from "react";
import "../ui/Board/BoardWrapper.css"; // Ensure styles are applied

export default function Board({ board: boardProp, size = 15 }) {
  // If a board prop is provided, use it; otherwise, use internal state for interactivity
  const [internalBoard, setInternalBoard] = useState(
    Array.from({ length: size }, () => Array(size).fill(null)),
  );
  const board = boardProp || internalBoard;

  async function handleBoardClick(rowIndex, colIndex) {
    if (boardProp) return; // Don't allow clicks if using external board
    setInternalBoard((prevBoard) => {
      const newBoard = prevBoard.map((row) => [...row]);
      newBoard[rowIndex][colIndex] = "X";
      return newBoard;
    });
  }

  return (
    <div>
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="board-row">
          {row.map((cell, colIndex) => (
            <div
              key={colIndex}
              className="board-cell"
              onClick={() => handleBoardClick(rowIndex, colIndex)}
            >
              {cell}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
