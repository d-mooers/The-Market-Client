import React, { useState } from "react";
import "./Register.css";
import { Button, makeStyles, TextField } from "@material-ui/core";
import Dialog from "../shared/Dialog";
import LoginPage from "../LoginPage";
import axios from "axios";
import sha256 from "js-sha256";
import styled from "styled-components";
import UserContext from "../../UserContext";

const styles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  textBox: {
    margin: 10,
    width: "80%",
  },
  button: {
    background: `linear-gradient(45deg, ${theme.palette.accent1} 30%, ${theme.palette.accent2} 90%)`,
    borderRadius: 3,
    border: 0,
    color: "white",
    height: 40,
    padding: "0 30px",
    "&:hover": {
      opacity: 0.75,
      transtion: "all 1s ease-in-out",
      boxShadow: "0 3px 5px 2px rgb(0 121 255 / 30%)",
    },
  },
  styledText: {
    background: `linear-gradient(${theme.palette.accent1}, ${theme.palette.accent2})`,
    fontSize: "2.5rem",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    margin: "0",
    marginLeft: "auto",
    marginRight: "auto",
  },
}));

const Register = (props) => {
  const [userError, setUserError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [error, setError] = useState(false);
  const [user, setUserInfo] = useState({
    username: "",
    email: "",
    password: "",
    secondPass: "",
  });

  const { setUser } = React.useContext(UserContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "username") {
      setUserInfo({
        username: value,
        email: user["email"],
        password: user["password"],
        secondPass: user["secondPass"],
      });
      setUserError(false);
    } else if (name === "email") {
      setUserInfo({
        username: user["username"],
        email: value,
        password: user["password"],
        secondPass: user["secondPass"],
      });
      setEmailError(false);
    } else if (name === "password") {
      setUserInfo({
        username: user["username"],
        email: user["email"],
        password: value,
        secondPass: user["secondPass"],
      });
      setPasswordError(false);
    } else if (name === "secondPass") {
      setUserInfo({
        username: user["username"],
        email: user["email"],
        password: user["password"],
        secondPass: value,
      });
      setPasswordError(false);
    }
  };

  const submitForm = async () => {
    // Place stuff in here to add person to database
    var validUser = validateUser();
    var validEmail = validateEmail();
    var validPassword = validatePassword();
    if (validUser === 0 && validEmail === 0 && validPassword === 0) {
      let resp = await getUser(user.email, user.password);
      console.log("resp value: " + resp.response.status);
      // resp.status == 200 means something was there
      // resp.status == 401 means the credentials were not taken
      if (resp.response.status === 200) {
        console.log("Invalid credentials");
        setError(true);
      } else if (resp.response.status === 401) {
        const newUser = await axios.post("http://127.0.0.1:5000/users", {
          username: user.username,
          password: sha256(user.password),
          email: user.email,
        });
        setUser(newUser.data);
        props.history.push("/browse");
      }
    } else {
      console.log("Bad field(s)");
      setError(true);
    }
  };

  // does a GET /users call with temp's saved credentials
  async function getUser(emailID, passwordID) {
    try {
      const resp = await axios.get("http://127.0.0.1:5000/users", {
        auth: {
          username: emailID,
          password: passwordID,
        },
      });

      // Query went through successfully
      return resp;
    } catch (e) {
      console.log("Log in failed");
      return e;
    }
  }

  function validateUser() {
    if (user.username.length === 0) {
      setUserError(true);
      setError(true);
      return -1;
    }
    return 0;
  }

  function validateEmail() {
    if (
      !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        user.email
      )
    ) {
      setEmailError(true);
      setError(true);
      return -1;
    }
    return 0;
  }

  function validatePassword() {
    if (user.password.length < 7 || user.password !== user.secondPass) {
      setPasswordError(true);
      setError(true);
      return -1;
    }
    return 0;
  }

  const classes = styles();

  // Make sure to insert proper href link in the button
  // Make sure to place proper link going into the login page in the href
  return (
    <div className={classes.root}>
      <h1 className={classes.styledText}>Register</h1>
      <div className="box">
        <center>
          <h1>
            <h1 className={classes.styledText}>The Market</h1>
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
            error={userError}
            helperText={userError ? "Invalid Username" : ""}
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
            error={emailError}
            helperText={emailError ? "Invalid Email" : ""}
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
            error={passwordError}
            helperText={
              passwordError
                ? "Please check that passwords match and are longer than 7 characters"
                : ""
            }
            onChange={handleChange}
          />
          <br />

          <TextField
            className={classes.textBox}
            type="password"
            variant="outlined"
            size="small"
            label="Confirm Password"
            name="secondPass"
            error={passwordError}
            onChange={handleChange}
          />
          <Dialog
            title="Invalid Registration Info"
            description={`Invalid Registration`}
            closeButtonText="Close"
            onClose={() => setError(false)}
            onAccept={() => null}
            open={error}
          />
          <br />
          <br />

          <center>
            <Button className={classes.button} onClick={submitForm}>
              Submit
            </Button>
          </center>
        </form>
      </div>
      <p className="Log_in">
        Already registered? <a href="/login">Log in</a>
      </p>
    </div>
  );
};

export default Register;
