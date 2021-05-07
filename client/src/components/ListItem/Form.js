import React, { useState } from "react";
import { Grid, TextField, Radio, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "90%",
    display: "flex",
    flexDirection: "column",
  },
  title: {
    width: "max",
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
      <>
        <Radio
          key={`condition-${name}`}
          label={name}
          checked={fields.condition == name}
          onChange={(e) => updateText("condition", e)}
          value={name}
        />
        {name}
      </>
    ));

  return (
    <div className={classes.root}>
      <TextField
        label="Title"
        value={fields.title}
        onChange={(e) => updateText("title", e)}
      />
      <TextField
        label="Price"
        value={fields.price}
        onChange={(e) => updateText("price", e)}
      />
      <label>Description</label>
      <textarea
        label="Description"
        value={fields.description}
        onChange={(e) => updateText("description", e)}
        rows={7}
      >
        {fields.description}
      </textarea>
      <div>{genRadios(["New", "Used", "Broken"])}</div>
    </div>
  );
};

export default Form;
