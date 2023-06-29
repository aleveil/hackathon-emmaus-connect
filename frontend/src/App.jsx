import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useToken } from "./context/TokenContext";

export default function App() {
  const { token } = useToken();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  });
  return (
    <main>
      <Navbar />
      <Outlet />
    </main>
  );
}
// Si jamais l'utilisateur n'est pas connecté tu dois retourner automatiquement sur login
