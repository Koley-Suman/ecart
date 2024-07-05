import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../auth/auth";
import { Button, TextField } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";

import "./sign-in.scss";
import { Link } from "react-router-dom";

const SignIn = () => {
  const defaultform = {
    email: "",
    password: "",
  };
  const [inputForm, setinputForm] = useState(defaultform);
  const { email, password } = inputForm;
  let handelchange = (e) => {
    setinputForm({ ...inputForm, [e.target.name]: e.target.value });
  };
  const resetinput = () => {
    setinputForm(defaultform);
  };
  const signIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });
    resetinput();
  };
  return (
    <div className="sign-in-box">
      <div className="sign-in-container">
        <form onSubmit={signIn} className="sign-in-form">
          <TextField
            onChange={(e) => handelchange(e)}
            required
            type="email"
            name="email"
            value={email}
            id="outlined-basic"
            label="Email"
            variant="standard"
            fullWidth
          />
          <TextField
            onChange={(e) => handelchange(e)}
            required
            type="password"
            name="password"
            value={password}
            id="outlined-basic"
            label="Password"
            variant="standard"
            fullWidth
          />
          <Button type="submit" variant="contained">
            LOG IN
          </Button>
          <div className="divider-box">
            <div className="divider"></div>
            OR
            <div className="divider"></div>
          </div>
          <Button startIcon={<GoogleIcon />} fullWidth variant="contained">
            GOOGLE SIGN IN
          </Button>
        <p>Haven't any account <Link to='signUp'>sign up</Link></p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
