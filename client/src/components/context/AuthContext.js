import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get(`${process.env.REACT_APP_BACKEND}/users/me`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          setUser(response.data);
        } catch (error) {
          console.error('Error fetching user info:', error);
        }
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  const login = async (username, password) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND}/users/login`, { username, password });
      const token = response.data.token;
      console.log("token response", response)
      !token && alert(response.data.message) // in case of error 
      localStorage.setItem('token', token);
      const userResponse = await axios.get(`${process.env.REACT_APP_BACKEND}/users/me`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setUser(userResponse.data);
      setError(null)
    } catch (error) {
      console.error('Error logging in:', error);
      setError(error.message)
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
