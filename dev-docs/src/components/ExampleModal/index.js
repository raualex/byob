import React, { Component } from "react";
import "../../styles/ExampleModal.css";

class ExampleModal extends Component {
  render() {
    const { data, showStatus, closeModal } = this.props;

    return (
      <aside className={`example-modal ${showStatus}`}>
        <button onClick={closeModal}>close</button>
        <h4>Example Endpoint: {data.exampleUrl}</h4>
        <h4>Example Body Object:</h4>
        <img src={data.body} alt="body-example" />
        <h4>Example Response Object</h4>
        <img src={data.exampleResponse} alt="example-response" />
        <div />
      </aside>
    );
  }
}

export default ExampleModal;
