import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../auth/auth";
import SignIn from "../../components/sign-in/sign-in";
import Signup from "../../components/signUp/signUp";
import "./authentication.scss";
import { Route, Routes } from "react-router-dom";



const Authentication = () => {
  return (
    <div className="auth">
      <Routes>
        <Route index element={<SignIn/>}/>
        <Route path="/signUp" element={<Signup/>}/>
      </Routes>
     
      {/* <Signup/> */}
    </div>
  );
};

export default Authentication;
