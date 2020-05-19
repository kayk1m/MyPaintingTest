import React, { useContext } from 'react';

import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  Button
} from 'react-native';

import AuthContext from '../../AuthContext';

const HomeScreen = ({ navigation }) => {
  const { accessToken, signOut } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <StatusBar barStyle='dark-content' backgroundColor='lavender' />
      <SafeAreaView>
        <Text>{accessToken}</Text>
        <Button
          title="Sign Out"
          onPress={signOut}
        />
      </SafeAreaView>
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
