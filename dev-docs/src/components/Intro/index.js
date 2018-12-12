import React, { Component } from "react";
import "../../styles/Intro.css";

class Intro extends Component {
  render() {
    return (
      <header className="intro">
        <h1>Comedy Club API - Developers FAQ</h1>
        <p className="intro-text">
          Welcome to the Comedy Club API. This page is designed to help
          developers gain a firm understanding of the API's endpoints, how to
          access them, what kind of data can be expected from them, and how to
          troubleshoot potential issues.
        </p>
      </header>
    );
  }
}

export default Intro;
