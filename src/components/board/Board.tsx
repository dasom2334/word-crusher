import "./Boards.scss";
import React, { KeyboardEvent } from "react";

interface BoardProps {
  children: React.ReactNode;
}

export const Board: React.FC<BoardProps> = ({ children }: BoardProps) => {
  return <div className="board">{children}</div>;
};
