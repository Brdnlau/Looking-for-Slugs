import React, { useState } from "react";
import { auth } from "../firebase"
import { useNavigate } from "react-router-dom";
import { signIn } from "../firestoreHandler";

export default function LoginButton(props){
    const navigate = useNavigate();
    const handleGoogleLogin = async () => {
        try {
            signIn();
            navigate("/dashboard");
        } catch (error) {
            console.error(error);
        }
        
    }
    return (
        <button className={props.class} onClick={handleGoogleLogin}>{props.text}</button>
    );
}