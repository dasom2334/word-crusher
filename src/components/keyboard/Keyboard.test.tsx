import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AppProvider } from "../../context/context";
import { Ball } from "../ball";
import { Count } from "../count";
import { Strike } from "../strike";
import { Keyboard } from "./Keyboard";

describe("Keyboard Component Test", () => {
  it("strike numbering chekced", () => {
    render(
      <AppProvider>
        <Count />
        <Strike />
        <Keyboard />
      </AppProvider>
    );

    screen
      .getAllByRole("textbox", { name: /^strike-[0-1]/gi })
      .forEach((e) => userEvent.type(e, "a"));
    screen
      .getAllByRole("textbox", { name: /^strike-[2-3]/gi })
      .forEach((e) => userEvent.type(e, "b"));
    expect(screen.getAllByText("2")).toHaveLength(2);

    userEvent.type(
      screen.getByRole("textbox", { name: "strike-3" }),
      "{backspace}c"
    );
    expect(screen.getAllByText("2")).toHaveLength(1);
    expect(screen.getAllByText("1")).toHaveLength(2);
  });
  it("ball coloring chekced", () => {
    render(
      <AppProvider>
        <Count />
        <Ball />
        <Keyboard />
      </AppProvider>
    );
    userEvent.type(
      screen.getByRole("textbox", { name: "ball-tagsinput" }),
      "abcde"
    );
    screen
      .getAllByRole("button", { name: /^[A-E]$/gi })
      .forEach((e) => expect(e).toHaveClass("isBalled"));
    screen
      .getAllByRole("button", { name: /^[F-Z]$/gi })
      .forEach((e) => expect(e).not.toHaveClass("isBalled"));
  });
  it("When focusing on the strike zone, the clicked keyboard enters the strike", () => {
    render(
      <AppProvider>
        <Count />
        <Strike />
        <Keyboard />
      </AppProvider>
    );
    fireEvent.focus(screen.getByRole("textbox", { name: "strike-0" }));
    fireEvent.click(screen.getByRole("button", { name: "A" }));
    expect(screen.getByRole("textbox", { name: "strike-0" })).toHaveFocus();
    expect(screen.getByRole("textbox", { name: "strike-0" })).toHaveValue("A");
  });
  it("When focusing on the ball zone, the clicked keyboard enters the ball", () => {
    render(
      <AppProvider>
        <Count />
        <Ball />
        <Keyboard />
      </AppProvider>
    );
    fireEvent.focus(screen.getByRole("textbox", { name: "ball-tagsinput" }));
    fireEvent.click(screen.getByRole("button", { name: "A" }));
    expect(
      screen.getByRole("textbox", { name: "ball-tagsinput" })
    ).toHaveFocus();
    expect(
      screen.getAllByRole("button", { name: "remove ball A" })
    ).toHaveLength(1);
  });
  it("disable button what into the ball zone charaters", () => {
    render(
      <AppProvider>
        <Count />
        <Ball />
        <Keyboard />
      </AppProvider>
    );
    userEvent.type(
      screen.getByRole("textbox", { name: "ball-tagsinput" }),
      "abcde"
    );
    expect(screen.getAllByRole("button", { name: /remove/gi })).toHaveLength(5);
    screen
      .getAllByRole("button", { name: /[a-f]/gi })
      .forEach((e) => fireEvent.click(e));
    expect(screen.getAllByRole("button", { name: /remove/gi })).toHaveLength(6);
  });
});
