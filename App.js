/*
  This app is for practicing RN
  created at 2020.05.04

  ALL COPYRIGHTS kimjh@bawi.org
 */

import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeScreen from './components/screens/HomeScreen'
import PaletteScreen from './components/screens/PaletteScreen'
import UploadScreen from './components/screens/UploadScreen'
import InboxScreen from './components/screens/InboxScreen'
import MyPageScreen from './components/screens/MyPageScreen'

const Tab = createBottomTabNavigator();

const Navigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name='Home'
          component={HomeScreen}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => <Icon name='home' size={size} color={color} />,
          }}
        />
        <Tab.Screen
          name='Palette'
          component={PaletteScreen}
          options={{
            tabBarLabel: 'Palette',
            tabBarIcon: ({ color, size }) => <Icon name='palette' size={size} color={color} />
          }}
        />
        <Tab.Screen
          name='Upload'
          component={UploadScreen}
          options={{
            tabBarLabel: 'Upload',
            tabBarIcon: ({ color, size }) => <Icon name='plus' size={size} color={color} />
          }}
        />
        <Tab.Screen
          name='Inbox'
          component={InboxScreen}
          options={{
            tabBarLabel: 'Inbox',
            tabBarIcon: ({ color, size }) => <Icon name='email' size={size} color={color} />
          }}
        />
        <Tab.Screen
          name='MyPage'
          component={MyPageScreen}
          options={{
            tabBarLabel: 'MyPage',
            tabBarIcon: ({ color, size }) => <Icon name='face' size={size} color={color} />
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default Navigator;
