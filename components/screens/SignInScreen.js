import React, { useState, useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button, Input } from 'react-native-elements';
import { sha256 } from 'react-native-sha256';

import AuthContext from '../../AuthContext';

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
      <Button title='Sign in' onPress={() => callSignIn()} />
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
