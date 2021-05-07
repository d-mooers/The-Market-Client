import React from "react";
import styled from "styled-components";
import { Button, Grid, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  h1: {
    fontSize: "10.0rem",
    margin: 0,
  },
  button: {
    marginTop: "10rem",
  },
}));

const LoginPage = (props) => {
  const classes = useStyles();
  return (
    <div>
      <Grid
        container
        direction="row"
        justify="space-evenly"
        alignItems="center"
        className={classes.button}
      >
        <Button
          variant="contained"
          size="large"
          color="primary"
          className={classes.margin}
          onClick={() => props.history.push("/browse")}
        >
          Login
        </Button>
        <Button
          variant="contained"
          size="large"
          color="primary"
          className={classes.margin}
          onClick={() => console.log("Sell was clicked")}
        >
          Register
        </Button>
        <Button
          variant="contained"
          size="large"
          color="primary"
          className={classes.margin}
          onClick={() => props.history.push("/profile")}
        >
          Cancel
        </Button>
      </Grid>
    </div>
  );
};

export default LoginPage;
