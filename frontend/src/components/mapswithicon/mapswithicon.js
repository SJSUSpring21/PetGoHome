import React, { useState, useEffect } from "react";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import Button from "@material-ui/core/Button";
import backendServer from "../../webconfig";
import axios from "axios";
import icon from "../../Icons/p4.webp";

function Map() {
  const [latlong, setLatlong] = useState([
    {
      lat: null,
      lng: null,
    },
  ]);

  const [locations, setLocations] = useState([
    {
      lost_location: null,
    },
  ]);

  useEffect(() => {
    axios
      .post(backendServer + "/getLocations")
      .then((response) => {
        setLocations(response.data);
      })
      .catch((err) => {
        console.log(err);
      });

    const listener = (e) => {
      if (e.key === "Escape") {
        setLocations(null);
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);

  const handleClick = () => {
    locations.map((location) =>
      geocodeByAddress(location.lost_location)
        .then((results) => getLatLng(results[0]))
        .then((latLng) => {
          setLatlong(...latlong, latLng);
        })

        .catch((error) => console.error("Error", error))
    );
    console.log(latlong);
    // axios
    //   .post(backendServer + "/getLocations")
    //   .then((response) => {
    //     setLocations(response.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  const getCoordinates = () => {
    locations.map((location) =>
      geocodeByAddress(location.lost_location)
        .then((results) => getLatLng(results[0]))
        .then((latLng) => {
          setLatlong(...latlong, latLng);
        })

        .catch((error) => console.error("Error", error))
    );
  };

  return (
    <div>
      {console.log("entered")}
      {console.log(locations)}
      {/* {getCoordinates}
      {console.log("latlng is : " + latlong)} */}
      <Button variant="contained" color="primary" onClick={handleClick}>
        Get Locations
      </Button>
      {/* <GoogleMap
        defaultZoom={10}
        defaultCenter={{ lat: 45.4211, lng: -75.6903 }}
        // defaultOptions={{ styles: mapStyles }}
      >
        {latlong.map((location) => (
          <Marker
            key={location}
            position={{
              lat: location.lat,
              lng: location.lng,
            }}
            onClick={() => {
              // setSelectedPark(park);
            }}
            icon={{
              url: `/skateboarding.svg`,
              scaledSize: new window.google.maps.Size(25, 25),
            }}
          />
        ))}

        {/* { (
        <InfoWindow
          onCloseClick={() => {
            // setSelectedPark(null);
          }}
          position={{
            lat: selectedPark.geometry.coordinates[1],
            lng: selectedPark.geometry.coordinates[0]
          }}
        >
          <div>
            <h2>{selectedPark.properties.NAME}</h2>
            <p>{selectedPark.properties.DESCRIPTIO}</p>
          </div>
        </InfoWindow>
      )} */}
      {/* </GoogleMap> */} */}
    </div>
  );
}

const MapWrapped = withScriptjs(withGoogleMap(Map));

export default function mapswithicon() {
  return (
    <div>
      <div style={{ width: "100vw", height: "100vh" }}>
        <MapWrapped
          googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${"AIzaSyDKT5mLiGAU26aO5yCoHbQwHVOX2W5JHp0"}`}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100%` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    </div>
  );
}
