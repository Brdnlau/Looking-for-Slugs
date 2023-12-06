import React, { useEffect } from "react";
import { auth } from "../../../Firebase/firebase";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

import Profile from "./Profile";
import NavbarForHome from "../../Navbar/Navbar";

export default function Dashboard() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/");
  }, [user, navigate]);

  return (
    <>
      {user === null ? (
        <>
          <div>
            <NavbarForHome />
          </div>
        </>
      ) : (
        <>
          <div>
            <NavbarForHome user={user} />
            <Profile user={user} />
          </div>
        </>
      )}
    </>
  );
}
