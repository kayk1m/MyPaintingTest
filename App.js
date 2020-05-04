/*
  This app is for practicing RN
  created at 2020.05.04

  ALL COPYRIGHTS kimjh@bawi.org
 */

import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
} from 'react-native';

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle='dark-content' backgroundColor='lavender'/>
      <SafeAreaView style={styles.container}>
        <Text style={styles.textHelloWorld}>Hello World!</Text>
      </SafeAreaView>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lavender',
  },
  textHelloWorld: {
    fontSize: 30
  }
});

export default App;
