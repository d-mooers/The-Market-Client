import React from "react";
import styled from "styled-components";
import { Button, Grid, makeStyles } from "@material-ui/core";
import UserContext from "../../UserContext";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import { green, orange } from "@material-ui/core/colors";

//background-image: linear-gradient(#2196F3,#21CBF3);
//background-image: linear-gradient(#41b8ff,#001283);

const StyledText = styled.h1`
  background-image: linear-gradient(#2196f3, #21cbf3);

  font-size: 10rem;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;
  margin-left: 1rem;
`;

/*
const theme1 = createMuiTheme({
  palette: {
    primary: {
      main: '#2196F3',
      mainGradient: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
    },
  },
}); */

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
}));

const LandingPage = (props) => {
  const classes = useStyles();
  const { user } = React.useContext(UserContext);

  if (!!user.authId) {
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
          <StyledText>The Market</StyledText>
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
            //color = "primary"
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

