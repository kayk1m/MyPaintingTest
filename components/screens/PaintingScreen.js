import React, { useState, useEffect, useContext, useRef } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { useScrollToTop } from '@react-navigation/native';

import PaintingListItem from '../PaintingListItem';
import AuthContext from '../../AuthContext';
import { getAccessToken } from '../../utils';

import { SERVER_URL, ERROR_CODE } from '../../defines';

const PaintingScreen = ({ navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [paintings, setPaintings] = useState([]);
  const [error, setError] = useState(null);

  const { accessToken, setAccessToken } = useContext(AuthContext);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/paintings`, {
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
          console.log(`PAINTING SCREEN ERROR: ${JSON.stringify(resJson)}`);
        };
      } else {
        setPaintings(resJson.paintings);
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
  };

  const ref = useRef(null);
  useScrollToTop(ref);

  return (
    <View style={styles.container}>
      <FlatList
        ref={ref}
        data={paintings}
        initialNumToRender={3}
        refreshing={isLoading}
        onRefresh={handleRefresh}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <PaintingListItem item={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lavender'
  }
});

export default PaintingScreen;
