import React, { useEffect, useState } from 'react';

import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
} from 'react-native';

import ProductImage from '../ProductImage';

const PostListScreen = () => {
  const [data, setData] = useState([]);
  const serverURL = 'http://jeonghyunkay.ipdisk.co.kr:8000/list/HDD2/Kay/';

  useEffect(() => {
    fetch(serverURL + 'post_list.json')
      .then((response) => response.json())
      .then((json) => setData(json.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle='dark-content' backgroundColor='lavender' />
        <SafeAreaView>
          <FlatList
            data={data}
            keyExtactor={item => item.id}
            renderItem={({ item }) => (
              <ProductImage
                id={item.id}
                price={item.price}
                onTouch={() => {}}
                style={styles.productItem}
              />
            )}
            numColumns={3}
          />
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lavender',
  },
  productItem: {
    backgroundColor: 'coral',
    padding: 10,
  }
})

export default PostListScreen;
