import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core";

const styles = makeStyles({
  textBox: {
    margin: 10,
    width: "80%",
  },
});

const InputField = ({
  handleChange,
  label,
  name,
  temp,
  errorFlag,
  helperText,
}) => {
  const classes = styles();
  return (
    <div>
      <TextField
        error={errorFlag}
        helperText={errorFlag ? helperText : ""}
        className={classes.textBox}
        type="text"
        variant="outlined"
        size="small"
        label={label}
        name={name}
        onChange={(e) => handleChange(e, temp)}
      />
    </div>
  );
};

export default InputField;
