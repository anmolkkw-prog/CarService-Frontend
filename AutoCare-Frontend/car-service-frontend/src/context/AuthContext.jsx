import { createContext, useContext, useMemo, useState } from "react";
import { api } from "../api";

const AuthContext = createContext(null);

const readUser = () => {
  try {
    return JSON.parse(localStorage.getItem("autocare_user")) || null;
  } catch {
    return null;
  }
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readUser);
  const [token, setToken] = useState(
    () => localStorage.getItem("autocare_token") || ""
  );

  const login = async (credentials) => {
    const data = await api.login(credentials);
    const decodedUser = decodeToken(data.token);

    localStorage.setItem("autocare_token", data.token);
    localStorage.setItem("autocare_user", JSON.stringify(decodedUser));

    setToken(data.token);
    setUser(decodedUser);

    return data;
  };

  const register = (body) => api.register(body);

  const logout = () => {
    localStorage.removeItem("autocare_token");
    localStorage.removeItem("autocare_user");
    setToken("");
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(token),
      isAdmin: user?.role === "admin",
      login,
      register,
      logout
    }),
    [user, token]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function decodeToken(token) {
  try {
    const payload = token.split(".")[1];
    const json = decodeURIComponent(
      atob(payload.replace(/-/g, "+").replace(/_/g, "/"))
        .split("")
        .map((char) => `%${("00" + char.charCodeAt(0).toString(16)).slice(-2)}`)
        .join("")
    );
    return JSON.parse(json);
  } catch {
    return {};
  }
}

export const useAuth = () => useContext(AuthContext);
