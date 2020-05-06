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
import PaletteScreen from './components/screens/PaletteScreen'
import UploadScreen from './components/screens/UploadScreen'
import InboxScreen from './components/screens/InboxScreen'
import MyPageScreen from './components/screens/MyPageScreen'

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name='Home'
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color, size }) => <Icon name='home' size={size} color={color} />,
          }}
        />
        <Tab.Screen
          name='Palette'
          component={PaletteScreen}
          options={{
            tabBarIcon: ({ color, size }) => <Icon name='palette' size={size} color={color} />
          }}
        />
        <Tab.Screen
          name='Upload'
          component={UploadScreen}
          options={{
            tabBarIcon: ({ color, size }) => <Icon name='plus' size={size} color={color} />
          }}
        />
        <Tab.Screen
          name='Inbox'
          component={InboxScreen}
          options={{
            tabBarIcon: ({ color, size }) => <Icon name='email' size={size} color={color} />
          }}
        />
        <Tab.Screen
          name='MyPage'
          component={MyPageScreen}
          options={{
            tabBarIcon: ({ color, size }) => <Icon name='face' size={size} color={color} />
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default MainTabNavigator;
