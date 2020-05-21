import React, { useState, useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button, Input } from 'react-native-elements';
import { sha256 } from 'react-native-sha256';

import AuthContext from '../../AuthContext';
import { signIn } from '../../utils';
import { Spacing } from '../utils_components';

import { ERROR_CODE } from '../../defines';

const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(null)

  const { setAccessToken, setLoggedIn } = useContext(AuthContext);

  const hashPassword = async (input) => {
    return await sha256(input);
  };

  const handleSignIn = async () => {
    if (!(email && password)) {
      return await setError('PLEASE FILL ALLL BLANKS');
    }
    try {
      const hashed = await hashPassword(password);
      const token = await signIn(email, hashed);
      if (token.error) {
        switch ( token.error ) {
          case ERROR_CODE.NO_SUCH_USER:
            setError(`LOGIN_FAILED: NO_SUCH_USER`);
            break;
          case ERROR_CODE.PASSWORD_WRONG:
            setError(`LOGIN_FAILED: PASSWORD_WRONG`);
            break;
          default:
            setError(`LOGIN_FAILED: ${token}`);
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
      <Spacing height={20} />
      <Button title='Sign in' onPress={() => handleSignIn()} />
      <Spacing height={20} />
      <Button title='Sign Up' onPress={() => navigation.navigate('SignUp')} />
      <Spacing height={20} />
      <Text h4>{error}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'lavender',
  }
});

export default SignInScreen;
