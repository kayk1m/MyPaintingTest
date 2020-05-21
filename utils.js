import AsyncStorage from '@react-native-community/async-storage';

import { SERVER_URL, ERROR_CODE } from './components/defines';

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
      return resJson;
      console.log(`SIGN IN ERROR: ${JSON.stringify(resJson)}`);
      // need handling failure
    } else {
      await storeToken(resJson.token, resJson.refresh_token);
      return resJson.token;
      console.log(`SIGN IN SUCCESS`);
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
      // switch ( resJson.error ) {
      //   case ERROR_CODE.USERNAME_ALREADY_OCCUPIED:
      //
      // };
      return resJson;
      console.log(`SIGN UP ERROR: ${JSON.stringify(resJson)}`);
    } else {
      await storeToken(resJson.token, resJson.refresh_token);
      return resJson.token;
      console.log(`SIGN IN SUCCESS`);
    }
  } catch (e) {
    throw new Error(`ERROR: ${e}`);
  };
};

const signOut = async () => {
  if (await removeStoredToken('@refresh_token')) {
    if (await removeStoredToken('@access_token')) {
      return true;
    };
  };
  return false;
};

// Cleans stored Tokens
const removeStoredToken = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    console.log(`REMOVED STORED TOKEN WITH KEY: ${key}`);
    return true;
  } catch (e) {
    return false;
  };
};

// Stores accessToken and refreshToken
const storeToken = async (access_token, refresh_token) => {
  try {
    await AsyncStorage.setItem('@access_token', JSON.stringify(access_token));
    console.log(`ACCESS_TOKEN STORED: ${access_token}`);
    if (refresh_token) {
      await AsyncStorage.setItem('@refresh_token', JSON.stringify(refresh_token));
      console.log(`REFRESH_TOKEN STORED: ${refresh_token}`);
    };
  } catch (e) {
    throw new Error(`TOKEN STORING FAILED: ${e}`);
  };
};

// Returns valid accessToken OR null
const restoreToken = async () => {
  try {
    const access_token = JSON.parse(await AsyncStorage.getItem('@access_token'));
    console.log(`ACCESS_TOKEN RESTORED: ${access_token}`);
    if (access_token) {
      return await getAccessToken(access_token);
    } else {
      return null;
    }
  } catch (e) {
    throw new Error(`No Token (Token Retoring Failed): ${e}`);
  };
};

// Returns updated valid accessToken from invalid Token
const getAccessToken = async (access_token) => {
  try {
    const refresh_token = JSON.parse(await AsyncStorage.getItem('@refresh_token'));
    console.log(`REFRESH_TOKEN RESTORED: ${refresh_token}`);
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
      return null;
      // need handling failure
    } else {
      console.log(`ACCESS_TOKEN RECIEVED: ${resJson.token}`);
      await storeToken(resJson.token);
      return resJson.token;
    };
  } catch (e) {
    throw new Error(`ERROR: ${e}`);
  };
};

export {
  signUp,
  signIn,
  signOut,
  restoreToken
}
