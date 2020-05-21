import React, { useEffect, useState, useContext } from 'react';
import { FlatList, StyleSheet, View, TouchableWithoutFeedback } from 'react-native';
import { Text, Image, Button } from 'react-native-elements';
import { useScrollToTop } from '@react-navigation/native';

import AuthContext from '../../AuthContext';
import ProfileHeader from '../ProfileHeader';
import TouchablePainting from '../TouchablePainting';
import { getAccessToken } from '../../utils';

import { SERVER_URL, ERROR_CODE } from '../../defines';

const ProfileScreen = ({route, navigation}) => {
  const [user, setUser] = useState(null);
  const [paintings, setPaintings] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const { accessToken, setAccessToken } = useContext(AuthContext);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/user/${user_id}/paintings`, {
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
          console.log(`GET USER INFO WITH PAINTINGS ERROR: ${JSON.stringify(resJson)}`);
        };
      } else {
        setUser(resJson.user);
        setPaintings(resJson.paintings);
        console.log(`GETTING USER INFO WITH PAINTINGS SUCCESS`);
      };
    } catch (e) {
      throw new Error(`ERROR: ${e}`);
    } finally {
      setLoading(false);
    };
  };

  const user_id = route.params.user_id;

  const handleRefresh = () => {
    console.log(`refreshing...`);
    fetchData();
  };

  const ref = React.useRef(null);
  useScrollToTop(ref);

  return (
    <View style={styles.container}>
      {isLoading
        ? (
          <Text h2>Loading...</Text>
        ) : (
          <View>
            <ProfileHeader user={user}/>
            <FlatList ref={ref} data={paintings} refreshing={isLoading} onRefresh={handleRefresh} keyExtractor={item => item.id.toString()} showsVerticalScrollIndicator={false} renderItem={({item}) => <TouchablePainting item={item}/>} numColumns={3}/>
          </View>
        )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lavender'
  }
});

export default ProfileScreen;
