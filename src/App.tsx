import "./App.scss";
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
          <Count />
          <Strike />
          <DenyStrike />
          <Ball />
          <DenyBall />
          <Keyboard />
          <div className="btn-wrap">
            <Clear />
            <Result />
          </div>
        </Board>
      </AppProvider>
    </div>
  );
}

export default App;
