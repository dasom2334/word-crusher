import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AppProvider } from "../../context/context";
import { Ball } from "../ball";
import { Board } from "../board";
import { Count } from "../count";
import { Strike } from "../strike";
import { Keyboard } from "./Keyboard";

describe("Keyboard Component Test", () => {
  it("strike numbering chekced", () => {
    render(
      <AppProvider>
        <Board>
          <Count />
          <Strike />
          <Keyboard />
        </Board>
      </AppProvider>
    );

    userEvent.type(screen.getByLabelText("strike_0"), "a");
    userEvent.type(screen.getByLabelText("strike_1"), "a");
    userEvent.type(screen.getByLabelText("strike_2"), "b");
    userEvent.type(screen.getByLabelText("strike_3"), "b");
    expect(screen.getAllByText("2")).toHaveLength(2);

    userEvent.type(screen.getByLabelText("strike_3"), "{backspace}c");
    expect(screen.getAllByText("2")).toHaveLength(1);
    expect(screen.getAllByText("1")).toHaveLength(2);
  });
  it("ball coloring chekced", () => {
    render(
      <AppProvider>
        <Board>
          <Count />
          <Ball />
          <Keyboard />
        </Board>
      </AppProvider>
    );
    userEvent.type(
      screen.getByRole("textbox", { name: "ball-tagsinput" }),
      "abcde"
    );
    screen
      .getAllByRole("button", { name: /^[a-e]$/ })
      .forEach((e) => expect(e).toHaveClass("isBalled"));
    expect(screen.getByRole("button", { name: "f" })).not.toHaveClass(
      "isBalled"
    );
  });
  it("When focusing on the strike zone, the clicked keyboard enters the strike", () => {
    render(
      <AppProvider>
        <Board>
          <Count />
          <Strike />
          <Keyboard />
        </Board>
      </AppProvider>
    );
    fireEvent.focus(screen.getByLabelText("strike_0"));
    fireEvent.click(screen.getByRole("button", { name: "a" }));
    expect(screen.getByLabelText("strike_0")).toHaveFocus();
    expect(screen.getByLabelText("strike_0")).toHaveValue("a");
  });
  it("When focusing on the ball zone, the clicked keyboard enters the ball", () => {
    render(
      <AppProvider>
        <Board>
          <Count />
          <Ball />
          <Keyboard />
        </Board>
      </AppProvider>
    );
    fireEvent.focus(screen.getByRole("textbox", { name: "ball-tagsinput" }));
    fireEvent.click(screen.getByRole("button", { name: "a" }));
    expect(
      screen.getByRole("textbox", { name: "ball-tagsinput" })
    ).toHaveFocus();
    expect(screen.getAllByRole("button", { name: "remove a" })).toHaveLength(1);
  });
  it("disable button what into the ball zone charaters", () => {
    render(
      <AppProvider>
        <Board>
          <Count />
          <Ball />
          <Keyboard />
        </Board>
      </AppProvider>
    );
    userEvent.type(
      screen.getByRole("textbox", { name: "ball-tagsinput" }),
      "abcde"
    );
    expect(screen.getAllByRole("button", { name: /remove/ })).toHaveLength(5);
    fireEvent.click(screen.getByRole("button", { name: "a" }));
    fireEvent.click(screen.getByRole("button", { name: "b" }));
    fireEvent.click(screen.getByRole("button", { name: "c" }));
    fireEvent.click(screen.getByRole("button", { name: "f" }));
    expect(screen.getAllByRole("button", { name: /remove/ })).toHaveLength(6);
  });
});
