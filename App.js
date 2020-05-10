/*
  This app is for practicing RN
  created at 2020.05.04

  ALL COPYRIGHTS kimjh@bawi.org
 */

import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeScreen from './components/screens/HomeScreen'
import PaintingScreen from './components/screens/PaintingScreen'
import ProductScreen from './components/screens/ProductScreen'
import MyPageScreen from './components/screens/MyPageScreen'
import PostListScreen from './components/screens/PostListScreen'

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Home' component={HomeScreen} />
      <Stack.Screen name='PostList' component={PostListScreen} options={({ route }) => ({ title: route.params.id })}/>
    </Stack.Navigator>
  )
}

const MyPageStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='MyPage' component={MyPageScreen} />
      <Stack.Screen name='PostList' component={PostListScreen} options={({ route }) => ({ title: route.params.id })}/>
    </Stack.Navigator>
  )
}

const MainTabNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name='HomeStack'
          component={HomeStack}
          options={{
            tabBarIcon: ({ color, size }) => <Icon name='home' size={size} color={color} />,
          }}
        />
        <Tab.Screen
          name='Painting'
          component={PaintingScreen}
          options={{
            tabBarIcon: ({ color, size }) => <Icon name='palette' size={size} color={color} />
          }}
        />
        <Tab.Screen
          name='Product'
          component={ProductScreen}
          options={{
            tabBarIcon: ({ color, size }) => <Icon name='cart' size={size} color={color} />
          }}
        />
        <Tab.Screen
          name='MyPageStack'
          component={MyPageStack}
          options={{
            tabBarIcon: ({ color, size }) => <Icon name='face' size={size} color={color} />
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default MainTabNavigator;
