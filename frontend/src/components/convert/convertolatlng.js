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

export default function Convert() {
  // const handleClick = () => {
  //   if (locations.length > 0) {
  //     locations.map((location) => {
  //       geocodeByAddress(location.location)
  //         .then((results, status) => {
  //           console.log(status);
  //           if (status === "OK") {
  //             getLatLng(results[0]);
  //           }
  //           if (status === "OVER_QUERY_LIMIT") {
  //             console.log("error");
  //           }
  //         })
  //         .catch(async (error) => {
  //           console.log(error);
  //           await setTimeout(() => {
  //             console.log("timeout");
  //           }, 2000);
  //         });
  //     });
  //   }
  // };
}
