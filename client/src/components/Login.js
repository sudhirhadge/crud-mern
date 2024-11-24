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

  if(user){
    // if user is having something , then provide logout button
    return <button style={{"margin-left": "auto"}} onClick={()=>logout()}>Log out </button>

  }


  return (
    <form onSubmit={handleLogin}>
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
      <button type="submit">Login</button>
      {error && <h1>{ error } </h1>}
    </form>
  );
}

export default Login;
