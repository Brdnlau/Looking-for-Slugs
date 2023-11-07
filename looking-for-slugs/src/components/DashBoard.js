import React, { useEffect} from "react";
import { auth } from "../firebase"
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

import NavbarForHome from "./Navbar";
import LogOut from "./Logout";

export default function Dashboard() {
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) 
            navigate("/");
      }, [user, loading, navigate, error]);
    return (
        <div>
            <NavbarForHome/>
            <h1>Welcome, {user.displayName}!</h1>
            <LogOut/>
        </div>
    );
}