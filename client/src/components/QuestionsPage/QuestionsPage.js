import React, { useState, useEffect } from "react";
import "./Questions.css";
import { StaticMap } from "../shared/Map";
import {
  Typography,
  Paper,
  Grid,
  TextField,
  makeStyles,
  Button,
  Box,
} from "@material-ui/core";
import { getItem } from "../../utils/requests/items";
import Loading from "../shared/Loading";
import Dialog from "../shared/Dialog";

const styles = makeStyles((theme) => ({
  textBox: {
    border: "1px solid grey",
    marginLeft: "10px",
    marginTop: "5px",
    width: "85%",
    backgroundColor: "rgb(240, 240, 240)",
    borderRadius: "10px",
  },

  root: {
    flexGrow: 1,
    marginTop: "3rem",
  },

  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    backgroundColor: "transparent",
    boxShadow: "none",
  },

  image: {
    width: "min(100%, 30rem)",
    height: "auto",
    padding: 0,
  },

  button: {
    backgroundColor: "pink",
    marginLeft: "30%",
  },

  buttonR: {
    backgroundColor: "pink", 
    marginLeft: "60%",
  }

}));

const parseId = (path) => {
  const toks = path.split("/");
  if (toks.length !== 3) {
    console.log("Not sure what to do here");
    return null;
  }
  return toks[2];
};

const DEFAULT_ITEM = {
  title: "",
  desc: "",
  lngLat: [0, 0],
  imgUrl: "",
  id: "",
};

const Questions = (props) => {
  const classes = styles();
  const id = parseId(props.location.pathname);
  const [item, setItem] = useState(DEFAULT_ITEM);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchItem = async () => {
    setLoading(true);
    const itm = await getItem(id);
    if (itm.success) {
      setItem(itm.item);
      setError(false);
    } else setError(true);
    setLoading(false);
  };

  useEffect(() => {
    fetchItem();
  }, []);

  return loading || error ? (
    <>
      <Dialog
        open={error}
        onClose={() => setError(false)}
        onAccept={fetchItem}
        title="Error Getting Item"
        buttonText="Retry"
        content="Unable to retrieve item details at this time"
      />

      <Loading />
    </>
  ) : (
    <div>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs>
            <Paper className={classes.paper}>
              <img
                src={item.imgUrl}
                className={classes.image}
                alt={item.title}
              />
            </Paper>
          </Grid>
          <Grid item xs={6} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="h6">
                  {item.title}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="subtitle1">Price: xxx</Typography>
                <Typography variant="subtitle1">Cost: xxx</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs>
            <StaticMap lngLat={item.lngLat} />
          </Grid>
        </Grid>
      </div>
      <div className="questionsBox">
        <TextField
          className={classes.textBox}
          id="subject-field"
          variant="outlined"
          placeholder="Subject"
        />
        <TextField
          className={classes.textBox}
          id="statement-field"
          multiline
          rows="8"
          variant="outlined"
          placeholder="Message Body"
        />
      </div>
      <Grid justify="space-between" container spacing={2}>
        <Grid item xs>
          <Button raised variant="outlined" className={classes.button}>
            Back
          </Button>
        </Grid>

        <Grid item xs>
          <Button variant="outlined" className={classes.buttonR}>
            Send
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default Questions;
