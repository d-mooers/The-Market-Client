import React, { useState } from "react";
import { Grid, makeStyles, Typography, Divider } from "@material-ui/core";
import Message from "./Message";

const messages = {
  subject: "Test messages",
  messages: [
    {
      from: "1234",
      message: "Hi there",
      date: "2021-05-20",
    },
    {
      from: "5678",
      message: "Hello!",
      date: "2021-05-21",
    },
    {
      from: "1234",
      message: "What is up?",
      date: "2021-05-23",
    },
  ],
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "min(1280px, 80%)",
    marginRight: "auto",
    marginLeft: "auto",
  },
}));

const Messages = (props) => {
  const user = {
    _id: "1234",
  };
  return (
    <Grid container xs={12} justify="center">
      <Grid container item xs={9} justify="center" spacing={1}>
        <Grid item container xs={12} justify="center">
          <Typography variant="h3">Subject: {messages.subject}</Typography>
          <div style={{ width: "100%", height: "1px", background: "black" }} />
        </Grid>
        {messages.messages.map((m) => (
          <Grid item xs={8}>
            <Message
              from={m.from === user._id ? "You" : m.from}
              message={m.message}
            />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default Messages;
