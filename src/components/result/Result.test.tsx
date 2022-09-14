import { render } from "@testing-library/react";
import { AppProvider } from "../../context/context";
import { Board } from "../board";
import { Count } from "../count";
import { Strike } from "../strike";
import { Keyboard } from "../keyboard";
import { Result } from "./Result";

describe("Result Component Test", () => {
  it("Sync With Strike", () => {
    render(
      <AppProvider>
        <Board>
          <Count />
          <Strike />
          <Keyboard />
        </Board>
      </AppProvider>
    );
  });
});
