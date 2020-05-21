import React, { useState, useEffect, useContext, useRef } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { Text } from 'react-native-elements';
import { useScrollToTop } from '@react-navigation/native';

import AuthContext from '../../AuthContext';
import ProfileHeader from '../ProfileHeader';
import TouchablePainting from '../TouchablePainting';
import { getAccessToken } from '../../utils';

import { SERVER_URL, ERROR_CODE } from '../../defines';

const MyPageScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [paintings, setPaintings] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const { accessToken, setAccessToken } = useContext(AuthContext);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/my`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': accessToken.toString()
        }
      });
      const resJson = await response.json();
      if (!response.ok) {
        if (resJson.error == ERROR_CODE.TOKEN_EXPIRED) {
          try {
            await setAccessToken(await getAccessToken(accessToken));
            fetchData();
          } catch (e) {
            throw new Error(`ERROR: ${e}`);
          };
        } else {
          console.log(`GET MY INFO ERROR: ${JSON.stringify(resJson)}`);
        };
      } else {
        setUser(resJson.user);
        setPaintings(resJson.paintings);
        console.log(`GETTING MY INFO SUCCESS`);
      };
    } catch (e) {
      throw new Error(`ERROR: ${e}`);
    } finally {
      setLoading(false);
    };
  };

  const handleRefresh = () => {
    console.log(`refreshing...`);
    fetchData();
  }

  const ref = useRef(null);
  useScrollToTop(ref);

  return (
    <View style={styles.container}>
      {isLoading
        ? (
          <Text h2>Loading...</Text>
        ) : (
          <View>
            <ProfileHeader user={user} />
            <FlatList
              ref={ref}
              data={paintings}
              refreshing={isLoading}
              onRefresh={handleRefresh}
              keyExtractor={item => item.id.toString()}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => <TouchablePainting item={item} />}
              numColumns={3}
            />
          </View>
        )
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lavender',
  }
});

export default MyPageScreen;
