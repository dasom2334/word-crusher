import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AppProvider, initialState } from "../../context/context";
import { COUNT_UP_BUTTON_TEXT } from "../../utils";
import { Board } from "../board";

describe("Clear Component test", () => {
  it("Is All Clear", async () => {
    render(
      <AppProvider>
        <Board />
      </AppProvider>
    );

    fireEvent.click(screen.getByRole("button", { name: COUNT_UP_BUTTON_TEXT }));
    fireEvent.click(screen.getByRole("button", { name: COUNT_UP_BUTTON_TEXT }));
    userEvent.type(screen.getByLabelText("strike-0"), "y");
    
    userEvent.type(screen.getByLabelText("deny-strike-2"), "k");
    userEvent.type(
      screen.getByRole("textbox", { name: "ball-tagsinput" }),
      "a"
    );
    userEvent.type(
      screen.getByRole("textbox", { name: "deny-ball-tagsinput" }),
      "e"
    );
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));
    expect(await screen.findAllByText(/yacking/i)).toBeTruthy();

    expect(screen.getByRole("contentinfo")).toHaveTextContent(
      (initialState.count + 2).toString()
    );

    fireEvent.click(screen.getByRole("button", { name: /Clear/i }));
    screen.getAllByRole("textbox").forEach((e) => expect(e).toHaveValue(""));
    await waitFor(() => {
      expect(screen.queryByText(/yacking/i)).not.toBeInTheDocument();
    });
  });
});
