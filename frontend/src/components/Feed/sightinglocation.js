import React from "react";
import { GoogleApiWrapper, Map, Marker } from "google-maps-react";
import { Component } from "react";
import { Redirect } from "react-router-dom";
import backendServer from "../../webconfig";
import axios from "axios";
class PetLocation extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedLocation: null };
  }

  componentDidMount = async () => {
    axios
      .post(backendServer + "/getLocations")
      .then((response) => {
        if (response.data.length > 0) {
          let values = Array(response.data.length).fill(0);
          this.setState({ locations: response.data, values: values });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  onMarkerClick(location) {
    this.setState({ selectedLocation: location });
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
                String(this.props.location.pet_type) === "Dog"
                  ? "/dog.png"
                  : String(this.props.location.pet_type) === "Cat"
                  ? "/cat.png"
                  : String(this.props.location.pet_type) === "Bird"
                  ? "/bird.png"
                  : String(this.props.location.pet_type) === "Goat"
                  ? "/goat.png"
                  : String(this.props.location.pet_type) === "Horse"
                  ? "/horse.png"
                  : String(this.props.location.pet_type) === "Tortoise"
                  ? "/tortoise.png"
                  : String(this.props.location.pet_type) === "Rabbit"
                  ? "/rabbit.png"
                  : String(this.props.location.pet_type) === "Pig"
                  ? "/pig.png"
                  : "/other.png",

              scaledSize: new window.google.maps.Size(48, 48),
            }}
          />
          {/* {this.state.locations.forEach((item) => (
            <Marker
              position={{
                lat: item.latitude,
                lng: item.longitude,
              }}
              icon={{
                url: "/other.png",
                onClick={() => {
                this.onMarkerClick(location);
              }}

                scaledSize: new window.google.maps.Size(48, 48),
              }}
            />
          ))} */}

          {this.selectedLocation && (
            <InfoWindow
              onCloseClick={() => {
                this.setState({ selectedLocation: null });
              }}
              position={{
                lat: Number(this.state.selectedlocation.latitude),
                lng: Number(this.state.selectedlocation.longitude),
              }}
            >
              <div>This is a test</div>
            </InfoWindow>
          )}
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
