import React, { useState } from "react";
import { Grid, Divider, makeStyles } from "@material-ui/core";
import Map from "../shared/Map";
import SearchBar from "./SearchBar";
import { Filters, PriceSlider } from "./Filters";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: "2rem",
  },
  mapContainer: {
    width: "100%",
    height: "15rem",
    marginTop: theme.spacing(1),
  },
  sideBar: {
    outline: "1px black solid",
    marginLeft: theme.spacing(1),
    position: "sticky",
    top: 0,
    left: 0,
  },
  container2: {
    marginTop: theme.spacing(3),
  },
}));

const ViewItems = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid xs={12} container justify="center">
        <SearchBar />
      </Grid>
      <Grid xs={12} container className={classes.container2}>
        <Grid
          container
          lg={1}
          md={3}
          sm={3}
          direction="column"
          className={classes.sideBar}
        >
          <Grid item>
            <Filters />
          </Grid>
          <Divider />
          <Grid item>
            <PriceSlider />
          </Grid>
          <Divider />
          <Grid item className={classes.mapContainer}>
            <Map markers={[]} />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default ViewItems;