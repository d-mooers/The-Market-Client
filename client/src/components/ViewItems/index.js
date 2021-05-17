import React, { useState, useEffect } from "react";
import { Grid, Divider, makeStyles } from "@material-ui/core";
import Map from "../shared/Map";
import Loading from "../shared/Loading";
import Dialog from "../shared/Dialog";
import SearchBar from "./SearchBar";
import { Filters, PriceSlider } from "./Filters";
import ItemList from "./ItemList";
import { useTheme } from "@material-ui/core/styles";
import { getItems } from "../../utils/requests/items";

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
    boxShadow: "7px 6px 5px gray",
    position: "sticky",
    top: 0,
    left: 0,
  },
  container2: {
    marginTop: theme.spacing(3),
  },
}));

const filterListings = (listings, categories) => {
  if (categories.length === 0) return listings;
  return listings.filter((l) => categories.contains(l.category));
};

const ViewItems = (props) => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  //const theme = useTheme();
  //const largeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const classes = useStyles();
  const fetchItems = async () => {
    setLoading(true);
    const itms = await getItems();
    if (itms.success) {
      setListings(itms.listings);
      setError(false);
    } else setError(true);
    setLoading(false);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const goToItem = (id) => props.history.push(`/item/${id}`);

  const map = (
    <Grid item className={classes.mapContainer}>
      <Map markers={listings.map((l) => l.lngLat)} />
    </Grid>
  );
  return (
    <div className={classes.root}>
      <Dialog
        open={error}
        onClose={() => setError(false)}
        onAccept={fetchItems}
        title="Error Getting Items"
        buttonText="Retry"
        content="Unable to retrieve items at this time"
      />
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
          <Grid item xl={7} lg={9} md={9} sm={9}>
            {loading ? (
              <Loading />
            ) : (
              <ItemList items={listings} goToItem={goToItem} />
            )}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default ViewItems;
