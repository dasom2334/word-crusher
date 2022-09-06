import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { Count } from "./index";
import { COUNT_MAX, COUNT_MIN } from "../../utils";
import { AppProvider, initialState } from "../../context/context";

describe("Count Component Test", () => {
  it("count initialize check", () => {
    render(
      <AppProvider>
        <Count />
      </AppProvider>
    );
    expect(screen.getByRole("contentinfo")).toHaveTextContent(
      initialState.count.toString()
    );

  });
  it("count up button check", () => {
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
  it("count down button check", () => {
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
  it("count number functional check", () => {
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
  it("count number check minimum value", () => {
    render(
      <AppProvider>
        <Count />
      </AppProvider>
    );
    const downButton = screen.getByText("➖");
    for (let i = 0; i < initialState.count + 100; i++)
      fireEvent.click(downButton);
    expect(screen.getByRole("contentinfo")).toHaveTextContent(
      COUNT_MIN.toString()
    );
  });
  it("count number check maximum value", () => {
    render(
      <AppProvider>
        <Count />
      </AppProvider>
    );
    const upButton = screen.getByText("➕");
    for (let i = 0; i < COUNT_MAX + 100; i++) fireEvent.click(upButton);
    expect(screen.getByRole("contentinfo")).toHaveTextContent(
      COUNT_MAX.toString()
    );
  });
});