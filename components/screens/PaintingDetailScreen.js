import React, { useState, useEffect } from 'react';

import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableWithoutFeedback
} from 'react-native';

const { width, height } = Dimensions.get('window');
const SCREEN_WIDTH = width < height ? width : height;
const serverURL = 'http://jeonghyunkay.ipdisk.co.kr:8000/list/HDD2/Kay/';

const PaintingScreen = ({ route, navigation }) => {
  const [data, setData] = useState([]);
  const { painting_id, painting_name } = route.params;
  // post server to fetch detailed Info using painting_id

  return (
    <View style={styles.container}>
      <StatusBar barStyle='dark-content' backgroundColor='lavender' />
      <SafeAreaView>
      </SafeAreaView>
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
