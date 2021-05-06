import React, { useState } from "react";
import "./Questions.css";
import { TextField, makeStyles } from "@material-ui/core";

const styles = makeStyles((theme) => ({
  textBox: {
    border: "1px solid grey",
    marginLeft: "10px",
    marginTop: "5px",
    width: "85%",
    backgroundColor: "rgb(240, 240, 240)",
    borderRadius: "10px",
  },
}));

const Questions = (props) => {
  const classes = styles();

  return (
    <div>
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
    </div>
  );
};

export default Questions;
