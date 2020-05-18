import React, { useState, useContext } from 'react';

import {
  SafeAreaView,
  StyleSheet,
  View,
  StatusBar,
  TextInput,
  Button,
  Text
} from 'react-native';

import AuthContext from '../../AuthContext';

import { sha256 } from 'react-native-sha256';

const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { userToken, setUserToken } = useContext(AuthContext);

  const hashPassword = async (input) => {
    return await sha256(input);
  };

  const signIn = async () => {
    const hashed = await hashPassword(password);
    fetch(`http://kay.airygall.com/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password: hashed })
    })
    .then(response => response.json())
    .then(data => {
      console.log('Token Saved: ', data.token);
      setUserToken(data.token);
    })
    .catch((error) => {
      console.error(error);
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle='dark-content' backgroundColor='lavender' />
      <SafeAreaView>
        <View>
          <TextInput
            placeholder="e-mail"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            placeholder="password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <View style={styles.spacing} />
          <Button title='Sign in' onPress={() => signIn()} />
          <View style={styles.spacing} />
          <Button title='Sign Up' onPress={() => navigation.navigate('SignUp')} />
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: 'lavender',
  },
  spacing: {
    margin: 10,
    flex: 1,
  }
});

export default SignInScreen;
