import React, { useState } from 'react';
import { Login } from './components/Login/Login';
import { Test } from './components/Test/Test';

const App: React.FC = () => {

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  if (isLoggedIn) {
    return (
      <Test/>
    );
  }

  return <Login onSuccess={() => setIsLoggedIn(true)} />;

};


export default App;