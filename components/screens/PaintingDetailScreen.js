import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';

import PaintingListItem from '../PaintingListItem';
import AuthContext from '../../AuthContext';

import { SERVER_URL, ERROR_CODE } from '../../defines';

const PaintingScreen = ({ route, navigation }) => {
  const { painting_id, painting_name } = route.params;
  const [painting, setPainting] = useState(null);
  const [products, setProducts] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const { accessToken } = useContext(AuthContext);
  // post server to fetch detailed Info using painting_id
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/painting/${painting_id}/products`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': accessToken.toString()
        }
      });
      const resJson = await response.json();
      if (!response.ok) {
        console.log(`GET PAINTING INFO WITH PRODUCTS ERROR: ${JSON.stringify(resJson)}`);
        // need handling failure
      } else {
        setPainting(resJson.painting);
        setProducts(resJson.products);
        console.log(`GETTING PAINTING INFO WITH PRODUCTS SUCCESS`);
      };
    } catch (e) {
      throw new Error(`ERROR: ${e}`);
    } finally {
      setLoading(false);
    };
  };

  return (
    <View style={styles.container}>
      {isLoading
        ? (
          <Text h2>Loading...</Text>
        ) : (
          <PaintingListItem item={painting} />
        )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lavender',
  }
});

export default PaintingScreen;
