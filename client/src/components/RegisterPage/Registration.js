import React, { useState } from "react";
import "./Register.css";
import {
    Button,
    makeStyles,
    TextField,
} from "@material-ui/core";

const styles = makeStyles((theme) => ({
    textBox: {
        margin: 10,
        width: '80%',
    },
}));

const RegisterPage = (props) => {
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
        secondPass: "",
    })

    const handleChange = e => {
        const { name, value } = e.target
        if (name === "username") {
            setUser({
                username: value,
                email: user["email"],
                password: user["password"],
                secondPass: user["secondPass"],
            });
        }
        else if (name === "email") {
            setUser({
                username: user["username"],
                email: value,
                password: user["password"],
                secondPass: user["secondPass"],
            });
        }
        else if (name === "password") {
            setUser({
                username: user["username"],
                email: user["email"],
                password: value,
                secondPass: user["secondPass"],
            });
        }
        else if (name === "secondPass") {
            setUser({
                username: user["username"],
                email: user["email"],
                password: user["password"],
                secondPass: value,
            });
        }
    }

    function submitForm() {
        // Place stuff in here to add person to database
        console.log("Submitting");
        if (validateUser() === 0 && validateEmail() === 0 && validatePassword() === 0) {
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

    function validateEmail() {
        if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(user.email)) {
            alert("Incorrect Email Address Format");
            return -1;
        }
        return 0;
    }

    function validatePassword() {
        if (user.password.length < 7) {
            alert("Make sure password is 7 characters or longer");
        }
        else if (user.password !== user.secondPass) {
            alert("Passwords do not match");
            return -1;
        }
        return 0;
    }

    const classes = styles();

    // Make sure to insert proper href link in the button
    // Make sure to place proper link going into the login page in the href
    return (
    <div>
        <h1 className="Title">Register</h1>
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
                    onChange={handleChange} />
                <br/>

                <TextField 
                    className={classes.textBox} 
                    type="email" 
                    variant="outlined" 
                    size="small" 
                    label="Email" 
                    name="email"
                    onChange={handleChange} />
                <br/>

                <TextField 
                    className={classes.textBox} 
                    type="password" 
                    variant="outlined" 
                    size="small" 
                    label="Password" 
                    name="password"
                    onChange={handleChange} />
                <br/>

                <TextField 
                    className={classes.textBox} 
                    type="password" 
                    variant="outlined" 
                    size="small" 
                    label="Confirm Password" 
                    name="secondPass"
                    onChange={handleChange} />
                <br/><br/>

                <center>
                    <Button variant="outlined" onClick={submitForm}>
                        Submit
                    </Button>
                </center>
                
            </form>
        </div>
        <p className="Log_in">Already registered? <a href = "">Log in</a></p>
    </div>);
}

export default RegisterPage;