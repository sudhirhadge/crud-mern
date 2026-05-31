import { useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';

import { AuthProvider } from './components/context/AuthContext';

import "./index.css";
import PersonaliseApp from './PersonaliseApp';

function App() {
  const [currentItem, setCurrentItem] = useState(null)

  return (
    <Provider store={store}>
      <AuthProvider>
        {/* <AppContent currentItem={currentItem} setCurrentItem={setCurrentItem} /> */}
        <PersonaliseApp />
      </AuthProvider>
    </Provider>
  );
}

export default App;