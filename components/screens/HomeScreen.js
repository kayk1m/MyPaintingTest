import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button } from 'react-native-elements';

import AuthContext from '../../AuthContext';
import { Spacing } from '../utils_components';

const HomeScreen = ({ navigation }) => {
  const { accessToken, signOut } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text h3>TOKEN: </Text>
      <Spacing height={30} />
      <Text>{accessToken}</Text>
      <Spacing height={30} />
      <Button
        title="Sign Out"
        onPress={signOut}
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
