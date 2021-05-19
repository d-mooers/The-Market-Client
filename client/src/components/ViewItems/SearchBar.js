import React, { useState } from "react";
import { Grid, TextField, Button, makeStyles } from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
  centeredItem: {
    display: "flex",
    alignItems: "center",
  },
  button: {
    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 40,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
}));

const SearchBar = (props) => {
  const classes = useStyle();
  const [search, setSearch] = useState("");
  const handleInput = (e) => setSearch(e.target.value);
  const submitSearch = () => {
    console.log("User searched for " + search);
    setSearch("");
  };
  return (
    <Grid container xs={8} spacing={2}>
      <Grid item xs={10}>
        <TextField
          id="outlined-full-width"
          label={!!search && "Search for an item"}
          style={{ margin: 8 }}
          placeholder="Search for an item..."
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleInput}
          value={search}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={2} justify="center" className={classes.centeredItem}>
        <Button onClick={submitSearch} className={classes.button}>Search</Button>
      </Grid>
    </Grid>
  );
};

export default SearchBar;
