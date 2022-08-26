import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { Strike } from "./Strike";
import { Count } from "../count";
import { AppProvider, initialState } from "../../context/context";

describe("Strike Component Test", () => {
  it("Sync With Count", () => {
    render(
      <AppProvider>
        <Count />
        <Strike />
      </AppProvider>
    );

    const downButton = screen.getByText("➖");
    const upButton = screen.getByText("➕");
    fireEvent.click(upButton);
    fireEvent.click(downButton);
    fireEvent.click(upButton);
    fireEvent.click(upButton);
    fireEvent.click(upButton);
    expect(screen.getAllByLabelText(/^strike_/)).toHaveLength(
      initialState.count + 3
    );
    fireEvent.click(downButton);
    fireEvent.click(downButton);
    expect(screen.getAllByLabelText(/^strike_/)).toHaveLength(
      initialState.count + 1
    );
    fireEvent.click(downButton);
    fireEvent.click(downButton);
    expect(screen.getAllByLabelText(/^strike_/)).toHaveLength(
      initialState.count - 1
    );
  });
});
