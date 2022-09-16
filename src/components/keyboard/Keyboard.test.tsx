import { fireEvent, render, screen } from "@testing-library/react";
import { AppProvider } from "../../context/context";
import { Board } from "../board";
import { Count } from "../count";
import { Strike } from "../strike";
import { Keyboard } from "./Keyboard";

describe("Keyboard Component Test", () => {
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
  it("nope.", () => {
    render(
      <AppProvider>
        <Board>
          <Count />
          <Strike />
          <Keyboard />
        </Board>
      </AppProvider>
    );

    // const button = screen.getByRole("button", { name: "e" });

    // expect(button).toBeEnabled();

    // fireEvent.focus(screen.getByLabelText("strike_0"));
    // expect(button).toBeDisabled();

    // fireEvent.focus(screen.getByRole("title"));
    // expect(button).toBeEnabled();

    // fireEvent.focus(screen.getByLabelText("ball-tagsinput"));
    // expect(button).toBeDisabled();
  });
  it("strike numbering chekced", () => {});
  it("ball coloring chekced", () => {});
  it("when focused strike zone, tiyping is into strike", () => {});
  it("when focused ball zone, tiyping is into ball", () => {});
  it("disable button what into the ball zone charaters", () => {});
});
