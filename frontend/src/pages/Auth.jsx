//  src/pages/AuthPage.jsx
import { useState, useContext } from "react";
import {
  FaGithub, FaGoogle, FaEnvelope, FaLock, FaUser, FaDiscord, FaArrowLeft
} from "react-icons/fa";
import { motion }   from "framer-motion";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import api from "../utils/api";

export default function AuthPage() {
  const navigate      = useNavigate();
  const { login }     = useContext(AuthContext);

  const [isLogin, setIsLogin]     = useState(true);
  const [name, setName]           = useState("");
  const [email, setEmail]         = useState("");
  const [password, setPassword]   = useState("");

  /* ------------------------------------------------ */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const url  = isLogin ? "/api/auth/login" : "/api/auth/signup";
    const body = isLogin ? { email, password } : { name, email, password };

    try {
      const { data } = await api.post(url, body);       // api already has baseURL
      if (isLogin) {
        login(data);                                    // { token, user }
        navigate("/domains");
      } else {
        alert("Signup successful — please log in!");
        setIsLogin(true); setName(""); setEmail(""); setPassword("");
      }
    } catch (err) {
      alert(err?.response?.data?.message || "Auth failed");
    }
  };

  /* ------------------------------------------------ */
  const OAUTH = `${import.meta.env.VITE_API_URL}/auth`;   // ← BACKEND URL

  const buttons = [
    { Icon: FaGoogle,  href: `${OAUTH}/google`,  label: "Google"  },
    { Icon: FaGithub,  href: `${OAUTH}/github`,  label: "GitHub"  },
    { Icon: FaDiscord, href: `${OAUTH}/discord`, label: "Discord" },
  ];

  /* ------------------------------------------------ */
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a0e2a] via-[#0d1b3e] to-[#0a0e2a]">
      {/* Back btn */}
      <button onClick={() => navigate("/")}
              className="absolute top-6 left-6 flex items-center gap-1 text-white/80 hover:text-white">
        <FaArrowLeft /> Home
      </button>

      {/* Glass card */}
      <motion.div initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }}
                  className="w-full max-w-md bg-white/5 backdrop-blur-lg rounded-2xl p-10 border border-white/10 text-white">
        <h2 className="text-3xl font-bold text-center mb-6 tracking-wide">
          {isLogin ? "Welcome Back" : "Join CodeMultiVerse"}
        </h2>

        {/* form ----------------------------------------------------------- */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {!isLogin && (
            <Input icon={FaUser} placeholder="Your name" value={name}
                   onChange={setName} />
          )}
          <Input icon={FaEnvelope} placeholder="Email" type="email" value={email}
                 onChange={setEmail} />
          <Input icon={FaLock} placeholder="Password" type="password" value={password}
                 onChange={setPassword} />

          <button className="w-full bg-indigo-600 hover:bg-indigo-700 py-3 rounded-md font-semibold">
            {isLogin ? "Log In" : "Sign Up"}
          </button>
        </form>

        {/* OAuth buttons --------------------------------------------------- */}
        <div className="my-6 flex items-center gap-3 justify-center">
          {buttons.map(({ Icon, href, label }) => (
            <button key={label} aria-label={label}
                    onClick={() => (window.location.href = href)}
                    className="p-3 bg-white/10 hover:bg-white/20 rounded-full">
              <Icon className="text-xl" />
            </button>
          ))}
        </div>

        <p className="text-center text-sm text-white/70">
          {isLogin ? "Don't have an account?" : "Already registered?"}{" "}
          <span onClick={() => setIsLogin(!isLogin)}
                className="text-indigo-400 hover:underline cursor-pointer">
            {isLogin ? "Sign up" : "Log in"}
          </span>
        </p>
      </motion.div>
    </div>
  );
}

/* ---------------- little helper component ------------------------- */
function Input({ icon: Icon, type="text", placeholder, value, onChange }) {
  return (
    <label className="relative block">
      <Icon className="absolute top-3.5 left-3 text-gray-400" />
      <input type={type} placeholder={placeholder} value={value}
             onChange={(e) => onChange(e.target.value)}
             className="w-full pl-10 pr-4 py-3 bg-white/10 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
    </label>
  );
}
