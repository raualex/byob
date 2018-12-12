import React, { Component } from "react";
import Pane from "../Pane";
import "../../styles/PaneContainer.css";
import {
  cityEndpoints,
  comedyClubEndpoints
} from "../../utilities/endpoints.js";

class PaneContainer extends Component {
  constructor() {
    super();

    this.state = {
      deployed: null
    };
  }

  handleModal = modal => {
    this.setState({
      deployed: modal
    });
  };

  closeModals = () => {
    this.setState({
      deployed: null
    });
  };
  render() {
    let key = 0;

    const cityEndpointsContainer = cityEndpoints.map(endpoint => {
      key++;
      return (
        <Pane
          openModal={this.props.openModal}
          closeModal={this.props.closeModal}
          modalDeployed={this.props.modalDeployed}
          key={key}
          data={endpoint}
        />
      );
    });

    const clubsEndpointsContainer = comedyClubEndpoints.map(endpoint => {
      key++;

      return (
        <Pane
          openModal={this.props.openModal}
          closeModal={this.props.closeModal}
          modalDeployed={this.props.modalDeployed}
          key={key}
          data={endpoint}
        />
      );
    });
    return (
      <main className="pane_container">
        <section className="city-section">{cityEndpointsContainer}</section>
        <section className="clubs-section">{clubsEndpointsContainer}</section>
      </main>
    );
  }
}

export default PaneContainer;
