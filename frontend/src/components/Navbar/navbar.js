import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
// import AppBar from "@material-ui/core/AppBar";
// import Toolbar from "@material-ui/core/Toolbar";
// import Button from "@material-ui/core/Button";
// import IconButton from "@material-ui/core/IconButton";
// import { Route, Redirect, Link } from "react-router-dom";
// import { Row, Col } from "antd";
// import MenuIcon from "@material-ui/icons/Menu";
// import LandingPage from "../LandingPage/landingpage";
import p4 from "../../Icons/p4.webp";
// import { Card } from "antd";
import "./footer.css";
import { Link } from "react-router-dom";
import LandingPage from "./../landingPage/landingPage";
import "./navbar.css";
// import { Row, Col } from "react-bootstrap";

class Navbar extends Component {
  // constructor(props) {
  //   super(props);

  // }
  state = {
    classes: makeStyles((theme) => ({
      root: {
        flexGrow: 1,
      },
      menuButton: {
        marginRight: theme.spacing(2),
      },
      title: {
        flexGrow: 1,
      },
    })),
    redirect: null,
  };

  render() {
    console.log(this.props);
    console.log(this.state);
    return (
      // <div>
      <div
        style={{
          display: "block",
          height: "100px",
          width: "100%",
        }}
      >
        <div
          id="navSticky"
          style={{
            position: "fixed",
            width: "100%",
            backgroundColor: "#fff",
            padding: "5px 5%",
            zIndex: "5",
            transition: "0.3s all ease",
            boxShadow: "0px 1px 10px -5px #777",
          }}
        >
          <div className="row">
            <div className="col-5">
              <Link
                style={{
                  color: "black",
                  fontWeight: "800",
                  fontFamily: "Georgia, serif",
                  display: "flex",
                }}
                to="/home"
              >
                <div style={{ fontFamily: "Sirin Stencil", fontSize: "28px" }}>
                  PetGoHome
                </div>
                <img
                  src={p4}
                  style={{
                    width: "45px",
                    height: "45px",
                    marginLeft: "7px",
                  }}
                  alt=""
                ></img>
              </Link>
            </div>
            <div
              className="col-7"
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              {localStorage.getItem("userProfile") ? (
                <>
                  <div className="navbar-buttons">
                    <Link
                      className="navbar-links"
                      style={{
                        color: "black",
                        fontWeight: "540",
                        fontFamily: "Georgia, serif",
                      }}
                      to="/home"
                    >
                      Home
                    </Link>
                  </div>
                  <div className="navbar-buttons" style={{ width: "205px" }}>
                    <Link
                      className="navbar-links"
                      style={{
                        color: "black",
                        fontWeight: "540",
                        fontFamily: "Georgia, serif",
                      }}
                      to="/lostorfound"
                    >
                      I Found Or Lost a Pet
                    </Link>
                  </div>
                  <div className="navbar-buttons">
                    <Link
                      className="navbar-links"
                      style={{
                        color: "black",
                        fontWeight: "540",
                        fontFamily: "Georgia, serif",
                      }}
                      to="/whomtocontact"
                    >
                      Contact
                    </Link>
                  </div>
                  <div className="navbar-buttons">
                    <Link
                      className="navbar-links"
                      style={{
                        color: "black",
                        fontWeight: "540",
                        fontFamily: "Georgia, serif",
                      }}
                      to="/stolenpets"
                    >
                      Stolen Pets
                    </Link>
                  </div>
                </>
              ) : (
                ""
              )}
              {localStorage.getItem("userProfile") ? (
                <div className="navbar-buttons">
                  <Link
                    className="navbar-links"
                    style={{
                      color: "black",
                      fontWeight: "540",
                      fontFamily: "Georgia, serif",
                      border: "2px solid #555",
                      borderRadius: "10px",
                      marginLeft: "10px",
                    }}
                    to="/"
                    onClick={() => {
                      localStorage.clear();
                    }}
                  >
                    Log Out
                  </Link>
                </div>
              ) : (
                <div className="navbar-buttons">
                  <Link
                    className="navbar-links"
                    style={{
                      color: "black",
                      fontWeight: "540",
                      fontFamily: "Georgia, serif",
                      border: "2px solid #555",
                      borderRadius: "10px",
                    }}
                    to="/login"
                  >
                    Login
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* </Toolbar>
        </AppBar> */}
        {this.props.location.pathname === "/" ? <LandingPage /> : ""}
      </div>
      // </div>
    );
  }
}

export default Navbar;
