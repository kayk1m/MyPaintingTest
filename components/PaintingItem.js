import React from 'react';
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Text,
  Image,
  Dimensions
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const serverURL = 'http://jeonghyunkay.ipdisk.co.kr:8000/list/HDD2/Kay/';

const { width, height } = Dimensions.get('window');
const SCREEN_WIDTH = width < height ? width : height;
const iconSize = 25;

const PaintingItem = ({ navigation, item }) => {
  return (
    <View style={styles.item}>
      <View style={styles.nameAndName}>
        <TouchableWithoutFeedback onPress={() => {
          navigation.navigate('PaintingDetail', {
            painting_id: item.painting_id,
            painting_name: item.name
          });
        }}>
          <Text style={styles.itemNameText}>{item.name}</Text>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => {
          navigation.navigate('Profile', {
            user_id: item.user_id,
            user_name: item.user_name
          });
        }}>
          <Text style={styles.itemNameText}>{item.user_name}</Text>
        </TouchableWithoutFeedback>
      </View>
      <Image
        source={{ uri: serverURL + 'images2/' + item.src }}
        style={{ width: SCREEN_WIDTH, height: SCREEN_WIDTH }}
      />
      <View style={styles.statusAndMore}>
        <View style={styles.status}>
          <TouchableWithoutFeedback onPress={() => {
            // Need to post server (LIKE or DISLIKE)
          }}>
            {item.liked ?
              <Icon name='heart' size={iconSize} color={'black'} />
              :
              <Icon name='heart-outline' size={iconSize} color={'black'} />
            }
          </TouchableWithoutFeedback>
          <Text>{item.num_like} likes</Text>
        </View>
        <TouchableWithoutFeedback onPress={() => {
          navigation.navigate('PaintingDetail', {
            painting_id: item.painting_id,
            painting_name: item.name
          });
        }}>
          <Text>자세히</Text>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    marginTop: 20
  },
  nameAndName: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  statusAndMore: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  status: {
    flexDirection: 'row'
  }
});

export default React.memo(PaintingItem);
