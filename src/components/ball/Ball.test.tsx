import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AppProvider } from "../../context/context";
import { Board } from "../board";
import { Ball } from "./Ball";

describe("Ball Component test", () => {
  it("the same character is not allowed", () => {
    render(
      <AppProvider>
        <Board>
          <Ball />
        </Board>
      </AppProvider>
    );
    const input = screen.getByLabelText("ball-tagsinput");
    userEvent.type(input, "abcdef");
    userEvent.type(input, "abcdefg");
    expect(screen.getAllByRole("button")).toHaveLength(7);
  });

  it("Non-alphabetic strings are not allowed.", () => {
    render(
      <AppProvider>
        <Board>
          <Ball />
        </Board>
      </AppProvider>
    );
    const input = screen.getByLabelText("ball-tagsinput");
    userEvent.type(
      input,
      "가나다라마바사아차카a타파바하1234567890~!@#$%^&*()_+-=.z"
    );
    expect(screen.getAllByRole("button")).toHaveLength(2);
  });
  it("Click the button to remove the ball", () => {
    render(
      <AppProvider>
        <Board>
          <Ball />
        </Board>
      </AppProvider>
    );
    const input = screen.getByLabelText("ball-tagsinput");
    userEvent.type(input, "abcde");

    fireEvent.click(screen.getByRole("button", { name: "remove e" }));
    expect(screen.getAllByRole("button")).toHaveLength(4);
    fireEvent.click(screen.getByRole("button", { name: "remove a" }));
    fireEvent.click(screen.getByRole("button", { name: "remove b" }));
    fireEvent.click(screen.getByRole("button", { name: "remove c" }));
    expect(screen.getAllByRole("button")).toHaveLength(1);
  });
});
