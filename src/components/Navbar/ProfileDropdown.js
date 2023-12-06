import React from "react";
import { auth } from "../../Firebase/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import "./ProfileDropdown.css";

export default function ProfileDropdown(props) {
  const navigate = useNavigate();
  const handleLogOut = async () => {
    signOut(auth).then(() => {
      navigate("/");
    });
  };

  function handleClick() {
    handleLogOut();
  }

  return (
    <div>
      <div class="drop_elements">
        <img src={props.user.photoURL} class="drop_profile_pic" alt="user"/>
      </div>
      <div class="drop_elements">
        <DropdownButton
          variant="success"
          title={props.user.displayName}
          class="drop_color"
        >
          <Dropdown.Item onClick={handleClick}>Logout</Dropdown.Item>
        </DropdownButton>
      </div>
    </div>
  );
}
