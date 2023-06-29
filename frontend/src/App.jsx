import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <main>
      <Navbar />
      <Outlet />
    </main>
  );
}
// Si jamais l'utilisateur n'est pas connecté tu dois retourner automatiquement sur login
