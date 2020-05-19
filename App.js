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

import AuthContext from './AuthContext';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
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
    </Stack.Navigator>
  );
};

const App = () => {
  const [userToken, setUserToken] = React.useState(null);
  const [isLoading, setLoading] = React.useState(true);

  React.useEffect(() => {
    console.log(`useEffect Called!`);
    restoreToken();
    console.log(`userToken: ${userToken}`);
    setLoading(false);
  }, []);

  const storeToken = async (token) => {
    try {
      const jsonToken = JSON.stringify(token);
      await AsyncStorage.setItem('@userToken', jsonToken);
      console.log(`TOKEN STORED: ${token}`);
    } catch (error) {
      console.error(`TOKEN STORING FAILED: ${error}`);
    };
  };

  const restoreToken = async () => {
    setLoading(true);
    try {
      const jsonToken = await AsyncStorage.getItem('@userToken');
      if (jsonToken == null) {
        console.log('RESTORED TOKEN IS NULL');
      } else {
        const token = JSON.parse(jsonToken);
        setUserToken(token);
        console.log(`TOKEN RESTORED: ${token}`);
      };
    } catch (error) {
      console.log(`No Token (Token Retoring Failed)`);
    };

    setLoading(false);
  };

  const signIn = async (email, password) => {
    setLoading(true);
    await fetch(`http://kay.airygall.com/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('SIGN IN FAILED');
      };
      return response.json();
    })
    .then(data => {
      setUserToken(data.token);
      storeToken(data.token);
      console.log('recievedToken: ', data.token);
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      setLoading(false);
    });
  };

  const signUp = async (username, name, email, password, gender) => {
    setLoading(true);
    await fetch(`http://kay.airygall.com/auth/join`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, name, email, password, gender })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('SIGN IN FAILED');
      };
      return response.json();
    })
    .then(data => {
      setUserToken(data.token);
      storeToken(data.token);
      setLoading(false);
      console.log('recievedToken: ', data.token);
      console.log('userToken: ', userToken);
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      setLoading(false);
    });
  };

  if (isLoading) {
    return <LoadingScreen />;
  };
  return (
    <AuthContext.Provider value={{ userToken, signIn, signUp }}>
      <NavigationContainer>
        {userToken == null ? (
          <Stack.Navigator>
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
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
