import React from "react";
import styled from "styled-components";
import { Button, Grid, makeStyles } from "@material-ui/core";

const StyledText = styled.h1`
  background-image: linear-gradient(white, black);
  font-size: 10rem;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;
  margin-left: 1rem;
`;

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

var signedIn = false;

const LandingPage = (props) => {
  const classes = useStyles();
  if(signedIn == true)
  {
  return (
    <div className={classes.root}>
      <Grid xs={12} container justify="center">
        <StyledText>The Market</StyledText>
      </Grid>

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
          Buy
        </Button>
        <Button
          variant="contained"
          size="large"
          color="primary"
          className={classes.margin}
          onClick={() => props.history.push("/sell")}
        >
          Sell
        </Button>
        <Button
          variant="contained"
          size="large"
          color="primary"
          className={classes.margin}
          onClick={() => props.history.push("/profile")}
        >
          Profile
        </Button>
      </Grid>
    </div>
  );
}
  
  else
  {
    return (
      <div className={classes.root}>
        <Grid xs={12} container justify="center">
          <StyledText>The Market</StyledText>
        </Grid>
  
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
            onClick={signedIn = true}
            onClick={() => props.history.push("/")}
          >
            Log in
          </Button>
        </Grid>
      </div>
    );}
};

export default LandingPage;
