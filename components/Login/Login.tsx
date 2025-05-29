import React, { useState } from 'react';
import { StyleSheet, View, Button, Alert, Image } from 'react-native';
import { storeData } from '../../utils/storage';
import { theme } from '@/theme/theme';
import { useBaseStyles } from '@/styles/useBaseStyles';
import { Text } from '../ui/Text';
import { TextInput } from '../ui/TextInput';

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
    <View style={ [ styles.app, styles.container]}>
      <View style={{
          width: 200,
          height: 200,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 16
        }}>

        <Image source={require('../../assets/images/accionar_logo.png')} style={{
          width: 100,
          height: 100,
          opacity: 0.75,
          marginBottom: 20,
          overflow: 'hidden',
          objectFit: 'contain'
        }} />
        <Text>Login</Text>
        <TextInput
          
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          
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
  app: {
    
  },
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
  successText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
});