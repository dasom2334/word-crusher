import { fireEvent, render, screen } from "@testing-library/react";
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


});
