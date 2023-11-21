import React, { useEffect} from "react";
import { auth } from "../firebase"
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

import Profile from "./Profile";
import NavbarForHome from "./Navbar";

export default function Dashboard() {
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) 
            navigate("/");
      }, [user]);
      
    return (
        <>
        {user === null ? 
        <>
            <div>
                <NavbarForHome/>
            </div>
        </>:
        <>
            <div>
                <NavbarForHome user={user}/>
                <Profile user={user}/>
            </div>
        </>
        }
        </>
    );
}
