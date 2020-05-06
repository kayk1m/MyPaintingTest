import React from 'react';

import {
  TouchableOpacity,
  StyleSheet,
  Text
} from 'react-native';

const ProductImage = (props) => {
  return (
    <TouchableOpacity
      style={styles.touchableImage}
      onPress={props.onPress}
    >
      <Text>{props.id}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  touchableImage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5
  }
})

export default ProductImage;
