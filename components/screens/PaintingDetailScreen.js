import React, { useState, useEffect } from 'react';

import { StyleSheet, View } from 'react-native';

const PaintingScreen = ({ route, navigation }) => {
  const [data, setData] = useState([]);
  const { painting_id, painting_name } = route.params;
  // post server to fetch detailed Info using painting_id

  return (
    <View style={styles.container}>
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
