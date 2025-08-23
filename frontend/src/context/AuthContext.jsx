import { createContext, useContext, useEffect, useState } from "react";
import API from "../api";

const AuthCtx = createContext(null);
export const useAuth = () => useContext(AuthCtx);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // load session if exists
  useEffect(() => {
    (async () => {
      try {
        const { data } = await API.get("/api/auth/me");
        setUser(data.user);
      } catch { /* not logged in */ }
      setLoading(false);
    })();
  }, []);

  const login = async (email, password) => {
    const { data } = await API.post("/api/auth/login", { email, password });
    setUser(data.user);
  };

  const register = async (name, email, password) => {
    const { data } = await API.post("/api/auth/register", { name, email, password });
    setUser(data.user);
  };

  const logout = async () => {
    await API.post("/api/auth/logout");
    setUser(null);
  };

  return (
    <AuthCtx.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthCtx.Provider>
  );
}
