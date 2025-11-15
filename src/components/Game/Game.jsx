import { useState } from "react";
import "./Game.css";
import Grid from "../Grid/Grid";
import Control from "../Control/Control";

const GRID_SIZE = 5;

// Toggle the clicked light and its non-diagonal neighbours.
function toggleLights(lights, index) {
  const next = [...lights];
  const row = Math.floor(index / GRID_SIZE);
  const col = index % GRID_SIZE;

  function toggleAt(r, c) {
    if (r < 0 || r >= GRID_SIZE || c < 0 || c >= GRID_SIZE) return;
    const i = r * GRID_SIZE + c;
    next[i] = !next[i];
  }

  toggleAt(row, col);
  toggleAt(row - 1, col); // up
  toggleAt(row + 1, col); // down
  toggleAt(row, col - 1); // left
  toggleAt(row, col + 1); // right

  return next;
}

function createEmptyBoard() {
  return Array(GRID_SIZE * GRID_SIZE).fill(false);
}

// Start from an "all off" board and apply random valid moves so the puzzle is solvable.
function createRandomBoard(steps = 10) {
  let board = createEmptyBoard();
  for (let i = 0; i < steps; i += 1) {
    const randomIndex = Math.floor(Math.random() * board.length);
    board = toggleLights(board, randomIndex);
  }
  return board;
}

function checkWin(lights) {
  return lights.every((isLit) => !isLit);
}

function Game() {
  // history: array of boards (each board is an array of booleans)
  const [history, setHistory] = useState(() => {
    const firstBoard = createRandomBoard();
    return [firstBoard];
  });
  const [stepNumber, setStepNumber] = useState(0);

  const currentLights = history[stepNumber];
  const moves = stepNumber;
  const hasWon = checkWin(currentLights);

  function handleLightClick(index) {
    if (hasWon) return; // ignore clicks after winning

    const nextBoard = toggleLights(currentLights, index);
    const nextHistory = history.slice(0, stepNumber + 1).concat([nextBoard]); // immutable history update

    setHistory(nextHistory);
    setStepNumber(nextHistory.length - 1);
  }

  function handleReset() {
    const freshBoard = createRandomBoard();
    setHistory([freshBoard]);
    setStepNumber(0);
  }

  function handleUndo() {
    if (stepNumber === 0) return;
    setStepNumber(stepNumber - 1);
  }

  //   const status = hasWon ? "You Win!" : `Moves: ${moves}`;

  return (
    <div className="game">
      <h1 className="game-title">Lights Out</h1>
      <div className="game__status">{status}</div>
      <Grid lights={currentLights} onLightClick={handleLightClick} />
      <Control
        handleReset={handleReset}
        handleUndo={handleUndo}
        stepNumber={stepNumber}
      />
      <div className="game-meta">
        <p>
          Board size: {GRID_SIZE} × {GRID_SIZE}
        </p>
        <p>Move history length: {history.length}</p>
      </div>
    </div>
  );
}

export default Game;
