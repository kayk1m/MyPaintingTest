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
const serverURL = 'http://jeonghyunkay.ipdisk.co.kr:8000/list/HDD2/Kay/';
const PROFILE_IMAGE_SIZE = SCREEN_WIDTH/3.5;

const ProfileScreen = ({ route, navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch(`${serverURL}user_list.json`, {
      headers: {
        'Cache-Control': 'no-cache'
      }
    }).then((response) => response.json())
      .then((json) => setData(json.users || []))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };

  const user_id = route.params.user_id;

  const Item = React.memo(({ item }) => {
    return (
      <TouchableWithoutFeedback onPress={() => {
        navigation.navigate('PaintingDetail', {
          painting_id: item.painting_id,
          painting_name: item.name
        });
      }}>
        <Image
          source={{ uri: `${serverURL}images2/${item.src}` }}
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
            }}
          >
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
            source={{ uri: `${serverURL}profile/${user.profile_image_src}` }}
            style={{ width: PROFILE_IMAGE_SIZE, height: PROFILE_IMAGE_SIZE, borderRadius: PROFILE_IMAGE_SIZE/2}}
          />
          <FanItem numFans={user.num_fan} />
        </View>
        <Text style={{ paddingLeft: 15, paddingBottom: 15 }}>{user.status_msg}</Text>
      </View>
    );
  };

  const _handleRefresh = async () => {
    await setData([]);
    await setLoading(true);
    fetchData();
  };

  const ref = React.useRef(null);

  useScrollToTop(ref);

  return (
    <View style={styles.container}>
      <StatusBar barStyle='dark-content' backgroundColor='lavender' />
        <SafeAreaView>
          {isLoading
            ?
            <Text>Loading ... </Text>
            :
            <View>
              <ProfileHeader user={data.find((item, idx) => {
                return item.user_id === user_id;
              })} />
              <FlatList
                ref={ref}
                data={data.find((item, idx) => {
                  return item.user_id === user_id;
                }).paintings}
                refreshing={isLoading}
                onRefresh={_handleRefresh}
                keyExtractor={item => item.painting_id.toString()}
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
