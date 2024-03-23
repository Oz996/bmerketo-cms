import { createContext, useState, useEffect, ReactElement } from "react";

interface AuthContextType {
  isAdmin: boolean;
  token: string | null;
  email: string | null;
  handleLogin: (token: string, email: string) => void;
  handleLogout: () => void;
  handleAdminLogin: (token: string) => void;
  handleAdminLogout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider = ({
  children,
}: {
  children: ReactElement;
}) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const email = localStorage.getItem("email");
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
      setEmail(email);
    }
  }, []);

  const handleLogin = (token: string, email: string) => {
    localStorage.setItem("token", token);
    localStorage.setItem("email", email!);
    email && setEmail(email);
    setToken(token);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    setEmail(null);
    setToken(null);
  };

  const handleAdminLogin = (token: string) => {
    localStorage.setItem("token", token);
    setToken(token);
    setIsAdmin(true);
  };

  const handleAdminLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAdmin,
        token,
        email,
        handleLogin,
        handleLogout,
        handleAdminLogin,
        handleAdminLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
