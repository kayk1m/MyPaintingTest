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

import { SERVER_URL } from './components/defines';

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
    <Stack.Navigator headerMode='none'>
      <Stack.Screen name='Painting' component={PaintingScreen} />
      <Stack.Screen name='Profile' component={ProfileScreen} options={({ route }) => ({ title: route.params.user_name })}/>
      <Stack.Screen name='PaintingDetail' component={PaintingDetailScreen} options={({ route }) => ({ title: route.params.painting_name })}/>
    </Stack.Navigator>
  );
};

const MyPageStack = () => {
  return (
    <Stack.Navigator headerMode='none'>
      <Stack.Screen name='MyPage' component={MyPageScreen} />
      <Stack.Screen name='Profile' component={ProfileScreen} options={({ route }) => ({ title: route.params.user_name })}/>
      <Stack.Screen name='PaintingDetail' component={PaintingDetailScreen} options={({ route }) => ({ title: route.params.painting_name })}/>
    </Stack.Navigator>
  );
};

const App = () => {
  const [accessToken, setAccessToken] = React.useState(null);
  const [refreshToken, setRefreshToken] = React.useState(null);
  const [isLoading, setLoading] = React.useState(true);
  const [isLoggedIn, setLoggedIn] = React.useState(false);

  React.useEffect(() => {
    console.log(`useEffect Called!`);
    restoreToken();
  }, []);

  const storeToken = async (access_token, refresh_token) => {
    try {
      await AsyncStorage.setItem('@refresh_token', JSON.stringify(refresh_token));
      await AsyncStorage.setItem('@access_token', JSON.stringify(access_token));
      console.log(`REFRESH_TOKEN STORED: ${refresh_token}`);
      console.log(`ACCESS_TOKEN STORED: ${access_token}`);
    } catch (e) {
      throw new Error(`TOKEN STORING FAILED: ${e}`);
    };
  };

  const restoreToken = async () => {
    try {
      const refresh_token = JSON.parse(await AsyncStorage.getItem('@refresh_token'));
      const access_token = JSON.parse(await AsyncStorage.getItem('@access_token'));

      console.log(`REFRESH_TOKEN RESTORED: ${refresh_token}`);
      console.log(`ACCESS_TOKEN RESTORED: ${access_token}`);

      if (refresh_token && access_token) {
        getAccessToken(refresh_token, access_token);
      } else {
        setLoading(false);
      }
    } catch (e) {
      throw new Error(`No Token (Token Retoring Failed): ${e}`);
    };
  };

  const getAccessToken = async (refresh_token, access_token) => {
    try {
      const response = await fetch(`${SERVER_URL}/auth/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': access_token
        },
        body: JSON.stringify({ refresh_token })
      });

      const resJson = await response.json();
      if (!response.ok) {
        console.log(`GET ACCESS_TOKEN ERROR: ${JSON.stringify(resJson)}`);
        // need handling failure
      } else {
        setAccessToken(resJson.token);
        setRefreshToken(refresh_token);
        storeToken(resJson.token, refresh_token);
        console.log(`ACCESS_TOKEN RECIEVED: ${resJson.token}`);
        setLoggedIn(true);
      };
    } catch (e) {
      throw new Error(`ERROR: ${e}`);
    } finally {
      setLoading(false);
    };
  };

  const signIn = async (email, password) => {
    try {
      const response = await fetch(`${SERVER_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
      });

      const resJson = await response.json();
      if (!response.ok) {
        console.log(`SIGN IN ERROR: ${JSON.stringify(resJson)}`);
        // need handling failure
      } else {
        setAccessToken(resJson.token);
        setRefreshToken(resJson.refresh_token);
        storeToken(resJson.token, resJson.refresh_token);
        console.log(`SIGN IN SUCESS`);
        setLoggedIn(true);
      }
    } catch (e) {
      throw new Error(`ERROR: ${e}`);
    };
  };

  const signUp = async (username, name, email, password, gender) => {
    try {
      const response = await fetch(`${SERVER_URL}/auth/join`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, name, email, password, gender })
      });

      const resJson = await response.json();
      if (!response.ok) {
        console.log(`SIGN UP ERROR: ${JSON.stringify(resJson)}`);
        // need handling failure
      } else {
        setAccessToken(resJson.token);
        setRefreshToken(resJson.refresh_token);
        storeToken(resJson.token, resJson.refresh_token);
        console.log(`SIGN IN SUCESS`);
        setLoggedIn(true);
      }
    } catch (e) {
      throw new Error(`ERROR: ${e}`);
    };
  };

  const removeStoredToken = async (key) => {
    try {
      await AsyncStorage.removeItem(key);
      console.log(`REMOVED STORED TOKEN WITH KEY: ${key}`);
      return true;
    } catch (e) {
      return false;
    };
  };

  const signOut = () => {
    removeStoredToken('@refresh_token');
    removeStoredToken('@access_token');
    setLoggedIn(false);
  };

  if (isLoading) {
    return <LoadingScreen />;
  };
  return (
    <AuthContext.Provider value={{ accessToken, signIn, signUp, signOut }}>
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
