import React, { useEffect, useState } from 'react';

import {
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableOpacity
} from 'react-native';

import ProductImage from '../ProductImage';

const { width, height } = Dimensions.get('window');
const SCREEN_WIDTH = width < height ? width : height;

const HomeScreen = ({ navigation }) => {
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
              <View>
                <TouchableOpacity onPress={() => {
                  navigation.navigate('PostList', { id: '김철성' })
                }}>
                  <Text style={styles.itemNameText}>{item.name}</Text>
                </TouchableOpacity>
                <ProductImage
                  id={item.id}
                  url={serverURL + 'images/' + item.src}
                  price={item.price}
                  onTouch={() => {
                      // navigation.navigate('ProductDetail', { id: item.id })
                  }}
                  style={styles.productItem}
                  width={SCREEN_WIDTH}
                />
              </View>
            )}
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
    paddingBottom: 10,
    marginBottom: 5,
    width: SCREEN_WIDTH,
  },
  itemNameText: {
    paddingBottom: 10,
  }
})

export default HomeScreen;
