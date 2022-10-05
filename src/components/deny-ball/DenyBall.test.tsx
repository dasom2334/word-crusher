import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AppProvider } from "../../context/context";
import { DenyBall } from "./DenyBall";
const rendering = () =>
  render(
    <AppProvider>
      <DenyBall />
    </AppProvider>
  );
describe("DenyBall Component test", () => {
  it("Only capital letters are allowed on the ball.", () => {
    rendering();
    const input = screen.getByRole("textbox", { name: "deny-ball-tagsinput" });
    const typing = "abcdef";
    userEvent.type(input, typing);
    typing
      .toUpperCase()
      .split("")
      .forEach((e) => {
        expect(
          screen.getByRole("button", { name: `remove deny ball ${e}` })
        ).toHaveAttribute("data-character", e);
      });
  });
  it("the same character is not allowed", () => {
    rendering();
    const input = screen.getByRole("textbox", { name: "deny-ball-tagsinput" });
    userEvent.type(input, "abcdef");
    userEvent.type(input, "abcdefg");
    expect(screen.getAllByRole("button")).toHaveLength(7);
  });

  it("Non-alphabetic strings are not allowed.", () => {
    rendering();
    const input = screen.getByRole("textbox", { name: "deny-ball-tagsinput" });
    userEvent.type(
      input,
      "가나다라마바사아차카a타파바하1234567890~!@#$%^&*()_+-=.z"
    );
    expect(screen.getAllByRole("button")).toHaveLength(2);
  });
  it("Click the button to remove the ball", () => {
    rendering();
    const input = screen.getByRole("textbox", { name: "deny-ball-tagsinput" });
    userEvent.type(input, "abcde");

    fireEvent.click(
      screen.getByRole("button", { name: /remove deny ball e/i })
    );
    expect(screen.getAllByRole("button")).toHaveLength(4);
    fireEvent.click(
      screen.getByRole("button", { name: /remove deny ball a/i })
    );
    fireEvent.click(
      screen.getByRole("button", { name: /remove deny ball b/i })
    );
    fireEvent.click(
      screen.getByRole("button", { name: /remove deny ball c/i })
    );
    expect(screen.getAllByRole("button")).toBeTruthy();
  });
});
