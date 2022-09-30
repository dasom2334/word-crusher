import { fireEvent, render, screen } from "@testing-library/react";
import { AppProvider, initialState } from "../../context/context";
import {
  COUNT_DOWN_BUTTON_TEXT,
  COUNT_MAX,
  COUNT_MIN,
  COUNT_UP_BUTTON_TEXT
} from "../../utils";
import { Count } from "./index";
const rendering = () =>
  render(
    <AppProvider>
      <Count />
    </AppProvider>
  );
describe("Count Component Test", () => {
  it("Count initialize check", () => {
    rendering();
    expect(screen.getByRole("contentinfo")).toHaveTextContent(
      initialState.count.toString()
    );
  });
  it("Count plus button check", () => {
    rendering();
    const upButton = screen.getByText(COUNT_UP_BUTTON_TEXT);
    fireEvent.click(upButton);
    expect(screen.getByRole("contentinfo")).toHaveTextContent(
      (initialState.count + 1).toString()
    );
  });
  it("Count minus button check", () => {
    rendering();
    const downButton = screen.getByText(COUNT_DOWN_BUTTON_TEXT);
    fireEvent.click(downButton);
    expect(screen.getByRole("contentinfo")).toHaveTextContent(
      (initialState.count - 1).toString()
    );
  });
  it("Count number functional check", () => {
    rendering();
    const downButton = screen.getByText(COUNT_DOWN_BUTTON_TEXT);
    const upButton = screen.getByText(COUNT_UP_BUTTON_TEXT);
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
    rendering();
    const downButton = screen.getByText(COUNT_DOWN_BUTTON_TEXT);
    for (let i = 0; i < initialState.count + 5; i++)
      fireEvent.click(downButton);
    expect(screen.getByRole("contentinfo")).toHaveTextContent(
      COUNT_MIN.toString()
    );
  });
  it("Keep the maximum number", () => {
    rendering();
    const upButton = screen.getByText(COUNT_UP_BUTTON_TEXT);
    for (let i = 0; i < COUNT_MAX + 5; i++) fireEvent.click(upButton);
    expect(screen.getByRole("contentinfo")).toHaveTextContent(
      COUNT_MAX.toString()
    );
  });
});
