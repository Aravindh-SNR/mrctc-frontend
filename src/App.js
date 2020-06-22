import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import UserContextProvider from './contexts/UserContext';
import AppRouter from './routes/AppRouter';

function App() {
  return (
    <UserContextProvider>
      <AppRouter />
    </UserContextProvider>
  );
}

export default App;
