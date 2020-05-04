/*
  This app is for practicing RN
  created at 2020.05.04

  ALL COPYRIGHTS kimjh@bawi.org
 */

import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();

import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
} from 'react-native';

const Navigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => <Icon name="home" size={size} color={color} />,
          }}
        />
        <Tab.Screen name="Detail" component={DetailScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle='dark-content' backgroundColor='lavender' />
      <SafeAreaView>
        <Text style={styles.textHelloWorld}>Hello World!</Text>
      </SafeAreaView>
    </View>
  )
}

const DetailScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle='dark-content' backgroundColor='lavender' />
      <SafeAreaView>
        <Text style={styles.textHelloWorld}>Detailed Page!</Text>
      </SafeAreaView>
    </View>
  )
}

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
})

export default Navigator;
