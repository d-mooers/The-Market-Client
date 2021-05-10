import React from "react";
import { withStyles } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import LandingPage from "../LandingPage";
import UserContext from "../../UserContext";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  button: {
    marginTop: "3rem",
    marginLeft: "45rem",
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
  // console.log(user);
  const classes = useStyles();
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
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

      <Button
        className={classes.button}
        variant="contained"
        color="secondary"
        onClick={console.log("Log out was pushed")}
        onClick={() => props.history.push("/login")}
      >
        LOG OUT
      </Button>
    </div>
  );
};

// const user = {
//   username: "DummyBuyer",
//   email: "DummyBuyer101@aol.com",
//   password: "BadPassword",
//   _id: "asdbcs",
// };

export default ProfilePage;
