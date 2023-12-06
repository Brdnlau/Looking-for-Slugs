import React from "react";
import "./login.css";

const Login = () => {
  return (
    <div class="spacer">
      <div class="alignment">
        <div class="login_title">
          <h2>Sign In</h2>
        </div>
        <div class="username">
          <input class="username_box" type="username" placeholder="Username" />
        </div>
        <div class="password">
          <input class="password_box" type="password" placeholder="Password" />
        </div>
        <button class="submit">Sign In</button>
      </div>
    </div>
  );
};

export default Login;
