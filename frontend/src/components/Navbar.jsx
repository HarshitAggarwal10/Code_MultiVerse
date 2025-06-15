import { useState } from "react";
import { Link } from "react-router-dom";
import { FaTimes, FaBars, FaUserCircle } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import logo from "../quizpics/logo.png"; // Update the path as needed

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-white/40 via-white/20 to-white/40 backdrop-blur-md shadow-lg border-b border-white/30 px-4 md:px-8 py-3 flex justify-between items-center transition-all duration-300">
      <div className="flex items-center gap-2">
        <img src={logo} alt="Logo" className="w-[150px] h-auto" />
      </div>

      <ul className="hidden md:flex gap-6 text-gray-800 font-medium">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/blog">Blog</Link></li>
        <li><Link to="/auth">Login</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>

      <div className="hidden md:flex items-center gap-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-4 py-1 rounded-md bg-white/70 text-gray-800 backdrop-blur-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
          <FiSearch className="absolute left-3 top-2.5 text-gray-500 text-sm" />
        </div>

        <FaUserCircle className="text-2xl text-gray-700 cursor-pointer hover:text-blue-600 transition" />
      </div>

      <div className="md:hidden text-2xl text-gray-800">
        {menuOpen ? (
          <FaTimes onClick={() => setMenuOpen(false)} />
        ) : (
          <FaBars onClick={() => setMenuOpen(true)} />
        )}
      </div>

      {menuOpen && (
        <ul className="absolute top-16 left-0 w-full bg-white/80 backdrop-blur-lg border-t border-white/30 shadow-md flex flex-col items-center py-6 space-y-4 font-medium md:hidden transition-all duration-300">
          <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
          <li><Link to="/about" onClick={() => setMenuOpen(false)}>About</Link></li>
          <li><Link to="/blog" onClick={() => setMenuOpen(false)}>Blog</Link></li>
          <li><Link to="/auth" onClick={() => setMenuOpen(false)}>Login</Link></li>
          <li><Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link></li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
