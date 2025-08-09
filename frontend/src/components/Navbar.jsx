import { useState, useContext, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaTimes, FaBars, FaUserCircle, FaMagic } from "react-icons/fa";
import { MdLogout, MdOutlineAccountCircle } from "react-icons/md";
import logo from "../img/newLogoBG.png";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [inspiration, setInspiration] = useState("");
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  const goToAccount = () => {
    setDropdownOpen(false);
    navigate("/profile");
  };

  const generateInspiration = () => {
    const tips = [
      "Code is like humor. When you have to explain it, it’s bad.",
      "Before software can be reusable, it first has to be usable.",
      "Small steps lead to big achievements in coding.",
      "Debugging: Being the detective in a crime you committed.",
      "Every great developer you know started as a beginner.",
      "Talk is cheap. Show me the code."
    ];
    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    setInspiration(randomTip);
    setTimeout(() => setInspiration(""), 5000); // Hide after 5s
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
        <img src={logo} alt="Logo" className="w-[120px] h-auto" />
      </div>

      <ul className="hidden md:flex gap-6 text-gray-800 font-medium items-center">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/blog">Blog</Link></li>
        {!user && <li><Link to="/auth">Login</Link></li>}
        <li><Link to="/contact">Contact</Link></li>
      </ul>

      <div className="hidden md:flex items-center gap-4 relative">
        {/* Inspire Me Button */}
        <div className="relative">
          <button
            onClick={generateInspiration}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white font-medium shadow-md hover:bg-blue-700 active:bg-blue-800 transition-all duration-200"
          >
            <FaMagic className="text-lg" />
            Inspire Me
          </button>

          {/* Popup */}
          {inspiration && (
            <div className="absolute top-12 right-0 w-72 bg-white rounded-xl shadow-lg border border-gray-200 p-4 animate-fade-in">
              <p className="text-gray-700 text-sm leading-relaxed">{inspiration}</p>
              <div className="absolute top-[-6px] right-6 w-3 h-3 bg-white border-l border-t border-gray-200 rotate-45"></div>
            </div>
          )}
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
