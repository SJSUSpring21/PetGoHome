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
  const [locations, setLocations] = useState([{}]);

  useEffect(() => {
    axios
      .post(backendServer + "/getLocations")
      .then((response) => {
        setLocations(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleClick = () => {
    if (locations.length > 0) {
      locations.map((location) => {
        // console.log(location);
        geocodeByAddress(location.lost_location)
          .then((results) => getLatLng(results[0]))
          .then((latLng) => {
            // setLatlong(...latlong, latLng);
            // setTimeout(1000);
            console.log(latLng);
            let data = {
              id: location.id,
              loca: location.lost_location,
              latitude: latLng.lat,
              longitude: latLng.lng,
            };
            console.log(data);
            axios
              .post(backendServer + "/setLatLong", data)
              .then((response) => {
                console.log("inserted");
              })
              .catch((err) => {
                console.log(err);
              });
          })

          //   axios
          //     .post(backendServer + "/getLocations", data)
          //     .then((response) => {
          //       console.log("inserted");
          //     })
          //     .catch((err) => {
          //       console.log(err);
          //     });
          // })
          .catch((error) => console.error("Error", error));
      });
    }
  };

  return (
    <>
      {" "}
      <Button variant="contained" color="primary" onClick={handleClick}>
        convert{" "}
      </Button>
    </>
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
