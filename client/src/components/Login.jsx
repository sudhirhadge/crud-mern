import React, { useState, useContext } from 'react';
import AuthContext from '../components/context/AuthContext';
import { useDispatch } from 'react-redux';
import { fetchItems } from '../features/items/itemsSlice';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { user, login, error, logout } = useContext(AuthContext);
  const dispatch = useDispatch()
  const handleLogin = async (e) => {
    e.preventDefault();
    await login(username, password);
    // refresh user item List
    dispatch(fetchItems());
  };

  if (user) {
    return (
      <button
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
        onClick={() => logout()}
      >
        Logout
      </button>
    );
  }

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <input
        className="w-full border border-gray-300 dark:border-gray-700 px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        className="w-full border border-gray-300 dark:border-gray-700 px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
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

      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md">
        Login
      </button>
    </form>
  );
}
export default Login;
