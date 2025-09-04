import React, { useState } from "react";

function Board() {
  const [board, setBoard] = useState(Array(15).fill(Array(15).fill(null)));

  async function handleBoardClick(rowIndex, colIndex) {
    setBoard((prevBoard) => {
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

export default Board;
