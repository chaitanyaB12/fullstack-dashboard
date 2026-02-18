import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { logout, token } = useContext(AuthContext);
  const nav = useNavigate();

  const handleLogout = () => {
    logout();
    nav("/login"); // 👈 redirect
  };

  return (
    <nav className="bg-black/90 backdrop-blur text-white px-6 py-4 flex justify-between items-center shadow">
      <h1 className="text-lg font-semibold">Dashboard</h1>

      {token && (
        <button
          onClick={handleLogout}
          className="border border-white/30 px-4 py-1 rounded hover:bg-white hover:text-black transition"
        >
          Logout
        </button>
      )}
    </nav>
  );
};

export default Navbar;