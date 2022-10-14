import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AppProvider, initialState } from "../../context/context";
import { COUNT_UP_BUTTON_TEXT, COUNT_DOWN_BUTTON_TEXT } from "../../utils";
import { Count } from "../count";
import { Strike } from "../strike";
import { DenyStrike } from "./DenyStrike";
const rendering = () =>
  render(
    <AppProvider>
      <Count />
      <Strike />
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
    expect(screen.getAllByRole("textbox", {name:/^deny-strike/i})).toHaveLength(initialState.count + 3);
    fireEvent.click(downButton);
    fireEvent.click(downButton);
    expect(screen.getAllByRole("textbox", {name:/^deny-strike/i})).toHaveLength(initialState.count + 1);
    fireEvent.click(downButton);
    fireEvent.click(downButton);
    expect(screen.getAllByRole("textbox", {name:/^deny-strike/i})).toHaveLength(initialState.count - 1);
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
    expect(input).toHaveClass("shaking");
    expect(input).toHaveValue("ABCD");
  });
  
  it("Non-alphabetic strings are not allowed.", () => {
    rendering();
    const input = screen.getByLabelText("deny-strike-0");
    userEvent.type(
      input,
      "가나다라마바사아차카a타파바하1234567890~!@#$%^&*()_+-=.z"
    );
    expect(input).toHaveClass("shaking");
    expect(input).toHaveValue("AZ");
  });
  it("The strike zone cannot contain the letter of the deny strike zone in the same position.", () => {
    rendering();
    userEvent.type(screen.getByLabelText("strike-0"), "e");
    userEvent.type(screen.getByLabelText("deny-strike-0"), "e");
    expect(screen.getByLabelText("deny-strike-0")).not.toHaveValue("E");
  });
});
