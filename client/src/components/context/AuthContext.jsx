import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null)
  const [accessToken, setAccessToken] = useState(null)

  useEffect(() => {
    const fetchUser = async () => {
      const token = accessToken; // Get the token from state
      if (token) {
        try {
          const response = await axios.get(`${import.meta.env.VITE_API_URL}/users/me`, {
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
  }, [accessToken]); // Re-run when accessToken changes

  const login = async (username, password) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/users/login`, { username, password },
        {
          withCredentials: true // Ensure cookies are included in the request
        }
      );
      const token = response.data.accessToken;
      console.log("token response", response)
      alert(response.data.message) // Show the message from the server in an alert
      // localStorage.setItem('token', token);
      setAccessToken(token);
      const userResponse = await axios.get(`${import.meta.env.VITE_API_URL}/users/me`, {
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
    // localStorage.removeItem('token');
    setUser(null);
    setAccessToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, error, accessToken, setAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
