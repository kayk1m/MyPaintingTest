import React, { useState, useEffect, useContext, useRef } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { Text, Header } from 'react-native-elements';
import { useScrollToTop } from '@react-navigation/native';

import AuthContext from '../../AuthContext';
import ProfileHeader from '../ProfileHeader';
import TouchablePainting from '../TouchablePainting';

import { SERVER_URL } from '../defines';

const MyPageScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [paintings, setPaintings] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const { accessToken } = useContext(AuthContext);

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
        console.log(`GET MY INFO ERROR: ${JSON.stringify(resJson)}`);
        // need handling failure
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
      <Header />
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
