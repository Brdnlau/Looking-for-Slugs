import React from "react";
import { auth } from "../firebase"
import { signOut } from "firebase/auth";

export default function LogOut(props){
    const handleLogOut = () => {
        try {
            signOut(auth);
        } catch (error) {
            console.error(error);
        }
        
    }
    return (
        <button onClick={handleLogOut}>LogOut</button>
    );
}