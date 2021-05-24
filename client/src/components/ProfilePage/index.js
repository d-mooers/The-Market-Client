import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core";
import { makeStyles, Grid } from "@material-ui/core";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import UserContext from "../../UserContext";
import { getUserItems } from "../../utils/requests/items";
import ItemList from "../ViewItems/ItemList";
import Loading from "../shared/Loading";
import styled from "styled-components";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  button: {
    marginLeft: "45rem",
    marginBottom: "3rem",
  },
}));

const Accordion = withStyles({
  root: {
    border: "1px solid rgba(0, 0, 0, .125)",
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "auto",
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: "rgba(0, 0, 0, .03)",
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    marginBottom: -1,
    minHeight: 56,
    "&$expanded": {
      minHeight: 56,
    },
  },
  content: {
    "&$expanded": {
      margin: "12px 0",
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiAccordionDetails);

const ProfilePage = (props) => {
  const [expanded, setExpanded] = React.useState("panel1");
  const { user } = React.useContext(UserContext);

  if (!user.authId) {
    props.history.push("/login");
  }

  const classes = useStyles();

  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchItems = async () => {
    setLoading(true);
    const itms = await getUserItems(user._id);
    if (itms.success) {
      setListings(itms.listings);
      setError(false);
    } else setError(true);
    setLoading(false);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const StyledText = styled.h1`
    background-image: linear-gradient(#2196f3, #21cbf3);
    font-size: 2.5rem;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin: 0;
    margin-left: 1rem;
  `;

  const goToItem = (id) => props.history.push(`/item/${id}`);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  //if user has no listings
  if (listings.length == 0) {
    return (
      <div>
        <Accordion
          square
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <Typography>Username</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{user.username}</Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          square
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
        >
          <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
            <Typography>Email</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{user.email}</Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          square
          expanded={expanded === "panel3"}
          onChange={handleChange("panel3")}
        >
          <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
            <Typography>Password</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{user.password}</Typography>
          </AccordionDetails>
        </Accordion>

        <h1 className="Title">
          <StyledText>You have no items up for sale</StyledText>
        </h1>

        <Button
          className={classes.button}
          variant="contained"
          color="secondary"
          onClick={() => {
            user.username = "";
            user.email = "";
            user.password = "";
            user._id = "";
            user.authId = "";
            user.loggedIn = false;
            props.history.push("/login");
          }}
        >
          LOG OUT
        </Button>
      </div>
    );
  }
  //if user has at least 1 listing
  else {
    return (
      <div>
        <Accordion
          square
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <Typography>Username</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{user.username}</Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          square
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
        >
          <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
            <Typography>Email</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{user.email}</Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          square
          expanded={expanded === "panel3"}
          onChange={handleChange("panel3")}
        >
          <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
            <Typography>Password</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{user.password}</Typography>
          </AccordionDetails>
        </Accordion>
        <h1 className="Title">
          <StyledText>Your listed items</StyledText>
        </h1>

        <Grid item xl={7} lg={9} md={9} sm={9}>
          {loading ? (
            <Loading />
          ) : (
            <ItemList items={listings} goToItem={goToItem} />
          )}
        </Grid>

        <Button
          className={classes.button}
          variant="contained"
          color="secondary"
          onClick={() => {
            user.username = "";
            user.email = "";
            user.password = "";
            user._id = "";
            user.authId = "";
            user.loggedIn = false;
            props.history.push("/login");
          }}
        >
          LOG OUT
        </Button>
      </div>
    );
  }
};

export default ProfilePage;
