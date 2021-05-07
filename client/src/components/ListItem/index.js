import React from "react";
import {
  Grid,
  TextField,
  Paper,
  makeStyles,
  Typography,
  Button,
} from "@material-ui/core";
import Form from "./Form";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    justifyContent: "center",
    width: "min(800px, 80%)",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "space-around",
    width: "min(800px, 80%)",
    marginTop: "1rem",
  },
}));

const ListItem = (props) => {
  const classes = useStyles();
  return (
    <Grid container alignItems="center" direction="column">
      <Typography variant="h3">List an Item</Typography>
      <Paper className={classes.paper}>
        <Form />
      </Paper>
      <div className={classes.buttonGroup}>
        <Button variant="contained" onClick={() => console.log("Cancel")}>
          Back
        </Button>
        <Button variant="contained" onClick={() => console.log("Confirmed!")}>
          Submit
        </Button>
      </div>
    </Grid>
  );
};

export default ListItem;
