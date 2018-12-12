import React, { Component } from "react";
import ExampleModal from "../ExampleModal";
import "../../styles/Pane.css";

class Pane extends Component {
  constructor() {
    super();

    this.state = {
      deployed: false,
      modalStatus: false
    };
  }

  handleClick = e => {
    if (e.target.innerText === "show example" || this.props.modalDeployed) {
      return;
    }
    this.setState({
      deployed: !this.state.deployed,
      modalStatus: false
    });
  };

  openModal = () => {
    console.log(this.props.modalDeployed);
    this.setState({
      modalStatus: true
    });
    this.props.openModal();
  };

  closeModal = () => {
    this.setState({
      modalStatus: false
    });
    this.props.closeModal();
  };

  render() {
    const {
      type,
      url,
      params,
      body,
      successStatus,
      returns,
      failureStatus,
      failureMessage,
      example
    } = this.props.data;

    return (
      <article className="pane" onClick={this.handleClick}>
        <section className="main-pane">
          <p className="type main-info">{type}</p>
          <p className="url main-info">{url}</p>
          <p className="returns main-info">{returns}</p>
        </section>
        <section className={`secondary-pane ${this.state.deployed}`}>
          <p className="query-params secondary-info">
            <span className="secondary-label">Query parameters:</span> {params}
          </p>
          <p className="request-body secondary-info">
            <span className="secondary-label"> Request body:</span> {body}
          </p>
          <p className="succesful-code secondary-info">
            <span className="secondary-label">Succesful status code:</span>{" "}
            {successStatus}
          </p>
          <p className="error-code secondary-info">
            <span className="secondary-label">Error status code:</span>{" "}
            {failureStatus}
          </p>
          <p className="error-message secondary-info">
            <span className="secondary-label">Error message:</span>{" "}
            {failureMessage}
          </p>
          <button onClick={this.openModal}>show example</button>
        </section>
        <ExampleModal
          data={example}
          closeModal={this.closeModal}
          showStatus={this.state.modalStatus}
        />
      </article>
    );
  }
}

export default Pane;
