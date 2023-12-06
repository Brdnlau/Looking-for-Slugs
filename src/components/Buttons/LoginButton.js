import React from "react";
import { useNavigate } from "react-router-dom";
import { signIn } from "../../Firebase/firestoreHandler";

export default function LoginButton(props) {
  const navigate = useNavigate();
  const handleGoogleLogin = async () => {
    try {
      signIn().then(() => {
        navigate("/dashboard");
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <button className={props.class} onClick={handleGoogleLogin}>
      {props.text}
    </button>
  );
}
