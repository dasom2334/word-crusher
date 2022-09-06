import { render } from "@testing-library/react";
import { AppProvider } from "../../context/context";
import { Board } from "../board";
import { Count } from "../count";
import { Strike } from "../strike";
import { Keyboard } from "./Keyboard";

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
  it("visible when focused writabled, unvisible when not focused ", () => {});
  it("strike numbering chekced", () => {});
  it("ball coloring chekced", () => {});
  it("when focused strike zone, tiyping is into strike", () => {});
  it("when focused ball zone, tiyping is into ball", () => {});
  it("disable button what into the ball zone charaters", () => {});
});
