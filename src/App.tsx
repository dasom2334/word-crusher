import "./App.css";
import { Ball } from "./components/ball";
import { Board } from "./components/board";
import { Clear } from "./components/clear";
import { Count } from "./components/count";
import { DenyBall } from "./components/deny-ball";
import { DenyStrike } from "./components/deny-strike";
import { Keyboard } from "./components/keyboard";
import { Result } from "./components/result";
import { Strike } from "./components/strike";
import { AppProvider } from "./context/context";

function App() {
  return (
    <div className="App">
      <AppProvider>
        <Board>
          <Clear />
          <Count />
          <Strike />
          <DenyStrike />
          <Ball />
          <DenyBall />
          <Keyboard />
          <Result />
        </Board>
      </AppProvider>
    </div>
  );
}

export default App;
