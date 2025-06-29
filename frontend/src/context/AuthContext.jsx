import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const cached = localStorage.getItem("user");
  const [user, setUser] = useState(cached ? JSON.parse(cached) : null);
  const [loading, setLoading] = useState(true);

  // ✅ Move fetchUser to top-level so it can be reused
  const fetchUser = async () => {
    try {
      const res = await axios.get("http://localhost:5000/auth/user", {
        withCredentials: true,
      });

      if (res.data) {
        const cleaned = {
          _id: res.data._id,
          email: res.data.email,
          name: res.data.name,
          isAdmin: res.data.isAdmin || false,
        };
        setUser(cleaned);
        localStorage.setItem("user", JSON.stringify(cleaned));
        console.log("Fetched user after OAuth login:", cleaned);
      } else {
        setUser(null);
        localStorage.removeItem("user");
      }
    } catch (err) {
      setUser(null);
      localStorage.removeItem("user");
      console.error("Failed to fetch user:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser(); // ✅ now works because it's defined above
  }, []);

  const login = (payload /* { token, user } */) => {
    setUser(payload.user);
    localStorage.setItem('user', JSON.stringify(payload.user));
    localStorage.setItem('token', payload.token);
  };

  const logout = async () => {
    try {
      await axios.get("http://localhost:5000/auth/logout", {
        withCredentials: true,
      });
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setUser(null);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
