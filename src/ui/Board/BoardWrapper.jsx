import React from "react";
import "./BoardWrapper.css";

/**
 * Props:
 * - board: 2D array of null | 'B' | 'W'
 * - disabled?: boolean  (e.g., game over)
 * - onCellClick?: ({ row, col }) => void
 * - className?: string
 */
export default function BoardWrapper({
  board,
  disabled = false,
  onCellClick,
  className = "",
}) {
  const size = board?.length ?? 15;

  return (
    <div className={`board-wrap ${className}`}>
      <div className={`board ${disabled ? "board-disabled" : ""}`}>
        <div className="grid"></div>

        {/* Top coordinates (A..O based on size) */}
        <div className="coords top">
          {"ABCDEFGHIJKLMNO"
            .slice(0, size)
            .split("")
            .map((ch) => (
              <span key={ch}>{ch}</span>
            ))}
        </div>

        {/* Left coordinates (1..size) */}
        <div className="coords left">
          {Array.from({ length: size }, (_, i) => (
            <span key={i}>{i + 1}</span>
          ))}
        </div>

        {/* Clickable overlay */}
        <div className="overlay">
          {board.map((row, r) =>
            row.map((cell, c) => (
              <div
                key={`${r}-${c}`}
                className={`cell ${disabled ? "cell-disabled" : ""}`}
                style={{ gridColumn: c + 1, gridRow: r + 1 }}
                onClick={() => !disabled && onCellClick?.({ row: r, col: c })}
              >
                {cell && (
                  <div
                    className={`stone ${cell === "B" ? "black" : "white"}`}
                  />
                )}
              </div>
            )),
          )}
        </div>
      </div>
    </div>
  );
}
