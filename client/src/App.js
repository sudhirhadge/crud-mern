import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import ItemList from './components/ItemList';
import Register from './components/Register';
import Login from './components/Login';
import AddItem from './components/AddItem';
import UserInfo from './components/UserInfo';
// import Users from './components/Users';
import { AuthProvider } from './components/context/AuthContext';
import Product from './components/Product';
import "./App.css"

function App() {
  const [currentItem , setCurrentItem] = useState(null)
  return (
    <Provider store={store}>
      <AuthProvider>
        <div className="App">
          <h1>My MERN App</h1>
          <div className='RegisterLogin'>
          <Register />
          <Login />
          </div>
          <UserInfo />
          <AddItem currentItem={currentItem} setCurrentItem={setCurrentItem} />
      <ItemList setCurrentItem={setCurrentItem} />
      <Product/>
          {/* <Users/> */}
        </div>
      </AuthProvider>
    </Provider>
  );
}

export default App;
