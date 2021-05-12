import React, { useState } from "react";
import { Button } from "@material-ui/core";
import UserContext from "../../UserContext";
import Footer from "./Footer";
import InputField from "./InputField";
import "./Login.css";

// const [state name, function to update state]
// body = default state
const LoginPage = (props) => {
  const { user, setUser } = React.useContext(UserContext);
  const [temp, setTempUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  // called when user types into fields
  const handleChange = (e, temp) => {
    const { name, value } = e.target;
    console.log(name + " " + value);
    if (name === "username") {
      setTempUser({ ...temp, username: value });
    } else if (name === "email") {
      setTempUser({ ...temp, email: value });
    } else if (name === "password") {
      setTempUser({ ...temp, password: value });
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
    if (
      temp.username === "DummyUser" &&
      temp.email === "Dummy@yahoo.com" &&
      temp.password === "123"
    )
      return 0;

    if (temp.username.length === 0) {
      alert("Please enter a Username");
      console.log("Invalid Username");
      return -2;
    } else if (temp.email.length === 0) {
      alert("Please enter an Email");
      console.log("Invalid Email");
      return -2;
    } else if (temp.password.length === 0) {
      alert("Please enter a Password");
      console.log("Invalid Password");
      return -2;
    }
    return -1;
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
          />
          <InputField
            handleChange={handleChange}
            label={"Email"}
            name={"email"}
            temp={temp}
          />
          <InputField
            handleChange={handleChange}
            label={"Password"}
            name={"password"}
            temp={temp}
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
