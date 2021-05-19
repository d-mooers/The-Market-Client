import React, { useState } from "react";
import { Button } from "@material-ui/core";
import UserContext from "../../UserContext";
import Footer from "./Footer";
import InputField from "./InputField";
import "./Login.css";
import Dialog from "../shared/Dialog";
import axios from "axios";

const LoginPage = (props) => {
  const { user, setUser } = React.useContext(UserContext);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [error, setError] = useState(false);
  const [temp, setTempUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  // called when user types into fields
  // if any fields are red (error), remove them at this time
  // update temp user fields based on which field was typed into
  const handleChange = (e, temp) => {
    const { name, value } = e.target;
    if (name === "email") {
      setTempUser({ ...temp, email: value });
      setEmailError(false);
    } else if (name === "password") {
      // const passSave = value.hash();
      setTempUser({ ...temp, password: value });
      setPasswordError(false);
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
      console.log("Task failed :(");
      return e;
    }
  }

  // when user submits to login
  function submitForm() {
    console.log("Submitting...");
    const resp = validateUser();

    // successful GET /users from backend
    // set user and set route to main listing page
    if (resp === 200) {
      console.log("Successful Login credentials");
      props.history.push("/browse");
      temp.username = resp.data.username;
      setUser(temp);
    }
    // failed GET /users from backend
    // means incorrect credentials - Try again
    else if (resp === 401) {
      console.log("Invalid Credentials");
      setError(true);
    }
    // a field was left empty
    else if (resp === -1) {
      console.log("Empty Fields");
      setError(true);
    }
  }

  // references credentials with backend.
  // resp = 200 if successful, 401 if incorrect, and -1 if any are empty
  // any empty fields turn red
  async function validateUser() {
    let resp = await getUser(temp.email, temp.password);

    if (temp.email.length === 0) {
      console.log("Invalid Email");
      setError(true);
      setEmailError(true);
      resp = -1;
    }
    if (temp.password.length === 0) {
      if (resp !== -1) console.log("Invalid Password");
      setError(true);
      setPasswordError(true);
      resp = -1;
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
            label={"Email"}
            name={"email"}
            temp={temp}
            errorFlag={emailError}
            helperText={"Invalid Email"}
            type={"email"}
          />
          <InputField
            handleChange={handleChange}
            label={"Password"}
            name={"password"}
            temp={temp}
            errorFlag={passwordError}
            helperText={"Invalid Password"}
            type={"password"}
          />
          <Dialog
            title="Invalid Email or Password"
            description={`Invalid Login`}
            closeButtonText="Got It"
            onClose={() => setError(false)}
            onAccept={() => null}
            open={error}
          />
          <center>
            <Button variant="outlined" onClick={submitForm}>
              Log In
            </Button>
          </center>
        </form>
      </div>
      <Footer> </Footer>
    </div>
  );
};

export default LoginPage;
