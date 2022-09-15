import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { Count } from "./index";
import { COUNT_MAX, COUNT_MIN } from "../../utils";
import { AppProvider, initialState } from "../../context/context";
import { Ball } from "../ball";
import { Strike } from "../strike";

describe("Count Component Test", () => {
  it("Count initialize check", () => {
    render(
      <AppProvider>
        <Count />
      </AppProvider>
    );
    expect(screen.getByRole("contentinfo")).toHaveTextContent(
      initialState.count.toString()
    );

  });
  it("Count plus button check", () => {
    render(
      <AppProvider>
        <Count />
      </AppProvider>
    );
    const upButton = screen.getByText("➕");
    fireEvent.click(upButton);
    expect(screen.getByRole("contentinfo")).toHaveTextContent(
      (initialState.count + 1).toString()
    );
  });
  it("Count minus button check", () => {
    render(
      <AppProvider>
        <Count />
      </AppProvider>
    );
    const downButton = screen.getByText("➖");
    fireEvent.click(downButton);
    expect(screen.getByRole("contentinfo")).toHaveTextContent(
      (initialState.count - 1).toString()
    );
  });
  it("Count number functional check", () => {
    render(
      <AppProvider>
        <Count />
      </AppProvider>
    );
    const downButton = screen.getByText("➖");
    const upButton = screen.getByText("➕");
    fireEvent.click(upButton);
    fireEvent.click(downButton);
    fireEvent.click(upButton);
    fireEvent.click(upButton);
    fireEvent.click(upButton);
    expect(screen.getByRole("contentinfo")).toHaveTextContent(
      (initialState.count + 3).toString()
    );
    fireEvent.click(downButton);
    fireEvent.click(downButton);
    expect(screen.getByRole("contentinfo")).toHaveTextContent(
      (initialState.count + 1).toString()
    );
    fireEvent.click(downButton);
    fireEvent.click(downButton);
    expect(screen.getByRole("contentinfo")).toHaveTextContent(
      (initialState.count - 1).toString()
    );
  });
  it("Keep the minimum number", () => {
    render(
      <AppProvider>
        <Count />
      </AppProvider>
    );
    const downButton = screen.getByText("➖");
    for (let i = 0; i < initialState.count + 5; i++)
      fireEvent.click(downButton);
    expect(screen.getByRole("contentinfo")).toHaveTextContent(
      COUNT_MIN.toString()
    );
  });
  it("Keep the maximum number", () => {
    render(
      <AppProvider>
        <Count />
      </AppProvider>
    );
    const upButton = screen.getByText("➕");
    for (let i = 0; i < COUNT_MAX + 5; i++) fireEvent.click(upButton);
    expect(screen.getByRole("contentinfo")).toHaveTextContent(
      COUNT_MAX.toString()
    );
  });
  it("Keep the minimum required", () => {
    render(
      <AppProvider>
        <Count />
        <Strike />
        <Ball />
      </AppProvider>
    );
    
    // const input = screen.getByLabelText("strike_0");
    // userEvent.type(input, "h");
    // expect(input).toHaveValue("h");
    // fireEvent.focus(input);


    // const downButton = screen.getByText("➖");
    // for (let i = 0; i < COUNT_MAX + 5; i++) fireEvent.click(upButton);
    // expect(screen.getByRole("contentinfo")).toHaveTextContent(
    //   COUNT_MAX.toString()
    // );
  });
});