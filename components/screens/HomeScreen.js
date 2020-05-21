import React, { useContext } from 'react';

import { StyleSheet, View, Text, Button } from 'react-native';

import AuthContext from '../../AuthContext';

const HomeScreen = ({ navigation }) => {
  const { accessToken, signOut } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text>{accessToken}</Text>
      <Button
        title="Sign Out"
        onPress={signOut}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lavender',
  }
});

export default HomeScreen;
