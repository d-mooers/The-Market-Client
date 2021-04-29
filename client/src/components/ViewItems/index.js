import React, { useState } from "react";
import { Grid, Divider, makeStyles } from "@material-ui/core";
import Map from "../shared/Map";
import SearchBar from "./SearchBar";
import { Filters, PriceSlider } from "./Filters";
import ItemList from "./ItemList";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: "2rem",
  },
  mapContainer: {
    width: "100%",
    height: "20rem",
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
  const theme = useTheme();
  const largeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const classes = useStyles();

  const map = (
    <Grid item className={classes.mapContainer}>
      <Map markers={listings.map((l) => l.lngLat)} />
    </Grid>
  );
  return (
    <div className={classes.root}>
      <Grid xs={12} container justify="center">
        <SearchBar />
      </Grid>
      <Grid
        container
        className={classes.container2}
        spacing={3}
        justify="center"
      >
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
            {map}
          </Grid>
        </Grid>
        <Grid container item xl={8} lg={9} md={9} sm={9}>
          <Grid item xl={7} lg={8} md={8} sm={8}>
            <ItemList items={listings} />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

const listings = [
  {
    title: "Bicycle",
    price: 100.29,
    desc:
      "Newly worked-on, mint bike!!!11!!11! Super awesome deal right here omg",
    lngLat: [-120.45, 35.38],
    imgUrl:
      "https://target.scene7.com/is/image/Target/GUEST_9251c93b-9ab1-42d4-beed-5f2ea738a131?fmt=webp&wid=1400&qlt=80",
    id: "asdbcs",
  },
  {
    title: "Bicycle",
    price: 100.29,
    desc:
      "Newly worked-on, mint bike!!!11!!11! Super awesome deal right here omg",
    lngLat: [-120.452, 35.37],
    imgUrl:
      "https://target.scene7.com/is/image/Target/GUEST_9251c93b-9ab1-42d4-beed-5f2ea738a131?fmt=webp&wid=1400&qlt=80",
    id: "asdbcs",
  },
  {
    title: "Bicycle",
    price: 100.29,
    desc:
      "Newly worked-on, mint bike!!!11!!11! Super awesome deal right here omg",
    lngLat: [-120.442, 35.383],
    imgUrl:
      "https://target.scene7.com/is/image/Target/GUEST_9251c93b-9ab1-42d4-beed-5f2ea738a131?fmt=webp&wid=1400&qlt=80",
    id: "asdbcs",
  },
  {
    title: "Bicycle",
    price: 100.29,
    desc:
      "Newly worked-on, mint bike!!!11!!11! Super awesome deal right here omg",
    lngLat: [-120.42, 35.38],
    imgUrl:
      "https://target.scene7.com/is/image/Target/GUEST_9251c93b-9ab1-42d4-beed-5f2ea738a131?fmt=webp&wid=1400&qlt=80",
    id: "asdbcs",
  },
  {
    title: "Bicycle",
    price: 100.29,
    desc:
      "Newly worked-on, mint bike!!!11!!11! Super awesome deal right here omg",
    lngLat: [-120.45, 35.38],
    imgUrl:
      "https://target.scene7.com/is/image/Target/GUEST_9251c93b-9ab1-42d4-beed-5f2ea738a131?fmt=webp&wid=1400&qlt=80",
    id: "asdbcs",
  },
  {
    title: "Bicycle",
    price: 100.29,
    desc:
      "Newly worked-on, mint bike!!!11!!11! Super awesome deal right here omg",
    lngLat: [-120.45, 35.3801],
    imgUrl:
      "https://target.scene7.com/is/image/Target/GUEST_9251c93b-9ab1-42d4-beed-5f2ea738a131?fmt=webp&wid=1400&qlt=80",
    id: "asdbcs",
  },
  {
    title: "Bicycle",
    price: 100.29,
    desc:
      "Newly worked-on, mint bike!!!11!!11! Super awesome deal right here omg",
    lngLat: [-120.45, 36.38],
    imgUrl:
      "https://target.scene7.com/is/image/Target/GUEST_9251c93b-9ab1-42d4-beed-5f2ea738a131?fmt=webp&wid=1400&qlt=80",
    id: "asdbcs",
  },
  {
    title: "Bicycle",
    price: 100.29,
    desc:
      "Newly worked-on, mint bike!!!11!!11! Super awesome deal right here omg",
    lngLat: [-120.851173, 35.370781],
    imgUrl:
      "https://target.scene7.com/is/image/Target/GUEST_9251c93b-9ab1-42d4-beed-5f2ea738a131?fmt=webp&wid=1400&qlt=80",
    id: "asdbcs",
  },
  {
    title: "Bicycle",
    price: 100.29,
    desc:
      "Newly worked-on, mint bike!!!11!!11! Super awesome deal right here omg",
    lngLat: [-120.45, 35.38],
    imgUrl:
      "https://target.scene7.com/is/image/Target/GUEST_9251c93b-9ab1-42d4-beed-5f2ea738a131?fmt=webp&wid=1400&qlt=80",
    id: "asdbcs",
  },
];

export default ViewItems;
