import React, { useState } from "react";
import { auth } from "../firebase"
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

import NavbarForHome from "./Navbar";

export default function Dashboard() {
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
    if (!user) {
        navigate("/")
    }
    return (
        <div>
            <NavbarForHome/>
            <h1>Welcome, {user.displayName}!</h1>
        </div>
    );
}