import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AppProvider, initialState } from "../../context/context";
import { COUNT_UP_BUTTON_TEXT, COUNT_DOWN_BUTTON_TEXT } from "../../utils";
import { Count } from "../count";
import { DenyStrike } from "./DenyStrike";
const rendering = () =>
  render(
    <AppProvider>
      <Count />
      <DenyStrike />
    </AppProvider>
  );
describe("DenyStrike Component Test", () => {
  it("Sync With Count", () => {
    rendering();
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
  it("Only uppercase letters are allowed for strike input.", () => {
    rendering();
    const input = screen.getByLabelText("deny-strike-0");
    userEvent.type(input, "h");
    expect(input).toHaveValue("H");
    userEvent.type(input, "f");
    expect(input).toHaveValue("HF");
    userEvent.type(input, "s");
    expect(input).toHaveValue("HFS");
  });
  it("Identical characters are not allowed in strike input", () => {
    rendering();
    const input = screen.getByLabelText("deny-strike-0");
    userEvent.type(input, "ABCDABCD");
    expect(input).toHaveValue("ABCD");
  });
});
