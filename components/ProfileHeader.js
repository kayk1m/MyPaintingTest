import React from 'react';

import { View } from 'react-native';
import { Text, Button, Avatar } from 'react-native-elements';

import { SCREEN_WIDTH, STORAGE_URL } from './defines';

const PROFILE_IMAGE_SIZE = SCREEN_WIDTH/3.5;

const FanItem = ({ numFans }) => {
  return (
    <View style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around'
    }}>
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
        <Avatar
          rounded
          activeOpacity={0.8}
          size='xlarge'
          source={{ uri: `${STORAGE_URL}/profile/${user.profile_pic_src}` }}
          onPress={() => console.log(`NEED WORK!!!!`)}
        />
        <FanItem numFans={user.num_fans} />
      </View>
      <Text style={{ paddingLeft: 15, paddingBottom: 15 }}>{user.profile_msg}</Text>
    </View>
  );
};

export default ProfileHeader;
