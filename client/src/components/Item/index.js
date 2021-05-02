import React, { useState, useEffect } from "react";
import { Grid, makeStyles } from "@material-ui/core";
import { getItem } from "../../utils/requests/items";

const parseId = (path) => {
  const toks = path.split("/");
  if (toks.length != 3) {
    console.log("Not sure what to do here");
    return null;
  }
  return toks[2];
};

const useStyles = makeStyles((theme) => ({
  image: {
    width: "100%",
    height: "100%",
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

  useEffect(() => {
    fetchItem();
  }, []);
  return (
    <Grid container direction="column">
      <Grid item container direction="row">
        <Grid item xs>
          <img src={item.imgUrl} className={classes.image} />
        </Grid>
        <Grid item xs container direction="column">
          <Grid item>{item.title}</Grid>
          <Grid item>{item.desc}</Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ItemView;
