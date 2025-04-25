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

  const register = (username, password) => {
    const users = JSON.parse(localStorage.getItem("registered_users")) || [];

    // Check if username already exists
    const exists = users.some((u) => u.username === username);
    if (exists) {
      throw new Error("Username already exists");
    }

    users.push({ username, password });
    localStorage.setItem("registered_users", JSON.stringify(users));
  };

  const login = (username, password) => {
    const users = JSON.parse(localStorage.getItem("registered_users")) || [];
    const foundUser = users.find(
      (u) => u.username === username && u.password === password
    );

    if (foundUser) {
      const sessionUser = { name: foundUser.username };
      localStorage.setItem(LOCAL_KEY, JSON.stringify(sessionUser));
      setUser(sessionUser);
      return true;
    }

    return false;
  };

  const logout = () => {
    localStorage.removeItem(LOCAL_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
