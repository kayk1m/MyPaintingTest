import React from 'react';

import { TouchableWithoutFeedback } from 'react-native';
import { Image } from 'react-native-elements';

import { STORAGE_URL, SCREEN_WIDTH } from './defines';

const TouchablePainting = ({ item }) => {
  return (
    <TouchableWithoutFeedback onPress={() => {
      navigation.navigate('PaintingDetail', {
        painting_id: item.id,
        painting_name: item.name
      });
    }}>
      <Image
        source={{ uri: `${STORAGE_URL}/images2/${item.image_src}` }}
        style={{ width: SCREEN_WIDTH/3, height: SCREEN_WIDTH/3 }}
      />
    </TouchableWithoutFeedback>
  );
};

export default TouchablePainting;
