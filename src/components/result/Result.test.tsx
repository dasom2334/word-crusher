import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AppProvider } from "../../context/context";
import { Board } from "../board";
const rendering = () => render(
  <AppProvider>
    <Board />
  </AppProvider>
);
describe("Result Component Test", () => {
  it("Get Strike Result", async () => {
    rendering();
    userEvent.type(screen.getByRole("textbox", { name: /^strike-0/ }), "k");
    userEvent.type(screen.getByRole("textbox", { name: /^strike-1/ }), "r");
    userEvent.type(screen.getByRole("textbox", { name: /^strike-2/ }), "o");
    userEvent.type(screen.getByRole("textbox", { name: /^strike-3/ }), "n");
    userEvent.type(screen.getByRole("textbox", { name: /^strike-4/ }), "e");
    fireEvent.click(screen.getByRole("button", { name: /submit/gi }));
    expect(await screen.findAllByText(/krone/gi)).toBeTruthy();
  });
  it("Get Ball Result", async () => {
    rendering();
    userEvent.type(
      screen.getByRole("textbox", { name: "ball-tagsinput" }),
      "krone"
    );
    fireEvent.click(screen.getByRole("button", { name: /submit/gi }));
    expect(await screen.findAllByText(/krone/gi)).toBeTruthy();
  });
  it("Get Strike And Ball Result", async () => {
    rendering();

    userEvent.type(screen.getByRole("textbox", { name: /^strike-0/ }), "k");
    userEvent.type(screen.getByRole("textbox", { name: /^strike-2/ }), "o");
    userEvent.type(screen.getByRole("textbox", { name: /^strike-4/ }), "e");
    userEvent.type(
      screen.getByRole("textbox", { name: "ball-tagsinput" }),
      "rn"
    );
    fireEvent.click(screen.getByRole("button", { name: /submit/gi }));
    expect(await screen.findAllByText(/krone/gi)).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: /remove ball R/gi }));
    fireEvent.click(screen.getByRole("button", { name: /remove ball N/gi }));
    userEvent.type(
      screen.getByRole("textbox", { name: /^strike-2/ }),
      "{backspace}"
    );
    userEvent.type(screen.getByRole("textbox", { name: /^strike-3/ }), "f");
    fireEvent.click(screen.getByRole("button", { name: /submit/gi }));
    expect(await screen.findAllByText(/knife/gi)).toBeTruthy();
  });
});
