import React, { useState } from "react";
import { Button } from "@material-ui/core";
import UserContext from "../../UserContext";
import Footer from "./Footer";
import InputField from "./InputField";
import "./Login.css";
import Dialog from "../shared/Dialog";
import axios from "axios";

// const [state name, function to update state]
// body = default state
const LoginPage = (props) => {
  const { user, setUser } = React.useContext(UserContext);
  const [usernameError, setUsernameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [error, setError] = useState(false);
  const [temp, setTempUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  // called when user types into fields
  const handleChange = (e, temp) => {
    const { name, value } = e.target;
    if (name === "username") {
      setTempUser({ ...temp, username: value });
      setUsernameError(false);
    } else if (name === "email") {
      setTempUser({ ...temp, email: value });
      setEmailError(false);
    } else if (name === "password") {
      // const passSave = value.hash();
      setTempUser({ ...temp, password: value });
      setPasswordError(false);
    }
  };

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
      console.log("Task failed :(");
      return e;
    }
  }

  function submitForm() {
    console.log("Submitting");
    const resp = validateUser();

    if (resp === 200) {
      console.log("Successful Login credentials");
      props.history.push("/browse");
      setUser(temp);
    } else if (resp === -1) {
      console.log("Invalid Credentials");
      setError(true);
    }
  }

  // checks InputFields and raises errors if incorrect or empty
  // if empty -> Dialog
  async function validateUser() {
    //const resp = -1;
    // if (
    //   temp.username === "DummyUser" &&
    //   temp.email === "Dummy@yahoo.com" &&
    //   temp.password === "123"
    // )
    //   return 0;

    console.log(temp);
    let resp = await getUser(temp.email, temp.password);
    console.log(resp);

    if (temp.username.length === 0) {
      setError(true);
      setUsernameError(true);

      console.log("Invalid Username");
      resp = -2;
    }
    if (temp.email.length === 0) {
      if (resp !== -2) setError(true);
      setEmailError(true);

      console.log("Invalid Email");
      resp = -2;
    }
    if (temp.password.length === 0) {
      if (resp !== -2) setError(true);
      setPasswordError(true);

      console.log("Invalid Password");
      resp = -2;
    }
    return resp;
  }

  return (
    <div>
      <h1 className="Title">Login</h1>
      <div className="box">
        <center>
          <h1>The Market</h1>
        </center>
        <form>
          <InputField
            handleChange={handleChange}
            label={"Username"}
            name={"username"}
            temp={temp}
            errorFlag={usernameError}
            helperText={"Invalid Username"}
          />
          <InputField
            handleChange={handleChange}
            label={"Email"}
            name={"email"}
            temp={temp}
            errorFlag={emailError}
            helperText={"Invalid Email"}
          />
          <InputField
            handleChange={handleChange}
            label={"Password"}
            name={"password"}
            temp={temp}
            errorFlag={passwordError}
            helperText={"Invalid Password"}
          />
          <Dialog
            title="Invalid Username or Password"
            description={`Invalid Login`}
            closeButtonText="Got It"
            onClose={() => setError(false)}
            onAccept={() => null}
            open={error}
          />
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
