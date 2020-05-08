import React from 'react';

import {
  TouchableOpacity,
  Text
} from 'react-native';

const ProductImage = ({ id, price, onTouch, style}) => {
  return (
    <TouchableOpacity
      style={style}
      onPress={onTouch}
    >
      <Text>{id}</Text>
      <Text>{price}원</Text>
    </TouchableOpacity>
  )
}

export default ProductImage;
