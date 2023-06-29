import React from "react";
import "./Login.css";
import logo from "../assets/logo.png";

function Login() {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <img src={logo} alt="Logo" className="logo" />
        <h2>Se connecter</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Identifiant:</label>
            <input type="text" id="username" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Mot de passe:</label>
            <input type="password" id="password" />
          </div>
          <button type="submit">Connection</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
