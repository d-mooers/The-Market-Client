import React from "react";
import "./Register.css";
import { Divider } from "@material-ui/core";

function RegisterPage() {
    function submitForm() {
        // Place stuff in here to add person to database
    }

    return (
    <div>
        <h1 className="Title">Register</h1>
        <div className="box">
            <center>
                <h1>The Market</h1>
            </center>
            <form>
                <label htmlFor="name" className="label">
                    Name
                </label>
                <input/>
                    <br></br>
                <label htmlFor="name" className="label">
                    Email
                </label>
                <input />
                <br></br>
                <label htmlFor="name" className="label">
                    Password
                </label>
                <input className="passInput"/>
                <br></br>
                <label htmlFor="name" className="label">
                    Confirm Password
                </label>
                <input className="largeInput"/>
                <br></br>
                <input type="button" value="Submit" className="button" onClick={submitForm} />
            </form>
        </div>
        <p className="Log_in">Already registered? <a href = "">Log in</a></p>
    </div>);
}

export default RegisterPage;