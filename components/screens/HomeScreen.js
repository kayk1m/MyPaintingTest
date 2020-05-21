import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button } from 'react-native-elements';

import AuthContext from '../../AuthContext';
import { Spacing } from '../utils_components';
import { signOut } from '../../utils';

const HomeScreen = ({ navigation }) => {
  const { accessToken, setLoggedIn } = useContext(AuthContext);

  const handleSignOut = async () => {
    await signOut();
    setLoggedIn(false);
  }

  return (
    <View style={styles.container}>
      <Text h3>TOKEN: </Text>
      <Spacing height={30} />
      <Text>{accessToken}</Text>
      <Spacing height={30} />
      <Button
        title="Sign Out"
        onPress={() => handleSignOut()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lavender',
  }
});

export default HomeScreen;
