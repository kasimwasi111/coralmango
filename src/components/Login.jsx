import React, { useState } from "react";
import "./Login.css";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = () => {
    // Check if the entered credentials are valid
    if (username === "demo@coralmango.com" && password === "demo123") {
      onLogin();
    } else {
      setIsError(true);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h1>Login</h1>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={handleUsernameChange}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />
        {isError && <div className="error-message">Invalid Credentials!</div>}
        <button onClick={handleLogin}>Log In</button>
      </div>
    </div>
  );
};

export default Login;
