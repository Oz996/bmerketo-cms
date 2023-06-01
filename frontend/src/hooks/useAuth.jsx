import React, { useEffect, useState } from "react";

// Hook that handles login/logout of an admin by storing or removing login token
// isAutheticated state can be used to display or hide elements depending on if logged in or not

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token || false);
  }, []);

  const handleLogin = (token) => {
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return { isAuthenticated, handleLogin, handleLogout };
};

export default useAuth;
