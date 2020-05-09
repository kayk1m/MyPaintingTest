import React from 'react';

import {
  TouchableOpacity,
  Text,
  View,
  Image
} from 'react-native';

const ProductImage = ({ id, url, price, onTouch, style, width}) => {
  return (
    <View
      style={style}>
      <TouchableOpacity
        onPress={onTouch}
        style={{ minHeight: 100 }}
      >
        <Image
          source={{ uri: url }}
          style={{ width: width, height: width }}
        />
      </TouchableOpacity>
      <Text>{price}원</Text>
    </View>
  )
}

export default ProductImage;
