import React, { useState, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Input, Button } from 'react-native-elements';
import { Picker } from '@react-native-community/picker';
import { sha256 } from 'react-native-sha256';

import AuthContext from '../../AuthContext';
import { signUp } from '../../utils';
import { Spacing } from '../utils_components';

import { ERROR_CODE } from '../../defines';

const SignUpScreen = ({ navigation }) => {
  const [username, setUsername] = useState(null);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [gender, setGender] = useState(false);
  const [error, setError] = useState(null);

  const { setAccessToken, setLoggedIn } = useContext(AuthContext);

  const hashPassword = async (input) => {
    return await sha256(input);
  };

  const handleSignUp = async () => {
    if (!(username && name && email && password && gender)) {
      return await setError('PLEASE FILL ALL BLANKS');
    };
    try {
      const hashed = await hashPassword(password);
      const token = await signUp(username, name, email, hashed, gender);
      if (token.error) {
        switch ( token.error ) {
          case ERROR_CODE.USERNAME_ALREADY_OCCUPIED:
            setError(`SIGNUP_FAILED: USERNAME_ALREADY_OCCUPIED`);
            break;
          case ERROR_CODE.EMAIL_ALREADY_OCCUPIED:
            setError(`SIGNUP_FAILED: EMAIL_ALREADY_OCCUPIED`);
            break;
          default:
            setError(`SIGNUP_FAILED: ${token}`);
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
      <Text>username</Text>
      <Input
        placeholder="username"
        style={styles.textInput}
        value={username}
        onChangeText={setUsername}
      />
      <Text>name</Text>
      <Input
        placeholder="name"
        style={styles.textInput}
        value={name}
        onChangeText={setName}
      />
      <Text>e-mail</Text>
      <Input
        placeholder="e-mail"
        style={styles.textInput}
        value={email}
        onChangeText={setEmail}
      />
      <Text>password</Text>
      <Input
        placeholder="password"
        style={styles.textInput}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Text>gender</Text>
      <Picker
        selectedValue={gender}
        onValueChange={(itemValue, itemIndex) =>
          setGender(itemValue)
        }>
        <Picker.Item label='여성' value={false} />
        <Picker.Item label='남성' value={true} />
      </Picker>
      <Spacing height={20} />
      <Button title='Sign Up' onPress={() => handleSignUp()} />
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
  },
  textInput: {
    borderWidth: 1
  }
});

export default SignUpScreen;
