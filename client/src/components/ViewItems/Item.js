import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { formatMoney, shortenString } from "../../utils/utils";

const useStyles = makeStyles({
  root: {
    maxWidth: "100%",
    borderRadius: "8%",
    "&:hover": { boxShadow: "7px 6px 5px gray" },
    maxHeight: 300,
  },
  media: {
    minHeight: 125,
    maxHeight: 140,
  },
});

export default function Item(props) {
  const classes = useStyles();
  const { title, price, desc, imgUrl, handleClick } = props;

  return (
    <Card className={classes.root}>
      <CardActionArea onClick={handleClick}>
        <CardMedia className={classes.media} image={imgUrl} title={title} />
        <CardContent>
          <Typography gutterBottom variant="h6">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {shortenString(desc, 75)}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          {formatMoney(price)}
        </Button>
      </CardActions>
    </Card>
  );
}
