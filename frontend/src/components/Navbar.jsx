import { useState, useContext, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaTimes, FaBars, FaUserCircle } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { MdLogout, MdOutlineAccountCircle } from "react-icons/md";
import logo from "../quizpics/logo.png";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    logout(); // You must have this defined in your AuthContext
    navigate("/auth");
  };

  const goToAccount = () => {
    setDropdownOpen(false);
    navigate("/profile");
  };

  // Close dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-white/40 via-white/20 to-white/40 backdrop-blur-md shadow-lg border-b border-white/30 px-4 md:px-8 py-3 flex justify-between items-center transition-all duration-300">
      <div className="flex items-center gap-2">
        <img src={logo} alt="Logo" className="w-[150px] h-auto" />
      </div>

      <ul className="hidden md:flex gap-6 text-gray-800 font-medium items-center">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/blog">Blog</Link></li>
        {!user && <li><Link to="/auth">Login</Link></li>}
        <li><Link to="/contact">Contact</Link></li>
      </ul>

      <div className="hidden md:flex items-center gap-4 relative">
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

        {user && (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition cursor-pointer"
            >
              <FaUserCircle className="text-2xl" />
              <span className="hidden sm:inline text-sm font-medium">
                Hi, {user.name?.split(" ")[0] || "User"}
              </span>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50 text-sm">
                <button
                  onClick={goToAccount}
                  className="flex items-center w-full px-4 py-2 hover:bg-gray-100"
                >
                  <MdOutlineAccountCircle className="mr-2 text-lg" />
                  View My Account
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-2 hover:bg-gray-100 text-red-600"
                >
                  <MdLogout className="mr-2 text-lg" />
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
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
          {!user && <li><Link to="/auth" onClick={() => setMenuOpen(false)}>Login</Link></li>}
          <li><Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link></li>
          {user && (
            <>
              <li onClick={() => { goToAccount(); setMenuOpen(false); }} className="text-blue-600">
                <span className="flex items-center gap-2">
                  <MdOutlineAccountCircle /> View My Account
                </span>
              </li>
              <li onClick={() => { handleLogout(); setMenuOpen(false); }} className="text-red-600">
                <span className="flex items-center gap-2">
                  <MdLogout /> Logout
                </span>
              </li>
            </>
          )}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
