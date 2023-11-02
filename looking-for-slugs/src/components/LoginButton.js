import React, { useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase"

export default function LoginButton(props){
    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider()
        const result = await signInWithPopup(auth, provider)
        const user = result.user
        console.log(result.user.displayName + " logged in successfully")
    }
    return (
        <button className={props.class} onClick={handleGoogleLogin}>Register</button>
    );
}