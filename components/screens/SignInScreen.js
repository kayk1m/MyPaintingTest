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

  const { signIn } = useContext(AuthContext);

  const hashPassword = async (input) => {
    return await sha256(input);
  };

  const callSignIn = async () => {
    const hashed = await hashPassword(password);
    signIn(email, hashed);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle='dark-content' backgroundColor='lavender' />
      <SafeAreaView>
        <View>
          <Text>email</Text>
          <TextInput
            style={styles.textInput}
            placeholder="e-mail"
            value={email}
            onChangeText={setEmail}
            secureTextEntry={false}
          />
          <Text>password</Text>
          <TextInput
            style={styles.textInput}
            placeholder="password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
          />
          <View style={styles.spacing} />
          <Button title='Sign in' onPress={() => callSignIn()} />
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
    backgroundColor: 'lavender',
  },
  spacing: {
    margin: 10,
    flex: 1,
  },
  textInput: {
    borderWidth: 1
  }
});

export default SignInScreen;
