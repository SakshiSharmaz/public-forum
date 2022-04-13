import React, { useState } from "react";
import '../css/login.css'
import TextInput from "../helpercomponents/textInput";
import Button from '@mui/material/Button';
import Topics from "../screens/topics"
import {
    useParams,
    useNavigate,
    useLocation,
  } from "react-router-dom";


export default function Login(props) {

    let navigate = useNavigate();
    let location = useLocation();
    let params = useParams();


    const [isSignUp, changeSignUp] = useState(props.title)


    function changeSignUpState() {
        changeSignUp(isSignUp === "Sign Up" ? "Sign In" : "Sign Up")
    }

    function navigateStuff() {


        if (isSignUp==="Sign Up") changeSignUp( "Sign In")
        else {
            navigate("/dashboard");

        }


    }

    return <div className="container" >
        <div className="card" >
            <h1>Public Forum</h1>
            <TextInput
                name="username"
                title="Username"
                type="text"
            />

            <TextInput
                name="password"
                title="Password"
                type="password"
            />

            {(isSignUp === "Sign Up") ?
                <TextInput
                    name="confirm"
                    title="Confirm Password"
                    type="password"
                />
                : null}
            <br />
            <div className="submit_button" >

                <Button onClick={navigateStuff} variant="outlined" size="large" ><b>
                    {isSignUp}
                </b></Button>
            </div>
            <br />
            {(isSignUp === "Sign Up") ?

                <Button onClick={() => changeSignUpState()}  > Already Signed Up? Sign In</Button>
                :
    
                <Button onClick={() => changeSignUpState()}  >
                    Havent signed up yet? Sign Up
                </Button>
            }
            <br></br>
        </div>

    </div>

}
