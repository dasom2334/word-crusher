import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AppProvider, initialState } from "../../context/context";
import { Board } from "../board";
import { Count } from "../count";
import { Strike } from "./Strike";

describe("Strike Component Test", () => {
  it("Sync With Count", () => {
    render(
      <AppProvider>
        <Board>
          <Count />
          <Strike />
        </Board>
      </AppProvider>
    );
    const downButton = screen.getByText("➖");
    const upButton = screen.getByText("➕");
    fireEvent.click(upButton);
    fireEvent.click(downButton);
    fireEvent.click(upButton);
    fireEvent.click(upButton);
    fireEvent.click(upButton);
    expect(screen.getAllByRole("textbox").length).toBe(initialState.count + 3);
    fireEvent.click(downButton);
    fireEvent.click(downButton);
    expect(screen.getAllByRole("textbox").length).toBe(initialState.count + 1);
    fireEvent.click(downButton);
    fireEvent.click(downButton);
    expect(screen.getAllByRole("textbox").length).toBe(initialState.count - 1);
  });

  it("One strike input is only English of length 1 allowed", () => {
    render(
      <AppProvider>
        <Board>
          <Strike />
        </Board>
      </AppProvider>
    );
    const input = screen.getByLabelText("strike_0");
    userEvent.type(input, "hellohello");
    expect(input).toHaveValue("h");
    userEvent.type(input, "{backspace}fffff");
    expect(input).toHaveValue("f");
    userEvent.type(input, "{backspace}헬로헬로");
    expect(input).toHaveValue("");
  });
  it("Remove value from strike input when focusing", () => {
    render(
      <AppProvider>
        <Board>
          <Strike />
        </Board>
      </AppProvider>
    );
    const input = screen.getByLabelText("strike_0");
    userEvent.type(input, "h");
    expect(input).toHaveValue("h");
    fireEvent.focus(input);
    expect(input).toHaveValue("");
  });
});
