import { fireEvent, getByText, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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
    expect(screen.getByText("2")).toHaveLength(2);

    userEvent.type(screen.getByLabelText("strike_3"), "c");
    expect(screen.getByText("2")).toHaveLength(1);
    expect(screen.getByText("1")).toHaveLength(2);
  });
  it("ball coloring chekced", () => {
    userEvent.type(screen.getByLabelText("ball-tagsinput"), "abcde");
    expect(screen.getByText("a")).toHaveStyle({ "background-color": "red" });
    expect(screen.getByText("b")).toHaveStyle({ "background-color": "red" });
    expect(screen.getByText("c")).toHaveStyle({ "background-color": "red" });
    expect(screen.getByText("d")).toHaveStyle({ "background-color": "red" });
    expect(screen.getByText("e")).toHaveStyle({ "background-color": "red" });
    expect(screen.getByText("f")).toHaveStyle({ "background-color": "" });
  });
  it("When focusing on the strike zone, the clicked keyboard enters the strike", () => {

  });
  it("When focusing on the ball zone, the clicked keyboard enters the ball", () => {});
  it("disable button what into the ball zone charaters", () => {
    userEvent.type(screen.getByLabelText("ball-tagsinput"), "abcde");
    expect(screen.getByText("abcdef")).toHaveLength(0);
    fireEvent.click(screen.getByRole("button", { name: "a" }));
    fireEvent.click(screen.getByRole("button", { name: "b" }));
    fireEvent.click(screen.getByRole("button", { name: "c" }));
    fireEvent.click(screen.getByRole("button", { name: "f" }));
    expect(screen.getByText("abcdef")).toHaveLength(1);

  });
});
