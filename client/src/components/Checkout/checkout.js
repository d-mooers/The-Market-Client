import React, { useState, useEffect } from "react";
import { StaticMap } from "../shared/Map";
import { Typography, Paper, Grid, makeStyles, Button } from "@material-ui/core";

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

const Checkout = (props) => {
  const classes = styles();

  return (
    <div>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs>
            <Paper className={classes.paper}>
              <img />
            </Paper>
          </Grid>
          <Grid item xs={6} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="h6">
                  Name of Item!!!
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="subtitle1">Price: xxx</Typography>
                <Typography variant="subtitle1">Cost: xxx</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs>
            {/* Map goes here */}
          </Grid>
        </Grid>
      </div>
      <div className="questionsBox">
        <Typography variant="h5" className={classes.payment}>
          Payment Info
        </Typography>
        <Typography variant="subtitle1">
          Info goes here... Grabbed from database?
        </Typography>
      </div>
      <Grid justify="space-between" container spacing={2}>
        <Grid item xs>
          <Button raised variant="outlined" className={classes.button} onClick={goBack}>
            Back
          </Button>
        </Grid>

        <Grid item xs>
          <Button variant="outlined" className={classes.buttonR} onClick={submitForm}>
            Submit
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default Checkout;
