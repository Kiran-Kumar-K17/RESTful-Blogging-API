import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import apiClient from "../api/axios";
import { LogIn, Mail, Lock } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await apiClient.post("/user/login", { email, password });

      // Check if the backend said success
      if (response.data.success) {
        // 1. Save the token
        localStorage.setItem("token", response.data.token);

        // 2. Save the user (If your login response doesn't include user info,
        // we'll need to fetch it or fix the backend to send it)
        localStorage.setItem(
          "user",
          JSON.stringify(response.data.data || { email }),
        );

        // 3. Go home and refresh
        window.location.href = "/";
      }
    } catch (err) {
      // This only runs if the status code is 4xx or 5xx
      console.error("Login Error:", err.response?.data);
      alert(err.response?.data?.message || "Invalid credentials!");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20">
      <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl">
        <h2 className="text-3xl font-black text-slate-900 mb-2 text-center">
          Welcome Back
        </h2>
        <p className="text-slate-500 text-center mb-8 text-sm">
          Log in to your DevCanvas account
        </p>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail
                className="absolute left-3 top-3 text-slate-300"
                size={20}
              />
              <input
                type="email"
                required
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="you@example.com"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock
                className="absolute left-3 top-3 text-slate-300"
                size={20}
              />
              <input
                type="password"
                required
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-blue-600 transition shadow-lg flex items-center justify-center gap-2"
          >
            <LogIn size={20} /> Sign In
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-slate-500">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 font-bold">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
