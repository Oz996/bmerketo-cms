import { createContext, useState, useEffect, ReactElement } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  email: string | null;
  handleLogin: (token: string, email: string) => void;
  handleLogout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider = ({
  children,
}: {
  children: ReactElement;
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  console.log("isAuthenticated??", isAuthenticated);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");
    if (token) setIsAuthenticated(true);
    setToken(token);
    setEmail(email);
  }, []);

  const handleLogin = (token: string, email: string) => {
    localStorage.setItem("token", token);
    localStorage.setItem("email", email!);
    setIsAuthenticated(true);
    email && setEmail(email);
    setToken(token);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    setIsAuthenticated(false);
    setEmail(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        token,
        email,
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
