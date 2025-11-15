import "./Control.css";

const Control = ({ handleReset, handleUndo, stepNumber }) => {
  return (
    <div className="game-controls">
      <button onClick={handleReset}>New Game</button>
      <button onClick={handleUndo} disabled={stepNumber === 0}>
        Undo
      </button>
    </div>
  );
};

export default Control;
