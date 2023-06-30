import React from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import ApiHelper from "../services/ApiHelper";
import { useToken } from "../context/TokenContext";

function Login() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { setToken } = useToken();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (username && password) {
      const data = JSON.stringify({ username, password });
      await ApiHelper("/login", "POST", null, data)
        .then((response) => response.json())
        .then((result) => {
          console.error(result.token);
          return setToken(result.token);
        })
        .then(() => navigate("/"));
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <img src={logo} alt="Logo" className="logo" />
        <h2>Se connecter</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Identifiant:</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              id="username"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Mot de passe:</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
            />
          </div>
          <button type="submit">Connexion</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
