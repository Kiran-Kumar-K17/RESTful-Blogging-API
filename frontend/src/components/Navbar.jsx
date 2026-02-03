import { Link } from "react-router-dom";
import { Button } from "./ui/Button";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-5xl mx-auto px-4 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-blue-600 rounded-xl rotate-3 flex items-center justify-center text-white font-black">
            B
          </div>
          <span className="text-xl font-black tracking-tighter text-slate-900">
            DEV_BLOG
          </span>
        </Link>

        <div className="flex items-center gap-8">
          <Link
            to="/"
            className="text-sm font-semibold text-slate-500 hover:text-blue-600 transition"
          >
            Home
          </Link>
          <Link to="/create">
            <Button variant="primary">+ Write Post</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
