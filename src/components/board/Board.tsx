import "./Boards.scss";
import React from "react";
import { Ball } from "../ball";
import { Clear } from "../clear";
import { Count } from "../count";
import { DenyBall } from "../deny-ball";
import { DenyStrike } from "../deny-strike";
import { Keyboard } from "../keyboard";
import { Result } from "../result";
import { Strike } from "../strike";

interface BoardProps {}

export const Board: React.FC<BoardProps> = () => {
  return (
    <div className="board">
      <Count />
      <div>
        <h2>Allow</h2>
        <h3>Allow Strikes</h3>
        <Strike />
        <h3>Allow Ball</h3>
        <Ball />
      </div>
      <div>
        <h2>Deny</h2>
        <h3>Deny Strikes</h3>
        <DenyStrike />
        <h3>Deny Ball</h3>
        <DenyBall />
      </div>
      <div className="bottom-wrap">
        <div className="bottom-fix">
          <Keyboard />
          <div className="bottom-btns-wrap">
            <Clear />
            <Result />
          </div>
        </div>
      </div>
    </div>
  );
};
