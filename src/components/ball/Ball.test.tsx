import { render, screen } from "@testing-library/react";
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
    userEvent.type(input, "abcdef");
    expect(screen.getByTestId("ball-tags")).toHaveTextContent("abcdef");
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
      "가나다라마바사아차카타파바하1234567890~!@#$%^&*()_+-=."
    );
    expect(screen.getByTestId("ball-tags")).toHaveTextContent("");
  });
});
