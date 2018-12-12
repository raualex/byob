import React, { Component } from "react";
import "../../styles/App.css";
import Intro from "../Intro";
import Instructions from "../Instructions";
import PaneContainer from "../PaneContainer";

class App extends Component {
  constructor() {
    super();

    this.state = {
      modalDeployed: false
    };
  }

  modalsOpen = () => {
    this.setState({
      modalDeployed: true
    });
  };

  modalsClosed = () => {
    this.setState({
      modalDeployed: false
    });
  };

  render() {
    return (
      <div className="App">
        <div className={`dark-overlay ${this.state.modalDeployed}`} />
        <Intro />
        <Instructions />
        <PaneContainer
          openModal={this.modalsOpen}
          closeModal={this.modalsClosed}
          modalDeployed={this.state.modalDeployed}
        />
        <div />
      </div>
    );
  }
}

export default App;
