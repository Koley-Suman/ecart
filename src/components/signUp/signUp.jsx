import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth, db } from "../../auth/auth";
import { addDoc, collection } from "firebase/firestore";
import { Alert, Button, TextField } from "@mui/material";

import "./signup.scss";
import GoogleIcon from "@mui/icons-material/Google";
import { Link } from "react-router-dom";


const Signup = () => {
  const initial = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [cruser, setCruser] = useState(initial);
  const { username, email, password, confirmPassword } = cruser;
  let handelchange = (e) => {
    setCruser({ ...cruser, [e.target.name]: e.target.value });
  };
  const resetinput = () => {
    setCruser(initial);
  };
  const signup = async (e) => {
    e.preventDefault();
    if (confirmPassword != password) {
      alert("password doesn't match");
      return;
    } else if (!email || !password) {
      return;
    } else {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(user);

      // .then((userCredential) => {
      //   // Signed up
      //   const user = userCredential.user;
      //   console.log(user);
      //   // ...
      // })
      // catch((error) => {
      //   const errorCode = error.code;
      //   const errorMessage = error.message;
      //   console.log(errorCode);
      //   console.log(errorMessage);
      //   // ..
      // });
      resetinput();

      try {
        const docRef = await addDoc(collection(db, "users"), {
          email: cruser.email,
          password: cruser.password,
          date: Date.now(),
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  };
  return (
    <div className="sign-up-box">
      <div className="sign-up-container">
        <form onSubmit={signup} className="sign-up-form">
          <TextField
            onChange={(e) => handelchange(e)}
            required
            type="text"
            name="username"
            value={username}
            id="outlined-basic"
            label="User Name"
            variant="standard"
            fullWidth
          />
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
          <TextField
            onChange={(e) => handelchange(e)}
            required
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            id="outlined-basic"
            label="Confirm Password"
            variant="standard"
            fullWidth
          />
          <Button  type="submit" variant="contained">
            SIGN UP
          </Button>
          <div className="divider-box">
            <div className="divider"></div>
            OR
            <div className="divider"></div>
          </div>
          <Button
            startIcon={<GoogleIcon />}
            fullWidth
            variant="contained"
          >
            GOOGLE SIGN IN
          </Button>
          <p>Already have an account <Link to='/authentication'>sign in</Link></p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
