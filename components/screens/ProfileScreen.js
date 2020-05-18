import React, { useEffect, useState } from 'react';

import {
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  StatusBar,
  Button,
} from 'react-native';

import { useScrollToTop } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');
const SCREEN_WIDTH = width < height ? width : height;
const serverURL = 'http://kay.airygall.com';
const storageURL = 'http://jeonghyunkay.ipdisk.co.kr:8000/list/HDD2/Kay';
const PROFILE_IMAGE_SIZE = SCREEN_WIDTH/3.5;

const ProfileScreen = ({ route, navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch(`${serverURL}/user/${route.params.user_id}/paintings`, {
      method: 'GET'
    }).then(res => {
      if (!res.ok) {
        throw new Error('Check Network Status');
      };
      return res.json();
    }).then(json => {
      setData(json || []);
      setLoading(false);
    })
    .catch((error) => console.error(error));
  };

  const user_id = route.params.user_id;

  const Item = React.memo(({ item }) => {
    return (
      <TouchableWithoutFeedback onPress={() => {
        navigation.navigate('PaintingDetail', {
          painting_id: item.id,
          painting_name: item.name
        });
      }}>
        <Image
          source={{ uri: `${storageURL}/images2/${item.image_src}` }}
          style={{ width: SCREEN_WIDTH/3, height: SCREEN_WIDTH/3 }}
        />
      </TouchableWithoutFeedback>
    );
  });

  const FanItem = ({ numFans }) => {
    return (
      <View style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-around'
      }}
      >
        <View style={{ justifyContent: 'center' }}>
          <Text>Fan</Text>
          <Text>{numFans}</Text>
        </View>
        <View style={{ justifyContent: 'center' }}>
          <View style={{
              width: SCREEN_WIDTH/6,
              height: SCREEN_WIDTH/12
          }}>
            <Button  title='팬 되기' />
          </View>
        </View>
      </View>
    );
  };

  const ProfileHeader = ({ user }) => {
    return (
      <View>
        <View style={{ flexDirection: 'row', padding: 20 }}>
          <Image
            source={{ uri: `${storageURL}/profile/${user.profile_pic_src}` }}
            style={{ width: PROFILE_IMAGE_SIZE, height: PROFILE_IMAGE_SIZE, borderRadius: PROFILE_IMAGE_SIZE/2}}
          />
          <FanItem numFans={user.num_fans} />
        </View>
        <Text style={{ paddingLeft: 15, paddingBottom: 15 }}>{user.profile_msg}</Text>
      </View>
    );
  };

  const _handleRefresh = () => {
    console.log(`refreshing...`);
    fetchData();
  };

  const ref = React.useRef(null);

  useScrollToTop(ref);

  return (
    <View style={styles.container}>
      <StatusBar barStyle='dark-content' backgroundColor='lavender' />
      <SafeAreaView>
        {isLoading
          ? <Text>Loading ... </Text>
          :
          <View>
            <ProfileHeader user={data.user} />
            <FlatList
              ref={ref}
              data={data.paintings}
              refreshing={isLoading}
              onRefresh={_handleRefresh}
              keyExtractor={item => item.id.toString()}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => <Item item={item} />}
              numColumns={3}
            />
          </View>
        }
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lavender',
  },
  productItem: {
    paddingBottom: 10,
    marginBottom: 5,
    width: SCREEN_WIDTH / 3,
  }
});

export default ProfileScreen;
