import "./Grid.css";
import Light from "../Light/Light";

const Grid = ({ lights, onLightClick }) => {
  return (
    <div className="grid">
      {lights.map((isLit, index) => (
        <Light key={index} isLit={isLit} onClick={() => onLightClick(index)} />
      ))}
    </div>
  );
};

export default Grid;
