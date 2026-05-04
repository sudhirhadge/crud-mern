import React, { useContext, useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';

import AuthContext, { AuthProvider } from './components/context/AuthContext';

import "./index.css"
import AppContent from './AppContent';

function App() {
  const [currentItem, setCurrentItem] = useState(null)

  return (
    <Provider store={store}>
      <AuthProvider>
        <AppContent currentItem={currentItem} setCurrentItem={setCurrentItem} />
      </AuthProvider>
    </Provider>
  );
}

export default App;