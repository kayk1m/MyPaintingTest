import React from 'react';

import {
  TouchableOpacity,
  Text,
  View
} from 'react-native';

const ProductImage = ({ id, price, onTouch, style}) => {
  return (
    <View
      style={style}>
      <TouchableOpacity
        onPress={onTouch}
        style={{backgroundColor: "coral", minHeight: 100}}
      >
        <Text>{id}</Text>
      </TouchableOpacity>
      <Text>{price}원</Text>
    </View>
  )
}

export default ProductImage;
