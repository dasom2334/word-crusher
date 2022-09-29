import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AppProvider } from "../../context/context";
import { Ball } from "../ball";
import { Count } from "../count";
import { Strike } from "../strike";
import { Result } from "./Result";

describe("Result Component Test", () => {
  it("Get Strike Result", async() => {
    render(
      <AppProvider>
        <Count />
        <Strike />
        <Result />
      </AppProvider>
    );
    userEvent.type(screen.getByRole("textbox", { name: /^strike-0/ }), "k");
    userEvent.type(screen.getByRole("textbox", { name: /^strike-1/ }), "r");
    userEvent.type(screen.getByRole("textbox", { name: /^strike-2/ }), "o");
    userEvent.type(screen.getByRole("textbox", { name: /^strike-3/ }), "n");
    userEvent.type(screen.getByRole("textbox", { name: /^strike-4/ }), "e");
    fireEvent.click(screen.getByRole("button", { name: /submit/gi }));
    expect(await screen.findAllByText(/krone/gi)).toHaveLength(1);
  });
  it("Get Ball Result", async () => {
    render(
      <AppProvider>
        <Count />
        <Ball />
        <Result />
      </AppProvider>
    );
    userEvent.type(
      screen.getByRole("textbox", { name: "ball-tagsinput" }),
      "krone"
    );
    fireEvent.click(screen.getByRole("button", { name: /submit/gi }));
    expect(await screen.findAllByText(/krone/gi)).toHaveLength(1);
  });
  it("Get Strike And Ball Result", async () => {
    render(
      <AppProvider>
        <Count />
        <Strike />
        <Ball />
        <Result />
      </AppProvider>
    );

    userEvent.type(screen.getByRole("textbox", { name: /^strike-0/ }), "k");
    userEvent.type(screen.getByRole("textbox", { name: /^strike-2/ }), "o");
    userEvent.type(screen.getByRole("textbox", { name: /^strike-4/ }), "e");
    userEvent.type(
      screen.getByRole("textbox", { name: "ball-tagsinput" }),
      "rn"
    );
    fireEvent.click(screen.getByRole("button", { name: /submit/gi }));
    expect(await screen.findAllByText(/krone/gi)).toHaveLength(1);
    fireEvent.click(screen.getByRole("button", { name: /remove ball R/gi }));
    fireEvent.click(screen.getByRole("button", { name: /remove ball N/gi }));
    fireEvent.focus(screen.getByRole("textbox", { name: /^strike-2/ }));
    userEvent.type(screen.getByRole("textbox", { name: /^strike-3/ }), "f");
    fireEvent.click(screen.getByRole("button", { name: /submit/gi }));
    expect(await screen.findAllByText(/knife/gi)).toHaveLength(1);
  });
});
