import React, { useState } from "react";
import { Grid, Divider, makeStyles } from "@material-ui/core";
import Map from "../shared/Map";
import SearchBar from "./SearchBar";
import { Filters, PriceSlider } from "./Filters";
import ItemList from "./ItemList";

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

const listings = [
  {
    title: "Bicycle",
    price: 100.29,
    desc:
      "Newly worked-on, mint bike!!!11!!11! Super awesome deal right here omg",
    latLng: [35.38, -120.45],
    imgUrl:
      "https://target.scene7.com/is/image/Target/GUEST_9251c93b-9ab1-42d4-beed-5f2ea738a131?fmt=webp&wid=1400&qlt=80",
    id: "asdbcs",
  },
  {
    title: "Bicycle",
    price: 100.29,
    desc:
      "Newly worked-on, mint bike!!!11!!11! Super awesome deal right here omg",
    latLng: [35.38, -120.45],
    imgUrl:
      "https://target.scene7.com/is/image/Target/GUEST_9251c93b-9ab1-42d4-beed-5f2ea738a131?fmt=webp&wid=1400&qlt=80",
    id: "asdbcs",
  },
  {
    title: "Bicycle",
    price: 100.29,
    desc:
      "Newly worked-on, mint bike!!!11!!11! Super awesome deal right here omg",
    latLng: [35.38, -120.45],
    imgUrl:
      "https://target.scene7.com/is/image/Target/GUEST_9251c93b-9ab1-42d4-beed-5f2ea738a131?fmt=webp&wid=1400&qlt=80",
    id: "asdbcs",
  },
  {
    title: "Bicycle",
    price: 100.29,
    desc:
      "Newly worked-on, mint bike!!!11!!11! Super awesome deal right here omg",
    latLng: [35.38, -120.45],
    imgUrl:
      "https://target.scene7.com/is/image/Target/GUEST_9251c93b-9ab1-42d4-beed-5f2ea738a131?fmt=webp&wid=1400&qlt=80",
    id: "asdbcs",
  },
];

const ViewItems = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid xs={12} container justify="center">
        <SearchBar />
      </Grid>
      <Grid container className={classes.container2} spacing={3}>
        <Grid item xl={2} lg={3} md={3} sm={3}>
          <Grid container direction="column" className={classes.sideBar}>
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
        <Grid item lg={8} md={8} sm={8}>
          <ItemList items={listings} />
        </Grid>
      </Grid>
    </div>
  );
};

export default ViewItems;
