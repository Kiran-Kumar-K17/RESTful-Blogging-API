import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/Button";
import { LogOut, PenSquare, User, LayoutDashboard } from "lucide-react";

const Navbar = () => {
  const [user, setUser] = useState(null);

  // 1. Sync state with localStorage on component mount
  useEffect(() => {
    const userItem = localStorage.getItem("user");

    if (userItem && userItem !== "undefined" && userItem !== "null") {
      try {
        const parsedUser = JSON.parse(userItem);
        // Safety: handle both {user: {...}} and {...} structures
        setUser(parsedUser.user || parsedUser);
      } catch (error) {
        console.error("Auth sync error:", error);
        localStorage.removeItem("user"); // Clean up corrupt data
      }
    }
  }, []);

  // 2. Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/"; // Force refresh to clear all app state
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-5xl mx-auto px-4 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black shadow-lg shadow-indigo-100 group-hover:rotate-6 transition-transform">
            D
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tighter text-slate-900 uppercase leading-none">
              Dev<span className="text-indigo-600">Canvas</span>
            </span>
            <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mt-1">
              Engineering Blog
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="text-sm font-bold text-slate-500 hover:text-indigo-600 transition hidden sm:block"
          >
            Home
          </Link>

          {user ? (
            /* --- LOGGED IN VIEW --- */
            <div className="flex items-center gap-4">
              <Link to="/create">
                <Button variant="primary" className="flex items-center gap-2">
                  <PenSquare size={18} />
                  <span className="hidden md:inline">Write Post</span>
                </Button>
              </Link>

              {/* User Profile & Logout */}
              <div className="flex items-center gap-3 pl-4 border-l border-slate-100">
                <div className="hidden sm:block text-right">
                  <p className="text-xs font-black text-slate-900 leading-none">
                    {user.name || "Author"}
                  </p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                    Verified
                  </p>
                </div>

                <button
                  onClick={handleLogout}
                  className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  title="Log Out"
                >
                  <LogOut size={20} />
                </button>
              </div>
            </div>
          ) : (
            /* --- GUEST VIEW --- */
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="text-sm font-bold text-slate-600 hover:text-indigo-600 px-4 py-2 transition"
              >
                Log In
              </Link>
              <Link to="/signup">
                <Button variant="primary">Get Started</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
