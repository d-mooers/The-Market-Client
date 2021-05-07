import React, { useState } from "react";
import { Grid, Paper, makeStyles, Typography, Button } from "@material-ui/core";
import Form from "./Form";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    justifyContent: "center",
    width: "min(800px, 80%)",
    minHeight: "30rem",
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
  const [fields, setFields] = useState({
    title: "",
    price: "",
    description: "",
    image: "",
    condition: "",
  });
  const handleSubmit = () => {
    //axios.post(url, fields) ...
    console.log("User listed item for sale", fields);
    props.history.push("/");
  };
  const handleCancel = () => {
    props.history.goBack();
    //console.dir(props.history);
  };
  return (
    <Grid container alignItems="center" direction="column">
      <Typography variant="h3">List an Item</Typography>
      <Paper className={classes.paper}>
        <Form fields={fields} setFields={setFields} />
      </Paper>
      <div className={classes.buttonGroup}>
        <Button variant="contained" onClick={handleCancel}>
          Back
        </Button>
        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </Grid>
  );
};

export default ListItem;
