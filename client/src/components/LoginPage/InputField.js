import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core";

const styles = makeStyles({
  textBox: {
    margin: 10,
    width: "80%",
  },
});

const InputField = ({ handleChange }) => {
  const classes = styles();
  return (
    <div>
      <TextField
        className={classes.textBox}
        type="text"
        variant="outlined"
        size="small"
        label="Username"
        name="username"
        onChange={handleChange}
      />
    </div>
  );
};

export default InputField;
