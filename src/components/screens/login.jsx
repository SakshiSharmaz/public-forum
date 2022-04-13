import React, { useEffect, useState } from "react";
import "../css/login.css";
import TextInput from "../helpercomponents/textInput";
import Button from "@mui/material/Button";
import Topics from "./Dashboard/components/topics";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import UsersSchema from '../../database/users.data.json';

const UsersFilePath = '../../database/users.data.json';
const Users = UsersSchema["users"];

export default function Login(props) {
  let navigate = useNavigate();
  let location = useLocation();
  let params = useParams();
    
  const [username, onChangeUsername] = useState(null);
  const [password, onChangePassword] = useState(null);
  const [confirmPassword, onChangeConfirmPassword] = useState(null);
  const [isSignUp, changeSignUp] = useState(props.title);

  useEffect(() => {
    console.log(username, password);
  }, [username, password])

  function changeSignUpState() {
    changeSignUp(isSignUp === "Sign Up" ? "Sign In" : "Sign Up");
  }

  function login() {
    if(username && password) {
        let user = Users.filter(el => el.username === username)[0];

        if(user) {
            if(user.password === password) {
                localStorage.setItem("user", username);
                navigate("/dashboard");
            } else {
                alert("Password do not match");
            }
        } else {
            alert(`No user found with username ${username}`);
        }
    }
  }

  async function signup() {
    if(username && password && confirmPassword) {
        let user = Users.filter(el => el.username === username)[0];

        if(user) {
            alert("User already exist with this username");
        } else {
            if(password === confirmPassword) {
                let UsersData = {
                    "users": [
                        ...Users,
                        {
                            username, 
                            password
                        }
                    ]
                };
            } else {
                alert("Enter password correctly.")
            }
        }
    }
  }

  function navigateStuff() {
    if (isSignUp === "Sign Up") signup();
    else login();
  }

  return (
    <div className="container">
      <div className="card">
        <h1>Public Forum</h1>
        <TextInput name="username" title="Username" type="text" onChange={onChangeUsername} />

        <TextInput name="password" title="Password" type="password" onChange={onChangePassword} />

        {isSignUp === "Sign Up" ? (
          <TextInput name="confirm" title="Confirm Password" type="password" onChange={onChangeConfirmPassword} />
        ) : null}
        <br />
        <div className="submit_button">
          <Button onClick={navigateStuff} variant="outlined" size="large">
            <b>{isSignUp}</b>
          </Button>
        </div>
        <br />
        {isSignUp === "Sign Up" ? (
          <Button onClick={() => changeSignUpState()}>
            {" "}
            Already Signed Up? Sign In
          </Button>
        ) : (
          <Button onClick={() => changeSignUpState()}>
            Havent signed up yet? Sign Up
          </Button>
        )}
        <br></br>
      </div>
    </div>
  );
}
