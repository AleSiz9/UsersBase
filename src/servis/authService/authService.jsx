import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { API_URL } from '../api';
import bcrypt from 'bcryptjs';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate()
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchUserData = useCallback(async () => {
    try {
      const userStr = localStorage.getItem('user');
      const isLoggedIn = localStorage.getItem('isLoggedIn');

      if (userStr && isLoggedIn === 'true') {
        const userData = JSON.parse(userStr);
        setUser(userData);
      }
    } catch (error) {
      console.error('Error loading user:', error);
      localStorage.removeItem('user');
      localStorage.removeItem('isLoggedIn');
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback(async (login, password) => {
    try {
      setLoading(true);
      setError('');
      const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      });

      const allUsers = await response.json();

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const user = allUsers.find(user => user.login === login);

      if (!user) {
        throw new Error('Пользователь не зарегестрирован');
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new Error('Неверный пароль');
      }

      const userData = {
        id: user.id, 
        login: user.login,
        avatar: user.avatar || '',
        name: user.name || ''
      };

      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('isLoggedIn', 'true');

      setUser(userData);
      return { success: true, user: userData };

    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setError('');
    localStorage.removeItem('user');
    localStorage.removeItem('isLoggedIn');
    navigate('/')
  }, [navigate]);

  const clearError = useCallback(() => setError(''), []);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const value = {
    user,
    login,
    logout,
    loading,
    error,
    clearError,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};