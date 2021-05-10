import React, { useState, useEffect } from "react";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";
import { GoogleURL } from "../../config";
import backendServer from "../../webconfig";
import axios from "axios";
// import ico from "../../Icons/p2.png";
import TextField from "@material-ui/core/TextField";
// import { makeStyles } from "@material-ui/core/styles";
import States from "../data/states";
import Cities from "../data/cities";
import MenuItem from "@material-ui/core/MenuItem";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     "& .MuiTextField-root": {
//       margin: theme.spacing(1),
//       width: "55ch",
//     },
//   },
// }));

function Map() {
  const [locations, setLocations] = useState(null);
  const [selectedlocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    axios
      .post(backendServer + "/getLocations")
      .then((response) => {
        if (response.data.length > 0) {
          setLocations(response.data);
          // console.log(response.data);
        }
      })

      .catch((err) => {
        console.log(err);
      });

    const listener = (e) => {
      if (e.key === "Escape") {
        setSelectedLocation(null);
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);

  return (
    <>
      {console.log(selectedlocation)}
      {locations ? (
        <GoogleMap
          defaultZoom={10}
          defaultCenter={{
            lat: 37.0902,
            lng: 95.7129,
          }}
          // defaultOptions={{ styles: mapStyles }}
        >
          {locations.map((location) => (
            <Marker
              key={location.id}
              position={{
                lat: Number(location.latitude),
                lng: Number(location.longitude),
              }}
              onClick={() => {
                setSelectedLocation(location);
              }}
              // icon={ico}
              // icon={ico}
              // Size={new window.google.maps.Size(25, 25)}
            />
          ))}

          {selectedlocation && (
            <InfoWindow
              onCloseClick={() => {
                setSelectedLocation(null);
              }}
              position={{
                lat: Number(selectedlocation.latitude),
                lng: Number(selectedlocation.longitude),
              }}
            >
              <div>
                <h2>This is just a test</h2>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      ) : (
        ""
      )}
    </>
  );
}

const MapWrapped = withScriptjs(withGoogleMap(Map));

export default function App() {
  // const classes = useStyles();
  const [State, setState] = useState("All");
  const [
    City,
    //  setCity
  ] = useState("All");

  const handleStateChange = (event) => {
    setState(event.target.value);
  };

  const handleCityChange = (event) => {
    setState(event.target.value);
  };

  return (
    <div>
      <div style={{ marginBottom: "2%" }}>
        <TextField
          id="standard-select-State"
          select
          label="States"
          value={State}
          onChange={handleStateChange}
          // helperText="Please select State"
          style={{ width: "200px", height: "30px" }}
        >
          {States.map((option) => (
            <MenuItem key={option.state} value={option.state}>
              {option.state}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="standard-select-State"
          select
          label="Cities"
          value={City}
          onChange={handleCityChange}
          // helperText="Please select a City"
          style={{ width: "200px", height: "30px" }}
        >
          {Cities.map((option) => (
            <MenuItem key={option.City} value={option.City}>
              {option.City}
            </MenuItem>
          ))}
        </TextField>
      </div>
      {/* --------------------------------------------------------------------------------
      -----------------------------END OF FORM---------------------------------------- */}
      <div style={{ width: "50vh", height: "50vh" }}>
        <MapWrapped
          googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${GoogleURL}`}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100%` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    </div>
  );
}
