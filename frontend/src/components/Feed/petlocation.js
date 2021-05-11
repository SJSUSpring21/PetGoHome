import React from "react";
import { GoogleApiWrapper, Map, Marker } from "google-maps-react";
import { Component } from "react";
import { Redirect } from "react-router-dom";

class PetLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let cards = [];
    //console.log(this.props.location);
    cards.push(
      <div
        style={{
          position: "absolute",
          width: "41%",
          height: "45%",
        }}
      >
        <Map
          defaultZoom={4}
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
            icon={{
              url:
                String(this.props.location.type) === "Dog"
                  ? "/dog.png"
                  : String(this.props.location.type) === "Cat"
                  ? "/cat.png"
                  : String(this.props.location.type) === "Bird"
                  ? "/bird.png"
                  : String(this.props.location.type) === "Goat"
                  ? "/goat.png"
                  : String(this.props.location.type) === "Horse"
                  ? "/horse.png"
                  : String(this.props.location.type) === "Tortoise"
                  ? "/tortoise.png"
                  : String(this.props.location.type) === "Rabbit"
                  ? "/rabbit.png"
                  : String(this.props.location.type) === "Pig"
                  ? "/pig.png"
                  : "/other.png",

              scaledSize: new window.google.maps.Size(48, 48),
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
