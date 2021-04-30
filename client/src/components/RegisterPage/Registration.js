import React from "react";
import "./Register.css";
import {
    ButtonGroup,
    Button,
    Grid,
    makeStyles,
    Divider,
    TextField,
} from "@material-ui/core";

const styles = makeStyles((theme) => ({
    textBox: {
        margin: 10,
        width: '80%',
    },
}));

const RegisterPage = (props) => {
    const classes = styles();
    function submitForm() {
        // Place stuff in here to add person to database
    }
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
                <TextField className={classes.textBox} variant="outlined" size="small" label="Username"/>
                <br/>

                <TextField className={classes.textBox} variant="outlined" size="small" label="Email" />
                <br/>

                <TextField className={classes.textBox} variant="outlined" size="small" label="Password" />
                <br/>

                <TextField className={classes.textBox} variant="outlined" size="small" label="Confirm Password" /><br/>
                <br/>

                <center>
                    <Button variant="outlined" href="" onClick={() => console.log("Submission button clicked")}>
                        Submit
                    </Button>
                </center>
                
            </form>
        </div>
        <p className="Log_in">Already registered? <a href = "">Log in</a></p>
    </div>);
}

export default RegisterPage;