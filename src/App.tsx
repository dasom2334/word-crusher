import { Board } from "./components/board";
import { Header } from "./components/header";
import { AppProvider } from "./context/context";

function App() {
  return (
    <div className="App">
      <Header title="Word Crusher" />
      <AppProvider>
        <Board />
      </AppProvider>
    </div>
  );
}

export default App;
