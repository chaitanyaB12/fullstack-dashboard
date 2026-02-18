import { useState, useContext } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useContext(AuthContext);
  const nav = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = async () => {
    try {
      setError("");
      const res = await api.post("/auth/login", { email, password });
      login(res.data.token);
      nav("/");
    } catch (err) {
      setError(err.response?.data || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-300 to-purple-800 flex items-center justify-center px-4">

      <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-lg">

        <h2 className="text-3xl font-semibold text-center mb-6">
          Welcome Back 👋
        </h2>

        {error && (
          <p className="text-red-500 text-center text-sm mb-4">
            {error}
          </p>
        )}

        <input
          className="border rounded-md p-3 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="border rounded-md p-3 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={submit}
          className="bg-indigo-600 text-white w-full py-3 rounded-md hover:bg-indigo-700 transition"
        >
          Login
        </button>

        <div className="text-center mt-5 space-y-2">
          <Link to="/register" className="text-indigo-600 block">
            Create account
          </Link>

          <Link to="/" className="text-gray-500 text-sm block">
            Continue as guest →
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Login;