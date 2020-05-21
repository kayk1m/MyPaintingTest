import React, { useState, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Input, Button } from 'react-native-elements';
import { Picker } from '@react-native-community/picker';
import { sha256 } from 'react-native-sha256';

import AuthContext from '../../AuthContext';

const SignUpScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState(false);

  const { signUp } = useContext(AuthContext);

  const hashPassword = async (input) => {
    return await sha256(input);
  };

  const callSingUp = async () => {
    const hashed = await hashPassword(password);
    signUp(username, name, email, hashed, gender);
  }

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
      <Button title='Sign Up' onPress={() => callSingUp()} />
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
