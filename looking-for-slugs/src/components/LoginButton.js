import React, { useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase"
import { useNavigate } from "react-router-dom";

const provider = new GoogleAuthProvider()

export default function LoginButton(props){
    const navigate = useNavigate();
    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, provider)
            const user = result.user
            console.log(user)
            console.log(user.displayName + " logged in successfully")
            navigate("/dashboard");
        } catch (error) {
            console.error(error);
        }
        
    }
    return (
        <button className={props.class} onClick={handleGoogleLogin}>{props.text}</button>
    );
}