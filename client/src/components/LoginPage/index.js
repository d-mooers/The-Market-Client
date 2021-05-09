import React, { useState } from "react";
import { Button, makeStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Footer from "./Footer";
import "./Login.css";

const styles = makeStyles({
  textBox: {
    margin: 10,
    width: "80%",
  },
});

// const [state name, function to update state]
// body = default state
const LoginPage = (props) => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  // called when user types into fields
  const handleChange = (e) => {
    const { inputType, value } = e.target;
    if (inputType === "username") {
      setUser({
        username: value,
        email: user["email"],
        password: user["password"],
      });
    } else if (inputType === "email") {
      setUser({
        username: user["username"],
        email: value,
        password: user["password"],
      });
    } else if (inputType === "password") {
      setUser({
        username: user["username"],
        email: user["email"],
        password: value,
      });
    }
  };

  function submitForm() {
    // check database for user
    // update user state code to search database
    console.log("Submitting");
    if (validateUser() === 0) {
      console.log("All good to add them to database and send them off");
    } else {
      alert("Invalid login");
    }
  }

  function validateUser() {
    // change to allow user to input username OR email to login
    // instead of both. Or just remove one
    console.log("User");
    if (user.username.length === 0) {
      alert("Please enter a Username");
      return -1;
    } else if (user.email.length === 0) {
      alert("Please enter an Email");
      return -1;
    } else if (user.password.length === 0) {
      alert("Please enter a Password");
    } // then if all fields are filled check if user exists
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
            inputType="username"
            onChange={handleChange}
          />
          <br />

          <TextField
            className={classes.textBox}
            type="email"
            variant="outlined"
            size="small"
            label="Email"
            inputType="email"
            onChange={handleChange}
          />
          <br />

          <TextField
            className={classes.textBox}
            type="password"
            variant="outlined"
            size="small"
            label="Password"
            inputType="password"
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
