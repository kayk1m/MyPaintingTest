/*
  This app is for practicing RN
  created at 2020.05.04

  ALL COPYRIGHTS kimjh@bawi.org
 */

import 'react-native-gesture-handler';
import * as React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeScreen from './components/screens/HomeScreen';
import PaintingScreen from './components/screens/PaintingScreen';
import ProductScreen from './components/screens/ProductScreen';
import MyPageScreen from './components/screens/MyPageScreen';
import ProfileScreen from './components/screens/ProfileScreen';
import PaintingDetailScreen from './components/screens/PaintingDetailScreen';
import SignInScreen from './components/screens/SignInScreen';
import SignUpScreen from './components/screens/SignUpScreen';
import LoadingScreen from './components/screens/LoadingScreen';

import { restoreToken } from './utils';

import { SERVER_URL, ERROR_CODE } from './defines';

import AuthContext from './AuthContext';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator headerMode='none'>
      <Stack.Screen name='Home' component={HomeScreen} />
    </Stack.Navigator>
  );
};

const PaintingStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Painting' component={PaintingScreen} />
      <Stack.Screen name='Profile' component={ProfileScreen} options={({ route }) => ({ title: route.params.user_name })}/>
      <Stack.Screen name='PaintingDetail' component={PaintingDetailScreen} options={({ route }) => ({ title: route.params.painting_name })}/>
    </Stack.Navigator>
  );
};

const MyPageStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='MyPage' component={MyPageScreen} />
      <Stack.Screen name='Profile' component={ProfileScreen} options={({ route }) => ({ title: route.params.user_name })}/>
      <Stack.Screen name='PaintingDetail' component={PaintingDetailScreen} options={({ route }) => ({ title: route.params.painting_name })}/>
    </Stack.Navigator>
  );
};

const App = () => {
  const [accessToken, setAccessToken] = React.useState(null);
  const [isLoading, setLoading] = React.useState(true);
  const [isLoggedIn, setLoggedIn] = React.useState(false);

  React.useEffect(() => {
    console.log(`useEffect Called!`);
    getTokens();
  }, []);

  const getTokens = async () => {
    try {
      const token = await restoreToken();
      if (token != null) {
        setAccessToken(token);
        setLoggedIn(true);
      }
    } catch (e) {
      throw new Error(`ERROR: ${e}`);
    } finally {
      setLoading(false);
    };
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      setLoggedIn(false);
    } catch (e) {
      throw new Error(`ERROR: ${e}`);
    };
  };

  if (isLoading) {
    return <LoadingScreen />;
  };
  return (
    <AuthContext.Provider
      value={{
        accessToken,
        setAccessToken,
        setLoggedIn
      }}>
      <NavigationContainer>
        {!isLoggedIn ? (
          <Stack.Navigator headerMode='none'>
            <Stack.Screen name='SignIn' component={SignInScreen} />
            <Stack.Screen name='SignUp' component={SignUpScreen} />
          </Stack.Navigator>
        ) : (
          <Tab.Navigator>
            <Tab.Screen
              name='Home'
              component={HomeStack}
              options={{
                tabBarIcon: ({ color, size }) => <Icon name='home' size={size} color={color} />,
              }}
            />
            <Tab.Screen
              name='Painting'
              component={PaintingStack}
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
              name='MyPage'
              component={MyPageStack}
              options={{
                tabBarIcon: ({ color, size }) => <Icon name='face' size={size} color={color} />
              }}
            />
          </Tab.Navigator>
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;
