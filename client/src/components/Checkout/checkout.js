import React, { useState, useEffect } from "react";
import { StaticMap } from "../shared/Map";
import { Typography, Paper, Grid, makeStyles, Button } from "@material-ui/core";
import Details from "./Details";

const styles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: "3rem",
  },

  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    backgroundColor: "transparent",
    boxShadow: "none",
  },

  image: {
    width: "min(100%, 30rem)",
    height: "auto",
    padding: 0,
  },

  payment: {
    textAlign: "right",
  },

  button: {
    backgroundColor: "pink",
    marginLeft: "30%",
  },

  buttonR: {
    backgroundColor: "pink",
    marginLeft: "60%",
  },
}));

function submitForm() {
  window.location.href="/profile";
}

function goBack() {
  window.location.href="/browse";
}

const DEFAULT_ITEM = {
  title: "",
  desc: "",
  lngLat: [0, 0],
  imgUrl: "",
  id: "",
};

const Checkout = (props) => {
  const classes = styles();
  const [item, setItem] = useState(DEFAULT_ITEM);

  return (
    <div>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs>
            <Paper className={classes.paper}>
              <img
                src={item.imgUrl}
                className={classes.image}
                alt={item.title}
              />
            </Paper>
          </Grid>
          <Grid item xs>
            <StaticMap lngLat={item.lngLat} />
          </Grid>
        </Grid>
      </div>
      <div className="questionsBox">
        <Details xs={8} {...item} soldBy="Billy Bob" />
      </div>
      <Grid justify="space-between" container spacing={2}>
        <Grid item xs>
          <Button
            raised
            variant="outlined"
            className={classes.button}
            onClick={goBack}
          >
            Back
          </Button>
        </Grid>

        <Grid item xs>
          <Button
            variant="outlined"
            className={classes.buttonR}
            onClick={submitForm}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default Checkout;
