import React, { useContext, useState } from 'react';
import axios from 'axios';
import AuthContext from './context/AuthContext';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null)
  const { user, login } = useContext(AuthContext);

  if (user) {
    return null
  }

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/users/register`, { username, password });

      // ✅ auto login after register
      await login(username, password);

      setError("");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleRegister} className="space-y-4">
      <input
        className="w-full border border-gray-300 dark:border-gray-700 px-3 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        className="w-full border border-gray-300 dark:border-gray-700 px-3 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {error && (
        <div className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-300 text-sm p-2 rounded">
          {error}
        </div>
      )}

      <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md">
        Register
      </button>
    </form>
  );
}

export default Register;
