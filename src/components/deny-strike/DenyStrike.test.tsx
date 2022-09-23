import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AppProvider, initialState } from "../../context/context";
import { Board } from "../board";
import { Count } from "../count";
import { DenyStrike } from "./DenyStrike";

describe("DenyStrike Component Test", () => {
  it("Sync With Count", () => {
    render(
      <AppProvider>
        <Board>
          <Count />
          <DenyStrike />
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
          <DenyStrike />
        </Board>
      </AppProvider>
    );
    const input = screen.getByLabelText("strike_0");
    userEvent.type(input, "hellohello");
    expect(input).toHaveValue("h");
    userEvent.type(input, "{backspace}fffff");
    expect(input).toHaveValue("f");
    userEvent.type(input, "{backspace}헬로헬로57688)(**^*&%");
    expect(input).toHaveValue("");
    userEvent.type(input, "{backspace}헬로헬로57688)(**^*&%sdf");
    expect(input).toHaveValue("s");
  });
  it("Remove value from strike input when focusing", () => {
    render(
      <AppProvider>
        <Board>
          <DenyStrike />
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
