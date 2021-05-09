import React, { Component } from "react";
import "antd/dist/antd.css";
// import { Image } from "antd";
// import homeIcon from "../../Icons/p2.png";
import { Row } from "antd";
// import { Input } from "antd";
// import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
// import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import AccountCircle from "@material-ui/icons/AccountCircle";
import LockIcon from "@material-ui/icons/Lock";
import Button from "@material-ui/core/Button";
// import Icon from "@material-ui/core/Icon";
// import GoogleLogin from "react-google-login";
import axios from "axios";
import backendServer from "../../webconfig";
// import Divider from "@material-ui/core/Divider";
// import { useHistory } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null,
      username: null,
      showemail: false,
    };
  }
  // button = makeStyles((theme) => ({
  //   button: {
  //     margin: theme.spacing(1),
  //   },
  // }));

  // showGoogleSignIn = () => {
  //   return (
  //     <>
  //       <Row
  //         gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
  //         style={{
  //           marginTop: "5%",
  //           textAlign: "center",
  //           justifyContent: "center",
  //         }}
  //       >
  //         <h2 className="appSubHeadings">Sign in with your google account </h2>
  //       </Row>
  //       <Row
  //         style={{
  //           width: "200px",
  //           fontSize: "x-large",
  //           justifyContent: "flex-end",
  //           marginLeft: "30px",
  //           marginTop: "10%",
  //         }}
  //       >
  //         <GoogleLogin
  //           clientId="363955406428-i39idmlthf9itoi52qbdsm9l2e2kif8l.apps.googleusercontent.com"
  //           buttonText="Google Login"
  //           onSuccess={this.responseGoogle}
  //           onFailure={this.responseGoogle}
  //           cookiePolicy={"single_host_origin"}
  //         />
  //       </Row>
  //     </>
  //   );
  // };

  signIn = () => {
    if (this.state.email && this.state.password) {
      let data = {
        email: this.state.email,
        password: this.state.password,
      };
      axios
        .post(backendServer + "/admin/signin", data)
        .then((response) => {
          // console.log(response);
          if (response.status === 200) {
            // sessionStorage.setItem("loggedInType", "admin");
            // sessionStorage.setItem("id", response.data._id);
            localStorage.setItem("userProfile", JSON.stringify(response.data));
            this.props.history.push("/home");
          }
        })
        .catch((err) => {
          window.alert("wrong credentials");
          console.log(err);
        });
    }
  };

  signUp = () => {
    if (this.state.email && this.state.password && this.state.username) {
      let data = {
        username: this.state.username,
        password: this.state.password,
        email: this.state.email,
      };
      axios
        .post(backendServer + "/admin/signup", data)
        .then((response) => {
          if (response.status === 200) {
            // window.alert("Sign up complete");
            localStorage.setItem("userProfile", JSON.stringify(response.data));
            this.props.history.push("/home");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  showSignInContent = () => {
    return (
      <>
        {/* {JSON.stringify(this.state)} */}
        <Row
          gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
          style={{ marginTop: "5%", textAlign: "center" }}
        >
          <h2 className="appSubHeadings">
            Sign in with your username and password
          </h2>
        </Row>
        {this.state.showemail ? (
          <>
            <Grid container xs={12} spacing={1} alignItems="center">
              <Grid item>
                <AccountCircle />
              </Grid>
              <Grid item>
                <TextField
                  id="outlined-basic"
                  label="Username"
                  variant="outlined"
                  style={{ width: "30ch" }}
                  onChange={(e) => {
                    this.setState({ username: e.target.value });
                    // setUsername(e.target.value);
                  }}
                />
              </Grid>
            </Grid>
          </>
        ) : (
          ""
        )}

        <br></br>
        <Grid container xs={12} spacing={1} alignItems="center">
          <Grid item>
            <AccountCircle />
          </Grid>
          <Grid item>
            <TextField
              id="outlined-basic"
              label="Email Id"
              style={{ width: "30ch" }}
              variant="outlined"
              onChange={(e) => {
                this.setState({ email: e.target.value });
                // setEmailId(e.target.value);
              }}
            />
          </Grid>
        </Grid>

        <br></br>
        <Grid container spacing={1} alignItems="center">
          <Grid item>
            <LockIcon />
          </Grid>
          <Grid item>
            <TextField
              id="outlined-basic"
              label="Password"
              style={{ width: "30ch" }}
              type="password"
              onChange={(e) => {
                this.setState({ password: e.target.value });
                // setPassword(e.target.value);
              }}
              variant="outlined"
            />
          </Grid>
        </Grid>
        <Grid
          container
          xs={12}
          spacing={1}
          style={{ marginTop: "7%", justifyContent: "center" }}
        >
          {this.state.showemail ? (
            <Button
              variant="contained"
              color="primary"
              onClick={this.signUp}
              // className={this.button.button}
            >
              Sign Up
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={this.signIn}
              // className={this.button.button}
            >
              Sign In
            </Button>
          )}
        </Grid>
        <Grid container style={{ marginTop: "5%", justifyContent: "center" }}>
          {!this.state.showemail
            ? "Need an Account?"
            : "Already Have an Account! "}
          <span
            style={{
              textDecoration: "Underline",
              color: "blue",
              marginLeft: "0.2%",
              cursor: "pointer",
            }}
            onClick={() => {
              this.setState({
                email: "",
                showemail: !this.state.showemail,
              });
              // setEmailId("");
            }}
          >
            {!this.state.showemail ? " Sign Up" : " Sign In"}
          </span>
        </Grid>
      </>
    );
  };
  // responseGoogle = (response) => {
  //   console.log(response);
  // };

  render() {
    console.log(this.state);
    return (
      <>
        <div style={{ width: "50%", margin: "auto" }}>
          {this.showSignInContent()}
        </div>
        <div className="row">
          <div className="col">Login</div>
          <div className="col"></div>
        </div>
      </>
    );
  }
}

export default Login;
