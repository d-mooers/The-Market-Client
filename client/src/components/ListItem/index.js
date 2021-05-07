import React, { useState } from "react";
import { Grid, Paper, makeStyles, Typography, Button } from "@material-ui/core";
import Form from "./Form";
import { postItem } from "../../utils/requests/items";

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
    imgUrl: "",
    condition: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [itemId, setItemId] = useState("");

  const getPosition = () => {
    if (!"geolocation" in navigator) {
      console.log("Geolocation not available");
      return [0, 0];
    }
    return navigator.geolocation.getCurrentPosition((pos) => [
      pos.coords.longitude,
      pos.coords.latitude,
    ]);
  };

  const handleSubmit = async () => {
    const listing = { ...fields, lngLat: getPosition() };
    setLoading(true);
    const resp = await postItem(listing);
    if (resp.success) {
      setItemId(resp.id);
      setError(false);
    } else setError(true);
    setLoading(false);
  };

  const handleCancel = () => {
    props.history.goBack();
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
