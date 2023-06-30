/* eslint-disable camelcase */
import React from "react";
import "./Navbar.css";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import PersonIcon from "@mui/icons-material/Person";
import jwt_decode from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { useToken } from "../context/TokenContext";

function Navbar() {
  const { token, setToken } = useToken();
  let name = "";
  let isAdmin = false;
  if (token) {
    const decodedToken = jwt_decode(token);
    isAdmin = decodedToken.user.isAdmin;
    name = decodedToken.user.name;
  }

  const navigate = useNavigate();

  const handleLogout = () => {
    setToken(null);
    navigate("/login");
  };
  return (
    <nav className="navbar-container">
      <div className="navbar-frame">
        <div className="navbar-logo">
          <img src={logo} alt="Logo" />
        </div>
        <div className="navbar-buttons">
          <Link to="/phone-list">
            <button type="button" className="navbar-button">
              Liste de téléphones
            </button>
          </Link>
          {isAdmin === 1 && (
            <Link to="/user-list">
              <button type="button" className="navbar-button">
                Liste d'utilisateurs
              </button>
            </Link>
          )}
          <Link to="/faq">
            <button type="button" className="navbar-button">
              FAQ
            </button>
          </Link>
        </div>
        {name && (
          <div className="user-info">
            <div className="user-name">{name}</div>
            <PersonIcon />
          </div>
        )}
        <div className="navbar-logout">
          <button
            type="button"
            className="navbar-button"
            onClick={handleLogout}
          >
            Logout <ExitToAppIcon />
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
