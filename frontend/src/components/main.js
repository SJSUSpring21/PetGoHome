import React, { Component } from "react";
import Navbar from "./Navbar/navbar";
import { Route } from "react-router-dom";
import Login from "./Login/login";
// import Lost from "./Lost/lost";
import LostOrFound from "./lostOrFound/lostOrFound";
// import Maps from "./GoogleMaps/maps";
// import FileUpload from "../components/Upload/upload";
// import pdfGenerator from "./PDFgenerator/pdfgenerator";
import Home from "./home/home";
import WhomToContact from "./Info/WhomToContact";
import stolenpets from "./Info/stolenpets";
import mapswithicon from "./mapswithicon/mapswithicon";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Route path="/" component={Navbar} />
        <div>
          <Route path="/login" component={Login} />
          {/* <Route path="/lost" component={Lost} /> */}
          <Route path="/lostorfound" component={LostOrFound} />
          {/* <Route path="/maps" component={Maps} /> */}
          {/* <Route path="/upload" component={FileUpload} /> */}
          {/* <Route path="/pdf" component={pdfGenerator} /> */}
          <Route path="/home" component={Home} />
          <Route path="/whomtocontact" component={WhomToContact} />
          <Route path="/stolenpets" component={stolenpets} />
          {/* <Route path="/mapswithicon" component={mapswithicon} /> */}
        </div>
      </div>
    );
  }
}

export default Main;
