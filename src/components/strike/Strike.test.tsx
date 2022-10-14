import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AppProvider, initialState } from "../../context/context";
import { COUNT_UP_BUTTON_TEXT, COUNT_DOWN_BUTTON_TEXT } from "../../utils";
import { Count } from "../count";
import { DenyStrike } from "../deny-strike";
import { Strike } from "./Strike";

const rendering = () =>
  render(
    <AppProvider>
      <Count />
      <Strike />
      <DenyStrike />
    </AppProvider>
  );
describe("Strike Component Test", () => {
  it("Sync With Count", () => {
    rendering();
    const downButton = screen.getByText(COUNT_DOWN_BUTTON_TEXT);
    const upButton = screen.getByText(COUNT_UP_BUTTON_TEXT);
    fireEvent.click(upButton);
    fireEvent.click(downButton);
    fireEvent.click(upButton);
    fireEvent.click(upButton);
    fireEvent.click(upButton);
    expect(screen.getAllByRole("textbox", {name:/^strike/i})).toHaveLength(initialState.count + 3);
    fireEvent.click(downButton);
    fireEvent.click(downButton);
    expect(screen.getAllByRole("textbox", {name:/^strike/i})).toHaveLength(initialState.count + 1);
    fireEvent.click(downButton);
    fireEvent.click(downButton);
    expect(screen.getAllByRole("textbox", {name:/^strike/i})).toHaveLength(initialState.count - 1);
  });

  it("Only uppercase letters are allowed for strike input.", () => {
    rendering();
    const input = screen.getByLabelText("strike-0");
    userEvent.type(input, "h");
    expect(input).toHaveValue("H");
    userEvent.type(input, "{backspace}f");
    expect(input).toHaveValue("F");
    userEvent.type(input, "{backspace}s");
    expect(input).toHaveValue("S");
  });
  it("Only one English length is allowed for strike input.", () => {
    rendering();
    const input = screen.getByLabelText("strike-0");
    userEvent.type(input, "hellohello");
    expect(input).toHaveClass("shaking");
    expect(input).toHaveValue("H");
    userEvent.type(input, "{backspace}FFFF");
    expect(input).toHaveValue("F");
    userEvent.type(input, "{backspace}헬로헬로57688)(**^*&%");
    expect(input).toHaveValue("");
    userEvent.type(input, "{backspace}헬로헬로57688)(**^*&%sDF");
    expect(input).toHaveValue("S");
    expect(input).toHaveClass("shaking");
  });
  it("Non-alphabetic strings are not allowed.", () => {
    rendering();
    const input = screen.getByLabelText("strike-0");
    userEvent.type(
      input,
      "가나다라마바사아차카a타파바하1234567890~!@#$%^&*()_+-=."
    );
    expect(input).toHaveClass("shaking");
    expect(input).toHaveValue("A");
  });
  it("The strike zone cannot contain the letter of the deny strike zone in the same position.", () => {
    rendering();
    userEvent.type(screen.getByLabelText("deny-strike-0"), "e");
    userEvent.type(screen.getByLabelText("strike-0"), "e");
    expect(screen.getByLabelText("strike-0")).not.toHaveValue("E");
  });
});
