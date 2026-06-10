import { useState, useEffect } from 'react';
import { authService, AuthResponse } from '../services/authService';

export const useAuth = () => {
  const [user, setUser] = useState<AuthResponse['user'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      const token = localStorage.getItem('token');
      if (storedUser && token) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (e) {
          console.error('Failed to parse stored user', e);
          localStorage.removeItem('user');
          localStorage.removeItem('token');
        }
      }
    } catch (e) {
      console.error('LocalStorage access failed', e);
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setError(null);
      const data = await authService.login(email, password);
      setUser(data.user);
      try {
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('token', data.token);
      } catch (e) {
        console.error('Failed to save to localStorage', e);
      }
      return true;
    } catch (err: any) {
      setError(err.response?.data?.error || 'Login failed');
      return false;
    }
  };

  const register = async (fullName: string, email: string, password: string, role: string) => {
    try {
      setError(null);
      const data = await authService.register(fullName, email, password, role);
      setUser(data.user);
      try {
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('token', data.token);
      } catch (e) {
        console.error('Failed to save to localStorage', e);
      }
      return true;
    } catch (err: any) {
      setError(err.response?.data?.error || 'Registration failed');
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    } catch (e) {
      console.error('Failed to remove from localStorage', e);
    }
  };

  const refreshUser = async () => {
    try {
      const updatedUser = await authService.me();
      setUser(updatedUser);
      try {
        localStorage.setItem('user', JSON.stringify(updatedUser));
      } catch (e) {
        console.error('Failed to save to localStorage', e);
      }
    } catch (err) {
      console.error('Failed to refresh user');
    }
  };

  return { user, loading, error, login, register, logout, refreshUser };
};
