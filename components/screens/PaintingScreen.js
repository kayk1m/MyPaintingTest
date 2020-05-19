import React, { useState, useEffect, useContext } from 'react';

import {
  SafeAreaView,
  StyleSheet,
  View,
  StatusBar,
  FlatList
} from 'react-native';

import { useScrollToTop } from '@react-navigation/native';

import PaintingItem from '../PaintingItem';
import AuthContext from '../../AuthContext';

const serverURL = 'http://kay.airygall.com';

const PaintingScreen = ({ navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const { userToken } = useContext(AuthContext);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch(`${serverURL}/paintings`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': userToken.toString()
      }
    }).then(res => {
      if (!res.ok) {
        throw new Error('Check Network Status');
      };
      return res.json();
    }).then(json =>  {
      console.log(json);
      setData(json.data || []);
      setLoading(false);
      console.log(data);
    })
    .catch(err => console.error(err));
  };

  const _handleRefresh = () => {
    console.log(`refreshing...`);
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
          keyExtractor={item => item.id.toString()}
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
