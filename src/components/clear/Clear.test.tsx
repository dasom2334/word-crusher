import { fireEvent, getAllByRole, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AppProvider } from "../../context/context";
import { Ball } from "../ball";
import { Board } from "../board";
import { Count } from "../count";
import { DenyBall } from "../deny-ball";
import { DenyStrike } from "../deny-strike";
import { Keyboard } from "../keyboard";
import { Result } from "../result";
import { Strike } from "../strike";
import { Clear } from "./Clear";

describe("Clear Component test", () => {
  it("Is All Clear", () => {
    render(
      <AppProvider>
        <Board>
          <Clear />
          <Count />
          <Strike />
          <DenyStrike />
          <Ball />
          <DenyBall />
          <Keyboard />
          <Result />
        </Board>
      </AppProvider>
    );
    const input = screen.getByLabelText("ball-tagsinput");
    userEvent.type(input, "abcdef");
    userEvent.type(input, "abcdefg");
    expect(screen.getAllByRole("button")).toHaveLength(7);
  });
});
