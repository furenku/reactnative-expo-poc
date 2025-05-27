import React, { useState } from 'react';
import { Login } from './components/Login/Login';
import { MyCamera } from './components/MyCamera/MyCamera';

const App: React.FC = () => {

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  if (isLoggedIn) {
    return (
      <MyCamera onPictureTaken={(uri: string) => console.log('Picture taken:', uri)} />
    );
  }

  return <Login onSuccess={() => setIsLoggedIn(true)} />;

};


export default App;