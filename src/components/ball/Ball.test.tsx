import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AppProvider } from "../../context/context";
import { Ball } from "./Ball";

const redering = () =>
  render(
    <AppProvider>
      <Ball />
    </AppProvider>
  );

describe("Ball Component test", () => {
  it("Only capital letters are allowed on the ball", () => {
    redering();
    const input = screen.getByRole("textbox", { name: "ball-tagsinput" });
    const typing = "abcdef";
    userEvent.type(input, typing);
    typing
      .toUpperCase()
      .split("")
      .forEach((e) => {
        expect(
          screen.getByRole("button", { name: `remove ball ${e}` })
        ).toHaveAttribute("data-character", e);
      });
  });
  it("the same character is not allowed", () => {
    redering();

    const input = screen.getByRole("textbox", { name: "ball-tagsinput" });
    userEvent.type(input, "abcdef");
    userEvent.type(input, "abcdefg");
    expect(input).toHaveClass("shaking");
    expect(screen.getAllByRole("button")).toHaveLength(7);
  });

  it("Non-alphabetic strings are not allowed", () => {
    redering();

    const input = screen.getByRole("textbox", { name: "ball-tagsinput" });
    userEvent.type(
      input,
      "가나다라마바사아차카a타파바하1234567890~!@#$%^&*()_+-=.z"
    );
    
    expect(input).toHaveClass("shaking");
    expect(screen.getAllByRole("button")).toHaveLength(2);
  });
  it("Click the button to remove the ball", () => {
    redering();

    const input = screen.getByRole("textbox", { name: "ball-tagsinput" });
    userEvent.type(input, "abcde");

    fireEvent.click(screen.getByRole("button", { name: "remove ball E" }));
    expect(screen.getAllByRole("button")).toHaveLength(4);
    fireEvent.click(screen.getByRole("button", { name: "remove ball A" }));
    fireEvent.click(screen.getByRole("button", { name: "remove ball B" }));
    expect(screen.getAllByRole("button")).toHaveLength(2);
  });

  
});
