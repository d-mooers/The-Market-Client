import React, { useState } from "react";
import {
  Grid,
  TextField,
  Radio,
  makeStyles,
  InputAdornment,
  FormControl,
  InputLabel,
  Input,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "90%",
    display: "flex",
    flexDirection: "column",
    padding: "1rem",
  },
  container: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "1rem",
  },
  price: {
    width: "6rem",
  },
  title: {
    width: "80%",
  },
  description: {
    marginTop: "1rem",
    marginBottom: "1rem",
  },
  radio: {
    margin: 0,
  },
}));

const Form = (props) => {
  const classes = useStyles();
  const [fields, setFields] = useState({
    title: "",
    price: "",
    description: "",
    image: "",
    condition: "",
  });
  const updateText = (field, e) => {
    setFields({ ...fields, [field]: e.target.value });
    console.log(e.target.value);
  };

  const genRadios = (options) =>
    options.map((name) => (
      <div className={classes.radio}>
        <Radio
          key={`condition-${name}`}
          label={name}
          checked={fields.condition == name}
          onChange={(e) => updateText("condition", e)}
          value={name}
        />
        {name}
      </div>
    ));

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <TextField
          label="Title"
          value={fields.title}
          onChange={(e) => updateText("title", e)}
          className={classes.title}
        />
        <FormControl fullWidth className={classes.price} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-amount">Price</InputLabel>
          <Input
            label="Price"
            value={fields.price}
            onChange={(e) => updateText("price", e)}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            inputProps={{
              type: "number",
            }}
          />
        </FormControl>
      </div>
      <TextField
        label="Description"
        value={fields.description}
        onChange={(e) => updateText("description", e)}
        multiline
        rows={7}
        variant="outlined"
        className={classes.description}
      />
      <Typography variant="subtitle2">Condition</Typography>
      <div>{genRadios(["New", "Used", "Broken"])}</div>
    </div>
  );
};

export default Form;
