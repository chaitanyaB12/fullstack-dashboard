import { useState } from "react";
import api from "../api/axios";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const nav = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = async () => {
    try {
      setError("");
      await api.post("/auth/register", { name, email, password });
      nav("/login");
    } catch (err) {
      setError(err.response?.data || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-300 to-purple-900 flex items-center justify-center px-4">

      <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-lg">

        <h2 className="text-3xl font-semibold text-center mb-6">
          Create Account 🚀
        </h2>

        {error && (
          <p className="text-red-500 text-center text-sm mb-4">
            {error}
          </p>
        )}

        <input
          className="border rounded-md p-3 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />

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
          Register
        </button>

        <div className="text-center mt-5 space-y-2">
          <Link to="/login" className="text-indigo-600 block">
            Back to login
          </Link>

          <Link to="/" className="text-gray-500 text-sm block">
            Continue as guest →
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Register;