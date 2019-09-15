import React from "react";

import Logo from "components/atoms/Logo";
import { app } from "../../config";

const HomeHero = () => {
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
      <ul style={{ listStyleType: "none", fontSize: "16px" }}>
        <li>APP_ENV: {app.env}</li>
        <li>APP_DEBUG: {app.debug ? "true" : "false"}</li>
      </ul>
    </header>
  );
};

export default HomeHero;
