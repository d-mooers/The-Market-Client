import React, { useState } from "react";
import {
  Grid,
  TextField,
  Button,
  makeStyles,
  Typography,
} from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
  centeredItem: {
    display: "flex",
    alignItems: "center",
  },
  clearSearch: {
    color: "red",
    marginLeft: "1rem",
    cursor: "pointer",
  },
}));

const SearchBar = (props) => {
  const { onSubmit, clearSearch, showClear } = props;
  const classes = useStyle();
  const [search, setSearch] = useState("");
  const handleInput = (e) => setSearch(e.target.value);
  const submitSearch = () => {
    onSubmit(search);
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
        {showClear && (
          <Typography className={classes.clearSearch} onClick={clearSearch}>
            Clear Search
          </Typography>
        )}
      </Grid>
      <Grid item xs={2} justify="center" className={classes.centeredItem}>
        <Button onClick={submitSearch}>Search</Button>
      </Grid>
    </Grid>
  );
};

export default SearchBar;
