import React from "react";

import Logo from "Components/atoms/Logo";

const HomeHeader = () => {
  return (
    <header className="App-header">
      <Logo />
      <p>
        Edit <code>src/components/App.js</code> and save to reload.
      </p>
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer">
        Learn React
      </a>
    </header>
  );
};

export default HomeHeader;
