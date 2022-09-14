import React, { KeyboardEvent } from "react";

interface BoardProps {
  children: React.ReactNode;
}

export const Board: React.FC<BoardProps> = ({ children }: BoardProps) => {
  const onKeyDown = (event: KeyboardEvent<Element>) => {
    // console.log(event);
  };
  return <div onKeyDown={onKeyDown}>{children}</div>;
};
