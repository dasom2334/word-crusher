import { fireEvent, getAllByText, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AppProvider } from "../../context/context";
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
    userEvent.type(screen.getByLabelText("ball-tagsinput"), "abcde");
    expect(screen.getAllByText("a")).toHaveStyle({ "background-color": "red" });
    expect(screen.getAllByText("b")).toHaveStyle({ "background-color": "red" });
    expect(screen.getAllByText("c")).toHaveStyle({ "background-color": "red" });
    expect(screen.getAllByText("d")).toHaveStyle({ "background-color": "red" });
    expect(screen.getAllByText("e")).toHaveStyle({ "background-color": "red" });
    expect(screen.getAllByText("f")).toHaveStyle({ "background-color": "" });
  });
  it("When focusing on the strike zone, the clicked keyboard enters the strike", () => {

  });
  it("When focusing on the ball zone, the clicked keyboard enters the ball", () => {});
  it("disable button what into the ball zone charaters", () => {
    userEvent.type(screen.getByLabelText("ball-tagsinput"), "abcde");
    expect(screen.getAllByText("abcdef")).toHaveLength(0);
    fireEvent.click(screen.getByRole("button", { name: "a" }));
    fireEvent.click(screen.getByRole("button", { name: "b" }));
    fireEvent.click(screen.getByRole("button", { name: "c" }));
    fireEvent.click(screen.getByRole("button", { name: "f" }));
    expect(screen.getAllByText("abcdef")).toHaveLength(1);

  });
});
