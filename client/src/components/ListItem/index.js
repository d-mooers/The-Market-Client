import React, { useState } from "react";
import { Grid, Paper, makeStyles, Typography, Button } from "@material-ui/core";
import Form from "./Form";
import { postItem } from "../../utils/requests/items";
import Dialog from "../shared/Dialog";
import { formatAuth } from "../../utils/utils";
import UserContext from "../../UserContext";
import styled from "styled-components";

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
  button: {
    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 40,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgb(0 121 255 / 30%)',
  },
}));

const StyledText = styled.h1`
  background-image: linear-gradient(#2196F3,#21CBF3);
  font-size: 2.5rem;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;
  margin-left: 1rem;
`;

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
    const listing = { ...fields, lngLat: await getPosition() };
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
        <Typography variant="h3">
          <StyledText>List an item</StyledText>
        </Typography>
        <Paper className={classes.paper}>
          <Form fields={fields} setFields={setFields} />
        </Paper>
        <div className={classes.buttonGroup}>
          <Button className={classes.button} onClick={handleCancel}>
            Back
          </Button>
          <Button className={classes.button} onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </Grid>
    </>
  );
};

export default ListItem;
