import {
  fireEvent, render,
  screen,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AppProvider } from "../../context/context";
import { Ball } from "../ball";
import { Board } from "../board";
import { Count } from "../count";
import { Strike } from "../strike";
import { Result } from "./Result";

describe("Result Component Test", () => {
  it("Get Strike Result", () => {
    render(
      <AppProvider>
        <Board>
          <Count />
          <Strike />
          <Result />
        </Board>
      </AppProvider>
    );
    userEvent.type(screen.getByRole("textbox", { name: /^strike_0/ }), "k");
    userEvent.type(screen.getByRole("textbox", { name: /^strike_1/ }), "r");
    userEvent.type(screen.getByRole("textbox", { name: /^strike_2/ }), "o");
    userEvent.type(screen.getByRole("textbox", { name: /^strike_3/ }), "n");
    userEvent.type(screen.getByRole("textbox", { name: /^strike_4/ }), "e");
    fireEvent.click(screen.getByRole("button", { name: "submit" }));
    expect(screen.getAllByText("krone")).toHaveLength(1);
  });
  it("Get Ball Result", async () => {
    render(
      <AppProvider>
        <Board>
          <Count />
          <Ball />
          <Result />
        </Board>
      </AppProvider>
    );
    userEvent.type(
      screen.getByRole("textbox", { name: "ball-tagsinput" }),
      "krone"
    );
    fireEvent.click(screen.getByRole("button", { name: "submit" }));
    expect(await screen.findAllByText("krone")).toHaveLength(1);
  });
  it("Get Strike And Ball Result", async () => {
    render(
      <AppProvider>
        <Board>
          <Count />
          <Strike />
          <Ball />
          <Result />
        </Board>
      </AppProvider>
    );

    userEvent.type(screen.getByRole("textbox", { name: /^strike_0/ }), "k");
    userEvent.type(screen.getByRole("textbox", { name: /^strike_2/ }), "o");
    userEvent.type(screen.getByRole("textbox", { name: /^strike_4/ }), "e");
    userEvent.type(
      screen.getByRole("textbox", { name: "ball-tagsinput" }),
      "rn"
    );
    fireEvent.click(screen.getByRole("button", { name: "submit" }));
    expect(await screen.findAllByText("krone")).toHaveLength(1);
    fireEvent.click(screen.getByRole("button", { name: "remove ball r" }));
    fireEvent.click(screen.getByRole("button", { name: "remove ball n" }));
    fireEvent.focus(screen.getByRole("textbox", { name: /^strike_2/ }));
    userEvent.type(screen.getByRole("textbox", { name: /^strike_3/ }), "f");
    fireEvent.click(screen.getByRole("button", { name: "submit" }));
    expect(await screen.findAllByText("knife")).toHaveLength(1);
  });
});
