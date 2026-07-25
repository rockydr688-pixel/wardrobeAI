import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialUser } from '../services/mockData';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('wardrobe_ai_user');
    return saved ? JSON.parse(saved) : initialUser;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('wardrobe_ai_token') ? true : true; // Default logged in for interactive demo
  });

  useEffect(() => {
    localStorage.setItem('wardrobe_ai_user', JSON.stringify(user));
  }, [user]);

  const login = (email, password) => {
    setIsAuthenticated(true);
    localStorage.setItem('wardrobe_ai_token', 'mock_jwt_token_123');
    setUser(prev => ({ ...prev, email: email || prev.email }));
  };

  const register = (userData) => {
    const newUser = {
      ...initialUser,
      ...userData,
      memberSince: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    };
    setUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem('wardrobe_ai_token', 'mock_jwt_token_456');
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('wardrobe_ai_token');
  };

  const updateUserProfile = (updatedData) => {
    setUser(prev => ({ ...prev, ...updatedData }));
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      login,
      register,
      logout,
      updateUserProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
