import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    if (authService.validateSession()) {
      return authService.getCurrentUser();
    }
    return null;
  });

  useEffect(() => {
    if (!authService.validateSession()) {
      setUser(null);
    } else {
      setUser(authService.getCurrentUser());
    }
  }, []);

  const login = async (username, password) => {
    const data = await authService.login(username, password);
    setUser(data.user);
    return data;
  };

  const register = async (formData) => {
    const data = await authService.register(formData);
    setUser(data.user);
    return data;
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoggedIn: authService.validateSession() }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
