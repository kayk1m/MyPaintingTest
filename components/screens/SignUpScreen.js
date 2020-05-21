import React, { useState, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Input, Button } from 'react-native-elements';
import { Picker } from '@react-native-community/picker';
import { sha256 } from 'react-native-sha256';

import AuthContext from '../../AuthContext';
import { signUp } from '../../utils';

import { ERROR_CODE } from '../../defines';

const SignUpScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState(false);

  const { setAccessToken, setLoggedIn } = useContext(AuthContext);

  const hashPassword = async (input) => {
    return await sha256(input);
  };

  const handleSignUp = async () => {
    try {
      const hashed = await hashPassword(password);
      const token = await signUp(username, name, email, hashed, gender);
      if (token.error) {
        switch ( token.error ) {
          case ERROR_CODE.USERNAME_ALREADY_OCCUPIED:
            console.log(`SIGNUP_FAILED: USERNAME_ALREADY_OCCUPIED`);
            break;
          case ERROR_CODE.EMAIL_ALREADY_OCCUPIED:
            console.log(`SIGNUP_FAILED: EMAIL_ALREADY_OCCUPIED`);
            break;
          default:
            console.log(`SIGNUP_FAILED: ${token}`);
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
        style={styles.textInput}
        value={username}
        onChangeText={setUsername}
      />
      <Text>name</Text>
      <Input
        style={styles.textInput}
        value={name}
        onChangeText={setName}
      />
      <Text>e-mail</Text>
      <Input
        style={styles.textInput}
        value={email}
        onChangeText={setEmail}
      />
      <Text>password</Text>
      <Input
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
      <View style={styles.spacing} />
      <Button title='Sign Up' onPress={() => handleSignUp()} />
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
