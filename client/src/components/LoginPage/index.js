import React, { useState } from "react";
import { Button } from "@material-ui/core";
import UserContext from "../../UserContext";
import Footer from "./Footer";
import InputField from "./InputField";
import "./Login.css";
import Dialog from "../shared/Dialog";

// const [state name, function to update state]
// body = default state
const LoginPage = (props) => {
  const { user, setUser } = React.useContext(UserContext);
  const [usernameError, setUsernameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
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
      setTempUser({ ...temp, password: value });
      setPasswordError(false);
    }
    console.log(temp);
  };

  function submitForm() {
    console.log("Submitting");
    const resp = validateUser();

    if (resp === 0) {
      console.log("Successful Login credentials");
      props.history.push("/browse");
      // user.username = temp.username;
      setUser(temp);
    } else if (resp === -1) {
      alert("Invalid login");
    }
  }

  function validateUser() {
    // potentially change to allow username OR email
    // change to check database

    var resp = -1;
    if (
      temp.username === "DummyUser" &&
      temp.email === "Dummy@yahoo.com" &&
      temp.password === "123"
    )
      return 0;

    if (temp.username.length === 0) {
      console.log("Invalid Username");
      setError(true);
      setUsernameError(true);
      resp = -2;
    }
    if (temp.email.length === 0) {
      if (resp !== -2) setError(true);
      console.log("Invalid Email");
      setEmailError(true);
      resp = -2;
    }
    if (temp.password.length === 0) {
      if (resp !== -2) setError(true);
      console.log("Invalid Password");

      setPasswordError(true);
      resp = -2;
    }
    return resp;
  }

  const [error, setError] = useState(false);

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
            title="An error has occured"
            description={`Invalid Login`}
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
