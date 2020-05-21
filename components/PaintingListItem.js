import React, { useState, useEffect, useContext } from 'react';
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback
} from 'react-native';
import { Text, Image } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { SCREEN_WIDTH, SERVER_URL, STORAGE_URL } from '../defines';
import AuthContext from '../AuthContext';
const iconSize = 20;

const PaintingListItem = ({ item }) => {
  const [userName, setUserName] = useState(null);
  const navigation = useNavigation();

  const { accessToken } = useContext(AuthContext);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/user/${item.userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': accessToken.toString()
        }
      })
      const resJson = await response.json();
      if (!response.ok) {
        console.log(`GET USER FAILED ${JSON.stringify(resJson)}`);
      } else {
        setUserName(resJson.user.name);
      }
    } catch (e) {
      throw new Error(`ERROR: ${e}`);
    };
  };

  return (
    <View style={styles.item}>
      <View style={styles.nameAndName}>
        <TouchableWithoutFeedback onPress={() => {
          navigation.navigate('PaintingDetail', {
            painting_id: item.id,
            painting_name: item.name
          });
        }}>
          <Text style={styles.itemNameText}>{item.name}</Text>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => {
          navigation.navigate('Profile', {
            user_id: item.userId,
            user_name: userName
          });
        }}>
          <Text style={styles.itemNameText}>{userName}</Text>
        </TouchableWithoutFeedback>
      </View>
      <Image
        source={{ uri: `${STORAGE_URL}/images2/${item.image_src}` }}
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
          <Text style={styles.likeText}> {item.num_like} likes</Text>
        </View>
        <TouchableWithoutFeedback onPress={() => {
          navigation.navigate('PaintingDetail', {
            painting_id: item.id,
            painting_name: item.name
          });
        }}>
          <Text style={styles.likeText}>자세히</Text>
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
    fontSize: 20,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  itemNameText: {
    fontSize: 20
  },
  statusAndMore: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  status: {
    flexDirection: 'row'
  },
  likeText: {
    marginTop: -3,
    fontSize: iconSize
  }
});

export default PaintingListItem;
