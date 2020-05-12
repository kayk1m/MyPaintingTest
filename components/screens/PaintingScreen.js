import React, { useState, useEffect } from 'react';

import {
  SafeAreaView,
  StyleSheet,
  View,
  StatusBar,
  FlatList
} from 'react-native';

import { useScrollToTop } from '@react-navigation/native';

import PaintingItem from '../PaintingItem';

const serverURL = 'http://jeonghyunkay.ipdisk.co.kr:8000/list/HDD2/Kay/';

const PaintingScreen = ({ navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch(`${serverURL}painting_list.json`, {
      headers: {
        'Cache-Control': 'no-cache'
      }
    }).then((response) => response.json())
      .then((json) => {
        setData(json.data || []);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  };

  const _handleRefresh = async () => {
    await setLoading(true);
    await setData([]);
    fetchData();
  };

  const ref = React.useRef(null);

  useScrollToTop(ref);

  return (
    <View style={styles.container}>
      <StatusBar barStyle='dark-content' backgroundColor='lavender' />
      <SafeAreaView>
        <FlatList
          ref={ref}
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
