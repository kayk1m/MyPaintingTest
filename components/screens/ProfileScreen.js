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
} from 'react-native';

const { width, height } = Dimensions.get('window');
const SCREEN_WIDTH = width < height ? width : height;
const serverURL = 'http://jeonghyunkay.ipdisk.co.kr:8000/list/HDD2/Kay/';

const ProfileScreen = ({ route, navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  const fetchData = async () => {
    fetch(serverURL + 'user_list.json')
      .then((response) => response.json())
      .then((json) => {
        setData(json.users.find((item, idx) => {
          return item.user_id === user_id;
        }).paintings);
        setLoading(false);
      })
      .catch((error) => console.error(error))
      .finally(() => {
        console.log('ProfileScreen: data recieved!!');
        console.log(data);
      });
  }

  useEffect(() => {
    fetchData();
  }, []);

  const user_id = route.params.user_id;

  const Item = React.memo(({ item }) => {
    return (
      <TouchableWithoutFeedback onPress={() => {
        navigation.navigate('PaintingDetail', {
          painting_id: item.painting_id,
          painting_name: item.name
        })
      }}>
        <Image
          source={{ uri: serverURL + 'images/' + item.src }}
          style={{ width: SCREEN_WIDTH/3, height: SCREEN_WIDTH/3 }}
        />
      </TouchableWithoutFeedback>
    )
  })

  const _handleRefresh = async () => {
    setLoading(false);
    fetchData();
  }



  return (
    <View style={styles.container}>
      <StatusBar barStyle='dark-content' backgroundColor='lavender' />
        <SafeAreaView>
          <FlatList
            data={data}
            refreshing={isLoading}
            onRefresh={_handleRefresh}
            keyExtractor={item => item.painting_id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => <Item item={item} />}
            numColumns={3}
          />
      </SafeAreaView>
    </View>
  )
}

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
})

export default ProfileScreen;
