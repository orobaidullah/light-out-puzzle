import { useState } from "react";
import Grid from "../Grid/Grid";
import "./Game.css";

function Game() {
  const [stepNumber, setStepNumber] = useState(0);
  const currentLights = history[stepNumber];

  function handleLightClick(index) {
    if (hasWon) return; // ignore clicks after winning

    const nextBoard = toggleLights(currentLights, index);
    const nextHistory = history.slice(0, stepNumber + 1).concat([nextBoard]); // immutable history update

    setHistory(nextHistory);
    setStepNumber(nextHistory.length - 1);
  }
  const status = hasWon ? "You Win! 🎉" : `Moves: ${moves}`;
  return (
    <div className="game">
      <h1 className="game__title">Lights Out</h1>

      <Grid lights={currentLights} onLightClick={handleLightClick} />
      <div className="game__meta">
        <p>Board size: 5</p>
        <p>Move history length: 0</p>
      </div>
    </div>
  );
}

export default Game;
