import { render } from "@testing-library/react";
import { AppProvider } from "../../context/context";
import { Count } from "../count";
import { Keyboard } from "../keyboard";
import { Strike } from "../strike";
import { Board } from "./Board";

describe("Strike Keyboard Test", () => {
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
