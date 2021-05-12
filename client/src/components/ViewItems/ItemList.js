import React from "react";
import { Grid } from "@material-ui/core";
import Item from "./Item";

const ItemList = (props) => {
  return (
    <Grid container wrap="wrap" spacing={2}>
      {props.items.map((itm, i) => (
        <Grid item xl={3} lg={3} md={4} sm={5}>
          <Item
            {...itm}
            key={`itm-${i}`}
            handleClick={() => props.goToItem(itm._id)}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default ItemList;
