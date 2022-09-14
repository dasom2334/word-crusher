import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { Count } from "../count";
import { AppProvider, initialState } from "../../context/context";
import { Strike } from "../strike";
import { Keyboard } from "../keyboard";
import { Ball } from "./Ball";

describe("Ball Component test", () => {
  it("Sync With Count", () => {
    render(
      <AppProvider>
        <Count />
        <Strike />
        <Ball />
        <Keyboard />
      </AppProvider>
    );
  });
  it("the same character is not allowed", () => {
    
  });
  it("Non-alphabetic strings are not allowed.", () => {});
});

