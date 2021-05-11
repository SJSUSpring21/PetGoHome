import React from "react";
// import TextField from "@material-ui/core/TextField";
// import { makeStyles } from "@material-ui/core/styles";
// import Checkbox from "@material-ui/core/Checkbox";
// import MenuItem from "@material-ui/core/MenuItem";
// import ToggleButton from "@material-ui/lab/ToggleButton";
// import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
// import Paper from "@material-ui/core/Paper";
// import Grid from "@material-ui/core/Grid";
// import { Row } from "antd";
// import DateRangeIcon from "@material-ui/icons/DateRange";
// import EmailIcon from "@material-ui/icons/Email";
// import PhoneIcon from "@material-ui/icons/Phone";
// import StreetviewIcon from "@material-ui/icons/Streetview";
// import PetsIcon from "@material-ui/icons/Pets";
// import DetailsIcon from "@material-ui/icons/Details";
// import PhoneAndroidIcon from "@material-ui/icons/PhoneAndroid";
// import { Carousel } from "antd";
import "antd/dist/antd.css";
// import Reunion1 from "../../Icons/Reunion1.jpeg";
// import Reunion2 from "../../Icons/Reunion2.jpeg";
// import Reunion3 from "../../Icons/Reunion3.jpeg";
// import Reunion4 from "../../Icons/Reunion4.jpeg";
// import Reunion6 from "../../Icons/Reunion6.jpeg";
// import FileUpload from "../Upload/upload";
import "./lostOrFound.css";
// import GoogleMap from "../GoogleMaps/GoogleMap";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
// import { Redirect } from "react-router";
import { Component } from "react";
import {
  Col,
  Form,
  Row,
  ButtonGroup,
  ToggleButton,
  // InputGroup,
  Button,
} from "react-bootstrap";
// import { FormControl } from "@material-ui/core";
// import { ButtonGroup } from "@material-ui/core";

// // Image Carousel
// const contentStyle = {
//   height: "350px",
//   color: "#fff",
//   lineHeight: "160px",
//   width: "60%",
//   textAlign: "center",
//   background: "#FFFFFF",
//   marginLeft: "20%",
//   marginTop: "1%",
// };

// const petReportTypes = [
//   {
//     value: "Lost",
//     label: "Lost",
//   },
//   {
//     value: "Sighting",
//     label: "Sighting",
//   },
//   {
//     value: "Found",
//     label: "Found",
//   },
//   {
//     value: "Found Deceased",
//     label: "Found Deceased",
//   },
// ];

// const useStyles = makeStyles((theme) => ({
//   root: {
//     "& .MuiTextField-root": {
//       margin: theme.spacing(1),
//       width: "25ch",
//     },
//   },

//   textField: {
//     marginLeft: theme.spacing(1),
//     marginRight: theme.spacing(1),
//     width: "30ch",
//   },
// }));

// const useGridStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//   },
//   paper: {
//     padding: theme.spacing(3),
//     textAlign: "left",
//     color: theme.palette.text.secondary,
//   },
// }));

// // const DropdownStyles = makeStyles((theme) => ({
// //   root: {
// //     "& .MuiTextField-root": {
// //       margin: theme.spacing(1),
// //       width: "25ch",
// //     },
// //   },
// // }));

// export default function Home(props) {
//   const classes = useStyles();
//   const [checked, setChecked] = React.useState(false);
//   const [ButtonGroup, setButtonGroup] = React.useState("left");
//   const GridStyles = useGridStyles();

//   const handleBtnGroup = (event, newButtonGroup) => {
//     setButtonGroup(newButtonGroup);
//   };

//   // const Dropdown = DropdownStyles();
//   const [ReportType, setReportType] = React.useState("EUR");

//   const handleDropDownChange = (event) => {
//     setReportType(event.target.value);
//   };

//   const handleChange = (event) => {
//     setChecked(event.target.checked);
//   };

//   const displayImages = () => {
//     let images = [Reunion1, Reunion6, Reunion3, Reunion4];
//     // let htmlCode = [];
//     return (
//       <>
//         {localStorage.getItem("userProfile") ? "" : <Redirect to="/" />}
//         <Paper elevation={10} style={contentStyle} justify="center">
//           <Carousel autoplay effect="fade">
//             {images.map((img) => {
//               return (
//                 <div>
//                   <img
//                     src={img}
//                     style={{
//                       width: "100%",
//                       height: "350px",
//                     }}
//                     alt=""
//                   ></img>
//                 </div>
//               );
//             })}
//           </Carousel>
//         </Paper>
//       </>
//     );
//   };

//   // const carouselText = () => {
//   //   return (
//   //     <>
//   //       <Carousel autoplay effect="fade">
//   //         <div>This is just a text</div>
//   //       </Carousel>
//   //     </>
//   //   );
//   // };

class LostOrFound extends Component {
  constructor(props) {
    super(props);
    this.state = {
      radios: [
        { name: "Dog", value: "Dog" },
        { name: "Cat", value: "Cat" },
        { name: "Bird", value: "Bird" },
        { name: "Rabbit", value: "Rabbit" },
        { name: "Reptile", value: "Reptile" },
        { name: "Pig", value: "Pig" },
        { name: "Other", value: "Other" },
      ],
      petname: null,
      ownername: null,
      email: null,
      mobile: null,
      reporttype: null,
      date: null,
      pettype: null,
      description: null,
      picture: null,
      selected: null,
      address: "",
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      mapCenter: {
        lat: 37.3352,
        lng: -121.8811,
      },
    };
  }

  handleChange = (address) => {
    this.setState({ address });
  };

  handleSelect = (address) => {
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        this.setState({ address });
        console.log("Success", latLng);
        this.setState({ mapCenter: latLng });
      })
      .catch((error) => console.error("Error", error));
  };

  submitDetails = async () => {
    // window.alert("button clicked");
  };

  render() {
    const googlemap = (
      <div id="googleMap">
        <div
          style={{
            position: "absolute",
            top: "0",
            width: "100%",
            zIndex: "1",
          }}
        >
          <PlacesAutocomplete
            value={this.state.address}
            onChange={this.handleChange}
            onSelect={this.handleSelect}
          >
            {({
              getInputProps,
              suggestions,
              getSuggestionItemProps,
              loading,
            }) => (
              <div>
                <input
                  style={{
                    width: "100%",
                    border: "1px solid #888",
                    borderRadius: "5px",
                    padding: "5px",
                  }}
                  {...getInputProps({
                    placeholder: "Search Places ...",
                    className: "location-search-input",
                  })}
                />
                <div className="autocomplete-dropdown-container">
                  {loading && <div>Loading...</div>}
                  {suggestions.map((suggestion) => {
                    const className = suggestion.active
                      ? "suggestion-item--active"
                      : "suggestion-item";
                    // inline style for demonstration purpose
                    const style = suggestion.active
                      ? { backgroundColor: "#fafafa", cursor: "pointer" }
                      : { backgroundColor: "#ffffff", cursor: "pointer" };
                    return (
                      <div
                        {...getSuggestionItemProps(suggestion, {
                          className,
                          style,
                        })}
                      >
                        <span>{suggestion.description}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </PlacesAutocomplete>
        </div>
        <Map
          style={{
            marginTop: "40px",
            borderRadius: "5px",
            border: "1px solid #999",
          }}
          google={this.props.google}
          initialCenter={{
            lat: this.state.mapCenter.lat,
            lng: this.state.mapCenter.lng,
          }}
          center={{
            lat: this.state.mapCenter.lat,
            lng: this.state.mapCenter.lng,
          }}
        >
          <Marker
            position={{
              lat: this.state.mapCenter.lat,
              lng: this.state.mapCenter.lng,
            }}
          />
        </Map>
      </div>
    );
    return (
      <div style={{ paddingBottom: "100px" }}>
        {JSON.stringify(this.state)}
        <div
          className="lostFound"
          style={{
            padding: "50px 100px",
            width: "80%",
            margin: " 20px auto",
            boxShadow: "20px 20px 60px #bebebe, -20px -20px 60px #ffffff",
          }}
        >
          <div
            style={{
              textAlign: "center",
              fontSize: "32px",
              fontWeight: "700",
              marginBottom: "30px",
            }}
          >
            Enter the details of your pet
          </div>
          <Form>
            <Row style={{ margin: "0" }}>
              <Col>
                <label>Enter your petname</label>
                <Form.Control
                  type="text"
                  placeholder="pet name"
                  onChange={(e) => {
                    this.setState({ petname: e.target.value });
                  }}
                />
              </Col>
              <Col>
                <label>Enter your Name</label>
                <Form.Control
                  type="text"
                  placeholder="name"
                  onChange={(e) => {
                    this.setState({ ownername: e.target.value });
                  }}
                />
              </Col>
            </Row>
            <Row style={{ margin: "0" }}>
              <Col>
                <label>Enter your Email address</label>
                <Form.Control
                  type="text"
                  placeholder="email"
                  onChange={(e) => {
                    this.setState({ email: e.target.value });
                  }}
                />
              </Col>
              <Col>
                <label>Enter your Mobile Number</label>
                <Form.Control
                  type="number"
                  placeholder="Mobile"
                  onChange={(e) => {
                    this.setState({ number: e.target.value });
                  }}
                />
              </Col>
            </Row>
            <Row style={{ margin: "0" }}>
              <Col>
                <label>Report Type</label>
                <Form.Control
                  as="select"
                  defaultValue="Choose..."
                  onChange={(e) => {
                    this.setState({ reporttype: e.target.value });
                  }}
                >
                  <option>Choose...</option>
                  <option>Lost</option>
                  <option>Found</option>
                  <option>Sighted</option>
                  <option>Stolen</option>
                </Form.Control>
              </Col>
              <Col>
                <label>Date</label>
                <Form.Control
                  type="date"
                  placeholder="Lost Date"
                  onChange={(e) => {
                    this.setState({ date: e.target.value });
                  }}
                />
              </Col>
            </Row>
            <Row style={{ margin: "0", justifyContent: "center" }}>
              <Col
                xs={9}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    textAlign: "center",
                    color: "#555",
                    marginBottom: "10px",
                  }}
                >
                  Select the type of you pet
                </div>
                <ButtonGroup toggle>
                  {this.state.radios.map((radio, idx) => (
                    <ToggleButton
                      key={idx}
                      type="radio"
                      variant="secondary"
                      name="radio"
                      value={radio.value}
                      checked={this.state.pettype === radio.value}
                      onChange={(e) =>
                        this.setState({ pettype: e.currentTarget.value })
                      }
                    >
                      <div
                        style={{ display: "inline-block", marginLeft: "10px" }}
                      >
                        {radio.name}
                      </div>
                    </ToggleButton>
                  ))}
                </ButtonGroup>
              </Col>
            </Row>
            <Row style={{ justifyContent: "center" }}>
              <Col xs={9}>
                <div
                  style={{
                    textAlign: "center",
                    color: "#555",
                    marginBottom: "10px",
                  }}
                >
                  Description about your pet
                </div>
                <div style={{ padding: "0 22px" }}>
                  <textarea
                    rows="5"
                    style={{
                      width: "100%",
                      borderRadius: "10px",
                      border: "1px solid #ddd",
                    }}
                    onChange={(e) => {
                      this.setState({ description: e.target.value });
                    }}
                  ></textarea>
                </div>
              </Col>
            </Row>
            <Row style={{ justifyContent: "center", textAlign: "center" }}>
              <Col xs={6}>
                <div>Upload a picture</div>
                <div
                  style={{
                    width: "300px",
                    height: "300px",
                    color: "#000",
                    border: "1px solid #bbb",
                    margin: "auto",
                    borderRadius: "5px",
                    marginBottom: "10px",
                    marginTop: "10px",
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
                  {this.state.picture ? (
                    <img
                      src={
                        "https://petgohome.s3-us-west-2.amazonaws.com/" +
                        this.state.picture
                      }
                      style={{ maxWidth: "100%", maxHeight: "100%" }}
                      alt=""
                    />
                  ) : (
                    <span style={{ color: "#fff" }}>.</span>
                  )}
                </div>
                <div>
                  <Form.File id="formcheck-api-regular">
                    <Form.File.Input style={{ width: "50%" }} />
                  </Form.File>
                </div>
              </Col>
              <Col
                xs={6}
                style={{
                  position: "relative",
                  justifyContent: "center",
                  display: "flex",
                }}
              >
                <div>Location where you have lost or found a pet.</div>
                <div
                  style={{
                    width: "300px",
                    height: "300px",
                    position: "absolute",
                    top: "8%",
                    color: "#000",
                    margin: "auto",
                    // border: "1px solid #bbb",
                  }}
                >
                  {googlemap}
                </div>
                <div></div>
              </Col>
            </Row>
            <Row style={{ justifyContent: "center" }}>
              <Col xs={3} style={{ display: "flex", justifyContent: "center" }}>
                <Button
                  variant="secondary"
                  onClick={() => {
                    this.submitDetails();
                  }}
                >
                  Submit Details
                </Button>{" "}
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDKT5mLiGAU26aO5yCoHbQwHVOX2W5JHp0",
})(LostOrFound);
