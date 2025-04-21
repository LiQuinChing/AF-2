import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

const LOCAL_KEY = "auth_user";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load user from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem(LOCAL_KEY);
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const login = (username, password) => {
    const savedUser = JSON.parse(localStorage.getItem("registered_user"));
    if (
      savedUser &&
      savedUser.username === username &&
      savedUser.password === password
    ) {
      localStorage.setItem(LOCAL_KEY, JSON.stringify({ name: username }));
      setUser({ name: username });
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem(LOCAL_KEY);
    setUser(null);
  };

  const register = (username, password) => {
    localStorage.setItem(
      "registered_user",
      JSON.stringify({ username, password })
    );
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
