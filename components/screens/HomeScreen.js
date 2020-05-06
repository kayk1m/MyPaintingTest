import React from 'react';

import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
} from 'react-native';

import ProductImage from '../ProductImage'

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle='dark-content' backgroundColor='lavender' />
      <SafeAreaView>
        <ProductImage id={'This is ID'} onPress={() => {
          navigation.navigate('MyPage')
        }}/>
      </SafeAreaView>
    </View>
  )
}

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
})

export default HomeScreen;
