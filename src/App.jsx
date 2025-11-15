import "./App.css";

import Game from "./components/Game/Game";
import Goal from "./components/Goal/Goal";

const App = () => {
  return (
    <div className="App">
      <Goal />
      <Game />
    </div>
  );
};

export default App;
