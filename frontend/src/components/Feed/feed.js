import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
// import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
// import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
// import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
// import MoreVertIcon from "@material-ui/icons/MoreVert";
import PropTypes from "prop-types";
import axios from "axios";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import FooterComponent from "../Footer/footer";
import backendServer from "../../webconfig";

import Box from "@material-ui/core/Box";
import { Redirect } from "react-router";
import PetLocation from "./petlocation";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import { Row, Col } from "antd";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useTabStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#CCD2D1", //tab content color
  },
}));

const userFeedStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 745,
    marginTop: "3%",
    backgroundColor: "#828282", //card color
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
}));

export default function Feed() {
  const classes = userFeedStyles();
  const [expanded, setExpanded] = useState(false);
  const [locations, setLocations] = useState(null);
  const [value, setValue] = useState([]);
  useEffect(() => {
    axios
      .post(backendServer + "/getLocations")
      .then((response) => {
        if (response.data.length > 0) {
          setLocations(response.data);
          let values = Array(response.data.length).fill(0);
          setValue(values);
        }
      })

      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const tabClasses = useTabStyles();

  const handleChange = (event, newValue) => {
    console.log(event.target.name);
    // console.log(val);
    console.log(newValue);
    let updatedValue = Object.assign(value);
    updatedValue[Number(newValue.split("-")[0])] = Number(
      newValue.split("-")[1]
    );
    console.log(updatedValue);
    setValue([...updatedValue]);
  };

  const onBookMarkClick = (event) => {
    window.alert(event.target);
  };
  const renderCard = () => {
    return (
      <>
        {localStorage.getItem("userProfile") ? "" : <Redirect to="/" />}
        {console.log(locations)}
        {locations
          ? locations.map((location, idx) => (
              <div style={{ marginLeft: "5%", marginRight: "5%" }}>
                <Card className={classes.root} elevation={15} key={location.id}>
                  <CardHeader
                    title={location.record_type + " - " + location.type}
                    subheader={location.missing_date}
                  />
                  {/* tabs starts from here */}
                  <div className={tabClasses.root}>
                    <AppBar position="static">
                      <Tabs
                        value={idx + "-" + value[idx]}
                        id={idx}
                        onChange={handleChange}
                        aria-label="simple tabs example"
                        style={{ background: "darkgrey" }}
                      >
                        <Tab
                          value={idx + "-" + 0}
                          label="Image"
                          {...a11yProps(0)}
                        />
                        <Tab
                          value={idx + "-" + 1}
                          label="Details"
                          {...a11yProps(1)}
                        />
                        <Tab
                          value={idx + "-" + 2}
                          label="Location"
                          {...a11yProps(2)}
                        />
                      </Tabs>
                    </AppBar>
                    <TabPanel value={value[idx]} index={0}>
                      <img
                        src={
                          "https://petgohome.s3-us-west-2.amazonaws.com/" +
                          location.image
                        }
                        alt="pet image"
                        width="350"
                        height="300"
                      ></img>
                    </TabPanel>
                    <TabPanel value={value[idx]} index={1}>
                      <div
                        style={{
                          fontFamily: "Sirin Stencil",
                          fontSize: "18px",
                        }}
                      >
                        <row style={{ width: "50px" }}>Record Type : </row>{" "}
                        {location.record_type}
                        <br></br>
                        Animal : {location.type}
                        <br></br>
                        Gender : {location.gender}
                        <br></br>
                        Date : {location.missing_date}
                      </div>
                    </TabPanel>
                    <TabPanel value={value[idx]} index={2}>
                      <div style={{ height: "40%" }}>
                        <PetLocation location={location} />
                      </div>
                    </TabPanel>
                  </div>

                  {/* tabs end here */}

                  <CardContent>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {location.record_type + " - " + "location"}
                      <br></br>

                      {location.location +
                        " (" +
                        location.latitude +
                        ", " +
                        location.longitude +
                        ")"}
                    </Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                      <BookmarkIcon />
                    </IconButton>
                    {/* <IconButton aria-label="share">
                      <ShareIcon />
                    </IconButton> */}
                    <IconButton
                      className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                      })}
                      onClick={handleExpandClick}
                      aria-expanded={expanded}
                      aria-label="show more"
                    >
                      <ExpandMoreIcon />
                    </IconButton>
                  </CardActions>
                  <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                      <Typography paragraph>Details</Typography>
                      <Typography paragraph>
                        Heat 1/2 cup of the broth in a pot until simmering, add
                        saffron and set aside for 10 minutes.
                      </Typography>
                      <Typography paragraph>
                        Heat oil in a (14- to 16-inch) paella pan or a large,
                        deep skillet over medium-high heat. Add chicken, shrimp
                        and chorizo, and cook, stirring occasionally until
                        lightly browned, 6 to 8 minutes. Transfer shrimp to a
                        large plate and set aside, leaving chicken and chorizo
                        in the pan. Add pimentón, bay leaves, garlic, tomatoes,
                        onion, salt and pepper, and cook, stirring often until
                        thickened and fragrant, about 10 minutes. Add saffron
                        broth and remaining 4 1/2 cups chicken broth; bring to a
                        boil.
                      </Typography>
                      <Typography paragraph>
                        Add rice and stir very gently to distribute. Top with
                        artichokes and peppers, and cook without stirring, until
                        most of the liquid is absorbed, 15 to 18 minutes. Reduce
                        heat to medium-low, add reserved shrimp and mussels,
                        tucking them down into the rice, and cook again without
                        stirring, until mussels have opened and rice is just
                        tender, 5 to 7 minutes more. (Discard any mussels that
                        don’t open.)
                      </Typography>
                      <Typography>
                        Set aside off of the heat to let rest for 10 minutes,
                        and then serve.
                      </Typography>
                    </CardContent>
                  </Collapse>
                </Card>
              </div>
            ))
          : ""}
      </>
    );
  };

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={3} sm={3}>
          test
        </Grid>
        <Grid item xs={9} sm={9}>
          {renderCard()}
        </Grid>
      </Grid>
    </div>
  );
}
