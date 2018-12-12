import React, { Component } from "react";
import "../../styles/Instructions.css";

class Instructions extends Component {
  render() {
    return (
      <section className="instructions">
        <article className="left-pane">
          <h3>Interactive API Tester</h3>
          <p>
            The panel below displays documentation for all endpoints,
            parameters, and error messages available to the Comedy Club API.
            Deploy frames for individual endpoints to see how they work.
          </p>
        </article>
        <article className="right-pane" />
      </section>
    );
  }
}

export default Instructions;
