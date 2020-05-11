import React, { useState, useEffect } from 'react';

import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  FlatList,
  TouchableWithoutFeedback,
  Image
} from 'react-native';

import PaintingItem from '../PaintingItem';

const serverURL = 'http://jeonghyunkay.ipdisk.co.kr:8000/list/HDD2/Kay/';

const PaintingScreen = ({ navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  const fetchData = async () => {
    fetch(serverURL + 'painting_list.json')
      .then((response) => response.json())
      .then((json) => {
        setData(json.data);
        setLoading(false);
      })
      .catch((error) => console.error(error))
      .finally(() => {
        console.log('PaintingScreen: data recieved!!');
      });
  }

  useEffect(() => {
    fetchData();
  }, []);

  const _handleRefresh = async () => {
    setLoading(false);
    setData(null);
    fetchData();
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle='dark-content' backgroundColor='lavender' />
      <SafeAreaView>
        <FlatList
          data={data}
          initialNumToRender={3}
          refreshing={isLoading}
          onRefresh={_handleRefresh}
          keyExtractor={item => item.painting_id.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <PaintingItem navigation={navigation} item={item} />}
        />
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lavender'
  }
})

export default PaintingScreen;
