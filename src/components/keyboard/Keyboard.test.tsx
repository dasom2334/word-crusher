import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AppProvider } from "../../context/context";
import { Board } from "../board";
const rendering = () =>
  render(
    <AppProvider>
      <Board />
    </AppProvider>
  );
describe("Keyboard Component Test", () => {
  it("strike numbering chekced", () => {
    rendering();

    screen
      .getAllByRole("textbox", { name: /^strike-[0-1]/i })
      .forEach((e) => userEvent.type(e, "a"));
    screen
      .getAllByRole("textbox", { name: /^strike-[2-3]/i })
      .forEach((e) => userEvent.type(e, "b"));
    expect(screen.getAllByText("2")).toHaveLength(2);

    userEvent.type(
      screen.getByRole("textbox", { name: "strike-3" }),
      "{backspace}c"
    );
    expect(screen.getAllByText("2")).toHaveLength(1);
    expect(screen.getAllByText("1")).toHaveLength(2);
    screen.getAllByText("2").forEach((e) => {
      expect(e).toHaveClass("active allow");
    });

    screen.getAllByText("1").forEach((e) => {
      expect(e).toHaveClass("active allow");
    });
  });
  it("deny strike numbering chekced", () => {
    rendering();

    screen
      .getAllByRole("textbox", { name: /^deny-strike-[0-1]/i })
      .forEach((e) => userEvent.type(e, "a"));
      
    screen
      .getAllByRole("textbox", { name: /^deny-strike-[2-3]/i })
      .forEach((e) => userEvent.type(e, "b"));
    expect(screen.getAllByText("2")).toHaveLength(2);

    userEvent.type(
      screen.getByRole("textbox", { name: "deny-strike-3" }),
      "{backspace}c"
    );
    expect(screen.getAllByText("2")).toHaveLength(1);
    expect(screen.getAllByText("1")).toHaveLength(2);
    screen.getAllByText("2").forEach((e) => {
      expect(e).toHaveClass("active deny");
    });
    screen.getAllByText("1").forEach((e) => {
      expect(e).toHaveClass("active deny");
    });
  });
  it("The balled key has an isBalled class", () => {
    rendering();
    userEvent.type(
      screen.getByRole("textbox", { name: "ball-tagsinput" }),
      "abcde"
    );
    screen
      .getAllByRole("button", { name: /^[A-E]$/i })
      .forEach((e) => expect(e).toHaveClass("isBalled"));
    screen
      .getAllByRole("button", { name: /^[F-Z]$/i })
      .forEach((e) => expect(e).not.toHaveClass("isBalled"));
  });
  it("The deny balled key has an isDenyBalled class", () => {
    rendering();
    userEvent.type(
      screen.getByRole("textbox", { name: "deny-ball-tagsinput" }),
      "abcde"
    );
    screen
      .getAllByRole("button", { name: /^[A-E]$/i })
      .forEach((e) => expect(e).toHaveClass("isDenyBalled"));
    screen
      .getAllByRole("button", { name: /^[F-Z]$/i })
      .forEach((e) => expect(e).not.toHaveClass("isDenyBalled"));
  });
  it("When focusing on the strike zone, the clicked keyboard enters the strike", () => {
    rendering();
    fireEvent.focus(screen.getByRole("textbox", { name: "strike-0" }));
    fireEvent.click(screen.getByRole("button", { name: "A" }));
    expect(screen.getByRole("textbox", { name: "strike-0" })).toHaveFocus();
    expect(screen.getByRole("textbox", { name: "strike-0" })).toHaveValue("A");
  });
  it("When focusing on the deny strike zone, the clicked keyboard enters the deny strike", () => {
    rendering();
    fireEvent.focus(screen.getByRole("textbox", { name: "deny-strike-0" }));
    fireEvent.click(screen.getByRole("button", { name: "A" }));
    fireEvent.click(screen.getByRole("button", { name: "B" }));
    fireEvent.click(screen.getByRole("button", { name: "C" }));
    expect(
      screen.getByRole("textbox", { name: "deny-strike-0" })
    ).toHaveFocus();
    expect(screen.getByRole("textbox", { name: "deny-strike-0" })).toHaveValue(
      "ABC"
    );
  });
  it("When focusing on the ball zone, the clicked keyboard enters the ball", () => {
    rendering();
    fireEvent.focus(screen.getByRole("textbox", { name: "ball-tagsinput" }));
    fireEvent.click(screen.getByRole("button", { name: "A" }));
    expect(
      screen.getByRole("textbox", { name: "ball-tagsinput" })
    ).toHaveFocus();
    expect(
      screen.getAllByRole("button", { name: "remove ball A" })
    ).toBeTruthy();
  });
  it("When focusing on the deny ball zone, the clicked keyboard enters the deny ball", () => {
    rendering();
    fireEvent.focus(
      screen.getByRole("textbox", { name: "deny-ball-tagsinput" })
    );
    fireEvent.click(screen.getByRole("button", { name: "A" }));
    expect(
      screen.getByRole("textbox", { name: "deny-ball-tagsinput" })
    ).toHaveFocus();
    expect(
      screen.getAllByRole("button", { name: "remove deny ball A" })
    ).toBeTruthy();
  });
});
