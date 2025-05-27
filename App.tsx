import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import { Login } from './components/Login/Login';

const App: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);


  if (isLoggedIn) {
    return (
      <View style={styles.container}>
        <Text style={styles.successText}>Éxito!</Text>
      </View>
    );
  }

  return <Login onSuccess={() => setIsLoggedIn(true)} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  successText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default App;