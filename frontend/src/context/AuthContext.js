import React, { createContext, useState, useEffect } from 'react';
import authService from '../services/authService';
import { jwtDecode } from 'jwt-decode';


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const setupAutoLogout = (token) => {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      const timeLeft = (decodedToken.exp - currentTime) * 1000;
  
      setTimeout(() => {
        logout();
      }, timeLeft);
    };
  
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setCurrentUser(user);
      setupAutoLogout(user.token);
    }
  }, []);

  const login = async (username, password) => {
    try {
      const response = await authService.login(username, password);
      setCurrentUser(response);
      localStorage.setItem('user', JSON.stringify(response));
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = () => {
    authService.logout();
    setCurrentUser(null);
    localStorage.removeItem('user');
  };

  const register = async (username, email, password) => {
    try {
      await authService.register(username, email, password);
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  };

  const requestPasswordReset = async (email) => {
    try {
      await authService.requestPasswordReset(email);
    } catch (error) {
      console.error('Request password reset failed:', error);
      throw error;
    }
  };

  const resetPassword = async (token, newPassword) => {
    try {
      await authService.resetPassword(token, newPassword);
    } catch (error) {
      console.error('Password reset failed:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, register, requestPasswordReset, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
};

