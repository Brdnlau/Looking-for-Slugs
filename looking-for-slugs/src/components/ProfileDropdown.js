import React from "react";
import { auth } from "../firebase"
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function ProfileDropdown(props) {
    const navigate = useNavigate();
    const handleLogOut = async () => {
        signOut(auth).then(() => {navigate("/")})
    }

    function handleClick() {
        handleLogOut();
    }

    return (
        <div>
        <button className={props.class} onClick={handleClick}><img src={props.user.photoURL} alt=""/>{props.user.displayName}</button>
        </div>
    );
}