import Grid from "../Grid/Grid";
import "./Game.css";

function Game() {
  return (
    <div className="game">
      <h1 className="game__title">Lights Out</h1>

      <div className="game__meta">
        <p>Board size: 5</p>
        <p>Move history length: 0</p>
      </div>
    </div>
  );
}

export default Game;
