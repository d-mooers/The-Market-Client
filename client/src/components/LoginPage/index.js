import React, { useState } from "react";
import { Button, makeStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import styled from "styled-components";
import Footer from "./Footer";
import "./Login.css";

const styles = makeStyles({
  textBox: {
    margin: 10,
    width: "80%",
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
});

const StyledText = styled.h1`
  background-image: linear-gradient(#2196F3,#21CBF3);
  font-size: 2.5rem;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;
  margin-left: 1rem;
`;

// const [state name, function to update state]
// body = default state
const LoginPage = (props) => {
  const [user, setTempUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  // called when user types into fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "username") {
      setTempUser({
        username: value,
        email: user["email"],
        password: user["password"],
      });
    } else if (name === "email") {
      setTempUser({
        username: user["username"],
        email: value,
        password: user["password"],
      });
    } else if (name === "password") {
      setTempUser({
        username: user["username"],
        email: user["email"],
        password: value,
      });
    }
  };

  function submitForm() {
    console.log("Submitting");
    const resp = validateUser();

    if (resp === 0) {
      console.log("Successful Login credentials");
      props.history.push("/browse");
    } else if (resp === -1) {
      alert("Invalid login");
    }
  }

  function validateUser() {
    // potentially change to allow username OR email
    // change to check database
    if (
      user.username === "DummyUser" &&
      user.email === "Dummy@yahoo.com" &&
      user.password == "Password123"
    )
      return 0;

    if (user.username.length === 0) {
      alert("Please enter a Username");
      return -2;
    } else if (user.email.length === 0) {
      alert("Please enter an Email");
      return -2;
    } else if (user.password.length === 0) {
      alert("Please enter a Password");
      return -2;
    }
    return -1;
  }

  const classes = styles();

  return (
    <div>
      <h1 className="Title">
        <StyledText>Login</StyledText>
      </h1>
      <div className="box">
        <center>
          <h1>        
            <StyledText>The Market</StyledText>
          </h1>
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
            <Button variant="outlined" onClick={submitForm} className={classes.button}>
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
