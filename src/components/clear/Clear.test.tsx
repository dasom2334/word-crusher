import {
  fireEvent,
  getAllByRole,
  render,
  screen,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AppProvider, initialState } from "../../context/context";
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
  it("Is All Clear", async () => {
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

    fireEvent.click(screen.getByRole("button", { name: "➕" }));
    fireEvent.click(screen.getByRole("button", { name: "➕" }));
    fireEvent.click(screen.getByRole("button", { name: "➕" }));
    userEvent.type(screen.getByLabelText("strike-0"), "y");
    userEvent.type(screen.getByLabelText("deny-strike-0"), "z");
    userEvent.type(
      screen.getByRole("textbox", { name: "ball-tagsinput" }),
      "a"
    );
    userEvent.type(
      screen.getByRole("textbox", { name: "deny-ball-tagsinput" }),
      "e"
    );
    fireEvent.click(screen.getByRole("button", { name: "submit" }));

    expect(await screen.findAllByText("yachting")).toHaveLength(1);

    fireEvent.click(screen.getByRole("button", { name: "Clear" }));
    // expect(screen.getByRole("contentinfo")).toHaveTextContent(
    //   initialState.count.toString()
    // );
    // console.log(screen)
    // expect(screen.getAllByText("yachting")).toHaveLength(0);
  });
});
