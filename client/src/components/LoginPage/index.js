import React, { useState } from "react";
import "./Login.css";
import { Button, Grid, makeStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Footer from "./Footer";

const styles = makeStyles((theme) => ({
  textBox: {
    margin: 10,
    width: "80%",
  },
}));

const LoginPage = (props) => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    secondPass: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "username") {
      setUser({
        username: value,
        email: user["email"],
        password: user["password"],
        secondPass: user["secondPass"],
      });
    } else if (name === "email") {
      setUser({
        username: user["username"],
        email: value,
        password: user["password"],
        secondPass: user["secondPass"],
      });
    } else if (name === "password") {
      setUser({
        username: user["username"],
        email: user["email"],
        password: value,
        secondPass: user["secondPass"],
      });
    }
  };

  function submitForm() {
    // Place stuff in here to add person to database
    console.log("Submitting");
    if (validateUser() === 0) {
      console.log("All good to add them to database and send them off");
    }
  }

  function validateUser() {
    console.log("User");
    if (user.username.length === 0) {
      alert("Please enter a Username");
      return -1;
    }
    return 0;
  }

  const classes = styles();

  return (
    <div>
      <h1 className="Title">Login</h1>
      <div className="box">
        <center>
          <h1>The Market</h1>
        </center>
        <form>
          <TextField
            className={classes.textBox}
            type="text"
            variant="outlined"
            size="small"
            label="Username"
            name="username"
            onChange={handleChange}
          />
          <br />

          <TextField
            className={classes.textBox}
            type="email"
            variant="outlined"
            size="small"
            label="Email"
            name="email"
            onChange={handleChange}
          />
          <br />

          <TextField
            className={classes.textBox}
            type="password"
            variant="outlined"
            size="small"
            label="Password"
            name="password"
            onChange={handleChange}
          />
          <br />
          <center>
            <Button variant="outlined" onClick={submitForm}>
              Submit
            </Button>
          </center>
        </form>
      </div>
      <Footer> </Footer>
    </div>
  );
};

export default LoginPage;
