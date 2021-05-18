import React, { useState } from "react";
import { Grid, Paper, makeStyles, Typography, Button } from "@material-ui/core";
import Form from "./Form";
import { postItem } from "../../utils/requests/items";
import Dialog from "../shared/Dialog";
import { formatAuth } from "../../utils/utils";
import UserContext from "../../UserContext";

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
    category: "",
    tags: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [itemId, setItemId] = useState("");
  const { user } = React.useContext(UserContext);

  const getCoords = () =>
    new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });

  const getPosition = async () => {
    if (!"geolocation" in navigator) {
      console.log("Geolocation not available");
      return [0, 0];
    }
    let position;
    await getCoords().then((pos) => {
      console.log(pos);
      position = [pos.coords.longitude, pos.coords.latitude];
    });
    return position;
  };

  const handleSubmit = async () => {
    // First format tags as a set
    const tagsAsSet = fields.tags.split(",").map((s) => s.trim());
    // Create a listing object with the tags and user position
    const listing = {
      ...fields,
      tags: tagsAsSet,
      lngLat: await getPosition(),
    };
    console.log(listing);
    setLoading(true);
    setError(false);
    const resp = await postItem(listing, formatAuth(user._id, user.authId));
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
    <>
      <Dialog
        title="Item Listed"
        description={`Your item, ${fields.title}, has been successfully listed`}
        onClose={() => props.history.push("/")}
        onAccept={() => props.history.push(`item/${itemId}`)}
        buttonText="Go to Item Page"
        open={itemId != ""}
      />
      <Dialog
        title="An error has occured"
        description={`Your item, ${fields.title}, has failed to be listed`}
        onClose={() => setError(false)}
        onAccept={handleSubmit}
        buttonText="Try Again"
        open={error}
      />
      <Dialog
        title="Loading"
        description={"Shuffling some shelves to list your item..."}
        onClose={() => null}
        onAccept={() => null}
        buttonText="This button will do nothing"
        open={loading}
      />

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
    </>
  );
};

export default ListItem;
