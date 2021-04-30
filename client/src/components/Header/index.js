import React from "react";
import styled from "styled-components";
import {
  ButtonGroup,
  Button,
  Grid,
  makeStyles,
  Divider,
} from "@material-ui/core";

const StyledText = styled.h1`
  background-image: linear-gradient(white, black);
  font-size: 2.5rem;
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
    fontSize: "2.5rem",
    margin: 0,
  },
  buttonGroup: {
    maxHeight: "5rem",
  },
}));

const Header = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container justify="space-between" align-items="center" spacing={0}>
        <Grid item xs={3} alignItems="flex-end">
          <StyledText onClick={() => props.history.push("/")}>
            The Market
          </StyledText>
        </Grid>
        <Grid
          container
          xs={2}
          xl={1}
          alignItems="center"
          className={classes.buttonGroup}
        >
          <ButtonGroup size="small" aria-label="website router">
            <Button onClick={() => props.history.push("/browse")}>Buy</Button>
            <Button onClick={() => console.log("Sell was clicked")}>
              Sell
            </Button>
            <Button onClick={() => console.log("Profile was clicked")}>
              Profile
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
      <Divider />
    </div>
  );
};

// (
//     <Container>
//       <h1 onClick={() => props.history.push("/")}>The Market</h1>
//       <ButtonGroup size="small" aria-label="website router">
//         <Button onClick={() => console.log("Buy was clicked")}>Buy</Button>
//         <Button onClick={() => console.log("Sell was clicked")}>Sell</Button>
//         <Button onClick={() => console.log("Profile was clicked")}>
//           Profile
//         </Button>
//       </ButtonGroup>
//     </Container>
//   );

export default Header;
