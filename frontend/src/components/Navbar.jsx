import React from "react";
import "./Navbar.css";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import PersonIcon from "@mui/icons-material/Person";
import logo from "../assets/logo.png";

function Navbar() {
  return (
    <nav className="navbar-container">
      <div className="navbar-frame">
        <div className="navbar-logo">
          <img src={logo} alt="Logo" />
        </div>
        <div className="navbar-buttons">
          <button type="button" className="navbar-button">
            Ajouter un smartphone
          </button>
          <button type="button" className="navbar-button">
            Liste de téléphones
          </button>
          <button type="button" className="navbar-button">
            FAQ
          </button>
        </div>
        <div className="navbar-logout">
          <button type="button" className="navbar-button">
            <PersonIcon /> Logout <ExitToAppIcon />
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
