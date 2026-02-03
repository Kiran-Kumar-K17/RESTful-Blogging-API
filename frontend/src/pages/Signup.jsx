import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import apiClient from "../api/axios";
import { UserPlus, Mail, Lock, User } from "lucide-react";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Ensure this endpoint matches your backend route exactly!
      const { data } = await apiClient.post("/user/signup", {
        name,
        email,
        password,
        passwordConfirm,
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.data));

      navigate("/");
      window.location.reload();
    } catch (err) {
      alert(err.response?.data?.message || "Check your details and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20">
      <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl">
        <h2 className="text-3xl font-black text-slate-900 mb-2 text-center">
          Create Account
        </h2>
        <p className="text-slate-500 text-center mb-8 text-sm">
          Join the DevCanvas community today.
        </p>

        <form onSubmit={handleSignup} className="space-y-5">
          {/* Name Field */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Full Name
            </label>
            <div className="relative">
              <User
                className="absolute left-3 top-3 text-slate-300"
                size={20}
              />
              <input
                type="text"
                required
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="John Doe"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          {/* Email Field */}
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
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="you@example.com"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Password Field */}
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
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="••••••••"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          {/* Password Confirm Field */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <Lock
                className="absolute left-3 top-3 text-slate-300"
                size={20}
              />
              <input
                type="password"
                required
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="••••••••"
                onChange={(e) => setPasswordConfirm(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              "Creating account..."
            ) : (
              <>
                <UserPlus size={20} /> Get Started
              </>
            )}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-slate-500">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 font-bold">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
