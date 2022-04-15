import React, { useEffect, useState } from "react";
import "../css/login.css";
import TextInput from "../helpercomponents/textInput";
import Button from "@mui/material/Button";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import {db} from "../../database/index";
import HashLoader from "react-spinners/HashLoader";

export default function Login(props) {
  let navigate = useNavigate();
  let location = useLocation();
  let params = useParams();
  
  const [loading, setLoading] = useState(false);
  const [username, onChangeUsername] = useState(null);
  const [password, onChangePassword] = useState(null);
  const [confirmPassword, onChangeConfirmPassword] = useState(null);
  const [isSignUp, changeSignUp] = useState(props.title);

  function changeSignUpState() {
    changeSignUp(isSignUp === "Sign Up" ? "Sign In" : "Sign Up");
  }

  // DEXIE PROMISE EXAMPLE
  function login() {
    if(username && password) {
        db.users.where("username").equalsIgnoreCase(username).toArray().then(response => {
          const user = response[0];

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
        })
    }
  }

  // DEXIE ASYNC/AWAIT EXAMPLE
  async function signup() {
    if(username && password && confirmPassword) {
        setLoading(true);
        
        let users = await db.users.where("username").equalsIgnoreCase(username).toArray();

        if(users && users?.length) {
            alert("User already exist with this username");
            setLoading(false);
        } else {
            if(password === confirmPassword) {
                let newUser = {
                  username, 
                  password
              };

              db.users.add(newUser);
              setLoading(false);
              resetForm();
              changeSignUp("Sign In")
            } else {
                alert("Enter password correctly.");
                setLoading(false);
            }
        }
    }
  }

  function navigateStuff() {
    if (isSignUp === "Sign Up") signup();
    else login();
  }

  function resetForm() {
    onChangeUsername(null);
    onChangePassword(null);
    onChangeConfirmPassword(null);
  }

  return (
    <div className="container">
      <div className="card">
        <h1>Public Forum</h1>
        <TextInput name="username" title="Username" type="text" value={username} onChange={onChangeUsername} />

        <TextInput name="password" title="Password" type="password" value={password} onChange={onChangePassword} />

        {isSignUp === "Sign Up" ? (
          <TextInput name="confirm" title="Confirm Password" type="password" value={confirmPassword} onChange={onChangeConfirmPassword} />
        ) : null}
        <br />
        <div className="submit_button">
          <Button className="auth-button" onClick={navigateStuff} variant="outlined" size="large">
            {
              loading ?
                <HashLoader color="#243836" loading={loading} size={30} />
                :
                <b>{isSignUp}</b>
            }
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
