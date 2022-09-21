import { render, screen } from "@testing-library/react";
import { AppProvider } from "../../context/context";
import { Board } from "../board";
import { Count } from "../count";
import { Strike } from "../strike";
import { Keyboard } from "../keyboard";
import { Result } from "./Result";
import { Ball } from "../ball";
import userEvent from "@testing-library/user-event";

describe("Result Component Test", () => {
  it("Get Strike Result", () => {
    render(
      <AppProvider>
        <Board>
          <Count />
          <Strike />
          <Result />
          <Keyboard />
        </Board>
      </AppProvider>
    );
    userEvent.type(screen.getByRole("textbox", { name: /^strike_0/ }), "k");
    userEvent.type(screen.getByRole("textbox", { name: /^strike_1/ }), "r");
    userEvent.type(screen.getByRole("textbox", { name: /^strike_2/ }), "o");
    userEvent.type(screen.getByRole("textbox", { name: /^strike_3/ }), "n");
    userEvent.type(screen.getByRole("textbox", { name: /^strike_4/ }), "e");
    expect(screen.getByText("krone")).toHaveLength(1);
  });
  it("Get Ball Result", () => {
    render(
      <AppProvider>
        <Board>
          <Count />
          <Ball />
          <Result />
          <Keyboard />
        </Board>
      </AppProvider>
    );
    userEvent.type(screen.getByRole("textbox", { name: "ball-tagsinput" }), "krone");
    expect(screen.getByText("krone")).toHaveLength(1);
  });
  it("Get Strike And Ball Result", () => {
    render(
      <AppProvider>
        <Board>
          <Count />
          <Strike />
          <Ball />
          <Result />
          <Keyboard />
        </Board>
      </AppProvider>
    );
    
    userEvent.type(screen.getByRole("textbox", { name: /^strike_0/ }), "k");
    userEvent.type(screen.getByRole("textbox", { name: /^strike_2/ }), "o");
    userEvent.type(screen.getByRole("textbox", { name: /^strike_4/ }), "e");
    userEvent.type(screen.getByRole("textbox", { name: "ball-tagsinput" }), "rn");
    expect(screen.getByText("krone")).toHaveLength(1);
    userEvent.type(screen.getByRole("textbox", { name: /^strike_0/ }), "a");
    expect(screen.getByText("krone")).toHaveLength(0);
  });
});
