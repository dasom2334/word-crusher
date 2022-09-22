import "./App.css";
import { Ball } from "./components/ball";
import { Board } from "./components/board";
import { Count } from "./components/count";
import { Keyboard } from "./components/keyboard";
import { Result } from "./components/result";
import { Strike } from "./components/strike";
import { AppProvider } from "./context/context";

function App() {
  return (
    <div className="App">
      <AppProvider>
        <Board>
          <Count />
          <Strike />
          <Ball />
          <Keyboard />
          <Result />
        </Board>
      </AppProvider>
    </div>
  );
}

export default App;
