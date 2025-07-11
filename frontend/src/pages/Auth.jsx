import { useState, useContext } from "react";
import { FaGithub, FaGoogle, FaEnvelope, FaLock, FaUser, FaDiscord } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import api from "../utils/api";
import { auth } from "../utils/firebase";
import {
    GoogleAuthProvider,
    GithubAuthProvider,
    signInWithPopup,
    getIdToken,
} from "firebase/auth";


export default function AuthPage() {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useContext(AuthContext);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const endpoint = isLogin
            ? `/api/auth/login`
            : `/api/auth/signup`;

        const body = isLogin ? { email, password } : { name, email, password };

        try {
            const { data } = await api.post(endpoint.replace(import.meta.env.VITE_API_URL, ''), body);

            if (isLogin) {
                alert("Login successful");
                login(data); // this should contain { token, user }
                navigate("/domains");
            } else {
                alert("Signup successful. Please log in.");
                setIsLogin(true);
                setEmail("");
                setPassword("");
                setName("");
            }
        } catch (err) {
            console.error(err);
            alert("Error connecting to server");
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a0e2a] via-[#0d1b3e] to-[#0a0e2a] overflow-hidden">
            <button
                onClick={() => navigate("/")}
                className="absolute top-6 left-6 text-sm text-white bg-white/10 hover:bg-white/20 px-3 py-2 rounded-md flex items-center gap-2 backdrop-blur-sm"
            >
                <FaArrowLeft className="text-sm" /> Back to Home
            </button>
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute w-full h-full overflow-hidden opacity-30">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                        {[...Array(120)].map((_, i) => (
                            <circle
                                key={i}
                                cx={Math.random() * 100}
                                cy={Math.random() * 100}
                                r={Math.random() * 0.4 + 0.2}
                                fill="white"
                                className="animate-pulse"
                            />
                        ))}
                    </svg>
                </div>
            </div>

            {/* Auth Form */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative z-10 w-full max-w-md bg-white/5 backdrop-blur-md rounded-2xl px-8 py-10 shadow-2xl border border-white/10"
            >
                <h2 className="text-2xl md:text-3xl font-bold text-gray-100 text-center mb-8 tracking-wide">
                    {isLogin ? "Welcome Back to CodeMultiVerse" : "Create Your Account"}
                </h2>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    {!isLogin && (
                        <div className="relative">
                            <FaUser className="absolute top-3.5 left-3 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Username"
                                value={name} onChange={(e) => setName(e.target.value)} // ✅
                                className="w-full pl-10 pr-4 py-3 bg-white/10 text-gray-100 placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                    )}
                    <div className="relative">
                        <FaEnvelope className="absolute top-3.5 left-3 text-gray-400" />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email} onChange={(e) => setEmail(e.target.value)} // ✅
                            className="w-full pl-10 pr-4 py-3 bg-white/10 text-gray-100 placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <div className="relative">
                        <FaLock className="absolute top-3.5 left-3 text-gray-400" />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password} onChange={(e) => setPassword(e.target.value)} // ✅
                            className="w-full pl-10 pr-4 py-3 bg-white/10 text-gray-100 placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-md font-semibold transition shadow-md"
                    >
                        {isLogin ? "Login" : "Sign Up"}
                    </button>
                </form>
                <div className="flex items-center my-6">
                    <div className="flex-grow h-px bg-white/20" />
                    <span className="text-gray-300 text-sm px-4">or continue with</span>
                    <div className="flex-grow h-px bg-white/20" />
                </div>

                <div className="mt-8 flex justify-center gap-4">
                    <button
                        onClick={async () => {
                            try {
                                const provider = new GoogleAuthProvider();
                                const { user } = await signInWithPopup(auth, provider);
                                const idToken = await getIdToken(user);
                                const { data } = await api.post("/api/auth/firebase", { idToken });
                                login(data); // { token, user }
                                navigate("/domains");
                            } catch (err) {
                                console.error(err);
                                alert("Google sign-in failed");
                            }
                        }}
                        className="p-3 bg-white/10 rounded-full"
                    >
                        <FaGoogle />
                    </button>

                    <button
                        onClick={async () => {
                            try {
                                const provider = new GithubAuthProvider();
                                const { user } = await signInWithPopup(auth, provider);
                                const idToken = await getIdToken(user);
                                const { data } = await api.post("/api/auth/firebase", { idToken });
                                login(data); // { token, user }
                                navigate("/domains");
                            } catch (err) {
                                console.error(err);
                                alert("GitHub sign-in failed");
                            }
                        }}
                        className="p-3 bg-white/10 rounded-full"
                    >
                        <FaGithub />
                    </button>
                </div>

                <p className="text-center text-gray-400 mt-6 text-sm">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-indigo-400 ml-2 hover:underline"
                    >
                        {isLogin ? "Sign Up" : "Login"}
                    </button>
                </p>
            </motion.div>
        </div>
    );
}
