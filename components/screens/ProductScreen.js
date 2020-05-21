import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const ProductScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.textHelloWorld}>Palette Page!</Text>
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
  },
  textHelloWorld: {
    fontSize: 30
  }
});

export default ProductScreen;
