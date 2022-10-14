import React from "react";
import { HowToPlay } from "../how-to-play";

interface HeaderProps {
  title: string;
}

export const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header>
      <div className="shadow"></div>
      <div>
        <div>
          <a href="/">
            <h1>{title}</h1>
          </a>
          <HowToPlay />
        </div>
      </div>
    </header>
  );
};
