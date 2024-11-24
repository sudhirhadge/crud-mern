import React, { useContext, useState } from 'react';
import axios from 'axios';
import AuthContext from './context/AuthContext';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null)
  const { user } = useContext(AuthContext);

  if(user){
    return null
  }

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND}/users/register`, { username, password });
      console.log('Registration successful');
      setError("")

    } catch (error) {
      console.error('Error registering:', error);
      setError(error.message)
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Register</button>
      {error && <h1>{ error } </h1>}
    </form>
  );
}

export default Register;
