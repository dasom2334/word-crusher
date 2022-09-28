import { fireEvent, render, screen } from "@testing-library/react";
import { AppProvider, initialState } from "../../context/context";
import { COUNT_UP_BUTTON_TEXT, COUNT_DOWN_BUTTON_TEXT } from "../../utils";
import { Count } from "../count";
import { DenyStrike } from "./DenyStrike";

describe("DenyStrike Component Test", () => {
  it("Sync With Count", () => {
    render(
      <AppProvider>
        <Count />
        <DenyStrike />
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
});
