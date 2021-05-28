import React from "react";
import { Button, Grid, makeStyles } from "@material-ui/core";
import UserContext from "../../UserContext";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  h1: {
    fontSize: "10.0rem",
    margin: 0,
  },
  button: {
    background: `linear-gradient(45deg, ${theme.palette.accent1} 30%, ${theme.palette.accent2} 90%)`,
    borderRadius: 3,
    border: 0,
    color: "white",
    height: 48,
    padding: "0 30px",
    boxShadow: "0 3px 5px 2px rgb(0 121 255 / 30%)",
    marginTop: "11.25rem",
  },
  styledText: {
    background: `linear-gradient(${theme.palette.accent1}, ${theme.palette.accent2})`,
    fontSize: "10rem",
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: '0',
    marginLeft: '1rem',
  },
}));

const LandingPage = (props) => {
  const classes = useStyles();
  console.log(classes)
  const { user } = React.useContext(UserContext);

  if (!!user.authId) {
    return (
      <div className={classes.root}>
        <Grid xs={12} container justify="center">
          <h1 className={classes.styledText}>The Market</h1>
        </Grid>

        <Grid
          container
          direction="row"
          justify="space-evenly"
          alignItems="center"
        >
          <Button
            variant="contained"
            size="large"
            color="primary"
            className={classes.button}
            onClick={() => props.history.push("/browse")}
          >
            Buy
          </Button>
          <Button
            variant="contained"
            size="large"
            color="primary"
            className={classes.button}
            onClick={() => props.history.push("/sell")}
          >
            Sell
          </Button>
          <Button
            variant="contained"
            size="large"
            color="primary"
            className={classes.button}
            onClick={() => props.history.push("/profile")}
          >
            Profile
          </Button>
        </Grid>
      </div>
    );
  } else {
    return (
      <div className={classes.root}>
        <Grid xs={12} container justify="center">
          <h1 className={classes.styledText}>The Market</h1>
        </Grid>

        <Grid
          container
          direction="row"
          justify="space-evenly"
          alignItems="center"
        >
          <Button
            className={classes.button}
            variant="contained"
            size="large"
            onClick={() => props.history.push("/login")}
          >
            Log in
          </Button>
        </Grid>
      </div>
    );
  }
};

export default LandingPage;

