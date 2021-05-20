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
import { CATEGORIES } from "../../utils/constants";
import ImageUploader from "react-images-upload";

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
  radioContainer: {
    display: "flex",
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
  categories: {
    marginRight: "2rem",
  },
}));

const Form = (props) => {
  const classes = useStyles();
  const { fields, setFields, image, getImage } = props;
  const updateText = (field, e) => {
    setFields({ ...fields, [field]: e.target.value });
    console.log(e.target.value);
  };

  const conditionRadios = (options) =>
    options.map((name) => (
      <div className={classes.radio}>
        <Radio
          key={`condition-${name}`}
          label={name}
          checked={!!fields && fields.condition === name}
          onChange={(e) => updateText("condition", e)}
          value={name}
        />
        {name}
      </div>
    ));

  const imgSrc = null; //URL.createObjectURL(image);

  const CategoryRadios = (props) =>
    props.categories.map((name) => (
      <div className={classes.radio} key={"category" + name}>
        <Radio
          label={name}
          checked={!!fields && fields.category === name}
          onChange={(e) => updateText("category", e)}
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
          value={!!fields && fields.title}
          onChange={(e) => updateText("title", e)}
          className={classes.title}
        />
        <FormControl fullWidth className={classes.price} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-amount">Price</InputLabel>
          <Input
            label="Price"
            value={!!fields && fields.price}
            onChange={(e) => updateText("price", e)}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            inputProps={{
              type: "number",
            }}
          />
        </FormControl>
      </div>
      <TextField
        label="Image URL"
        value={!!fields && fields.imgUrl}
        onChange={(e) => updateText("imgUrl", e)}
        fullWidth
      />
      <div>
        <img src={image} alt="Upload an image" />
        <ImageUploader
          withIcon={true}
          buttonText="Choose images"
          onChange={getImage}
          imgExtension={[".jpg", ".gif", ".png", ".gif"]}
          maxFileSize={5242880}
          singleImage
        />
      </div>
      <TextField
        label="Description"
        value={!!fields && fields.description}
        onChange={(e) => updateText("description", e)}
        multiline
        rows={7}
        variant="outlined"
        className={classes.description}
      />
      <div className={classes.radioContainer}>
        <div className={classes.categories}>
          <Typography variant="subtitle2">Category</Typography>
          <CategoryRadios categories={Object.keys(CATEGORIES)} />
        </div>

        <div>
          <Typography variant="subtitle2">Condition</Typography>
          {conditionRadios(["New", "Used", "Broken"])}
        </div>
      </div>
    </div>
  );
};

export default Form;
