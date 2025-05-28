import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, Image } from 'react-native';
import { storeData } from '../../utils/storage';

interface Props { onSuccess: () => void }

export const Login: React.FC<Props> = ({ onSuccess }) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = async () => {
    if (username === 'abc' && password === 'abc') {
      // Store login state
      await storeData('isLoggedIn', true);
      await storeData('username', username);
      onSuccess();
    } else {
      Alert.alert('Error', 'Invalid username or password');
    }
  };


  return (
    <View style={styles.container}>
      <View style={{
          width: 200,
          height: 200,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>

        <Image source={require('../../assets/images/accionar_logo.png')} style={{
          width: 200,
          height: 200,
          marginBottom: 20,
          overflow: 'hidden',
          objectFit: 'contain'
        }} />
        <Text style={styles.text}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button title="Login" onPress={handleLogin} />
      
      </View>
    </View>
  );
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