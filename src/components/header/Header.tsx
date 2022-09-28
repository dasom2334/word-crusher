import React from "react";

interface HeaderProps {
  title: string;
}

export const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header>
      <div className="shadow"></div>
      <div>
        <h1>{title}</h1>
      </div>
    </header>
  );
};
