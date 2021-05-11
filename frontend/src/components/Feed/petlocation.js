import React from "react";
import axios from "axios";
import { GoogleApiWrapper, Map, Marker } from "google-maps-react";
import { Component } from "react";
import { Col, Row } from "react-bootstrap";
import backendServer from "../../webconfig";
import { Redirect } from "react-router-dom";

class PetLocation extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let cards = [];
    console.log(this.props.location);
    cards.push(
      <div
        style={{
          position: "absolute",
          width: "41%",
          height: "45%",
        }}
      >
        <Map
          google={this.props.google}
          initialCenter={{
            lat: this.props.location.latitude,
            lng: this.props.location.longitude,
          }}
        >
          <Marker
            position={{
              lat: this.props.location.latitude,
              lng: this.props.location.longitude,
            }}
          />
        </Map>
      </div>
    );

    return (
      <>
        {localStorage.getItem("userProfile") ? "" : <Redirect to="/" />}

        {cards}
      </>
    );
  }
}

// export default Home;
export default GoogleApiWrapper({
  apiKey: "AIzaSyDKT5mLiGAU26aO5yCoHbQwHVOX2W5JHp0",
})(PetLocation);
