import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AppProvider } from "../../context/context";
import { Ball } from "./Ball";

describe("Ball Component test", () => {
  it("Only capital letters are allowed on the ball.", () => {
    render(
      <AppProvider>
        <Ball />
      </AppProvider>
    );
    const input = screen.getByRole("textbox", { name: "ball-tagsinput" });
    const typing = "abcdef";
    userEvent.type(input, typing);
    typing
      .toUpperCase()
      .split("")
      .forEach((e) => {
        expect(
          screen.getByRole("button", { name: `remove ball ${e}` })
        ).toHaveAttribute("data-charater", e);
      });
  });
  it("the same character is not allowed", () => {
    render(
      <AppProvider>
        <Ball />
      </AppProvider>
    );
    const input = screen.getByRole("textbox", { name: "ball-tagsinput" });
    userEvent.type(input, "abcdef");
    userEvent.type(input, "abcdefg");
    expect(screen.getAllByRole("button")).toHaveLength(7);
  });

  it("Non-alphabetic strings are not allowed.", () => {
    render(
      <AppProvider>
        <Ball />
      </AppProvider>
    );
    const input = screen.getByRole("textbox", { name: "ball-tagsinput" });
    userEvent.type(
      input,
      "가나다라마바사아차카a타파바하1234567890~!@#$%^&*()_+-=.z"
    );
    expect(screen.getAllByRole("button")).toHaveLength(2);
  });
  it("Click the button to remove the ball", () => {
    render(
      <AppProvider>
        <Ball />
      </AppProvider>
    );
    const input = screen.getByRole("textbox", { name: "ball-tagsinput" });
    userEvent.type(input, "abcde");

    fireEvent.click(screen.getByRole("button", { name: "remove ball e" }));
    expect(screen.getAllByRole("button")).toHaveLength(4);
    fireEvent.click(screen.getByRole("button", { name: "remove ball a" }));
    fireEvent.click(screen.getByRole("button", { name: "remove ball b" }));
    fireEvent.click(screen.getByRole("button", { name: "remove ball c" }));
    expect(screen.getAllByRole("button")).toHaveLength(1);
  });
});
