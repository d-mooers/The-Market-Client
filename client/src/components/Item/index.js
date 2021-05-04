import React, { useState, useEffect } from "react";
import { Grid, makeStyles } from "@material-ui/core";
import { getItem } from "../../utils/requests/items";
import Details from "./Details";
import Loading from "../shared/Loading";
import { StaticMap } from "../shared/Map";

const parseId = (path) => {
  const toks = path.split("/");
  if (toks.length !== 3) {
    console.log("Not sure what to do here");
    return null;
  }
  return toks[2];
};

const useStyles = makeStyles((theme) => ({
  image: {
    width: "min(100%, 30rem)",
    height: "auto",
    padding: 0,
  },
  leftPanel: {
    width: "min(100%, 30rem)",
  },
  root: {
    marginTop: "3rem",
  },
}));

const ItemView = (props) => {
  const id = parseId(props.location.pathname);
  const [item, setItem] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const classes = useStyles();
  const fetchItem = async () => {
    setLoading(true);
    const itm = await getItem(id);
    if (itm) {
      setItem(itm);
      setError(false);
    } else setError(true);
    setLoading(false);
  };

  error && console.log("F");

  useEffect(() => {
    fetchItem();
  }, []);
  return loading ? (
    <Loading />
  ) : (
    <Grid
      className={classes.root}
      container
      direction="column"
      wrap
      alignItems="center"
    >
      <Grid xs={10} item container direction="row" spacing={1}>
        <Grid
          item
          container
          direction="column"
          className={classes.leftPanel}
          xs={3}
        >
          <Grid item>
            <img src={item.imgUrl} className={classes.image} alt={item.title} />
          </Grid>
          <Grid item>
            <StaticMap lngLat={item.lngLat} />
          </Grid>
        </Grid>
        <Details xs={8} {...item} soldBy="Billy Bob" />
      </Grid>
    </Grid>
  );
};

export default ItemView;
