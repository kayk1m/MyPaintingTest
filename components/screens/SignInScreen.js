import React, { useState, useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button, Input } from 'react-native-elements';
import { sha256 } from 'react-native-sha256';

import AuthContext from '../../AuthContext';
import { signIn } from '../../utils';

import { ERROR_CODE } from '../../defines';

const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { setAccessToken, setLoggedIn } = useContext(AuthContext);

  const hashPassword = async (input) => {
    return await sha256(input);
  };

  const handleSignIn = async () => {
    try {
      const hashed = await hashPassword(password);
      const token = await signIn(email, hashed);
      if (token.error) {
        switch ( token.error ) {
          case ERROR_CODE.NO_SUCH_USER:
            console.log(`LOGIN_FAILED: NO_SUCH_USER`);
            break;
          case ERROR_CODE.PASSWORD_WRONG:
            console.log(`LOGIN_FAILED: PASSWORD_WRONG`);
            break;
          default:
            console.log(`LOGIN_FAILED: ${token}`);
        }
      } else {
        setAccessToken(token);
        setLoggedIn(true);
      };
    } catch (e) {
      console.error(e);
    };
  };

  return (
    <View style={styles.container}>
      <Text>email</Text>
      <Input
        placeholder="e-mail"
        value={email}
        onChangeText={setEmail}
        secureTextEntry={false}
      />
      <Text>password</Text>
      <Input
        placeholder="password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />
      <View style={styles.spacing} />
      <Button title='Sign in' onPress={() => handleSignIn()} />
      <View style={styles.spacing} />
      <Button title='Sign Up' onPress={() => navigation.navigate('SignUp')} />
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
    height: 20,
  }
});

export default SignInScreen;
