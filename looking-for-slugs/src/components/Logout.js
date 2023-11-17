import React from "react";
import { auth } from "../firebase"
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';

export default function LogOut(props){
    const navigate = useNavigate();
    const handleLogOut = async () => {
        signOut(auth).then(() => {navigate("/")})
    }
    return (
        <button variant="light" onClick={handleLogOut}>LogOut</button>
    );
}