import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      {/* This 'main' container centers your content and adds spacing */}
      <main className="max-w-5xl mx-auto px-4 py-10">
        <Outlet />
      </main>

      <footer className="py-10 text-center text-slate-400 text-sm border-t border-slate-100 bg-white">
        © 2026 DEV_BLOG. Built with the MERN Stack.
      </footer>
    </div>
  );
};

export default MainLayout;
