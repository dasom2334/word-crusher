import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AppProvider, initialState } from "../../context/context";
import { COUNT_UP_BUTTON_TEXT, COUNT_DOWN_BUTTON_TEXT } from "../../utils";
import { Count } from "../count";
import { Strike } from "./Strike";

describe("Strike Component Test", () => {
  it("Sync With Count", () => {
    render(
      <AppProvider>
        <Count />
        <Strike />
      </AppProvider>
    );
    const downButton = screen.getByText(COUNT_DOWN_BUTTON_TEXT);
    const upButton = screen.getByText(COUNT_UP_BUTTON_TEXT);
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
        <Strike />
      </AppProvider>
    );
    const input = screen.getByLabelText("strike-0");
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
        <Strike />
      </AppProvider>
    );
    const input = screen.getByLabelText("strike-0");
    userEvent.type(input, "h");
    expect(input).toHaveValue("h");
    fireEvent.focus(input);
    expect(input).toHaveValue("");
  });
});
