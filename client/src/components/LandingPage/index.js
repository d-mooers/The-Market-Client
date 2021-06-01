import React from "react";
import styled from "styled-components";
import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import UserContext from "../../UserContext";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import { green, orange } from "@material-ui/core/colors";
import logo from "../../assets/logo.png";
import "./animatedBackground.css";

//background-image: linear-gradient(#2196F3,#21CBF3);
//background-image: linear-gradient(#41b8ff,#001283);

const StyledText = styled.h1`
  background-image: linear-gradient(#2196f3, #21cbf3);

  font-size: 10rem;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;
  margin-left: 1rem;
  display: flex;
`;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  h1: {
    fontSize: "10.0rem",
    margin: 0,
  },
  container: {
    width: "min(1380px, 80%)",
    display: "flex",
    justifyContent: "space-between",
    padding: "2rem",
    background: "white",
    marginTop: "5rem",
    borderRadius: "1rem",
    boxShadow: `0 0 20px 0 ${theme.palette.accent1}, inset 0 0 5px 0 ${theme.palette.accent1}`,
    alignItems: "center",
    animation: "1s ease-in 0s 1 $appear",
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
  logo: {
    width: "30%",
    height: "auto",
    opacity: 0.9,
    borderRadius: "100%",
    transition: "all 1s linear",

    "&:hover": {
      boxShadow: "0 0 10px 10px " + theme.palette.accent1,
      transform: "rotate(720deg)",
    },
  },
  bouncyText: {
    margin: 0,
    padding: 0,
    background: `linear-gradient(${theme.palette.accent1}, ${theme.palette.accent2})`,
    fontSize: "10rem",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    transition: "all 0.2s linear",
    cursor: "default",
    fontStretch: "condensed",

    "&:hover": {
      animation: "0.2s linear 0s 1 $bounce",
      textShadow: "3px 3px " + theme.palette.accent1,
      fontStretch: "condensed",
    },
  },
  titleContainer: {
    display: "flex",
  },
  space: {
    width: "1.5rem",
  },
  "@keyframes bounce": {
    "0%": {
      transform: "translateY(0) scaleY(1) scaleX(1)",
    },
    "50%": {
      transform: "translateY(-10%) scaleY(1.5) scaleX(0.75)",
    },
    "0%": {
      transform: "translateY(0) scaleY(1) scaleX(1)",
    },
  },
  "@keyframes appear": {
    "0%": {
      opacity: 0,
    },
    "100%": {
      opacity: 1,
    },
  },
}));

const LandingPage = (props) => {
  const classes = useStyles();
  const { user } = React.useContext(UserContext);
  const numCircles = 40;
  return (
    <div className={classes.root}>
      <div className="background">
        {new Array(numCircles).fill(<span></span>, 0, numCircles)}
      </div>
      <div className={classes.container}>
        <div className={classes.titleContainer}>
          {"The Market"
            .split("")
            .map((s) =>
              s === " " ? (
                <div className={classes.space} />
              ) : (
                <h1 className={classes.bouncyText}>{s}</h1>
              )
            )}
        </div>
        <img src={logo} alt="Market Logo" className={classes.logo} />
      </div>

      <Grid
        container
        direction="row"
        justify="space-evenly"
        alignItems="center"
      >
        {!!user.authId ? (
          <>
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
            </Button>{" "}
          </>
        ) : (
          <Button
            className={classes.button}
            variant="contained"
            size="large"
            onClick={() => props.history.push("/login")}
          >
            Log in
          </Button>
        )}
      </Grid>
    </div>
  );
};

export default LandingPage;
